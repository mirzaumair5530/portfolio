import { cn } from "@/lib/cn";

type CardProps = {
  /** "accent" is for featured cards. */
  variant?: "default" | "accent";
  as?: "div" | "article" | "li";
  /** Brighten and lift on hover. Only for cards that are a link or button. */
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Card({
  variant = "default",
  as: Tag = "div",
  interactive = false,
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "glass rounded-card p-6 md:p-8",
        variant === "accent" && "glass-accent",
        interactive && "glass-interactive",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
