import { Space_Mono, Bebas_Neue, DM_Sans } from "next/font/google";

// Display headline font — industrial, high-contrast
export const displayFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

// Body + UI font — clean, readable at small sizes
export const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

// Monospace — for CA strings, code, technical labels
export const monoFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});
