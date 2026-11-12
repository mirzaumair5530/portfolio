import { ContactForm } from "@/components/home/ContactForm";
import { AvatarCard } from "@/components/ui/AvatarCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

// Shared by the home and About pages. The nav's Contact button scrolls here.
export function Contact() {
  return (
    <Section
      id="contact"
      className="grid items-center gap-16 desktop:grid-cols-2 desktop:gap-0"
    >
      <Reveal className="flex justify-center">
        <AvatarCard image={site.images.portrait} label="Portrait photo" wave />
      </Reveal>
      <div>
        <SectionHeader title="Let’s work together">
          {site.copy.contact}
        </SectionHeader>
        <Reveal className="mt-10">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
