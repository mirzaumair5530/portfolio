"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PIN =
  "(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)";
const SMALL = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";
const SHORT =
  "(min-width: 1024px) and (max-height: 799px) and (prefers-reduced-motion: no-preference)";

// On large screens the whole projects section pins while the cards scale up in
// turn. Elsewhere the cards just scale in once. With reduced motion nothing
// here runs, so the static grid is the final layout.
export function ProjectsScroll({ children }: { children: React.ReactNode }) {
  const list = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const cards = Array.from(list.current?.children ?? []);
      const section = list.current?.closest("section");
      const mm = gsap.matchMedia();

      mm.add(
        {
          pin: PIN,
          small: SMALL,
          short: SHORT,
        },
        (context) => {
          if (context.conditions?.pin && section) {
            gsap.fromTo(
              cards,
              { scale: 0.85, opacity: 0.3 },
              {
                scale: 1,
                opacity: 1,
                ease: "power3.out",
                stagger: 0.25,
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: "+=70%",
                  pin: true,
                  scrub: true,
                },
              },
            );
          } else if (context.conditions?.small || context.conditions?.short) {
            gsap.from(cards, {
              scale: 0.92,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: list.current,
                start: "top 85%",
                once: true,
              },
            });
          }
        },
      );
    },
    { scope: list },
  );

  return (
    <ul ref={list} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  );
}
