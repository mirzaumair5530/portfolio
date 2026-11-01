import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Blog · Umair Farooq";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Blog",
    title: "Notes on building.",
    subtitle:
      "Short write-ups on React, Node.js, MongoDB and the things I learn while shipping.",
  });
}
