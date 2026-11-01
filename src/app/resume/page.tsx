import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { resume } from "@/data/resume";
import { site } from "@/data/site";
import { formatPeriod } from "@/lib/format";

export const metadata: Metadata = { title: "Resume" };

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border/50 border-t py-8 break-inside-avoid">
      <h2 className="text-accent-2 mb-5 font-mono text-xs tracking-widest uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ResumePage() {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          <header className="pb-8">
            <p className="text-accent-2 font-mono text-xs tracking-widest uppercase">
              Resume
            </p>
            <h1 className="font-heading text-foreground mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              {resume.name}
            </h1>
            <p className="text-muted mt-2 text-lg">{resume.headline}</p>
            <p className="text-muted mt-1 font-mono text-xs">
              Last updated{" "}
              <time dateTime={resume.updatedAt}>{resume.updatedAt}</time>
            </p>
            <ul className="text-foreground mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              {resume.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
          </header>

          <Section title="Summary">
            <p className="text-foreground leading-8">{resume.summary}</p>
          </Section>

          <Section title="Experience">
            <ol className="flex flex-col gap-8">
              {resume.experience.map((job) => (
                <li
                  key={`${job.company}-${job.start}`}
                  className="grid gap-2 md:grid-cols-[9rem_1fr] md:gap-6"
                >
                  <p className="text-muted font-mono text-xs">
                    {formatPeriod(job.start, job.end)}
                  </p>
                  <div>
                    <h3 className="font-heading text-foreground text-lg font-bold">
                      {job.role} · {job.company}
                    </h3>
                    {job.location && (
                      <p className="text-muted text-sm">{job.location}</p>
                    )}
                    <p className="text-muted mt-2 text-sm">{job.summary}</p>
                    <ul className="text-foreground mt-3 list-disc space-y-1 pl-5 text-sm">
                      {job.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <ul
                      className="mt-3 flex flex-wrap gap-2"
                      aria-label="Stack"
                    >
                      {job.stack.map((item) => (
                        <li key={item}>
                          <Tag>{item}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Skills">
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resume.skills.map((group) => (
                <div key={group.group}>
                  <dt className="text-foreground text-sm font-semibold">
                    {group.group}
                  </dt>
                  <dd className="text-muted mt-1 text-sm">
                    {group.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Education">
            <ul className="flex flex-col gap-4">
              {resume.education.map((entry) => (
                <li
                  key={`${entry.school}-${entry.start}`}
                  className="grid gap-1 md:grid-cols-[9rem_1fr] md:gap-6"
                >
                  <p className="text-muted font-mono text-xs">
                    {formatPeriod(entry.start, entry.end)}
                  </p>
                  <div>
                    <p className="font-heading text-foreground font-bold">
                      {entry.degree}
                    </p>
                    <p className="text-muted text-sm">{entry.school}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="md:sticky md:top-28 md:self-start print:hidden">
          <Button href={site.resumePdf} download>
            Download PDF ↓
          </Button>
        </div>
      </div>
    </Container>
  );
}
