# Database Documentation

**Status:** No database yet (Phase 1 uses static content in `web/src/lib/data.ts`).

Phase 2 will add Supabase (PostgreSQL). Planned tables are listed in `claude.md` §16: profiles, inquiries, inquiry_services, services, inquiry_attachments, internal_notes, projects, project_updates, quotations, team_members, portfolio_projects, portfolio_categories, blog_posts, testimonials, audit_logs.

Plan for the first tables (Phase 2): `services`, `inquiries`, `inquiry_services`, `inquiry_attachments`, with RLS that allows anonymous **insert only** on inquiries and no public reads.

Record the schema, ERD, migrations, and RLS policies here once they are created.
