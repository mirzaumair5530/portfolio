import { CrystalImage } from "@/components/sections/CrystalImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { site } from "@/data/site";

export function Hero() {
  return (
    <Container
      as="section"
      id="hero"
      className="grid items-center gap-12 pb-24 md:grid-cols-2"
    >
      <div className="flex flex-col items-start gap-6">
        <p className="glass text-accent-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs">
          <span
            aria-hidden="true"
            className="bg-accent-2 size-2 rounded-full"
          />
          {site.hero.badge}
        </p>
        <h1 className="font-heading text-foreground text-4xl font-bold tracking-tight text-balance md:text-6xl">
          {site.hero.headline}
        </h1>
        <p className="text-muted max-w-md text-lg leading-8">
          {site.hero.intro}
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="#projects">View projects →</Button>
          <Button href={site.resumePdf} variant="outline" download>
            Download resume ↓
          </Button>
        </div>
        <ul className="flex flex-wrap gap-2" aria-label="Main technologies">
          {site.hero.stack.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>
      </div>

      <figure className="flex flex-col items-center gap-3">
        <CrystalImage className="w-full max-w-sm" />
        <figcaption className="text-muted font-mono text-xs">
          Interactive 3D scene arrives in a later milestone
        </figcaption>
      </figure>
    </Container>
  );
}
