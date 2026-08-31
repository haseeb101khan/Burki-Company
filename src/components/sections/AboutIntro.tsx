import { getSiteConfig } from "@/lib/data";
import { AboutIntroCards, type IntroCard } from "./AboutIntroCards";

/**
 * Company introduction block.
 *
 * Three cards: where the business started, where it stands now, and why buyers
 * come back. Copy is kept plain and factual — no origin-story flourishes, and
 * no claims about clients or territories that have not been confirmed.
 */
export async function AboutIntro() {
  const site = await getSiteConfig();

  const cards: IntroCard[] = [
    {
      id: "start",
      title: "Where we started",
      body: "Burki & Company was founded in the late 1970s in Karachi, dealing in dumper trucks alone. The business grew from there under its founder into a supplier of almost every class of earthmoving machinery.",
      portrait: {
        src: site.founder.image.src,
        alt: site.founder.image.alt,
        name: site.founder.name,
        role: site.founder.role,
      },
    },
    {
      id: "today",
      title: "Where we stand today",
      body: "We supply and support excavators, loaders, haulage, compaction and material handling equipment, holding distributorships for a growing list of manufacturers — Xinyuan, LOAD-X, XCMG, Zoomlion, SANY and Liugong — with parts and service behind every line we carry.",
    },
    {
      id: "why",
      title: "Why buyers come back",
      body: "Because the relationship does not end at delivery. Machines are specified for the job in front of them, fast-moving parts are held in stock, and there is a direct line to someone technical when a machine is down.",
    },
  ];

  return (
    <AboutIntroCards
      cards={cards}
      aside={{
        src: "/images/about/burki-office.webp",
        alt: "The Burki & Company office, with the Burki Group of Companies name board on the wall",
      }}
    />
  );
}
