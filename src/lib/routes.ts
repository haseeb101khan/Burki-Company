/**
 * EVERY URL THE CATALOGUE PRODUCES, BUILT IN ONE PLACE.
 *
 * The equipment URL shape used to be hand-written in ten files — cards, the
 * orbit, the header, the footer, banners, the quote form. Moving the catalogue
 * from category-first to brand-first meant finding all ten, and missing one
 * would have produced a link that 404s only from certain pages. It lives here
 * now so the next change is one edit.
 *
 * THE SHAPE, AND WHY:
 *
 *   /equipment                     the six brands
 *   /equipment/xinyuan             one brand: name, intro, its machines
 *   /equipment/xinyuan/c65         a machine
 *   /equipment/category/excavators the same machines cut the other way
 *
 * Brand leads because Burki is a multi-brand distributor and that is how buyers
 * arrive — "what do you carry from Xinyuan" far more often than "show me every
 * excavator you have". Category is the secondary axis, not a lesser one, but it
 * cannot share a URL level with brand: `/equipment/[brand]` and
 * `/equipment/[category]` are the same route to Next, so one of them has to sit
 * under a fixed segment. Hence `/equipment/category/...`.
 */

/** Just enough of a machine to build its URL. */
interface EquipmentLike {
  slug: string;
  brandSlug: string;
}

interface SlugLike {
  slug: string;
}

export const routes = {
  /** The brand index — the catalogue's front door. */
  equipment: () => "/equipment",

  /** One brand's catalogue: heading, intro, then its machines. */
  brand: (brand: SlugLike | string) =>
    `/equipment/${typeof brand === "string" ? brand : brand.slug}`,

  /**
   * A machine's detail page.
   *
   * Keyed on brand, not category, so a buyer who came in through the Xinyuan
   * catalogue stays inside it. Falls back to the brand index if a record has no
   * brand — which validation prevents, but a dead link is worse than a detour.
   */
  equipmentItem: (item: EquipmentLike) =>
    item.brandSlug ? `/equipment/${item.brandSlug}/${item.slug}` : "/equipment",

  /** Every machine of one class, across all brands. */
  category: (category: SlugLike | string) =>
    `/equipment/category/${typeof category === "string" ? category : category.slug}`,

  part: (part: { slug: string; categorySlug: string }) =>
    `/parts/${part.categorySlug}/${part.slug}`,

  partCategory: (category: SlugLike | string) =>
    `/parts/${typeof category === "string" ? category : category.slug}`,

  /** Deep-links the quote form to a specific machine. */
  quote: (item?: EquipmentLike) =>
    item ? `/request-a-quote?model=${item.slug}` : "/request-a-quote",
} as const;
