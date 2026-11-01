export type Experience = {
  company: string;
  role: string;
  location?: string;
  /** "2023-04" */
  start: string;
  /** Omit for the current role. */
  end?: string;
  summary: string;
  /** Measurable results where possible. */
  highlights: string[];
  stack: string[];
};

export type Resume = {
  name: string;
  headline: string;
  summary: string;
  experience: Experience[];
  education: { school: string; degree: string; start: string; end?: string }[];
  skills: { group: string; items: string[] }[];
  links: { label: string; url: string }[];
  /** "2026-11-01" */
  updatedAt: string;
};

// Placeholder content; replaced with the real resume in M7.
export const resume: Resume = {
  name: "Umair Farooq",
  headline: "Software Engineer",
  summary:
    "Software engineer who builds fast, accessible web applications from database to interface.",
  experience: [
    {
      company: "Example Company",
      role: "Software Engineer",
      location: "Remote",
      start: "2023-04",
      summary: "Placeholder role used to lay out the timeline.",
      highlights: ["Placeholder highlight with a measurable result."],
      stack: ["TypeScript", "React", "Node.js"],
    },
  ],
  education: [
    {
      school: "Example University",
      degree: "BSc Computer Science",
      start: "2018",
      end: "2022",
    },
  ],
  skills: [
    { group: "Frontend", items: ["React", "Next.js", "TypeScript"] },
    { group: "Backend", items: ["Node.js", "Express"] },
    { group: "Databases", items: ["MongoDB", "PostgreSQL"] },
    { group: "Tools", items: ["Git", "Docker"] },
    { group: "Cloud", items: ["Vercel", "AWS"] },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
  ],
  updatedAt: "2026-11-01",
};
