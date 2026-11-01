"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { rigState } from "@/components/three/rigState";
import { useScrollStore } from "@/store/scrollStore";

type Pose = {
  /** Horizontal offset as a fraction of the visible width (desktop). */
  x: number;
  y: number;
  scale: number;
  dim: number;
  mix?: number;
};

// One pose per home section (SPEC: 3D and scroll effects). "other" is used on
// routes without a home section, where the crystal stays a quiet backdrop.
const poses: Record<string, Pose> = {
  hero: { x: 0.26, y: 0, scale: 1, dim: 1 },
  about: { x: -0.28, y: 0.1, scale: 0.8, dim: 0.9 },
  experience: { x: 0.3, y: -0.1, scale: 0.7, dim: 0.6 },
  skills: { x: 0, y: 0.3, scale: 0.55, dim: 0.35 },
  projects: { x: -0.3, y: 0, scale: 0.7, dim: 0.6, mix: 1 },
  blog: { x: 0.3, y: 0, scale: 0.55, dim: 0.35 },
  contact: { x: 0, y: -0.1, scale: 0.9, dim: 0.7 },
  other: { x: 0.3, y: 0, scale: 0.8, dim: 0.35 },
};

// Lower is slower and softer. Poses take about two seconds to settle.
const SMOOTHING = 1.4;
// Radians of spin over the whole page, and per second at rest.
const SCROLL_SPIN = Math.PI * 1.5;
const IDLE_SPIN = 0.07;
// Forward lean that shows both the top and bottom faces, as in the design.
const BASE_TILT = 0.2;
// Starting turn: 45 degrees shows two top and two bottom faces, as in the design.
const START_YAW = Math.PI / 4;

// Mouse parallax only makes sense with a real pointer and room to move.
const PARALLAX_QUERY =
  "(hover: hover) and (pointer: fine) and (min-width: 1024px)";

// Moves the camera and the crystal from the scroll store: the section sets the
// target pose, progress drives the camera drift and the spin.
export function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  // Pointer position in -1..1 (target) and its smoothed value (current).
  const pointer = useRef({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    enabled: false,
  });

  useEffect(() => {
    const query = window.matchMedia(PARALLAX_QUERY);
    const state = pointer.current;
    state.enabled = query.matches;

    function onChange() {
      state.enabled = query.matches;
    }
    function onMove(event: PointerEvent) {
      state.x = (event.clientX / window.innerWidth - 0.5) * 2;
      state.y = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    query.addEventListener("change", onChange);
    window.addEventListener("pointermove", onMove);
    return () => {
      query.removeEventListener("change", onChange);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;
    const target = group.current;
    if (!target) return;

    const { progress, activeSection } = useScrollStore.getState();
    const pose = poses[activeSection ?? "other"] ?? poses.other;
    const { width, height } = state.viewport;
    const narrow = width < height;

    // Parallax applies in the hero only and eases back out elsewhere.
    const mouse = pointer.current;
    const weight = mouse.enabled && activeSection === "hero" ? 1 : 0;
    mouse.smoothX = THREE.MathUtils.damp(
      mouse.smoothX,
      mouse.x * weight,
      SMOOTHING,
      delta,
    );
    mouse.smoothY = THREE.MathUtils.damp(
      mouse.smoothY,
      mouse.y * weight,
      SMOOTHING,
      delta,
    );

    // On phones the crystal sits centred and high, behind the text.
    let x = (narrow ? 0 : pose.x * width) + mouse.smoothX * 0.35;
    let y = (narrow ? height * 0.28 : pose.y * height) - mouse.smoothY * 0.2;

    // In the hero it takes the place of the static crystal image, wherever the
    // layout puts it (beside the text on desktop, below it on phones).
    const slot =
      activeSection === "hero"
        ? document.querySelector("[data-crystal-fallback]")
        : null;
    if (slot) {
      const box = slot.getBoundingClientRect();
      const ndcX = ((box.left + box.width / 2) / window.innerWidth) * 2 - 1;
      const ndcY = 1 - ((box.top + box.height / 2) / window.innerHeight) * 2;
      x = (ndcX * width) / 2 + mouse.smoothX * 0.35;
      y = (ndcY * height) / 2 - mouse.smoothY * 0.2;
    }

    const scale = narrow ? pose.scale * (slot ? 0.9 : 0.7) : pose.scale;
    const dim = narrow && !slot ? Math.min(pose.dim, 0.5) : pose.dim;

    target.position.x = THREE.MathUtils.damp(
      target.position.x,
      x,
      SMOOTHING,
      delta,
    );
    target.position.y = THREE.MathUtils.damp(
      target.position.y,
      y,
      SMOOTHING,
      delta,
    );
    const s = THREE.MathUtils.damp(target.scale.x, scale, SMOOTHING, delta);
    target.scale.setScalar(s);

    // Scroll turns the crystal slowly; a faint idle spin keeps it alive. The
    // angles are damped, so a quick scroll never makes it whip around.
    const spinY =
      START_YAW +
      progress * SCROLL_SPIN +
      state.clock.elapsedTime * IDLE_SPIN +
      mouse.smoothX * 0.4;
    const tiltX =
      BASE_TILT + Math.sin(progress * Math.PI * 2) * 0.12 + mouse.smoothY * 0.2;
    target.rotation.y = THREE.MathUtils.damp(
      target.rotation.y,
      spinY,
      SMOOTHING,
      delta,
    );
    target.rotation.x = THREE.MathUtils.damp(
      target.rotation.x,
      tiltX,
      SMOOTHING,
      delta,
    );

    // The camera drifts along a gentle path as the page scrolls.
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      Math.sin(progress * Math.PI * 2) * 0.4,
      SMOOTHING,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      0.3 - progress * 0.5,
      SMOOTHING,
      delta,
    );
    camera.lookAt(0, 0, 0);

    rigState.dim = THREE.MathUtils.damp(rigState.dim, dim, SMOOTHING, delta);
    rigState.accentMix = THREE.MathUtils.damp(
      rigState.accentMix,
      pose.mix ?? 0,
      SMOOTHING,
      delta,
    );
  });

  return <group ref={group}>{children}</group>;
}
