import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Project" };

// Placeholder slug so the route prerenders; real slugs come from MDX in M2.
export function generateStaticParams() {
  return [{ slug: "sample" }];
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;

  return (
    <Container>
      <SectionHeading as="h1" kicker="Project" title={slug} />
      <p className="text-muted mt-6 max-w-xl">
        Placeholder. The detail layout is built in M3.6.
      </p>
    </Container>
  );
}
