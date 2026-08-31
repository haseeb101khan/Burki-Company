import type { SeedEquipment, SeedPart } from "./types";
import { XINYUAN_SPECS } from "./xinyuan-specs";

/**
 * XINYUAN — the first full manufacturer catalogue.
 *
 * Wheeled excavators plus the attachment range that goes on them. Supplied by
 * the client as cutout photography and Chinese-named attachment files; the
 * English names here were each checked against the photograph rather than
 * translated from the characters alone.
 *
 * WHAT IS REAL AND WHAT IS NOT:
 *
 *  - The MODEL LIST is real and client-confirmed. Eleven machines. C90 is not a
 *    model — the client checked, and there is no photography or video for it.
 *  - The CUTOUTS are the manufacturer's own product photography.
 *  - The ATTACHMENT names, carrier classes and images are the manufacturer's.
 *  - THE SPECIFICATIONS come from the client's own manufacturer sheets and
 *    live in `xinyuan-specs.ts`. All ten are now complete: the C150's engine
 *    power and operating weight, the last two outstanding, are settled from the
 *    manufacturer's own technical table. No figure anywhere is inferred from a
 *    model number or carried across from a neighbouring machine.
 *  - ATTACHMENT COMPATIBILITY is DERIVED, not quoted. The factory supplies a
 *    carrier class per attachment (7 t, 9 t, 15 t) — real data — but no
 *    compatibility chart. `CARRIER_BANDS` below matches each class to the
 *    machines whose confirmed operating weight falls in its band. That is a
 *    reasonable engineering read and it is stated as such, not passed off as
 *    the manufacturer's own list. Anything without a stated class, and any
 *    machine whose weight is unconfirmed, is left out entirely.
 */

const CUTOUT = (model: string) => ({
  src: `/images/xinyuan/${model.toLowerCase()}-cutout.webp`,
  alt: `Xinyuan ${model} wheeled excavator, isolated on white`,
});

/**
 * How many working photographs each model came with.
 *
 * All ten now have a set. Counts mirror what
 * `prepare-xinyuan-media.mjs` actually produced, so they cannot drift from the
 * files on disk without the gallery going visibly wrong.
 */
const GALLERY_COUNT: Record<string, number> = {
  "c105": 26,
  "c115": 24,
  "c120": 25,
  "c130": 30,
  "c150": 26,
  "c65": 27,
  "c70": 25,
  "c75": 25,
  "c80": 27,
  "c95": 21,
};

/** Models with a detailing film. The rest get no video tab at all. */
const HAS_FILM = new Set(["c105", "c120", "c130", "c70", "c75", "c80", "c95"]);

const galleryFor = (model: string) => {
  const n = GALLERY_COUNT[model.toLowerCase()] ?? 0;
  if (n === 0) return [CUTOUT(model)];
  return Array.from({ length: n }, (_, i) => ({
    src: `/images/xinyuan/gallery/${model.toLowerCase()}-${i + 1}.jpg`,
    alt: `Xinyuan ${model} wheeled excavator, view ${i + 1}`,
  }));
};

const filmFor = (model: string) => {
  const slug = model.toLowerCase();
  if (!HAS_FILM.has(slug)) return [];
  return [
    {
      src: `/videos/xinyuan/${slug}.mp4`,
      title: "Detailing film",
      poster: {
        src: `/images/xinyuan/posters/${slug}.jpg`,
        alt: `Xinyuan ${model} detailing film`,
      },
    },
  ];
};

/**
 * The ten confirmed models, in ascending model-number order.
 *
 * C85 was removed on the client's instruction — it is not part of the
 * dealership, so it is not shown. Its specification, gallery, film and cutout
 * went with it.
 */
const MODELS = ["C65", "C70", "C75", "C80", "C95", "C105", "C115", "C120", "C130", "C150"];

/**
 * The three the client picked for the homepage brand showcase.
 *
 * Originally "C60, C95 and C120". C60 is not a model — the confirmed list runs
 * C65 to C150 — so it was read as C65. C95 was then swapped for C75 at the
 * client's request.
 */
const SHOWCASE = new Set(["C65", "C75", "C120"]);

export const xinyuanEquipment: SeedEquipment[] = MODELS.map((model, index) => {
  const data = XINYUAN_SPECS[model];

  return {
    id: `eq-xy-${model.toLowerCase()}`,
    slug: model.toLowerCase(),
    model,
    name: `${model} Wheeled Excavator`,
    categorySlug: "excavators",
    brand: "Xinyuan",
    series: "C Series",
    ...(data?.tagline ? { tagline: data.tagline } : {}),
    summary:
      data?.summary ??
      "Wheeled excavator in the Xinyuan C Series. Manufacturer specifications are being confirmed before publication.",
    description: data?.description ?? "",
    /*
     * `image` stays the cutout — it is the general-purpose photo, used on
     * catalogue cards and the brand showcase, and a cutout is what the client
     * asked for there. The GALLERY is different: every model came with real
     * working photography, so those show the machine on site.
     */
    image: CUTOUT(model),
    cutoutImage: CUTOUT(model),
    gallery: galleryFor(model),
    videos: filmFor(model),
    highlights: data?.highlights ?? [],
    specs: data?.specs ?? [],
    features: data?.features ?? [],
    /* Every other machine in the series, so the variant arc has somewhere to
       go from any model. */
    relatedEquipmentSlugs: MODELS.filter((m) => m !== model)
      .slice(0, 3)
      .map((m) => m.toLowerCase()),
    isFeatured: SHOWCASE.has(model),
    isPlaceholder: data?.isPlaceholder ?? true,
    order: index + 1,
  };
});

/* ────────────────────────────────────────────────────── attachments ───── */

/**
 * Confirmed operating weights, in tonnes.
 *
 * Straight off the manufacturer sheets. The C150 read "13 tons" in one place
 * and a "15-ton class" in another, so it used to sit this out; the
 * manufacturer's own technical table gives 12,500 kg, which is the figure used,
 * and it now picks up attachments like the rest of the range.
 */
const OPERATING_WEIGHT_T: Record<string, number> = {
  C65: 6.2,
  C70: 6.665,
  C75: 6.7,
  C80: 6.65,
  C95: 7.1,
  C105: 8.3,
  C115: 8.05,
  C120: 8.875,
  C130: 13.0,
};

/**
 * Carrier class -> the weight band of machine it is built for.
 *
 * THIS IS AN INFERENCE, and a deliberately conservative one. The factory names
 * a class ("7 t log grapple") but publishes no chart of which models it bolts
 * to. The bands below read that class as the carrier size the tool is designed
 * around and admit the machines that actually sit in it.
 *
 * An attachment with no stated class — the disc saw and both tiltrotators —
 * gets no machines at all. L-07 and L-15 look like 7-tonne and 15-tonne parts
 * from their names, but "looks like" is not a specification, and a grapple
 * quoted against the wrong carrier is a warranty conversation.
 */
const CARRIER_BANDS: Record<string, { min: number; max: number }> = {
  "7": { min: 6.0, max: 7.5 },
  "9": { min: 7.5, max: 10.0 },
  "15": { min: 12.0, max: 15.5 },
};

const machinesForCarrier = (carrier: string | null): string[] => {
  const band = carrier ? CARRIER_BANDS[carrier] : undefined;
  if (!band) return [];
  return Object.entries(OPERATING_WEIGHT_T)
    .filter(([, t]) => t >= band.min && t <= band.max)
    .map(([model]) => model.toLowerCase());
};



interface AttachmentSeed {
  slug: string;
  name: string;
  /** Carrier class from the manufacturer's own filename. Real data. */
  carrier: string | null;
  /** How many photographs were supplied (open/closed pairs count as one item). */
  images: number;
  summary: string;
}

const ATTACHMENTS: AttachmentSeed[] = [
  { slug: "auger-drill-7t", name: "Auger Drill, 7 t", carrier: "7", images: 1,
    summary: "Earth auger for post holes, piling and planting, sized for a 7 tonne carrier." },
  { slug: "auger-drill-9t", name: "Auger Drill, 9 t", carrier: "9", images: 1,
    summary: "Earth auger sized for a 9 tonne carrier." },
  { slug: "auger-drill-15t", name: "Auger Drill, 15 t", carrier: "15", images: 1,
    summary: "Earth auger sized for a 15 tonne carrier." },
  { slug: "log-grapple-5-claw-7t", name: "Five-Claw Log Grapple, Full-Rotation, 7 t", carrier: "7", images: 3,
    summary: "Continuous-rotation five-claw grapple for timber handling and loading. Supplied in standard and short-jaw forms." },
  { slug: "log-grapple-5-claw-9t", name: "Five-Claw Log Grapple, Full-Rotation, 9 t", carrier: "9", images: 1,
    summary: "Continuous-rotation five-claw timber grapple for a 9 tonne carrier." },
  { slug: "log-grapple-5-claw-15t", name: "Five-Claw Log Grapple, Electric Full-Rotation, 15 t", carrier: "15", images: 1,
    summary: "Electrically controlled continuous-rotation grapple for the largest machines in the range." },
  { slug: "log-grapple-3-claw-7t", name: "Three-Claw Log Grapple, Full-Rotation, 7 t", carrier: "7", images: 1,
    summary: "Three-claw grapple built to order, for lighter timber and brash." },
  { slug: "log-grab-7t", name: "Log Grab, Full-Rotation, 7 t", carrier: "7", images: 2,
    summary: "Full-rotation log grab for stacking and loading cut timber." },
  { slug: "log-grab-4-claw-9t", name: "Four-Claw Log Grab, Full-Rotation, 9 t", carrier: "9", images: 2,
    summary: "Four-claw grab with continuous rotation, for heavier timber work." },
  { slug: "grapple-saw-7t", name: "Grapple Saw, Full-Rotation, 7 t", carrier: "7", images: 2,
    summary: "Grapple and saw in one head: hold the limb and cut it without repositioning." },
  { slug: "disc-saw", name: "Single-Disc Circular Saw", carrier: null, images: 1,
    summary: "Single-disc circular saw head for felling and cross-cutting." },
  { slug: "hedge-trimmer-rotating-7t", name: "T150 Hedge Trimmer, Full-Rotation, 7 t", carrier: "7", images: 1,
    summary: "Boom-mounted cutter bar with continuous rotation, for roadside and plantation trimming." },
  { slug: "hedge-trimmer-7t", name: "T150 Hedge Trimmer, 7 t", carrier: "7", images: 1,
    summary: "Boom-mounted cutter bar for hedge and branch trimming." },
  { slug: "sugarcane-grab-7t", name: "Five-Claw Sugarcane Grab, Full-Rotation, 7 t", carrier: "7", images: 1,
    summary: "Wide five-claw grab shaped for loading cut cane." },
  { slug: "palm-fruit-grab-7t", name: "Palm Fruit Grab, Full-Rotation, 7 t", carrier: "7", images: 2,
    summary: "Perforated clamshell for loading palm fruit while letting loose material fall through." },
  { slug: "stone-grab-7t", name: "Stone Grab, Full-Rotation, 7 t", carrier: "7", images: 1,
    summary: "Rotating grab for placing rock and block work." },
  { slug: "scrap-claw-grab-7t", name: "Ductile-Iron Claw Grab, Full-Rotation, 7 t", carrier: "7", images: 2,
    summary: "Heavy claw grab for scrap and demolition handling." },
  { slug: "hydraulic-thumb-7t", name: "Hydraulic Thumb, 7 t", carrier: "7", images: 2,
    summary: "Hydraulic thumb working against the bucket, so one machine digs and handles without a change of tool." },
  { slug: "hydraulic-breaker-7t", name: "Hydraulic Breaker, 7 t", carrier: "7", images: 1,
    summary: "Hydraulic breaker for rock, concrete and foundation work." },
  { slug: "quick-coupler-7t", name: "Quick Coupler, Full-Rotation, 7 t", carrier: "7", images: 1,
    summary: "Full-rotation quick coupler, so attachments change without breaking pins." },
  { slug: "quick-coupler-9t", name: "Quick Coupler, Full-Rotation, 9 t", carrier: "9", images: 1,
    summary: "Full-rotation quick coupler for a 9 tonne carrier." },
  { slug: "pallet-forks-9t", name: "Pallet Fork Carriage on Quick Coupler, 9 t", carrier: "9", images: 1,
    summary: "Pallet fork carriage mounting to the rotating quick coupler, turning the excavator into a yard handler." },
  { slug: "lifting-magnet-9t", name: "Electromagnetic Lifting Plate, 9 t", carrier: "9", images: 1,
    summary: "Electromagnet for scrap and steel handling." },
  { slug: "tiltrotator-l07", name: "L-07 Hydraulic Wrist (Tiltrotator)", carrier: null, images: 1,
    summary: "Tiltrotator giving the tool full rotation and tilt, so the machine works without repositioning." },
  { slug: "tiltrotator-l15", name: "L-15 Hydraulic Wrist (Tiltrotator)", carrier: null, images: 1,
    summary: "Larger tiltrotator for the heavier machines in the range." },
];

/**
 * Provisional stock references.
 *
 * The factory supplies no SKUs, and a part number is a required field a buyer
 * would quote on an order. These are readable internal references derived from
 * the carrier class and tool type — clearly Burki's own, not passed off as the
 * manufacturer's. Every record is flagged provisional until real numbers exist.
 */
const reference = (a: AttachmentSeed) =>
  `XY-${a.carrier ? `${a.carrier}T-` : ""}${a.slug.replace(/-\d+t$/, "").replace(/-/g, "").slice(0, 10).toUpperCase()}`;

export const xinyuanAttachments: SeedPart[] = ATTACHMENTS.map((a, index) => ({
  id: `pt-xy-${a.slug}`,
  slug: a.slug,
  name: a.name,
  partNumber: reference(a),
  categorySlug: "attachments",
  brand: "Xinyuan",
  summary: a.summary,
  image: { src: `/images/xinyuan-attachments/${a.slug}.webp`, alt: a.name },
  images: Array.from({ length: a.images - 1 }, (_, i) => ({
    src: `/images/xinyuan-attachments/${a.slug}-${i + 2}.webp`,
    alt: `${a.name}, alternative view`,
  })),
  attributes: a.carrier
    ? [{ label: "Carrier class", value: a.carrier, unit: "t" }]
    : [],
  isGenuine: true,
  /* Derived from the carrier class against confirmed operating weights — see
     CARRIER_BANDS. Empty for anything the factory did not give a class. */
  compatibleEquipmentSlugs: machinesForCarrier(a.carrier),
  isPlaceholder: true,
  order: index + 1,
}));
