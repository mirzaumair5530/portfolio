import { StatCard } from "@/components/cards/StatCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

// Three columns by two rows: two quotes and the dark stat, then the accent
// stat and two more quotes.
export function Testimonials() {
  const [first, second, third, fourth] = site.testimonials;
  const [darkStat, accentStat] = site.highlights;

  return (
    <Section>
      <SectionHeader title="What my clients say">
        {site.copy.testimonials}
      </SectionHeader>
      <Reveal
        as="ul"
        stagger
        className="mt-10 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3"
      >
        <RevealItem as="li">
          <TestimonialCard {...first} />
        </RevealItem>
        <RevealItem as="li">
          <TestimonialCard {...second} />
        </RevealItem>
        <RevealItem as="li">
          <StatCard tone="dark" {...darkStat} />
        </RevealItem>
        <RevealItem as="li">
          <StatCard tone="accent" {...accentStat} />
        </RevealItem>
        <RevealItem as="li">
          <TestimonialCard {...third} />
        </RevealItem>
        <RevealItem as="li">
          <TestimonialCard {...fourth} />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
