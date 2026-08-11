import type { Metadata } from "next";
import { EB_Garamond, Figtree, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

// Runs before hydration so the page never flashes the wrong theme. A stored
// choice (the visitor has clicked Lumen or Vast before) always wins; with
// no stored choice yet, this defaults to the OS/browser's own
// prefers-color-scheme rather than a fixed brand default — see ThemeToggle
// for the live-update half of this (system changes while no manual choice
// has been made yet).
const THEME_INIT_SCRIPT = `
  try {
    var stored = localStorage.getItem("theme");
    var wantsDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (wantsDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } catch (e) {}
`;

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// The brief's exact V2 title/description — "Norman Muhwezi" here (no
// middle initial) is a deliberate, shorter SEO string, distinct from the
// on-page display name in hero.name.
const metaTitle = "Norman Muhwezi | Digital Transformation Leader";
const metaDescription =
  "Digital transformation leader with 15+ years delivering telecom infrastructure, digital platforms and technology programmes at scale across Africa, now advising on AI adoption.";

export const metadata: Metadata = {
  // Without this, Next.js resolves the generated og:image/twitter:image
  // URLs (and the canonical/og:url below) against http://localhost:3000 —
  // the build warns about exactly this, and it would silently break every
  // social preview and search result in production. www, not the bare
  // domain: that's the primary host in Vercel, the bare domain just
  // redirects to it.
  metadataBase: new URL("https://www.normanmuhwezi.com"),
  title: metaTitle,
  description: metaDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: "/",
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    // "summary" renders a small square thumbnail; the branded card in
    // opengraph-image.tsx/twitter-image.tsx is a 1200x630 wide format,
    // which needs summary_large_image to actually display at that size.
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
  },
};

export const viewport = {
  themeColor: "#ffffeb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables live on <html> so that the `--font-sans`/`--font-serif`
    // tokens declared in :root can resolve them. suppressHydrationWarning is
    // required here: the theme-init script legitimately sets data-theme to
    // something React's server render didn't produce.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ebGaramond.variable} ${figtree.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        {/* next/script hoists a beforeInteractive script into <head> at
            build time regardless of where it's written in JSX — it belongs
            here, not as a sibling of <html>, which isn't valid HTML. */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
