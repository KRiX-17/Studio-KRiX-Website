# Studio KRiX Website

The official website for Studio KRiX, an independent engineering and creative
studio founded by Christopher Helene in Sydney, Australia.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- ESLint
- npm

The site is static-first, has no CMS, and is ready for deployment on Vercel.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Architecture

```text
app/                  Routes, route metadata and SEO endpoints
components/           Reusable UI and site chrome
components/sections/  Homepage and shared page sections
config/               Studio-wide configuration
data/                 Typed, content-driven project and discipline data
hooks/                Reserved for focused client-side hooks
lib/                  Metadata and utility helpers
public/               Static images, manifest and social/favicons
styles/               Tailwind entry point and the global design system
```

Most components are Server Components. `components/reveal.tsx` is the single
motion-focused Client Component and respects `prefers-reduced-motion`.

Projects are defined in `data/projects.ts`. Add a typed object there to make a
new project available to the reusable project listing.

## Routes

- `/`
- `/links`
- `/projects`
- `/ohmxact`
- `/about`
- `/support`
- `/privacy`
- `/contact`
- custom `404`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.json`

## Deployment on Vercel

1. Import `KRiX-17/Studio-KRiX-Website` into Vercel.
2. Keep the detected framework as **Next.js**.
3. Use the default build command (`npm run build`) and output settings.
4. Add `studiokrix.com` as the primary production domain.
5. Add `studiokrix.com.au` and configure it to redirect to
   `https://studiokrix.com`.
6. Verify both DNS records, then redeploy once the domains are active.

No environment variables are currently required.

## Current placeholders

- OhmXact App Store URL
- OhmXact iPhone and iPad screenshots
- Founder portrait
- GitHub, LinkedIn, Instagram and YouTube profile URLs
- Final platform-specific App Store privacy disclosures

Replace placeholders only with confirmed production content. Do not invent
ratings, reviews or availability claims.
