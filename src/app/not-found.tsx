import type { Metadata } from "next";
import { AvatarCard } from "@/components/ui/AvatarCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Page not found" };

// Laid out like the hero: "404" and "Oops!" either side of an image card, with
// the way home overlapping the card's lower edge. The big words are
// decorative; the real heading is the visually hidden <h1>.
export default function NotFound() {
  return (
    <Container
      as="section"
      className="flex min-h-screen flex-col items-center justify-center gap-16 py-32"
    >
      <h1 className="sr-only">Page not found (404)</h1>
      <div className="flex flex-col items-center gap-5 desktop:grid desktop:w-full desktop:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <p
          aria-hidden="true"
          className="type-display motion-safe:animate-enter-left desktop:justify-self-end"
        >
          404
        </p>
        <div className="relative max-desktop:mb-6">
          <AvatarCard image={site.images.notFound} label="404 image" />
          <Button
            href="/"
            variant="accent"
            className="absolute -bottom-6 left-1/2 -translate-x-1/2"
          >
            Back home
          </Button>
        </div>
        <p
          aria-hidden="true"
          className="type-display motion-safe:animate-enter-right desktop:justify-self-start"
        >
          Oops!
        </p>
      </div>
      <p className="type-body-l text-muted text-center">
        This page does not exist, or it has moved.
      </p>
    </Container>
  );
}
