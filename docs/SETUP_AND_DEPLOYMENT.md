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
Server only. Put them in `web/.env.local` locally and in Vercel project settings for production. The site runs without them; the form then asks visitors to email directly.

| Name | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for sending inquiry emails |
| `CONTACT_TO_EMAIL` | Where inquiries are delivered (the founders' shared inbox) |
| `CONTACT_FROM_EMAIL` | Optional sender, e.g. `Handled <hello@yourdomain>`. Defaults to Resend's test sender `onboarding@resend.dev`, which only delivers to the Resend account owner's address until a domain is verified. |

## Deployment (Vercel)
1. Push the repo to GitHub.
2. Import it into Vercel and set **Root Directory** to `web`.
3. Framework preset: Next.js (default build and output settings).
4. After you have a domain, update `site.url` in `web/src/lib/site.ts`.

## Troubleshooting
- **next/font Google error during build:** fonts are loaded with a `<link>` in `layout.tsx` on purpose. Don't switch back to `next/font/google` without testing the build.
