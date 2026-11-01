"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FilterPills } from "@/components/ui/FilterPills";
import { PostRow } from "@/components/ui/PostRow";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import type { Post } from "@/lib/mdx";

type PostSummary = Pick<Post, "slug" | "frontmatter" | "readingTime">;

const PAGE_SIZE = 5;

export function BlogList({ posts }: { posts: PostSummary[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const tags = [
    ...new Set(posts.flatMap((post) => post.frontmatter.tags)),
  ].sort();
  const needle = query.trim().toLowerCase();
  const matches = posts.filter(
    (post) =>
      (!tag || post.frontmatter.tags.includes(tag)) &&
      post.frontmatter.title.toLowerCase().includes(needle),
  );

  // The newest match is featured; the rest are listed and paginated.
  const [featured, ...rest] = matches;
  const pageCount = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const listed = rest.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="md:flex-1">
          <label htmlFor="blog-search" className="sr-only">
            Search posts by title
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search posts by title"
            className="border-border bg-surface/40 text-foreground placeholder:text-muted w-full rounded-full border px-5 py-3 text-sm"
          />
        </div>
        <FilterPills
          label="Filter by tag"
          options={tags}
          value={tag}
          onChange={(next) => {
            setTag(next);
            setPage(1);
          }}
        />
      </div>

      {featured ? (
        <article className="glass rounded-card relative mt-8 grid overflow-hidden md:grid-cols-2">
          <div className="relative flex aspect-video items-center justify-center bg-[#12306a] font-mono text-xs text-[#9cc2ff] md:aspect-auto">
            {featured.frontmatter.cover ? (
              <Image
                src={featured.frontmatter.cover}
                alt={featured.frontmatter.coverAlt ?? ""}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              "[Cover image]"
            )}
          </div>
          <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
            <p className="text-accent-2 font-mono text-xs uppercase">
              Latest · {featured.frontmatter.date} · {featured.readingTime} min
              read
            </p>
            <h2 className="font-heading text-foreground text-2xl font-bold md:text-3xl">
              <Link
                href={`/blog/${featured.slug}`}
                className="after:absolute after:inset-0"
              >
                {featured.frontmatter.title}
              </Link>
            </h2>
            <p className="text-muted">{featured.frontmatter.description}</p>
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {featured.frontmatter.tags.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ) : (
        <p className="text-muted mt-10">No posts match your search.</p>
      )}

      {listed.length > 0 && (
        <ul className="mt-8">
          {listed.map((post) => (
            <PostRow key={post.slug} post={post} showDescription />
          ))}
        </ul>
      )}

      {pageCount > 1 && (
        <nav aria-label="Pagination" className="mt-8">
          <ul className="flex gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => setPage(n)}
                  aria-label={`Page ${n}`}
                  aria-current={n === current ? "page" : undefined}
                  className={cn(
                    "size-10 cursor-pointer rounded-xl border text-sm",
                    n === current
                      ? "border-accent bg-accent text-accent-contrast"
                      : "border-border text-foreground",
                  )}
                >
                  {n}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <p className="sr-only" role="status">
        {matches.length} {matches.length === 1 ? "post" : "posts"} found
      </p>
    </>
  );
}
