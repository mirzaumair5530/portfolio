"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Counts from 0 to `value` once, when it scrolls into view. The server renders
 * the final number, so it is right without scripts and with reduced motion.
 */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  /** "+" or "%". */
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reducedMotion) return;

    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reducedMotion, value, suffix]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {`${value}${suffix}`}
    </span>
  );
}
