# Setup and Deployment

## Requirements
Node.js 20+ (tested on 24.22), npm.

## Local development
```bash
cd web
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the build
npm run lint
```

## Environment variables
None needed for Phase 1. Phase 2 will add (names only):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only), `RESEND_API_KEY`, `INQUIRY_NOTIFY_EMAIL`, `NEXT_PUBLIC_SITE_URL`.

## Deployment (Vercel)
1. Push the repo to GitHub.
2. Import it into Vercel and set **Root Directory** to `web`.
3. Framework preset: Next.js (default build and output settings).
4. After you have a domain, update `site.url` in `web/src/lib/site.ts`.

## Troubleshooting
- **next/font Google error during build:** fonts are loaded with a `<link>` in `layout.tsx` on purpose. Don't switch back to `next/font/google` without testing the build.
