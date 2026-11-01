// Values the rig writes every frame and the objects read. A plain object
// (not React state) so reading it in useFrame never causes a re-render.
export const rigState = {
  /** 0 to 1: how visible the objects are, lowered where text sits on top. */
  dim: 1,
  /** 0 to 1: blend from the accent colour to accent 2 (projects section). */
  accentMix: 0,
};
