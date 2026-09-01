import { getBrandShowcase } from "@/lib/data";
import { BrandShowcase } from "./BrandShowcase";

/**
 * Server wrapper for the brand showcase.
 *
 * The showcase itself is a client component — it holds the selected tab — and a
 * client component cannot reach the data layer, which is server-only. This
 * fetches once and hands the whole set down, so switching tabs is instant
 * rather than a round trip per brand.
 *
 * The twelve category icon tiles used to hang off the bottom of this section as
 * its footer. They came out on the client's instruction: with a catalogue this
 * size most of them led to an empty category, and the range reel that now
 * follows this section does the job of showing what is actually carried.
 * `EquipmentCategoryGrid` is left in the tree — it is worth having back once
 * the catalogue fills out.
 */
export async function BrandShowcaseSection() {
  const entries = await getBrandShowcase(3);
  if (entries.length === 0) return null;
  return <BrandShowcase entries={entries} />;
}
