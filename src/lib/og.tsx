import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgImageProps = {
  /** Small label above the title, for example "Blog" or "Case study". */
  kicker: string;
  title: string;
  /** Short line under the title. */
  subtitle?: string;
};

// Share card in the Blue Glass palette. ImageResponse only supports a flexbox
// subset of CSS, so the layout is built from nested flex containers.
export function renderOgImage({ kicker, title, subtitle }: OgImageProps) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "#eaf1ff",
        background:
          "radial-gradient(circle at 85% 15%, #1f4fa8 0%, #0e1730 45%, #070d1c 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 30,
          color: "#8fd3f4",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 56,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 14,
            border: "2px solid #3d8bff",
            color: "#6aa7ff",
            fontSize: 26,
          }}
        >
          UF
        </div>
        {kicker.toUpperCase()}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 48 ? 64 : 80,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.35,
              color: "#b7c6e4",
            }}
          >
            {subtitle.length > 140 ? `${subtitle.slice(0, 137)}…` : subtitle}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", fontSize: 28, color: "#b7c6e4" }}>
        {site.name}
      </div>
    </div>,
    ogSize,
  );
}
