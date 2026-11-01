import type { TocItem } from "@/lib/reading";
import { cn } from "@/lib/cn";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="glass rounded-3xl p-5">
      <p className="text-muted font-mono text-xs tracking-widest uppercase">
        On this page
      </p>
      <ol className="mt-3 flex flex-col gap-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={cn(item.depth === 3 && "pl-4")}>
            <a
              href={`#${item.id}`}
              className="text-muted hover:text-foreground transition-colors"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
