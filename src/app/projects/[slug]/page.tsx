import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Button } from "@/components/ui/Button";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Container } from "@/components/ui/Container";
import { LoadMoreGrid } from "@/components/ui/LoadMoreGrid";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { TitleRule } from "@/components/ui/TitleRule";
import { pageMetadata } from "@/lib/seo";
import { getProject, getProjects } from "@/lib/mdx";

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();

  const { frontmatter: fm, content } = project;
  const others = projects.filter((entry) => entry.slug !== slug);
  const meta = [
    { label: "Year", value: fm.year },
    { label: "Industry", value: fm.industry },
    { label: "Client", value: fm.client },
    { label: "Project duration", value: fm.duration },
  ];

  return (
    <>
      <Container className="page-top">
        {/* The content column is narrower than the main container. */}
        <div className="mx-auto max-w-[1000px]">
          <CategoryBadge>{fm.category}</CategoryBadge>
          <h1 className="type-display mt-5">{fm.title}</h1>
          <p className="type-body-l mt-5 max-w-[640px]">{fm.summary}</p>

          <dl className="mt-10 grid grid-cols-2 gap-6 tablet:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="type-small">{item.label}</dt>
                <dd className="text-accent font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="type-small">
              <span className="font-semibold">Built with: </span>
              {fm.stack.join(", ")}
            </p>
            {fm.links.map((link) => (
              <Button
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-5"
              >
                {link.label}
              </Button>
            ))}
          </div>

          <div className="rounded-card relative mt-10 aspect-[3/2] overflow-hidden tablet:mt-16">
            <Media
              image={{ src: fm.cover, alt: fm.coverAlt }}
              label="Project cover"
              sizes="(min-width: 1080px) 1000px, 100vw"
              priority
            />
          </div>

          <article className="mt-10 tablet:mt-16">
            <MdxContent source={content} variant="project" />
          </article>
        </div>
      </Container>

      {others.length > 0 && (
        <Section>
          <TitleRule title="More projects" />
          <LoadMoreGrid initial={6} className="mt-10">
            {others.map(({ slug: otherSlug, frontmatter }) => (
              <ProjectCard
                key={otherSlug}
                project={{ slug: otherSlug, frontmatter }}
              />
            ))}
          </LoadMoreGrid>
        </Section>
      )}
    </>
  );
}
