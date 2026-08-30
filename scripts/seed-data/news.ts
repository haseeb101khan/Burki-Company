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
 * Three of the four link to actual posts, supplied by the client, and carry
 * `isPlaceholder: false`. The Facebook entry has no post behind it yet, so it
 * links to the profile page and stays flagged.
 *
 * The CAPTIONS are the client's descriptions of each post, not the post's own
 * caption text, and no `date` is set on any of them — inventing a posting date
 * would be inventing a fact, and the card simply shows no date until one is
 * supplied. Neither affects where a card sends you.
 *
 * COVER IMAGES are Burki's own photographs of the machine each post is about.
 * A reel's real cover frame is better where one is available: drop it into
 * `public/images/news/` and point `image.src` at it.
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
      "Our Karachi head office on the Super Highway — sales, parts and service from one place.",
    date: null,
    image: {
      src: "/images/banner-company.jpg",
      alt: "The Burki & Company premises in Karachi",
    },
    /* No post supplied for this one yet — goes to the page, not a permalink. */
    href: PROFILES.facebook,
    isPlaceholder: true,
    order: 1,
  },
  {
    id: "nw-02",
    platform: "tiktok",
    caption:
      "Authorised Xinyuan dealers — the C Series wheeled excavator range, imported and supported directly.",
    date: null,
    image: {
      src: "/images/xinyuan/gallery/c120-1.jpg",
      alt: "A Xinyuan C120 wheeled excavator",
    },
    href: "https://www.tiktok.com/@burkicompanyofficial/video/7611448807062015233",
    isPlaceholder: false,
    order: 2,
  },
  {
    id: "nw-03",
    platform: "tiktok",
    caption:
      "The LOAD-X LX-926 wheel loader — a 4.5 tonne machine for yards and sites a full-size loader cannot turn in.",
    date: null,
    image: {
      src: "/brands/Load-x/lx926/lx-926-1.jpg",
      alt: "A LOAD-X LX-926 wheel loader",
    },
    href: "https://www.tiktok.com/@burkicompanyofficial/video/7677577812387106068",
    isPlaceholder: false,
    order: 3,
  },
  {
    id: "nw-04",
    platform: "instagram",
    caption:
      "A customer on the LX-936 wheel loader he took delivery of from Burki & Company.",
    date: null,
    /*
     * The client's preferred cover is the reel's own opening frame, which has
     * not been supplied as a file. This is their photograph of the machine the
     * review is about — the fallback they asked for. To use the real frame,
     * save it to public/images/news/ and change this src.
     */
    image: {
      src: "/brands/Load-x/lx936/lx-936-1.jpg",
      alt: "A LOAD-X LX-936 wheel loader",
    },
    href: "https://www.instagram.com/burki_andcompany/reel/DcRDGb8COTy/",
    isPlaceholder: false,
    order: 4,
  },
];

/** Kept for whichever entry gets a profile link rather than a permalink. */
export const socialProfiles = PROFILES;
