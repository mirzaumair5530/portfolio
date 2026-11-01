// Placeholder links and tagline; replaced with real details in M7.
export const site = {
  name: "Umair Farooq",
  tagline: "Software engineer building fast, accessible web experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@example.com",
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  // Shown next to the links in the contact section.
  handles: { github: "[username]", linkedin: "[username]" },
  resumePdf: "/umair-farooq-resume.pdf",
  hero: {
    badge: "Software engineer · React · MEAN stack",
    headline: "I build fast, careful web products.",
    intro:
      "Hi, I'm Umair. I design and build full-stack applications with React, Node.js, Express and MongoDB. [Add one line about what you focus on right now.]",
    stack: ["React", "Node.js", "Express", "MongoDB", "Angular"],
  },
  about: {
    // Set to { src: "/umair.jpg", alt: "Umair at his desk" } once the photo
    // is in public/. Until then a labelled placeholder shows.
    photo: null as { src: string; alt: string } | null,
    title: "Full-stack engineer who cares about the details.",
    body: "I'm a software engineer who builds web applications end to end with React and the MEAN stack. [Add two sentences about what you enjoy building and how you work.]",
    facts: [
      { label: "Focus", value: "Full-stack web" },
      { label: "Based in", value: "[City, Country]" },
      { label: "Availability", value: "[Open to work]" },
    ],
  },
  seo: {
    title: "Umair Farooq · Software Engineer",
    description: "Portfolio of Umair Farooq, a software engineer.",
  },
} as const;
