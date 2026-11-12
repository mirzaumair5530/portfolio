import Link from "next/link";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Media } from "@/components/ui/Media";
import type { ProjectSummary } from "@/lib/mdx";

/** Image, category, title, summary. The whole card is one link. */
export function ProjectCard({ project }: { project: ProjectSummary }) {
  const { slug, frontmatter: fm } = project;
  return (
    <article>
      <Link
        href={`/projects/${slug}`}
        data-cursor="card"
        className="group flex flex-col gap-5"
      >
        <div className="rounded-card relative aspect-[540/400] overflow-hidden">
          <Media
            image={{ src: fm.cover, alt: fm.coverAlt }}
            label="Project cover"
            sizes="(min-width: 810px) 540px, 100vw"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div>
          <CategoryBadge>{fm.category}</CategoryBadge>
        </div>
        <h3 className="type-h3">{fm.title}</h3>
        <p className="type-small">{fm.summary}</p>
      </Link>
    </article>
  );
}
