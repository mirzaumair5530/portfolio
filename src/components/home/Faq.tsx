import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

// On desktop the heading column stays put while the questions scroll.
export function Faq() {
  return (
    <Section className="grid gap-10 desktop:grid-cols-[440px_600px] desktop:justify-between">
      <SectionHeader
        title="Frequently asked questions"
        className="desktop:sticky desktop:top-[100px] desktop:self-start"
      >
        {site.copy.faq}
      </SectionHeader>
      <Reveal>
        <Accordion
          items={site.faqs.map((faq) => ({
            title: faq.q,
            content: <p>{faq.a}</p>,
          }))}
        />
      </Reveal>
    </Section>
  );
}
