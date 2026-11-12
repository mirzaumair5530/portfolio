import Lenis from "lenis";

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/**
 * Starts Lenis smooth scroll on its own animation frame loop. `anchors` makes
 * in-page links such as `/#contact` scroll through Lenis. Motion's `useScroll`
 * reads the native scroll position, which Lenis drives, so nothing else needs
 * wiring. Returns a cleanup function.
 */
export function startSmoothScroll() {
  const instance = new Lenis({ autoRaf: true, anchors: true });
  lenis = instance;

  return () => {
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}
