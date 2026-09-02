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
 * Figures are internally consistent and typical of each machine class, so the
 * UI can be judged with realistic data. Those records carry
 * `isPlaceholder: true` until the client supplies real spec sheets.
 *
 * THREE MACHINES, NOT FIVE. The LX-650 and the LX-950 were removed on the
 * client's instruction — neither is available, so neither is shown. Their
 * records, galleries and cutouts went with them, and the two remaining
 * `relatedEquipmentSlugs` lists that pointed at them were trimmed rather than
 * left to resolve to nothing.
 * ---------------------------------------------------------------------------
 */
export const equipment: Equipment[] = [
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
    /* The cutout is the replacement studio shot: bucket down, matching the pose
       the LX-930 and LX-936 are photographed in. The forecourt photograph that
       briefly led this record was withdrawn along with its file. */
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
    relatedEquipmentSlugs: ["lx-936", "lx-930"],
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
    image: { src: "/images/load-x/lx-930/lx-930-01.webp", alt: "LOAD-X LX-930 wheel loader, front three-quarter view with the bucket down" },
    cutoutImage: { src: "/images/load-x/lx-930-cutout.webp", alt: "LOAD-X LX-930 wheel loader, isolated on white" },
    /* The supplied walkaround, in the running order the client asked for:
       the body, then the engine and bonnet, then tyres and axles, then the
       cab. The order is in the filenames rather than in a capture timestamp,
       so it survives a re-sort and reads correctly in any file browser. */
    gallery: [
      { src: "/images/load-x/lx-930/lx-930-01.webp", alt: "LOAD-X LX-930 wheel loader, front three-quarter view with the bucket down" },
      { src: "/images/load-x/lx-930/lx-930-02.webp", alt: "LOAD-X LX-930 wheel loader, side view, carrying its LX 930 badge" },
      { src: "/images/load-x/lx-930/lx-930-03.webp", alt: "LOAD-X LX-930 wheel loader, three-quarter view with the bucket raised" },
      { src: "/images/load-x/lx-930/lx-930-04.webp", alt: "LOAD-X LX-930 wheel loader, on the yard, bucket lowered" },
      { src: "/images/load-x/lx-930/lx-930-05.webp", alt: "LOAD-X LX-930 wheel loader, rear, counterweight and lamps" },
      { src: "/images/load-x/lx-930/lx-930-06.webp", alt: "LOAD-X LX-930 wheel loader, engine bay, turbocharger and manifold" },
      { src: "/images/load-x/lx-930/lx-930-07.webp", alt: "LOAD-X LX-930 wheel loader, engine under the raised bonnet" },
      { src: "/images/load-x/lx-930/lx-930-08.webp", alt: "LOAD-X LX-930 wheel loader, engine bay from the side" },
      { src: "/images/load-x/lx-930/lx-930-09.webp", alt: "LOAD-X LX-930 wheel loader, fluid reservoirs and filters under the bonnet" },
      { src: "/images/load-x/lx-930/lx-930-10.webp", alt: "LOAD-X LX-930 wheel loader, wheel and tyre" },
      { src: "/images/load-x/lx-930/lx-930-11.webp", alt: "LOAD-X LX-930 wheel loader, drive shaft and axle beneath the frame" },
      { src: "/images/load-x/lx-930/lx-930-12.webp", alt: "LOAD-X LX-930 wheel loader, steering wheel and dash" },
      { src: "/images/load-x/lx-930/lx-930-13.webp", alt: "LOAD-X LX-930 wheel loader, cab interior with the display screen" },
      { src: "/images/load-x/lx-930/lx-930-14.webp", alt: "LOAD-X LX-930 wheel loader, operator's seat and controls" },
      { src: "/images/load-x/lx-930/lx-930-15.webp", alt: "LOAD-X LX-930 wheel loader, cab from the doorway, seat and console" },
    ],
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
    relatedEquipmentSlugs: ["lx-926", "lx-936"],
    isFeatured: true,
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
    image: { src: "/images/load-x/lx-936/lx-936-01.webp", alt: "LOAD-X LX-936 wheel loader, side view, carrying its LX 936 badge" },
    featuredImage: { src: "/brands/Load-x/lx936/lx-936-white-1.jpg", alt: "LOAD-X LX-936 wheel loader, studio shot on white" },
    featuredHoverImage: { src: "/brands/Load-x/lx936/lx-936-white-2.jpg", alt: "LOAD-X LX-936 wheel loader, rear three-quarter studio shot on white" },
    cutoutImage: { src: "/images/load-x/lx-936-cutout.webp", alt: "LOAD-X LX-936 wheel loader, isolated on white" },
    /* The supplied walkaround, in the running order the client asked for:
       the body, then the engine and bonnet, then tyres and axles, then the
       cab. The order is in the filenames rather than in a capture timestamp,
       so it survives a re-sort and reads correctly in any file browser. */
    gallery: [
      { src: "/images/load-x/lx-936/lx-936-01.webp", alt: "LOAD-X LX-936 wheel loader, side view, carrying its LX 936 badge" },
      { src: "/images/load-x/lx-936/lx-936-02.webp", alt: "LOAD-X LX-936 wheel loader, head on, bucket down" },
      { src: "/images/load-x/lx-936/lx-936-03.webp", alt: "LOAD-X LX-936 wheel loader, front, loader arms and linkage" },
      { src: "/images/load-x/lx-936/lx-936-04.webp", alt: "LOAD-X LX-936 wheel loader, with the bucket raised" },
      { src: "/images/load-x/lx-936/lx-936-05.webp", alt: "LOAD-X LX-936 wheel loader, rear three-quarter view" },
      { src: "/images/load-x/lx-936/lx-936-06.webp", alt: "LOAD-X LX-936 wheel loader, side view under the canopy" },
      { src: "/images/load-x/lx-936/lx-936-07.webp", alt: "LOAD-X LX-936 wheel loader, rear, counterweight and lamps" },
      { src: "/images/load-x/lx-936/lx-936-08.webp", alt: "LOAD-X LX-936 wheel loader, engine under the raised bonnet" },
      { src: "/images/load-x/lx-936/lx-936-09.webp", alt: "LOAD-X LX-936 wheel loader, engine bay from the front" },
      { src: "/images/load-x/lx-936/lx-936-10.webp", alt: "LOAD-X LX-936 wheel loader, fluid reservoirs and hoses under the bonnet" },
      { src: "/images/load-x/lx-936/lx-936-11.webp", alt: "LOAD-X LX-936 wheel loader, wheel and tyre" },
      { src: "/images/load-x/lx-936/lx-936-12.webp", alt: "LOAD-X LX-936 wheel loader, wheel hub and brake assembly" },
      { src: "/images/load-x/lx-936/lx-936-13.webp", alt: "LOAD-X LX-936 wheel loader, articulation joint and rear frame" },
      { src: "/images/load-x/lx-936/lx-936-14.webp", alt: "LOAD-X LX-936 wheel loader, cab interior, seat and steering" },
      { src: "/images/load-x/lx-936/lx-936-15.webp", alt: "LOAD-X LX-936 wheel loader, steering wheel and column" },
      { src: "/images/load-x/lx-936/lx-936-16.webp", alt: "LOAD-X LX-936 wheel loader, operator's console and joystick" },
      { src: "/images/load-x/lx-936/lx-936-17.webp", alt: "LOAD-X LX-936 wheel loader, in-cab display screen" },
      { src: "/images/load-x/lx-936/lx-936-18.webp", alt: "LOAD-X LX-936 wheel loader, instrument cluster" },
      { src: "/images/load-x/lx-936/lx-936-19.webp", alt: "LOAD-X LX-936 wheel loader, control knobs on the console" },
      { src: "/images/load-x/lx-936/lx-936-20.webp", alt: "LOAD-X LX-936 wheel loader, switch panel" },
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
    relatedEquipmentSlugs: ["lx-926", "lx-930"],
    isFeatured: true,
    isPlaceholder: false,
    order: 4,
  },

  /* ---------------------------------------------------------------- LW300FN */
  {
    id: "eq-lw300fn",
    slug: "lw300fn",
    model: "LW300FN",
    name: "LW300FN Wheel Loader",
    categorySlug: "backhoe-loaders",
    brand: "XCMG",
    tagline: "The yard machine",
    summary:
      "A 10.4 tonne loader with a 1.8 m³ bucket and 92 kW, for coal yards, stone plants and general site loading.",
    description:
      "XCMG's LW300FN is built for shovelling and loading material, and is applied to workplaces such as coal yards, railway works, construction areas and stone material factories. A 1.8 m³ bucket on a 3,000 kg rated load and a 2,600 mm wheelbase keep it manoeuvrable where a larger machine cannot turn.",
    image: { src: "/images/xcmg/lw300fn-cutout.webp", alt: "XCMG LW300FN wheel loader" },
    cutoutImage: { src: "/images/xcmg/lw300fn-cutout.webp", alt: "XCMG LW300FN wheel loader, isolated on white" },
    gallery: [{ src: "/images/xcmg/lw300fn-cutout.webp", alt: "XCMG LW300FN wheel loader" }],
    highlights: [
      { label: "Operating weight", value: "10,400", unit: "kg" },
      { label: "Bucket capacity", value: "1.8", unit: "m³" },
      { label: "Rated power", value: "92", unit: "kW" },
      { label: "Rated load", value: "3,000", unit: "kg" },
    ],
    specs: [
      {
        title: "Operating",
        specs: [
          { label: "Bucket capacity", value: "1.8", unit: "m³" },
          { label: "Operating weight", value: "10,400", unit: "kg" },
          { label: "Rated load", value: "3,000", unit: "kg" },
        ],
      },
      {
        title: "Engine",
        specs: [{ label: "Rated power", value: "92", unit: "kW" }],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Overall length", value: "7,050", unit: "mm" },
          { label: "Overall width", value: "2,482", unit: "mm" },
          { label: "Overall height", value: "3,118", unit: "mm" },
          { label: "Wheelbase", value: "2,600", unit: "mm" },
        ],
      },
    ],
    features: [
      {
        title: "Shovelling and loading duty",
        description:
          "XCMG lists it for coal yards, railway works, construction areas and stone material factories.",
      },
      {
        title: "1.8 m3 bucket on 92 kW",
        description:
          "A 1.8 cubic metre bucket and a 3,000 kg rated load, on 92 kW of rated power.",
      },
      {
        title: "The compact one of the three",
        description:
          "A 2,600 mm wheelbase and 7,050 mm overall length, the shortest XCMG loader carried.",
      },
    ],
    relatedEquipmentSlugs: ["lw500fn", "zl50gn"],
    isFeatured: true,
    isPlaceholder: false,
    order: 5,
  },

  /* ---------------------------------------------------------------- LW500FN */
  {
    id: "eq-lw500fn",
    slug: "lw500fn",
    model: "LW500FN",
    name: "LW500FN Wheel Loader",
    categorySlug: "backhoe-loaders",
    brand: "XCMG",
    tagline: "Five tonnes of rated load",
    summary:
      "A 17 tonne loader carrying a 3.0 m³ bucket on 162 kW, for sustained loading in yards, quarries and railway works.",
    description:
      "XCMG's LW500FN is suited to shovelling and loading material, and is applied to workplaces such as coal yards, railway works, construction areas and stone material factories. A 3.0 m³ bucket and 5,000 kg rated load on a 3,050 mm wheelbase put it in the five-tonne class for continuous truck and hopper loading.",
    image: { src: "/images/xcmg/lw500fn-cutout.webp", alt: "XCMG LW500FN wheel loader" },
    cutoutImage: { src: "/images/xcmg/lw500fn-cutout.webp", alt: "XCMG LW500FN wheel loader, isolated on white" },
    gallery: [{ src: "/images/xcmg/lw500fn-cutout.webp", alt: "XCMG LW500FN wheel loader" }],
    highlights: [
      { label: "Operating weight", value: "17,000", unit: "kg" },
      { label: "Bucket capacity", value: "3.0", unit: "m³" },
      { label: "Rated power", value: "162", unit: "kW" },
      { label: "Rated load", value: "5,000", unit: "kg" },
    ],
    specs: [
      {
        title: "Operating",
        specs: [
          { label: "Bucket capacity", value: "3.0", unit: "m³" },
          { label: "Operating weight", value: "17,000", unit: "kg" },
          { label: "Rated load", value: "5,000", unit: "kg" },
        ],
      },
      {
        title: "Engine",
        specs: [{ label: "Rated power", value: "162", unit: "kW" }],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Overall length", value: "8,100", unit: "mm" },
          { label: "Overall width", value: "2,996", unit: "mm" },
          { label: "Overall height", value: "3,515", unit: "mm" },
          { label: "Wheelbase", value: "3,050", unit: "mm" },
        ],
      },
    ],
    features: [
      {
        title: "Five-tonne rated load",
        description:
          "A 3.0 cubic metre bucket and a 5,000 kg rated load, on 162 kW of rated power.",
      },
      {
        title: "Shovelling and loading duty",
        description:
          "XCMG lists it for coal yards, railway works, construction areas and stone material factories.",
      },
      {
        title: "17 tonne platform",
        description:
          "A 3,050 mm wheelbase under an 8,100 mm machine, at 17,000 kg operating weight.",
      },
    ],
    relatedEquipmentSlugs: ["zl50gn", "lw300fn"],
    isFeatured: true,
    isPlaceholder: false,
    order: 6,
  },

  /* ---------------------------------------------------------------- ZL50GN */
  {
    id: "eq-zl50gn",
    slug: "zl50gn",
    model: "ZL50GN",
    name: "ZL50GN Wheel Loader",
    categorySlug: "backhoe-loaders",
    brand: "XCMG",
    tagline: "The cross-generation five-tonne",
    summary:
      "A 17.15 tonne loader with a 3.2 m³ bucket and 162 kW, developed for construction, aggregate yards and coal logistics.",
    description:
      "The ZL50GN is XCMG's cross-generation wheel loader, developed on the basis of the group's globalised technical resources. Focused on customer value and operator experience, it is aimed at efficiency in engineering construction, aggregate yards and coal logistics, with a 3.2 m³ bucket and a 5,500 kg rated load on a 3,300 mm wheelbase.",
    image: { src: "/images/xcmg/zl50gn-cutout.webp", alt: "XCMG ZL50GN wheel loader" },
    cutoutImage: { src: "/images/xcmg/zl50gn-cutout.webp", alt: "XCMG ZL50GN wheel loader, isolated on white" },
    gallery: [{ src: "/images/xcmg/zl50gn-cutout.webp", alt: "XCMG ZL50GN wheel loader" }],
    highlights: [
      { label: "Operating weight", value: "17,150", unit: "kg" },
      { label: "Bucket capacity", value: "3.2", unit: "m³" },
      { label: "Rated power", value: "162", unit: "kW" },
      { label: "Rated load", value: "5,500", unit: "kg" },
    ],
    specs: [
      {
        title: "Operating",
        specs: [
          { label: "Bucket capacity", value: "3.2", unit: "m³" },
          { label: "Operating weight", value: "17,150", unit: "kg" },
          { label: "Rated load", value: "5,500", unit: "kg" },
        ],
      },
      {
        title: "Engine",
        specs: [{ label: "Rated power", value: "162", unit: "kW" }],
      },
      {
        title: "Dimensions",
        specs: [
          { label: "Overall length", value: "8,350", unit: "mm" },
          { label: "Overall width", value: "2,996", unit: "mm" },
          { label: "Overall height", value: "3,515", unit: "mm" },
          { label: "Wheelbase", value: "3,300", unit: "mm" },
        ],
      },
    ],
    features: [
      {
        title: "Cross-generation development",
        description:
          "XCMG describes it as its cross-generation loader, developed on the group's globalised technical resources.",
      },
      {
        title: "The largest bucket of the three",
        description:
          "A 3.2 cubic metre bucket and a 5,500 kg rated load, on 162 kW of rated power.",
      },
      {
        title: "Construction, aggregate and coal",
        description:
          "The fields XCMG names for it are engineering construction, aggregate yards and coal logistics.",
      },
    ],
    relatedEquipmentSlugs: ["lw500fn", "lw300fn"],
    isFeatured: true,
    isPlaceholder: false,
    order: 7,
  },
];
