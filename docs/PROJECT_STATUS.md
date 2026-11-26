# Project Status

**Current phase:** Phase 1 complete (public website). Phase 2 not started.
**Last updated:** 2026-11-26

## Completed
- Next.js app scaffolded in `web/`
- Brand theme, logo mark, favicon
- Pages: Home (all sections A–K), About, Services + 6 service detail pages, Projects (with category filter) + 6 concept project pages, Meet the Team, Our Process, Insights + 10 articles, Contact, Start a Project (interim), Privacy Policy (draft), Terms (draft), 404
- Responsive navigation (mobile menu below 1280px)
- Sitemap, robots.txt, per-page metadata
- Production build and lint pass. Checked visually at 1440px and 390px.
- Visual redesign: strict brand palette, bolder type, parallax and animations (see DEVELOPMENT_LOG 2026-11-26 redesign).

## Interim behavior (Phase 1)
- **Start a Project** page opens a pre-filled email (mailto) instead of the real form.
- **Contact form** validates input, then opens the visitor's email app (mailto).

## Pending (needs the user)
- Real founder names, bios, skills, background, LinkedIn URLs, and portraits (`web/src/lib/data.ts` → `founders`)
- Real email, phone, location, hours, social links, and domain (`web/src/lib/site.ts`)
- Confirm or replace the company name
- Legal review of the Privacy Policy and Terms

## Next steps
1. Fill in the placeholders above.
2. Phase 2: build the multi-step inquiry form at `/start-project` (6 steps, client and server validation), set up the Supabase schema (`inquiries`, `services`, `inquiry_services`, `inquiry_attachments`) with RLS, private Storage bucket, Resend emails, reference numbers, confirmation page, duplicate-submit protection.
