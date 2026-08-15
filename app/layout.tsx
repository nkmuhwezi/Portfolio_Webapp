import type { Metadata } from "next";
import { EB_Garamond, Figtree, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import ThemeToggle from "@/components/ThemeToggle";
import { contact, education, experience, hero } from "@/lib/content";
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

// "Norman Muhwezi" here (no middle initial) is a deliberate, shorter SEO
// string, distinct from the on-page display name in hero.name.
const metaTitle = "Norman Muhwezi | Digital Transformation & AI Adoption";
const metaDescription =
  "Digital transformation and AI adoption leader with 15+ years delivering telecom infrastructure, digital platforms and technology programmes at scale across Africa and emerging markets.";

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
  manifest: "/manifest.json",
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

/**
 * schema.org Person structured data — every field is sourced from
 * lib/content.ts, the same single source of truth the page itself reads
 * from, so this can't drift out of sync with what's actually on the page.
 * Deliberately excludes an email field: the site's own convention is that
 * the address never appears as scrapable text (only as a mailto target),
 * and a machine-readable JSON-LD field is exactly the kind of scrapable
 * text that convention exists to avoid.
 */
const currentRole = experience[0];
// No "@context" here — this is only ever embedded as profilePageSchema's
// mainEntity below, never emitted as its own standalone JSON-LD block.
const personSchema = {
  "@type": "Person",
  name: hero.name,
  url: "https://www.normanmuhwezi.com",
  image: "https://www.normanmuhwezi.com/images/headshot-1600.jpg",
  jobTitle: hero.title,
  description: metaDescription,
  worksFor: {
    "@type": "Organization",
    name: currentRole.primary,
    url: currentRole.orgUrl,
  },
  alumniOf: education.map((item) => {
    const [name, country] = item.institution.split(", ");
    return {
      "@type": "CollegeOrUniversity",
      name,
      ...(country
        ? { address: { "@type": "PostalAddress", addressCountry: country } }
        : {}),
    };
  }),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Addis Ababa",
    addressCountry: "Ethiopia",
  },
  sameAs: [contact.linkedinUrl],
};

/**
 * Wraps the Person above as the page's mainEntity — the shape Google's
 * structured-data guidance recommends for a personal profile/portfolio
 * page, rather than emitting Person as an unrelated top-level block.
 */
const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: metaTitle,
  url: "https://www.normanmuhwezi.com",
  mainEntity: personSchema,
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
        {/* Structured data — search engines parse this anywhere in the
            document, so it doesn't need to live in <head>. `<` is escaped
            defensively so no future content string could ever prematurely
            close the script tag. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageSchema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
