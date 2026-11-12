import { BlogCard } from "@/components/cards/BlogCard";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/data/site";
import { getPosts } from "@/lib/mdx";

/** The two newest posts and a link to the rest. */
export function BlogPreview() {
  const posts = getPosts().slice(0, 2);
  if (posts.length === 0) return null;

  return (
    <Section>
      <SectionHeader title="Notes on building">{site.copy.blog}</SectionHeader>
      <Reveal as="ul" stagger className="mt-10 grid gap-10 tablet:grid-cols-2">
        {posts.map(({ slug, frontmatter }) => (
          <RevealItem as="li" key={slug}>
            <BlogCard post={{ slug, frontmatter }} />
          </RevealItem>
        ))}
      </Reveal>
      <div className="mt-10 flex justify-center">
        <Button href="/blogs">Browse all posts</Button>
      </div>
    </Section>
  );
}
