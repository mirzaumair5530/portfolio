import Image from "next/image";
import { cn } from "@/lib/cn";

// Large cover for detail pages; a labelled block stands in until one is set.
export function Cover({
  src,
  alt = "",
  label,
  className,
}: {
  src?: string;
  /** Describes the image; the content schema requires it when a cover is set. */
  alt?: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card relative aspect-video overflow-hidden bg-[#12306a]",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="object-cover"
        />
      ) : (
        <span className="text-[#9cc2ff] absolute inset-0 flex items-center justify-center font-mono text-xs">
          [{label}]
        </span>
      )}
    </div>
  );
}
