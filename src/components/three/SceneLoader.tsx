"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// ssr: false keeps three.js out of the server render; the chunk is only
// requested once the component below decides to mount it.
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

export function SceneLoader() {
  const [ready, setReady] = useState(false);

  // Wait until the first paint is done so 3D never competes with the text.
  useEffect(() => {
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 500);
    return () => clearTimeout(id);
  }, []);

  return ready ? <Scene /> : null;
}
