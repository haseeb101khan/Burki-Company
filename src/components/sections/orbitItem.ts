import type { Equipment, Highlight, ImageRef, Part } from "@/lib/data";
import { routes } from "@/lib/routes";

/**
 * WHAT THE ORBIT CARRIES.
 *
 * The arc was built for machines, but nothing in its geometry is specific to
 * one: it needs a picture that can stand on a line, a name, a supporting line
 * and a few figures. Compatible attachments are shown the same way on the
 * detail page, so the component takes this shape and the callers map into it,
 * rather than the arc being duplicated for parts.
 *
 * DELIBERATELY NOT IN VariantOrbit.tsx. That file is a client component, and a
 * function exported from one cannot be called by a server component — the page
 * that maps its data into orbit items is a server component, and doing this in
 * the same file failed at runtime with "attempted to call it from the server".
 * Types and pure functions live here, where both sides can reach them.
 */
export interface OrbitItem {
  id: string;
  /** The large label under the arc — a model number, or a part reference. */
  title: string;
  /** Full name, for the link's accessible label. */
  name: string;
  /** One supporting line beneath the title. */
  subtitle?: string;
  href: string;
  /**
   * Isolated-on-white artwork. The arc is designed around it: with no cutout
   * the photo gets a feathered edge instead, which is a fallback, not the
   * intent.
   */
  cutout: ImageRef | null;
  photo: ImageRef;
  figures: Highlight[];
}

export const equipmentToOrbitItem = (item: Equipment): OrbitItem => ({
  id: item.id,
  title: item.model,
  name: item.name,
  subtitle: item.tagline ?? item.summary,
  href: routes.equipmentItem(item),
  cutout: item.cutoutImage ?? null,
  photo: item.featuredImage ?? item.image,
  figures: item.highlights,
});

export const partToOrbitItem = (part: Part): OrbitItem => ({
  id: part.id,
  /* The part reference leads, because that is what a workshop searches on; the
     descriptive name sits underneath it. */
  title: part.partNumber,
  name: part.name,
  subtitle: part.name,
  href: routes.part(part),
  /* Attachment photography is all studio cutouts on transparency, which is
     exactly what the arc wants. */
  cutout: part.image,
  photo: part.image,
  figures: part.attributes,
});
