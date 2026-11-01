"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { homeLinks, navLinks, resumeLink } from "@/data/nav";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/scroll";

function isActive(pathname: string, href: string) {
  // Section anchors and "/#contact" are never the current page.
  if (href.startsWith("#") || href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const links = isHome ? homeLinks : navLinks;
  const mobileLinks = isHome ? [...links, resumeLink] : links;
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // While the full-screen menu is open: lock page scroll, close on Escape,
  // keep Tab inside the menu, and hand focus back to the toggle on close.
  useEffect(() => {
    if (!open) return;

    const toggle = toggleRef.current;
    const controls = controlsRef.current;
    const menu = menuRef.current;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    menu?.querySelector<HTMLElement>("a")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menu || !controls) return;
      // The bar controls stay above the overlay, so they are part of the trap.
      const focusable = [
        ...controls.querySelectorAll<HTMLElement>("button"),
        ...menu.querySelectorAll<HTMLElement>("a"),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 print:hidden">
      <nav
        aria-label="Main"
        className="glass mx-auto flex h-14 max-w-4xl items-center justify-between rounded-full pr-2 pl-6"
      >
        <Link
          href="/"
          className="font-heading text-foreground flex items-center gap-3 text-lg font-bold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="text-accent-text border-accent/40 bg-accent/10 flex size-8 items-center justify-center rounded-lg border font-mono text-xs"
          >
            UF
          </span>
          Umair Farooq
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium underline-offset-8 transition-colors hover:text-foreground",
                    active
                      ? "text-foreground underline decoration-accent-text decoration-2"
                      : "text-muted",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          ref={controlsRef}
          className="relative z-[60] flex items-center gap-2"
        >
          <ThemeToggle />
          {isHome && (
            <Button href={resumeLink.href} className="h-10 max-md:hidden">
              {resumeLink.label}
            </Button>
          )}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass text-foreground flex size-10 cursor-pointer items-center justify-center rounded-full md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="bg-background fixed inset-0 z-[55] flex flex-col items-center justify-center gap-8 md:hidden"
        >
          <ul className="flex flex-col items-center gap-6">
            {mobileLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "font-heading text-4xl font-bold underline-offset-8",
                      active
                        ? "text-foreground underline decoration-accent-text decoration-4"
                        : "text-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
