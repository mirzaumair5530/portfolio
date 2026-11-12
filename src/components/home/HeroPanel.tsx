import { PanelImage } from "@/components/home/PanelImage";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

// One screen tall. On desktop the two role words sit either side of the card;
// below that they stack above and below it. The columns may shrink below the
// words, which then overflow away from the card. The words are decorative copies:
// the real heading is the visually hidden <h1>.
export function HeroPanel() {
  const [firstWord, secondWord] = site.role;

  return (
    <Container
      as="section"
      className="flex min-h-screen items-center justify-center py-24"
    >
      <h1 className="sr-only">
        {site.name}, {firstWord} {secondWord}
      </h1>
      <div className="flex flex-col items-center gap-5 desktop:grid desktop:w-full desktop:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="motion-safe:animate-enter-left relative desktop:justify-self-end">
          <p className="type-h3 max-desktop:text-center desktop:absolute desktop:bottom-full desktop:left-0 desktop:whitespace-nowrap">
            {site.name}
          </p>
          <p aria-hidden="true" className="type-display whitespace-nowrap">
            {firstWord}
          </p>
        </div>

        <PanelImage
          image={site.images.portrait}
          label="Portrait photo"
          wave
          keepSpace
        />

        <div className="motion-safe:animate-enter-right relative desktop:justify-self-start">
          <p aria-hidden="true" className="type-display whitespace-nowrap">
            {secondWord}
          </p>
          <p className="type-body-l max-desktop:mt-2 max-desktop:max-w-[320px] max-desktop:text-center desktop:absolute desktop:top-full desktop:right-0 desktop:w-[300px] desktop:text-right">
            {site.tagline}
          </p>
        </div>
      </div>
    </Container>
  );
}
