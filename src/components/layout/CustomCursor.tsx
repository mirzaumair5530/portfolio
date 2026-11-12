"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useMediaQuery } from "@/lib/use-media-query";

const SIZE = 60;
const DOT_SCALE = 16 / SIZE;
const SPRING = { stiffness: 500, damping: 40, mass: 0.5 };

// A 16 px accent dot that follows the pointer and grows to 60 px with an arrow
// over anything marked `data-cursor="card"`. Off on touch devices and for
// visitors who ask for reduced motion. The native cursor stays visible.
export function CustomCursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const [overCard, setOverCard] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    function onMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);
      const target = event.target instanceof Element ? event.target : null;
      setOverCard(Boolean(target?.closest('[data-cursor="card"]')));
    }
    function onLeave() {
      opacity.set(0);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y, opacity]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY, opacity }}
      className="pointer-events-none fixed top-0 left-0 z-[100] print:hidden"
    >
      {/* Scaled, not resized, so only the transform animates. */}
      <motion.div
        initial={false}
        animate={{ scale: overCard ? 1 : DOT_SCALE }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ width: SIZE, height: SIZE, margin: -SIZE / 2 }}
        className="bg-accent text-on-accent flex items-center justify-center rounded-full"
      >
        <motion.span
          initial={false}
          animate={{ opacity: overCard ? 1 : 0 }}
          className="flex"
        >
          <Icon name="arrow-up-right" className="size-6" />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
