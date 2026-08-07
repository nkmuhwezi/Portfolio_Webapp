import type { Metadata } from "next";
import { EB_Garamond, Figtree, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import ThemeToggle from "@/components/ThemeToggle";
import { hero } from "@/lib/content";
import "./globals.css";

// Runs before hydration so a returning visitor who chose the dark mode
// doesn't see a flash of the light default first. Light is now the default,
// matching the reference this identity is built from — the theme only
// changes when a choice was explicitly stored, never inferred from OS
// preference, since this is the site's own brand identity.
const THEME_INIT_SCRIPT = `
  try {
    if (localStorage.getItem("theme") === "dark") {
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

// Derived from hero.title rather than duplicated as a literal, so the two
// can't drift out of sync the way they just did.
const heroRole = hero.title.split(" · ")[0];
const metaTitle = `${hero.name} — ${heroRole}`;
const metaDescription =
  "15+ years delivering infrastructure and digital platforms across telecom and multilateral development, taking platforms from pilot to national scale.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: "profile",
    locale: "en_US",
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
