import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";

type ButtonProps = {
  variant?: Variant;
  className?: string;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href">)
  | ({ href?: undefined } & React.ComponentProps<"button">)
);

const base =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-100 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Accent fill with a white sheen on the top half and a bright inset edge.
  primary:
    "bg-accent text-accent-contrast bg-[linear-gradient(180deg,rgb(255_255_255/0.35)_0%,rgb(255_255_255/0)_55%)] shadow-[inset_0_1.5px_0_rgb(255_255_255/0.6)]",
  outline: "glass text-foreground",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    return <Link {...props} className={classes} />;
  }
  return <button type="button" {...props} className={classes} />;
}
