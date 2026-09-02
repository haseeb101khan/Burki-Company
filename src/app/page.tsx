import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { BrandShowcaseSection } from "@/components/sections/BrandShowcaseSection";
import { FeaturedBanners } from "@/components/sections/FeaturedBanners";
import { MachineReelSection } from "@/components/sections/MachineReelSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { PartnerStrip } from "@/components/sections/PartnerStrip";
import { PartsOverview } from "@/components/sections/PartsOverview";
import { QuoteSection } from "@/components/sections/QuoteSection";

/**
 * Homepage.
 *
 * Running order is the client's: brand strip, featured banners, the brand
 * showcase, the range, parts, company introduction, quote.
 *
 * INDUSTRIES IS GONE, not hidden. With a catalogue of excavators and loaders
 * only, a sector index promised a breadth of range the business does not carry
 * yet — every industry page recommended machine classes with nothing in them.
 *
 * The brand showcase REPLACED two sections — "Backed by established relations"
 * (business partners) and "Explore our equipment". The client asked for one
 * block doing the job of both: pick a manufacturer, see who they are and the
 * three machines we lead with. Category browsing lives on /equipment now, which
 * is where someone who wants to browse by machine class is already heading.
 *
 * The range reel sits under the showcase and replaced the twelve category icon
 * tiles that used to close it. With a catalogue this size most of those icons
 * led to an empty category, and a machine with its name and a line of copy
 * sells the range in a way an icon labelled "Graders" does not.
 *
 * Every section pulls its own content through `@/lib/data` — this file holds no
 * copy of its own, so the order can change without touching content.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <BrandStrip />
        <FeaturedBanners />
        <BrandShowcaseSection />
        <MachineReelSection />
        <PartsOverview />
        <AboutIntro />
        <NewsSection />
        <QuoteSection />
        <PartnerStrip />
      </main>
      <Footer />
    </>
  );
}
