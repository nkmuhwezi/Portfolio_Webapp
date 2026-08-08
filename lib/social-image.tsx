import { ImageResponse } from "next/og";
import { hero } from "./content";

export const socialImageSize = { width: 1200, height: 630 };

/**
 * Shared by opengraph-image.tsx and twitter-image.tsx — same card, two
 * required file-convention routes. A fixed palette rather than the page's
 * live theme tokens: this renders once at build time as a plain image, so
 * it can't follow the visitor's Lumen/Vast choice. Uses Lumen's actual
 * colors (cream ground, near-black ink, burgundy accent) so the card reads
 * as the same brand as the site a click leads to, not a generic fallback.
 */
export function renderSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 100px",
          background: "#ffffeb",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div style={{ width: 48, height: 2, background: "#7f1c34" }} />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#7f1c34",
              fontWeight: 600,
            }}
          >
            {hero.location}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 600,
            letterSpacing: -2,
            color: "#000000",
            lineHeight: 1.05,
          }}
        >
          {hero.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 34,
            color: "#1a1a1a",
          }}
        >
          {hero.title}
        </div>
      </div>
    ),
    { ...socialImageSize },
  );
}
