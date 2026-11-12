"use client";

import { useEffect, useRef, useState } from "react";
import { AvatarCard, avatarCardSize } from "@/components/ui/AvatarCard";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import type { SiteImage } from "@/data/site";
import { cn } from "@/lib/cn";

export type Scene = {
  id: string;
  image: SiteImage;
  /** Placeholder label while there is no image. */
  label: string;
  content: React.ReactNode;
};

/**
 * Two columns on desktop (clone spec 6.1): the sections scroll on the left
 * while one image card stays centred on the right and cross-fades to the image
 * of the section that is crossing the middle of the screen. Below the desktop
 * width the columns stack and each section shows its own image.
 */
export function SplitScene({ scenes }: { scenes: Scene[] }) {
  const [active, setActive] = useState(0);
  const sections = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // A zero-height band across the middle of the viewport: exactly one
    // section intersects it at a time.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const section of sections.current) {
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <Container className="desktop:grid desktop:grid-cols-2">
      <div>
        {scenes.map((scene, index) => (
          <section
            key={scene.id}
            ref={(node) => {
              sections.current[index] = node;
            }}
            data-index={index}
            className="flex flex-col justify-center gap-10 py-20 first:pt-[140px] desktop:min-h-screen"
          >
            <AvatarCard
              image={scene.image}
              label={scene.label}
              priority={index === 0}
              className="self-center desktop:hidden"
            />
            {scene.content}
          </section>
        ))}
      </div>

      <div className="sticky top-0 hidden h-screen items-center justify-center self-start desktop:flex">
        <div className={cn("relative", avatarCardSize)}>
          {scenes.map((scene, index) => (
            <div
              key={scene.id}
              aria-hidden={index !== active}
              className={cn(
                "rounded-card absolute inset-0 overflow-hidden transition-opacity duration-500",
                index === active ? "opacity-100" : "opacity-0",
              )}
            >
              <Media
                image={scene.image}
                label={scene.label}
                sizes="340px"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
