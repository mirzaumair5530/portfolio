import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/MdxContent";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPost, getPosts } from "@/lib/mdx";

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post?.frontmatter.title };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Container>
      <SectionHeading as="h1" kicker="Post" title={post.frontmatter.title} />
      <article className="mt-8 max-w-3xl">
        <MdxContent source={post.content} />
      </article>
    </Container>
  );
}
