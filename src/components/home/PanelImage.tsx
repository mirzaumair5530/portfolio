import { AvatarCard } from "@/components/ui/AvatarCard";
import type { SiteImage } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * The static image of a pinned-scene panel, for phones and for reduced motion.
 * From the tablet width up, with motion allowed, the pinned card replaces it:
 * `keepSpace` then leaves an invisible gap of the same size (the hero needs
 * it to sit around the card), otherwise the image is removed.
 */
export function PanelImage({
  image,
  label,
  wave = false,
  keepSpace = false,
  className,
}: {
  image: SiteImage;
  label: string;
  wave?: boolean;
  keepSpace?: boolean;
  className?: string;
}) {
  return (
    <AvatarCard
      image={image}
      label={label}
      wave={wave}
      className={cn(
        keepSpace
          ? "tablet:motion-safe:invisible"
          : "tablet:motion-safe:hidden",
        className,
      )}
    />
  );
}
