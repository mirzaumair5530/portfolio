import Link from "next/link";

type Item = { href: string; title: string } | undefined;

export function PrevNext({
  prev,
  next,
  label,
}: {
  prev: Item;
  next: Item;
  /** "project" or "post", used in the link text. */
  label: string;
}) {
  return (
    <nav
      aria-label={`More ${label}s`}
      className="border-border/50 mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="glass rounded-card flex flex-col gap-1 p-5"
        >
          <span className="text-muted font-mono text-xs">
            ← Previous {label}
          </span>
          <span className="font-heading text-foreground font-bold">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          className="glass rounded-card flex flex-col gap-1 p-5 sm:items-end sm:text-right"
        >
          <span className="text-muted font-mono text-xs">Next {label} →</span>
          <span className="font-heading text-foreground font-bold">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
