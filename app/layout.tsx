import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import ThemeToggle from "@/components/ThemeToggle";
import { hero } from "@/lib/content";
import "./globals.css";

// Runs before hydration so a returning visitor who chose Daylight doesn't
// see a flash of Noir first. Noir is the default: the theme only changes
// when a choice was explicitly stored, never inferred from OS preference —
// this is the site's own brand identity, not a system-following utility.
const THEME_INIT_SCRIPT = `
  try {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } catch (e) {}
`;

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
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
  themeColor: "#1a1817",
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
      className={`${cormorant.variable} ${inter.variable} ${robotoMono.variable}`}
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
