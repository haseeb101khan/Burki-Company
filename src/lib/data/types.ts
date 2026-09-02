/**
 * Domain types for the Burki & Company site.
 *
 * These are the *contract* between the data layer and the UI. Pages and
 * components consume only these shapes, never the underlying source files, so
 * the backing store can move from local TS modules to a headless CMS (Sanity)
 * without any page or component changing.
 */

/** An image reference. `src` is a path under /public today, a CDN URL later. */
export interface ImageRef {
  src: string;
  alt: string;
  /** Optional focal hint for art-directed crops (e.g. "center", "70% 40%"). */
  focus?: string;
}

/**
 * A video that sits in the detail-page gallery alongside the photos.
 *
 * `poster` is what the thumbnail and the pre-play frame show, so a video entry
 * still looks right before anything is downloaded.
 */
export interface VideoRef {
  src: string;
  /** Frame shown before play, and in the thumbnail strip. */
  poster: ImageRef;
  /** Short label for the thumbnail's accessible name, e.g. "Walkaround". */
  title: string;
}

/** A single spec row, e.g. { label: "Operating weight", value: "10,800", unit: "kg" } */
export interface Spec {
  label: string;
  value: string;
  unit?: string;
}

/** Specs grouped into titled blocks for the detail-page table. */
export interface SpecGroup {
  title: string;
  specs: Spec[];
}

/** A short "key number" shown on cards and in the detail overview. */
export interface Highlight {
  label: string;
  value: string;
  unit?: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface EquipmentCategory {
  id: string;
  slug: string;
  name: string;
  /** Short label for nav and chips, e.g. "Loaders". Falls back to `name`. */
  shortName?: string;
  description: string;
  image: ImageRef;
  order: number;
}

export interface Equipment {
  id: string;
  slug: string;
  /** Model designation, e.g. "LX-926". */
  model: string;
  /** Full display name, e.g. "LX-926 Wheel Loader". */
  name: string;
  categorySlug: string;
  /** Category display name, resolved from the reference. Saves a second lookup. */
  categoryName?: string;
  /** Brand display name, e.g. "Xinyuan". Kept as a string so every existing
   *  consumer — banners, the orbit, the brand page filter — is unchanged. */
  brand: string;
  /** Brand slug, for URLs and filter state. e.g. "xinyuan". */
  brandSlug: string;
  series?: string;
  /** Short line under the model name, e.g. "Built to load, all day". */
  tagline?: string;
  summary: string;
  description: string;
  /** General-purpose photo: listing grids, brand pages, cross-links. */
  image: ImageRef;
  /**
   * Homepage "hot" card photo, when it should differ from the general-purpose
   * `image` — typically a dedicated white-background studio shot, which reads
   * as a premium product shot but looks out of place mixed into an on-site
   * detail-page gallery. Falls back to `image` when absent.
   */
  featuredImage?: ImageRef;
  /** Second frame revealed on hover in the homepage "hot" card. */
  featuredHoverImage?: ImageRef;
  /**
   * Isolated machine on a plain white ground, used by the variant orbit where
   * the image has no container and must dissolve into the white section. Falls
   * back to `featuredImage` / `image`, which get a soft edge mask instead.
   */
  cutoutImage?: ImageRef;
  /** Photos for the equipment detail page gallery. On-site shots, not the
   * homepage studio shot — see `featuredImage`. */
  gallery: ImageRef[];
  /**
   * Walkaround / working footage for the detail-page gallery, shown after the
   * photos. Empty until the client supplies files; the gallery simply renders
   * the photos in the meantime.
   */
  videos?: VideoRef[];
  highlights: Highlight[];
  specs: SpecGroup[];
  features: Feature[];
  relatedEquipmentSlugs: string[];
  isFeatured: boolean;
  /**
   * True while specs are representative rather than client-confirmed.
   * Nothing renders a "placeholder" badge — this exists so real data can be
   * audited and swapped in with confidence.
   */
  isPlaceholder: boolean;
  order: number;
}

export interface PartCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: ImageRef;
  order: number;
}

export interface Part {
  id: string;
  slug: string;
  name: string;
  partNumber: string;
  categorySlug: string;
  categoryName?: string;
  /**
   * Optional by design: a filter or seal kit may be generic and fit machines
   * from several manufacturers. Forcing a brand on it would make the catalogue
   * claim something untrue.
   */
  brand?: string;
  brandSlug?: string;
  summary: string;
  image: ImageRef;
  /** Additional photos beyond the main one. */
  images?: ImageRef[];
  /** True for a manufacturer-supplied part, false for an aftermarket equivalent. */
  isGenuine?: boolean;
  attributes: Spec[];
  /**
   * Single source of truth for the Equipment <-> Parts relationship.
   * `getCompatibleParts(equipmentSlug)` derives the reverse direction, so the
   * two sides can never drift apart.
   */
  compatibleEquipmentSlugs: string[];
  isPlaceholder: boolean;
  order: number;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  points: string[];
  order: number;
}

/**
 * A manufacturer whose equipment Burki & Company distributes or services.
 *
 * An open-ended, growing list — six today, more to follow — which is why it is
 * a CMS record rather than a union type in code.
 */
export interface Brand {
  id: string;
  slug: string;
  name: string;
  /** "distributed" = a line we import and sell; "serviced" = a marque we support. */
  relationship: "distributed" | "serviced";
  /**
   * Supplied logo artwork as a matched pair, or null to fall back to a
   * typographic plate. Both variants are silhouettes on identical canvases, so
   * every brand renders at the same box size and optical weight.
   */
  logo: { navy: string; white: string } | null;
  /** Photography for the homepage brand showcase — the factory, a machine detail. */
  showcaseImages: ImageRef[];
  /** Brand introduction film, played on the catalogue page. Null when none. */
  showcaseVideoUrl: string | null;
  shortDescription?: string;
  countryOfOrigin?: string;
  /** Full legal manufacturer name, where it differs from the marque. */
  manufacturerLegalName?: string;
  website?: string;
  /** Whether the distributorship or service agreement is confirmed in writing. */
  relationshipConfirmed: boolean;
  /** Whether this brand appears in the homepage logo rail. */
  showInBrandStrip: boolean;
  isFeatured: boolean;
  order: number;
}

/** A brand plus how many machines sit behind it — for catalogue filter chips. */
export interface BrandWithCount extends Brand {
  equipmentCount: number;
}

/**
 * A business partner or institutional client, shown as proof of standing.
 * Never populate this with names that have not been confirmed by the client.
 */
export interface Partner {
  id: string;
  name: string;
  logo: string | null;
  /** Only render a name publicly once permission to do so is on file. */
  confirmed?: boolean;
  order: number;
}

export interface Stat {
  id: string;
  label: string;
  /** Numeric target for the animated counter. */
  value: number;
  prefix?: string;
  suffix?: string;
  description?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  href: string;
}

/** One office. `mapQuery` is the search string a map provider is given. */
export interface Office {
  label: string;
  line1: string;
  line2?: string;
  city: string;
  country: string;
  mapQuery: string;
  isPrimary: boolean;
}

export interface SiteConfig {
  companyName: string;
  legalName: string;
  tagline: string;
  /**
   * Null until the client confirms it. The brief records only "late 1970s"
   * from the old site, so anything printed here would be a guess presented as
   * a fact — every consumer must handle the null.
   */
  foundedYear: number | null;
  founder: {
    name: string;
    role: string;
    image: ImageRef;
  };
  address: {
    line1: string;
    line2?: string;
    city: string;
    country: string;
  };
  phone: string;
  whatsapp: string;
  email: string;
  salesEmail: string;
  hours: string;
  /** Company introduction video. `src` null until the client supplies the file. */
  introVideo: {
    src: string | null;
    poster: string;
  };
  socials: SocialLink[];
  /** True while contact details are placeholders pending client confirmation. */
  contactIsPlaceholder: boolean;
}

/* ────────────────────────────────────────────────── company info ───────── */

/** A place of business — head office, yard, branch. */
export interface Location {
  label: string;
  line1?: string;
  line2?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  /** Search string handed to a map provider. */
  mapQuery?: string;
  /** The address used site-wide: footer, contact page, structured data. */
  isPrimary: boolean;
}

export interface BusinessHours {
  days: string;
  hours: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  note?: string;
  year?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description?: string;
}

/**
 * The full company record behind the About page and every site-wide detail.
 *
 * EVERYTHING HERE IS NULLABLE EXCEPT `companyName`. Most of it is still
 * unconfirmed by the client, and the About page renders section by section,
 * skipping whatever is empty. A half-filled record produces a shorter page,
 * never a broken one — which is the difference between shipping now and
 * waiting on a content pass.
 *
 * `SiteConfig` is derived from this for the header, footer and contact page,
 * so those keep the exact shape they had in the prototype.
 */
export interface CompanyInfo {
  companyName: string;
  legalName: string | null;
  tagline: string | null;
  foundedYear: number | null;
  founder: {
    name: string | null;
    role: string | null;
    image: ImageRef | null;
  };
  /** Paragraphs, already split. Empty array when no story has been supplied. */
  story: string[];
  mission: string | null;
  milestones: Milestone[];
  certifications: Certification[];
  regionsServed: string[];
  locations: Location[];
  /** The primary location, or the first one, or null. */
  primaryLocation: Location | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  salesEmail: string | null;
  businessHours: BusinessHours[];
  socials: SocialLink[];
  contactIsPlaceholder: boolean;
  introVideo: {
    src: string | null;
    poster: ImageRef | null;
  };
  stats: Stat[];
}

/**
 * One social post surfaced on the homepage news strip.
 *
 * Curated, not fetched. A live feed would mean an API token per platform and a
 * homepage that stops working when one expires - the dependency the site was
 * deliberately built without. These are chosen by hand and rebuilt with the
 * rest of the content.
 */
export interface NewsPost {
  id: string;
  /** "instagram" | "tiktok" | "facebook" - drives the badge and its icon. */
  platform: string;
  /** The post's caption, as shown on the card. */
  caption: string;
  /** ISO date. Null when it is not known - the card then shows no date. */
  date: string | null;
  image: ImageRef;
  /** The post on the platform it was published to. */
  href: string;
  /** True while this is a stand-in used to show the layout. */
  isPlaceholder: boolean;
  order: number;
}

/** A call to action on a homepage banner. */
export interface BannerCta {
  label: string;
  href: string;
}

/**
 * A homepage banner slide, already resolved for rendering.
 *
 * Slides come from two places — hand-written promotional panels and machine
 * records pulled from the catalogue — but reach the carousel in this one shape,
 * so the component never branches on where a slide came from.
 */
export interface Banner {
  id: string;
  image: ImageRef;
  /**
   * A film that plays in place of the still, muted and autoplaying.
   *
   * A slide carrying one hands its timing to the video: the carousel advances
   * when the film ends rather than on the fixed interval, so the clip is never
   * cut off halfway. `image` stays populated and acts as the poster.
   */
  video?: { src: string };
  eyebrow: string;
  title: string;
  /** Short technical or supporting line under the title. */
  meta?: string;
  body: string;
  primary: BannerCta;
  secondary: BannerCta;
}

/** Filter passed to `getEquipment()`. All fields optional and AND-combined. */
export interface EquipmentFilter {
  categorySlug?: string;
  /** Brand display name. Kept for existing callers. */
  brand?: string;
  /** Brand slug — what the catalogue's brand filter and its URLs use. */
  brandSlug?: string;
  featured?: boolean;
  /** Free-text match across model, name, summary and brand. */
  search?: string;
}

export interface PartFilter {
  categorySlug?: string;
  equipmentSlug?: string;
  search?: string;
}

/* ─────────────────────────────────────────────────── forms ───────────────── */

/** A country the quote form will accept an enquiry from. */
export interface Country {
  /** ISO 3166-1 alpha-2, e.g. "PK". Used as the stable form value. */
  code: string;
  name: string;
  /** International dialling code without the leading "+", e.g. "92". */
  dialCode: string;
}

/** A generic `<option>` for the form's fixed choice lists. */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * A submitted quote request.
 *
 * This is the contract the form fills and `submitQuoteRequest()` sends. It is
 * intentionally flat and serialisable so the transport underneath can become
 * an API route, an email service or a CRM webhook without the form changing.
 */
export interface QuoteRequest {
  categorySlug: string;
  equipmentSlug: string;
  /** Free text, for a machine that is not in the catalogue. */
  equipmentOther: string;
  quantity: number;
  countryCode: string;
  city: string;
  name: string;
  dialCode: string;
  phone: string;
  email: string;
  company: string;
  timeframe: string;
  preferredContact: string;
  details: string;
  consent: boolean;
}

/**
 * What `submitQuoteRequest()` reports back.
 *
 * `stored` is separate from `ok` on purpose. A request can be perfectly valid
 * and still not reach the CMS — no write token, Sanity unreachable. The buyer
 * did nothing wrong in that case, so they get their reference and a working
 * WhatsApp link rather than an error, and the success screen says plainly which
 * of the two happened.
 */
export type QuoteSubmitResult =
  | {
      ok: true;
      reference: string;
      /** True when the enquiry reached the CMS and is waiting in the Studio. */
      stored: boolean;
      /** wa.me link pre-filled with the reference and machine, when a number is set. */
      whatsappUrl: string | null;
    }
  | { ok: false; message: string };
