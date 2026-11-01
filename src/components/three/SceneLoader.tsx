"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SceneBoundary } from "@/components/three/SceneBoundary";
import { canRunScene, prefersReducedMotion } from "@/lib/capabilities";

// ssr: false keeps three.js out of the server render; the chunk is only
// requested once the component below decides to mount it.
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

// Text-heavy pages get no scene, so reading and printing stay clean.
function sceneAllowed(pathname: string) {
  return pathname !== "/resume" && !pathname.startsWith("/blog/");
}

export function SceneLoader() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // The static crystal already fills the hero, so 3D is not needed for first
  // paint. Start it on the first sign of a visitor (scroll, touch, pointer or
  // key), or after a quiet 7 seconds. This keeps the main thread free while
  // the page loads, which is what the performance score measures.
  useEffect(() => {
    // Reduced motion, weak devices and missing WebGL keep the static crystal.
    if (!canRunScene()) return;

    // Turning reduced motion on later removes the scene again.
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => query.matches && setReady(false);
    query.addEventListener("change", onChange);

    const events = [
      "pointermove",
      "pointerdown",
      "wheel",
      "scroll",
      "keydown",
      "touchstart",
    ];

    function stop() {
      for (const name of events) window.removeEventListener(name, start);
      clearTimeout(timer);
    }
    function start() {
      stop();
      setReady(!prefersReducedMotion());
    }

    const timer = setTimeout(start, 7000);
    for (const name of events) {
      window.addEventListener(name, start, { passive: true, once: true });
    }

    return () => {
      stop();
      query.removeEventListener("change", onChange);
    };
  }, []);

  if (!ready || failed || !sceneAllowed(pathname)) return null;
  return (
    <SceneBoundary onError={() => setFailed(true)}>
      <Scene onFail={() => setFailed(true)} />
    </SceneBoundary>
  );
}
