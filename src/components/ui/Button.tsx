import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * - `outline`: accent border and label; fills with the accent on hover.
 * - `dark`: the contrast pill (dark grey in light, white in dark) ("Load more", "Subscribe").
 * - `accent`: filled accent pill ("Back home").
 */
type Variant = "outline" | "dark" | "accent";

type ButtonProps = {
  variant?: Variant;
  className?: string;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href">)
  | ({ href?: undefined } & React.ComponentProps<"button">)
);

const base =
  "type-h4 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 whitespace-nowrap transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  outline:
    "border-accent text-accent hover:bg-accent hover:text-on-accent border",
  dark: "bg-contrast text-on-contrast hover:bg-accent hover:text-on-accent",
  accent: "bg-accent text-on-accent hover:bg-contrast hover:text-on-contrast",
};

export function Button({
  variant = "outline",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    return <Link {...props} className={classes} />;
  }
  return <button type="button" {...props} className={classes} />;
}
