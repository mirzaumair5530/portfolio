import { site } from "@/data/site";

/** The phone number as a `tel:` link, or plain text while it is a placeholder. */
export function PhoneLink({ className }: { className?: string }) {
  const digits = site.phone.replace(/[^\d+]/g, "");
  if (site.phone.includes("[") || digits.length < 7) {
    return <span className={className}>{site.phone}</span>;
  }
  return (
    <a href={`tel:${digits}`} className={className}>
      {site.phone}
    </a>
  );
}
