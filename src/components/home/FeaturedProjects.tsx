import { StackingProjects } from "@/components/cards/StackingProjects";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";
import { getProjects } from "@/lib/mdx";

/** Up to four projects marked `featured`, as stacking cards. */
export function FeaturedProjects() {
  // Only what the cards need crosses to the client; MDX bodies stay here.
  const projects = getProjects()
    .filter((project) => project.frontmatter.featured)
    .slice(0, 4)
    .map(({ slug, frontmatter }) => ({ slug, frontmatter }));
  if (projects.length === 0) return null;

  return (
    <Section>
      <SectionHeader title="Featured projects">
        {site.copy.projects}
      </SectionHeader>
      <div className="mt-10">
        <StackingProjects projects={projects} />
      </div>
      <div className="flex justify-center">
        <Button href="/projects">Browse all projects</Button>
      </div>
    </Section>
  );
}
