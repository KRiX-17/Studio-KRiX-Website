-- Apply after deploying the corresponding portal functions. This migration is
-- committed for review and is not applied to the live project by this branch.
-- Prevent selections/comments from attaching another gallery's asset, even
-- when a caller reaches PostgREST directly or an Edge Function uses service_role.
alter table public.gallery_assets
  add constraint gallery_assets_gallery_id_id_unique unique (gallery_id, id);

alter table public.gallery_selections
  add constraint gallery_selections_asset_gallery_fk
  foreign key (gallery_id, asset_id)
  references public.gallery_assets (gallery_id, id) on delete cascade;

alter table public.gallery_comments
  add constraint gallery_comments_asset_gallery_fk
  foreign key (gallery_id, asset_id)
  references public.gallery_assets (gallery_id, id) on delete cascade;

drop policy if exists "gallery_selections_read" on public.gallery_selections;
create policy "gallery_selections_read"
on public.gallery_selections for select to authenticated
using (
  private.current_user_is_super_admin()
  or (user_id = (select auth.uid())
      and private.current_user_has_gallery_access(gallery_id))
);

drop policy if exists "gallery_comments_read" on public.gallery_comments;
create policy "gallery_comments_read"
on public.gallery_comments for select to authenticated
using (
  private.current_user_is_super_admin()
  or (user_id = (select auth.uid())
      and private.current_user_has_gallery_access(gallery_id))
);
