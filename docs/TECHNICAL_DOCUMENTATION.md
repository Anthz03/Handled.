# Technical Documentation

## Stack
Next.js 15.5 (App Router), React 19, TypeScript, Tailwind CSS v4, lucide-react, framer-motion. Planned: Supabase (Postgres, Auth, Storage), Resend, Vercel.

## Structure
```
STARTUP/
├── claude.md, instructions.md   # project brief and working rules
├── docs/                        # this documentation
└── web/                         # Next.js app
    └── src/
        ├── app/
        │   ├── layout.tsx       # fonts, Navbar, Footer, metadata
        │   ├── page.tsx         # Home (sections A–K)
        │   ├── about/ services/ services/[slug]/ projects/ projects/[slug]/
        │   ├── team/ process/ insights/ insights/[slug]/ contact/
        │   ├── start-project/   # interim mailto page (Phase 2: real form)
        │   ├── privacy/ terms/ not-found.tsx
        │   └── sitemap.ts robots.ts icon.svg globals.css
        ├── components/          # shared UI
        └── lib/
            ├── site.ts          # company name, contact info, nav (edit to rebrand)
            └── data.ts          # services, projects, founders, process, values, posts
```

## Key components
| Component | Purpose |
|---|---|
| `Navbar` (client) | Sticky header, active link, mobile menu (`xl` breakpoint) |
| `Footer` | Logo, nav, services, socials, legal links |
| `Section.tsx` | `Eyebrow`, `SectionHeading`, `PageHeader` |
| `Button` | Link button: primary, secondary, ghost, light |
| `Reveal` (client) | Fade-up on scroll, respects reduced motion |
| `Mockup` / `MockupPanel` | Code-drawn UI previews (site, dashboard, chart, table, erd, calendar) |
| `ProjectCard`, `ProjectFilter` (client) | Portfolio cards and category filter |
| `ServiceCard`, `ServiceIcon` | Service grid |
| `FounderCard` | Founder profile (compact or `full`) |
| `PostCard`, `PostCover` | Article cards and generated covers |
| `ContactForm` (client) | Validates input, opens mailto |
| `HeroVisual` (client) | Animated hero composition |

## Rendering
All pages are static (SSG) except `/start-project`, which reads `?service=` to pre-fill the email subject.

## API routes and integrations
None yet. Phase 2 adds a server action or API route for inquiries, Supabase, and Resend.

## Security
No secrets or env vars yet. `robots.ts` already disallows `/admin` for Phase 3.
