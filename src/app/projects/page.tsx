import type { Metadata } from "next";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { StackingProjects } from "@/components/cards/StackingProjects";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TitleRule } from "@/components/ui/TitleRule";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/mdx";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Full-stack products and experiments by Umair Farooq: the problem, the solution and the result.",
  path: "/projects",
});

export default function ProjectsPage() {
  // Only what the cards need crosses to the client; the MDX body stays here.
  const projects = getProjects().map(({ slug, frontmatter }) => ({
    slug,
    frontmatter,
  }));
  // Up to four featured projects stack at the top; the rest go in the grid.
  const featured = projects
    .filter((project) => project.frontmatter.featured)
    .slice(0, 4);
  const rest = projects.filter((project) => !featured.includes(project));

  return (
    <>
      <Container className="page-top">
        <SectionHeader as="h1" title="Featured projects">
          {site.copy.projects}
        </SectionHeader>
        <div className="mt-10 tablet:mt-20">
          <StackingProjects projects={featured} />
        </div>
      </Container>

      {rest.length > 0 && (
        <Section className="pt-0!">
          <Reveal>
            <TitleRule title="More projects" />
          </Reveal>
          <Reveal
            as="ul"
            stagger
            className="mt-10 grid gap-x-10 gap-y-16 tablet:grid-cols-2"
          >
            {rest.map((project) => (
              <RevealItem as="li" key={project.slug}>
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </Reveal>
        </Section>
      )}
    </>
  );
}
