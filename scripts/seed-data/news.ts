import type { NewsPost } from "../../src/lib/data/types";

/**
 * NEWS AND UPDATES — the homepage strip.
 *
 * Curated by hand, in the order the client set. A live feed would mean an API
 * token per platform and a homepage that breaks when one expires — the
 * dependency this site was deliberately built without.
 *
 * WHAT IS REAL AND WHAT IS NOT.
 *
 * Each entry links to a client-supplied Facebook reel and uses its supplied
 * cover image. No date is shown because the publishing dates were not supplied.
 *
 * Tracking parameters (`?is_from_webapp=…&sender_device=pc`, `?igsh=…`) are
 * stripped from every link. They come from whoever copied the URL out of their
 * own browser session and have no business being baked into a public site.
 */

const PROFILES = {
  instagram: "https://www.instagram.com/burki_andcompany",
  tiktok: "https://www.tiktok.com/@burkicompanyofficial",
  facebook: "https://www.facebook.com/share/1HhWiZ7kUQ/",
};

export const news: NewsPost[] = [
  {
    id: "nw-01",
    platform: "facebook",
    caption:
      "AKB Company CEO Haji Allah Yar visits Xinyuan's Karachi head office, inspects the machines and selects the C150W.",
    date: null,
    image: {
      src: "/images/link1 image news.jpeg",
      alt: "Haji Allah Yar visiting the Xinyuan Karachi head office",
    },
    href: "https://www.facebook.com/share/r/1Dau2MxRad/?mibextid=wwXIfr",
    isPlaceholder: false,
    order: 1,
  },
  {
    id: "nw-02",
    platform: "facebook",
    caption:
      "A heavy-equipment veteran from Nawabshah shares his assessment of the Xinyuan wheeled excavator's performance, power, operation and parts.",
    date: null,
    image: {
      src: "/images/load-x/link2 image news.PNG",
      alt: "An experienced operator reviewing a Xinyuan wheeled excavator",
    },
    href: "https://www.facebook.com/share/v/1EmdAokLmF/?mibextid=wwXIfr",
    isPlaceholder: false,
    order: 2,
  },
  {
    id: "nw-03",
    platform: "facebook",
    caption:
      "A customer shares his experience with the LOAD-X LX-936 wheel loader delivered by Burki & Company.",
    date: null,
    image: {
      src: "/images/link3 imagenews.jpeg",
      alt: "A customer with his LOAD-X LX-936 wheel loader",
    },
    href: "https://www.facebook.com/share/v/1ES8kCw5NK/?mibextid=wwXIfr",
    isPlaceholder: false,
    order: 3,
  },
];

/** Kept for whichever entry gets a profile link rather than a permalink. */
export const socialProfiles = PROFILES;
