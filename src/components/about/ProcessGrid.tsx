import { StepCard } from "@/components/cards/StepCard";
import { Media } from "@/components/ui/Media";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site, type SiteImage } from "@/data/site";

function ImageCell({ image }: { image: SiteImage }) {
  return (
    <div className="rounded-card relative h-full min-h-[280px] overflow-hidden">
      <Media
        image={image}
        label="Process photo"
        sizes="(min-width: 1200px) 360px, (min-width: 810px) 50vw, 100vw"
      />
    </div>
  );
}

// Bento grid of five steps and three images (clone spec 6.2). The cells are
// in reading order, so on desktop (three columns, step 3 spans two) the rows
// are: step, image, step / image, wide step / step, step, image. Two columns
// on tablets, one on phones.
export function ProcessGrid() {
  const [one, two, three, four, five] = site.process;
  const [imageA, imageB, imageC] = site.images.process;

  return (
    <Section>
      <SectionHeader title="How I work">{site.copy.process}</SectionHeader>
      <Reveal
        as="ul"
        stagger
        className="mt-10 grid gap-5 tablet:auto-rows-[380px] tablet:grid-cols-2 desktop:grid-cols-3"
      >
        <RevealItem as="li">
          <StepCard number={1} tone="dark" {...one} />
        </RevealItem>
        <RevealItem as="li">
          <ImageCell image={imageA} />
        </RevealItem>
        <RevealItem as="li">
          <StepCard number={2} tone="accent" {...two} />
        </RevealItem>
        <RevealItem as="li">
          <ImageCell image={imageB} />
        </RevealItem>
        <RevealItem as="li" className="desktop:col-span-2">
          <StepCard number={3} tone="surface" {...three} />
        </RevealItem>
        <RevealItem as="li">
          <StepCard number={4} tone="accent" {...four} />
        </RevealItem>
        <RevealItem as="li">
          <StepCard number={5} tone="dark" {...five} />
        </RevealItem>
        <RevealItem as="li">
          <ImageCell image={imageC} />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
