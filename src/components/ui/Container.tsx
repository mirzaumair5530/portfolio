import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: "div" | "section";
  className?: string;
  children: React.ReactNode;
};

export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-4 md:px-8", className)}>
      {children}
    </Tag>
  );
}
