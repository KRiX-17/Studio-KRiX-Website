# Studio KRiX Photography Workflow

## Capture One export

Create a Process Recipe named **Studio KRiX — Client Final**.

Use:
- Format: JPEG
- ICC Profile: sRGB IEC61966-2.1
- Quality: 92
- Scale: 100% / full resolution
- Resolution metadata: 300 px/in is fine, but does not change the actual pixel dimensions
- Output sharpening: keep it conservative; final sharpening should match the edit rather than compensate for the website
- Filename: keep a stable descriptive filename, for example `SK_IE3_001.jpg`

The Studio KRiX uploader creates the web version automatically. Do not make a second web export.

## Upload flow

1. Sign in at `/login`.
2. Super Admin completes MFA.
3. Open `/admin` and create a gallery.
4. Drop the full-resolution final JPEGs into the gallery editor.
5. The browser uploads the original to private storage and creates a 3200 px WebP preview at quality 0.88.
6. Set alt text, captions, cover image and order.
7. Assign client access as view-only or view + download.
8. Publish only when the gallery is ready for the public Photography portfolio.

## Storage behaviour

- Full-resolution originals stay in the private `client-galleries` bucket.
- 3200 px WebP previews also stay private while the gallery is a draft/client-only.
- Publishing copies only the web previews into the public `portfolio-public` bucket.
- Unpublishing removes those public copies.
- Client downloads always use short-lived signed URLs to the private full-resolution original.

## Client delivery

Clients sign in at `/portal`. Depending on their gallery permission they can:
- view the gallery;
- select/favourite frames;
- leave notes on individual images;
- download individual full-resolution files;
- request Download All, which produces short-lived links for all downloadable files.

All download activity is recorded in the Studio KRiX audit trail.
