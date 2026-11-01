import { cn } from "@/lib/cn";

type TagProps = {
  className?: string;
  children: React.ReactNode;
};

export function Tag({ className, children }: TagProps) {
  return (
    <span
      className={cn(
        "glass text-muted inline-flex items-center rounded-full px-3 py-1 font-mono text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
