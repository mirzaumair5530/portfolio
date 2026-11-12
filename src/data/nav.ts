// The links in the floating nav, in order.
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
] as const;

// The button at the end of the nav. It scrolls to the home contact section.
export const contactLink = { href: "/#contact", label: "Contact" } as const;

// Only in the phone menu; on larger screens the About page links to it.
export const resumeLink = { href: "/resume", label: "Resume" } as const;
