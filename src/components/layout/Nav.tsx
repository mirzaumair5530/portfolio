"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { contactLink, navLinks, resumeLink } from "@/data/nav";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/scroll";

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

// The label is rendered twice; on hover both copies move up one line, so the
// second rolls into the place of the first.
function RollLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative block h-6 overflow-hidden",
        active ? "text-accent" : "text-foreground",
      )}
    >
      <span className="block transition-transform duration-300 group-hover:-translate-y-full">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-full block transition-transform duration-300 group-hover:-translate-y-full"
      >
        {label}
      </span>
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  // Scrolling down past the top collapses the pill; scrolling up reopens it.
  const [scrolledDown, setScrolledDown] = useState(false);
  // Hover or keyboard focus reopens it without scrolling.
  const [engaged, setEngaged] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (y > previous && y > 80) setScrolledDown(true);
    else if (y < previous) setScrolledDown(false);
  });

  const collapsed = scrolledDown && !engaged;

  // While the phone menu is open: lock page scroll, close on Escape, keep Tab
  // inside the menu, and hand focus back to the toggle on close.
  useEffect(() => {
    if (!menuOpen) return;

    const toggle = toggleRef.current;
    const menu = menuRef.current;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    menu?.querySelector<HTMLElement>("a")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menu || !toggle) return;
      // The toggle stays above the overlay, so it is part of the trap.
      const focusable = [toggle, ...menu.querySelectorAll<HTMLElement>("a")];
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
  }, [menuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-5 print:hidden">
      <motion.nav
        layout
        transition={SPRING}
        aria-label="Main"
        // Motion corrects the radius while the width animates.
        style={{ borderRadius: 28 }}
        onMouseEnter={() => setEngaged(true)}
        onMouseLeave={() => setEngaged(false)}
        onFocus={() => setEngaged(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setEngaged(false);
          }
        }}
        className="bg-nav pointer-events-auto relative z-[60] flex h-14 items-center gap-6 p-2 backdrop-blur-[5px] max-tablet:w-full max-tablet:justify-between"
      >
        <motion.div layout="position" transition={SPRING}>
          <Link href="/" aria-label={`${site.name}, home`} className="block">
            <Avatar image={site.images.avatar} name={site.name} />
          </Link>
        </motion.div>

        {/* Phone: avatar and menu button only. */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="phone-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="bg-contrast text-on-contrast flex size-10 cursor-pointer items-center justify-center rounded-full tablet:hidden"
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>

        {/* Tablet and up: the links, or the status pill once collapsed. */}
        {collapsed ? (
          <motion.p
            key="status"
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="hidden items-center gap-3 pr-4 whitespace-nowrap tablet:flex"
          >
            {site.availability}
            <span className="relative flex size-2.5">
              <span className="bg-success absolute inline-flex size-full animate-ping rounded-full opacity-75" />
              <span className="bg-success relative inline-flex size-2.5 rounded-full" />
            </span>
          </motion.p>
        ) : (
          <motion.div
            key="links"
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="hidden items-center gap-6 tablet:flex"
          >
            <ul className="flex items-center gap-6 pl-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <RollLink
                    href={link.href}
                    label={link.label}
                    active={isActive(pathname, link.href)}
                  />
                </li>
              ))}
            </ul>
            <Link
              href={contactLink.href}
              className="group bg-contrast text-on-contrast relative flex h-10 w-[118px] items-center justify-center overflow-hidden rounded-full"
            >
              {/* An accent circle grows from the bottom edge to fill. */}
              <span
                aria-hidden="true"
                className="bg-accent absolute -bottom-5 left-1/2 size-5 -translate-x-1/2 rounded-full transition-transform duration-500 group-hover:scale-[14]"
              />
              <span className="group-hover:text-on-accent relative transition-colors duration-300">
                {contactLink.label}
              </span>
            </Link>
          </motion.div>
        )}
      </motion.nav>

      {menuOpen && (
        <div
          id="phone-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="bg-background pointer-events-auto fixed inset-0 z-[55] flex flex-col items-center justify-center tablet:hidden"
        >
          <ul className="flex flex-col items-center gap-4">
            {[...navLinks, resumeLink, contactLink].map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "type-h2",
                      active ? "text-accent" : "text-foreground",
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
