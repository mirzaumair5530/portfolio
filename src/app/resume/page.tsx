import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <Container>
      <SectionHeading as="h1" kicker="Experience" title="Resume" />
      <p className="text-muted mt-6 max-w-xl">
        Placeholder. The resume page is built in M3.9.
      </p>
    </Container>
  );
}
