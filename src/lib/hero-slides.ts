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
 * THESE FILL THE SCREEN, AND THE CROP COMES OUT OF THE EMPTY PARTS. Two
 * earlier passes both got this wrong in opposite directions: the first cropped
 * blindly to a tall frame and sliced the "Burki & Company" lockup off the top;
 * the second refused to crop at all and left navy margins down the sides. Bars
 * are not an option — a hero that does not reach the edge of the screen looks
 * broken, whatever the reason for it.
 *
 * What makes filling possible is that the frame is close to the artwork's own
 * shape, so there is barely anything to cut:
 *
 *   xinyuan  1.81  loses 2.8% of its height   — nothing in it
 *   xcmg     1.90  already wider than the frame, loses ~2% of its width
 *   load-x   1.51  loses 18.8% of its height  — the one that needs thought
 *
 * LOAD-X is squarer than the other two and is the only one where the crop is
 * real. It can afford it because it is not evenly filled: measured on the file,
 * the top 8% is bare sky above the lockup and the bottom 4% is bare gravel, and
 * the gravel above that line carries nothing either. So its anchor pulls the
 * window UP — the cut is 8% of sky off the top and the rest off the gravel at
 * the bottom, and the lockup, headline, tagline and machine all survive intact.
 * That is what `position` is for; it is a measurement, not a preference.
 *
 * Phones use a squarer frame and anchor hard left, because a 1.86 frame on a
 * 390px screen is a 210px letterbox strip and the baked-in headline is
 * unreadable at that size. Left-anchored, the type is full height and it is the
 * far end of the machine that goes.
 *
 * `aspect` is the file's true ratio. It is not what the frame is shaped from
 * any more, but it is what says how much each banner has to give up, so it
 * stays recorded here.
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
  /** Crop anchor per breakpoint. Defaults to centre. */
  position?: { mobile?: string; tablet?: string; desktop?: string };
};

export const heroSlides: HeroSlide[] = [
  /*
   * The film leads, on the client's instruction, and the frame is shaped to it
   * — the stills are fitted to the film's proportions rather than the other way
   * round. It is the one slide with no baked-in typography, so it is also the
   * one that can be anchored anywhere without consequence.
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
    /* 2.8% off the height at most, and the composition is centred. */
    position: { mobile: "left center", tablet: "center", desktop: "center" },
  },
  {
    id: "load-x",
    image: {
      src: "/images/hero/load-x.webp",
      alt: "Burki & Company and LOAD-X — power that moves more. LOAD-X wheel loaders.",
    },
    /* The squarest of the three by some way, and so the only one where filling
       the frame costs anything real: 18.8% of its height. */
    aspect: 908 / 601,
    /* 40%, not 50%. A centred crop would take 9.4% off the top, and only the
       top 8% is bare sky — the next slice down is the lockup. Pulling the
       window up spends the cut on the gravel at the bottom instead, which is
       carrying nothing. */
    position: { mobile: "left center", tablet: "center 40%", desktop: "center 40%" },
  },
  {
    id: "xcmg",
    image: {
      src: "/images/hero/xcmg.webp",
      alt: "Burki & Company and XCMG — performance for every jobsite. XCMG wheel loaders.",
    },
    aspect: 1143 / 603,
    /* Wider than the frame, so this one is trimmed on the sides, not the top —
       about 2% of its width, off a sky that runs to the edge. */
    position: { mobile: "left center", tablet: "center", desktop: "center" },
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
