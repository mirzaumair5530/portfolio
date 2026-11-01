import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { CopyLinkButton } from "@/components/ui/CopyLinkButton";
import { Cover } from "@/components/ui/Cover";
import { PrevNext } from "@/components/ui/PrevNext";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { Tag } from "@/components/ui/Tag";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { getPost, getPosts } from "@/lib/mdx";
import { getToc } from "@/lib/reading";

const shareClass =
  "border-border text-foreground rounded-full border px-4 py-2 text-sm";

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.frontmatter.date,
    tags: post.frontmatter.tags,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  // Newest first, so the next index is the older post.
  const posts = getPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) notFound();

  const { frontmatter: fm, content, readingTime } = posts[index];
  const toLink = (post?: (typeof posts)[number]) =>
    post && { href: `/blog/${post.slug}`, title: post.frontmatter.title };

  const url = encodeURIComponent(`${site.url}/blog/${slug}`);
  const text = encodeURIComponent(fm.title);

  const postUrl = `${site.url}/blog/${slug}`;

  return (
    <Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: fm.title,
          description: fm.description,
          datePublished: fm.date,
          dateModified: fm.date,
          url: postUrl,
          mainEntityOfPage: postUrl,
          image: `${postUrl}/opengraph-image`,
          keywords: fm.tags.join(", "),
          author: { "@type": "Person", name: site.name, url: site.url },
        }}
      />
      <Link href="/blog" className="text-muted text-sm">
        ← All posts
      </Link>
      <p className="text-accent-2 mt-6 font-mono text-xs">
        <time dateTime={fm.date}>{fm.date}</time> · {readingTime} min read
      </p>
      <h1 className="font-heading text-foreground mt-3 text-3xl font-bold tracking-tight md:text-5xl">
        {fm.title}
      </h1>
      <p className="text-muted mt-6 max-w-2xl text-lg leading-8">
        {fm.description}
      </p>
      {fm.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {fm.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      )}
      <Cover src={fm.cover} label="Cover image" className="mt-10" />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_16rem]">
        <div className="min-w-0 lg:order-first">
          <article className="max-w-3xl">
            <MdxContent source={content} />
          </article>
          <div className="border-border/50 mt-12 flex flex-wrap items-center gap-3 border-t pt-6">
            <span className="text-muted text-sm">Share</span>
            <a
              className={shareClass}
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className={shareClass}
              href={`https://x.com/intent/post?url=${url}&text=${text}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <CopyLinkButton className={`${shareClass} cursor-pointer`} />
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <TableOfContents items={getToc(content)} />
        </aside>
      </div>

      <PrevNext
        label="post"
        prev={toLink(posts[index + 1])}
        next={toLink(posts[index - 1])}
      />
    </Container>
  );
}
