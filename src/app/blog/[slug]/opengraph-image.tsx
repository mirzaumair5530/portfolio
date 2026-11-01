import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getPost, getPosts } from "@/lib/mdx";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Blog post share image";

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgImage({
    kicker: `Blog · ${post?.frontmatter.date ?? ""}`,
    title: post?.frontmatter.title ?? "Post",
    subtitle: post?.frontmatter.description,
  });
}
