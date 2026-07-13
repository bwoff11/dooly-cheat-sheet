import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://bwoff11.github.io/dooly-cheat-sheet/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dooley Runbook — Patch 16.1 Core Strategy Reference",
  description:
    "A patch-locked Dooley cheat sheet for The Bazaar: build archetypes, purchase priorities, activation order, pivot conditions, and ranked merchants for every Core route.",
  applicationName: "Dooley Runbook",
  keywords: ["The Bazaar", "Dooley", "guide", "cheat sheet", "Core", "builds", "merchants"],
  authors: [{ name: "Dooley Runbook contributors" }],
  icons: { icon: "./favicon.svg", shortcut: "./favicon.svg" },
  openGraph: {
    title: "Dooley Runbook — Patch 16.1 Core Strategy Reference",
    description: "Patch 16.1 build archetypes, purchase priorities, activation order, merchant targets, and pivot conditions for every Dooley Core route.",
    type: "website",
    url: siteUrl,
    siteName: "Dooley Runbook",
    images: [{ url: `${siteUrl}og.png`, width: 1727, height: 911, alt: "Dooley Runbook Patch 16.1 Core strategy reference" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dooley Runbook",
    description: "Build archetypes, item priorities, activation order, and merchant targets for every Dooley Core.",
    images: [`${siteUrl}og.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060911",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
