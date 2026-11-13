import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SubscribeBanner } from "@/components/blog/SubscribeBanner";
import { BlogCard } from "@/components/cards/BlogCard";
import { MdxContent } from "@/components/mdx/MdxContent";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { LoadMoreGrid } from "@/components/ui/LoadMoreGrid";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { TitleRule } from "@/components/ui/TitleRule";
import { site } from "@/data/site";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { getPost, getPosts } from "@/lib/mdx";

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blogs/${slug}`,
    type: "article",
    publishedTime: post.frontmatter.date,
    tags: post.frontmatter.tags,
  });
}

// `params` is read inside <Suspense>, not in the page itself, so a navigation
// to a post that was not prerendered can show the shell at once instead of
// blocking (Next.js "instant navigation" validation).
export default function PostPage({ params }: PageProps<"/blogs/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({
  params,
}: Pick<PageProps<"/blogs/[slug]">, "params">) {
  const { slug } = await params;
  const posts = getPosts();
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) notFound();

  const { frontmatter: fm, content, readingTime } = post;
  const others = posts.filter((entry) => entry.slug !== slug);
  const postUrl = `${site.url}/blogs/${slug}`;

  return (
    <>
      <Container className="page-top">
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
            articleSection: fm.category,
            keywords: fm.tags.join(", "),
            author: { "@type": "Person", name: site.name, url: site.url },
          }}
        />
        {/* The content column is narrower than the main container. */}
        <div className="mx-auto max-w-[1000px]">
          <h1 className="type-display text-balance">{fm.title}</h1>
          <p className="type-body-l mt-5 max-w-[640px]">{fm.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <CategoryBadge>{fm.category}</CategoryBadge>
            <p className="type-small text-muted">
              <time dateTime={fm.date}>{formatDate(fm.date)}</time> ·{" "}
              {readingTime} min read
            </p>
          </div>

          <div className="rounded-card relative mt-10 aspect-[16/9] overflow-hidden tablet:mt-16">
            <Media
              image={{ src: fm.cover, alt: fm.coverAlt }}
              label="Post cover"
              sizes="(min-width: 1080px) 1000px, 100vw"
              priority
            />
          </div>

          <article className="mt-10 tablet:mt-16">
            <MdxContent source={content} />
          </article>

          <SubscribeBanner />
        </div>
      </Container>

      {others.length > 0 && (
        <Section>
          <TitleRule title="More to discover" />
          <LoadMoreGrid initial={2} className="mt-10">
            {others.map(({ slug: otherSlug, frontmatter }) => (
              <BlogCard
                key={otherSlug}
                post={{ slug: otherSlug, frontmatter }}
              />
            ))}
          </LoadMoreGrid>
        </Section>
      )}
    </>
  );
}
