"use client";

import { useEffect } from "react";
import { startSmoothScroll } from "@/lib/scroll";

export function SmoothScroll() {
  useEffect(() => startSmoothScroll(), []);
  return null;
}
