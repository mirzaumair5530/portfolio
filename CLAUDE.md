# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Rules for AI coding tools working on Umair Farooq's portfolio.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`: Next.js dev server, production build, serve the build.
- `pnpm lint`: `eslint .` (flat config in `eslint.config.mjs`). `pnpm format`: `prettier --write .` (skips `SPEC.md`, `specs/` and `public/`, see `.prettierignore`).
- There is no test runner yet; `pnpm lint` and `pnpm build` (which type-checks) are the verification steps.
- `.npmrc` sets `engine-strict=true`, so `pnpm install` fails outside Node 24. Run `nvm use` (or `fnm use`) first.

## Project status

- M1 to M6 built the first version (Blue Glass design, GSAP, a three.js scene). R1 to R6 then rebuilt the site to `specs/portfolio-clone-spec.md`; that redesign is done. M0.7 (Vercel import) is still open. Next is M7 (Real content), then M8 (Launch).
- `SPEC.md` is the source of truth for milestones and tasks; work is tracked there by ticking tasks. Its design, 3D and scroll sections describe the first version and are superseded by `specs/portfolio-clone-spec.md` (see the note at the top of `SPEC.md`, which also lists where the build deliberately differs from the clone spec).
- `specs/` is reference material, not code: the clone spec, plus the old Blue Glass HTML and PDF.
- Everything personal is a placeholder until M7: `src/data/site.ts`, `src/data/resume.ts`, the four sample projects and three sample posts in `src/content/`, and `public/umair-farooq-resume.pdf`. There are no photos yet, so every image slot renders a labelled block. Text still to be written is marked with square brackets (`[City, Country]`), so searching for `[` finds what M7 has left.

## Architecture

- **Theming:** `data-theme` on `<html>` ("light" default) switches the CSS variables in `src/styles/tokens.css`. Components use the Tailwind names mapped in `globals.css` (`bg-background`, `text-muted`, `bg-accent`, `text-on-accent`, `bg-surface`, `bg-contrast`, `text-on-contrast`, ...), never raw colours. `contrast` is the strongest block (nav Contact button, dark stat and step cards, dark buttons): dark grey in light, white in dark. Use it instead of `bg-surface-dark`, which is nearly the same as `bg-surface` in dark. Text on the accent must use `text-on-accent`: the accent is indigo in light and lime in dark. An inline script in `ThemeScript` sets the theme before first paint; `ThemeProvider` reads and writes it; `ThemeSwitch` toggles it. `dark:` is bound to `data-theme`, not the system setting. Two tokens are darker than the reference (`--text-muted`, `--error`) so text passes WCAG AA.
- **Tailwind setup:** Tailwind 4 is configured in CSS only. There is no `tailwind.config` or PostCSS config; `next.config.ts` runs `@tailwindcss/turbopack` as a Turbopack loader on `*.css`. `src/styles/globals.css` maps the tokens with `@theme inline`, adds the `tablet:` (810 px) and `desktop:` (1200 px) breakpoints, and defines the type scale as utilities (`type-display`, `type-h2`, `type-h3`, `type-h4`, `type-number`, `type-body-l`, `type-small`) plus `page-top`. The type utilities set font weight, so add `!` to override it (`font-semibold!`). Fonts (Antonio, Inter, JetBrains Mono for code) come from `next/font/google` in the root layout.
- **Shell:** `src/app/layout.tsx` wraps every route in `Nav`, `<main id="main">` and `Footer`, plus the fixed `ThemeSwitch`, `NoiseOverlay` and `CustomCursor` (all in `src/components/layout`). `<main>` has no top padding: a page starts with `page-top`, or with a full-screen section that sits under the nav. `Nav` collapses to a status pill on scroll down and reopens on scroll up, hover or focus; below `tablet` it is an avatar and a full-screen menu. Links are in `src/data/nav.ts`.
- **Pages:** `/` is `PinnedScene` (Hero, Services and About panels) followed by `FeaturedProjects`, `Testimonials`, `Faq`, `BlogPreview` and `Contact`, all in `src/components/home`. `/about` is `SplitScene` plus `ProcessGrid` (`src/components/about`) and the same `Contact`. `/projects` and `/blogs` are lists; `/projects/[slug]` and `/blogs/[slug]` render MDX in a 1000 px column. `/resume` is kept from the first build and linked from `/about` and the phone menu. Section copy, services, stats, testimonials, FAQs and image slots all come from `src/data/site.ts`.
- **Images:** every image goes through `Media` (`src/components/ui`), which fills a positioned parent and renders a labelled placeholder while there is no `src`. Site photos are the `site.images.*` slots (`null` until M7).
- **Scroll and motion:** Motion (`motion/react`) with Lenis. `SmoothScroll` runs Lenis (`src/lib/scroll.ts`, `anchors: true` so `/#contact` scrolls smoothly) only while `prefers-reduced-motion` allows; Motion's `useScroll` reads the native scroll position, so nothing links the two. `MotionProvider` sets `reducedMotion="user"`.
  - `PinnedScene`: a sticky child of an `absolute inset-0` layer holds one card while three screen-tall panels scroll under it (the absolute layer is what makes the card release where the scene ends; a negative margin on the sticky element lets it slide a screen too far); scroll progress drives its x, `rotateY` (two flips) and tilt. It exists only from `tablet` up with motion allowed (`tablet:motion-safe:`); otherwise each panel shows its own `PanelImage`. The hero's `PanelImage` stays in the layout, invisible, to keep the gap the pinned card sits in.
  - `StackingProjects` / `StackCard`: sticky cards; `useScroll` targets the non-sticky list, whose bottom padding equals the gap so each card owns 1/n of the progress. Keep the padding and the gap equal.
  - `Reveal` / `RevealItem` (`whileInView`, once) hide content in server HTML, and `Accordion` panels render closed; the `<noscript>` style in the layout undoes both. Do not wrap an `<h1>` or anything above the fold in `Reveal`; the hero entrance is CSS (`animate-enter-*`) so it runs before hydration.
  - `Counter` and `CustomCursor` do nothing under reduced motion; the cursor is also off without a fine pointer. Mark a link `data-cursor="card"` to make the cursor grow over it.
  - `position: sticky` needs every ancestor free of `overflow: hidden/auto`; the body uses `overflow-x-clip` for that reason.
- **Contact and subscribe:** `ContactForm` posts to `/api/contact` and `SubscribeBanner` (on posts) to `/api/subscribe`. Both validate with a Zod schema shared with the client (`src/lib/contact-schema.ts`, `src/lib/subscribe-schema.ts`), drop honeypot hits silently, rate-limit per IP in memory (`src/lib/rate-limit.ts`, a speed bump only on serverless) and send through Resend (`src/lib/send-contact-email.ts`). There is no mailing-list service: a subscription is an email to the owner. They need `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (optional `CONTACT_FROM_EMAIL`); without them the routes answer 503. To test without a key, point `RESEND_BASE_URL` at a local stub. The form's "Service needed" options are `site.contactServices`.
- **SEO:** every page builds its metadata with `pageMetadata()` in `src/lib/seo.ts` (title, canonical, Open Graph, Twitter, RSS link). Share images are `opengraph-image.tsx` files rendered by `src/lib/og.tsx`, which repeats the light palette because it cannot read CSS variables; a page that sets `openGraph` does not inherit its parent's image, so each route has its own. `NEXT_PUBLIC_SITE_URL` must be set in production or canonicals, the sitemap, the feed and JSON-LD point at localhost. `sitemap.ts`, `robots.ts` and `rss.xml/route.ts` read from the content loaders; `JsonLd` adds `Person` (home) and `BlogPosting` (posts). A new route must be added to `sitemap.ts` by hand.
- **Content pipeline:** `src/content/{projects,blog}/*.mdx` -> `src/lib/mdx.ts` (gray-matter, validated by the strict Zod schemas in `src/lib/content-schema.ts`) -> `MdxContent` (next-mdx-remote/rsc, rehype-slug, rehype-pretty-code with dual Shiki themes). The folder is still `content/blog` although the route is `/blogs`. Invalid frontmatter throws and fails the build; a `cover` without `coverAlt` is invalid. Drafts are hidden when `NODE_ENV=production`. Projects with `featured: true` (up to four, by `order`) become the stacking cards; the post with `pinned: true` (else the newest) gets the large card. MDX bodies can use `<Figure>`, `<FigureRow>` and `<Callout>`; `MdxContent variant="project"` adds the " :" after section titles. Pass only `{ slug, frontmatter }` to client components, never the MDX body.

## Next.js gotchas (Cache Components is on)

- `cacheComponents: true`: `Date.now()` / `new Date()` in server or client render fails prerender, so avoid them (the footer has no year for this reason). `MdxContent` uses `"use cache"` because MDX compilation reads the clock.
- Route segment config such as `dynamicParams` is not allowed. As a result an unknown `[slug]` shows not-found content but returns HTTP 200 (still an open issue).
- `params` is a Promise; use the global `PageProps<"/route">` / `LayoutProps<"/">` types.
- `partialPrefetching: true`: a page that does `await params` at the top level logs "Next.js encountered URL data during prerendering" in `next dev`. The `[slug]` pages therefore render a sync page that wraps an async content component in `<Suspense>` and pass it the `params` promise; keep that shape. `generateMetadata` may await `params` directly.
- `next dev` rewrites the `nextjs-agent-rules` block in `AGENTS.md`. Don't remove it from a diff; commit it with the work.

## Rules

- Read `SPEC.md` before each task.
- Do only the task you were given. Do not start other tasks or milestones.
- Run `pnpm lint` and `pnpm build` before finishing any task, and fix any failures.
- Use pnpm only. Do not use npm or yarn, and do not commit `package-lock.json` or `yarn.lock`.
- This Next.js version has breaking changes. See `AGENTS.md` and `node_modules/next/dist/docs/` before writing Next.js code.

## Stack

- Node.js 24 (see `.nvmrc`) and pnpm 12 (pinned in `packageManager`).
- Next.js 16 (App Router, Turbopack), React 19, TypeScript in strict mode.
- Tailwind CSS 4, with design tokens as CSS variables.
- ESLint and Prettier (`pnpm lint`, `pnpm format`).
- Deployed on Vercel from GitHub (not connected yet, see M0.7).
- Content: Zod 4, gray-matter, next-mdx-remote, rehype-pretty-code, Shiki, rehype-slug.
- Animation: Motion and Lenis. GSAP, Zustand and three.js were removed in the redesign; do not add them back.
- Contact: Resend.

## Folder structure

Keep content, data and page code in separate folders so each can change without touching the others.

- `src/app/`: routes only (pages, `api/contact`, `api/subscribe`, `rss.xml`, `sitemap.ts`, `robots.ts`, `not-found.tsx`, `opengraph-image.tsx` files).
- `src/components/`: `layout/` (nav, footer, overlays, providers), `ui/` (shared building blocks), `cards/` (project, post, stat and step cards), `home/`, `about/`, `blog/` (page sections) and `mdx/` (MDX components).
- `src/content/{projects,blog}/*.mdx`: content. `src/data/`: `site.ts`, `resume.ts`, `nav.ts`.
- `src/lib/`: loaders, schemas, SEO, email and scroll helpers. `src/styles/`: `globals.css` and `tokens.css`.

## Conventions

- TypeScript strict mode; no `any` without a comment.
- There is no CI and no pre-commit hook, so lint and build must be run by hand before each commit.
- Components in PascalCase files; one component per file.
- Server components by default; add `"use client"` only for motion, scroll and interactive parts. A client scene takes its server-rendered content as `children` or props (see `PinnedScene`, `SplitScene`).
- Animate only `transform` and `opacity` (the accordion height is the one exception), and give every animation a reduced-motion path.
- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).
- Environment variables only in `.env.local`; list their names in `.env.example`.
- Path alias: `@/*` maps to `src/*`.
- One task equals one commit. Tick the task in `SPEC.md` when it is done.
