import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/mdx";
import { cn } from "@/lib/cn";

// Tints for projects that have no cover image yet.
const placeholderTints = [
  "bg-[#12306a]",
  "bg-[#1d3556]",
  "bg-[#1b3f84]",
  "bg-[#1a2444]",
];

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Pick<Project, "slug" | "frontmatter">;
  index?: number;
}) {
  const { slug, frontmatter: fm } = project;

  return (
    <article
      className={cn(
        "glass glass-interactive rounded-card group relative flex flex-col overflow-hidden",
        fm.featured && "glass-accent",
      )}
    >
      <div
        className={cn(
          "relative aspect-video",
          placeholderTints[index % placeholderTints.length],
        )}
      >
        {fm.cover ? (
          <Image
            src={fm.cover}
            alt={fm.coverAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="text-[#9cc2ff] absolute inset-0 flex items-center justify-center font-mono text-xs">
            [Project cover]
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-accent-2 font-mono text-xs tracking-wider uppercase">
          {fm.featured && "Featured · "}
          {fm.period.slice(0, 4)}
        </p>
        <h3 className="font-heading text-foreground text-xl font-bold">
          <Link
            href={`/projects/${slug}`}
            className="after:absolute after:inset-0"
          >
            {fm.title}
          </Link>
        </h3>
        <p className="text-muted text-sm leading-6">{fm.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-1" aria-label="Stack">
          {fm.stack.slice(0, 4).map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
