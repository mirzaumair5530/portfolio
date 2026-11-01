import { cn } from "@/lib/cn";

type ContainerProps = {
  id?: string;
  as?: "div" | "section";
  className?: string;
  children: React.ReactNode;
};

export function Container({
  id,
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn("mx-auto w-full max-w-6xl px-4 md:px-8", className)}
    >
      {children}
    </Tag>
  );
}
