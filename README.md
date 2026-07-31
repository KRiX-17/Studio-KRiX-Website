# Studio KRiX Website

The official personal portfolio, creative hub and professional profile for
Christopher Helene, KRiX and Studio KRiX in Sydney, Australia.

Production: [https://studiokrix.com.au](https://studiokrix.com.au)

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
- `/projects`
- `/ohmxact`
- `/about`
- `/links`
- `/contact`
- `/support`
- `/privacy`
- custom `404`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.json`

## Deployment on Vercel

1. Import `KRiX-17/Studio-KRiX-Website` into Vercel.
2. Keep the detected framework as **Next.js**.
3. Use the default build command (`npm run build`) and output settings.
4. Set `studiokrix.com.au` as the primary production domain.
5. Assign `studiokrix.com`, `www.studiokrix.com` and
   `www.studiokrix.com.au` to the same project.
6. The Next.js host redirects permanently send all three alternate hosts
   directly to `https://studiokrix.com.au`, preserving paths and query strings.
7. Do not modify MX, SPF, DKIM, Apple verification or any other mail-related
   DNS records used by iCloud Custom Email.

No environment variables are currently required.

## Release notes

- OhmXact App Store URL
- Final platform-specific App Store privacy disclosures

The OhmXact iPhone and iPad screenshots are genuine product screenshots. The
App Store destination remains intentionally easy to update in
`data/links.ts`. Do not invent ratings, reviews, availability claims or an App
Store URL.
