# Project Status

**Current phase:** Phase 1 complete, rebranded to Handled. (2026-11-26). Simplified Phase 2 contact form built; needs Resend credentials to send.
**Last updated:** 2026-11-26

## Completed
- Next.js app scaffolded in `web/`
- Brand theme, logo mark, favicon
- Pages: Home (all sections A–K), About, Services + 6 service detail pages, Projects (with category filter) + 6 concept project pages, Meet the Team, Our Process, Insights + 10 articles, Contact, Start a Project (interim), Privacy Policy (draft), Terms (draft), 404
- Responsive navigation (mobile menu below 1280px)
- Sitemap, robots.txt, per-page metadata
- Production build and lint pass. Checked visually at 1440px and 390px.
- Visual redesign: strict brand palette, bolder type, parallax and animations (see DEVELOPMENT_LOG 2026-11-26 redesign).

## Rebrand and repositioning (2026-11-26)
- Name changed to Handled. everywhere (`site.ts`); logo wordmark is "Handled." with an accent period.
- New homepage hero ("See your new website before you pay."), 3-step "how it works" strip, and "Built for" industry chips.
- New `/pricing` page (packages, add-ons, payment terms). "Pricing" replaced "Our Process" in the top nav; Process stays in the footer and sitemap.
- `/start-project` is now the free-preview request form. Nav and footer buttons say "FREE PREVIEW".

## Form behavior
- Contact and free-preview forms post to `/api/contact`, which emails the founders through Resend.
- Until `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set, the form shows a message asking visitors to email directly (and Messenger, once set).
- The Messenger button appears only after `site.socials.messenger` is filled in.

## Pending (needs the user)
- Real founder names, bios, skills, background, LinkedIn URLs, and portraits (`web/src/lib/data.ts` → `founders`)
- Real email, phone, location, hours, social links, and domain (`web/src/lib/site.ts`)
- Legal review of the Privacy Policy and Terms

## Next steps
1. Create a Resend account, set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (in `web/.env.local` and on Vercel), and send a test inquiry.
2. Fill in the placeholders above, including the Messenger link and a shared business email.
3. Deploy to Vercel and update `site.url`.
4. Decide whether to rewrite the six service pages around the packages (Database, ERD, and Documentation currently remain headline services).
5. Build the 3 mockup templates (food and drinks, appointments, general SME) outside this repo.
