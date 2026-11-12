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
      className={cn(
        "mx-auto w-full max-w-[1200px] px-5 tablet:px-[30px] desktop:px-10",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
