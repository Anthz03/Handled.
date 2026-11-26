# Design System

## Theme: Monochrome Industrial (claude.md §2, updated by the user 2026-11-26)

## Colors: palette "Stone Loft" (locked in `web/src/app/globals.css`)
Tailwind's default colors are removed, so only these exist.

| Hex | Name | Token (exact) | Role alias used in components |
|---|---|---|---|
| #1F2426 | Charcoal | `ink` | `navy`: primary text, dark sections, primary button on light |
| #6C7478 | Steel | `steel` | `slate`: secondary text, labels, logo accent on light |
| #B8BFC2 | Light steel | `mist` | `soft` = light steel blended 38% into off-white (section and card surfaces); borders |
| #EEF1F2 | Off-white | `paper` | `white`: page background, text on dark |
| #D1BFA8 | Sand | `sand` | accent on dark surfaces, CTA block, progress bar, selection |

**Context-aware accent:** `brand` = charcoal on light surfaces and sand inside `on-dark` surfaces. `text-on-brand` gives the readable text color for either case. Any `bg-navy` surface must also carry `on-dark`.
Sand is never used as text on off-white (contrast is too low).

## Typography (self-hosted via @fontsource; Inter and other generic fonts are excluded per the brief)
| Role | Font | Settings |
|---|---|---|
| Headings | **Archivo** (variable, expanded) | 700–800, `font-stretch` 112–118%, tracking -0.02 to -0.03em |
| Body | **Instrument Sans** (variable) | 400–600; also nav, buttons and forms |
| Technical labels | **IBM Plex Mono** | 400–600; section labels, categories, dates, numbers, badges, DB fields |

## Logo
Four rounded squares in a 2×2 grid forming a "C": the top-left block and connectors use the accent (steel on light, sand on dark), and the bottom-right block is faded (the C's opening). See `components/Logo.tsx` and `app/icon.svg`.

## Layout
- `.container-x`: max 1200px, 20px gutter on mobile, 32px from md up.
- Sections: `py-24`–`py-28`, alternating off-white, light steel (`soft`) and charcoal.
- Cards: `rounded-3xl`, mostly `bg-soft` (no border), with a hover lift. Page tops are charcoal.
- Buttons: pill (`rounded-full`), with a sliding-arrow hover and press scale.
- Breakpoints: Tailwind defaults. Nav collapses below `xl` (1280px).

## Motion (components/Motion.tsx)
- `Reveal`: fade and rise once in view. `Stagger` / `StaggerItem`: staggered children.
- `SplitWords`: word-by-word headline reveal (used in page headers).
- `Parallax speed={n}`: scroll-linked vertical drift.
- `CountUp`, `Spotlight` (cursor glow), `ScrollProgress`.
- Easing: `[0.22, 1, 0.36, 1]`, 0.5–1s. Everything is disabled under `prefers-reduced-motion`.
- Page transitions are in `app/template.tsx`.

## Conventions
- Every concept project shows the **Concept project** badge (accent tint).
- Eyebrow label above each section heading.
- Final CTA block (navy, rounded) near the end of most pages.
- Animations are subtle (fade-up, slow float) and turn off with `prefers-reduced-motion`.
