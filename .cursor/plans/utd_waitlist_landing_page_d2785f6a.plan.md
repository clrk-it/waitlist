# UTD Waitlist Landing Page Implementation

## Overview

Create a modern, dark-mode waitlist landing page for "UTD Club Store" with glassmorphism effects, animated mesh gradient background, and responsive layout using Next.js, Tailwind CSS, and shadcn/ui components.

## Implementation Steps

### 1. Install shadcn/ui Components

- Install `Button` and `Input` components using `npx shadcn@latest add button input`
- These will be created in `components/ui/` directory

### 2. Update CSS Variables in `app/globals.css`

- Replace the existing color variables in `:root` and `.dark` with UTD brand colors in HSL format
- Update variables:
- `--primary`: UTD Orange (29 100% 45%)
- `--secondary`: UTD Green (157 54% 18%)
- `--background`: Deep Dark (0 0% 4%)
- `--foreground`, `--muted-foreground`, `--card`, `--border`, `--input`: Dark mode appropriate values
- Keep the existing `@theme inline` structure for Tailwind v4 compatibility

### 3. Update `app/layout.tsx`

- Add `dark` class to the `<html>` element to enable dark mode by default
- Update metadata title and description for UTD Club Store

### 4. Create Waitlist Landing Page in `app/page.tsx`

The page will include:

**Structure:**

- **Navbar**: Centered "UTD" logo/text at the top
- **Hero Section**: Centered content with glassmorphism card
- **Background**: Mesh gradient using multiple pseudo-elements with UTD Orange and Green

**Components:**

- **Glassmorphism Card**: 
- `backdrop-blur-lg`, `bg-white/5`, `border-white/10`
- Rounded corners using `rounded-lg` or `rounded-xl`
- Centered with `max-w-lg` or `max-w-xl`

- **Headline**: 
- "Something Extraordinary Is Coming Soon"
- Large, bold, `tracking-tight`
- High contrast white text

- **Subtext**: 
- "The official marketplace for UTD clubs. Join the waitlist to get early access and exclusive drops."
- Muted foreground color using `text-muted-foreground`

- **Action Area**:
- shadcn `Input` component for email
- shadcn `Button` component (primary color) with "Join Waitlist" text
- Responsive: Stack on mobile (`flex-col`), side-by-side on desktop (`flex-row`)
- Use `flex`, `gap-*`, `w-full`, `md:flex-row`, `md:w-auto` utilities

- **Social Proof**:
- Avatar stack: 4-5 circular divs with gradient backgrounds
- Text: "500+ students joined"
- Use `flex items-center gap-*` for layout

**Background Mesh Gradient:**

- Use `::before` and `::after` pseudo-elements on a wrapper div
- Multiple radial gradients with UTD Orange and Green
- Positioned absolutely with blur effects
- Use `opacity-*` and `blur-*` utilities for glow effect

### 5. Styling Guidelines

- **No hard-coded values**: Use Tailwind utilities (`w-full`, `max-w-lg`, `gap-4`, etc.)
- **Colors**: Always use CSS variables (`bg-primary`, `text-primary-foreground`, `bg-secondary`, etc.)
- **Spacing**: Use Tailwind spacing scale (`p-6`, `gap-4`, `mb-8`, etc.)
- **Responsive**: Use `md:*` breakpoints for desktop layouts
- **Typography**: Use Tailwind typography utilities (`text-4xl`, `font-bold`, `tracking-tight`)

## Files to Modify

1. `app/globals.css` - Update CSS variables with UTD brand colors
2. `app/layout.tsx` - Add dark mode class and update metadata
3. `app/page.tsx` - Create the complete waitlist landing page
4. `components/ui/button.tsx` - Will be created by shadcn CLI
5. `components/ui/input.tsx` - Will be created by shadcn CLI

## Technical Notes

- The mesh gradient will use positioned pseudo-elements with `absolute` positioning
- Glassmorphism achieved through `backdrop-blur` and semi-transparent backgrounds
- All colors reference CSS variables, no hex codes or arbitrary values
- Responsive design uses Tailwind's mobile-first approach