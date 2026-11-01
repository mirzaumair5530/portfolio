"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

// Scene colours read from the CSS tokens, so the crystal follows the theme.
// The Color objects are stable and updated in place when `data-theme` changes;
// materials read them every frame, so no re-render is needed.
export function useThemeColors() {
  const colors = useMemo(
    () => ({
      accent: new THREE.Color(),
      accent2: new THREE.Color(),
      edge: new THREE.Color(),
    }),
    [],
  );

  useEffect(() => {
    const root = document.documentElement;

    function read() {
      const style = getComputedStyle(root);
      const token = (name: string) => style.getPropertyValue(name).trim();
      colors.accent.set(token("--accent"));
      colors.accent2.set(token("--accent-2"));
      // Ink-coloured edges: deep navy on dark, the text ink on light.
      colors.edge.set(
        root.dataset.theme === "light" ? token("--text") : token("--bg"),
      );
    }

    read();
    const observer = new MutationObserver(read);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [colors]);

  return colors;
}
