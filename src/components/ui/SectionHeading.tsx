import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  /** Use "h1" for the main heading of a page. */
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="text-accent-2 font-mono text-sm tracking-widest uppercase">
        {kicker}
      </p>
      <Heading className="font-heading text-foreground text-3xl font-bold tracking-tight md:text-5xl">
        {title}
      </Heading>
    </div>
  );
}
