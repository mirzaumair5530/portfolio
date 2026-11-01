"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { rigState } from "@/components/three/rigState";

// Low-poly crystal built in code: a stretched octahedron with flat-shaded
// faces, dark edges, a thin orbit ring and a few drifting specks.
export function Crystal() {
  const body = useRef<THREE.MeshStandardMaterial>(null);
  const edgeMaterial = useRef<THREE.LineBasicMaterial>(null);
  const ring = useRef<THREE.MeshBasicMaterial>(null);
  const speckMaterial = useRef<THREE.PointsMaterial>(null);

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1, 0)),
    [],
  );
  const specks = useMemo(() => {
    const positions = new Float32Array(
      [
        [-2.2, 1.4, -0.5],
        [2.4, 1.1, 0.2],
        [-1.8, -1.6, 0.4],
        [2.1, -1.4, -0.3],
        [0.2, 2.2, -0.8],
      ].flat(),
    );
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Fade everything with the rig's dim value so text stays readable.
  useFrame(() => {
    const { dim } = rigState;
    if (body.current) body.current.opacity = dim;
    if (edgeMaterial.current) edgeMaterial.current.opacity = 0.6 * dim;
    if (ring.current) ring.current.opacity = 0.6 * dim;
    if (speckMaterial.current) speckMaterial.current.opacity = dim;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-3, -2, 2]} intensity={12} color="#8fd3f4" />

      <group>
        <group scale={[0.7, 1.05, 0.7]}>
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              ref={body}
              transparent
              color="#3d8bff"
              flatShading
              roughness={0.35}
              metalness={0.1}
            />
          </mesh>
          <lineSegments geometry={edges}>
            <lineBasicMaterial ref={edgeMaterial} color="#0b1d44" transparent />
          </lineSegments>
        </group>
      </group>

      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.3, 0.008, 8, 96]} />
        <meshBasicMaterial ref={ring} color="#8fd3f4" transparent />
      </mesh>

      <points geometry={specks}>
        <pointsMaterial
          ref={speckMaterial}
          color="#8fd3f4"
          size={0.06}
          sizeAttenuation
          transparent
        />
      </points>
    </>
  );
}
