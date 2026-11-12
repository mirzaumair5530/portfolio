"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { StackCard } from "@/components/cards/StackCard";
import type { ProjectSummary } from "@/lib/mdx";

/**
 * Project cards that pin under the nav and stack on top of each other (clone
 * spec 5.2). The list's bottom padding equals the gap, so its height is a
 * whole number of card-plus-gap steps and every card owns 1 / n of the scroll
 * progress. The list itself is not sticky, so its measurements stay stable.
 */
export function StackingProjects({ projects }: { projects: ProjectSummary[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80px", "end 80px"],
  });

  return (
    <ol ref={ref} className="flex flex-col gap-[120px] pb-[120px]">
      {projects.map((project, index) => (
        <StackCard
          key={project.slug}
          project={project}
          index={index}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </ol>
  );
}
