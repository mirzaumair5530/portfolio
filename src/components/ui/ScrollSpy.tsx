"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeSections } from "@/data/sections";
import { useScrollStore } from "@/store/scrollStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Writes the home section nearest the middle of the screen into the store.
// Render it after the sections so their positions (including pin spacing) are
// known when the triggers are created.
export function ScrollSpy() {
  useGSAP(() => {
    const { setActiveSection } = useScrollStore.getState();

    for (const { id } of homeSections) {
      const element = document.getElementById(id);
      if (!element) continue;
      ScrollTrigger.create({
        trigger: element,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) setActiveSection(id);
        },
      });
    }

    return () => setActiveSection(null);
  });

  return null;
}
