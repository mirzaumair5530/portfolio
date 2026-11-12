# Portfolio Clone Spec (reference: Portavia Framer template)

Audit date: 2026-11-11 · Reference: `https://portavia.framer.website/` · Target stack: Next.js (App Router)

## 0. How to read this spec

- **Measured** values (sizes, colours, fonts, spacing, sticky offsets) were read from the live DOM at a 1217 × 978 desktop viewport.
- **Recommended** values (easing, durations, tablet/mobile layout) are marked as such. Framer does not expose its animation timings, and the tablet and mobile layouts could not be rendered during this audit, so those parts are design decisions to tune by eye against the live site.
- The reference is a paid Framer template. Use this spec for structure and behaviour, and supply your own name, copy, photos and project images. Do not reuse the template's images or text.

## 1. Site map

| Route | Page | Notes |
|---|---|---|
| `/` | Home | 8 sections + footer |
| `/about` | About | Split layout with sticky image column |
| `/projects` | Projects index | 4 featured (stacked) + grid of the rest |
| `/projects/[slug]` | Project detail | 8 projects in the reference |
| `/blogs` | Blog index | 1 pinned post + grid, 6 posts in the reference |
| `/blogs/[slug]` | Blog post | Rich content + subscribe banner |
| `/#contact` | Contact | Not a page. "Contact" in the nav scrolls to the home contact section |
| `not-found` | 404 | Hero-style layout |

## 2. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript, React Server Components by default |
| Styling | Tailwind CSS with CSS variables for theme tokens |
| Animation | `motion` (Framer Motion): `useScroll`, `useTransform`, `useSpring`, `whileInView`, `AnimatePresence` |
| Smooth scroll | `lenis` (`lenis/react`), mounted once in the root layout |
| Theme | `next-themes` (class strategy), light default |
| Content | MDX files (`content/projects/*.mdx`, `content/blogs/*.mdx`) via `next-mdx-remote` or Contentlayer-style loader |
| Forms | `react-hook-form` + `zod`, Server Action, email through Resend |
| Fonts | `next/font/google`: Antonio (400, 700), Inter (300, 400, 600) |
| Icons | `lucide-react` (chevrons, arrow, check-circle, star) + inline SVG for X, Instagram, Behance, Dribbble |
| Images | `next/image`, all cards `object-cover` |

## 3. Design tokens

### 3.1 Colours (measured, light and dark)

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--accent` | `#5E67E6` | `#D0FF71` | Links, badges, numbers, footer bg, cursor, switch |
| `--bg` | `#FFFFFF` | `#1A1A1B` | Page background |
| `--text` | `#303030` | `#FFFFFF` | Headings and body |
| `--text-inverse` | `#FFFFFF` | `#303030` | Text on dark buttons |
| `--text-muted` | `#8F8F8F` | `#B5B5B5` | Secondary text, dates |
| `--text-muted-2` | `#8F8F8F` | `#D4D4D4` | Captions |
| `--border` | `#DADADA` | `#5C5C5C` | Dividers, accordion lines |
| `--surface` | `#F5F5F5` | `#333333` | Cards, inputs |
| `--surface-dark` | `#303030` | `#303030` | Dark stat card, dark buttons |
| `--nav-bg` | `rgba(255,255,255,.9)` | `rgba(15,15,15,.9)` | Nav pill (plus `backdrop-filter: blur(5px)`) |
| `--success` | `#0BDE66` | `#0BDE66` | "Available for work" dot |
| `--error` | `#FF2244` | `#FF2244` | Form errors |

In dark mode, text placed on `--accent` (footer, badges) must switch to dark (`#1A1A1B`) for contrast.

### 3.2 Typography (measured)

| Style | Font | Size / line-height | Weight | Other |
|---|---|---|---|---|
| Display (H1) | Antonio | 120 / 132 | 700 | uppercase, letter-spacing −3.6px |
| Section title (H2) | Antonio | 60 / 78 | 700 | uppercase |
| Big number | Antonio | 60 / 60 | 700 | accent colour |
| Sub-heading (H3) | Antonio | 32 / 41.6 | 400 | uppercase |
| Small heading (H4) | Antonio | 26 / 33.8 | 400 | uppercase (FAQ questions, button labels) |
| Body L | Inter | 18 / 27 | 300 | |
| Body L strong | Inter | 18 / 23.4 | 600 | stat labels, footer values |
| Body | Inter | 16 / 24 | 300 | nav links |
| Small | Inter | 14 / 21 | 300 | card descriptions, badges |
| Small strong | Inter | 14 / 14 | 600 | testimonial names |

Recommended responsive scale: H1 120 → 88 (tablet) → 56 (mobile); H2 60 → 48 → 36; H3 32 → 28 → 24.

### 3.3 Layout and shape (measured)

| Item | Value |
|---|---|
| Container | `max-width: 1200px`, `padding: 0 40px` (content width 1120) |
| Section vertical padding | 120px top and bottom |
| Gap, section header → content | 40px |
| Card radius | 20px |
| Pill radius | 99px |
| Nav pill radius | 28px |
| Breakpoints (Framer's) | Desktop ≥ 1200, Tablet 810–1199, Phone < 810 |

## 4. Global elements

### 4.1 Floating nav
- `position: fixed; top: 20px`, horizontally centred, `z-index` above everything.
- Pill: 56px tall, 8px inner padding, `--nav-bg` with 5px blur.
- **Open state** (508px wide): 40px round avatar (links to `/`) · links Home, About, Projects, Blogs (Inter 16/300, active link in accent) · "Contact" button (118 × 40, pill, `--surface-dark`, white text).
- **Collapsed state** (229px wide): avatar + "Available for work" + pulsing green dot. Triggered when scrolling down past the top; expands again on scroll up or hover. Animate width with a `layout` transition (recommended spring, stiffness 300, damping 30).
- Link hover: text rolls up to reveal a duplicate label (each label is rendered twice in the DOM). Contact hover: a 20px accent circle scales up from the bottom to fill the button.
- Phone (recommended): avatar + hamburger; full-screen overlay menu with the same links.

### 4.2 Noise overlay
Fixed full-viewport layer, tiled grain texture, `opacity: 0.12`, `pointer-events: none`. Much more visible in dark mode.

### 4.3 Custom cursor
16px accent dot following the pointer (use `useSpring` on x/y). Over project and blog cards it grows to about 60px and shows an arrow-up-right icon. Disable on touch devices.

### 4.4 Theme switch
Fixed, bottom centre. Track 40 × 20 in accent, 14px white knob. Toggles light/dark and persists the choice.

### 4.5 Smooth scroll
Lenis on the whole document. In-page anchors (`/#contact`) must go through `lenis.scrollTo`.

### 4.6 Footer
- Background `--accent`, 40px padding, white text.
- Top row, 3 equal columns: "Email :" + address · "Call Today :" + phone · "Social :" + 4 icons (X, Instagram, Behance, Dribbble).
- 1px white divider.
- Bottom row: copyright left, "Created by" + small avatar + name right.

### 4.7 Shared components
| Component | Spec |
|---|---|
| `SectionHeader` | H2 + Body L paragraph, paragraph max-width about 460px |
| `OutlineButton` | Pill, 48px tall, 1px accent border, Antonio 26 uppercase accent label; hover fills with accent and inverts text |
| `DarkButton` | Pill, `--surface-dark` bg, white Antonio label ("Load More", "Subscribe") |
| `CategoryBadge` | Pill, padding 3px 15px, Inter 14. Filled accent with white text on image cards, outlined accent elsewhere |
| `AvatarCard` | 340 × 476, radius 20, image cover, optional `WaveBadge` |
| `WaveBadge` | About 110px accent circle overlapping the card's bottom-left corner; alternates between a waving-hand icon and "Hi" (Inter 40, white) |
| `Counter` | Counts from 0 to target when it enters the viewport (about 1.5s, ease-out); supports suffix `+` or `%` |
| `Accordion` | Row with title + chevron, 1px bottom border, single-open, height animated with `AnimatePresence` |

## 5. Home page (`/`)

Order: Hero → Services → About → Featured Projects → Testimonials → FAQ → Blog → Contact → Footer.

### 5.1 Hero + Services + About (one pinned scroll scene)

These three sections share a single wrapper, 3 × 100vh tall. A sticky layer (`position: sticky; top: 0; height: 100vh`) holds one `AvatarCard` that stays on screen while the three content panels scroll past underneath/behind it.

**Card behaviour across scroll progress (0 → 1 of the wrapper):**

| Progress | Section in view | Card position | Card face |
|---|---|---|---|
| 0 | Hero | Centre of viewport, upright | Portrait photo + `WaveBadge` |
| 0 → 0.5 | Hero → Services | Slides to the right column, flips 180° on Y, ends tilted a few degrees | Back face: workspace image |
| 0.5 → 1 | Services → About | Stays right, flips another 180° | Portrait photo again |

Implementation: `useScroll({ target: wrapperRef, offset: ['start start', 'end end'] })`, then `useTransform` for `x` (0 → about +28vw), `rotateY` (0 → 180 → 360) and `rotateZ` (0 → about 6°). Two absolutely stacked faces with `backface-visibility: hidden`; parent needs `perspective: 1200px` and `transform-style: preserve-3d`. Swap the image of the hidden face at the midpoint so three different images can be shown.

**Hero panel (100vh):**
- Left of card: small name line (Antonio 32) above the first H1 word ("DIGITAL").
- Right of card: second H1 word ("DESIGNER"), with a right-aligned Body L tagline beneath it.
- Both words sit vertically centred, either side of the card.
- Entrance (recommended): words slide in from left/right with fade, card scales 0.9 → 1, 0.8s, ease `[0.22, 1, 0.36, 1]`.

**Services panel (100vh), content in the left half:**
- `SectionHeader`: "What I can do for you" + paragraph.
- 4-item accordion (1. UI/UX Design, 2. Graphic Design, 3. Web Design, 4. Branding). Title Antonio 32; open item's title and bottom border turn accent. Body is a list of 4 lines, each with an accent check-circle icon (Inter 16/300).

**About panel (100vh), content in the left half:**
- H2 "About me" + paragraph.
- 3 counters in a row: number (Antonio 60, accent) + label (Inter 18/600). Reference values: 12, 270, 50+.
- Contact info, 2 columns: "Call Today :" and "Email :" labels (600) with values.
- Row of 4 social icons.
- `OutlineButton` "My Story" → `/about`.

### 5.2 Featured Projects (stacking cards)
- `SectionHeader`: "Featured projects" + paragraph.
- 4 cards, each 1120 wide with a 3:2 ratio (747px tall at desktop), radius 20, `position: sticky; top: 80px`, 120px gap between cards.
- Card content: full-bleed cover image, overlay `linear-gradient(rgba(12,12,13,.45), rgba(12,12,13,.8))`, centred stack of `CategoryBadge` (filled), H2 title (white), description (Inter 14, white, max about 560px). Whole card links to `/projects/[slug]`.
- Scroll effect: as the next card slides over, the previous card scales from 1 to 0.8 (transform-origin top centre). Per card: `useScroll({ target: cardRef, offset: ['start 80px', 'end start'] })` → `scale`.
- `OutlineButton` "Browse all projects" centred below → `/projects`.

### 5.3 Testimonials
- `SectionHeader`: "What my clients say" + paragraph.
- Grid: 3 columns × 2 rows, cells 360 × 239, 20px gap. Cell order: Testimonial, Testimonial, Stat (dark) / Stat (accent), Testimonial, Testimonial.
- Testimonial card: `--surface` bg, radius 20, 40px padding; 5 accent stars; quote (Inter 14/300); 40px round avatar + name (14/600) + role (14/300).
- Stat card: radius 20, 40px padding, `justify-content: space-between`; small sentence on top, `Counter` (Antonio 60, white) and label at the bottom. Reference: "98% Satisfaction Rate" on `--surface-dark`, "200% Growth" on accent.
- Recommended entrance: cards fade/slide up with 0.08s stagger on `whileInView`, once.

### 5.4 FAQ
- Two columns with 80px gap: left 440px, right 600px.
- Left column is `position: sticky; top: 100px`: H2 "Frequently asked questions" + paragraph.
- Right column: 6-item `Accordion`. Question in Antonio 26 uppercase, prefixed "1." to "6."; chevron on the right; 1px `--border` line; about 30px between rows.

### 5.5 Blog preview
- `SectionHeader`: "Design insights & ideas" + paragraph.
- 2 cards side by side, each 540 wide, 40px gap. Card: image 540 × 320 (radius 20), meta row (`CategoryBadge` outlined + date in muted 14), title (Antonio 32 uppercase), description (Inter 14).
- Hover: image scales to about 1.05 inside its rounded mask; custom cursor enlarges.
- `OutlineButton` "Browse all insights" → `/blogs`.

### 5.6 Contact (`id="contact"`)
- Two 560px columns.
- Left: `AvatarCard` (340 × 476) with `WaveBadge`.
- Right: H2 "Let's work together", paragraph, form.
- Form fields (all required): Name (text) and Email (email) in one row; Service Needed (select: Branding, Web Design, UI / UX); Message (textarea, 140px tall). Labels Inter 14 in accent. Inputs on `--surface`, pill-shaped (textarea radius 20), no border.
- Submit: `OutlineButton`, 145 × 50.
- States: inline zod errors in `--error`, button loading state, success message replacing the form.
- Spam protection: one hidden honeypot field; reject if filled.

## 6. About page (`/about`)

### 6.1 Split scene
Wrapper with two columns: a 560px scrolling content column on the left and a sticky column on the right (`top: 0; height: 100vh`) containing a centred 340 × 476 image card. The card's image changes as each left-hand section becomes active (recommended: cross-fade or the same Y-flip used on the home page).

| # | Left section | Content | Right image |
|---|---|---|---|
| 1 | About (100vh) | H1 "About me" (120), name (Antonio 32), 2 paragraphs, 4 social icons | Portrait |
| 2 | Services | Same header + accordion as home 5.1 | Workspace |
| 3 | Experience | H2 "Discover my journey in design", paragraph, 4 rows: role (Antonio 32) left, company (accent, 600) + years (muted 14) right-aligned, 1px divider | Person at desk |
| 4 | Tech stack | H2 "My tech stack", paragraph, 5 rows: 48px rounded app icon, tool name (600), one-line description, divider | Workspace |

### 6.2 Process (bento grid)
- `SectionHeader`: "Design with strategy and creativity" + paragraph.
- Grid: 3 columns of 360px, 20px gap, rows 380px tall, radius 20.

| Row | Col 1 | Col 2 | Col 3 |
|---|---|---|---|
| 1 | Step 01 (dark) | Image | Step 02 (accent) |
| 2 | Image | Step 03 (`--surface`, spans 2 columns) | |
| 3 | Step 04 (accent) | Step 05 (dark) | Image |

- Step card: number "01." (Antonio 60) at the top, title (Antonio 32 uppercase) and description (Inter 14) at the bottom, 40px padding.

### 6.3 Contact + Footer
Identical to home 5.6 and 4.6.

## 7. Projects index (`/projects`)

1. Header: H1 "Featured projects" (120) + paragraph (max about 460px), 120px below the nav.
2. Stacking cards: the same component as home 5.2, showing the 4 featured projects.
3. "More projects": title row (Antonio 32) with a horizontal line filling the remaining width, then a 2-column grid of project cards (image radius 20, outlined `CategoryBadge`, title Antonio 32, description 14). Shows non-featured projects.
4. Footer.

## 8. Project detail (`/projects/[slug]`)

Content column is narrower than the main container (about 1000px).

1. Outlined `CategoryBadge`.
2. H1 project title (120, wraps to 2 lines).
3. One-line summary (Body L).
4. Meta grid, 4 columns: Year, Industry, Client, Project Duration. Label Inter 14, value accent 600.
5. Main cover image, full column width, radius 20.
6. Content blocks alternating with images:
   - "Problem :" (Antonio 32) + paragraphs → full-width image
   - "Solution :" + paragraphs → 2 images side by side
   - "Challenge :" + paragraphs
   - "Summary :" + paragraphs → 2 images
7. "More projects": title + line, 2-column card grid showing 6 other projects, `DarkButton` "Load more".
8. Footer.

## 9. Blog index (`/blogs`)

1. Header: H1 "Design insights & ideas" + paragraph.
2. Pinned post: full-width card (1120 wide, image about 500px tall, radius 20) with a "Most viewed" badge (accent, Antonio) in the top-left corner; below it meta row, title, description.
3. Grid: 2 columns of the blog card from 5.5 for the remaining posts.
4. Footer.

## 10. Blog post (`/blogs/[slug]`)

Content column about 1000px.

1. H1 title (120), summary (Body L), meta row (outlined `CategoryBadge` + date).
2. Cover image, radius 20.
3. MDX body: H2 rendered as Antonio 32 uppercase ("1. Set clear goals…"), paragraphs and bullet lists in Inter 16–18/300, images full-width or in pairs, radius 20, 60–80px between blocks.
4. Subscribe banner: accent background, radius 20, 40px padding. Left: H3 "Like what you see? There's more." + small text. Right: email input (white pill) above a `DarkButton` "Subscribe".
5. "More to discover": title + line, 2 blog cards, "Load more".
6. Footer.

## 11. 404

Hero-style composition: "404" (H1) on the left, an image card in the centre with a filled accent pill button "Back Home" overlapping its lower edge, "OOPS!" (H1) on the right, and a muted line of text beneath.

## 12. Animation inventory

| # | Effect | Where | Technique |
|---|---|---|---|
| 1 | Smooth scrolling | Global | Lenis |
| 2 | Pinned 3D card: move + Y-flip + image swap | Home 5.1, About 6.1 | `position: sticky` + `useScroll` / `useTransform` |
| 3 | Stacking cards with scale-down | Home 5.2, Projects | `position: sticky; top: 80px` + per-card `useScroll` → `scale` 1 → 0.8 |
| 4 | Nav collapse / expand | Global | Scroll direction via `useMotionValueEvent(scrollY)`, `layout` animation |
| 5 | Nav link text roll, button fill | Nav, buttons | CSS transforms on hover |
| 6 | Counters | About stats, stat cards | `useInView` + `animate(0, target)` |
| 7 | Accordions | Services, FAQ | `AnimatePresence`, height auto, chevron rotate 180° |
| 8 | Sticky side column | FAQ, About | CSS sticky only |
| 9 | Custom cursor | Global | `useSpring` on pointer position, variant on card hover |
| 10 | Wave badge | Avatar cards | Looping rotate keyframes on the hand, swap to "Hi" |
| 11 | Pulsing status dot | Collapsed nav | CSS keyframes |
| 12 | Section reveal | All section headers and cards | `whileInView`, y 30 → 0, opacity 0 → 1, once (recommended) |
| 13 | Image hover zoom | Project and blog cards | CSS `scale(1.05)` inside overflow-hidden |
| 14 | Theme change | Global | CSS variable swap, 0.3s colour transition |

All motion must respect `prefers-reduced-motion`: disable Lenis, flips, scale and parallax, and keep simple fades.

## 13. Responsive rules (recommended)

| Element | Tablet (810–1199) | Phone (< 810) |
|---|---|---|
| Container padding | 30px | 20px |
| Hero | Words stacked above/below the card | Same, H1 56px, card about 260 × 364 |
| Pinned card scene | Keep, smaller x-travel | Drop the pin and flip; show a static image per section |
| Two-column sections (FAQ, Contact, About split) | Stack, remove sticky | Stack |
| Stacking project cards | Keep, ratio 4:3 | Ratio 4:5, sticky top 70px, or plain list |
| Testimonial grid | 2 columns | 1 column |
| Process bento | 2 columns | 1 column, images between steps |
| Blog / project grids | 2 columns | 1 column |
| Footer top row | 3 columns | Stacked |
| Custom cursor | Off on touch | Off |

## 14. Content model

```ts
type Project = {
  slug: string; title: string; category: string; summary: string;
  cover: string; featured: boolean;
  year: string; industry: string; client: string; duration: string;
  gallery: string[];           // 5 images used between content blocks
  // MDX body: Problem, Solution, Challenge, Summary
};

type Post = {
  slug: string; title: string; category: 'Insights' | 'Tutorials' | 'Resources';
  date: string; summary: string; cover: string; pinned?: boolean;
  // MDX body
};

type SiteConfig = {
  name: string; role: [string, string];        // the two hero words
  tagline: string; email: string; phone: string;
  socials: { label: string; href: string }[];
  stats: { value: number; suffix?: string; label: string }[];
  services: { title: string; items: string[] }[];
  experience: { role: string; company: string; years: string }[];
  stack: { name: string; description: string; icon: string }[];
  process: { title: string; description: string }[];
  testimonials: { quote: string; name: string; role: string; avatar: string }[];
  faqs: { q: string; a: string }[];
};
```

## 15. Suggested project structure

```
app/
  layout.tsx            fonts, ThemeProvider, LenisProvider, Nav, Cursor, Noise, ThemeSwitch, Footer
  page.tsx              Home
  about/page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx
  blogs/page.tsx
  blogs/[slug]/page.tsx
  not-found.tsx
  actions/contact.ts    Server Action
components/
  layout/   Nav, Footer, NoiseOverlay, CustomCursor, ThemeSwitch, LenisProvider
  ui/       SectionHeader, OutlineButton, DarkButton, CategoryBadge, Accordion, Counter, AvatarCard, WaveBadge
  home/     PinnedScene, HeroPanel, ServicesPanel, AboutPanel, StackingProjects, Testimonials, Faq, BlogPreview, Contact
  about/    SplitScene, Experience, TechStack, ProcessGrid
  cards/    ProjectCard, BlogCard, StackCard
content/    projects/*.mdx, blogs/*.mdx, site.ts
lib/        content loaders, zod schemas
```

Only components that use motion, scroll or state need `"use client"`. Pages and content loading stay as server components.

## 16. Non-functional requirements

- Lighthouse: Performance ≥ 90, Accessibility ≥ 95 on desktop.
- Hero image uses `priority`; everything else lazy-loads with fixed aspect ratios to avoid layout shift.
- Animate only `transform` and `opacity`.
- Keyboard: visible focus rings, accordions use `button` with `aria-expanded`, nav usable without hover.
- SEO: `generateMetadata` per page, Open Graph image per project and post, `sitemap.ts`, `robots.ts`.
- Static generation for all project and blog routes (`generateStaticParams`).

## 17. Build order

1. Scaffold, tokens, fonts, theme, container and typography utilities.
2. Global shell: nav (both states), footer, noise, cursor, theme switch, Lenis.
3. Shared UI components (section 4.7).
4. Home static sections: Testimonials, FAQ, Blog preview, Contact form.
5. Home scroll scenes: stacking projects, then the pinned card scene.
6. Content layer (MDX) + Projects index and detail.
7. Blog index and post.
8. About page (split scene, process grid) and 404.
9. Responsive pass, reduced-motion pass, dark-mode pass.
10. SEO, performance, deploy.

## 18. Acceptance checklist

- [ ] Nav collapses to the status pill on scroll down and reopens on scroll up
- [ ] Hero card stays pinned through three panels, flips twice and ends on the right
- [ ] Project cards pin at 80px and the covered card shrinks to 0.8
- [ ] Counters animate once when visible
- [ ] Only one accordion item open at a time, in both Services and FAQ
- [ ] FAQ heading and About image stay sticky while their column scrolls
- [ ] Contact form validates, sends, and shows success and error states
- [ ] Light and dark themes match the token table, including the lime accent in dark
- [ ] Custom cursor enlarges over cards and is disabled on touch
- [ ] Layout holds at 1440, 1200, 810 and 390 widths
- [ ] Reduced-motion users get a static, fully readable page
