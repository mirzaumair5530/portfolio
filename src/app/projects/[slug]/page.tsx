import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProject, getProjects } from "@/lib/mdx";

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.frontmatter.title };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Container>
      <SectionHeading
        as="h1"
        kicker="Project"
        title={project.frontmatter.title}
      />
      <article className="mt-8 max-w-3xl">
        <MdxContent source={project.content} />
      </article>
    </Container>
  );
}
