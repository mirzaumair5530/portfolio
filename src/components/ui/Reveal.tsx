"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealProps = {
  as?: "div" | "ul" | "ol" | "section";
  /** Reveal the direct children one after another instead of the element. */
  stagger?: boolean;
  className?: string;
  children: React.ReactNode;
};

// Fade and lift into place once when scrolled into view. Hidden state lives in
// CSS (globals.css) so there is no flash, and it only applies when motion is
// allowed, so reduced-motion visitors see the final layout.
export function Reveal({
  as: Tag = "div",
  stagger = false,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const targets = stagger ? Array.from(element.children) : element;

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          targets,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: stagger ? 0.08 : 0,
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
            onComplete: () => {
              element.dataset.revealed = "true";
              gsap.set(targets, { clearProps: "transform,opacity" });
            },
          },
        );
      });
    },
    { scope: ref },
  );

  const marker = stagger
    ? { "data-reveal-stagger": "" }
    : { "data-reveal": "" };

  return (
    <Tag
      // The tags are all HTMLElements; one ref type serves them.
      ref={ref as React.RefObject<never>}
      className={className}
      {...marker}
    >
      {children}
    </Tag>
  );
}
