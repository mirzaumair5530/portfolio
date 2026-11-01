import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/mdx";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Full-stack products and experiments by Umair Farooq: the problem, the role, the stack and the result.",
  path: "/projects",
});

export default function ProjectsPage() {
  // Only what the grid needs crosses to the client; the MDX body stays here.
  const projects = getProjects().map(({ slug, frontmatter }) => ({
    slug,
    frontmatter,
  }));

  return (
    <Container>
      <SectionHeading as="h1" kicker="Projects" title="Things I’ve built." />
      <p className="text-muted mt-6 max-w-xl leading-8">
        Full-stack products and experiments. Pick a project to read the problem,
        my role, the stack and the result.
      </p>
      <div className="mt-10">
        <ProjectsGrid projects={projects} />
      </div>
    </Container>
  );
}
