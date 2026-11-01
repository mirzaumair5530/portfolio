import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Resume · Umair Farooq";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Resume",
    title: "Umair Farooq",
    subtitle: "Software engineer. Experience, skills and education.",
  });
}
