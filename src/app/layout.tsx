import type { Metadata } from "next";
import { displayFont, bodyFont, monoFont } from "@/lib/fonts";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sentinelai.bot"),
  title: "Sentinel AI — The Intelligence Layer",
  description:
    "Sentinel reconstructs Solana contract addresses from any Telegram message format and forwards clean CAs to your bot before the launch window closes.",
  openGraph: {
    title: "Sentinel AI",
    description: "AI Trading is faster than you are.",
    images: ["/brand/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>
        <AtmosphereBackground />
        <SmoothScroll>
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "100vw", overflow: "hidden" }}>
            <Nav />
            {children}
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
