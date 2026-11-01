import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/data/nav";

export function Footer() {
  return (
    <footer className="print:hidden border-border mt-24 border-t py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-sm flex-col gap-2">
          <p className="font-heading text-foreground text-lg font-bold">
            Umair Farooq
          </p>
          <p className="text-muted text-sm">
            Software engineer building fast, accessible web experiences.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="mt-8">
        <p className="text-muted font-mono text-xs">
          © Umair Farooq. Built with Next.js.
        </p>
      </Container>
    </footer>
  );
}
