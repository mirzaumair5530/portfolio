import { cn } from "@/lib/cn";

const tones = {
  dark: "bg-contrast text-on-contrast",
  accent: "bg-accent text-on-accent",
  surface: "bg-surface text-foreground",
};

/** A process step: the number on top, the title and text at the bottom. */
export function StepCard({
  number,
  title,
  description,
  tone,
}: {
  number: number;
  title: string;
  description: string;
  tone: keyof typeof tones;
}) {
  return (
    <div
      className={cn(
        "rounded-card flex h-full min-h-[280px] flex-col justify-between gap-10 p-10",
        tones[tone],
      )}
    >
      <p className="type-number">{`${String(number).padStart(2, "0")}.`}</p>
      <div className="flex flex-col gap-3">
        <h3 className="type-h3">{title}</h3>
        <p className="type-small max-w-[420px]">{description}</p>
      </div>
    </div>
  );
}
