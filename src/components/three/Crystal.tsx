"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Low-poly crystal built in code: a stretched octahedron with flat-shaded
// faces, dark edges, a thin orbit ring and a few drifting specks.
export function Crystal() {
  const group = useRef<THREE.Group>(null);

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

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-3, -2, 2]} intensity={12} color="#8fd3f4" />

      <group ref={group}>
        <group scale={[1, 1.5, 1]}>
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#3d8bff"
              flatShading
              roughness={0.35}
              metalness={0.1}
            />
          </mesh>
          <lineSegments geometry={edges}>
            <lineBasicMaterial color="#0b1d44" transparent opacity={0.6} />
          </lineSegments>
        </group>
      </group>

      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.7, 0.01, 8, 96]} />
        <meshBasicMaterial color="#8fd3f4" transparent opacity={0.6} />
      </mesh>

      <points geometry={specks}>
        <pointsMaterial color="#8fd3f4" size={0.06} sizeAttenuation />
      </points>
    </>
  );
}
