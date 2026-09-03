/**
 * The homepage hero, as data.
 *
 * WHY THIS IS NOT IN THE CMS PIPELINE with the rest of the content. Every other
 * banner on this site carried copy — a headline, a body line, two actions — and
 * belonged in seed data because that copy is editorial. These do not: the
 * artwork already carries the logos, the headline and the tagline, baked in by
 * whoever designed it. There is nothing here for an editor to write. What is
 * left is a list of files and where to crop them, which is layout, and layout
 * lives in the codebase. Add or remove a banner by editing this array.
 *
 * CROPPING IS PER BREAKPOINT, AND IT IS THE WHOLE PROBLEM WITH THESE ASSETS.
 * All three are composed the same way: the Burki lockup and the headline down
 * the left, the machine on the right. They are between 1.5:1 and 1.9:1. A
 * full-bleed hero on a phone is about 0.6:1, so `cover` keeps roughly a third
 * of the width — and a centred crop of a banner composed like this keeps
 * neither end properly.
 *
 * So the phone anchors HARD LEFT, at the edge. 20-28% was tried first and cut
 * the headline mid-word — "POWER THAT MOVES MORE" rendered as "ER THAT ES
 * MORE"; 5-6% still shaved the first letter off the tagline. There is no margin
 * to spend here, because the designer set the type hard against the left of the
 * artwork. The lockup and the headline are what the banner is saying, and losing
 * the tail of a machine costs less than losing the message. Tablets sit between
 * the two. Desktop is wide enough for the whole composition and stays centred.
 *
 * `mobileImage` exists for the better answer: a purpose-composed portrait
 * version of a banner, if one is ever supplied. Set it and the phone uses it
 * instead of cropping the wide one.
 */
export type HeroSlide = {
  id: string;
  image: { src: string; alt: string };
  /** A portrait-composed version, used below `md` in place of cropping. */
  mobileImage?: { src: string; alt: string };
  /** Plays muted; the carousel waits for it to end rather than using the clock. */
  video?: { src: string };
  /** `object-position` at each breakpoint. Defaults to centre. */
  position?: { mobile?: string; tablet?: string; desktop?: string };
};

export const heroSlides: HeroSlide[] = [
  /*
   * The film leads, on the client's instruction. It is the only slide with no
   * baked-in typography — it is a film, and it opens the page moving. The
   * carousel advances when it ends rather than on the dwell clock, so it is
   * never cut off mid-shot.
   */
  {
    id: "xinyuan-film",
    video: { src: "/videos/xinyuan-hero.mp4" },
    image: {
      src: "/images/xinyuan/xinyuan-hero-poster.jpg",
      alt: "Xinyuan wheeled excavators at work",
    },
    position: { mobile: "60% center", tablet: "center", desktop: "center" },
  },
  {
    id: "xinyuan",
    image: {
      src: "/images/hero/xinyuan.webp",
      alt: "Burki & Company and Xinyuan — innovation creates the future. Xinyuan wheeled excavators.",
    },
    position: { mobile: "left center", tablet: "30% center", desktop: "center" },
  },
  {
    id: "load-x",
    image: {
      src: "/images/hero/load-x.webp",
      alt: "Burki & Company and LOAD-X — power that moves more. LOAD-X wheel loaders.",
    },
    position: { mobile: "left center", tablet: "32% center", desktop: "center" },
  },
  {
    id: "xcmg",
    image: {
      src: "/images/hero/xcmg.webp",
      alt: "Burki & Company and XCMG — performance for every jobsite. XCMG wheel loaders.",
    },
    position: { mobile: "left center", tablet: "30% center", desktop: "center" },
  },
];

/** How long a still holds before the next one begins arriving. */
export const HERO_DWELL_MS = 7000;
/** The crossfade itself. Both slides are mounted for its duration. */
export const HERO_FADE_MS = 1050;
