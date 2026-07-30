# Studio KRiX Website — Agent Guide

## Project

This repository contains the official Studio KRiX website. It is a content-led,
static-first Next.js App Router application intended for Vercel.

## Required approach

- Keep the site independent of a CMS and backend unless a future task explicitly adds one.
- Prefer Server Components. Add a Client Component only when an interaction genuinely needs one.
- Keep projects in `data/projects.ts` so new projects can be added without reshaping page code.
- Preserve the restrained Studio KRiX design language: near-black canvas, architectural hairlines, open layouts, editorial typography and one restrained violet accent.
- Do not add fake clients, statistics, testimonials, reviews, ratings or product claims.
- Maintain WCAG AA contrast, semantic headings, keyboard access, visible focus and reduced-motion behaviour.
- Keep canonical URLs on `https://studiokrix.com`.

## Verification

Before handing off a change, run:

```bash
npm run lint
npm run typecheck
npm run build
```

For visible changes, also review affected routes at desktop and mobile widths.
