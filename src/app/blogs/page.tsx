import type { Metadata } from "next";
import { BlogCard } from "@/components/cards/BlogCard";
import { PinnedPostCard } from "@/components/cards/PinnedPostCard";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/mdx";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Short write-ups on React, Node.js, MongoDB and the things Umair Farooq learns while shipping.",
  path: "/blogs",
});

export default function BlogsPage() {
  const posts = getPosts().map(({ slug, frontmatter }) => ({
    slug,
    frontmatter,
  }));
  // The post marked `pinned` gets the large card; the newest one otherwise.
  const pinned = posts.find((post) => post.frontmatter.pinned) ?? posts[0];
  const rest = posts.filter((post) => post !== pinned);

  return (
    <>
      <Container className="page-top">
        <SectionHeader as="h1" title="Notes on building">
          {site.copy.blog}
        </SectionHeader>
        {pinned ? (
          <div className="mt-10 tablet:mt-20">
            <PinnedPostCard post={pinned} />
          </div>
        ) : (
          <p className="type-body-l mt-10">No posts yet.</p>
        )}
      </Container>

      <Section className="pt-16!">
        <Reveal
          as="ul"
          stagger
          className="grid gap-x-10 gap-y-16 tablet:grid-cols-2"
        >
          {rest.map((post) => (
            <RevealItem as="li" key={post.slug}>
              <BlogCard post={post} />
            </RevealItem>
          ))}
        </Reveal>
        <p className="mt-16 text-center">
          <a
            href="/rss.xml"
            className="text-accent underline underline-offset-4"
          >
            Subscribe to the RSS feed
          </a>
        </p>
      </Section>
    </>
  );
}
