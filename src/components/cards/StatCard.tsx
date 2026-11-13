import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/cn";

/** A sentence on top, a counted number and its label at the bottom. */
export function StatCard({
  tone,
  text,
  value,
  suffix,
  label,
}: {
  tone: "dark" | "accent";
  text: string;
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card flex h-full min-h-[239px] flex-col justify-between gap-6 p-10",
        tone === "dark"
          ? "bg-contrast text-on-contrast"
          : "bg-accent text-on-accent",
      )}
    >
      <p className="type-small">{text}</p>
      <p className="flex flex-col gap-2">
        <Counter value={value} suffix={suffix} className="type-number" />
        <span className="type-body-l font-semibold!">{label}</span>
      </p>
    </div>
  );
}
