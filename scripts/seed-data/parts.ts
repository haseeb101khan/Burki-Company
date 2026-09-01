import type { SeedPart as Part, SeedPartCategory as PartCategory } from "./types";

/**
 * SEED DATA — input to scripts/seed.ts only. The running site reads Sanity.
 *
 * Part numbers follow a plausible internal scheme (BC-<category>-<serial>) but
 * are NOT real Burki & Company stock numbers. Every record carries
 * `isPlaceholder: true`.
 *
 * `compatibleEquipmentSlugs` is the SINGLE SOURCE OF TRUTH for the
 * Equipment <-> Parts relationship. The equipment side is derived from it in
 * `getCompatibleParts()`, so the two directions can never drift apart.
 */

export const partCategories: PartCategory[] = [
  {
    /*
     * Attachments are filed as PARTS, not equipment.
     *
     * The client's instruction: buckets, breakers and grapples appear on the
     * Parts page and against each machine they fit. The `part` type already
     * models exactly that — a category, an optional brand, and the
     * `compatibleEquipment` list that drives "fits these machines". There is
     * also an "Attachments" EQUIPMENT category, for an attachment sold as a
     * machine in its own right; it currently has nothing in it.
     */
    id: "pc-00",
    slug: "attachments",
    name: "Attachments",
    description:
      "Buckets, breakers, grapples, quick couplers and augers. What turns one machine into several, matched to the carrier it is going on.",
    image: { src: "/images/attachments-breaker.webp", alt: "Xinyuan 7 tonne hydraulic breaker attachment" },
    order: 0,
  },
  {
    id: "pc-01",
    slug: "xinyuan-genuine-parts",
    name: "Xinyuan Genuine Parts",
    description:
      "Factory components for the C Series, ordered against a machine's model and serial rather than guessed at from a picture.",
    image: { src: "/images/part-engine.jpg", alt: "Diesel engine assembly detail" },
    order: 1,
  },
  {
    id: "pc-02",
    slug: "filters",
    name: "Filters",
    description:
      "Engine oil, fuel, air, hydraulic and transmission filtration. The consumables that decide component life.",
    image: { src: "/images/part-filters.jpg", alt: "Oil filter and lubricant containers" },
    order: 2,
  },
  {
    /*
     * No photograph yet, and the tile renders text-only without one rather
     * than borrowing a picture of something else. The one oil image on the
     * site is the filters photograph, which is already doing that job.
     */
    id: "pc-03",
    slug: "oil",
    name: "Oil",
    description:
      "Engine, hydraulic, transmission and axle oils, and the greases that go with them, matched to the machine's service schedule.",
    image: { src: "", alt: "" },
    order: 3,
  },
];

export const parts: Part[] = [
  {
    id: "pt-07",
    slug: "hydraulic-return-filter",
    name: "Hydraulic Return Filter",
    partNumber: "BC-FL-7012",
    categorySlug: "filters",
    summary:
      "In-tank return line filter element with bypass valve. The highest-turnover filter across the LX Series.",
    image: { src: "/images/part-filters.jpg", alt: "Oil filter and lubricant containers" },
    attributes: [
      { label: "Filtration rating", value: "10 micron" },
      { label: "Bypass setting", value: "0.35 MPa" },
      { label: "Service interval", value: "500 hours" },
    ],
    compatibleEquipmentSlugs: ["lx-926", "lx-930", "lx-936"],
    isPlaceholder: true,
    order: 7,
  },
  {
    id: "pt-08",
    slug: "engine-oil-filter",
    name: "Engine Oil Filter",
    partNumber: "BC-FL-7104",
    categorySlug: "filters",
    summary:
      "Spin-on full-flow engine oil filter with anti-drainback valve, rated for high-ambient operation.",
    image: { src: "/images/part-filters.jpg", alt: "Oil filter and lubricant containers" },
    attributes: [
      { label: "Type", value: "Spin-on, full flow" },
      { label: "Thread", value: "M27 x 2" },
      { label: "Service interval", value: "250 hours" },
    ],
    compatibleEquipmentSlugs: ["lx-926", "lx-930"],
    isPlaceholder: true,
    order: 8,
  },
];
