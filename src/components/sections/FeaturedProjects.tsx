import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/mdx";

export function FeaturedProjects() {
  const projects = getProjects()
    .filter((project) => project.frontmatter.featured)
    .slice(0, 4);

  return (
    <Container as="section" id="projects" className="scroll-mt-28 py-24">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading kicker="04 — Projects" title="Selected work." />
        <Link href="/projects" className="text-accent-text shrink-0 text-sm">
          All projects →
        </Link>
      </div>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.slug} className="flex">
            <div className="flex w-full">
              <ProjectCard project={project} index={index} />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
