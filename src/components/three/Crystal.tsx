"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { rigState } from "@/components/three/rigState";
import { useThemeColors } from "@/components/three/useThemeColors";

// Octahedron faces as [apex, a, b] vertex triples, wound to face outward.
// The first four are the top faces, the last four the bottom faces.
const T = [0, 1, 0];
const B = [0, -1, 0];
const PX = [1, 0, 0];
const NX = [-1, 0, 0];
const PZ = [0, 0, 1];
const NZ = [0, 0, -1];
const FACES = [
  [T, PZ, PX],
  [T, PX, NZ],
  [T, NZ, NX],
  [T, NX, PZ],
  [B, PX, PZ],
  [B, NZ, PX],
  [B, NX, NZ],
  [B, PZ, NX],
];

// Lightness offsets per face, so the crystal has the same pale / bright /
// deep faces as the design, whatever the theme colours are.
const TOP_SHADES = [0.1, 0, 0.17, -0.2];
const BOTTOM_SHADES = [0.06, -0.14, 0.06, -0.14];

const hsl = { h: 0, s: 0, l: 0 };
const face = new THREE.Color();

// Low-poly crystal built in code: a stretched octahedron with a different
// colour on every face, dark edges, an orbit ring and a few specks.
export function Crystal() {
  const colors = useThemeColors();
  const glow = useRef<THREE.PointLight>(null);
  const body = useRef<THREE.MeshLambertMaterial>(null);
  const edgeMaterial = useRef<THREE.LineBasicMaterial>(null);
  const ring = useRef<THREE.MeshBasicMaterial>(null);
  const speckMaterial = useRef<THREE.PointsMaterial>(null);
  const painted = useRef({ version: -1, mix: -1 });

  const geometry = useMemo(() => {
    const positions = new Float32Array(FACES.flat(2));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(positions.length), 3),
    );
    // Not indexed, so every face gets its own flat normal.
    geometry.computeVertexNormals();
    return geometry;
  }, []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
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

  // R3F frees the geometries declared in JSX; these are built by hand.
  useEffect(
    () => () => {
      geometry.dispose();
      edges.dispose();
      specks.dispose();
    },
    [geometry, edges, specks],
  );

  // Writes one colour per face from the theme: top faces from the accent
  // (shifting to accent 2 in the projects section), bottom faces from accent 2.
  function paintFaces(mix: number) {
    const attribute = geometry.getAttribute("color") as THREE.BufferAttribute;
    FACES.forEach((_, index) => {
      const top = index < 4;
      const shade = top ? TOP_SHADES[index] : BOTTOM_SHADES[index - 4];
      face.copy(top ? colors.accent : colors.accent2);
      if (top) face.lerp(colors.accent2, mix);
      face.getHSL(hsl);
      // Start from a mid-bright base in every theme (the light theme's accents
      // are deeper), then shift per face, so the faces never go muddy or black.
      const base = THREE.MathUtils.clamp(hsl.l, top ? 0.5 : 0.6, 0.72);
      face.setHSL(
        hsl.h,
        hsl.s,
        THREE.MathUtils.clamp(base + shade, 0.18, 0.92),
      );
      for (let vertex = 0; vertex < 3; vertex++) {
        attribute.setXYZ(index * 3 + vertex, face.r, face.g, face.b);
      }
    });
    attribute.needsUpdate = true;
  }

  // Fade everything with the rig's dim value so text stays readable.
  useFrame(() => {
    const { dim, accentMix } = rigState;

    // Repaint only when the theme or the accent blend actually changed.
    const last = painted.current;
    if (
      last.version !== colors.version ||
      Math.abs(last.mix - accentMix) > 0.01
    ) {
      paintFaces(accentMix);
      last.version = colors.version;
      last.mix = accentMix;
    }

    edgeMaterial.current?.color.copy(colors.edge);
    ring.current?.color.copy(colors.accent2);
    speckMaterial.current?.color.copy(colors.accent2);
    glow.current?.color.copy(colors.accent2);
    if (body.current) body.current.opacity = dim;
    if (edgeMaterial.current) edgeMaterial.current.opacity = 0.6 * dim;
    if (ring.current) ring.current.opacity = 0.6 * dim;
    if (speckMaterial.current) speckMaterial.current.opacity = dim;
  });

  return (
    <>
      {/* Light intensities are in physical units (diffuse = colour / pi), so
          ambient near pi shows a face at roughly its own colour. */}
      <ambientLight intensity={2.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight ref={glow} position={[-3, -2, 2]} intensity={8} />

      <group scale={[0.75, 0.95, 0.75]}>
        <mesh geometry={geometry}>
          <meshLambertMaterial ref={body} vertexColors transparent />
        </mesh>
        <lineSegments geometry={edges}>
          <lineBasicMaterial ref={edgeMaterial} transparent />
        </lineSegments>
      </group>

      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.3, 0.008, 8, 96]} />
        <meshBasicMaterial ref={ring} transparent />
      </mesh>

      <points geometry={specks}>
        <pointsMaterial
          ref={speckMaterial}
          size={0.06}
          sizeAttenuation
          transparent
        />
      </points>
    </>
  );
}
