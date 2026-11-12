import Image from "next/image";
import { cn } from "@/lib/cn";

type MediaProps = {
  /** `null` or no `src` shows the labelled placeholder. */
  image?: { src?: string; alt?: string } | null;
  /** Names the missing image, for example "Portrait photo". */
  label: string;
  /** Passed to next/image; describe the rendered width. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * An image that fills its parent, which must be positioned and sized (use an
 * aspect ratio so nothing shifts while it loads). Until the image exists a
 * labelled block stands in.
 */
export function Media({
  image,
  label,
  sizes,
  priority = false,
  className,
}: MediaProps) {
  if (image?.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt ?? ""}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <span
      className={cn(
        "bg-surface text-muted type-small absolute inset-0 flex items-center justify-center p-4 text-center",
        className,
      )}
    >
      [{label}]
    </span>
  );
}
