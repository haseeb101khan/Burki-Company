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
    image: { src: "/images/cat-attachments.jpg", alt: "Excavator attachment on a working site" },
    order: 0,
  },
  {
    id: "pc-01",
    slug: "engine",
    name: "Engine Parts",
    description:
      "Gaskets, turbochargers, injectors, pumps and cooling components for diesel engines across the fleet.",
    image: { src: "/images/part-engine.jpg", alt: "Diesel engine assembly detail" },
    order: 1,
  },
  {
    id: "pc-02",
    slug: "hydraulic",
    name: "Hydraulic Parts",
    description:
      "Pumps, control valves, cylinders, seal kits and hoses that keep working circuits at pressure.",
    image: { src: "/images/part-hydraulic.jpg", alt: "Hydraulic hoses and cylinder on a machine" },
    order: 2,
  },
  {
    id: "pc-03",
    slug: "transmission",
    name: "Transmission Parts",
    description:
      "Torque converters, clutch packs, shafts and gear sets for powershift and hydrostatic drivelines.",
    image: { src: "/images/part-transmission.jpg", alt: "Metal drive gears in close-up" },
    order: 3,
  },
  {
    id: "pc-04",
    slug: "filters",
    name: "Filters",
    description:
      "Engine oil, fuel, air, hydraulic and transmission filtration. The consumables that decide component life.",
    image: { src: "/images/part-filters.jpg", alt: "Oil filter and lubricant containers" },
    order: 4,
  },
  {
    id: "pc-05",
    slug: "undercarriage",
    name: "Undercarriage",
    description:
      "Track chains, rollers, idlers, sprockets and shoes for tracked excavators and dozers.",
    image: { src: "/images/part-undercarriage.jpg", alt: "Heavy machinery track undercarriage" },
    order: 5,
  },
  {
    id: "pc-06",
    slug: "electrical",
    name: "Electrical",
    description:
      "Alternators, starters, sensors, switchgear and wiring harnesses for machine control and starting systems.",
    image: { src: "/images/part-electrical.jpg", alt: "Machine wiring and electrical components" },
    order: 6,
  },
  {
    id: "pc-07",
    slug: "wear-parts",
    name: "Wear Parts",
    description:
      "Cutting edges, bucket teeth, adapters, side cutters and ground-engaging tools consumed by the job itself.",
    image: { src: "/images/part-wear-parts.jpg", alt: "Excavator bucket with cutting teeth" },
    order: 7,
  },
];

export const parts: Part[] = [
  {
    id: "pt-01",
    slug: "cylinder-head-gasket-set",
    name: "Cylinder Head Gasket Set",
    partNumber: "BC-EG-1042",
    categorySlug: "engine",
    summary:
      "Complete multi-layer steel head gasket set with valve stem seals, sized for the WP6G engine family.",
    image: { src: "/images/part-engine.jpg", alt: "Diesel engine assembly detail" },
    attributes: [
      { label: "Engine family", value: "Weichai WP6G" },
      { label: "Material", value: "Multi-layer steel" },
      { label: "Kit contents", value: "18 pieces" },
    ],
    compatibleEquipmentSlugs: ["lx-926", "lx-930"],
    isPlaceholder: true,
    order: 1,
  },
  {
    id: "pt-02",
    slug: "turbocharger-assembly",
    name: "Turbocharger Assembly",
    partNumber: "BC-EG-2210",
    categorySlug: "engine",
    summary:
      "Balanced turbocharger assembly with wastegate actuator, supplied ready to fit with mounting gaskets.",
    image: { src: "/images/part-engine.jpg", alt: "Diesel engine assembly detail" },
    attributes: [
      { label: "Type", value: "Wastegated, water-cooled" },
      { label: "Compressor wheel", value: "Aluminium, 56 mm" },
      { label: "Supplied with", value: "Gasket set, oil feed line" },
    ],
    compatibleEquipmentSlugs: ["lx-936", "lx-950"],
    isPlaceholder: true,
    order: 2,
  },
  {
    id: "pt-03",
    slug: "main-hydraulic-pump",
    name: "Main Hydraulic Pump",
    partNumber: "BC-HY-3305",
    categorySlug: "hydraulic",
    summary:
      "Gear-type main pump for the working circuit, pressure-tested and shipped with a new mounting seal.",
    image: { src: "/images/part-hydraulic.jpg", alt: "Hydraulic hoses and cylinder on a machine" },
    attributes: [
      { label: "Type", value: "Tandem gear pump" },
      { label: "Rated pressure", value: "20 MPa" },
      { label: "Displacement", value: "63 + 40 cm³/rev" },
    ],
    compatibleEquipmentSlugs: ["lx-926", "lx-930", "lx-936"],
    isPlaceholder: true,
    order: 3,
  },
  {
    id: "pt-04",
    slug: "lift-cylinder-seal-kit",
    name: "Lift Cylinder Seal Kit",
    partNumber: "BC-HY-4118",
    categorySlug: "hydraulic",
    summary:
      "Full seal and wiper kit for the loader lift cylinder, including rod seals, piston seals and dust wipers.",
    image: { src: "/images/part-hydraulic.jpg", alt: "Hydraulic hoses and cylinder on a machine" },
    attributes: [
      { label: "Bore", value: "110 mm" },
      { label: "Rod diameter", value: "60 mm" },
      { label: "Seal material", value: "Polyurethane / NBR" },
    ],
    compatibleEquipmentSlugs: ["lx-926", "lx-650"],
    isPlaceholder: true,
    order: 4,
  },
  {
    id: "pt-05",
    slug: "torque-converter",
    name: "Torque Converter",
    partNumber: "BC-TR-5501",
    categorySlug: "transmission",
    summary:
      "Single-stage three-element torque converter, remanufactured to specification and dynamically balanced.",
    image: { src: "/images/part-transmission.jpg", alt: "Metal drive gears in close-up" },
    attributes: [
      { label: "Type", value: "Single-stage, three-element" },
      { label: "Stall ratio", value: "2.8:1" },
      { label: "Condition", value: "Remanufactured" },
    ],
    compatibleEquipmentSlugs: ["lx-930", "lx-936"],
    isPlaceholder: true,
    order: 5,
  },
  {
    id: "pt-06",
    slug: "drive-axle-half-shaft",
    name: "Drive Axle Half Shaft",
    partNumber: "BC-TR-5620",
    categorySlug: "transmission",
    summary:
      "Forged and heat-treated half shaft for the drive axle, machined to original spline dimensions.",
    image: { src: "/images/part-transmission.jpg", alt: "Metal drive gears in close-up" },
    attributes: [
      { label: "Material", value: "Forged alloy steel" },
      { label: "Treatment", value: "Induction hardened" },
      { label: "Spline count", value: "22" },
    ],
    compatibleEquipmentSlugs: ["lx-926", "lx-950"],
    isPlaceholder: true,
    order: 6,
  },
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
    compatibleEquipmentSlugs: ["lx-650", "lx-926", "lx-930", "lx-936", "lx-950"],
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
    compatibleEquipmentSlugs: ["lx-650", "lx-926", "lx-930"],
    isPlaceholder: true,
    order: 8,
  },
  {
    id: "pt-09",
    slug: "track-roller",
    name: "Track Roller",
    partNumber: "BC-UC-8203",
    categorySlug: "undercarriage",
    summary:
      "Sealed and lubricated single-flange track roller with hardened tread, built for abrasive ground.",
    image: { src: "/images/part-undercarriage.jpg", alt: "Heavy machinery track undercarriage" },
    attributes: [
      { label: "Type", value: "Single flange, sealed" },
      { label: "Tread hardness", value: "HRC 52-58" },
      { label: "Machine class", value: "20-24 tonne" },
    ],
    compatibleEquipmentSlugs: [],
    isPlaceholder: true,
    order: 9,
  },
  {
    id: "pt-10",
    slug: "alternator-28v",
    name: "Alternator 28V 55A",
    partNumber: "BC-EL-9111",
    categorySlug: "electrical",
    summary:
      "Sealed 28 volt alternator with integrated regulator, specified for dust and vibration exposure.",
    image: { src: "/images/part-electrical.jpg", alt: "Machine wiring and electrical components" },
    attributes: [
      { label: "Voltage", value: "28 V" },
      { label: "Output", value: "55 A" },
      { label: "Regulator", value: "Integrated, sealed" },
    ],
    compatibleEquipmentSlugs: ["lx-926", "lx-936"],
    isPlaceholder: true,
    order: 10,
  },
  {
    id: "pt-11",
    slug: "bucket-cutting-edge",
    name: "Bucket Cutting Edge",
    partNumber: "BC-WP-6104",
    categorySlug: "wear-parts",
    summary:
      "Bolt-on boron steel cutting edge, drilled to standard pattern and reversible for double service life.",
    image: { src: "/images/part-wear-parts.jpg", alt: "Excavator bucket with cutting teeth" },
    attributes: [
      { label: "Material", value: "Boron alloy steel" },
      { label: "Hardness", value: "HB 500" },
      { label: "Profile", value: "Reversible, double bevel" },
    ],
    compatibleEquipmentSlugs: ["lx-926", "lx-930", "lx-936"],
    isPlaceholder: true,
    order: 11,
  },
  {
    id: "pt-12",
    slug: "bucket-tooth-pin-set",
    name: "Bucket Tooth and Pin Set",
    partNumber: "BC-WP-6210",
    categorySlug: "wear-parts",
    summary:
      "Cast tooth points with retaining pins and rubber locks, supplied as a full set for one bucket.",
    image: { src: "/images/part-wear-parts.jpg", alt: "Excavator bucket with cutting teeth" },
    attributes: [
      { label: "Material", value: "Cast alloy steel" },
      { label: "Profile", value: "General purpose" },
      { label: "Set size", value: "5 teeth, 5 pins, 5 locks" },
    ],
    compatibleEquipmentSlugs: ["lx-926", "lx-950"],
    isPlaceholder: true,
    order: 12,
  },
];
