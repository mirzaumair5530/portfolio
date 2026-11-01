import { ContactForm } from "@/components/sections/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export function Contact() {
  return (
    <Container
      as="section"
      id="contact"
      className="grid scroll-mt-28 gap-12 py-24 md:grid-cols-2"
    >
      <Reveal stagger className="flex flex-col gap-6">
        <SectionHeading kicker="06 — Contact" title="Let’s build something." />
        <p className="text-muted max-w-sm leading-8">
          Have a project, a role or a question? Send a message and I’ll reply
          soon.
        </p>
        <ul className="text-foreground space-y-3 text-sm">
          <li>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <a href={site.links.github}>GitHub · [username]</a>
          </li>
          <li>
            <a href={site.links.linkedin}>LinkedIn · [username]</a>
          </li>
        </ul>
      </Reveal>

      <Reveal>
        <Card>
          <ContactForm />
        </Card>
      </Reveal>
    </Container>
  );
}
