import Link from "next/link";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Media } from "@/components/ui/Media";
import { formatDate } from "@/lib/format";
import type { PostSummary } from "@/lib/mdx";

/** Image, category and date, title, description. The whole card is one link. */
export function BlogCard({ post }: { post: PostSummary }) {
  const { slug, frontmatter: fm } = post;
  return (
    <article>
      <Link
        href={`/blogs/${slug}`}
        data-cursor="card"
        className="group flex flex-col gap-5"
      >
        <div className="rounded-card relative aspect-[540/320] overflow-hidden">
          <Media
            image={{ src: fm.cover, alt: fm.coverAlt }}
            label="Post cover"
            sizes="(min-width: 810px) 540px, 100vw"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex items-center gap-4">
          <CategoryBadge>{fm.category}</CategoryBadge>
          <time dateTime={fm.date} className="type-small text-muted">
            {formatDate(fm.date)}
          </time>
        </div>
        <h3 className="type-h3">{fm.title}</h3>
        <p className="type-small">{fm.description}</p>
      </Link>
    </article>
  );
}
