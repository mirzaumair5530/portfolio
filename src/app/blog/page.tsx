import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Container>
      <SectionHeading as="h1" kicker="Writing" title="Blog" />
      <p className="text-muted mt-6 max-w-xl">
        Placeholder. The post list is built in M3.7.
      </p>
    </Container>
  );
}
