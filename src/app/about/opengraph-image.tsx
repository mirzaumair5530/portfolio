import { site } from "@/data/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "About · Umair Farooq";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "About",
    title: "About me",
    subtitle: site.tagline,
  });
}
