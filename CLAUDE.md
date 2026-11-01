# CLAUDE.md

Rules for AI coding tools working on Umair Farooq's portfolio.

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
- Added in later milestones, not yet installed: three, @react-three/fiber, @react-three/drei, GSAP with ScrollTrigger, Lenis, Motion, MDX (gray-matter, next-mdx-remote, rehype-pretty-code), Zod, Resend and Zustand.

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
