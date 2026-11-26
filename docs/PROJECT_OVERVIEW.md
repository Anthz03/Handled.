# Project Overview

## Decisions 2026-11-26 (replace older items below where they conflict)
- **Name:** Handled. The period is style only; drop it where it causes problems (folders, social handles, DTI). "Coreform" was a placeholder.
- **Goal:** side business and portfolio builder while studying, with room to go full-time after graduation.
- **Target:** local SMEs in Metro Manila. The site names cafés, restaurants, barbershops, salons, and clinics as examples but welcomes any local business. Students only as a side line (org pages, workshops), never graded work.
- **Differentiator:** "See it before you pay": a free homepage preview before any commitment, published starting prices, and local Messenger support.
- **AI:** optional add-on (e.g. Messenger assistant), only when a business needs it.
- **Pricing (standardized 2026-11-26, same list used in outreach):** Starter Page ₱8,000, Business Site ₱15,000, add-ons quoted, Care Plan ₱1,000/month (optional). Domain optional, in the client's name, at cost. 30 days of free fixes after launch, then ₱500 per change. 50% down, 50% on launch, 2 revision rounds. ₱8,000 is the floor: a lower budget gets less scope, not a lower price. Set against 2026 freelancer ranges (basic ₱3k–10k, business ₱10k–25k) for a first-time, student-run studio. Edit in `web/src/lib/data.ts` (`packages`).
- **Sales:** prospects from Google Maps and Facebook (businesses with no website), tracked in one shared sheet; mockups built from 3 reusable templates (food and drinks, appointments, general SME), homepage only.
- **Portfolio:** concept projects only until a client agrees to be featured.
- **Scope:** keep the Phase 1 site; Phase 2 is a simple contact form (Resend) plus a Messenger button. The 6-step form with uploads, Supabase database, admin dashboard, project management, and blog CMS are deferred. Past-client support uses an off-the-shelf help desk until about 10 Care Plan clients.
- **Hosting:** Vercel free address for now, no custom domain yet.

## Business concept
**Handled.** (formerly the placeholder "Coreform Digital Solutions") is a technology consulting and development startup. It helps individuals, entrepreneurs, startups, and businesses turn ideas and operational problems into practical digital solutions.

## Founding story (confirmed)
Handled was started by **two Benildean students** (De La Salle-College of Saint Benilde) on a **spontaneous decision**. Both love technology and want to build solutions for real-world problems. Keep this story simple and honest. Do not invent qualifications, experience, clients, or results.

## Brand
- Tagline: "Your Ideas. Our Technology. Real Solutions." (alt: "Technology Made Practical. Solutions Made Purposeful.")
- Personality: minimalist, professional, trustworthy, approachable, technology-driven.
- Theme: **Monochrome Industrial**. Palette **Stone Loft** (#1F2426, #6C7478, #B8BFC2, #EEF1F2, #D1BFA8). Fonts: Archivo (headings), Instrument Sans (body), IBM Plex Mono (labels). Details in `DESIGN_SYSTEM.md`.
- The company name lives in one place: `web/src/lib/site.ts`.

## Target clients
SMEs, startups and entrepreneurs, corporate organizations, professionals and individuals.

## Services
1. Website Development 2. System Development 3. Database Design and ERD 4. UI/UX Design 5. IT Consulting 6. Technical Documentation

## Scope (from `claude.md`)
- Phase 1: Public website (branding, all public pages, responsive nav). **Done**
- Phase 2: Multi-step inquiry form, Supabase database, file uploads, Resend emails, confirmation page.
- Phase 3: Admin auth, inquiry dashboard, project tracking, notes, quotations.
- Phase 4: Blog CMS, SEO, analytics, security testing, deployment.

## Confirmed decisions
- Stack: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, Lucide icons, Framer Motion. Supabase + Resend + Vercel planned for Phase 2+.
- Portfolio items are **concept/demo projects**, always labeled as such.
- Testimonials section is a placeholder layout only. No fake reviews.
- "Keep it simple": the user asked us not to overcomplicate things.
