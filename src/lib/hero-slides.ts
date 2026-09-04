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
 * THESE FILL THE SCREEN AT EVERY SIZE. The three stills are deliberately
 * composed at the same 2:1 ratio as the hero frame, with their logos, copy and
 * machinery held inside a crop-safe centre area.
 *
 * That shared geometry is the Zoomlion-style solution: the artwork and its
 * container agree before responsive cropping begins. A centred `object-cover`
 * therefore fills the frame cleanly without sacrificing meaningful content.
 *
 * Phones keep the same wide banner strip rather than forcing the artwork into
 * a tall viewport-shaped hero. This keeps the intended composition intact.
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
      src: "/images/hero/xinyuan.png",
      alt: "Burki & Company and Xinyuan — innovation creates the future. Xinyuan wheeled excavators.",
    },
    aspect: 2,
    position: { mobile: "center", tablet: "center", desktop: "center" },
    brand: { name: "Xinyuan", slug: "xinyuan" },
  },
  {
    id: "load-x",
    image: {
      src: "/images/hero/loadx.png",
      alt: "Burki & Company and LOAD-X — power that moves more. LOAD-X wheel loaders.",
    },
    aspect: 2,
    position: { mobile: "center", tablet: "center", desktop: "center" },
    brand: { name: "LOAD-X", slug: "load-x" },
  },
  {
    id: "xcmg",
    image: {
      src: "/images/hero/xcmg.png",
      alt: "Burki & Company and XCMG — performance for every jobsite. XCMG wheel loaders.",
    },
    aspect: 2,
    position: { mobile: "center", tablet: "center", desktop: "center" },
    brand: { name: "XCMG", slug: "xcmg" },
  },
];

/**
 * How long a still holds. The film is exempt — it runs to its own end; see
 * Hero.tsx.
 */
export const HERO_DWELL_MS = 5000;
/** The horizontal slide itself. Both slides are mounted for its duration. */
export const HERO_SLIDE_MS = 1400;
