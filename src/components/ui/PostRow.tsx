import Link from "next/link";
import type { Post } from "@/lib/mdx";

export function PostRow({
  post,
  showDescription = false,
}: {
  post: Pick<Post, "slug" | "frontmatter" | "readingTime">;
  showDescription?: boolean;
}) {
  const { slug, frontmatter: fm, readingTime } = post;

  return (
    <li className="border-border/50 group relative grid gap-2 border-b py-6 md:grid-cols-[8rem_1fr_auto] md:items-center md:gap-6">
      <time dateTime={fm.date} className="text-muted font-mono text-xs">
        {fm.date}
      </time>
      <div>
        <h3 className="font-heading text-foreground group-hover:text-accent-text text-xl font-bold transition-colors">
          <Link href={`/blog/${slug}`} className="after:absolute after:inset-0">
            {fm.title}
          </Link>
        </h3>
        {showDescription && (
          <p className="text-muted mt-1 text-sm">{fm.description}</p>
        )}
      </div>
      <p className="text-muted font-mono text-xs">
        {fm.tags[0] && `${fm.tags[0]} · `}
        {readingTime} min read
      </p>
    </li>
  );
}
