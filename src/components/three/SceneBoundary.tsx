"use client";

import { Component, type ReactNode } from "react";

// A WebGL or render error in the scene must never break the page: report it
// so the loader can fall back to the static crystal.
export class SceneBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
