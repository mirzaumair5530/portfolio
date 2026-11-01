import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <Container>
      <SectionHeading as="h1" kicker="Software engineer" title="Umair Farooq" />
      <p className="text-muted mt-6 max-w-xl">
        Placeholder home page. The hero and sections are built in M3.
      </p>
    </Container>
  );
}
