import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Projects · Umair Farooq";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Projects",
    title: "Featured projects",
    subtitle:
      "Full-stack products and experiments: the problem, the solution and the result.",
  });
}
