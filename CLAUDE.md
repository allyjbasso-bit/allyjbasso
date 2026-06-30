# CleanDesk AI — Engineering Guide

CleanDesk AI is the daily operating system for small residential cleaning companies
(roughly 1–10 cleaners). The first customer is an owner-operator like **Rachel** who
still cleans, runs a small team, and handles leads herself. The goal is **not** the most
features — it is the **best** operating system for this niche. Every time Rachel has to
stop cleaning to do office work, CleanDesk should automate it or reduce it to one tap.

## The Rachel Test (the bar every feature must pass)
Before adding anything, ask:

> **Does this eliminate one thing Rachel has to remember, one text she has to send,
> or one app she has to open?**

If it eliminates none of those, it probably does not belong — even if it is on the
roadmap. When proposing or building something, say which of the three it removes.
Prefer surfacing the right thing automatically over adding a new screen for Rachel to
go check; zero or one tap beats a new place to manage. Foundation work (auth, database,
the data-access seam) passes indirectly — it is what later lets the app remember things
and send things for her — so tie it back to that rather than exempting it.

## GitHub is the source of truth
- Repository: `allyjbasso-bit/allyjbasso`, branch `main`.
- **Pull `origin/main` before editing.** Inspect the real code; assume nothing.
- **Continue the existing architecture.** Never create a replacement project, scaffold
  another app, or duplicate components that already exist. Reuse and improve what is built.

## Governing documents (the product requirements)
- `README.md`
- `CleanDesk Product Vision.md`
- `CleanDesk Roadmap.md`
- `CLAUDE.md` (this file)

## Before building any feature, ask
1. Does it pass the Rachel Test above? (Remember / text / app — which does it remove?)
2. Does this already exist? (Improve it instead of recreating it.)
3. Can it be improved rather than rebuilt?
4. Does it fit the current roadmap phase?
5. Is there a simpler implementation?

If a feature belongs **later** in the roadmap, say so instead of building it now.

## Current priority order (do not jump ahead to advanced AI)
1. Replace mock data with real database architecture.
2. Add Supabase authentication.
3. Add multi-tenant organization support.
4. Import Rachel's real calendar data.
5. Voice walkthrough capture.
6. Reminder workflows.
7. Beta testing.

Hard rule for 1–3: **every database query and API path must enforce `organization_id`.**
Each cleaning company sees only its own data.

## Architecture (as built today)
- **Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4.
- **Data:** all screens currently import static seed data directly from `lib/mock-data.ts`
  (calendar-derived) and AI helpers from `lib/ai-mocks.ts`. No DB, no auth, no persistence.
- **Roles:** `rachel | becca | rachelle | emily | noah`, passed as a `?role=` query param.
  `lib/role-utils.ts` resolves nav, the active person, and role-aware hrefs.
- **Shell:** `components/app-shell.tsx` (mobile-first; `AppShell`, `StatCard`,
  `ComingSoonButton`). Bottom nav is role-specific.
- **Login:** `app/login/page.tsx` is mock role selection only — not real auth.
- **Routes:** `/` (Morning Brief / role dashboards), `/inbox`, `/schedule`, `/clients`,
  `/clients/[id]` (House Brain), `/leads`, `/walkthrough`, `/airbnb`,
  `/cleaning-mode/[jobId]`, `/more`.

## Per-task workflow (do every time)
1. Pull `origin/main`.
2. Make the change, continuing existing patterns.
3. Run the build (`pnpm build`); fix all TypeScript and lint errors.
4. `git status`, then commit with a descriptive message.
5. Push to `origin/main`. **Never push a broken build. Never force-push.**

> Tooling note: a Node.js runtime must be installed and on PATH to run `pnpm build`.
> If the build cannot be executed in the current environment, say so explicitly and do
> not claim the build passed.

## Commands
```bash
pnpm dev     # local dev server
pnpm build   # production build — must pass before committing
pnpm start   # serve the production build
pnpm lint    # next lint
```
