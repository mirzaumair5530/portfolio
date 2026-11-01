import { cn } from "@/lib/cn";

type CardProps = {
  /** "accent" is for featured cards. */
  variant?: "default" | "accent";
  as?: "div" | "article" | "li";
  className?: string;
  children: React.ReactNode;
};

export function Card({
  variant = "default",
  as: Tag = "div",
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "glass rounded-card p-6 md:p-8",
        variant === "accent" && "glass-accent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
