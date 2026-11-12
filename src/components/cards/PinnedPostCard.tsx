import Link from "next/link";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Media } from "@/components/ui/Media";
import { formatDate } from "@/lib/format";
import type { PostSummary } from "@/lib/mdx";

/** The large card at the top of /blogs for the pinned post. */
export function PinnedPostCard({ post }: { post: PostSummary }) {
  const { slug, frontmatter: fm } = post;
  return (
    <article>
      <Link
        href={`/blogs/${slug}`}
        data-cursor="card"
        className="group flex flex-col gap-5"
      >
        <div className="rounded-card relative aspect-[4/3] overflow-hidden tablet:aspect-[1120/500]">
          <Media
            image={{ src: fm.cover, alt: fm.coverAlt }}
            label="Post cover"
            sizes="(min-width: 1200px) 1120px, 100vw"
            priority
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <span className="type-h4 bg-accent text-on-accent absolute top-5 left-5 rounded-full px-5 py-1">
            Featured
          </span>
        </div>
        <div className="flex items-center gap-4">
          <CategoryBadge>{fm.category}</CategoryBadge>
          <time dateTime={fm.date} className="type-small text-muted">
            {formatDate(fm.date)}
          </time>
        </div>
        <h2 className="type-h3">{fm.title}</h2>
        <p className="type-small">{fm.description}</p>
      </Link>
    </article>
  );
}
