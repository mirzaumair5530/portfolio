import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export function About() {
  return (
    <Container
      as="section"
      id="about"
      className="grid scroll-mt-28 gap-10 py-24 md:grid-cols-[18rem_1fr]"
    >
      <div className="bg-surface border-border text-muted rounded-card relative flex aspect-[4/5] max-w-72 items-center justify-center overflow-hidden border font-mono text-sm">
        {site.about.photo ? (
          <Image
            src={site.about.photo.src}
            alt={site.about.photo.alt}
            fill
            sizes="288px"
            className="object-cover"
          />
        ) : (
          "[Your photo]"
        )}
      </div>
      <Reveal stagger className="flex flex-col justify-center gap-6">
        <SectionHeading kicker="01 — About" title={site.about.title} />
        <p className="text-muted max-w-xl leading-8">{site.about.body}</p>
        <ul className="grid gap-3 sm:grid-cols-3">
          {site.about.facts.map((fact) => (
            <Card key={fact.label} as="li" className="p-4 md:p-4">
              <p className="text-muted font-mono text-xs">{fact.label}</p>
              <p className="text-foreground mt-1 font-semibold">{fact.value}</p>
            </Card>
          ))}
        </ul>
      </Reveal>
    </Container>
  );
}
