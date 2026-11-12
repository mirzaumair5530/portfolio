"use client";

import { Children, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * A two-column grid that shows the first `initial` children and reveals
 * `initial` more each time "Load more" is pressed. The button goes away once
 * everything is shown.
 */
export function LoadMoreGrid({
  initial,
  className,
  children,
}: {
  initial: number;
  className?: string;
  children: React.ReactNode;
}) {
  const items = Children.toArray(children);
  const [count, setCount] = useState(initial);

  return (
    <>
      <ul
        className={cn("grid gap-x-10 gap-y-16 tablet:grid-cols-2", className)}
      >
        {items.slice(0, count).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {count < items.length && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="dark"
            onClick={() => setCount((value) => value + initial)}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
}
