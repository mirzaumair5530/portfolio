import { PanelImage } from "@/components/home/PanelImage";
import { ServicesAccordion } from "@/components/home/ServicesAccordion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

// Content in the left half; the pinned card sits in the right half.
export function ServicesPanel() {
  return (
    <Container as="section" className="flex min-h-screen items-center py-20">
      <div className="flex w-full flex-col gap-10 tablet:w-1/2 tablet:pr-10">
        <PanelImage
          image={site.images.workspace}
          label="Workspace photo"
          className="self-center"
        />
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
