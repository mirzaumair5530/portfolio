"use client";

import { homeSections } from "@/data/sections";
import { cn } from "@/lib/cn";
import { useScrollStore } from "@/store/scrollStore";

// Side rail: one dot per home section and a line that fills with scroll.
export function ProgressRail() {
  const progress = useScrollStore((state) => state.progress);
  const activeSection = useScrollStore((state) => state.activeSection);

  return (
    <nav
      aria-label="Page sections"
      className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:block print:hidden"
    >
      <div className="relative">
        <span
          aria-hidden="true"
          className="bg-border absolute top-1 bottom-1 left-1/2 w-px -translate-x-1/2"
        />
        <span
          aria-hidden="true"
          className="bg-accent absolute top-1 bottom-1 left-1/2 w-px origin-top -translate-x-1/2"
          style={{ transform: `translateX(-50%) scaleY(${progress})` }}
        />
        <ul className="relative flex flex-col gap-5">
          {homeSections.map(({ id, label }) => {
            const active = id === activeSection;
            return (
              <li key={id} className="flex justify-center">
                <a
                  href={`#${id}`}
                  aria-label={label}
                  aria-current={active ? "true" : undefined}
                  className="group flex size-4 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block rounded-full transition-all",
                      active
                        ? "bg-accent size-3"
                        : "bg-muted/60 group-hover:bg-foreground size-2",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
