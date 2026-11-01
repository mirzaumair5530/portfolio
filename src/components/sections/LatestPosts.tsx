import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PostRow } from "@/components/ui/PostRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPosts } from "@/lib/mdx";

export function LatestPosts() {
  const posts = getPosts().slice(0, 3);

  return (
    <Container as="section" id="blog" className="scroll-mt-28 py-24">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading kicker="05 — Writing" title="Latest posts." />
        <Link href="/blog" className="text-accent-text shrink-0 text-sm">
          All posts →
        </Link>
      </div>
      <ul className="border-border/50 mt-8 border-t">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </ul>
    </Container>
  );
}
