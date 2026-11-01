import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Cover } from "@/components/ui/Cover";
import { PrevNext } from "@/components/ui/PrevNext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
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
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();

  const { frontmatter: fm, content } = projects[index];
  const toLink = (project?: (typeof projects)[number]) =>
    project && {
      href: `/projects/${project.slug}`,
      title: project.frontmatter.title,
    };

  return (
    <Container>
      <Link href="/projects" className="text-muted text-sm">
        ← All projects
      </Link>
      <SectionHeading
        as="h1"
        kicker={`Case study · ${fm.period.slice(0, 4)}`}
        title={fm.title}
        className="mt-6"
      />
      <p className="text-muted mt-6 max-w-2xl text-lg leading-8">
        {fm.summary}
      </p>
      <Cover src={fm.cover} label="Cover image" className="mt-10" />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[14rem_1fr]">
        <aside className="flex flex-col gap-6">
          <dl className="flex flex-col gap-5">
            <div>
              <dt className="text-muted font-mono text-xs uppercase">Role</dt>
              <dd className="text-foreground mt-1 text-sm">{fm.role}</dd>
            </div>
            <div>
              <dt className="text-muted font-mono text-xs uppercase">Period</dt>
              <dd className="text-foreground mt-1 text-sm">{fm.period}</dd>
            </div>
            <div>
              <dt className="text-muted font-mono text-xs uppercase">Stack</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {fm.stack.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          {fm.links.length > 0 && (
            <ul className="flex flex-col gap-3">
              {fm.links.map((link, i) => (
                <li key={link.url} className="flex flex-col">
                  <Button
                    href={link.url}
                    variant={i === 0 ? "primary" : "outline"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <article className="min-w-0 max-w-3xl">
          <MdxContent source={content} />
        </article>
      </div>

      <PrevNext
        label="project"
        prev={toLink(projects[index - 1])}
        next={toLink(projects[index + 1])}
      />
    </Container>
  );
}
