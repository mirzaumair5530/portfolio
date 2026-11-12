const WORDS_PER_MINUTE = 200;

/** Whole minutes, never below 1. Code blocks are left out of the count. */
export function getReadingTime(content: string): number {
  const words = stripCodeBlocks(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function stripCodeBlocks(content: string) {
  return content.replace(/^(```|~~~)[\s\S]*?^\1.*$/gm, "");
}
