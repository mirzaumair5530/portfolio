import type { MetadataRoute } from "next";
import { resume } from "@/data/resume";
import { site } from "@/data/site";
import { getPosts, getProjects } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url("/"), lastModified: new Date(resume.updatedAt) },
    { url: url("/projects") },
    { url: url("/blog") },
    { url: url("/resume"), lastModified: new Date(resume.updatedAt) },
    ...getProjects().map((project) => ({
      url: url(`/projects/${project.slug}`),
    })),
    ...getPosts().map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: new Date(post.frontmatter.date),
    })),
  ];
}
