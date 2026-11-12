import { PanelImage } from "@/components/home/PanelImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { site } from "@/data/site";

// Content in the left half; the pinned card sits in the right half.
export function AboutPanel() {
  return (
    <Container as="section" className="flex min-h-screen items-center py-20">
      <div className="flex w-full flex-col gap-10 tablet:w-1/2 tablet:pr-10">
        <PanelImage
          image={site.images.portrait}
          label="Portrait photo"
          className="self-center"
        />
        <SectionHeader title="About me">{site.copy.about}</SectionHeader>

        <Reveal as="ul" stagger className="grid grid-cols-3 gap-5">
          {site.stats.map((stat) => (
            <RevealItem
              as="li"
              key={stat.label}
              className="flex flex-col gap-2"
            >
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="type-number text-accent"
              />
              <span className="type-body-l font-semibold!">{stat.label}</span>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="grid gap-6 sm:grid-cols-2">
          <p className="flex flex-col gap-1">
            <span className="font-semibold">Call Today :</span>
            <PhoneLink />
          </p>
          <p className="flex flex-col gap-1">
            <span className="font-semibold">Email :</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </Reveal>

        <SocialLinks />

        <div>
          <Button href="/about">My story</Button>
        </div>
      </div>
    </Container>
  );
}
