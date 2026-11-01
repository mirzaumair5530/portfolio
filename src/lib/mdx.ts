import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { getReadingTime } from "@/lib/reading";
import {
  postSchema,
  projectSchema,
  type PostFrontmatter,
  type ProjectFrontmatter,
} from "@/lib/content-schema";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export type ContentEntry<T> = {
  slug: string;
  frontmatter: T;
  /** MDX body without the frontmatter block. */
  content: string;
  /** Whole minutes. */
  readingTime: number;
};

export type Project = ContentEntry<ProjectFrontmatter>;
export type Post = ContentEntry<PostFrontmatter>;

// Drafts show in development and are hidden in production builds.
const showDrafts = process.env.NODE_ENV !== "production";

// Reads every `<slug>.mdx` in a content folder and validates its frontmatter.
// An invalid field throws, which fails the build with the file name and field.
function loadAll<T extends { draft: boolean }>(
  folder: string,
  schema: z.ZodType<T>,
): ContentEntry<T>[] {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const relative = path.join("src", "content", folder, file);
      const { data, content } = matter(
        fs.readFileSync(path.join(dir, file), "utf8"),
      );
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        throw new Error(
          `Invalid frontmatter in ${relative}:\n${z.prettifyError(parsed.error)}`,
        );
      }
      return {
        slug: file.replace(/\.mdx$/, ""),
        frontmatter: parsed.data,
        content,
        readingTime: getReadingTime(content),
      };
    })
    .filter((entry) => showDrafts || !entry.frontmatter.draft);
}

/** Projects sorted by `order`, then title. */
export function getProjects(): Project[] {
  return loadAll("projects", projectSchema).sort(
    (a, b) =>
      a.frontmatter.order - b.frontmatter.order ||
      a.frontmatter.title.localeCompare(b.frontmatter.title),
  );
}

/** Posts sorted by date, newest first. */
export function getPosts(): Post[] {
  return loadAll("blog", postSchema).sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}
