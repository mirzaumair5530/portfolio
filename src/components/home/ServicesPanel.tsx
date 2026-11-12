import { PanelImage } from "@/components/home/PanelImage";
import { ServicesAccordion } from "@/components/home/ServicesAccordion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

// Content in the left half; the pinned card sits in the right half. With
// reduced motion the static image takes the right half instead.
export function ServicesPanel() {
  return (
    <Container
      as="section"
      className="flex min-h-screen flex-col justify-center gap-10 py-20 tablet:grid tablet:grid-cols-2 tablet:items-center tablet:gap-0"
    >
      <PanelImage
        image={site.images.workspace}
        label="Workspace photo"
        className="self-center tablet:order-last tablet:justify-self-center"
      />
      <div className="flex flex-col gap-10 tablet:pr-10">
        <SectionHeader title="What I can do for you">
          {site.copy.services}
        </SectionHeader>
        <Reveal>
          <ServicesAccordion />
        </Reveal>
      </div>
    </Container>
  );
}
