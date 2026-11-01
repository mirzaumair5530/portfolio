import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Projects · Umair Farooq";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Projects",
    title: "Things I’ve built.",
    subtitle:
      "Full-stack products and experiments: the problem, the role, the stack and the result.",
  });
}
