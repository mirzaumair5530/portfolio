import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/** The row of social icons. Colour comes from the parent's text colour. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {site.socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="block transition-opacity hover:opacity-70"
          >
            <Icon name={social.icon} className="size-6" />
          </a>
        </li>
      ))}
    </ul>
  );
}
