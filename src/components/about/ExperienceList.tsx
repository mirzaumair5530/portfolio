import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { resume } from "@/data/resume";
import { site } from "@/data/site";
import { formatPeriod } from "@/lib/format";

/** One row per role in `resume.ts`: role left, company and years right. */
export function ExperienceList() {
  return (
    <>
      <SectionHeader title="My journey so far">
        {site.copy.experience}
      </SectionHeader>
      <Reveal as="ol" stagger>
        {resume.experience.map((job) => (
          <RevealItem
            as="li"
            key={`${job.company}-${job.start}`}
            className="border-border flex items-center justify-between gap-6 border-b py-5"
          >
            <h3 className="type-h3">{job.role}</h3>
            <p className="flex flex-col items-end text-right">
              <span className="text-accent font-semibold">{job.company}</span>
              <span className="type-small text-muted">
                {formatPeriod(job.start, job.end)}
              </span>
            </p>
          </RevealItem>
        ))}
      </Reveal>
    </>
  );
}
