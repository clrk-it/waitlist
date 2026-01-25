# Waitlist

Mivro waitlist built on Next.js 16 (App Router). Hero and CTA drive users into a structured interest form. Submissions are stored in Supabase; optional welcome email is sent via Resend. UI is Tailwind CSS v4 + Radix + Lucide with Framer Motion for animation.

## Features

- Animated hero with countdown and feature highlights.
- Dynamic waitlist counter backed by Supabase.
- Interest form with role-specific validation (clubs, ventures, journalists, regular users) and duplicate email protection.
- Admin-only dashboard at `/hidden` gated via middleware and Supabase auth.
- Optional welcome email via Resend.

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19
- **UI:** Tailwind CSS v4, Radix UI, Lucide, Framer Motion
- **Backend:** Supabase (Postgres + Auth) via `@supabase/supabase-js` and `@supabase/ssr`
- **Email (optional):** Resend

## Prerequisites

- Node.js 18+ and npm
- Supabase project with a `waitlist_entries` table (see `supabase/migrations`)
- Optional: Resend account and verified domain if you want outbound email

## Environment variables

Create `.env.local` (or `.env`) in the repo root:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
RESEND_API_KEY=your-resend-api-key            # optional, needed for emails
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-code      # optional, for search console
```

These must also be set in Azure Static Web Apps app settings.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
# open http://localhost:3000
```

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
npm run start
```

Note: On Windows PowerShell you might see `spawn EPERM` after compile; Linux runners (CI/Azure) build successfully.

## Deploy (Azure Static Web Apps)

- Workflow: `.github/workflows/azure-static-web-apps-mango-river-0f7860710.yml`
- `app_location: "/."`, `output_location: ""` (Next.js server build)
- Set app settings: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY` if emailing.

## API reference

- `GET /api/joinWaitList` → `{ item: number }` total count
- `POST /api/joinWaitList`
  - `email` (required)
  - `userType` one of `regular | journalist | venture_owner | club_owner` (required)
  - `interest` (required)
  - `club` (required for `club_owner`)
  - `ventureName`, `ventureCategories` (required for `venture_owner`)
  - `additionalQuestions` (optional)

## Admin access

`/hidden` is protected by middleware and only allows the admin email configured in `middleware.ts` (currently `hasnainmn7@gmail.com`). Update as needed.
