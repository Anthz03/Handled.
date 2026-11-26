# Known Issues and TODO

| Priority | Item | Notes |
|---|---|---|
| High | Replace founder placeholders | `data.ts` → `founders` (names, bios, skills, background, LinkedIn, portraits) |
| High | Replace contact placeholders | `site.ts` (email, phone, location, hours, socials, domain) |
| High | Resend credentials | Form is built; set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` to start receiving inquiries |
| High | Messenger link | Set `site.socials.messenger` to show the Messenger buttons |
| Medium | Service pages | Six services still include Database/ERD and Documentation as headline services; consider regrouping around the packages |
| Medium | Rate limiting | `/api/contact` only has a honeypot; add rate limiting if spam appears |
| Medium | Legal review | Privacy Policy and Terms are drafts |
| Medium | OG image | Add `app/opengraph-image` for social previews |
| Low | Founder portraits | Currently initials tiles |
| Low | Analytics | Google Analytics in Phase 4 |
| Low | Blog CMS | Articles are static in `data.ts` |
| Deferred | 6-step inquiry form, file uploads, Supabase database, admin dashboard, project tracking, blog CMS | Out of scope since 2026-11-26; revisit once there are regular clients |
| Deferred | Client support portal | Use an off-the-shelf help desk until about 10 Care Plan clients |
