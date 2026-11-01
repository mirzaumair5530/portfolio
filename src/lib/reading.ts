import GithubSlugger from "github-slugger";

const WORDS_PER_MINUTE = 200;

export type TocItem = {
  /** Matches the `id` that rehype-slug puts on the rendered heading. */
  id: string;
  title: string;
  /** 2 for `##`, 3 for `###`. */
  depth: 2 | 3;
};

/** Whole minutes, never below 1. Code blocks are left out of the count. */
export function getReadingTime(content: string): number {
  const words = stripCodeBlocks(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Table of contents from `##` and `###` headings, in document order. */
export function getToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  for (const match of stripCodeBlocks(content).matchAll(
    /^(#{2,3})\s+(.+?)\s*#*\s*$/gm,
  )) {
    const title = match[2].replace(/[`*_]|\[([^\]]*)\]\([^)]*\)/g, "$1");
    // The slugger runs on every heading so duplicate titles get -1, -2 ids
    // exactly as rehype-slug assigns them.
    items.push({
      id: slugger.slug(title),
      title,
      depth: match[1].length as 2 | 3,
    });
  }
  return items;
}

function stripCodeBlocks(content: string) {
  return content.replace(/^(```|~~~)[\s\S]*?^\1.*$/gm, "");
}
