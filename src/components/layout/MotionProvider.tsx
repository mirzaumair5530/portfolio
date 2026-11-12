"use client";

import { MotionConfig } from "motion/react";

// "user": visitors who ask for reduced motion get opacity fades only; Motion
// drops transform and layout animations for them.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
