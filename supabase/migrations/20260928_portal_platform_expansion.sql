-- Studio KRiX Client Portal expansion.
-- Hosted project migration name: portal_platform_expansion
-- Applied 2026-09-28.

alter table public.galleries
  add column if not exists credits text;

alter table public.gallery_assets
  add column if not exists public_storage_path text unique,
  add column if not exists web_storage_path text unique;

create table if not exists public.auth_allowlist (
  email text primary key,
  purpose text not null default 'client_invite',
  created_by uuid references auth.users(id) on delete set null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.client_invites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  token_hash text not null unique,
  created_by uuid not null references auth.users(id) on delete cascade,
  expires_at timestamptz not null,
  claimed_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_selections (
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  asset_id uuid not null references public.gallery_assets(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  selected boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (asset_id, user_id)
);

create table if not exists public.gallery_comments (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  asset_id uuid references public.gallery_assets(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  is_resolved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.auth_allowlist enable row level security;
alter table public.client_invites enable row level security;
alter table public.gallery_selections enable row level security;
alter table public.gallery_comments enable row level security;

revoke all on public.auth_allowlist from anon, authenticated;
revoke all on public.client_invites from anon, authenticated;

drop policy if exists "auth_allowlist_deny_clients" on public.auth_allowlist;
create policy "auth_allowlist_deny_clients"
on public.auth_allowlist for all to anon, authenticated
using (false) with check (false);

drop policy if exists "client_invites_deny_clients" on public.client_invites;
create policy "client_invites_deny_clients"
on public.client_invites for all to anon, authenticated
using (false) with check (false);

create or replace function private.current_user_is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce((select auth.jwt() ->> 'aal'), 'aal1') = 'aal2'
    and exists (
      select 1
      from public.profiles p
      where p.id = (select auth.uid())
        and p.role = 'super_admin'
        and p.is_active = true
    );
$$;

revoke all on function private.current_user_is_super_admin() from public;
revoke all on function private.current_user_is_super_admin() from anon;
grant execute on function private.current_user_is_super_admin() to authenticated;

drop policy if exists "gallery_selections_read" on public.gallery_selections;
drop policy if exists "gallery_selections_insert" on public.gallery_selections;
drop policy if exists "gallery_selections_update" on public.gallery_selections;
drop policy if exists "gallery_selections_delete" on public.gallery_selections;

create policy "gallery_selections_read"
on public.gallery_selections for select to authenticated
using (
  user_id = (select auth.uid())
  or private.current_user_is_super_admin()
);

create policy "gallery_selections_insert"
on public.gallery_selections for insert to authenticated
with check (
  user_id = (select auth.uid())
  and private.current_user_has_gallery_access(gallery_id)
);

create policy "gallery_selections_update"
on public.gallery_selections for update to authenticated
using (
  user_id = (select auth.uid())
  or private.current_user_is_super_admin()
)
with check (
  (user_id = (select auth.uid())
    and private.current_user_has_gallery_access(gallery_id))
  or private.current_user_is_super_admin()
);

create policy "gallery_selections_delete"
on public.gallery_selections for delete to authenticated
using (
  user_id = (select auth.uid())
  or private.current_user_is_super_admin()
);

drop policy if exists "gallery_comments_read" on public.gallery_comments;
drop policy if exists "gallery_comments_insert" on public.gallery_comments;
drop policy if exists "gallery_comments_update" on public.gallery_comments;
drop policy if exists "gallery_comments_delete" on public.gallery_comments;

create policy "gallery_comments_read"
on public.gallery_comments for select to authenticated
using (private.current_user_has_gallery_access(gallery_id));

create policy "gallery_comments_insert"
on public.gallery_comments for insert to authenticated
with check (
  user_id = (select auth.uid())
  and private.current_user_has_gallery_access(gallery_id)
);

create policy "gallery_comments_update"
on public.gallery_comments for update to authenticated
using (
  user_id = (select auth.uid())
  or private.current_user_is_super_admin()
)
with check (
  (user_id = (select auth.uid())
    and private.current_user_has_gallery_access(gallery_id))
  or private.current_user_is_super_admin()
);

create policy "gallery_comments_delete"
on public.gallery_comments for delete to authenticated
using (
  user_id = (select auth.uid())
  or private.current_user_is_super_admin()
);

alter table public.download_events
  drop constraint if exists download_events_download_kind_check;

alter table public.download_events
  add constraint download_events_download_kind_check
  check (download_kind in ('asset', 'gallery_all'));

create or replace function private.enforce_auth_allowlist()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  allowed boolean;
begin
  if new.email is null then
    raise exception 'Email is required for Studio KRiX portal accounts';
  end if;

  select exists (
    select 1
    from public.auth_allowlist a
    where lower(a.email) = lower(new.email)
      and a.expires_at > now()
  ) into allowed;

  if not allowed then
    raise exception 'Account creation is invitation only';
  end if;

  delete from public.auth_allowlist
  where lower(email) = lower(new.email);

  return new;
end;
$$;

revoke all on function private.enforce_auth_allowlist() from public;
revoke all on function private.enforce_auth_allowlist() from anon;
revoke all on function private.enforce_auth_allowlist() from authenticated;

drop trigger if exists enforce_studio_krix_auth_allowlist on auth.users;
create trigger enforce_studio_krix_auth_allowlist
before insert on auth.users
for each row execute function private.enforce_auth_allowlist();

create index if not exists client_invites_user_idx
  on public.client_invites(user_id, created_at desc);
create index if not exists client_invites_email_idx
  on public.client_invites(lower(email), created_at desc);
create index if not exists auth_allowlist_created_by_idx
  on public.auth_allowlist(created_by);
create index if not exists client_invites_created_by_idx
  on public.client_invites(created_by);
create index if not exists gallery_selections_gallery_user_idx
  on public.gallery_selections(gallery_id, user_id);
create index if not exists gallery_selections_user_idx
  on public.gallery_selections(user_id);
create index if not exists gallery_comments_gallery_idx
  on public.gallery_comments(gallery_id, created_at desc);
create index if not exists gallery_comments_asset_idx
  on public.gallery_comments(asset_id, created_at desc);
create index if not exists gallery_comments_user_idx
  on public.gallery_comments(user_id, created_at desc);
