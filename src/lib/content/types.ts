import type {
  Banner,
  Brand,
  CompanyInfo,
  Equipment,
  EquipmentCategory,
  NewsPost,
  Part,
  PartCategory,
  Partner,
  Service,
} from "@/lib/data/types";

/**
 * The shape of the baked-in content file.
 *
 * Everything the site renders, resolved at build time: brand slugs filled in,
 * banner slides flattened to one shape, category names attached. Nothing here
 * needs a network call to become useful, which is the entire point.
 */
export interface ContentSnapshot {
  brands: Brand[];
  equipmentCategories: EquipmentCategory[];
  partCategories: PartCategory[];
  equipment: Equipment[];
  parts: Part[];
  services: Service[];
  partners: Partner[];
  banners: Banner[];
  news: NewsPost[];
  companyInfo: CompanyInfo;
}
