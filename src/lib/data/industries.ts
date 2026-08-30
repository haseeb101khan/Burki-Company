import { content } from "@/lib/content/content";
import type { Equipment, EquipmentCategory, Industry } from "./types";

/**
 * INDUSTRIES DATA ACCESS
 *
 * The Industry record owns its recommended-equipment list, and the machine side
 * is derived from it, so the two directions cannot disagree.
 */

const clone = <T,>(value: T): T => structuredClone(value);
const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export async function getIndustries(): Promise<Industry[]> {
  return clone(content.industries).sort(byOrder);
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const industry = content.industries.find((i) => i.slug === slug);
  return industry ? clone(industry) : null;
}

/** Machines recommended for a sector, resolved from slugs to full records. */
export async function getIndustryEquipment(slug: string): Promise<Equipment[]> {
  const industry = content.industries.find((i) => i.slug === slug);
  if (!industry) return [];

  const matches = industry.recommendedEquipmentSlugs
    .map((s) => content.equipment.find((e) => e.slug === s))
    .filter((e): e is Equipment => Boolean(e));

  return clone(matches);
}

/** Equipment categories relevant to a sector, resolved from slugs. */
export async function getIndustryCategories(
  slug: string,
): Promise<EquipmentCategory[]> {
  const industry = content.industries.find((i) => i.slug === slug);
  if (!industry) return [];

  const matches = industry.recommendedCategorySlugs
    .map((s) => content.equipmentCategories.find((c) => c.slug === s))
    .filter((c): c is EquipmentCategory => Boolean(c))
    .sort(byOrder);

  return clone(matches);
}
