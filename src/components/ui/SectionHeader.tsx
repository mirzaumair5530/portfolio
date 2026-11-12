import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  title: string;
  /** The paragraph under the title. */
  children?: React.ReactNode;
  /** "h1" for the main heading of a page: larger, and shown without a reveal. */
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({
  title,
  children,
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  const content = (
    <>
      <Heading className={Heading === "h1" ? "type-display" : "type-h2"}>
        {title}
      </Heading>
      {children ? (
        <p className="type-body-l max-w-[460px]">{children}</p>
      ) : null}
    </>
  );
  const classes = cn("flex flex-col gap-4", className);

  // The page heading is above the fold; hiding it until scripts run would
  // delay the largest paint.
  if (Heading === "h1") return <div className={classes}>{content}</div>;
  return <Reveal className={classes}>{content}</Reveal>;
}
