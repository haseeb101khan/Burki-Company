import type { BannerCta, ImageRef } from "../../src/lib/data/types";

/**
 * SEED DATA — input to scripts/seed.ts only. The running site reads Sanity.
 *
 * Photography here is the client's own: the Karachi premises and yard, not
 * stock. Final banner artwork is still to come, but these are authentic.
 *
 * The WORK MASTER panel and both WORK MASTER machine slides were removed with
 * the brand. Xinyuan gets a panel of its own once artwork is supplied.
 *
 * Two kinds of slide:
 *   "custom"    — a hand-written promotional panel
 *   "equipment" — generated from a catalogue record, so the copy and key
 *                 figures stay correct when the machine data is replaced
 */
export type BannerSource =
  | {
      kind: "custom";
      id: string;
      order: number;
      image: ImageRef;
      eyebrow: string;
      title: string;
      /*
       * NOT RENDERED on the banner any more - it carries a headline and the
       * two actions, nothing else. Both are kept because the shape is shared
       * with machine slides, which build them from a machine's own figures.
       */
      meta?: string;
      body: string;
      primary: BannerCta;
      secondary: BannerCta;
      /** Optional film. Plays muted; the carousel waits for it to finish. */
      video?: { src: string };
    }
  | {
      kind: "equipment";
      id: string;
      order: number;
      equipmentSlug: string;
    };

/** Every banner carries this as its second action. */
const ALL_EQUIPMENT: BannerCta = { label: "View All Equipment", href: "/equipment" };

export const banners: BannerSource[] = [
  /*
   * The opening slide is a film, playing muted from the moment the page loads.
   * Its `image` is the poster frame, shown until the first video frame decodes,
   * so the banner is never a black rectangle. The carousel moves on when the
   * film ends rather than on its usual clock.
   */
  {
    kind: "custom",
    id: "bn-xinyuan-film",
    order: 0,
    video: { src: "/videos/xinyuan-hero.mp4" },
    image: {
      src: "/images/xinyuan/xinyuan-hero-poster.jpg",
      alt: "Xinyuan wheeled excavators at work",
    },
    eyebrow: "Xinyuan",
    title: "Wheeled excavators",
    meta: "C Series",
    body: "The C Series, imported and supported directly by Burki & Company — with the attachment range designed around the same carriers.",
    primary: { label: "View The Range", href: "/equipment/xinyuan" },
    secondary: ALL_EQUIPMENT,
  },
  {
    kind: "custom",
    id: "bn-company",
    order: 1,
    image: {
      src: "/images/banner-company.jpg",
      alt: "The Burki & Company premises in Karachi with a line of wheel loaders outside",
    },
    eyebrow: "Welcome",
    title: "Burki & Company",
    meta: "Heavy equipment · Parts · After-sales support",
    body: "Four decades supplying earthmoving and construction machinery from our Karachi headquarters, with the parts and service behind it to keep every machine earning.",
    primary: ALL_EQUIPMENT,
    secondary: { label: "More About Us", href: "/about" },
  },
  {
    kind: "custom",
    id: "bn-load-x",
    order: 2,
    image: {
      src: "/images/banner-load-x.jpg",
      alt: "A line of LOAD-X wheel loaders and excavators at Burki & Company",
    },
    eyebrow: "Load-X",
    title: "Sole nationwide dealer",
    meta: "Compact yard machines to the 5-tonne class",
    body: "Burki & Company holds the LOAD-X distributorship nationwide. We bring the machines in, commission them and stock the wear parts they run through, so the loader and its parts come from the same place.",
    primary: { label: "View All Models", href: "/equipment/load-x" },
    secondary: ALL_EQUIPMENT,
  },

  /* A machine slide, built from the record's own figures so it cannot go stale.
     Xinyuan gets a panel of its own once artwork is supplied. */
  { kind: "equipment", id: "bn-lx-936", order: 3, equipmentSlug: "lx-936" },
];
