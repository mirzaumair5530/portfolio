"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useScrollStore } from "@/store/scrollStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Feeds page scroll progress into the store. It reads ScrollTrigger rather
// than Lenis, so it also works when smooth scroll is off.
export function ScrollSync() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const { setProgress } = useScrollStore.getState();
      setProgress(0);
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => setProgress(self.progress),
      });
    },
    // The page height changes per route, so rebuild on navigation.
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
