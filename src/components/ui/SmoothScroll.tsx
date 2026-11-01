"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis, startSmoothScroll } from "@/lib/scroll";

// Smooth scroll runs only while the visitor allows motion, and follows the
// setting if it changes while the page is open.
export function SmoothScroll() {
  const pathname = usePathname();

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

  // New route: Lenis keeps its own scroll position, so reset it with the page,
  // then let ScrollTrigger re-measure once the new page has mounted.
  useEffect(() => {
    if (!window.location.hash) getLenis()?.scrollTo(0, { immediate: true });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
