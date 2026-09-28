-- Adds opt-in upload capability for assigned collaborator accounts.
alter table public.gallery_access
  add column if not exists can_upload boolean not null default false;

create index if not exists gallery_access_upload_idx
  on public.gallery_access(user_id, can_upload)
  where can_upload = true;
