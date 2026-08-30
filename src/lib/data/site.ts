import { content } from "@/lib/content/content";
import type {
  Brand,
  BusinessHours,
  CompanyInfo,
  Partner,
  Service,
  SiteConfig,
  Stat,
} from "./types";

/**
 * SITE-WIDE DATA ACCESS
 * Company details, stats, brands and services.
 */

const clone = <T,>(value: T): T => structuredClone(value);
const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

/** The full company record — everything the About page needs. */
export async function getCompanyInfo(): Promise<CompanyInfo> {
  return clone(content.companyInfo);
}

/** "Monday to Saturday, 9:00am to 6:00pm" — or several, joined. */
export function formatBusinessHours(hours: BusinessHours[]): string {
  return hours.map((h) => `${h.days}, ${h.hours}`).join(" · ");
}

/**
 * The narrower shape the header, footer and contact page consume.
 *
 * Derived from `getCompanyInfo()` rather than stored separately, so the footer
 * cannot end up showing a different phone number from the About page.
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  const info = content.companyInfo;
  const location = info.primaryLocation;

  return clone({
    companyName: info.companyName,
    legalName: info.legalName ?? info.companyName,
    tagline: info.tagline ?? "",
    foundedYear: info.foundedYear,
    founder: {
      name: info.founder.name ?? "",
      role: info.founder.role ?? "",
      image: info.founder.image ?? { src: "", alt: "" },
    },
    address: {
      line1: location?.line1 ?? "",
      ...(location?.line2 ? { line2: location.line2 } : {}),
      city: location?.city ?? "",
      country: location?.country ?? "",
    },
    phone: info.phone ?? "",
    whatsapp: info.whatsapp ?? "",
    email: info.email ?? "",
    salesEmail: info.salesEmail ?? info.email ?? "",
    hours: formatBusinessHours(info.businessHours),
    introVideo: {
      src: info.introVideo.src,
      poster: info.introVideo.poster?.src ?? "",
    },
    socials: info.socials,
    contactIsPlaceholder: info.contactIsPlaceholder,
  });
}

export async function getStats(): Promise<Stat[]> {
  return clone(content.companyInfo.stats);
}

/**
 * @param relationship  "distributed" for lines we import and sell,
 *                      "serviced" for marques we support. Omit for every brand.
 */
export async function getBrands(
  relationship?: Brand["relationship"],
): Promise<Brand[]> {
  const list = relationship
    ? content.brands.filter((b) => b.relationship === relationship)
    : content.brands;
  return clone(list).sort(byOrder);
}

/**
 * Brands for the homepage logo rail.
 *
 * Driven by an explicit `showInBrandStrip` flag rather than inferred from the
 * relationship — with the brand list open-ended, which brands appear is an
 * editorial decision, not a consequence of a field meaning something else.
 */
export async function getStripBrands(): Promise<Brand[]> {
  return clone(content.brands.filter((b) => b.showInBrandStrip)).sort(byOrder);
}

/** "LOAD-X" -> "load-x". Prefer `brand.slug`; this is only a fallback. */
export function brandSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const brand = content.brands.find((b) => b.slug === slug);
  return brand ? clone(brand) : null;
}

/**
 * Business partners shown as proof of standing.
 *
 * Only confirmed entries are returned: naming an organisation without
 * permission is the kind of claim that ends a deal when someone checks it.
 */
export async function getPartners(): Promise<Partner[]> {
  return clone(content.partners.filter((p) => p.confirmed !== false)).sort(byOrder);
}

export async function getServices(): Promise<Service[]> {
  return clone(content.services).sort(byOrder);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const service = content.services.find((s) => s.slug === slug);
  return service ? clone(service) : null;
}
