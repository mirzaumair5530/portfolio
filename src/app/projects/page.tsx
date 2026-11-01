import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Container>
      <SectionHeading as="h1" kicker="Work" title="Projects" />
      <p className="text-muted mt-6 max-w-xl">
        Placeholder. The project grid is built in M3.5.
      </p>
    </Container>
  );
}
