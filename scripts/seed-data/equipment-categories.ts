import type { SeedEquipmentCategory as EquipmentCategory } from "./types";

/**
 * SEED DATA — input to scripts/seed.ts only. The running site reads Sanity.
 *
 * Category copy is representative and awaiting client sign-off.
 */
export const equipmentCategories: EquipmentCategory[] = [
  {
    id: "cat-01",
    slug: "excavators",
    name: "Excavators",
    description:
      "Tracked and wheeled excavators for bulk earthmoving, trenching, foundation work and demolition, from compact site machines to quarry-duty units.",
    image: { src: "/images/cat-excavators.webp", alt: "Xinyuan wheeled excavator on a city street, boom lowered" },
    order: 1,
  },
  {
    id: "cat-02",
    slug: "wheel-loaders",
    name: "Wheel Loaders",
    shortName: "Loaders",
    description:
      "Front-end loaders for stockpile handling, truck loading and site logistics — the workhorse of aggregate yards, batching plants and road projects.",
    image: { src: "/images/cat-wheel-loaders.webp", alt: "Wheel loader with its bucket lowered on a yard" },
    order: 2,
  },
  {
    id: "cat-03",
    slug: "backhoe-loaders",
    name: "Backhoe Loaders",
    /*
     * WHAT IS FILED HERE, AND THE ONE THING TO KNOW ABOUT IT.
     *
     * On the client's instruction this category holds the three XCMG machines —
     * LW300FN, LW500FN and ZL50GN — and the tile shows the ZL50GN. All three
     * are WHEEL loaders: front bucket, no rear boom, and XCMG file them under
     * Wheel Loader on their own product pages, which is where their
     * specifications here came from.
     *
     * So the description below no longer claims a rear backhoe. It described
     * "loader at the front, backhoe at the rear" while listing three machines
     * that have no backhoe, which is a straightforward falsehood on a page that
     * sells on specifications. The category NAME still says Backhoe Loaders and
     * only the client can settle that — either these move back to Wheel Loaders
     * beside the LOAD-X machines, or the category is renamed to match what is
     * in it.
     */
    description:
      "Loaders for utilities, municipal work and confined urban sites, where a full-size machine cannot turn.",
    image: {
      src: "/images/xcmg-zl50gn-side.webp",
      alt: "An XCMG ZL50GN loader, side view",
    },
    order: 3,
  },
  {
    id: "cat-04",
    slug: "bulldozers",
    name: "Bulldozers",
    description:
      "Crawler dozers for mass earthmoving, site clearing, levelling and haul road formation in heavy ground conditions.",
    image: { src: "/images/cat-bulldozers.jpg", alt: "Bulldozer working a cut on a construction site" },
    order: 4,
  },
  {
    id: "cat-05",
    slug: "dump-trucks",
    name: "Dump Trucks",
    description:
      "Rigid and articulated haulers for moving spoil, aggregate and overburden across long site cycles and rough haul roads.",
    image: { src: "/images/cat-dump-trucks.jpg", alt: "Articulated haul truck on a quarry haul road" },
    order: 5,
  },
  {
    id: "cat-06",
    slug: "mixer-trucks",
    name: "Mixer Trucks",
    description:
      "Transit mixers for ready-mix delivery, keeping concrete workable from batching plant to pour on schedule.",
    image: { src: "/images/cat-mixer-trucks.jpg", alt: "Concrete mixer truck discharging on site" },
    order: 6,
  },
  {
    id: "cat-07",
    slug: "concrete-pumps",
    name: "Concrete Pumps",
    description:
      "Boom and line pumps for placing concrete at height and distance — high-rise decks, bridge sections and large slab pours.",
    image: { src: "/images/cat-concrete-pumps.jpg", alt: "Concrete pump truck with boom extended on a city site" },
    order: 7,
  },
  {
    id: "cat-08",
    slug: "cranes",
    name: "Cranes",
    description:
      "Mobile and crawler lifting equipment for structural steel, precast placement, plant installation and heavy site lifts.",
    image: { src: "/images/cat-cranes.jpg", alt: "Construction crane against an open sky" },
    order: 8,
  },
  {
    id: "cat-09",
    slug: "forklifts",
    name: "Forklifts",
    description:
      "Diesel and electric forklifts for warehouses, ports and industrial yards, from light pallet duty to heavy container handling.",
    image: { src: "/images/cat-forklifts.jpg", alt: "Forklift operating in a stocked warehouse aisle" },
    order: 9,
  },
  {
    id: "cat-10",
    slug: "rollers",
    name: "Rollers",
    description:
      "Single-drum, tandem and pneumatic compactors for subgrade, base course and asphalt compaction to specified density.",
    image: { src: "/images/cat-rollers.jpg", alt: "Single drum vibratory roller compacting a road base" },
    order: 10,
  },
  {
    id: "cat-11",
    slug: "graders",
    name: "Graders",
    description:
      "Motor graders for fine grading, camber control, haul road maintenance and precise formation levels on road projects.",
    image: { src: "/images/cat-graders.jpg", alt: "Motor grader shaping a road formation" },
    order: 11,
  },
  {
    id: "cat-12",
    slug: "attachments",
    name: "Attachments",
    description:
      "Buckets, breakers, grapples, quick couplers and ground-engaging tools that adapt a carrier to the job in front of it.",
    /* The 7 t hydraulic breaker cutout rather than a site photograph: this
       category is the one whose tiles are tools, not machines, and the tool
       reads at a glance where a photo of a machine wearing one does not. */
    image: { src: "/images/attachments-breaker.webp", alt: "Xinyuan 7 tonne hydraulic breaker attachment" },
    order: 12,
  },
];
