# Waitlist

A Next.js 16 waitlist experience for UTD Club Store. Visitors land on a hero card that highlights the upcoming launch, click through to a club interest form, and submit their details to a MongoDB-backed API. The interface uses Tailwind CSS v4 utilities and Radix UI-based components for consistent styling.

## Features

- Landing page with animated mesh gradient background and prominent waitlist call-to-action.
- Club interest form with client/server validation for UTD email addresses and club selection (including custom club entry).
- MongoDB-backed `/api/joinWaitList` endpoint for creating and counting waitlist submissions.
- Post-submission thank-you screen with quick navigation back to the form or homepage.
- Dark-friendly UI built with Tailwind CSS, Radix primitives, and Lucide icons.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **UI:** Tailwind CSS v4, Radix UI, Lucide icons
- **State/Forms:** React 19 client components with custom validation helpers
- **Database:** MongoDB via the official Node driver

## Getting started

### Prerequisites

- Node.js 18+ and npm
- Access to a MongoDB database/cluster

### Environment variables

Create an `.env.local` file in the project root with:

```bash
MONGODB_URI="your-mongodb-connection-string"
MONGODB_DB="your-database-name"
```

Both variables are required for the API routes to boot.

### Installation

```bash
npm install
```

### Running the app

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Project structure

- `app/page.tsx` – Landing page with hero/waitlist card.
- `app/form/page.tsx` – Club interest form shell.
- `app/thank-you/page.tsx` – Post-submission confirmation.
- `app/api/joinWaitList/route.ts` – GET returns total waitlist count; POST creates a submission (email, club, interest, optional questions).
- `components/` – UI building blocks, including the `WaitlistCard`, `InterestForm`, and layout visuals.
- `lib/mongodb.ts` – Shared MongoDB connection helper using env configuration.

## API quick reference

- `GET /api/joinWaitList` → `{ item: number }` total waitlist count.
- `POST /api/joinWaitList` → Creates a waitlist record. Body fields:
  - `email` (required, must be a valid `@utdallas.edu` address)
  - `club` (required)
  - `interest` (required)
  - `additionalQuestions` (optional)
