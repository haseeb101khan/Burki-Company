import type {
  Brand,
  Office,
  Equipment,
  EquipmentCategory,
  Part,
  PartCategory,
  Partner,
  Service,
  SiteConfig,
  Stat,
} from "../../src/lib/data/types";

/**
 * SEED TYPES
 *
 * The records in this folder are the prototype's hand-written content, kept as
 * the input to `scripts/seed.ts` — the one-time migration that puts them into
 * Sanity. They are NOT read by the running site any more: `src/lib/data/`
 * queries Sanity, and nothing here is imported outside `scripts/`.
 *
 * They are typed against the live domain types minus the fields Sanity supplies
 * itself (a brand slug, a resolved brand slug on a machine), so a change to the
 * domain contract still shows up here as a type error rather than as a silent
 * mismatch discovered halfway through a migration.
 */

/**
 * The seed carries every office; the runtime `SiteConfig` does not, because the
 * shape the header and footer consume only ever needs the primary address. The
 * full set reaches the site through `CompanyInfo.locations`, which
 * `build-content.ts` derives from this.
 */
export type SeedSiteConfig = SiteConfig & { offices: Office[] };

/** `brandSlug` is derived from the brand name at seed time. */
export type SeedEquipment = Omit<Equipment, "brandSlug">;

/** Slug and the display flags are set by the seeder, not written by hand. */
export type SeedBrand = Omit<
  Brand,
  | "slug"
  | "relationshipConfirmed"
  | "showInBrandStrip"
  | "isFeatured"
  | "showcaseImages"
  | "showcaseVideoUrl"
> & {
  showcaseImages?: Brand["showcaseImages"];
  showcaseVideoUrl?: string | null;
  slug?: string;
  relationshipConfirmed?: boolean;
  showInBrandStrip?: boolean;
  isFeatured?: boolean;
};

export type {
  EquipmentCategory as SeedEquipmentCategory,
  Part as SeedPart,
  PartCategory as SeedPartCategory,
  Partner as SeedPartner,
  Service as SeedService,
  Stat as SeedStat,
};
