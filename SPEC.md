# Portfolio Website Spec — Umair Farooq

Nov 1, 2026 · @Umair Farooq

## Goals and scope

Build a modern, scroll-driven 3D portfolio that presents Umair Farooq as a software engineer and keeps the resume, projects and blog easy to update.

**Audience:** recruiters, hiring managers, freelance clients and other developers.

**Goals**

- Make a strong first impression within five seconds, with a 3D scene in the hero.
- Show the latest resume on the site and as a PDF download.
- Present projects with real depth: problem, role, stack and outcome.
- Publish a blog post by adding one file.
- Stay fast and accessible despite the 3D and scroll effects.

**Success measures**

- Lighthouse Performance of 90 or more on mobile.
- Largest Contentful Paint under 2.5 seconds.
- A new blog post goes live in under 10 minutes.
- The resume is updated by editing one data file and replacing one PDF.

**Out of scope for v1:** user accounts, comments, e-commerce and a custom admin dashboard. All can be added later.

**Assumption:** "3JS and something similar" is read as Three.js through React Three Fiber, plus GSAP for scroll animation. Tell me if you meant a different library.

## Tech stack

Use Next.js with React and TypeScript. It gives the best SEO for a blog, needs no separate server for v1, and still supports full 3D and scroll effects.

| Criterion | A: Next.js (App Router) | B: React (Vite) + Express + MongoDB |
| --- | --- | --- |
| SEO and link previews | Server-rendered pages, built-in metadata | Client-rendered; needs extra work for SEO |
| Blog publishing | MDX files in the repo, deploy on push | Posts in a database, needs an admin UI |
| Backend work | One API route for the contact form | Full Express API, auth and database to build |
| 3D and scroll fit | Same React code; load 3D on the client only | Same React code, simpler client setup |
| Hosting | Vercel free tier, one project | Two deployments (frontend and API) |
| Fits your skills | React plus Node | React plus the full MEAN-style backend |
| Best when | Fast launch, strong SEO | You want to build a custom CMS and admin panel |

**Recommended stack (option A)**

- **Framework:** Next.js (App Router), React, TypeScript in strict mode.
- **Styling:** Tailwind CSS with design tokens as CSS variables.
- **3D:** three, @react-three/fiber and @react-three/drei.
- **Scroll and animation:** GSAP with ScrollTrigger, Lenis for smooth scroll, Motion (formerly Framer Motion) for small UI transitions.
- **Content:** MDX for blog posts and projects, with gray-matter for frontmatter and next-mdx-remote to render.
- **Code highlighting:** Shiki through rehype-pretty-code.
- **Forms and validation:** Zod, plus a Next.js route handler that sends email through Resend.
- **State shared between scroll and 3D:** Zustand.
- **Deploy:** Vercel, with the code on GitHub.

Use the latest stable version of each package when the project is created. Keep React Three Fiber and React on matching major versions.

Choose option B only if you want the blog and projects managed from a custom admin panel. It adds extra backend, authentication and admin UI work.

## Pages and navigation

The site has one long scroll-driven home page and five supporting routes. Every route has its own title, description and share image.

| Route | Purpose | Main content |
| --- | --- | --- |
| / | Home: the scroll story | Hero, about, experience, skills, featured projects, latest posts, contact |
| /projects | Full project list | Cards with tags, filter by technology |
| /projects/\[slug\] | One project in depth | Problem, role, stack, architecture, outcome, links |
| /blog | All posts | Search, tag filter, reading time |
| /blog/\[slug\] | One post | Article, table of contents, share links, related posts |
| /resume | Latest resume | Timeline view and a PDF download button |

**Home page sections, in scroll order**

1. Hero: name, role line, short pitch, two buttons (View projects, Download resume).
2. About: a short bio, photo and location.
3. Experience: a vertical timeline of roles that animates as you scroll.
4. Skills: grouped by area (frontend, backend, databases, tools, cloud).
5. Featured projects: three to four cards that link to their detail pages.
6. Latest posts: the three newest blog posts.
7. Contact: email, GitHub, LinkedIn and a short form.

**Navigation:** a fixed top bar with section links on the home page and route links elsewhere. A scroll progress indicator sits on the side. On mobile the bar becomes a full-screen menu. A theme toggle (dark default, light optional) sits in the bar.

## 3D and scroll effects

One fixed 3D canvas sits behind the page, and scroll position drives the camera and objects. This is cheaper and smoother than a separate canvas per section.

| Home section | Scroll effect | 3D element |
| --- | --- | --- |
| Hero | Text reveals line by line; the scene reacts slightly to mouse movement | A central abstract object (for example a low-poly shape or a code-inspired cluster) with soft lighting |
| About | Text fades in; the camera drifts sideways | The object slowly rotates and moves aside |
| Experience | Timeline line draws as you scroll; each role slides in | Camera travels along a path, one stop per role |
| Skills | Skill chips stagger in | Small floating shapes or particles regroup by category |
| Projects | Cards pin and scale; horizontal scroll inside a pinned section is optional | Object colour shifts to match the active project |
| Blog preview | Simple fade and lift | Scene dims so text stays readable |
| Contact | Large call-to-action text; links highlight on hover | Object settles into a calm idle loop |

**How it works**

- Lenis provides smooth scrolling and is connected to GSAP ScrollTrigger so both share one clock.
- A Zustand store holds scroll progress from 0 to 1. The 3D scene reads it inside `useFrame` and moves the camera and objects from it.
- GSAP timelines handle text and card animations. Motion handles hover and menu transitions.
- The Canvas is loaded with `next/dynamic` and `ssr: false` from a client component, after the first paint.

**Rules that keep it fast**

- Cap the device pixel ratio at 1.5 to 2.
- Keep any GLB model under 1 MB, compressed with Draco, and prefer simple geometry plus good lighting over heavy models.
- Avoid custom shaders in v1. Add them later if wanted.
- Pause rendering when the tab is hidden or the canvas is off-screen.
- On low-end or small devices, show a lighter scene or a static gradient instead.
- When the visitor has `prefers-reduced-motion` on, turn off smooth scroll, pinning and camera travel, and show the static layout.
- Text must stay readable over the scene: use overlays and keep contrast at WCAG AA.

## Resume

Keep the resume in one data file. The home timeline, the /resume page and the structured data for search engines all read from it, so they never disagree.

- **Data file:** `src/data/resume.ts` holds summary, experience, education, skills, certifications and links.
- **PDF:** a file at `public/umair-farooq-resume.pdf` behind the Download button. Replace it whenever the resume changes.
- **Optional upgrade:** generate the PDF from the same data with `@react-pdf/renderer`, so the PDF and the page can never drift apart.
- **Resume page layout:** a clean, printable view with a sticky Download button. The 3D scene is off on this page.
- **Last updated:** show the date on the page, taken from the data file.

```ts
type Experience = {
  company: string;
  role: string;
  location?: string;
  start: string;      // "2023-04"
  end?: string;       // omit for current role
  summary: string;
  highlights: string[];  // measurable results where possible
  stack: string[];
};

type Resume = {
  name: string;
  headline: string;
  summary: string;
  experience: Experience[];
  education: { school: string; degree: string; start: string; end?: string }[];
  skills: { group: string; items: string[] }[];
  links: { label: string; url: string }[];
  updatedAt: string;  // "2026-11-01"
};
```

## Projects

Each project is one MDX file. Adding a project means adding a file, with no code changes.

**Where:** `src/content/projects/<slug>.mdx`

| Frontmatter field | Type | Notes |
| --- | --- | --- |
| title | string | Project name |
| summary | string | One or two lines for the card |
| role | string | Your part, for example "Full-stack developer" |
| period | string | For example "2024-01 to 2024-06" |
| stack | string\[\] | Used for tags and the filter |
| featured | boolean | True shows it on the home page |
| cover | image path | 16:9 image or short looping video |
| links | { label, url }\[\] | Live site, GitHub, case study |
| order | number | Sort order for featured projects |

**Project card:** cover, title, one-line summary, up to four stack tags and a hover effect (slight tilt or a spotlight that follows the cursor).

**Detail page structure**

1. Overview: what it is and who it is for.
2. Problem: what needed solving.
3. Your role and team size.
4. Solution and architecture: a diagram or short explanation.
5. Stack and key decisions.
6. Results: numbers where you have them (users, speed gains, time saved).
7. Screenshots or a demo video.
8. Links and lessons learned.

If some work is under NDA, describe it generally, with no company names or private numbers.

## Blog

Posts are MDX files in the repository. To publish, add a file, commit and push; Vercel rebuilds the site automatically.

**Where:** `src/content/blog/<slug>.mdx`

```markdown
---
title: "How I structured a MEAN app for scale"
description: "One or two lines for search results and link previews."
date: "2026-11-01"
tags: ["node", "architecture"]
draft: false
cover: "/blog/mean-scale/cover.jpg"
---

Post body in Markdown. Use React components when needed.
```

**Blog features in v1**

- Posts list sorted by date, with tag filter and search by title.
- Reading time and published date on every post.
- Code blocks with syntax highlighting and a copy button.
- Auto-generated table of contents from headings.
- Draft posts hidden in production when `draft: true`.
- Per-post SEO: title, description, canonical URL and a share image.
- RSS feed at `/rss.xml` and entries in `/sitemap.xml`.
- Previous and next post links.

**Later, if you want to write from the browser:** add a headless CMS such as Keystatic, Decap CMS or Sanity on top of the same files. Nothing in the page design needs to change.

## Data and API

Version 1 needs no database. Content lives in files, and only the contact form needs a server endpoint.

| Data | Where it lives | Format |
| --- | --- | --- |
| Resume | `src/data/resume.ts` | TypeScript object |
| Site settings (name, links, SEO defaults) | `src/data/site.ts` | TypeScript object |
| Projects | `src/content/projects/*.mdx` | MDX with frontmatter |
| Blog posts | `src/content/blog/*.mdx` | MDX with frontmatter |
| Images, 3D models, PDF | `public/` | Static files |
| Contact messages | Your inbox | Email through Resend |

**Endpoints**

| Endpoint | Method | Purpose |
| --- | --- | --- |
| /api/contact | POST | Validate the form, block spam, send an email to you |
| /rss.xml | GET | Blog feed, generated from the posts |
| /sitemap.xml | GET | All routes for search engines |
| /robots.txt | GET | Crawler rules |

**Contact form**

- Fields: name, email, message (required); subject (optional).
- Validate on the client and again on the server with Zod.
- Spam control: a hidden honeypot field, a simple rate limit per IP, and optionally Cloudflare Turnstile.
- Show clear success and error states; never expose the destination email in the page source.

**If you pick option B (Express and MongoDB):** add collections for `posts`, `projects` and `messages`, REST routes under `/api`, JWT-protected admin routes and an admin UI for writing posts.

## Folder structure and conventions

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
├─ SPEC.md                 # this document
├─ CLAUDE.md               # rules for AI coding tools
└─ package.json
```

**Conventions**

- TypeScript strict mode; no `any` without a comment.
- ESLint and Prettier on save and in CI; Husky pre-commit hook is optional.
- Components in PascalCase files; one component per file.
- Server components by default; add `"use client"` only for 3D, scroll and interactive parts.
- Conventional commits (`feat:`, `fix:`, `docs:`).
- Environment variables only in `.env.local`; list their names in `.env.example`.

## Design system

The look is a warm near-black with off-white text, one vermilion accent and a sand highlight. Surfaces use Apple-style Liquid Glass over soft colour shapes. It avoids purple or cyan gradients. These values are a starting proposal and are easy to change.

| Token | Proposed value | Use |
| --- | --- | --- |
| Background | #12100E | Page background |
| Surface | #1B1815 | Cards, navbar |
| Text | #F1ECE4 | Body text |
| Muted text | #C2B9AC | Secondary text, captions |
| Accent | #FF5A36 | Buttons (with dark text), links, highlights |
| Accent 2 | #E6C88A | Small labels, 3D accents |
| Heading font | Space Grotesk | Headings |
| Body font | Inter | Paragraphs, UI |
| Code font | JetBrains Mono | Code blocks, tags |
| Spacing scale | 4, 8, 12, 16, 24, 32, 48, 64, 96 px | Margins and padding |
| Corner radius | 12 px (cards), 999 px (pills) | Shapes |

**Motion principles**

- Each section gets one clear animated moment, not many small ones.
- Durations of 0.4 to 0.8 seconds with an ease-out curve (for example GSAP `power3.out`).
- Stagger lists by 0.05 to 0.1 seconds.
- Animate transform and opacity only, to avoid layout jank.
- Every animation has a no-motion fallback.

**Responsive breakpoints:** 360 (small phones), 768 (tablets), 1024 (laptops), 1440 (large screens). Design mobile first.

**Liquid Glass style**

Surfaces follow Apple's Liquid Glass look: translucent layers that blur and brighten what is behind them, with a bright edge light and a soft diagonal sheen. Glass needs something colourful to sit on, so a few large colour shapes sit behind the page content.

| Layer | Dark | Light |
| --- | --- | --- |
| Fill | rgba(18,16,14,0.42), a dark tint that keeps text readable | rgba(251,248,242,0.45) |
| Sheen | 135° gradient: white 20% at top-left, 4% in the middle, 14% at bottom-right | Same gradient, white 60% to 10% |
| Backdrop filter | Blur 24 px, saturate 180%, brightness 0.9 | Blur 24 px, saturate 180% |
| Border | 1 px, white at 22% | 1 px, white at 60% |
| Edge light | Inset 1.5 px white at 45% top-left, inset 1 px white at 12% bottom-right, inner glow white at 6% | Inset white at 80%, inset ink at 8% bottom-right |
| Shadow | 0 16 px 40 px, black at 35% | 0 16 px 40 px, ink at 12% |
| Radius | 28 to 32 px on cards; full pill on the navbar, buttons and tags; full circle on the theme toggle | Same |
| Primary button | Vermilion with a white sheen on the top half and a bright inset edge | Same |
| Muted text on glass | #C2B9AC (raised from the earlier #A39B8F) | #5E564C |
| Backdrop shapes | Vermilion, rust and sand circles, 90 to 100 px blur, 25 to 70% opacity | Same colours at 20 to 40% opacity |

- The navbar is a floating glass pill, not a full-width bar. The theme toggle and secondary buttons are small glass pills and circles.
- Text on glass must stay at 4.5:1 or better, checked over the vermilion shape, which is the hardest case.
- Use blur only on cards, the navbar, inputs and buttons. Never blur large areas or stack more than two glass layers.
- On phones, use a smaller blur (12 to 16 px) and fewer backdrop shapes.
- If `backdrop-filter` is unsupported, fall back to the solid surface colour. Turn blur off when `prefers-reduced-transparency` is set.
- Optional later: real edge refraction with an SVG displacement filter inside `backdrop-filter`. It works only in Chromium, so keep the CSS look above as the baseline.
- In Tailwind, define fill, sheen, border, edge light and shadow as tokens and apply them through one `glass` utility class, with a `glass-accent` variant for featured cards.

**Blue Glass palette (alternative theme)**

The same Liquid Glass style works with a blue palette. The design mockup "Portfolio UI — Blue Glass" shows its dark version. Define these as a second set of CSS variables so the theme can be switched with one class on the root element.

| Token | Dark | Light |
| --- | --- | --- |
| Background | #070D1C (deep navy) | #EEF4FF (pale sky) |
| Solid surface (glass fallback) | #0E1730 | #FFFFFF |
| Text | #EAF1FF | #0B1630 |
| Muted text | #B7C6E4 | #44587D |
| Accent (buttons, links) | #3D8BFF | #1F5FD6 |
| Accent text | #6AA7FF | #1F5FD6 |
| Accent 2 (aqua) | #8FD3F4 | #0B6F94 |
| Glass fill | rgba(8,16,40,0.42) | rgba(255,255,255,0.45) |
| Glass border | white at 22% | white at 60% |
| Edge light | inset 1.5 px white at 45% | inset 1.5 px white at 80% |
| Glass shadow | 0 16 px 40 px black at 35% | 0 16 px 40 px rgba(20,50,110,0.15) |
| Backdrop shapes | #3D8BFF, #14305F, #8FD3F4 at 25 to 70% | #6AA7FF and #8FD3F4 at 30 to 40% |

- Light-mode glass uses a stronger sheen (white 70% to 10%) and no brightness filter. The blur stays at 24 px with 180% saturation.
- The bright dark-mode blue #3D8BFF fails with white button text, so the light theme uses the deeper #1F5FD6 for buttons and links (about 5.8:1 with white text).
- Aqua is darkened to #0B6F94 in light mode so it passes 4.5:1 as text.
- Light-mode backdrop shapes must be strong enough to show the glass. On a plain pale background, glass looks flat.
- Check muted text contrast over the backdrop shapes in both themes before launch.
- Choose one palette as the default (warm vermilion or blue) and keep the other as an optional theme.

**Light theme:** dark stays the default. A toggle in the navbar switches themes, the first visit follows the system setting, and the choice is remembered. The light values are below.

| Token | Dark | Light |
| --- | --- | --- |
| Background | #12100E | #F4EFE6 (warm cream) |
| Card surface | #1B1815 | #FBF8F2 |
| Borders | Off-white at 10% | Ink at 12% |
| Text | #F1ECE4 | #1A1714 (warm ink) |
| Muted text | #C2B9AC | #6B6359 |
| Accent fill (buttons) | #FF5A36 | #FF5A36 |
| Accent as text or links | #FF5A36 | #B8301A (deeper vermilion) |
| Highlight fill | #E6C88A | #E6C88A |
| Highlight as small text | #E6C88A | #7A5C16 (bronze) |

**Light theme rules**

- Buttons are identical in both themes: vermilion fill with dark ink text.
- Use the deeper accent for text and links on cream. The bright vermilion is only about 2.7:1 there, while the deeper shade is about 5:1.
- The 3D crystal keeps the same vermilion, rust and sand faces, with ink-coloured edges. The scene background and lighting read the same theme tokens.
- No glows or gradients in either theme.
- Implement themes as CSS variables switched by a `data-theme` attribute on the root element.

## Performance, SEO and accessibility

The site is accepted only when every item below passes on a mid-range phone, not just on a laptop.

**Performance**

- [ ] Lighthouse mobile Performance of 90 or more on /, /projects and /blog.
- [ ] Largest Contentful Paint under 2.5 s and Cumulative Layout Shift under 0.1.
- [ ] The 3D code loads after first paint; the hero text appears without waiting for it.
- [ ] Images use `next/image` with AVIF or WebP and explicit sizes.
- [ ] 3D models are under 1 MB and compressed.
- [ ] Fonts are self-hosted with `font-display: swap`.

**SEO**

- [ ] Unique title, description and share image on every route.
- [ ] `sitemap.xml`, `robots.txt` and the RSS feed work.
- [ ] JSON-LD `Person` data on the home page and `BlogPosting` on posts.
- [ ] Canonical URLs set, with one version of the domain (with or without www).

**Accessibility**

- [ ] Full keyboard navigation with a visible focus ring.
- [ ] Text contrast at WCAG AA or better, including over the 3D scene.
- [ ] `prefers-reduced-motion` disables smooth scroll, pinning and camera travel.
- [ ] Alt text on all images; the 3D canvas is marked decorative (`aria-hidden`).
- [ ] Correct heading order and landmarks (header, main, footer).

**Compatibility**

- [ ] Works in current Chrome, Safari, Firefox and Edge, on iOS Safari and Android Chrome.
- [ ] Graceful fallback when WebGL is unavailable.

## Deployment and domain

Deploy to Vercel from a GitHub repository. Every push to `main` goes live, and every pull request gets its own preview link.

1. Create a GitHub repository (private is fine) and push the project.
2. Import the repository in Vercel and keep the default Next.js settings.
3. Add environment variables in Vercel: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
4. Buy a domain (for example `umairfarooq.dev`) and add it in Vercel; set the DNS records Vercel shows.
5. Pick one canonical version of the domain and redirect the other to it.
6. Verify the domain in Resend so contact emails are delivered reliably.
7. Add privacy-friendly analytics, such as Vercel Analytics or Plausible.
8. Submit `sitemap.xml` in Google Search Console.

**Alternatives:** Netlify or Cloudflare Pages work equally well for option A. For option B, host the React app on any static host and the Express API on Render, Railway or a small VPS.

**Check current plan limits and terms on the host's pricing page before launch.**

## Milestones and tasks

Build the site in nine milestones, M0 to M8. Each milestone has a task checklist and a "done when" test. One task equals one AI prompt and one commit, so it is always clear what to ask for next.

| Milestone | Outcome | Depends on |
| --- | --- | --- |
| M0 Setup | Repository, project and an empty live preview | None |
| M1 Foundation | Design tokens, themes, navbar, footer, shared components | M0 |
| M2 Content | Resume, project and blog files load from the repo | M1 |
| M3 Pages | Every page built without 3D, matching the UI designs | M1, M2 |
| M4 Scroll | Smooth scroll and section animations | M3 |
| M5 3D | Scroll-driven 3D scene with fallbacks | M3, M4 |
| M6 Contact and SEO | Working contact form, metadata, sitemap and RSS | M3 |
| M7 Real content | Placeholders replaced with your resume, projects and posts | M3 |
| M8 Launch | Checklist passed, domain connected, site live | All |

**How to work**

- Do tasks in order inside a milestone, and tick each box when the task is merged.
- Do not start a milestone until its dependencies pass their "done when" test.
- M6 and M7 can run alongside M4 and M5 once M3 is done.

### M0 · Setup

**Goal:** a working project with an empty live preview URL.

- [x] **M0.1** Create a private GitHub repository and clone it.
- [x] **M0.2** Scaffold Next.js (App Router) with TypeScript and Tailwind CSS.
- [x] **M0.3** Add ESLint and Prettier, with `pnpm lint` and `pnpm format` scripts.
- [x] **M0.4** Add `SPEC.md` (this document) and `CLAUDE.md` (stack, folder structure, conventions, and "run lint and build before finishing").
- [x] **M0.5** Create the folder structure from this spec, with empty placeholder files.
- [x] **M0.6** Add `.env.example` with variable names only.
- [ ] **M0.7** Import the repository in Vercel and confirm a preview URL deploys.

**Done when:** `pnpm build` and `pnpm lint` pass, and the preview URL shows the default page.

### M1 · Foundation

**Goal:** the shell that every page shares.

- [x] **M1.1** Add design tokens as CSS variables for the dark and light themes, mapped into Tailwind (see Design system), including the glass tokens.
- [x] **M1.2** Self-host Space Grotesk, Inter and JetBrains Mono with `font-display: swap`.
- [x] **M1.3** Build the theme provider: `data-theme` on the root, first visit follows the system, choice saved, no flash on load.
- [x] **M1.4** Build the floating glass navbar: desktop links, active-page underline, theme toggle, Resume button, and a full-screen mobile menu.
- [x] **M1.5** Build the footer.
- [x] **M1.6** Build shared components: Button (primary and outline), Tag, Card (glass), SectionHeading (kicker and title) and Container.
- [x] **M1.7** Add placeholder routes `/`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]` and `/resume`, each inside the shell.

**Done when:** every route renders in the shell, the theme toggle works without a flash, every control works by keyboard with a visible focus ring, and text contrast passes in both themes.

### M2 · Content

**Goal:** all content comes from files in the repository.

- [x] **M2.1** Create `src/data/site.ts` (name, tagline, links, SEO defaults) and `src/data/resume.ts` using the Resume type from this spec.
- [x] **M2.2** Add Zod schemas for project and blog frontmatter.
- [x] **M2.3** Build MDX loaders with gray-matter: list, get by slug, sort by date, validate.
- [x] **M2.4** Hide drafts in production when `draft: true`.
- [x] **M2.5** Add reading time and an automatic table of contents from headings.
- [x] **M2.6** Render MDX with next-mdx-remote and Shiki code highlighting, with a copy button on code blocks.
- [x] **M2.7** Add two sample projects and two sample posts so every page has data to show.

**Done when:** the sample projects and posts render from files, an invalid frontmatter field fails the build with a clear message, and drafts are hidden in a production build.

### M3 · Pages

**Goal:** every page built without 3D or scroll animation, matching the [Portfolio UI designs](https://claude.ai/artifact/J8pN3tDqsZ6QzDe9MEcetm).

- [ ] **M3.1** Home: hero and about. The hero shows a static crystal image as a stand-in for the 3D scene.
- [ ] **M3.2** Home: experience timeline (reads `resume.ts`) and skills.
- [ ] **M3.3** Home: featured projects (from the `featured` flag) and latest posts.
- [ ] **M3.4** Home: contact section, layout only. The form is wired in M6.
- [ ] **M3.5** `/projects`: card grid with a technology filter.
- [ ] **M3.6** `/projects/[slug]`: detail layout with sidebar, sections and previous and next links.
- [ ] **M3.7** `/blog`: featured post, list, tag filter, search by title and pagination.
- [ ] **M3.8** `/blog/[slug]`: article, table of contents, share links and previous and next links.
- [ ] **M3.9** `/resume`: page built from `resume.ts`, a PDF download button and print-friendly styles.
- [ ] **M3.10** Responsive pass at 360, 768, 1024 and 1440 px, in dark and light.

**Done when:** each page matches the UI designs at 1440 and 390 px in both themes, and nothing scrolls horizontally at 360 px.

### M4 · Scroll

**Goal:** smooth scrolling and section animations that stay fast and respect reduced motion.

- [ ] **M4.1** Add Lenis smooth scroll and connect it to GSAP ScrollTrigger on one shared ticker.
- [ ] **M4.2** Add a Zustand store with scroll progress from 0 to 1 and the active section.
- [ ] **M4.3** Build a reusable reveal animation (fade and lift, 0.05 to 0.1 s stagger) for headings, cards and lists.
- [ ] **M4.4** Draw the experience timeline line as the page scrolls, with each role sliding in.
- [ ] **M4.5** Pin the projects section and scale cards as they enter. Horizontal scroll is optional.
- [ ] **M4.6** Add the side progress rail and highlight the active section in the navbar.
- [ ] **M4.7** Handle `prefers-reduced-motion`: turn off smooth scroll, pinning and reveals, and show the final layout.
- [ ] **M4.8** Clean up all ScrollTrigger instances on route changes.

**Done when:** scrolling feels smooth on a real mid-range phone, Cumulative Layout Shift stays under 0.1, and the site shows its static layout when reduced motion is on.

### M5 · 3D

**Goal:** a lightweight, scroll-driven 3D scene that never blocks content.

- [ ] **M5.1** Add `three`, React Three Fiber and drei. Build a fixed Canvas client component loaded with `next/dynamic` and `ssr: false` after first paint.
- [ ] **M5.2** Build the crystal in code (low-poly geometry in the theme colours) with soft lighting. No model file is needed in v1.
- [ ] **M5.3** Drive the camera and object rotation from the scroll store, following the 3D and scroll effects table.
- [ ] **M5.4** Add mouse parallax in the hero, on desktop only.
- [ ] **M5.5** Make the scene theme-aware by reading its colours from the CSS tokens.
- [ ] **M5.6** Add performance guards: cap the device pixel ratio at 1.5 to 2, pause when the tab is hidden or the canvas is off-screen, and dispose geometries on unmount.
- [ ] **M5.7** Add fallbacks: a static crystal image for small or low-end devices, when WebGL is missing, and when reduced motion is on.
- [ ] **M5.8** Turn the scene off on `/resume` and on blog posts.

**Done when:** hero text appears before the 3D loads, the scene runs smoothly on a real phone, the fallback shows with WebGL disabled, and Lighthouse mobile Performance stays at 90 or more.

### M6 · Contact and SEO

**Goal:** a working contact form and everything search engines and link previews need.

- [ ] **M6.1** Build the `/api/contact` route handler with Zod validation.
- [ ] **M6.2** Add spam control: a hidden honeypot field and a per-IP rate limit.
- [ ] **M6.3** Send the email through Resend, using `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
- [ ] **M6.4** Build the form UI with loading, success and error states and accessible labels.
- [ ] **M6.5** Add metadata for every route: title, description, canonical URL and Open Graph.
- [ ] **M6.6** Generate share images for posts and projects.
- [ ] **M6.7** Add `sitemap.xml`, `robots.txt` and the RSS feed at `/rss.xml`.
- [ ] **M6.8** Add JSON-LD: `Person` on the home page and `BlogPosting` on posts.

**Done when:** a test message reaches your inbox, a spam attempt is rejected, link previews look right in a preview tool, and the sitemap and RSS feed load without errors.

### M7 · Real content

**Goal:** every placeholder replaced with your real material.

- [ ] **M7.1** Fill `resume.ts` with your latest resume and export the PDF to `public/umair-farooq-resume.pdf`.
- [ ] **M7.2** Write the about text and add your photo.
- [ ] **M7.3** Add three to six projects as MDX files, each with cover, stack, role, result and links, following the project detail structure.
- [ ] **M7.4** Mark three or four projects as featured and set their order.
- [ ] **M7.5** Write two or three launch blog posts.
- [ ] **M7.6** Add alt text to every image.
- [ ] **M7.7** Search the repository for leftover bracketed placeholders such as `[Project name]` and remove them.

**Done when:** no bracketed placeholder is left, every link works, and the resume page matches the PDF.

### M8 · Launch

**Goal:** the site is live on your own domain.

- [ ] **M8.1** Run the performance, SEO, accessibility and compatibility checklist and fix every failure.
- [ ] **M8.2** Test on a real iPhone, a real Android phone, and current Chrome, Safari, Firefox and Edge.
- [ ] **M8.3** Buy the domain, connect it in Vercel and redirect the other version to one canonical address.
- [ ] **M8.4** Verify the domain in Resend and send a production test message.
- [ ] **M8.5** Turn on analytics.
- [ ] **M8.6** Submit `sitemap.xml` in Google Search Console.
- [ ] **M8.7** Add the link to your LinkedIn, GitHub profile and resume.

**Done when:** the site is live on your domain, the checklist is fully ticked, and a message from the live contact form reaches you.

## Building it with AI tools

Build one task at a time from the milestones above, committing after each task. AI tools make fewer mistakes on a focused task than on "build the whole site".

**Setup**

- Put this document in the repository root as `SPEC.md`.
- Add a short `CLAUDE.md` with the conventions from this spec: stack, folder structure, "server components by default", no `any`, run lint and build before finishing.
- Use Claude Code in the terminal for scaffolding and multi-file work. Use Claude chat for design review and for fixing specific problems. Any editor assistant works for small edits.
- Test on a real phone after every task in M4 and M5.

**Prompt template**

Use the same prompt for every task. Change only the task ID.

```text
Read SPEC.md and CLAUDE.md. Do task M3.2 only, as described in the Milestones and tasks section. Do not start any other task. Follow the UI designs and the design tokens. Run lint and build and fix any failures. Then list the files you changed and tick the task in SPEC.md.
```

For the very first task:

```text
Read SPEC.md fully and summarise the plan in five lines. Then do task M0.2 only: scaffold a Next.js App Router project with TypeScript and Tailwind CSS. Run the build and report the result.
```

When a milestone is finished, check it before moving on:

```text
Check milestone M3 against its "done when" test in SPEC.md. List anything that fails and fix it.
```

**Prompt tips**

- Name the phase and say what not to do (for example "no 3D yet").
- Ask the tool to run the build and lint, and to fix what fails.
- Paste exact error messages instead of describing them.
- When something looks wrong, share a screenshot and say what you expected.

## What I need from you

Confirm the stack first. The rest can be collected while phase 1 is built.

- [ ] Confirm the stack: option A (Next.js) or option B (React, Express, MongoDB).
- [ ] Your latest resume (PDF or text) with roles, dates and achievements.
- [ ] A list of projects to feature: name, your role, stack, links, screenshots, and results.
- [ ] A short bio and a professional photo.
- [ ] Contact details to show: email, GitHub, LinkedIn, and any other profiles.
- [ ] Preferred domain name, if you already have one.
- [ ] Two or three portfolio sites whose look you like, and anything you dislike.
- [ ] 3D direction: abstract shapes, particles, or something related to code or your field.
- [ ] Two or three blog topics for launch, so the blog does not start empty.

**Next step:** read this spec, change anything you disagree with (edit it directly or leave comments), then start phase 1 with the starter prompt above.
