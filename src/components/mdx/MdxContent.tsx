import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { Figure } from "@/components/mdx/Figure";
import { FigureRow } from "@/components/mdx/FigureRow";

// Both themes are emitted as CSS variables; globals.css picks one from the
// root `data-theme`.
const prettyCodeOptions: Options = {
  theme: { dark: "github-dark", light: "github-light" },
  keepBackground: false,
};

const shared = {
  pre: CodeBlock,
  Callout,
  Figure,
  FigureRow,
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 {...props} className="type-h4 mt-10 mb-3 scroll-mt-28" />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p {...props} className="type-body-l my-4" />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a {...props} className="text-accent underline underline-offset-4" />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul {...props} className="type-body-l my-4 list-disc space-y-2 pl-6" />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol {...props} className="type-body-l my-4 list-decimal space-y-2 pl-6" />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code {...props} className="font-mono text-[0.9em]" />
  ),
};

const h2Class = "type-h3 mt-16 mb-5 scroll-mt-28 first:mt-0";

const components = {
  post: {
    ...shared,
    h2: (props: React.ComponentProps<"h2">) => (
      <h2 {...props} className={h2Class} />
    ),
  },
  // Project sections read "Problem :", "Solution :" as in the design.
  project: {
    ...shared,
    h2: (props: React.ComponentProps<"h2">) => (
      <h2 {...props} className={`${h2Class} after:content-['_:']`} />
    ),
  },
};

// Compiling MDX reads the clock internally, which Cache Components rejects
// during prerender. Caching by source keeps it at build time.
export async function MdxContent({
  source,
  variant = "post",
}: {
  source: string;
  variant?: keyof typeof components;
}) {
  "use cache";
  return (
    <MDXRemote
      source={source}
      components={components[variant]}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
