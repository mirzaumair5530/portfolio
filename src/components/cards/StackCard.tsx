"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Media } from "@/components/ui/Media";
import type { ProjectSummary } from "@/lib/mdx";

/**
 * One card of the stack. It sticks below the nav; while the next card slides
 * over it, it shrinks from 1 to 0.8 around its top edge. `progress` is the
 * scroll progress of the whole list, where each card owns one equal slice.
 */
export function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: ProjectSummary;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reducedMotion = useReducedMotion();
  const shrink = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [1, 0.8],
  );
  // Nothing covers the last card, so it keeps its size.
  const isLast = index === total - 1;
  const { slug, frontmatter: fm } = project;

  return (
    <motion.li
      style={{ scale: isLast || reducedMotion ? 1 : shrink }}
      className="sticky top-[70px] origin-top tablet:top-20"
    >
      <Link
        href={`/projects/${slug}`}
        data-cursor="card"
        className="rounded-card relative block aspect-[4/5] max-h-[calc(100svh-100px)] w-full overflow-hidden tablet:aspect-[4/3] desktop:aspect-[3/2]"
      >
        <Media
          image={{ src: fm.cover, alt: fm.coverAlt }}
          label=""
          sizes="(min-width: 1200px) 1120px, 100vw"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(rgb(12_12_13/0.45),rgb(12_12_13/0.8))]"
        />
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-white">
          <CategoryBadge filled>{fm.category}</CategoryBadge>
          <span role="heading" aria-level={3} className="type-h2">
            {fm.title}
          </span>
          <span className="type-small max-w-[560px]">{fm.summary}</span>
        </span>
      </Link>
    </motion.li>
  );
}
