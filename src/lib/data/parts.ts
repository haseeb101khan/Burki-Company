import { content } from "@/lib/content/content";
import type { Equipment, Part, PartCategory, PartFilter } from "./types";

/**
 * PARTS DATA ACCESS
 *
 * Same contract as the equipment layer: async in, cloned plain data out, read
 * from the baked-in content file rather than a live CMS query.
 */

const clone = <T,>(value: T): T => structuredClone(value);
const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export async function getPartCategories(): Promise<PartCategory[]> {
  return clone(content.partCategories).sort(byOrder);
}

export async function getPartCategoryBySlug(
  slug: string,
): Promise<PartCategory | null> {
  const category = content.partCategories.find((c) => c.slug === slug);
  return category ? clone(category) : null;
}

export async function getParts(filter: PartFilter = {}): Promise<Part[]> {
  const { categorySlug, equipmentSlug, search } = filter;
  const term = search?.trim().toLowerCase();

  const results = content.parts.filter((part) => {
    if (categorySlug && part.categorySlug !== categorySlug) return false;
    if (equipmentSlug && !part.compatibleEquipmentSlugs.includes(equipmentSlug)) {
      return false;
    }
    if (term) {
      const haystack = `${part.name} ${part.partNumber} ${part.summary}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });

  return clone(results).sort(byOrder);
}

export async function getPartBySlug(slug: string): Promise<Part | null> {
  const part = content.parts.find((p) => p.slug === slug);
  return part ? clone(part) : null;
}

/** Reverse of `getCompatibleParts()` — the machines a given part fits. */
export async function getCompatibleEquipment(
  partSlug: string,
): Promise<Equipment[]> {
  const part = content.parts.find((p) => p.slug === partSlug);
  if (!part) return [];

  const matches = part.compatibleEquipmentSlugs
    .map((slug) => content.equipment.find((e) => e.slug === slug))
    .filter((e): e is Equipment => Boolean(e))
    .sort(byOrder);

  return clone(matches);
}

/** Part counts per category, for catalogue chips and category cards. */
export async function getPartCountByCategory(): Promise<Record<string, number>> {
  return content.parts.reduce<Record<string, number>>((acc, part) => {
    acc[part.categorySlug] = (acc[part.categorySlug] ?? 0) + 1;
    return acc;
  }, {});
}
