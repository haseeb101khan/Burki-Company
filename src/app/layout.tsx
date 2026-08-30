import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { siteUrl } from "@/lib/site";
import "./globals.css";

/* Display face: condensed industrial sans. Body face: neutral modern sans. */
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  /* Environment-driven: the domain is not settled yet, and nothing in the
     codebase should assume one. Set NEXT_PUBLIC_SITE_URL when it is. */
  metadataBase: new URL(siteUrl),
  title: {
    default: "Burki & Company — Heavy Equipment & Parts | Karachi, Pakistan",
    template: "%s | Burki & Company",
  },
  description:
    "Heavy equipment dealer and importer based in Karachi. Excavators, wheel loaders, dump trucks, cranes and genuine parts for construction, infrastructure and mining projects nationwide.",
  openGraph: {
    type: "website",
    siteName: "Burki & Company",
    locale: "en_PK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
