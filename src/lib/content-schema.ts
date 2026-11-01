import { z } from "zod";

// YAML turns an unquoted `2026-11-01` into a Date; keep dates as plain strings.
const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a date like "2026-11-01".'),
);

const link = z.object({
  label: z.string().min(1),
  url: z.url(),
});

// `.strict()` makes a misspelled field fail the build instead of being ignored.
export const projectSchema = z
  .object({
    title: z.string().min(1),
    summary: z.string().min(1),
    role: z.string().min(1),
    period: z.string().min(1),
    stack: z.array(z.string().min(1)).min(1),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().min(1).optional(),
    links: z.array(link).default([]),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  })
  .strict()
  .refine((data) => !data.cover || data.coverAlt, {
    message: "A cover image needs coverAlt (alt text describing it).",
    path: ["coverAlt"],
  });

export const postSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: isoDate,
    tags: z.array(z.string().min(1)).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().min(1).optional(),
  })
  .strict()
  .refine((data) => !data.cover || data.coverAlt, {
    message: "A cover image needs coverAlt (alt text describing it).",
    path: ["coverAlt"],
  });

export type ProjectFrontmatter = z.infer<typeof projectSchema>;
export type PostFrontmatter = z.infer<typeof postSchema>;
