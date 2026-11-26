import type { Metadata } from "next";
// Brand fonts, self-hosted (no external requests):
// Archivo (expanded) = headings, Instrument Sans = body, IBM Plex Mono = technical labels.
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/instrument-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/Motion";
import { site } from "@/lib/site";


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Websites & Booking Systems for Metro Manila Businesses`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_PH" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
