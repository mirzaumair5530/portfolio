"use client";

import { cn } from "@/lib/cn";

type FilterPillsProps = {
  label: string;
  options: string[];
  /** The selected option, or null for "All". */
  value: string | null;
  onChange: (value: string | null) => void;
};

export function FilterPills({
  label,
  options,
  value,
  onChange,
}: FilterPillsProps) {
  const pill = (text: string, selected: boolean, next: string | null) => (
    <li key={text}>
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => onChange(next)}
        className={cn(
          "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
          selected
            ? "border-accent bg-accent/15 text-foreground"
            : "border-border text-muted hover:text-foreground",
        )}
      >
        {text}
      </button>
    </li>
  );

  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {pill("All", value === null, null)}
      {options.map((option) => pill(option, value === option, option))}
    </ul>
  );
}
