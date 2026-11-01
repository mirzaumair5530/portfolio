import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { resume } from "@/data/resume";
import { formatPeriod } from "@/lib/format";

export function Experience() {
  return (
    <Container as="section" id="experience" className="scroll-mt-28 py-24">
      <SectionHeading
        kicker="02 — Experience"
        title="Where I’ve worked."
        reveal
      />
      <ol className="border-accent/40 mt-12 ml-2 space-y-6 border-l-2 pl-6 md:pl-10">
        {resume.experience.map((job, index) => (
          <li key={`${job.company}-${job.start}`} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-8 -left-[2.1rem] size-3 rounded-full md:-left-[3.1rem] ${index === 0 ? "bg-accent" : "bg-surface border-accent/60 border"}`}
            />
            <Card className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-heading text-foreground text-xl font-bold">
                  {job.role} · {job.company}
                </h3>
                <p className="text-muted font-mono text-xs">
                  {formatPeriod(job.start, job.end)}
                </p>
              </div>
              <p className="text-muted">{job.summary}</p>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {job.stack.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ol>
    </Container>
  );
}
