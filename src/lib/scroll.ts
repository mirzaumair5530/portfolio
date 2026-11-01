import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/**
 * Starts Lenis smooth scroll on GSAP's ticker, so Lenis and ScrollTrigger
 * share one clock. Returns a cleanup function.
 */
export function startSmoothScroll() {
  const instance = new Lenis({ autoRaf: false, anchors: true });
  lenis = instance;

  instance.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}
