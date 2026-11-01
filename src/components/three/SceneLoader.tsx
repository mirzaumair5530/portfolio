"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SceneBoundary } from "@/components/three/SceneBoundary";
import { canRunScene, prefersReducedMotion } from "@/lib/capabilities";

// ssr: false keeps three.js out of the server render; the chunk is only
// requested once the component below decides to mount it.
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

export function SceneLoader() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Wait until the first paint is done so 3D never competes with the text.
  useEffect(() => {
    // Reduced motion, weak devices and missing WebGL keep the static crystal.
    if (!canRunScene()) return;

    // Turning reduced motion on later removes the scene again.
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => query.matches && setReady(false);
    query.addEventListener("change", onChange);

    const start = () => setReady(!prefersReducedMotion());
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => {
        window.cancelIdleCallback(id);
        query.removeEventListener("change", onChange);
      };
    }
    const id = setTimeout(start, 500);
    return () => {
      clearTimeout(id);
      query.removeEventListener("change", onChange);
    };
  }, []);

  if (!ready || failed) return null;
  return (
    <SceneBoundary onError={() => setFailed(true)}>
      <Scene onFail={() => setFailed(true)} />
    </SceneBoundary>
  );
}
