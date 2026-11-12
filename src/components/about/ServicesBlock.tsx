import { ServicesAccordion } from "@/components/home/ServicesAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

export function ServicesBlock() {
  return (
    <>
      <SectionHeader title="What I can do for you">
        {site.copy.services}
      </SectionHeader>
      <Reveal>
        <ServicesAccordion />
      </Reveal>
    </>
  );
}
