import { create } from "zustand";

type ScrollState = {
  /** Page scroll position from 0 (top) to 1 (bottom). */
  progress: number;
  /** Id of the home section in view, or null elsewhere. */
  activeSection: string | null;
  setProgress: (progress: number) => void;
  setActiveSection: (id: string | null) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  activeSection: null,
  setProgress: (progress) => set({ progress }),
  setActiveSection: (activeSection) => set({ activeSection }),
}));
