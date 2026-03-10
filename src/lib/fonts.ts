import localFont from "next/font/local";

// Display/heading font — Montserrat (variable weight, latin subset)
export const displayFont = localFont({
  src: "../../public/fonts/montserrat-latin.woff2",
  variable: "--font-display",
  weight: "600 900",
  display: "swap",
});

// Body + subheading font — Poppins
export const bodyFont = localFont({
  src: [
    { path: "../../public/fonts/poppins-400.woff2", weight: "400" },
    { path: "../../public/fonts/poppins-500.woff2", weight: "500" },
    { path: "../../public/fonts/poppins-600.woff2", weight: "600" },
  ],
  variable: "--font-body",
  display: "swap",
});

// Monospace — for CA strings, code, technical labels
export const monoFont = localFont({
  src: [
    { path: "../../public/fonts/ibm-plex-mono-400.woff2", weight: "400" },
    { path: "../../public/fonts/ibm-plex-mono-700.woff2", weight: "700" },
  ],
  variable: "--font-mono",
  display: "swap",
});
