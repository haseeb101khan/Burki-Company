import type { Partner } from "../../src/lib/data/types";

/**
 * BUSINESS PARTNERS — the client wall.
 *
 * Artwork supplied by the client and normalised by
 * `node scripts/prepare-partners.mjs` onto one 440x220 white canvas each, so a
 * tall mark and a wide wordmark occupy the same optical space in a row.
 *
 * NAMES ARE READ OFF THE ARTWORK ITSELF, not from the filename. Several of the
 * files are named by initials only ("GDA", "FWO"), and the logo is the reliable
 * source for what the company is actually called.
 *
 * The names are alt text and are NOT printed under the logos. A wall of marks
 * with a caption under each invites a misspelling of somebody else's company
 * name; the logos already say who they are.
 *
 * ONE SUPPLIED FILE IS STILL NOT HERE. Faisalabad Oil Refinery arrived as a
 * sales representative's business card — a named individual's personal email
 * address on it, and a directory site's watermark diagonally across the company
 * name, so it cannot be cropped down to the wordmark either. It goes in as soon
 * as the company's actual mark arrives, and takes the wall to fifteen and three
 * full rows. See the SKIP list in scripts/prepare-partners.mjs.
 *
 * THE LAST FOUR WERE ADDED ON THE CLIENT'S INSTRUCTION. Three of them — NKB,
 * ZKB, SKB — had been held back in an earlier pass because the artwork shows
 * two Swiss cantonal banks and a US flight-case manufacturer rather than
 * anything obviously connected to heavy equipment in Pakistan. The client
 * re-supplied all three and confirmed they belong. Their names below are read
 * off the artwork, as every other name here is: if the mark and the company
 * were ever to disagree, the alt text is where it would be visible rather than
 * hidden.
 */
export const partners: Partner[] = [
  {
    id: "pt-fwo",
    name: "Frontier Works Organization (FWO)",
    logo: "/images/partners/fwo.webp",
    confirmed: true,
    order: 1,
  },
  {
    id: "pt-habib-rafiq",
    name: "Habib Rafiq Engineering (Pvt) Limited",
    logo: "/images/partners/habib-rafiq.webp",
    confirmed: true,
    order: 2,
  },
  {
    id: "pt-d-baloch",
    name: "Sardar Mohammad Ashraf D. Baluch (Pvt) Ltd",
    logo: "/images/partners/d-baloch.webp",
    confirmed: true,
    order: 3,
  },
  {
    id: "pt-paragon",
    name: "Paragon Constructors (Pvt) Ltd",
    logo: "/images/partners/paragon.webp",
    confirmed: true,
    order: 4,
  },
  {
    id: "pt-ace",
    name: "ACE",
    logo: "/images/partners/ace.webp",
    confirmed: true,
    order: 5,
  },
  {
    id: "pt-gda",
    name: "Galiyat Development Authority, Abbottabad",
    logo: "/images/partners/gda.webp",
    confirmed: true,
    order: 6,
  },
  {
    id: "pt-pdma",
    /* The artwork is the Government of Balochistan crest; the file is named
       PDMA, the province's disaster management authority. */
    name: "PDMA, Government of Balochistan",
    logo: "/images/partners/pdma.webp",
    confirmed: true,
    order: 7,
  },
  {
    id: "pt-ghani-dairies",
    name: "Ghani Dairies Limited",
    logo: "/images/partners/ghani-dairies.webp",
    confirmed: true,
    order: 8,
  },
  {
    id: "pt-kisan",
    name: "Kisan Cooking Oil",
    logo: "/images/partners/kisan-cooking-oil.webp",
    confirmed: true,
    order: 9,
  },
  {
    id: "pt-shaheen-wood",
    name: "Shaheen Wood Industries (Pvt) Ltd",
    logo: "/images/partners/shaheenwood.webp",
    confirmed: true,
    order: 10,
  },
  {
    id: "pt-h2-ready-mix",
    name: "H2 Ready Mix",
    logo: "/images/partners/h2-ready-mix.webp",
    confirmed: true,
    order: 11,
  },
  {
    id: "pt-nkb",
    name: "Nidwaldner Kantonalbank",
    logo: "/images/partners/nkb.webp",
    confirmed: true,
    order: 12,
  },
  {
    id: "pt-zkb",
    name: "Zürcher Kantonalbank",
    logo: "/images/partners/zkb.webp",
    confirmed: true,
    order: 13,
  },
  {
    id: "pt-skb",
    name: "SKB Cases",
    logo: "/images/partners/skb.webp",
    confirmed: true,
    order: 14,
  },
];
