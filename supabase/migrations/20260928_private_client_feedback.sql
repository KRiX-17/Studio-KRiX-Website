-- Keeps proofing notes private to the author and Studio KRiX Super Admin.
drop policy if exists "gallery_comments_read" on public.gallery_comments;

create policy "gallery_comments_read"
on public.gallery_comments for select
to authenticated
using (
  user_id = (select auth.uid())
  or private.current_user_is_super_admin()
);
