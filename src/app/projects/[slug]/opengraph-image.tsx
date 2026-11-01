import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getProject, getProjects } from "@/lib/mdx";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Project share image";

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOgImage({
    kicker: "Case study",
    title: project?.frontmatter.title ?? "Project",
    subtitle: project?.frontmatter.summary,
  });
}
