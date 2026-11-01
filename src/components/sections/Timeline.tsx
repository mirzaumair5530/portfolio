"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// The line is fully drawn in CSS, so the static layout is the final state.
// With motion allowed it is redrawn from the top as the list scrolls past,
// and each role slides in from the left.
export function Timeline({ children }: { children: React.ReactNode }) {
  const list = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );

        for (const role of Array.from(list.current?.children ?? [])) {
          if (role === line.current) continue;
          gsap.from(role, {
            x: -40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: role, start: "top 85%", once: true },
          });
        }
      });
    },
    { scope: list },
  );

  return (
    <ol ref={list} className="relative mt-12 ml-2 space-y-6 pl-6 md:pl-10">
      <span
        aria-hidden="true"
        className="bg-accent/20 absolute top-0 left-0 h-full w-0.5"
      />
      <span
        ref={line}
        aria-hidden="true"
        className="bg-accent absolute top-0 left-0 h-full w-0.5 origin-top"
      />
      {children}
    </ol>
  );
}
