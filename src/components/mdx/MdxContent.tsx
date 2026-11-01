import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlock } from "@/components/mdx/CodeBlock";

// Both themes are emitted as CSS variables; globals.css picks one from the
// root `data-theme`.
const prettyCodeOptions: Options = {
  theme: { dark: "github-dark", light: "github-light" },
  keepBackground: false,
};

const components = {
  pre: CodeBlock,
  Callout,
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      {...props}
      className="font-heading text-foreground mt-12 mb-4 scroll-mt-28 text-2xl font-bold md:text-3xl"
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      {...props}
      className="font-heading text-foreground mt-8 mb-3 scroll-mt-28 text-xl font-bold"
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p {...props} className="text-muted my-4 leading-8" />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a {...props} className="text-accent-text underline underline-offset-4" />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul {...props} className="text-muted my-4 list-disc space-y-2 pl-6" />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol {...props} className="text-muted my-4 list-decimal space-y-2 pl-6" />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code {...props} className="font-mono text-[0.9em]" />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
