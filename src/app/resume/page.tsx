import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Container } from "@/components/ui/Container";
import { resume } from "@/data/resume";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { formatDate, formatPeriod } from "@/lib/format";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: resume.summary,
  path: "/resume",
});

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border break-inside-avoid border-t py-10">
      <h2 className="type-h3 mb-6">{title}</h2>
      {children}
    </section>
  );
}

// Not in the clone spec: kept from the first build and restyled. It prints as
// a plain document (the nav, footer and overlays are hidden in print).
export default function ResumePage() {
  return (
    <Container className="page-top pb-20 tablet:pb-[120px]">
      <div className="mx-auto max-w-[1000px]">
        <header className="flex flex-wrap items-end justify-between gap-8 pb-10">
          <div>
            <h1 className="type-display print:text-[40px]">{resume.name}</h1>
            <p className="type-h3 mt-2">{resume.headline}</p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              {resume.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
            <p className="type-small text-muted mt-3">
              Last updated{" "}
              <time dateTime={resume.updatedAt}>
                {formatDate(resume.updatedAt)}
              </time>
            </p>
          </div>
          <Button href={site.resumePdf} download className="print:hidden">
            Download PDF
          </Button>
        </header>

        <ResumeSection title="Summary">
          <p className="type-body-l">{resume.summary}</p>
        </ResumeSection>

        <ResumeSection title="Experience">
          <ol className="flex flex-col gap-10">
            {resume.experience.map((job) => (
              <li
                key={`${job.company}-${job.start}`}
                className="grid gap-2 tablet:grid-cols-[11rem_1fr] tablet:gap-6"
              >
                <p className="type-small text-muted">
                  {formatPeriod(job.start, job.end)}
                </p>
                <div>
                  <h3 className="font-semibold">
                    {job.role} ·{" "}
                    <span className="text-accent">{job.company}</span>
                  </h3>
                  {job.location && (
                    <p className="type-small text-muted">{job.location}</p>
                  )}
                  <p className="mt-3">{job.summary}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5">
                    {job.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
                    {job.stack.map((item) => (
                      <li key={item}>
                        <CategoryBadge>{item}</CategoryBadge>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </ResumeSection>

        <ResumeSection title="Skills">
          <dl className="grid gap-6 sm:grid-cols-2 desktop:grid-cols-3">
            {resume.skills.map((group) => (
              <div key={group.group}>
                <dt className="font-semibold">{group.group}</dt>
                <dd className="mt-1">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection title="Education">
          <ul className="flex flex-col gap-4">
            {resume.education.map((entry) => (
              <li
                key={`${entry.school}-${entry.start}`}
                className="grid gap-1 tablet:grid-cols-[11rem_1fr] tablet:gap-6"
              >
                <p className="type-small text-muted">
                  {formatPeriod(entry.start, entry.end)}
                </p>
                <div>
                  <p className="font-semibold">{entry.degree}</p>
                  <p>{entry.school}</p>
                </div>
              </li>
            ))}
          </ul>
        </ResumeSection>
      </div>
    </Container>
  );
}
