"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { avatarCardSize } from "@/components/ui/AvatarCard";
import { Media } from "@/components/ui/Media";
import { WaveBadge } from "@/components/ui/WaveBadge";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const CARD_SIZES = "(min-width: 1200px) 340px, 300px";

/**
 * Wraps the Hero, Services and About panels (each one screen tall) and keeps
 * one photo card on screen while they scroll past (clone spec 5.1). Over the
 * first half of the scroll the card slides to the right column, tilts and
 * flips to its back face; over the second half it flips to the front again.
 *
 * The pinned layer exists from the tablet width up and only when motion is
 * allowed. Otherwise each panel shows its own static image (`PanelImage`).
 */
export function PinnedScene({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const travel = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  // Ends on the centre of the right column: a quarter of the viewport, capped
  // at a quarter of the 1120 px content width.
  const x = useMotionTemplate`calc(${travel} * min(25vw, 280px))`;
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.5], [0, 6]);

  return (
    <div ref={ref} className="relative">
      {/* Sticky for the whole wrapper; the negative margin lets the panels
          start at the top instead of below this layer. */}
      <div className="pointer-events-none sticky top-0 z-10 -mb-[100vh] hidden h-screen items-center justify-center [perspective:1200px] tablet:motion-safe:flex">
        <div className="motion-safe:animate-enter-scale">
          <motion.div
            style={{ x, rotateY, rotateZ, transformStyle: "preserve-3d" }}
            className={cn("relative", avatarCardSize)}
          >
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <div className="rounded-card relative size-full overflow-hidden">
                <Media
                  image={site.images.portrait}
                  label="Portrait photo"
                  sizes={CARD_SIZES}
                  priority
                />
              </div>
              <WaveBadge />
            </div>
            <div className="rounded-card absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Media
                image={site.images.workspace}
                label="Workspace photo"
                sizes={CARD_SIZES}
              />
            </div>
          </motion.div>
        </div>
      </div>
      {children}
    </div>
  );
}
