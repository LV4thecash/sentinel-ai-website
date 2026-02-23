import { Montserrat, Poppins, IBM_Plex_Mono } from "next/font/google";

// Display/heading font — brand-specified Montserrat Bold/SemiBold
export const displayFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
});

// Body + subheading font — brand-specified Poppins
export const bodyFont = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

// Monospace — for CA strings, code, technical labels
export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});
