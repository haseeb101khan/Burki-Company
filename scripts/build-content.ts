/**
 * Bake the catalogue into a local content file.
 *
 *   npm run content:build      from the local source data (works offline)
 *   npm run content:pull       from Sanity, so client edits come through
 *
 * WHY THIS EXISTS.
 *
 * The site used to query Sanity while a visitor was loading the page, and every
 * image came from Sanity's CDN. That is the normal way to run a headless CMS
 * and it was the wrong choice here: on this connection — and quite possibly on
 * a customer's in Pakistan — Sanity is intermittently unreachable, and when it
 * is, the site does not render at all. A dealer's catalogue going blank because
 * a CMS in another country is slow is not an acceptable failure.
 *
 * So content is now BAKED IN. This script writes `src/lib/content/content.ts`,
 * the data layer reads that, and the running site never talks to Sanity. Images
 * are served from `public/` where they already live. The Studio stays as the
 * client's editing surface; publishing is a pull plus a build.
 *
 * The generated file is committed on purpose: it is the site's content, and a
 * checkout should build without needing network access or credentials.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { equipmentCategories } from "./seed-data/equipment-categories";
import { equipment } from "./seed-data/equipment";
import { partCategories, parts } from "./seed-data/parts";
import { banners } from "./seed-data/banners";
import { news } from "./seed-data/news";
import { brands, services, siteConfig, stats } from "./seed-data/site";
import { partners } from "./seed-data/partners";
import { xinyuanAttachments, xinyuanEquipment } from "./seed-data/xinyuan";
import type {
  Banner,
  Brand,
  CompanyInfo,
  Equipment,
  Part,
} from "../src/lib/data/types";

/** "WORK MASTER" -> "work-master". Matches the /equipment/<brand> URLs. */
const brandSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

/* ─────────────────────────────────────────────────────────── brands ────── */

const allBrands: Brand[] = brands.map((b) => ({
  ...b,
  slug: b.slug ?? brandSlug(b.name),
  showcaseImages: b.showcaseImages ?? [],
  showcaseVideoUrl: b.showcaseVideoUrl ?? null,
  relationshipConfirmed: b.relationshipConfirmed ?? false,
  showInBrandStrip: b.showInBrandStrip ?? false,
  isFeatured: b.isFeatured ?? false,
}));

/* ──────────────────────────────────────────────────────── equipment ────── */

const allEquipment: Equipment[] = [...equipment, ...xinyuanEquipment].map((e) => ({
  ...e,
  brandSlug: brandSlug(e.brand),
  categoryName: equipmentCategories.find((c) => c.slug === e.categorySlug)?.name,
  videos: e.videos ?? [],
}));

/* ──────────────────────────────────────────────────────────── parts ────── */

const allParts: Part[] = [...parts, ...xinyuanAttachments].map((p) => ({
  ...p,
  categoryName: partCategories.find((c) => c.slug === p.categorySlug)?.name,
  brandSlug: p.brand ? brandSlug(p.brand) : undefined,
  images: p.images ?? [],
  isGenuine: p.isGenuine ?? false,
}));

/* ────────────────────────────────────────────────────────── banners ────── */

const ALL_EQUIPMENT_CTA = { label: "View All Equipment", href: "/equipment" };

/**
 * Both slide kinds resolve to one `Banner` shape here rather than at request
 * time, so the carousel never branches on where a slide came from — and a
 * machine slide's supporting line is built from that machine's own key figures,
 * which means it cannot go stale when a provisional spec is replaced.
 */
const allBanners: Banner[] = banners
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((slide): Banner | null => {
    if (slide.kind === "custom") {
      const { kind: _kind, order: _order, ...rest } = slide;
      return rest;
    }
    const machine = allEquipment.find((e) => e.slug === slide.equipmentSlug);
    if (!machine) return null;
    return {
      id: slide.id,
      image: machine.image,
      eyebrow: machine.brand,
      title: machine.model,
      meta: machine.highlights
        .slice(0, 2)
        .map((h) => `${h.value}${h.unit ? ` ${h.unit}` : ""} ${h.label.toLowerCase()}`)
        .join("  ·  "),
      body: machine.summary,
      primary: {
        label: "View This Machine",
        href: `/equipment/${machine.brandSlug}/${machine.slug}`,
      },
      secondary: ALL_EQUIPMENT_CTA,
    };
  })
  .filter((b): b is Banner => b !== null);

/* ───────────────────────────────────────────────────── company info ────── */

const companyInfo: CompanyInfo = {
  companyName: siteConfig.companyName,
  legalName: siteConfig.legalName,
  tagline: siteConfig.tagline,
  /* Not confirmed to the year: the client says "late 1970s". */
  foundedYear: null,
  founder: {
    name: siteConfig.founder.name,
    role: siteConfig.founder.role,
    image: siteConfig.founder.image,
  },
  /* The About page's opening section, supplied by the client. */
  story: [
    "Burki & Company was established in the late 1970s in Karachi, Pakistan, built on a foundation of integrity, quality, and an unwavering commitment to the construction and heavy machinery industry.",
    "What began as a specialised dealership has evolved over five decades into one of Pakistan's most trusted names in heavy equipment, serving contractors, construction companies and infrastructure developers across Pakistan and beyond.",
  ],
  mission: "Five decades. Thousands of machines. One standard, excellence.",
  milestones: [],
  certifications: [],
  regionsServed: [],
  locations: siteConfig.offices.map((office) => ({
    label: office.label,
    line1: office.line1,
    ...(office.line2 ? { line2: office.line2 } : {}),
    city: office.city,
    country: office.country,
    mapQuery: office.mapQuery,
    /* Contact details are company-wide, not per office - the client has not
       supplied a separate number or address for Islamabad. */
    ...(office.isPrimary
      ? { phone: siteConfig.phone, email: siteConfig.email }
      : {}),
    isPrimary: office.isPrimary,
  })),
  primaryLocation: null,
  phone: siteConfig.phone,
  whatsapp: siteConfig.whatsapp,
  email: siteConfig.email,
  salesEmail: siteConfig.salesEmail,
  businessHours: [{ days: "Monday to Saturday", hours: "9:00am to 6:00pm" }],
  socials: siteConfig.socials,
  contactIsPlaceholder: true,
  introVideo: {
    src: siteConfig.introVideo.src,
    poster: { src: siteConfig.introVideo.poster, alt: "Burki & Company" },
  },
  stats,
};
companyInfo.primaryLocation =
  companyInfo.locations.find((l) => l.isPrimary) ?? companyInfo.locations[0] ?? null;

/* ───────────────────────────────────────────────────────────── write ───── */

const content = {
  brands: allBrands,
  equipmentCategories,
  partCategories,
  equipment: allEquipment,
  parts: allParts,
  services,
  partners: [...partners].sort((a, b) => a.order - b.order),
  banners: allBanners,
  news: [...news].sort((a, b) => a.order - b.order),
  companyInfo,
};

const header = `/* GENERATED FILE — do not edit by hand.
 *
 * Written by \`npm run content:build\`. This is the site's baked-in content: the
 * data layer reads it directly, so a page render never touches the network.
 * Edit the source in scripts/seed-data/ (or in the Studio, then re-pull) and
 * regenerate.
 */
import type { ContentSnapshot } from "./types";

export const content: ContentSnapshot = `;

mkdirSync("src/lib/content", { recursive: true });
writeFileSync(
  "src/lib/content/content.ts",
  `${header}${JSON.stringify(content, null, 2)} as const;\n`,
);

const counts = Object.entries(content).map(
  ([k, v]) => `  ${k.padEnd(20)} ${Array.isArray(v) ? v.length : 1}`,
);
console.log("Wrote src/lib/content/content.ts\n" + counts.join("\n"));
