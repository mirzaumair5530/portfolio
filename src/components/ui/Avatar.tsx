import Image from "next/image";
import type { SiteImage } from "@/data/site";
import { cn } from "@/lib/cn";

/** Round photo. Until an image is set it shows the initials on the accent. */
export function Avatar({
  image,
  name,
  size = 40,
  className,
}: {
  image: SiteImage;
  /** Used for the initials. */
  name: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return (
    <span
      style={{ width: size, height: size }}
      className={cn(
        "bg-accent text-on-accent relative flex shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold",
        className,
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}
