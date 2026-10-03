import type { Metadata } from "next";
import { EB_Garamond, Figtree, IBM_Plex_Mono } from "next/font/google";
import RevealFailsafe from "@/components/RevealFailsafe";
import ThemeToggle from "@/components/ThemeToggle";
import {
  capabilities,
  caseStudies,
  contact,
  education,
  experience,
  hero,
  lastUpdated,
  otherSystems,
  personId,
  selectedExternalWork,
  siteUrl,
} from "@/lib/content";
import "./globals.css";

// Sets the theme before the first paint so the page never flashes the
// wrong one. A stored choice (the visitor has clicked Lumen or Vast
// before) always wins; with no stored choice yet, this defaults to the
// OS/browser's own prefers-color-scheme rather than a fixed brand default
// — see ThemeToggle for the live-update half of this (system changes while
// no manual choice has been made yet).
//
// Rendered as a plain inline <script> in <head>, not through next/script:
// in the app router a beforeInteractive script is queued and run by Next's
// own runtime chunk, which arrives well after the first paint. Measured on
// the live site, a dark-mode visitor saw the light theme for up to a
// second (and on a slow connection, longer) before it flipped to dark.
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

// Marks the page as script-enabled, so the scroll-reveal sections (which
// start hidden) are only hidden when something will actually reveal them
// — see `html.js` in the section stylesheets. Rendered as a plain inline
// <script> in <head>, NOT through next/script: in the app router a
// beforeInteractive script is queued and run by Next's own runtime chunk,
// which is too late — by then the page's other scripts can already have
// failed, and a failure that happened before the listener below exists
// is never seen (testing showed exactly that: only the timer fired).
// Two ways back out if the page's JavaScript doesn't arrive:
//  - a script that fails to load (blocked, 404, dropped connection) fires
//    an error event on its <script> element, which doesn't bubble, hence
//    the capturing listener: everything is shown immediately.
//  - a script that hangs instead of failing never fires anything, so a
//    four second timer is the backstop. Four, not less, because a slow
//    phone can take about three seconds to start the page and the timer
//    must outlast that. components/RevealFailsafe.tsx cancels it once the
//    page has hydrated.
const JS_FLAG_SCRIPT = `
  document.documentElement.classList.add("js");
  function showAll() {
    clearTimeout(window.__revealFailsafe);
    document.documentElement.classList.remove("js");
  }
  window.__revealFailsafe = setTimeout(showAll, 4000);
  window.addEventListener("error", function (event) {
    if (event.target && event.target.tagName === "SCRIPT") showAll();
  }, true);
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

// Stable identifiers so every node below can point at the others by @id
// instead of repeating them. personId lives in lib/content.ts because the
// FAQ's own JSON-LD block (components/FAQ.tsx) also needs it, and a layout
// file can't export extra values for it to import.
const websiteId = `${siteUrl}/#website`;
const profilePageId = `${siteUrl}/#profilepage`;

// No "@context" on the individual nodes — they're emitted together as one
// @graph (see graphSchema below).
const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: hero.name,
  url: siteUrl,
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
  // The four capability headings on the page, verbatim — topics he's
  // credibly known for, not a keyword list invented for search engines.
  knowsAbout: capabilities.map((group) => group.title),
};

/**
 * Every third-party page that covers this work, already linked visibly
 * on the page (the "External evidence" blocks and Selected External
 * Work). Marked up as `citation` so an AI engine or crawler can see the
 * independent corroboration behind the claims, not just the claims.
 * Built from the same content the visible links read, deduplicated by
 * URL, so a link can't exist on the page without being cited here (or
 * the reverse).
 */
const citations = [
  ...caseStudies.flatMap((story) => story.externalEvidence ?? []),
  ...otherSystems.flatMap((metric) => (metric.evidence ? [metric.evidence] : [])),
]
  .map((item) => ({ name: item.source, url: item.href }))
  .concat(
    selectedExternalWork.map((entry) => ({ name: entry.title, url: entry.href })),
  )
  .filter((item, index, all) => all.findIndex((x) => x.url === item.url) === index)
  .map((item) => ({ "@type": "CreativeWork", name: item.name, url: item.url }));

const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: hero.name,
  inLanguage: "en",
  publisher: { "@id": personId },
};

/**
 * The page's mainEntity is the Person (the shape Google's structured-data
 * guidance recommends for a personal profile page), referenced by @id
 * rather than nested, so the same entity can also be pointed at from the
 * FAQ block. dateModified is the real last-content-change date, not the
 * build date.
 */
const profilePageSchema = {
  "@type": "ProfilePage",
  "@id": profilePageId,
  name: metaTitle,
  url: siteUrl,
  inLanguage: "en",
  dateModified: lastUpdated,
  isPartOf: { "@id": websiteId },
  mainEntity: { "@id": personId },
  citation: citations,
};

const graphSchema = {
  "@context": "https://schema.org",
  "@graph": [websiteSchema, profilePageSchema, personSchema],
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
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT + JS_FLAG_SCRIPT }}
        />
      </head>
      <body>
        {/* Structured data — search engines parse this anywhere in the
            document, so it doesn't need to live in <head>. `<` is escaped
            defensively so no future content string could ever prematurely
            close the script tag. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graphSchema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <RevealFailsafe />
        <ThemeToggle />
      </body>
    </html>
  );
}
