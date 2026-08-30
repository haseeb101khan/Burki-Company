import { getBrandShowcase } from "@/lib/data";
import { BrandShowcase } from "./BrandShowcase";
import { EquipmentCategoryGrid } from "./EquipmentCategoryGrid";

/**
 * Server wrapper for the brand showcase.
 *
 * The showcase itself is a client component — it holds the selected tab — and a
 * client component cannot reach the data layer, which is server-only. This
 * fetches once and hands the whole set down, so switching tabs is instant
 * rather than a round trip per brand.
 */
export async function BrandShowcaseSection() {
  const entries = await getBrandShowcase(3);
  if (entries.length === 0) return null;
  return <BrandShowcase entries={entries} footer={<EquipmentCategoryGrid />} />;
}
