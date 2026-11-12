import { cn } from "@/lib/cn";

/** Pill label. Filled on image cards, outlined everywhere else. */
export function CategoryBadge({
  filled = false,
  className,
  children,
}: {
  filled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "type-small border-accent inline-flex items-center rounded-full border px-[15px] py-[3px]",
        filled ? "bg-accent text-on-accent" : "text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
