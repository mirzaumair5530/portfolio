// Everything the pages say about Umair that is not a project, a post or the
// resume. Text in [square brackets] is a placeholder; replace it in M7.

/** `null` shows a labelled placeholder block until the file is in public/. */
export type SiteImage = { src: string; alt: string } | null;

export type SocialIcon = "github" | "linkedin" | "x" | "instagram";

const noImage = null as SiteImage;

export const site = {
  name: "Umair Farooq",
  /** The two large hero words, left and right of the photo card. */
  role: ["Software", "Engineer"] as [string, string],
  tagline: "Software engineer building fast, accessible web experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@example.com",
  phone: "[+00 000 000 0000]",
  /** Shown in the collapsed nav next to the green dot. */
  availability: "Available for work",
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "X", href: "https://x.com/", icon: "x" },
  ] as { label: string; href: string; icon: SocialIcon }[],
  resumePdf: "/umair-farooq-resume.pdf",

  // Put the files in public/ and set e.g. { src: "/umair.jpg", alt: "..." }.
  images: {
    /** Small round photo in the nav and footer. */
    avatar: noImage,
    /** Hero card, contact card and the first About section. */
    portrait: noImage,
    /** Back of the hero card; Services and Tech stack on the About page. */
    workspace: noImage,
    /** Experience section on the About page. */
    desk: noImage,
    /** The three image cells of the process grid. */
    process: [noImage, noImage, noImage] as [SiteImage, SiteImage, SiteImage],
    notFound: noImage,
  },

  // Placeholder numbers; set the real ones in M7.
  stats: [
    { value: 5, suffix: "+", label: "[Years of experience]" },
    { value: 20, suffix: "+", label: "[Projects shipped]" },
    { value: 10, suffix: "+", label: "[Happy clients]" },
  ] as { value: number; suffix?: string; label: string }[],

  services: [
    {
      title: "Web applications",
      items: [
        "Full-stack apps with React, Node.js and MongoDB",
        "Dashboards and internal tools",
        "Authentication, roles and payments",
        "Deployment and monitoring",
      ],
    },
    {
      title: "APIs and backends",
      items: [
        "REST APIs with Express",
        "Data modelling and query tuning",
        "Third-party integrations",
        "Automated tests",
      ],
    },
    {
      title: "Frontend engineering",
      items: [
        "Design to code, matched to the pixel",
        "Component libraries and design systems",
        "Scroll and motion that stay fast",
        "Angular and React codebases",
      ],
    },
    {
      title: "Performance and accessibility",
      items: [
        "Core Web Vitals audits and fixes",
        "Keyboard and screen reader support",
        "SEO foundations",
        "Bundle and image optimisation",
      ],
    },
  ],

  stack: [
    {
      name: "React",
      description: "Interfaces built from small, reusable components.",
    },
    {
      name: "Next.js",
      description: "Server rendering, routing and fast page loads.",
    },
    {
      name: "Node.js",
      description: "APIs and background jobs with Express.",
    },
    {
      name: "MongoDB",
      description: "Document data, modelled around how it is read.",
    },
    {
      name: "TypeScript",
      description: "Types that catch mistakes before users do.",
    },
  ] as { name: string; description: string; icon?: string }[],

  process: [
    {
      title: "Understand",
      description:
        "We agree on the problem, the users and what success looks like.",
    },
    {
      title: "Plan",
      description:
        "I break the work into small milestones with a clear scope for each.",
    },
    {
      title: "Build",
      description:
        "Short cycles with a working preview link you can click at every step.",
    },
    {
      title: "Test",
      description:
        "Real devices, slow networks, keyboards and screen readers.",
    },
    {
      title: "Launch",
      description: "Ship, measure, and fix what the numbers show.",
    },
  ],

  testimonials: [
    {
      quote: "[A short quote from a client or colleague about working with you.]",
      name: "[Client name]",
      role: "[Role, Company]",
      avatar: noImage,
    },
    {
      quote: "[A second quote. Two or three sentences read best in this card.]",
      name: "[Client name]",
      role: "[Role, Company]",
      avatar: noImage,
    },
    {
      quote: "[A third quote, ideally about a result you delivered.]",
      name: "[Client name]",
      role: "[Role, Company]",
      avatar: noImage,
    },
    {
      quote: "[A fourth quote, ideally about how you communicate.]",
      name: "[Client name]",
      role: "[Role, Company]",
      avatar: noImage,
    },
  ],

  /** The two stat cards inside the testimonial grid: dark first, then accent. */
  highlights: [
    {
      text: "[One sentence that explains the first number.]",
      value: 98,
      suffix: "%",
      label: "[Satisfaction rate]",
    },
    {
      text: "[One sentence that explains the second number.]",
      value: 200,
      suffix: "%",
      label: "[Growth]",
    },
  ] as { text: string; value: number; suffix?: string; label: string }[],

  faqs: [
    {
      q: "What kind of work do you take on?",
      a: "[Say which projects fit you best: product builds, rescues, audits, long-term roles.]",
    },
    {
      q: "Which technologies do you use?",
      a: "Mostly React and Next.js on the front, Node.js and Express on the back, and MongoDB for data. [Add anything else you want to be hired for.]",
    },
    {
      q: "How long does a project take?",
      a: "[Give a typical range, for example two to six weeks for a marketing site.]",
    },
    {
      q: "How do we work together?",
      a: "[Describe your process: kickoff call, weekly demo, shared board, async updates.]",
    },
    {
      q: "Do you work with existing codebases?",
      a: "[Say whether you join existing teams and how you get up to speed.]",
    },
    {
      q: "Are you available for full-time roles?",
      a: "[State your current availability and notice period.]",
    },
  ],

  /** Options of the "Service needed" field in the contact form. */
  contactServices: ["Web application", "API or backend", "Frontend", "Other"],

  /** The paragraph under each section title. */
  copy: {
    services:
      "From the first sketch to production, I take web products the whole way.",
    about:
      "I'm a software engineer who builds web applications end to end with React and the MEAN stack. [Add two sentences about what you enjoy building and how you work.]",
    story:
      "[A second paragraph for the About page: where you started, what you have worked on, what you want to do next.]",
    projects:
      "A few products I designed and built, with the problem, the solution and the result.",
    moreProjects: "More things I have built.",
    testimonials: "What people say after we have shipped something together.",
    faq: "Short answers to the questions I hear most. Ask me anything else through the form below.",
    blog: "Short write-ups on React, Node.js, MongoDB and the things I learn while shipping.",
    contact:
      "Have a project, a role or a question? Send a message and I'll reply soon.",
    experience: "The teams I have worked with and what I did there.",
    stack: "The tools I reach for first.",
    process: "How a project moves from an idea to something people use.",
  },

  seo: {
    title: "Umair Farooq · Software Engineer",
    description: "Portfolio of Umair Farooq, a software engineer.",
  },

  // --- First build; removed when the old sections go (R6.1). ---
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  handles: { github: "[username]", linkedin: "[username]" },
  hero: {
    badge: "Software engineer · React · MEAN stack",
    headline: "I build fast, careful web products.",
    intro:
      "Hi, I'm Umair. I design and build full-stack applications with React, Node.js, Express and MongoDB. [Add one line about what you focus on right now.]",
    stack: ["React", "Node.js", "Express", "MongoDB", "Angular"],
  },
  about: {
    photo: null as { src: string; alt: string } | null,
    title: "Full-stack engineer who cares about the details.",
    body: "I'm a software engineer who builds web applications end to end with React and the MEAN stack. [Add two sentences about what you enjoy building and how you work.]",
    facts: [
      { label: "Focus", value: "Full-stack web" },
      { label: "Based in", value: "[City, Country]" },
      { label: "Availability", value: "[Open to work]" },
    ],
  },
};
