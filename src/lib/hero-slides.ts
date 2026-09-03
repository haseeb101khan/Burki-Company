/**
 * The homepage hero, as data.
 *
 * WHY THIS IS NOT IN THE CMS PIPELINE with the rest of the content. Every other
 * banner on this site carried copy — a headline, a body line, two actions — and
 * belonged in seed data because that copy is editorial. These do not: the
 * artwork already carries the logos, the headline and the tagline, baked in by
 * whoever designed it. There is nothing here for an editor to write. What is
 * left is a list of files and how to fit them, which is layout, and layout
 * lives in the codebase. Add or remove a banner by editing this array.
 *
 * NOTHING IS CROPPED. An earlier pass ran these full-bleed with `object-cover`
 * and a per-breakpoint crop anchor, and it cut the artwork: on a tall frame the
 * "Burki & Company | LOAD-X" lockup was sliced off the top, and on a phone the
 * headline lost its first letters. That is the wrong trade for artwork with the
 * type baked into it. The hero now sizes itself from the pictures — the way the
 * banner carousel it replaced did — and every banner is shown entire.
 *
 * `aspect` is the file's true ratio, and it is what the frame is shaped from;
 * see the note on the container in Hero.tsx. The film is the exception and
 * still fills the frame, because footage has no typography to protect.
 */
export type HeroSlide = {
  id: string;
  image: { src: string; alt: string };
  /** Intrinsic width / height. Drives how the frame is sized. */
  aspect: number;
  /** A portrait-composed version, used below `md` if one is ever supplied. */
  mobileImage?: { src: string; alt: string };
  /** Plays muted, and fills the frame rather than fitting inside it. */
  video?: { src: string };
  /** Crop anchor — only consulted for the film, the one slide that crops. */
  position?: { mobile?: string; tablet?: string; desktop?: string };
};

export const heroSlides: HeroSlide[] = [
  /*
   * The film leads, on the client's instruction. It is the only slide with no
   * baked-in typography, so it is also the only one allowed to crop: it fills
   * the frame at every size instead of fitting inside it.
   */
  {
    id: "xinyuan-film",
    video: { src: "/videos/xinyuan-hero.mp4" },
    image: {
      src: "/images/xinyuan/xinyuan-hero-poster.jpg",
      alt: "Xinyuan wheeled excavators at work",
    },
    aspect: 1920 / 822,
    position: { mobile: "60% center", tablet: "center", desktop: "center" },
  },
  {
    id: "xinyuan",
    image: {
      src: "/images/hero/xinyuan.webp",
      alt: "Burki & Company and Xinyuan — innovation creates the future. Xinyuan wheeled excavators.",
    },
    aspect: 1090 / 603,
  },
  {
    id: "load-x",
    image: {
      src: "/images/hero/load-x.webp",
      alt: "Burki & Company and LOAD-X — power that moves more. LOAD-X wheel loaders.",
    },
    /* The squarest of the three by some way, and the reason one frame shape
       cannot sit edge-to-edge against all four at once. */
    aspect: 908 / 601,
  },
  {
    id: "xcmg",
    image: {
      src: "/images/hero/xcmg.webp",
      alt: "Burki & Company and XCMG — performance for every jobsite. XCMG wheel loaders.",
    },
    aspect: 1143 / 603,
  },
];

/**
 * How long a banner holds. Every banner, including the film — the instruction
 * is that nothing sits longer than five seconds, so the film is cut on the same
 * clock rather than being allowed to run to its own end.
 */
export const HERO_DWELL_MS = 5000;
/** The crossfade itself. Both slides are mounted for its duration. */
export const HERO_FADE_MS = 900;
