# Studio KRiX v2

## Product direction

Studio KRiX is the umbrella brand for three equal creative/technical disciplines:

1. Photography
2. KRiX — DJ / music production
3. Development — apps, tools and software

The homepage should act as a cinematic entry point into those three worlds rather than a long scrolling summary of unrelated work.

## Primary navigation

- Photography
- Music
- Development
- About

The Studio KRiX mark/logo links home.

## Homepage

Desktop:
- Three large visual panels for Photography, Music and Development.
- Each panel has a strong hero visual, short descriptor and clear enter action.
- Hover/focus may give the active panel additional visual emphasis.
- Motion must respect prefers-reduced-motion.

Mobile:
- Stack the three worlds vertically as large touch-first cards.
- Each card should be visually self-contained and readable without hover.

## Photography

Photography is a first-class portfolio rather than a static image dump.

Suggested taxonomy:
- Fashion
- Portraits
- Events
- Creative / Experimental

Routes:
- /photography
- /photography/[slug]

Each project/gallery can contain:
- title
- slug
- shoot/event date
- location
- category
- short description
- cover image
- ordered images
- alt text
- optional caption
- optional credits
- draft/published state
- featured state

### Portfolio administration

Add a private /admin area so photography can be maintained without editing code.

Desired workflow:
1. Sign in.
2. Create a gallery/project.
3. Drag/drop JPEG images.
4. Choose cover image.
5. Reorder images.
6. Add title, date, category, location, description, credits and alt text.
7. Preview.
8. Publish/unpublish.

### Backend choice

Use a dedicated Studio KRiX Supabase project for:
- Auth
- Postgres metadata
- Storage for portfolio images

Do not mix this data with LaCaz or another unrelated application.

Suggested tables:

#### photo_projects
- id uuid primary key
- slug text unique
- title text
- category text
- event_date date nullable
- location text nullable
- description text nullable
- cover_photo_id uuid nullable
- is_featured boolean default false
- status text constrained to draft/published
- published_at timestamptz nullable
- sort_order integer
- created_at timestamptz
- updated_at timestamptz

#### photos
- id uuid primary key
- project_id uuid references photo_projects
- storage_path text unique
- alt_text text
- caption text nullable
- width integer nullable
- height integer nullable
- sort_order integer
- created_at timestamptz

A simple credits field can begin as JSON or text and be normalised later only if needed.

### Security

- RLS enabled on all public-schema tables.
- Public users can read published projects/photos only.
- Only the Studio KRiX admin account can create/update/delete portfolio data.
- Never expose a Supabase service-role/secret key to the browser.
- Storage write policies must be restricted to the admin account.
- The admin route must validate the authenticated user server-side.

### Publishing model

- Public photography pages render from Supabase data.
- After an admin publish/update action, revalidate /photography and the affected /photography/[slug] route so changes appear without a GitHub commit or Vercel redeploy.
- Use next/image for responsive image delivery and explicit sizes.

### Image upload guidance

The website should receive finished JPEG exports, not RAW files.

A future Capture One export recipe should target web portfolio delivery, for example:
- JPEG
- sRGB
- sensible long-edge limit
- high quality while keeping page weight under control
- filename preserving a useful project/image sequence

Exact export dimensions/quality should be tuned once real A7S II files and the portfolio layout are tested.

## Music

Routes:
- /music
- optional release/project detail routes later

Content focus:
- latest release
- releases
- DJ sets
- production
- collaborations/projects
- KRiX artist identity

Studio KRiX is the parent brand; KRiX remains the music artist identity.

## Development

Routes:
- /development
- /development/[slug] or retain product-specific routes where useful

Feature:
- OhmXact
- LaCaz
- future Studio KRiX apps/tools
- selected experiments

Projects should read like concise product case studies rather than a generic project list.

## About

/About connects the three disciplines and replaces the fragmented About / Links / Contact presentation where practical.

It should explain Studio KRiX as one studio spanning images, sound and software, while preserving useful contact and social links.

## Existing infrastructure to preserve

Keep and adapt where still useful:
- Next.js App Router
- TypeScript
- Tailwind CSS
- existing security headers
- canonical domain behaviour for https://studiokrix.com.au
- accessibility requirements
- robots/sitemap foundations
- contact form infrastructure
- Vercel deployment
- Studio KRiX brand assets

## Migration principle

Build v2 on the studio-krix-v2 branch.

Do not break production main while the redesign is in progress. Reuse sound infrastructure, but redesign the user-facing information architecture and visual system around the three disciplines.
