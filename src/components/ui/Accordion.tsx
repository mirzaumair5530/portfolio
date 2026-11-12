"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type AccordionItem = { title: string; content: React.ReactNode };

/**
 * Numbered rows; one open at a time. The open row's title and bottom border
 * turn accent. Panels stay in the DOM while closed (`inert`, height 0), so
 * their text is still in the HTML.
 */
export function Accordion({
  items,
  size = "md",
  defaultOpen = 0,
  className,
}: {
  items: AccordionItem[];
  /** "lg" for the services list, "md" for the FAQ. */
  size?: "md" | "lg";
  /** Index of the row that starts open, or null for none. */
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reducedMotion = useReducedMotion();
  const id = useId();

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${id}-button-${index}`;
        const panelId = `${id}-panel-${index}`;
        return (
          <div
            key={item.title}
            className={cn(
              "border-b transition-colors duration-300",
              isOpen ? "border-accent" : "border-border",
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-[15px] text-left"
              >
                <span
                  className={cn(
                    size === "lg" ? "type-h3" : "type-h4",
                    "transition-colors duration-300",
                    isOpen && "text-accent",
                  )}
                >
                  {index + 1}. {item.title}
                </span>
                <Icon
                  name="chevron-down"
                  className={cn(
                    "size-6 transition-transform duration-300",
                    isOpen && "text-accent rotate-180",
                  )}
                />
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-accordion-panel=""
              inert={!isOpen}
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >
              <div className="pb-5">{item.content}</div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
