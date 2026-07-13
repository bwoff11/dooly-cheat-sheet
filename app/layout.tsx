import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://bwoff11.github.io/dooly-cheat-sheet/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dooley Runbook — The Bazaar Core Cheat Sheet",
  description:
    "A patch-locked Dooley cheat sheet for The Bazaar: build lines, buy priorities, board order, pivots, and the best merchants for every Core route.",
  applicationName: "Dooley Runbook",
  keywords: ["The Bazaar", "Dooley", "guide", "cheat sheet", "Core", "builds", "merchants"],
  authors: [{ name: "Dooley Runbook contributors" }],
  icons: { icon: "./favicon.svg", shortcut: "./favicon.svg" },
  openGraph: {
    title: "Dooley Runbook — Choose a Core. Find the line.",
    description: "Patch 16.1 build lines, purchases, merchant routing, pivots, and traps for every current Dooley Core route.",
    type: "website",
    url: siteUrl,
    siteName: "Dooley Runbook",
    images: [{ url: `${siteUrl}og.png`, width: 1730, height: 909, alt: "Dooley Runbook field guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dooley Runbook",
    description: "Choose a Core. Find the line.",
    images: [`${siteUrl}og.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071019",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
