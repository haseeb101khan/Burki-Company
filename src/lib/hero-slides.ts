/**
 * The homepage hero, as data.
 *
 * WHY THIS IS NOT IN THE CMS PIPELINE with the rest of the content. The
 * headline, tagline and lockup are baked into the artwork by whoever designed
 * it, so there is no copy here for an editor to write — only a list of files,
 * how to fit them, and the brand each one drives its two buttons to, which is
 * layout and lives in the codebase. Add or remove a banner by editing this
 * array.
 *
 * THESE FILL THE SCREEN, AND THE CROP COMES OUT OF THE EMPTY PARTS. Two
 * earlier passes both got this wrong in opposite directions: the first cropped
 * blindly to a tall frame and sliced the "Burki & Company" lockup off the top;
 * the second refused to crop at all and left navy margins down the sides. Bars
 * are not an option — a hero that does not reach the edge of the screen looks
 * broken, whatever the reason for it.
 *
 * What makes filling possible from `md` up is that the frame is close to the
 * artwork's own shape, so there is barely anything to cut:
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
 * PHONES DO NOT SHARE THAT FRAME. A phone is roughly 0.6:1 and these banners
 * are 1.5:1 to 1.9:1 — there is no height short enough to keep the frame close
 * to the artwork's shape the way `md` does, so the trade flips: give up a
 * generous chunk of an immersive hero to keep the crop tight, or give up an
 * immersive hero to keep more of the picture. Height wins. Hero.tsx sizes the
 * phone frame in `svh` rather than from these ratios, tall enough to feel like
 * a hero, and `position.mobile` is horizontal-only — hard left, because at that
 * aspect gap it is ALWAYS the sides that are cropped, never the top or bottom,
 * so the lockup and headline (which sit at the left of every banner) survive
 * complete and it is the tail of the machine that goes.
 *
 * `aspect` is the file's true ratio. It drives the `md`-and-up frame and says
 * how much each banner has to give up there.
 */
export type HeroSlide = {
  id: string;
  image: { src: string; alt: string };
  /** Intrinsic width / height. Drives the frame from `md` up. */
  aspect: number;
  /** A portrait-composed version, used below `md` if one is ever supplied. */
  mobileImage?: { src: string; alt: string };
  /** Plays muted, and fills the frame rather than fitting inside it. */
  video?: { src: string };
  /** Crop anchor per breakpoint. Defaults to centre. */
  position?: { mobile?: string; tablet?: string; desktop?: string };
  /** Drives the two buttons under the frame: "View {name} Full Range" to
      `/equipment/{slug}`, and Request a Quote alongside it. */
  brand: { name: string; slug: string };
};

export const heroSlides: HeroSlide[] = [
  /*
   * The film leads, on the client's instruction, and the frame is shaped to it
   * — the stills are fitted to the film's proportions rather than the other way
   * round. It is the one slide with no baked-in typography, so it is also the
   * one that can be anchored anywhere without consequence. It runs to its own
   * end rather than the dwell clock; see the note in Hero.tsx.
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
    brand: { name: "Xinyuan", slug: "xinyuan" },
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
    brand: { name: "Xinyuan", slug: "xinyuan" },
  },
  {
    id: "load-x",
    image: {
      src: "/images/hero/load-x.webp",
      alt: "Burki & Company and LOAD-X — power that moves more. LOAD-X wheel loaders.",
    },
    /* The squarest of the three by some way, and so the only one where filling
       the `md` frame costs anything real: 18.8% of its height. */
    aspect: 908 / 601,
    /* 40%, not 50%, on tablet/desktop. A centred crop would take 9.4% off the
       top, and only the top 8% is bare sky — the next slice down is the
       lockup. Pulling the window up spends the cut on the gravel at the
       bottom instead, which is carrying nothing. Mobile crops the sides only
       (see the file note), so it stays centred vertically. */
    position: { mobile: "left center", tablet: "center 40%", desktop: "center 40%" },
    brand: { name: "LOAD-X", slug: "load-x" },
  },
  {
    id: "xcmg",
    image: {
      src: "/images/hero/xcmg.webp",
      alt: "Burki & Company and XCMG — performance for every jobsite. XCMG wheel loaders.",
    },
    aspect: 1143 / 603,
    /* Wider than the `md` frame, so this one is trimmed on the sides there,
       not the top — about 2% of its width, off a sky that runs to the edge. */
    position: { mobile: "left center", tablet: "center", desktop: "center" },
    brand: { name: "XCMG", slug: "xcmg" },
  },
];

/**
 * How long a still holds. The film is exempt — it runs to its own end; see
 * Hero.tsx.
 */
export const HERO_DWELL_MS = 5000;
/** The crossfade itself. Both slides are mounted for its duration. */
export const HERO_FADE_MS = 900;
