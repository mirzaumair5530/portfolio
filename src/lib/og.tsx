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

// The light theme's colours (src/styles/tokens.css). ImageResponse cannot read
// CSS variables, so they are repeated here.
const colors = {
  bg: "#eef4ff",
  text: "#0e1b33",
  muted: "#44536f",
  accent: "#2f7bff",
};

// Share card in the site's light palette: an outlined badge, an uppercase
// title and the name on an accent footer. ImageResponse only supports a
// flexbox subset of CSS, so the layout is built from nested flex containers.
export function renderOgImage({ kicker, title, subtitle }: OgImageProps) {
  const initials = site.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: colors.text,
        background: colors.bg,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
          gap: 28,
          padding: "0 72px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              padding: "6px 24px",
              borderRadius: 99,
              border: `2px solid ${colors.accent}`,
              color: colors.accent,
              fontSize: 26,
            }}
          >
            {kicker}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 40 ? 68 : 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.4,
              color: colors.muted,
            }}
          >
            {subtitle.length > 140 ? `${subtitle.slice(0, 137)}…` : subtitle}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "28px 72px",
          background: colors.accent,
          color: "#ffffff",
          fontSize: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 52,
            height: 52,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 99,
            background: "#ffffff",
            color: colors.accent,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {initials}
        </div>
        {site.name}
      </div>
    </div>,
    ogSize,
  );
}
