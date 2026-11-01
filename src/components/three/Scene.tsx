"use client";

import { Canvas } from "@react-three/fiber";
import { Crystal } from "@/components/three/Crystal";

// One fixed canvas behind the page. The camera and objects are added in the
// next tasks; this is the shell they live in.
export default function Scene() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[9] print:hidden"
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true }}>
        <Crystal />
      </Canvas>
    </div>
  );
}
