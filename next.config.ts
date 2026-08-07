import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site: plain HTML/CSS/JS with no server runtime.
  // There are no API routes, server actions, or data fetching in this project.
  output: "export",
  images: {
    // Required by `output: "export"` — images are served as-is from /public.
    unoptimized: true,
  },
};

export default nextConfig;
