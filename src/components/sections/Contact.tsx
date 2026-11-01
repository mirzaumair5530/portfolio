import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

const fieldClass =
  "border-border bg-background/40 text-foreground placeholder:text-muted w-full rounded-xl border px-4 py-3 text-sm";

// Layout only: the form is wired to /api/contact in M6.
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
          <form className="flex flex-col gap-5" aria-label="Contact form">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="text-muted text-xs">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="text-muted text-xs">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-muted text-xs">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className={fieldClass}
              />
            </div>
            <Button type="submit" disabled className="w-full">
              Send message
            </Button>
            <p className="text-muted text-center text-xs">
              Sending is switched on in a later milestone.
            </p>
          </form>
        </Card>
      </Reveal>
    </Container>
  );
}
