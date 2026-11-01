"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Crystal } from "@/components/three/Crystal";
import { Rig } from "@/components/three/Rig";

// One fixed canvas behind the page.
export default function Scene({ onFail }: { onFail: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [tabVisible, setTabVisible] = useState(true);
  const [onScreen, setOnScreen] = useState(true);

  // Render only while the tab is visible and the canvas is on screen.
  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );
    if (wrapper.current) observer.observe(wrapper.current);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  // While the scene is live, the static crystal in the hero fades out.
  useEffect(() => {
    document.documentElement.dataset.scene = "on";
    return () => {
      delete document.documentElement.dataset.scene;
    };
  }, []);

  return (
    <div
      ref={wrapper}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[9] print:hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        // Cap the pixel ratio: retina phones would otherwise draw 9x pixels.
        dpr={[1, 1.5]}
        frameloop={tabVisible && onScreen ? "always" : "never"}
        gl={{ alpha: true, powerPreference: "low-power" }}
        onCreated={({ gl }) =>
          gl.domElement.addEventListener("webglcontextlost", onFail)
        }
      >
        <Rig>
          <Crystal />
        </Rig>
      </Canvas>
    </div>
  );
}
