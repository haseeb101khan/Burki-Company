import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HomeIntro } from "@/components/home/HomeIntro";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { BrandShowcaseSection } from "@/components/sections/BrandShowcaseSection";
import { Hero } from "@/components/sections/Hero";
import { MachineReelSection } from "@/components/sections/MachineReelSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { PartnerStrip } from "@/components/sections/PartnerStrip";
import { PartsOverview } from "@/components/sections/PartsOverview";
import { QuoteSection } from "@/components/sections/QuoteSection";

/**
 * Homepage.
 *
 * Running order: the brand strip, the hero, the showcase, the range, parts,
 * the company introduction, the quote.
 *
 * THE STRIP STAYS ABOVE THE HERO, where it has always been. It was moved below
 * for one revision, on the reasoning that a row of small grey logos is a weak
 * thing to open a page with — the client's call is that it belongs on top, and
 * it does read as a masthead of the three lines rather than as content.
 *
 * The header is NOT overlaid on it, though the plan was to float it there and
 * `Header` still takes `overlay` for the day the artwork suits it. These
 * banners carry their own Burki lockup in the top left and pale sky behind the
 * nav; floating the header put two Burki marks on top of each other and white
 * nav type on white cloud. Hero.tsx carries the full reasoning.
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
      <HomeIntro />
      <Header />
      <main>
        <BrandStrip />
        <Hero />
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
