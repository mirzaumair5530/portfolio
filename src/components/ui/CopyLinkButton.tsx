"use client";

import { useEffect, useState } from "react";

export function CopyLinkButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; do nothing.
    }
  }

  return (
    <button type="button" onClick={copy} className={className}>
      {copied ? "Copied" : "Copy link"}
      <span className="sr-only" role="status">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </button>
  );
}
