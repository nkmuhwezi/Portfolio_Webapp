import type { MetadataRoute } from "next";
import { lastUpdated } from "@/lib/content";

// Generated at build time into /sitemap.xml via Next.js's file-convention
// route — this is a single-page site, so there's exactly one URL.
// Required for output: "export": sitemap.ts is a Route Handler under the
// hood, and static export needs it explicitly pinned static rather than
// left to run per-request (which a fully static site has no server for).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.normanmuhwezi.com",
      // The date content last really changed (see lib/content.ts), not
      // new Date(): that re-stamped "today" on every build, and search
      // engines learn to ignore <lastmod> from a site where it always
      // changes.
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
