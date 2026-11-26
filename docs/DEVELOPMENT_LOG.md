# Development Log

## 2026-11-26: Phase 1, public website
**Done**
- Scaffolded Next.js 15 + TS + Tailwind v4 in `web/` (`create-next-app`). Added `lucide-react`, `framer-motion`.
- Built all Phase 1 pages and shared components (see `TECHNICAL_DOCUMENTATION.md`).
- Wrote the founding story: two Benildean students who started Coreform on a whim because they love technology and want to solve real-world problems.

**Files created**
- `web/src/lib/site.ts`, `web/src/lib/data.ts`
- `web/src/components/*` (Logo, Button, Section, Reveal, ServiceIcon, ServiceCard, DemoBadge, Mockup, ProjectCard, ProjectFilter, CTA, Navbar, Footer, HeroVisual, FounderCard, PostCard, ContactForm)
- `web/src/app/**` (all routes), `sitemap.ts`, `robots.ts`, `icon.svg`, `not-found.tsx`
- Removed default `favicon.ico` and template SVGs in `public/`

**Bugs and fixes**
- `next/font/google` failed with "Cannot read properties of null (reading '1')" (the font loader can't parse the font file URLs Google now returns). Fixed by loading the fonts from a Google Fonts `<link>` in `layout.tsx`, with font families set in `globals.css`.
- `lucide-react` v1 has no `Linkedin` brand icon. Used `ExternalLink` instead.

**Decisions**
- Content is in typed static files (`data.ts`), not a database, for Phase 1. It is shaped like the planned Supabase tables so it can be migrated later.
- Project screenshots are drawn in code (`Mockup.tsx`) instead of stock images. They are light, consistent, and clearly concept visuals.
- Inquiry and contact use mailto until Phase 2, so no button pretends to submit to a backend that doesn't exist.

## 2026-11-26: Visual redesign (palette, type, motion)
**Why:** the user said the site didn't follow the font and color palette and asked for a more appealing design with parallax, transitions and animations.

**Findings:** fonts were loading correctly, but the palette leaked: amber, emerald, orange, violet, indigo, cyan and red appeared in badges, mockups, post covers and form messages.

**Done**
- Strict palette: only #101D35, #2563EB, #F5F7FA, #64748B and #FFFFFF, plus tints and opacity variants of them. No other Tailwind color scales are used anywhere in `src/`.
- Stronger type: `.display-xl` / `.display-lg` Manrope 800 with tight tracking; IBM Plex Mono for labels.
- Dark navy page tops on every page, with a grid texture and a blue glow.
- Motion (all respect `prefers-reduced-motion`):
  - Page transitions (`app/template.tsx`)
  - Scroll progress bar at the top
  - Navbar: hides on scroll down, shrinks, sliding active pill, animated mobile menu
  - Hero: word-by-word headline reveal, layered parallax mockups, tilt toward the pointer
  - Scrolling marquee of services
  - Count-up numbers (real counts: services, projects, steps, founders)
  - Staggered reveals on grids; alternating parallax project columns
  - Cursor spotlight on service cards; hover lift, rotate and colour changes on cards
  - Process timeline line fills as you scroll; Gantt bars grow in
  - Project filter: sliding pill and animated re-layout
  - FAQ accordions turn navy when open
  - Parallax shapes in the CTA, and a parallax "PURPOSE" word on About
  - Large "COREFORM" wordmark in the footer
- Buttons are now pills with a sliding-arrow hover and a press effect.

**Files**
- New: `components/Motion.tsx` (Reveal, Stagger, StaggerItem, SplitWords, Parallax, ScrollProgress, CountUp, Spotlight), `components/Marquee.tsx`, `components/ProcessTimeline.tsx`, `components/TimelineBar.tsx`, `app/template.tsx`
- Removed: `components/Reveal.tsx` (merged into Motion.tsx)
- Restyled: globals.css, Button, DemoBadge, Section, Mockup, ServiceCard, ProjectCard, PostCard, FounderCard, Navbar, HeroVisual, CTA, Footer, ContactForm, ProjectFilter, and all pages

**Bugs fixed**
- SplitWords used non-breaking spaces, so the headline couldn't wrap: 611px of sideways scroll at 390px. Now uses normal spaces between the word blocks.
- In the hero, parallax and the entrance animation both animated `y` and fought each other. They are now split into nested layers.
- Running `next build` while `next dev` is running corrupts `.next` (Internal Server Error). Stop the dev server before building, or delete `.next` and restart.

## 2026-11-26: Palette and typography lock-down
**Why:** the user asked again to follow the design palette and typography.

**Done**
- Removed all Tailwind default colors and fonts (`--color-*: initial`, `--font-*: initial`). Only the five brand colors and three brand fonts are defined.
- Replaced the invented shades (navy-800, brand-600, brand-50, line, black shadows) with brand colors or their opacity variants. Body text is pure Midnight Navy (no more navy/80).
- Fonts are now self-hosted with `@fontsource-variable/manrope`, `@fontsource-variable/inter` and `@fontsource/ibm-plex-mono`. The Google Fonts `<link>` is removed, so fonts load on any network.
- Font roles enforced: buttons moved from mono to Inter; in-card sub-headings moved from mono to Manrope.
- `next.config.ts`: `devIndicators: false` hides the dev-only "N" badge.

**Verified:** a browser audit of 13 pages found no computed color outside the palette (except the dev overlay, now hidden). Only the three brand fonts load, each in its role. Production build passes (39 pages); typecheck and lint are clean.

## 2026-11-26: Re-theme to Monochrome Industrial / Stone Loft
**Why:** the user updated `claude.md` §2 (the file was modified at 17:38) with a new theme, palette and typography rule, and asked to follow it. The two previous rounds had enforced the old navy/blue palette, which was the misunderstanding.

**Done**
- Palette replaced with Stone Loft. Component class names kept as role aliases (navy→charcoal, slate→steel, white→off-white, soft→light-steel tint), so no layouts changed.
- New context-aware accent: `--accent` is charcoal on light and sand under the `on-dark` utility. `text-on-brand` handles contrast. A script added `on-dark` to every `bg-navy` surface and swapped `text-white` for `text-on-brand` on accent fills.
- CTA block is now sand with charcoal text. The progress bar and selection are sand. Logo accent is steel on light and sand on dark. The favicon is redrawn. Article covers use charcoal, steel and light steel.
- Fonts: Archivo (expanded) for headings, Instrument Sans for body, IBM Plex Mono for labels. Manrope and Inter were removed (Inter is excluded by the brief).
- Resized the hero headline and footer wordmark for Archivo's wider letters.

**Verified:** the browser audit (13 pages) loads only Archivo, Instrument Sans and IBM Plex Mono, and finds no solid colors outside Stone Loft (blended tints aren't read by the script). Screenshots checked at 1440 and 390. Production build passes.

**Note:** Steel (#6C7478) on off-white (#EEF1F2) is about 4.2:1 contrast, just under WCAG AA for small text. It's used for secondary text only.

## 2026-11-26: Rebrand to Handled. and repositioning
**Why:** the founders settled the business direction (see "Decisions 2026-11-26" in `PROJECT_OVERVIEW.md`): local SMEs in Metro Manila, "see it before you pay", published prices, reduced scope.

**Done**
- `site.ts`: name Handled., new tagline and description, Messenger link field, Pricing in the nav in place of Our Process.
- Replaced "Coreform" in all page copy, metadata, and the blog author name. Logo wordmark shows "Handled." with an accent-colored period.
- Homepage: new hero and CTAs (free preview, pricing), a 3-step "how it works" strip replacing the stats counters, and industry chips.
- New `/pricing` page driven by `packages`, `addOns`, and `pricingTerms` in `data.ts`.
- New `POST /api/contact` (Resend over HTTP, no new dependency) and rewritten `ContactForm` used on `/contact` and `/start-project`. `/start-project` is now the free-preview request.
- New `MessengerButton`, hidden until a Messenger link is set.
- CTA block defaults, nav and footer buttons updated to the free-preview offer. Footer keeps a link to Our Process; sitemap includes `/process` and `/pricing`.

**Verified:** typecheck, lint, and production build pass. The endpoint returns 400 for missing fields, a bad email, or bad JSON; 200 for honeypot submissions; and 503 without Resend credentials. In the browser, the home and pricing pages render, and at 375px the free-preview form shows the direct-contact fallback when sending is unavailable. Not yet tested: a real send through Resend.


## 2026-11-27: Playful redesign ("sticker workbench")
**Why:** the user liked the 3D models but felt the design looked too professional, and asked for something fun and engaging.

**Done** (branch `feat/playful-design`; the 3D laptop and phone were not changed)
- `globals.css`: `.pop`, `.pop-hover`, `.pop-sm`, `.tape-stripes`, `--pop-shadow`, `--ease-bounce`, wiggle/spin-slow/bob animations.
- New: `components/TapeBand.tsx`, `components/Doodle.tsx`.
- Restyled: Button (sticker buttons, no wrapping), Navbar CTA, ServiceCard, FounderCard, ProcessTimeline, PostCard, DemoBadge (dashed stamp), CTA, Footer (yellow wordmark, sticker button, fixed "Handled.." in the copyright), MacbookHero (hand-drawn arrow by "or scroll to watch one get built").
- Homepage: tilted step cards joined by doodle arrows, outlined industry chips, caution tape band before the projects, price tags.

**Bugs fixed**
- `node_modules` was missing three.js, @react-three and lenis (listed in package.json, never installed), so the homepage failed to compile. `npm ci` fixed it.

**Verified:** typecheck and lint pass. Screenshots checked at 1440px and 390px. Production build passes (checked 2026-11-27 before merging).

## 2026-11-27: MacBook-style laptop, screen drift fix
**Why:** the user reported that the sample site on the hero laptop slid off the screen (sticking out above the bezel and leaving a black band at the bottom), and asked for the laptop to look like a MacBook.

**Cause:** the screen was a DOM page laid over the WebGL canvas with drei `<Html transform>` (CSS 3D). Its CSS projection can disagree with the WebGL drawing (browser zoom, pixel ratio, GPU), so the two drifted apart. It could not be reproduced in headless Chromium, but the design made it possible on any machine.

**Done**
- New `components/Macbook.tsx`: a MacBook-style laptop built from shapes (rounded aluminium slabs with bevelled edges, black glass bezel with notch and camera, black keyboard area with the MacBook layout including half-height function row and inverted-T arrows, speaker grilles, wide trackpad, hinge in the base, rubber feet). No maker's logo; the lid shows the "h." mark.
- New `lib/sampleSite.ts`: paints the café sample site (and the lid logo) onto a canvas with the brand fonts. It becomes the screen's texture, so it is part of the model and cannot drift. The page scroll moves the texture window; the screen fades up from black as the lid opens.
- `LaptopScene.tsx`: uses the new model and texture, adds a local light-panel environment for the aluminium sheen (no network fetch). Pose and scroll timeline unchanged.
- Removed `components/SampleSite.tsx` (replaced by the canvas version). `public/models/laptop.glb` is no longer used but kept.

**Verified:** typecheck and lint pass; screenshots at 1440x900 (closed, opening, open, scrolled, closing) and 390px.

## 2026-11-27: Realistic matcha café on the laptop screen
**Why:** the user asked for the screen content to look like a real website, imagined as a matcha café.

**Done**
- `lib/sampleSite.ts` rewritten: a made-up matcha café, "leaf & whisk", laid out like a real desktop site (announcement bar, nav with order button, hero with a painted table scene of an iced matcha latte, tea bowl and bamboo whisk in window light, bestsellers with painted drinks and a cheesecake and ₱ prices, a dark-green "our matcha" band with an overhead shot, a visit section with hours and a drawn map, footer). Everything is painted on canvas with a seeded random, so it looks the same on every load and downloads no images.
- The footer says "A sample website made by Handled." The address uses a placeholder street ("24 Sample Street") so it doesn't point at a real place.
- A fixed browser toolbar (window buttons, back/forward, address field "leafandwhisk.ph") sits across the top of the screen; the page scrolls under it, and the notch sits inside it.
- New dependency: `@fontsource-variable/fraunces` (serif for the café site), imported only in the lazily loaded `LaptopScene` chunk.
- Texture size is capped at 1.25x and by the GPU's max texture size.

**Verified:** typecheck and lint pass; screenshots of the open laptop at the top, middle and end of the page scroll.
