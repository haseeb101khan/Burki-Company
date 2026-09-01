import type {
  SeedBrand as Brand,
  SeedService as Service,
  SeedSiteConfig as SiteConfig,
  SeedStat as Stat,
} from "./types";

/**
 * SEED DATA — input to scripts/seed.ts only. The running site reads Sanity.
 */

/**
 * ADDRESSES AND SOCIAL LINKS ARE THE CLIENT'S OWN. PHONE NUMBERS ARE NOT.
 *
 * Both office addresses and the three social accounts were supplied and are
 * real. The phone and WhatsApp numbers are still invented - correctly
 * formatted for a Karachi business, but not the client's - and
 * `contactIsPlaceholder` keeps a visible notice on the contact page until they
 * are replaced. Email addresses use the client's genuine domain.
 *
 * Positioning is deliberately NATIONWIDE: no country list, no claim to operate
 * only locally, and no export markets named until the client confirms which
 * ones are current.
 */
export const siteConfig: SiteConfig = {
  companyName: "Burki & Company",
  legalName: "Burki & Company",
  tagline: "Heavy equipment, parts and support for the work that builds.",
  foundedYear: 1978,
  founder: {
    name: "Haji Jahanzeb Khan Burki",
    role: "Founder",
    /* The supplied studio portrait, at 1086x1448 — it replaces the 480x600
       placeholder that stood here, which was soft at the size the About page
       prints it. */
    image: {
      src: "/images/about/founder.webp",
      alt: "Haji Jahanzeb Khan Burki, founder of Burki & Company",
    },
  },
  address: {
    line1: "15-16, Highway Trade Centre",
    line2: "Super Highway",
    city: "Karachi",
    country: "Pakistan",
  },
  offices: [
    {
      label: "Karachi",
      line1: "15-16, Highway Trade Centre",
      line2: "Super Highway",
      city: "Karachi",
      country: "Pakistan",
      mapQuery: "Highway Trade Centre, Super Highway, Karachi, Pakistan",
      isPrimary: true,
    },
    {
      label: "Islamabad",
      line1: "Al Madina Plaza",
      line2: "Near Police Station, Tarnol",
      city: "Islamabad",
      country: "Pakistan",
      mapQuery: "Al Madina Plaza, Tarnol, Islamabad, Pakistan",
      isPrimary: false,
    },
  ],
  phone: "+92 21 3456 7890",
  whatsapp: "+92 300 1234567",
  email: "info@burkigroup.com",
  salesEmail: "sales@burkigroup.com",
  hours: "Monday to Saturday, 9:00am to 6:00pm",
  /**
   * Company introduction video. `src` stays null until the client supplies the
   * file; the About block renders the poster with a play badge in the meantime.
   */
  introVideo: {
    src: null,
    poster: "/images/band-about.jpg",
  },
  /*
   * The client's own accounts. LinkedIn and YouTube were placeholder entries
   * pointing at "#" and are gone - an icon that goes nowhere is worse than an
   * icon that is not there. Add them back when those accounts exist.
   */
  socials: [
    {
      id: "so-01",
      platform: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/share/1HhWiZ7kUQ/",
    },
    {
      id: "so-02",
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/burki_andcompany",
    },
    {
      id: "so-03",
      platform: "tiktok",
      label: "TikTok",
      href: "https://www.tiktok.com/@burkicompanyofficial",
    },
  ],
  contactIsPlaceholder: true,
};

/**
 * Only figures that are defensible: the founding period, and facts about this
 * catalogue itself. No invented delivery counts, client numbers or
 * certifications.
 */
export const stats: Stat[] = [
  {
    id: "st-01",
    /*
     * NOT "Established 1978". The founding year is not confirmed - the client
     * says "late 1970s" - and a precise year on a statistics band reads as a
     * fact, not an estimate. Their own copy counts in decades, so this does
     * too, which is true under any founding year in that range.
     */
    label: "Decades in business",
    value: 5,
    description: "Supplying heavy machinery since the late 1970s",
  },
  {
    id: "st-02",
    label: "Offices",
    value: 2,
    description: "Karachi and Islamabad",
  },
  {
    id: "st-03",
    label: "Equipment categories",
    value: 12,
    description: "Excavators through to attachments",
  },
  {
    id: "st-04",
    label: "Brands supplied",
    value: 3,
    description: "Including two sole distributorships",
  },
];

/**
 * THE BRANDS BURKI & COMPANY DISTRIBUTES.
 *
 * REPLACED WHOLESALE. The prototype listed Caterpillar, Komatsu, Hitachi,
 * Volvo, Hino, Sakai, Doosan and Hyundai as "serviced" marques. The client has
 * since confirmed those are NOT lines they supply, so they are gone rather
 * than demoted — showing a manufacturer you do not represent is the specific
 * risk this file used to warn about. WORK MASTER went with them, on the same
 * instruction.
 *
 * These three are the whole list, and it is expected to grow. Adding the fourth
 * is a Studio action, not a deploy.
 *
 * ZOOMLION, SANY AND LIUGONG WERE REMOVED on the client's instruction, the way
 * Caterpillar and the rest were before them: records, marks and mentions, not
 * merely hidden. Showing a manufacturer you do not represent is the specific
 * risk this file exists to warn about, and a hidden record is still a claim
 * sitting in the data waiting to be switched back on by accident.
 *
 * INTROS ARE PROVISIONAL. Each is a short factual line about the manufacturer,
 * written to give the brand catalogue a heading block that is not empty. None
 * of it is client-approved copy and all of it should be replaced.
 *
 * Do not add a manufacturer mark without written authority.
 * `relationshipConfirmed` stays false until a document is on file: Xinyuan has
 * one (Certificate of Authorization No. XYZG2025053, valid to 28 February
 * 2027, shown on the About page), and the rest do not yet.
 */
/** Both silhouette variants of a manufacturer mark, generated by
    scripts/make-brand-logos.mjs from the artwork the client supplied. */
const logoPair = (slug: string) => ({
  navy: `/brand-logos/${slug}-navy.png`,
  white: `/brand-logos/${slug}-white.png`,
});

export const brands: Brand[] = [
  {
    id: "br-xinyuan",
    name: "Xinyuan",
    relationship: "distributed",
    logo: logoPair("xinyuan"),
    showcaseVideoUrl: "/videos/xinyuan-intro.mp4",
    showcaseImages: [
      {
        src: "/images/xinyuan/xinyuan-banner-1.jpg",
        alt: "XINYUAN branding on an excavator boom",
      },
      {
        src: "/images/xinyuan/xinyuan-banner-2.jpg",
        alt: "The Xinyuan headquarters, carrying the company values on its facade",
      },
      {
        src: "/images/xinyuan/xinyuan-banner-3.jpg",
        alt: "The Xinyuan manufacturing plant from the air",
      },
    ],
    manufacturerLegalName: "Fujian Xinyuan Heavy Industry Co., Ltd.",
    /* Certificate of Authorization No. XYZG2025053 names Burki & Company the
       regional distributor for Pakistan, 1 Mar 2025 - 28 Feb 2027. */
    relationshipConfirmed: true,
    countryOfOrigin: "China",
    website: "https://www.xinyuanexcavator.com",
    shortDescription:
      "Founded in 1990, Xinyuan built China's first 5-tonne 360° full-rotation wheeled hydraulic excavator and now specialises in machines from 5 to 15 tonnes. The C Series runs on a digital plant with robot welding, CNC machining and automated coating, and carries a deep attachment range designed around the same carriers.",
    showInBrandStrip: true,
    isFeatured: true,
    order: 1,
  },
  {
    id: "br-load-x",
    name: "LOAD-X",
    relationship: "distributed",
    logo: null,
    /* The yard, supplied by the client — it replaces the homepage line-up shot
       that briefly stood here. 1.93:1 against the 16:10 both uses render, so
       it is cropped to a centred 848x530 window, which costs 88px each side
       and keeps the full depth of the yard. */
    showcaseImages: [
      {
        src: "/images/load-x/loadx-yard.webp",
        alt: "The Burki & Company yard, ranks of LOAD-X wheel loaders either side of the aisle",
      },
    ],
    countryOfOrigin: "China",
    shortDescription:
      "Compact and mid-range wheel loaders, from yard machines to the 5-tonne class. Burki & Company is the nationwide distributor.",
    showInBrandStrip: true,
    isFeatured: true,
    order: 2,
  },
  {
    id: "br-xcmg",
    name: "XCMG",
    relationship: "distributed",
    logo: logoPair("xcmg"),
    /* The supplied banner is 4.78:1 — a strip of the group's signage. Both
       places that use it (the brand catalogue header and the homepage
       showcase) render 16:10, so it is cropped to the sign rather than
       letterboxed; see the note in the git history for the window used. */
    showcaseImages: [
      {
        src: "/images/xcmg/xcmg-banner.webp",
        alt: "XCMG group signage on the company's building",
      },
    ],
    manufacturerLegalName: "Xuzhou Construction Machinery Group Co., Ltd.",
    countryOfOrigin: "China",
    website: "https://www.xcmg.com",
    shortDescription:
      "One of the largest construction equipment manufacturers in the world, with a range spanning earthmoving, lifting and road machinery.",
    showInBrandStrip: true,
    isFeatured: true,
    order: 3,
  },
];

/* Business partners now live in ./partners.ts, with their artwork. */

export const services: Service[] = [
  {
    id: "sv-01",
    slug: "equipment-consultation",
    name: "Equipment Consultation",
    description:
      "Specifying the right machine for the job before it is bought, based on the material, cycle and site conditions you are actually working with.",
    points: [
      "Machine class and capacity matched to the duty cycle",
      "Attachment and configuration advice",
      "Fleet planning across mixed contracts",
    ],
    order: 1,
  },
  {
    id: "sv-02",
    slug: "parts-support",
    name: "Parts Support",
    description:
      "Filters, wear parts and driveline components held locally, so the common failures do not become long delays.",
    points: [
      "Fast-moving consumables held in stock",
      "Part identification from machine model and serial",
      "Sourcing for units outside the regular range",
    ],
    order: 2,
  },
  {
    id: "sv-03",
    slug: "maintenance-repair",
    name: "Maintenance and Repair",
    description:
      "Scheduled servicing and repair work, planned around your programme rather than carried out only once a machine has stopped.",
    points: [
      "Preventive service schedules by operating hours",
      "Diagnostic and repair support",
      "Component overhaul and replacement",
    ],
    order: 3,
  },
  {
    id: "sv-04",
    slug: "after-sales-support",
    name: "After-Sales Support",
    description:
      "The relationship after the invoice: commissioning, operator familiarisation and a direct line when something needs attention.",
    points: [
      "Handover and commissioning on delivery",
      "Operator and maintenance familiarisation",
      "Direct contact for ongoing technical questions",
    ],
    order: 4,
  },
];
