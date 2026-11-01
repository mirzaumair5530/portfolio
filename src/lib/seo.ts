import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetadata = {
  /** Page title without the site name; the layout template adds it. */
  title?: string;
  description: string;
  /** Path of the page, for example "/blog/hello-world". */
  path: string;
  type?: "website" | "article";
  /** "2026-11-01", for articles. */
  publishedTime?: string;
  tags?: string[];
};

/**
 * Title, description, canonical URL, Open Graph and Twitter tags for one
 * route. Relative URLs resolve against `metadataBase` set in the root layout.
 * Share images come from the `opengraph-image` files next to each route.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  tags,
}: PageMetadata): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : site.seo.title;

  return {
    title: title ?? { absolute: site.seo.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      ...(type === "article" && { publishedTime, tags, authors: [site.name] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
