# Aniko — Portfolio

A premium, animated, fully responsive portfolio built with Next.js 15 (App Router), React 19,
TypeScript, Tailwind CSS v4, Framer Motion, next-intl (uz / en / ru), next-themes, React Hook
Form + Zod, and Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/en` (or your browser's matching locale).

```bash
npm run build
npm run start
```

> **Note on fonts:** this project uses `next/font/google` for Inter and JetBrains Mono, which
> downloads the font files at build time. If you build in a network-restricted environment
> (like a CI sandbox with no internet), the build will fail trying to reach
> `fonts.googleapis.com`. On a normal machine or CI with internet access this works out of the
> box — nothing to change.

## Project structure

```
src/
  app/
    [locale]/
      layout.tsx       # root HTML shell, fonts, providers, metadata
      page.tsx          # assembles all sections
    robots.ts
    sitemap.ts
    not-found.tsx       # global 404 fallback
  components/
    navbar.tsx          # glass navbar, active-section indicator, language + theme switch
    footer.tsx
    loading-screen.tsx  # dotlottie-web powered loader (see below)
    scroll-progress.tsx
    scroll-to-top.tsx
    cursor-follower.tsx
    icons.tsx           # GitHub / LinkedIn marks (not shipped in current lucide-react)
    sections/           # one file per page section (hero, about, skills, ...)
    ui/                 # Container, SectionHeading, Reveal, MagneticButton
  data/skills.ts         # skill list + category + level
  i18n/                  # next-intl routing, navigation, request config
  messages/               # en.json, ru.json, uz.json — every string on the site
  lib/utils.ts
middleware.ts             # locale detection/redirect
```

## Editing content

Everything user-facing lives in `src/messages/{en,ru,uz}.json`. Each locale file has the exact
same key structure — sections like `projects.items`, `experience.items`, `certificates.items`,
`gallery.items`, `blog.items` and `testimonials.items` are arrays, so you can add, remove or
reorder entries and all three languages will pick it up automatically. Skill names/levels live
in `src/data/skills.ts` (kept out of the translation files since tech names like "React" or
"Python" don't need translating).

## Swapping in your own loading animation

`src/components/loading-screen.tsx` already wires up `@lottiefiles/dotlottie-web` exactly as
supplied:

```ts
const LOTTIE_SRC = "https://lottie.host/YOUR_ANIMATION_ID.lottie";
```

Just set `LOTTIE_SRC` at the top of that file to your `.lottie` (or `.json`) URL. Until you do,
it falls back to a small spinning-ring mark so the loader never looks broken.

## Things left as placeholders on purpose

- **Project screenshots / certificate images / gallery photos** are rendered as soft gradient
  tiles with an icon, so you can drop in real `next/image` calls once you have final assets.
- **CV download button** doesn't yet link to a file — wire it to your PDF's URL in
  `src/components/sections/hero.tsx`.
- **Contact form** simulates a submit (no email is actually sent) — connect it to your backend,
  Resend, Formspree, or an API route in `onSubmit` inside `src/components/sections/contact.tsx`.
- **Social links / phone number** in `contact.tsx` and `footer.tsx` are placeholders — update
  the `SOCIALS` array and phone number with your real handles.
- **Google Maps** in the contact section is a stylized placeholder block, not a live embed.

## Design tokens

Colors, fonts and the dark-mode variant are defined once in `src/app/globals.css` via Tailwind
v4's `@theme` block, matching the light/dark palette from the brief exactly (`#2563EB` accent in
light mode, `#4F8CFF` in dark mode, etc.). Theme preference and language are both persisted
automatically (`next-themes` uses `localStorage` + `prefers-color-scheme`; `next-intl` encodes
the language in the URL path, e.g. `/ru/#projects`).
