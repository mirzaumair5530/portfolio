import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resume } from "@/data/resume";

export function Skills() {
  return (
    <Container as="section" id="skills" className="scroll-mt-28 py-24">
      <SectionHeading kicker="03 — Skills" title="What I work with." />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resume.skills.map((group) => (
          <Card key={group.group} as="li" className="p-5 md:p-5">
            <h3 className="text-accent-2 font-mono text-xs tracking-widest uppercase">
              {group.group}
            </h3>
            <ul className="text-foreground mt-3 space-y-2 text-sm">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </ul>
    </Container>
  );
}
