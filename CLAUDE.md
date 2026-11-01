# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Rules for AI coding tools working on Umair Farooq's portfolio.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`: Next.js dev server, production build, serve the build.
- `pnpm lint`: `eslint .` (flat config in `eslint.config.mjs`). `pnpm format`: `prettier --write .`.
- There is no test runner yet; `pnpm lint` and `pnpm build` (which type-checks) are the verification steps.

## Project status

- M1 (Foundation) and M2 (Content) are done; M0.7 (Vercel import) is still open. Next is M3 (Pages). Pages are still placeholders except the `[slug]` detail routes, which render MDX.
- `SPEC.md` is the source of truth for milestones and tasks; work is tracked there by ticking tasks.
- `specs/` (untracked) holds the Blue Glass design reference (HTML and PDF). `public/` still contains only the default create-next-app SVGs.
- `src/data/site.ts` and `src/data/resume.ts` hold placeholder values (email, links, roles) until M7.

## Architecture

- **Theming:** `data-theme` on `<html>` ("dark" default) switches the CSS variables in `src/styles/tokens.css` (Blue Glass palette). Components use the Tailwind names mapped in `globals.css` (`bg-background`, `text-muted`, `bg-accent`, ...) and the `glass` / `glass-accent` utilities, never raw colours. An inline script in `ThemeScript` sets the theme before first paint; `ThemeProvider` reads and writes it. `dark:` is bound to `data-theme`, not the system setting.
- **Shell:** `src/app/layout.tsx` wraps every route in `Navbar`, `<main id="main">` and `Footer`, over `BackdropShapes`. Shared UI is in `src/components/ui`; nav links are in `src/data/nav.ts`.
- **Content pipeline:** `src/content/{projects,blog}/*.mdx` -> `src/lib/mdx.ts` (gray-matter, validated by the strict Zod schemas in `src/lib/content-schema.ts`) -> `MdxContent` (next-mdx-remote/rsc, rehype-slug, rehype-pretty-code with dual Shiki themes). Invalid frontmatter throws and fails the build. Drafts are hidden when `NODE_ENV=production`. `src/lib/reading.ts` gives reading time and the table of contents; its ids match rehype-slug.

## Next.js gotchas (Cache Components is on)

- `cacheComponents: true`: `Date.now()` / `new Date()` in server or client render fails prerender, so avoid them (the footer has no year for this reason). `MdxContent` uses `"use cache"` because MDX compilation reads the clock.
- Route segment config such as `dynamicParams` is not allowed. As a result an unknown `[slug]` shows not-found content but returns HTTP 200 (open issue, relevant for M6 SEO).
- `params` is a Promise; use the global `PageProps<"/route">` / `LayoutProps<"/">` types.

## Rules

- Read `SPEC.md` before each task.
- Do only the task you were given. Do not start other tasks or milestones.
- Run `pnpm lint` and `pnpm build` before finishing any task, and fix any failures.
- Use pnpm only. Do not use npm or yarn, and do not commit `package-lock.json` or `yarn.lock`.
- This Next.js version has breaking changes. See `AGENTS.md` and `node_modules/next/dist/docs/` before writing Next.js code.

## Stack

- Node.js 24 (see `.nvmrc`) and pnpm 12 (pinned in `packageManager`).
- Next.js (App Router), React, TypeScript in strict mode.
- Tailwind CSS, with design tokens as CSS variables (added in M1).
- ESLint and Prettier (`pnpm lint`, `pnpm format`).
- Deployed on Vercel from GitHub.
- Installed for content (M2): Zod, gray-matter, next-mdx-remote, rehype-pretty-code, Shiki, rehype-slug, github-slugger.
- Added in later milestones, not yet installed: three, @react-three/fiber, @react-three/drei, GSAP with ScrollTrigger, Lenis, Motion, Resend and Zustand.

## Folder structure

Keep content, 3D code and page code in separate folders so each can change without touching the others.

```text
portfolio/
├─ public/                 # images, resume PDF, 3D models (.glb), fonts
├─ src/
│  ├─ app/                 # Next.js routes
│  │  ├─ page.tsx          # home
│  │  ├─ projects/         # list + [slug]
│  │  ├─ blog/             # list + [slug]
│  │  ├─ resume/
│  │  ├─ api/contact/route.ts
│  │  ├─ rss.xml/route.ts
│  │  ├─ sitemap.ts
│  │  └─ layout.tsx
│  ├─ components/
│  │  ├─ sections/         # Hero, About, Experience, Skills, ...
│  │  ├─ three/            # Scene, Rig, objects, lights
│  │  ├─ ui/               # Button, Card, Tag, Navbar
│  │  └─ mdx/              # MDX components (code block, callout)
│  ├─ content/
│  │  ├─ projects/*.mdx
│  │  └─ blog/*.mdx
│  ├─ data/                # resume.ts, site.ts
│  ├─ lib/                 # mdx loaders, seo helpers, scroll setup
│  ├─ store/               # Zustand scroll store
│  └─ styles/              # globals.css, tokens
├─ SPEC.md                 # the project plan
├─ CLAUDE.md               # rules for AI coding tools
└─ package.json
```

## Conventions

- TypeScript strict mode; no `any` without a comment.
- ESLint and Prettier on save and in CI; Husky pre-commit hook is optional.
- Components in PascalCase files; one component per file.
- Server components by default; add `"use client"` only for 3D, scroll and interactive parts.
- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).
- Environment variables only in `.env.local`; list their names in `.env.example`.
- Path alias: `@/*` maps to `src/*`.
- One task equals one commit. Tick the task in `SPEC.md` when it is done.
