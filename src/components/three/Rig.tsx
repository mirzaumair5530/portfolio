"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
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

const SMOOTHING = 3;

// Moves the camera and the crystal from the scroll store: the section sets the
// target pose, progress drives the camera drift and the spin.
export function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const { camera } = state;
    const target = group.current;
    if (!target) return;

    const { progress, activeSection } = useScrollStore.getState();
    const pose = poses[activeSection ?? "other"] ?? poses.other;
    const { width, height } = state.viewport;
    const narrow = width < height;

    // On phones the crystal sits centred and high, behind the text.
    const x = narrow ? 0 : pose.x * width;
    const y = narrow ? height * 0.28 : pose.y * height;
    const scale = narrow ? pose.scale * 0.7 : pose.scale;
    const dim = narrow ? Math.min(pose.dim, 0.5) : pose.dim;

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

    // Scroll spins the crystal; a small idle drift keeps it alive.
    target.rotation.y = progress * Math.PI * 6 + state.clock.elapsedTime * 0.2;
    target.rotation.x = Math.sin(progress * Math.PI * 4) * 0.25;

    // The camera drifts along a gentle path as the page scrolls.
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      Math.sin(progress * Math.PI * 2) * 0.6,
      SMOOTHING,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      0.4 - progress * 0.8,
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
