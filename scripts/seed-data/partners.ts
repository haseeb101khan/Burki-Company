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
 * FOUR SUPPLIED FILES ARE NOT HERE. Three carry the wrong company's logo
 * entirely and one is a business card rather than a mark — see the SKIP list in
 * scripts/prepare-partners.mjs for what each actually shows. They go in as soon
 * as correct artwork arrives.
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
];
