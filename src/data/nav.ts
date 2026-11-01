// Links on every route except the home page.
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
] as const;

// On the home page the bar links to its sections instead.
export const homeLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
] as const;

export const resumeLink = { href: "/resume", label: "Resume" } as const;
