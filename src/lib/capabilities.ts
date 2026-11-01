// Checks that decide whether the 3D scene runs or the static crystal stays.

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    // Release the probe context right away so it does not count against the
    // browser's limit on live contexts.
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return gl !== null;
  } catch {
    return false;
  }
}

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

// Phones get a lighter scene; only clearly weak devices or data-saver mode
// fall back to the static image.
export function isLowEnd() {
  const nav = navigator as NavigatorHints;
  return (
    nav.connection?.saveData === true ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2)
  );
}

export function canRunScene() {
  return !prefersReducedMotion() && !isLowEnd() && hasWebGL();
}
