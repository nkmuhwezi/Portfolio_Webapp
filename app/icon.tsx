import { ImageResponse } from "next/og";

// icon.tsx is a route handler under the hood; output: "export" requires
// this to be explicit rather than inferred.
export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// A solid, fixed palette rather than the page's live theme tokens — this
// renders once at build time, so it can't react to the visitor's Lumen/Vast
// choice the way the page itself does. Burgundy-on-cream reads clearly at
// favicon scale in both a light and a dark browser chrome.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7f1c34",
          color: "#ffffeb",
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: -0.5,
        }}
      >
        NM
      </div>
    ),
    { ...size },
  );
}
