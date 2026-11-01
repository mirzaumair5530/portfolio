"use client";

import { useEffect } from "react";
import { startSmoothScroll } from "@/lib/scroll";

// Smooth scroll runs only while the visitor allows motion, and follows the
// setting if it changes while the page is open.
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop: (() => void) | undefined;

    function sync() {
      if (query.matches) {
        stop?.();
        stop = undefined;
      } else if (!stop) {
        stop = startSmoothScroll();
      }
    }

    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      stop?.();
    };
  }, []);

  return null;
}
