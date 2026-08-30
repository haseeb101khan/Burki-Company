import type { SeedEquipment as Equipment } from "./types";

/**
 * SEED DATA — input to scripts/seed.ts only. The running site reads Sanity.
 *
 * ---------------------------------------------------------------------------
 * LX-926 and LX-936 carry REAL client-supplied specifications
 * (`isPlaceholder: false`). Everything else below is still representative.
 *
 * Those real figures disproved the pattern the placeholders were built on: the
 * model number does NOT track rated load (LX-926 is 1.5 t, not 2.6 t; LX-936 is
 * 3.0 t, not 3.6 t). Treat the remaining LX placeholder specs as unreliable
 * rather than merely unconfirmed.
 *
 * EVERY OTHER SPEC BELOW IS REPRESENTATIVE, NOT CLIENT-CONFIRMED.
 * Figures are internally consistent and typical of each machine class (LX
 * model numbers track rated load: 926 = 2.6 t, 930 = 3.0 t, 936 = 3.6 t,
 * 950 = 5.0 t) so the UI can be judged with realistic data. Every record
 * carries `isPlaceholder: true` until the client supplies real spec sheets.
 * ---------------------------------------------------------------------------
 */
export const equipment: Equipment[] = [
  /* ---------------------------------------------------------------- LX-650 */
  {
    id: "eq-lx-650",
    slug: "lx-650",
    model: "LX-650",
    name: "LX-650 Compact Wheel Loader",
    categorySlug: "wheel-loaders",
    brand: "LOAD-X",
    series: "LX Series",
    tagline: "Small footprint, full-size driveline",
    summary:
      "Compact, tight-turning loader for confined yards, batching plants and municipal work where a full-size machine cannot manoeuvre.",
    description:
      "The LX-650 is the entry point to the LX Series. It is built for sites where space, not tonnage, is the constraint: narrow yards, block factories and municipal depots. A short wheelbase and articulated steering let it work close to walls and stockpiles, while the same driveline architecture as the larger LX machines keeps parts commonality high across a mixed fleet.",
    image: { src: "/images/load-x/lx-650-cutout.webp", alt: "LOAD-X LX-650 compact wheel loader" },
    cutoutImage: { src: "/images/load-x/lx-650-cutout.webp", alt: "LOAD-X LX-650 wheel loader, isolated on white" },
    gallery: [{ src: "/brands/Load-x/lx650/lx-650-1.PNG", alt: "LOAD-X LX-650 compact wheel loader" }],
    highlights: [
      { label: "Operating weight", value: "5,200", unit: "kg" },
      { label: "Bucket capacity", value: "0.9", unit: "m³" },
      { label: "Rated load", value: "1,800", unit: "kg" },
      { label: "Engine power", value: "62", unit: "kW" },
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          { label: "Engine model", value: "Yuchai YC4A85" },
          { label: "Rated power", value: "62", unit: "kW (83 hp)" },
          { label: "Rated speed", value: "2,200", unit: "rpm" },
          { label: "Displacement", value: "4.3", unit: "L" },
          { label: "Emission standard", value: "Stage II equivalent" },
        ],
      },
      {
        title: "Operating",
        specs: [
          { label: "Operating weight", value: "5,200", unit: "kg" },
          { label: "Rated load", value: "1,800", unit: "kg" },
          { label: "Bucket capacity", value: "0.9", unit: "m³" },
          { label: "Breakout force", value: "52", unit: "kN" },
          { label: "Max travel speed", value: "28", unit: "km/h" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Overall length", value: "5,650", unit: "mm" },
          { label: "Overall width (bucket)", value: "2,080", unit: "mm" },
          { label: "Overall height (cab)", value: "2,850", unit: "mm" },
          { label: "Wheelbase", value: "2,150", unit: "mm" },
          { label: "Dump height", value: "2,650", unit: "mm" },
        ],
      },
      {
        title: "Capacities",
        specs: [
          { label: "Fuel tank", value: "90", unit: "L" },
          { label: "Hydraulic tank", value: "70", unit: "L" },
          { label: "Tyre size", value: "16/70-20" },
        ],
      },
    ],
    features: [
      {
        title: "Tight turning circle",
        description: "Articulated frame and short wheelbase let the machine work close in without repositioning.",
      },
      {
        title: "Shared LX driveline",
        description: "Common filters and driveline parts with larger LX machines reduce what a mixed fleet needs to stock.",
      },
      {
        title: "Quick-attach ready",
        description: "Standard coupler mounting accepts buckets, forks and grapples without workshop modification.",
      },
    ],
    relatedEquipmentSlugs: ["lx-926", "lx-930"],
    isFeatured: false,
    isPlaceholder: true,
    order: 1,
  },

  /* ---------------------------------------------------------------- LX-926 */
  {
    id: "eq-lx-926",
    slug: "lx-926",
    model: "LX-926",
    name: "LX-926 Wheel Loader",
    categorySlug: "wheel-loaders",
    brand: "LOAD-X",
    series: "LX Series",
    tagline: "Compact where it counts",
    summary:
      "A 4.5 tonne loader with a 1 m³ bucket, built for confined yards, block plants and municipal work where a full-size machine cannot turn.",
    description:
      "The LX-926 is the compact machine in the LX Series. A 5,870 mm length and articulated steering let it work close to walls and stockpiles, while a 76 kW Huafeng diesel and 4WD driveline keep it loading rather than spinning. Supplied new, CE / BV / SGS certified with ROPS and FOPS structures.",
    image: { src: "/brands/Load-x/lx926/lx-926-1.jpg", alt: "LOAD-X LX-926 wheel loader, side view" },
    cutoutImage: { src: "/images/load-x/lx-926-cutout.webp", alt: "LOAD-X LX-926 wheel loader, isolated on white" },
    gallery: [
      { src: "/brands/Load-x/lx926/lx-926-1.jpg", alt: "LOAD-X LX-926 wheel loader, side view" },
    ],
    highlights: [
      { label: "Bucket capacity", value: "1", unit: "m³" },
      { label: "Rated output", value: "76", unit: "kW" },
      { label: "Total weight", value: "4,500", unit: "kg" },
      { label: "Rated load", value: "1,500", unit: "kg" },
    ],
    specs: [
      {
        title: "Identification",
        specs: [
          { label: "Brand", value: "LOAD-X" },
          { label: "Model", value: "LX-926" },
          { label: "Condition", value: "New" },
          { label: "Colour", value: "Yellow" },
          { label: "Certification", value: "CE, BV, SGS, ROPS & FOPS" },
          { label: "Warranty", value: "6 months" },
          { label: "Loading port", value: "China" },
          { label: "Minimum order", value: "1 set" },
          { label: "Supply capability", value: "25 sets/month" },
        ],
      },
      {
        title: "Operating",
        specs: [
          { label: "Total weight", value: "4,500", unit: "kg" },
          { label: "Rated load", value: "1,500", unit: "kg" },
          { label: "Bucket capacity", value: "1", unit: "m³" },
          { label: "Fuel type", value: "Diesel" },
          { label: "Wheel quantity (F/R)", value: "2 / 2" },
          { label: "Tyre type (F/R)", value: "Pneumatic / Pneumatic" },
        ],
      },
      {
        title: "Engine",
        specs: [
          { label: "Manufacturer", value: "Huafeng" },
          { label: "Type", value: "ZHBZG1" },
          { label: "Rated output", value: "76", unit: "kW" },
          { label: "Rated torque", value: "2,400", unit: "r/min" },
          { label: "Maximum torque", value: "297", unit: "N·m" },
          { label: "Min fuel-consume ratio", value: "240", unit: "kW·h" },
          { label: "Cylinders", value: "4" },
        ],
      },
      {
        title: "Transmission",
        specs: [
          { label: "Converter model", value: "280BG B" },
          { label: "Gear shifts", value: "1 forward, 1 reverse" },
          { label: "Max speed", value: "35", unit: "km/h" },
          { label: "Drive mode", value: "4WD" },
        ],
      },
      {
        title: "Axle and Brakes",
        specs: [
          { label: "Axle type", value: "Decelerating type" },
          { label: "Service brake", value: "Pneumatic disc brake" },
          { label: "Park brake", value: "Hand operated caliper disc" },
        ],
      },
      {
        title: "Tyres and Dimensions",
        specs: [
          { label: "Quantity (F/R)", value: "2 / 2" },
          { label: "Front tyre size", value: "16/60-20" },
          { label: "Rear tyre size", value: "16/60-20" },
          { label: "Loader length", value: "5,870", unit: "mm" },
          { label: "Loader width", value: "1,980", unit: "mm" },
          { label: "Loader height", value: "2,830", unit: "mm" },
        ],
      },
    ],
    features: [
      {
        title: "Turns in its own yard",
        description: "5,870 mm long with articulated steering, so it works close to walls and stockpiles without repositioning.",
      },
      {
        title: "4WD driveline",
        description: "Drive to all four wheels keeps it loading on loose and broken ground instead of spinning.",
      },
      {
        title: "Certified and warranted",
        description: "Supplied new with CE, BV and SGS certification, ROPS and FOPS structures and a 6 month warranty.",
      },
    ],
    relatedEquipmentSlugs: ["lx-936", "lx-930", "lx-650"],
    isFeatured: true,
    isPlaceholder: false,
    order: 2,
  },

  /* ---------------------------------------------------------------- LX-930 */
  {
    id: "eq-lx-930",
    slug: "lx-930",
    model: "LX-930",
    name: "LX-930 Wheel Loader",
    categorySlug: "wheel-loaders",
    brand: "LOAD-X",
    series: "LX Series",
    tagline: "More bucket, same class",
    summary:
      "A step up in bucket and breakout over the LX-926, for contractors running longer cycles and heavier material.",
    description:
      "The LX-930 answers the most common request from LX-926 operators: more bucket without moving to a larger class of machine. A 1.8 m³ bucket, 3.0 tonne rated load and a slightly larger cooling pack suit continuous aggregate handling and longer load-and-carry cycles in high ambient temperatures.",
    image: { src: "/images/load-x/lx-930-cutout.webp", alt: "LOAD-X LX-930 wheel loader" },
    cutoutImage: { src: "/images/load-x/lx-930-cutout.webp", alt: "LOAD-X LX-930 wheel loader, isolated on white" },
    gallery: [{ src: "/images/load-x/lx-930-cutout.webp", alt: "LOAD-X LX-930 wheel loader" }],
    highlights: [
      { label: "Operating weight", value: "10,900", unit: "kg" },
      { label: "Bucket capacity", value: "1.8", unit: "m³" },
      { label: "Rated load", value: "3,000", unit: "kg" },
      { label: "Engine power", value: "97", unit: "kW" },
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          { label: "Engine model", value: "Weichai WP6G130E22" },
          { label: "Rated power", value: "97", unit: "kW (130 hp)" },
          { label: "Rated speed", value: "2,200", unit: "rpm" },
          { label: "Displacement", value: "6.2", unit: "L" },
          { label: "Emission standard", value: "Stage II equivalent" },
        ],
      },
      {
        title: "Operating",
        specs: [
          { label: "Operating weight", value: "10,900", unit: "kg" },
          { label: "Rated load", value: "3,000", unit: "kg" },
          { label: "Bucket capacity", value: "1.8", unit: "m³" },
          { label: "Breakout force", value: "112", unit: "kN" },
          { label: "Static tipping load (full turn)", value: "7,100", unit: "kg" },
          { label: "Max travel speed", value: "36", unit: "km/h" },
        ],
      },
      {
        title: "Transmission and Axles",
        specs: [
          { label: "Transmission", value: "Countershaft powershift" },
          { label: "Gears", value: "4 forward / 3 reverse" },
          { label: "Brakes", value: "Four-wheel wet disc" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Overall length", value: "7,250", unit: "mm" },
          { label: "Overall width (bucket)", value: "2,560", unit: "mm" },
          { label: "Overall height (cab)", value: "3,320", unit: "mm" },
          { label: "Dump height", value: "3,100", unit: "mm" },
        ],
      },
      {
        title: "Capacities",
        specs: [
          { label: "Fuel tank", value: "165", unit: "L" },
          { label: "Hydraulic tank", value: "125", unit: "L" },
          { label: "Tyre size", value: "17.5-25" },
        ],
      },
    ],
    features: [
      {
        title: "Larger bucket, same footprint",
        description: "Extra capacity over the LX-926 without a step up in transport width or site footprint.",
      },
      {
        title: "Uprated cooling",
        description: "Cooling pack sized for continuous duty in sustained high ambient temperatures.",
      },
      {
        title: "Common LX parts",
        description: "Shares filters, cutting edges and driveline components with the rest of the LX Series.",
      },
    ],
    relatedEquipmentSlugs: ["lx-926", "lx-936", "lx-950"],
    isFeatured: false,
    isPlaceholder: true,
    order: 3,
  },

  /* ---------------------------------------------------------------- LX-936 */
  {
    id: "eq-lx-936",
    slug: "lx-936",
    model: "LX-936",
    name: "LX-936 Wheel Loader",
    categorySlug: "wheel-loaders",
    brand: "LOAD-X",
    series: "LX Series",
    tagline: "Built to load, all day",
    summary:
      "A 9.5 tonne loader with a 1.8 m³ bucket and Weichai power, sized for crusher feed, batching plants and sustained truck loading.",
    description:
      "The LX-936 is the volume machine of the LX Series. A 92 kW Weichai WP6G125E22 drives a two-speed powershift and 4WD driveline, with a 1.8 m³ bucket and 3,000 kg rated load for continuous loading duty. Supplied new, CE / BV / SGS certified with ROPS and FOPS structures.",
    image: { src: "/brands/Load-x/lx936/lx-936-1.jpg", alt: "LOAD-X LX-936 wheel loader with bucket lowered on site" },
    featuredImage: { src: "/brands/Load-x/lx936/lx-936-white-1.jpg", alt: "LOAD-X LX-936 wheel loader, studio shot on white" },
    featuredHoverImage: { src: "/brands/Load-x/lx936/lx-936-white-2.jpg", alt: "LOAD-X LX-936 wheel loader, rear three-quarter studio shot on white" },
    cutoutImage: { src: "/images/load-x/lx-936-cutout.webp", alt: "LOAD-X LX-936 wheel loader, isolated on white" },
    gallery: [
      { src: "/brands/Load-x/lx936/lx-936-1.jpg", alt: "LOAD-X LX-936 wheel loader with bucket lowered on site" },
      { src: "/brands/Load-x/lx936/lx-936-2.jpg", alt: "LOAD-X LX-936 wheel loader, side profile on site" },
      { src: "/brands/Load-x/lx936/lx-936-3.jpg", alt: "LOAD-X LX-936 wheel loader, three-quarter view on site" },
    ],
    highlights: [
      { label: "Bucket capacity", value: "1.8", unit: "m³" },
      { label: "Rated output", value: "92", unit: "kW" },
      { label: "Total weight", value: "9,500", unit: "kg" },
      { label: "Rated load", value: "3,000", unit: "kg" },
    ],
    specs: [
      {
        title: "Identification",
        specs: [
          { label: "Brand", value: "LOAD-X" },
          { label: "Model", value: "LX-936" },
          { label: "Condition", value: "New" },
          { label: "Colour", value: "Yellow" },
          { label: "Certification", value: "CE, BV, SGS, ROPS & FOPS" },
          { label: "Warranty", value: "6 months" },
          { label: "Loading port", value: "China" },
          { label: "Minimum order", value: "1 set" },
          { label: "Supply capability", value: "25 sets/month" },
        ],
      },
      {
        title: "Operating",
        specs: [
          { label: "Total weight", value: "9,500", unit: "kg" },
          { label: "Rated load", value: "3,000", unit: "kg" },
          { label: "Bucket capacity", value: "1.8", unit: "m³" },
          { label: "Fuel type", value: "Diesel" },
          { label: "Wheel quantity (F/R)", value: "2 / 2" },
          { label: "Tyre type (F/R)", value: "Pneumatic / Pneumatic" },
        ],
      },
      {
        title: "Engine",
        specs: [
          { label: "Manufacturer", value: "Weichai" },
          { label: "Type", value: "WP6G125E22" },
          { label: "Rated output", value: "92", unit: "kW" },
          { label: "Rated torque", value: "2,200", unit: "r/min" },
          { label: "Maximum torque", value: "500", unit: "N·m" },
          { label: "Min fuel-consume ratio", value: "<210", unit: "kW·h" },
          { label: "Cylinders", value: "6" },
        ],
      },
      {
        title: "Transmission",
        specs: [
          { label: "Converter model", value: "YJ315-X" },
          { label: "Gear shifts", value: "2 forward, 2 reverse" },
          { label: "Max speed", value: "39", unit: "km/h" },
          { label: "Drive mode", value: "4WD" },
        ],
      },
      {
        title: "Axle and Brakes",
        specs: [
          { label: "Axle type", value: "Decelerating type" },
          { label: "Service brake", value: "Pneumatic disc brake" },
          { label: "Park brake", value: "Hand operated caliper disc" },
        ],
      },
      {
        title: "Tyres and Dimensions",
        specs: [
          { label: "Quantity (F/R)", value: "2 / 2" },
          { label: "Front tyre size", value: "17.5-25" },
          { label: "Rear tyre size", value: "17.5-25" },
          { label: "Loader length", value: "7,000", unit: "mm" },
          { label: "Loader width", value: "2,420", unit: "mm" },
          { label: "Loader height", value: "3,150", unit: "mm" },
        ],
      },
    ],
    features: [
      {
        title: "Two-speed powershift",
        description: "Two forward and two reverse gears on a YJ315-X converter, matched to load-and-carry cycles rather than one fixed ratio.",
      },
      {
        title: "Weichai WP6G125E22",
        description: "Six-cylinder diesel at 92 kW and 500 N·m, the driveline most widely serviced and stocked for in this class.",
      },
      {
        title: "Certified and warranted",
        description: "Supplied new with CE, BV and SGS certification, ROPS and FOPS structures and a 6 month warranty.",
      },
    ],
    relatedEquipmentSlugs: ["lx-926", "lx-930", "lx-950"],
    isFeatured: true,
    isPlaceholder: false,
    order: 4,
  },
  /* ---------------------------------------------------------------- LX-950 */
  {
    id: "eq-lx-950",
    slug: "lx-950",
    model: "LX-950",
    name: "LX-950 Wheel Loader",
    categorySlug: "wheel-loaders",
    brand: "LOAD-X",
    series: "LX Series",
    tagline: "Built for tonnes per hour",
    summary:
      "The largest machine in the LX Series. 5.0 tonne rated load and a 3.0 m³ bucket for mining, quarrying and bulk terminals.",
    description:
      "The LX-950 is specified for operations measured in tonnes per hour: quarry loading, port bulk handling, mine site stockpiles. A 162 kW engine, 3.0 m³ bucket and heavy-duty axles carry sustained full-bucket work, while the larger cooling package and higher-capacity filtration are built around long shifts in dust and heat.",
    image: { src: "/images/load-x/lx-950-cutout.webp", alt: "LOAD-X LX-950 wheel loader" },
    cutoutImage: { src: "/images/load-x/lx-950-cutout.webp", alt: "LOAD-X LX-950 wheel loader, isolated on white" },
    gallery: [
      { src: "/images/load-x/lx-950-cutout.webp", alt: "LOAD-X LX-950 wheel loader" },
    ],
    highlights: [
      { label: "Operating weight", value: "17,200", unit: "kg" },
      { label: "Bucket capacity", value: "3.0", unit: "m³" },
      { label: "Rated load", value: "5,000", unit: "kg" },
      { label: "Engine power", value: "162", unit: "kW" },
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          { label: "Engine model", value: "Weichai WD10G220E23" },
          { label: "Rated power", value: "162", unit: "kW (220 hp)" },
          { label: "Rated speed", value: "2,000", unit: "rpm" },
          { label: "Displacement", value: "9.7", unit: "L" },
          { label: "Emission standard", value: "Stage II equivalent" },
        ],
      },
      {
        title: "Operating",
        specs: [
          { label: "Operating weight", value: "17,200", unit: "kg" },
          { label: "Rated load", value: "5,000", unit: "kg" },
          { label: "Bucket capacity", value: "3.0", unit: "m³" },
          { label: "Breakout force", value: "175", unit: "kN" },
          { label: "Static tipping load (full turn)", value: "11,800", unit: "kg" },
          { label: "Max travel speed", value: "38", unit: "km/h" },
        ],
      },
      {
        title: "Transmission and Axles",
        specs: [
          { label: "Transmission", value: "Countershaft powershift" },
          { label: "Gears", value: "4 forward / 3 reverse" },
          { label: "Axles", value: "Heavy-duty, wet disc brakes" },
        ],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Overall length", value: "8,180", unit: "mm" },
          { label: "Overall width (bucket)", value: "3,020", unit: "mm" },
          { label: "Overall height (cab)", value: "3,480", unit: "mm" },
          { label: "Dump height", value: "3,250", unit: "mm" },
        ],
      },
      {
        title: "Capacities",
        specs: [
          { label: "Fuel tank", value: "300", unit: "L" },
          { label: "Hydraulic tank", value: "210", unit: "L" },
          { label: "Tyre size", value: "23.5-25" },
        ],
      },
    ],
    features: [
      {
        title: "Bulk handling capacity",
        description: "3.0 m³ bucket sized to load standard haul trucks in fewer passes.",
      },
      {
        title: "Heavy-duty axles",
        description: "Rated for sustained full-bucket operation on poor underfoot conditions.",
      },
      {
        title: "High-capacity filtration",
        description: "Larger air and hydraulic filtration for long shifts in heavy dust.",
      },
    ],
    relatedEquipmentSlugs: ["lx-936", "lx-930"],
    isFeatured: true,
    isPlaceholder: true,
    order: 5,
  },
];
