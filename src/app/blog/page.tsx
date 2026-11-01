import type { Metadata } from "next";
import { BlogList } from "@/components/sections/BlogList";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPosts } from "@/lib/mdx";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  // Only what the list needs crosses to the client; MDX bodies stay here.
  const posts = getPosts().map(({ slug, frontmatter, readingTime }) => ({
    slug,
    frontmatter,
    readingTime,
  }));

  return (
    <Container>
      <SectionHeading as="h1" kicker="Blog" title="Notes on building." />
      <p className="text-muted mt-6 mb-10 max-w-xl leading-8">
        Short write-ups on React, Node.js, MongoDB and the things I learn while
        shipping.
      </p>
      <BlogList posts={posts} />
    </Container>
  );
}
