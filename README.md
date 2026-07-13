# Demski Group Website

**Client:** The Demski Group

## What This Project Is

The official marketing website for The Demski Group, a US-based custom software development firm with 12+ years of experience and 600+ successful projects. The site includes service pages, case studies, a blog, careers listings, a software cost calculator, and technology/methodology pages. Built with Astro in server-side rendering (SSR) mode and deployed on Vercel.

## Tech Stack

- **Framework:** Astro 6 (SSR mode)
- **Language:** TypeScript
- **Hosting / Deployment:** Vercel (via `@astrojs/vercel` adapter)
- **Testing:** Playwright
- **Node:** >=22.12.0

## How to Set Up Locally

1. Clone the repository:
   ```bash
   git https://github.com/thedemskigroup/demski-group-headless.git
   cd demski-group
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a local environment file:
   ```bash
   cp .env.example .env
   ```
   *(Fill in any values needed — see Environment Variables below.)*

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:4321](http://localhost:4321) in your browser.

## Environment Variables

Create a `.env` file at the project root (never commit this file). Required variables:

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | Only needed if running AI-integrated features locally |

> Vercel injects its own tokens automatically at build and preview time — you do not need to set `VERCEL_OIDC_TOKEN` manually.

## Deployment Notes

- **Platform:** Vercel
- **Mode:** SSR (server-side rendering), max function duration 30 s
- **Auto-deploy:** Pushes to `main` trigger a production deployment on Vercel
- **Branch workflow:** Work on `feat/<clickup-task-name>` branches only — never commit directly to `develop` or `main`
- **Redirects:** Configured in `astro.config.mjs`

## Key Contacts

| Role | Name | Contact |
|---|---|---|
| Client | Andrew Demski | andrew.demski@demskigroupdev.com |
| Client | Aaron Demski | aaron.demski@demskigroupdev.com |
| Head of Client Strategy | Amar | Ethixweb |
| Lead Developer | Akash | Ethixweb |
| Lead Developer | Shreya | Ethixweb |
