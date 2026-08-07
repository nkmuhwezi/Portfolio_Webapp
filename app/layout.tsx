import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Roboto_Mono } from "next/font/google";
import { hero } from "@/lib/content";
import "./globals.css";

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

export const metadata: Metadata = {
  title: `${hero.name} — Digital Infrastructure & Innovation Leader`,
  description:
    "15+ years delivering infrastructure and digital platforms across telecom and multilateral development, taking platforms from pilot to national scale.",
  openGraph: {
    title: `${hero.name} — Digital Infrastructure & Innovation Leader`,
    description:
      "15+ years delivering infrastructure and digital platforms across telecom and multilateral development, taking platforms from pilot to national scale.",
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
    // tokens declared in :root can resolve them.
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${robotoMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
