import { content } from "@/lib/content/content";
import type {
  BrandWithCount,
  Equipment,
  EquipmentCategory,
  EquipmentFilter,
  Part,
} from "./types";

/**
 * EQUIPMENT DATA ACCESS
 *
 * Reads the baked-in content file. No network call, no CMS at request time —
 * see scripts/build-content.ts for why. Every signature and return shape is
 * unchanged from the prototype and from the Sanity-backed version, so pages and
 * components have never had to know where the content comes from.
 *
 * Still `async`. Nothing needs it today, but every caller already awaits these,
 * and keeping the shape means a future move back to a live query is a change to
 * these bodies and nothing else.
 */

const clone = <T,>(value: T): T => structuredClone(value);
const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export async function getEquipmentCategories(): Promise<EquipmentCategory[]> {
  return clone(content.equipmentCategories).sort(byOrder);
}

export async function getEquipmentCategoryBySlug(
  slug: string,
): Promise<EquipmentCategory | null> {
  const category = content.equipmentCategories.find((c) => c.slug === slug);
  return category ? clone(category) : null;
}

/** Number of machines currently listed in a category, keyed by category slug. */
export async function getEquipmentCountByCategory(): Promise<
  Record<string, number>
> {
  return content.equipment.reduce<Record<string, number>>((acc, item) => {
    acc[item.categorySlug] = (acc[item.categorySlug] ?? 0) + 1;
    return acc;
  }, {});
}

/**
 * The catalogue accessor. All filters optional, AND-combined.
 *
 * `brandSlug` is what the catalogue's URLs carry; `brand` (the display name)
 * still works for older callers.
 */
export async function getEquipment(
  filter: EquipmentFilter = {},
): Promise<Equipment[]> {
  const { categorySlug, brand, brandSlug, featured, search } = filter;
  const term = search?.trim().toLowerCase();

  const results = content.equipment.filter((item) => {
    if (categorySlug && item.categorySlug !== categorySlug) return false;
    if (brand && item.brand !== brand) return false;
    if (brandSlug && item.brandSlug !== brandSlug) return false;
    if (featured !== undefined && item.isFeatured !== featured) return false;
    if (term) {
      const haystack =
        `${item.model} ${item.name} ${item.summary} ${item.brand}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });

  return clone(results).sort(byOrder);
}

export async function getEquipmentBySlug(
  slug: string,
): Promise<Equipment | null> {
  const item = content.equipment.find((e) => e.slug === slug);
  return item ? clone(item) : null;
}

export async function getFeaturedEquipment(limit?: number): Promise<Equipment[]> {
  const featured = await getEquipment({ featured: true });
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

/**
 * Related machines for a detail page. Falls back to other models in the same
 * category when a record has no explicit relations, so the section is never
 * empty.
 */
export async function getRelatedEquipment(
  slug: string,
  limit = 3,
): Promise<Equipment[]> {
  const item = content.equipment.find((e) => e.slug === slug);
  if (!item) return [];

  const explicit = item.relatedEquipmentSlugs
    .map((s) => content.equipment.find((e) => e.slug === s))
    .filter((e): e is Equipment => Boolean(e));

  const seen = new Set(explicit.map((e) => e.slug));
  const fallback = content.equipment.filter(
    (e) => e.slug !== slug && e.categorySlug === item.categorySlug && !seen.has(e.slug),
  );

  return clone([...explicit, ...fallback].slice(0, limit));
}

/**
 * Parts that fit a given machine.
 *
 * Derived from each part's own `compatibleEquipmentSlugs`, which is the single
 * source of truth for the relationship — so this direction and the part's own
 * page can never disagree.
 */
export async function getCompatibleParts(
  equipmentSlug: string,
  limit?: number,
): Promise<Part[]> {
  const matches = content.parts
    .filter((p) => p.compatibleEquipmentSlugs.includes(equipmentSlug))
    .sort(byOrder);
  return clone(typeof limit === "number" ? matches.slice(0, limit) : matches);
}

/**
 * Other models in the same line as the given machine. Deliberately distinct
 * from `getRelatedEquipment()`: that one is a curated cross-sell list capped at
 * a small limit, this one is exhaustive for "browse the rest of this line."
 *
 * A NAMED SERIES IS NOT REQUIRED. It used to be, and that silently emptied the
 * variants orbit for any machine whose manufacturer does not market a named
 * series — the XCMG loaders arrived that way and their detail pages simply had
 * no such section, with nothing to indicate why.
 *
 * Where there is no series, siblings are the same brand in the same category,
 * which is what "other variants" means to a buyer looking at a wheel loader:
 * the manufacturer's other wheel loaders. Naming a series that the
 * manufacturer does not use, purely to make this function fire, would have been
 * the wrong fix — the ZL50GN and the LW models are different families and
 * saying otherwise on a spec-led site is a small lie for a layout's sake.
 */
export async function getSeriesVariants(slug: string): Promise<Equipment[]> {
  const item = content.equipment.find((e) => e.slug === slug);
  if (!item) return [];

  const sameLine = item.series
    ? (e: (typeof content.equipment)[number]) => e.series === item.series
    : (e: (typeof content.equipment)[number]) =>
        !e.series && e.categorySlug === item.categorySlug;

  const variants = content.equipment.filter(
    (e) => e.slug !== slug && e.brand === item.brand && sameLine(e),
  );
  return clone(variants).sort(byOrder);
}

/** Distinct brand names present in the catalogue. Kept for existing callers. */
export async function getEquipmentBrands(): Promise<string[]> {
  return [...new Set(content.equipment.map((e) => e.brand))].sort();
}

/** One brand and the machines chosen to represent it on the homepage. */
export interface BrandShowcaseEntry {
  brand: BrandWithCount;
  machines: Equipment[];
}

/**
 * Brands for the catalogue, each with the number of machines behind it.
 *
 * @param includeEmpty  The brand index passes true: four of the six brands are
 *   set up ahead of their catalogues arriving, and listing them as "being
 *   catalogued" shows the range at its real size. Filter controls leave it
 *   false — a chip that lands on an empty page is a dead end.
 */
export async function getCatalogueBrands({
  includeEmpty = false,
}: { includeEmpty?: boolean } = {}): Promise<BrandWithCount[]> {
  const counted = content.brands.map((brand) => ({
    ...clone(brand),
    equipmentCount: content.equipment.filter((e) => e.brandSlug === brand.slug).length,
  }));
  return counted.filter((b) => includeEmpty || b.equipmentCount > 0).sort(byOrder);
}

/**
 * The homepage brand showcase: every brand, each with its featured machines.
 *
 * Brands with nothing catalogued yet are included on purpose — a tab row
 * missing two thirds of the business would misrepresent it. Their panel says so
 * rather than pretending.
 */
export async function getBrandShowcase(
  perBrand = 3,
): Promise<BrandShowcaseEntry[]> {
  const brands = await getCatalogueBrands({ includeEmpty: true });
  const featured = await getEquipment({ featured: true });

  return brands.map((brand) => ({
    brand,
    machines: featured.filter((m) => m.brandSlug === brand.slug).slice(0, perBrand),
  }));
}
