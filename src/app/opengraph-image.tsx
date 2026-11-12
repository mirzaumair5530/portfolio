import { site } from "@/data/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = site.seo.title;
export const size = ogSize;
export const contentType = ogContentType;

// Default share image for the home page and every route without its own.
export default function Image() {
  return renderOgImage({
    kicker: "Portfolio",
    title: `${site.name}, ${site.role.join(" ").toLowerCase()}`,
    subtitle: site.tagline,
  });
}
