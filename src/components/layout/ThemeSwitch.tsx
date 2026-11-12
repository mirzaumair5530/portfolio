"use client";

import { useTheme } from "@/components/ui/ThemeProvider";

// Fixed at the bottom centre. The knob position comes from CSS (`dark:`), so
// it is right before hydration too. The button is larger than the 40 x 20
// track to give touch a fair target.
export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark theme"
      onClick={toggleTheme}
      className="group fixed bottom-3 left-1/2 z-50 flex h-10 w-14 -translate-x-1/2 cursor-pointer items-center justify-center print:hidden"
    >
      <span className="bg-accent flex h-5 w-10 items-center rounded-full px-[3px] transition-transform group-hover:scale-110">
        <span className="bg-on-accent size-3.5 rounded-full transition-transform duration-300 dark:translate-x-5" />
      </span>
    </button>
  );
}
