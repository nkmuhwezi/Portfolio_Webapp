import { ImageResponse } from "next/og";

// apple-icon.tsx is a route handler under the hood; output: "export"
// requires this to be explicit rather than inferred.
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same monogram as icon.tsx, scaled up. Apple touch icons render without
// a mask on most launchers, so the fill goes edge to edge rather than
// leaving margin for a shape that won't be clipped anyway.
export default function AppleIcon() {
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
          fontSize: 92,
          fontWeight: 600,
          letterSpacing: -3,
        }}
      >
        NM
      </div>
    ),
    { ...size },
  );
}
