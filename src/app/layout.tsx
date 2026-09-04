import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { CompareBar } from "@/components/compare/CompareBar";
import { CompareProvider } from "@/components/compare/CompareProvider";
import { QuickActions } from "@/components/layout/QuickActions";
import { getEquipment, getSiteConfig } from "@/lib/data";
import { routes } from "@/lib/routes";
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

/**
 * The comparison selection lives at the root, because comparing means picking
 * one machine on one brand's catalogue and another on a different one — the
 * selection cannot belong to either page.
 *
 * The whole catalogue is reduced here to the five fields the tray needs to draw
 * a chip. Sixteen machines' worth of that is small enough to hand down once,
 * and it keeps the client components from reaching into the data layer.
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [equipment, site] = await Promise.all([getEquipment(), getSiteConfig()]);
  const machines = equipment.map((machine) => ({
    slug: machine.slug,
    model: machine.model,
    brand: machine.brand,
    href: routes.equipmentItem(machine),
    image: machine.cutoutImage ?? machine.image,
  }));

  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-ink antialiased">
        <MotionProvider>
          <CompareProvider machines={machines}>
            {children}
            <QuickActions whatsapp={site.whatsapp} />
            <CompareBar />
          </CompareProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
