import { Instrument_Serif, Figtree, IBM_Plex_Mono } from "next/font/google";

// Display/heading font — Instrument Serif: high-contrast editorial serif
export const displayFont = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
});

// Body + subheading font — Figtree: warm, legible grotesque
export const bodyFont = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

// Monospace — for CA strings, code, technical labels
export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});
