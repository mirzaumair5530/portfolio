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
  seo: {
    title: "Umair Farooq · Software Engineer",
    description: "Portfolio of Umair Farooq, a software engineer.",
  },
} as const;
