import { Media } from "@/components/ui/Media";
import { WaveBadge } from "@/components/ui/WaveBadge";
import type { SiteImage } from "@/data/site";
import { cn } from "@/lib/cn";

/** Card width at each breakpoint; the height follows the 340 : 476 ratio. */
export const avatarCardSize =
  "w-[260px] tablet:w-[300px] desktop:w-[340px] aspect-[340/476]";

export function AvatarCard({
  image,
  label,
  wave = false,
  priority = false,
  className,
}: {
  image: SiteImage;
  /** Placeholder label while there is no image. */
  label: string;
  wave?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative shrink-0", avatarCardSize, className)}>
      <div className="rounded-card relative size-full overflow-hidden">
        <Media
          image={image}
          label={label}
          sizes="(min-width: 1200px) 340px, (min-width: 810px) 300px, 260px"
          priority={priority}
        />
      </div>
      {wave ? <WaveBadge /> : null}
    </div>
  );
}
