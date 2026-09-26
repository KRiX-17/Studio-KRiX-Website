-- Studio KRiX photography: public gallery, owner-only publishing.
create table public.photo_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.photo_admins enable row level security;
create policy "Admins can identify themselves" on public.photo_admins
  for select to authenticated using (user_id = (select auth.uid()));

create table public.photographs (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  alt_text text not null check (char_length(alt_text) between 1 and 240),
  caption text check (char_length(caption) <= 600),
  collection text not null check (char_length(collection) between 1 and 80),
  location text check (char_length(location) <= 120),
  image_path text not null unique,
  created_at timestamptz not null default now()
);
create index photographs_created_at_idx on public.photographs (created_at desc);
alter table public.photographs enable row level security;
create policy "Anyone can see published photographs" on public.photographs
  for select to anon, authenticated using (true);
create policy "Owner can publish photographs" on public.photographs
  for insert to authenticated with check (
    exists (select 1 from public.photo_admins where user_id = (select auth.uid()))
  );
create policy "Owner can remove photographs" on public.photographs
  for delete to authenticated using (
    exists (select 1 from public.photo_admins where user_id = (select auth.uid()))
  );
grant select on public.photo_admins to authenticated;
grant select on public.photographs to anon, authenticated;
grant insert, delete on public.photographs to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'studio-photography', 'studio-photography', true, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
);
create policy "Owner can upload photographs" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'studio-photography'
    and exists (select 1 from public.photo_admins where user_id = (select auth.uid()))
  );
create policy "Owner can remove photo files" on storage.objects
  for delete to authenticated using (
    bucket_id = 'studio-photography'
    and exists (select 1 from public.photo_admins where user_id = (select auth.uid()))
  );
