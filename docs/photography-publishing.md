# Photography publishing

The public `/photography` gallery reads published entries from a dedicated Supabase project. `/studio/photos` is an unlisted owner workspace for email-link sign-in, uploading, publishing and removing images. It is protected by database and Storage policies, not by the hidden URL. No service key belongs in this website.

## Connect a dedicated project

1. Create a **separate** Supabase project for Studio KRiX in the Sydney region. Do not use the LaKaz household database.
2. Apply `supabase/migrations/20260926061730_studio_photography.sql` through the Supabase CLI or SQL editor. It creates a public bucket limited to 10 MB images, the gallery table and owner-only write policies.
3. In Auth URL settings, set the site URL to `https://studiokrix.com.au` and allow `https://studiokrix.com.au/studio/photos` as a redirect URL. Add `http://localhost:3000/studio/photos` during local development. Enable email-link authentication.
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel for this project. The publishable key is designed for browser use. Never set a secret or service-role key with `NEXT_PUBLIC_`.
5. Open `/studio/photos`, enter your email, and follow the link. The first sign-in creates your Auth user but will correctly show “This account does not have publishing access.” In the Supabase dashboard, copy that user's UUID from Authentication → Users. Then run this SQL, replacing the UUID with the exact account ID:

   ```sql
   insert into public.photo_admins (user_id)
   values ('OWNER_AUTH_USER_UUID');
   ```

6. Refresh `/studio/photos`. Upload a JPEG, PNG, WebP or AVIF, add the required title, collection and useful image description, then publish. The public gallery refreshes within about a minute. Newest images appear first; the newest also becomes the homepage photo preview.

The `photo_admins` table must be seeded through the dashboard by a trusted project administrator. Visitors can request their own email links but cannot publish or remove images. Gallery images are intentionally public; do not upload private client work or photos you do not want anyone to access. The browser does not strip EXIF/location metadata, so export privacy-safe images before uploading. For full-size camera files, export web-friendly versions under 10 MB first.

The gallery renders a quiet empty state until the project is connected and the first real photograph is published. A deleted photo may remain in browser or CDN caches briefly. If file deletion fails after the gallery entry is removed, clean the orphaned file up in Storage.
