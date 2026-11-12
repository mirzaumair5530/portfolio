import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

// Accent circle that overlaps the bottom-left corner of an avatar card and
// alternates between a waving hand and "Hi". With reduced motion only the
// hand shows.
export function WaveBadge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-accent text-on-accent absolute -bottom-6 -left-6 flex size-[88px] items-center justify-center rounded-full tablet:-left-10 tablet:size-[110px]",
        className,
      )}
    >
      <span className="animate-badge-swap absolute flex">
        <Icon name="hand" className="animate-wave size-10 origin-[70%_90%]" />
      </span>
      <span className="animate-badge-swap absolute text-[40px] leading-none [animation-delay:-2.5s] motion-reduce:hidden">
        Hi
      </span>
    </span>
  );
}
