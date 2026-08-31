import type { Feature, Highlight, SpecGroup } from "../../src/lib/data/types";

/**
 * XINYUAN C SERIES — manufacturer specifications, as supplied.
 *
 * Every figure here comes from the client's own spec sheets. Nothing is
 * inferred from a model number, and nothing marked "to be confirmed" in the
 * source has been filled in with an estimate — those rows are simply absent,
 * because a plausible-looking guess on a dealer's spec table is worse than a
 * missing line.
 *
 * FOUR ODDITIES IN THE SOURCE, and how each is resolved:
 *
 *  1. C70 — the summary block gives "Max Digging Force 50 kN" while the
 *     specification table gives digging 30 kN and TRACTION 50 kN. The table is
 *     internally consistent and matches the pattern of every other model, so it
 *     is treated as correct and the summary as a mislabelling.
 *  2. C115 — the summary block is headed "XYC130MWT" at 66.5 kW; the
 *     specification table beneath it says XYC115WT at 73.5 kW. The table is
 *     used. The summary block looks like it was copied from another model.
 *  3. C150 — engine power is given only as an estimate ("92-110 kW") and
 *     operating weight as both "13 tons" and "15-ton class". Neither is
 *     published here. Both are flagged for the client to confirm.
 *
 *  4. C95 — an online "C95W" listing gives 8,875 kg and 73.5 kW, matching the
 *     C120W exactly. The client's own sheet gives 7,100 kg and 48 kW for a
 *     C95 G4 grapple machine. The manufacturer's sheet is used; the listing
 *     describes some other configuration and is disregarded.
 *
 * Models still incomplete: only the C150, which is missing engine power and a
 * settled operating weight. Every other model in the range has a full sheet.
 */

export interface XinyuanModelData {
  tagline?: string;
  /** Card and search copy. Written per model, not sliced off the description. */
  summary?: string;
  description?: string;
  highlights?: Highlight[];
  specs?: SpecGroup[];
  features?: Feature[];
  /** False once a full manufacturer sheet is in and reconciled. */
  isPlaceholder: boolean;
}

const s = (label: string, value: string, unit?: string) =>
  unit ? { label, value, unit } : { label, value };

/** Shared across the range — stated identically on every sheet that lists them. */
const CAB_FEATURES: Feature[] = [
  {
    title: "Full-colour LCD instrument panel",
    description:
      "Multi-function display carrying machine status and operating information at a glance, with a parking button on the joystick.",
  },
  {
    title: "Reversible operating handle",
    description:
      "Controls flip for travelling and for digging, so the operator faces the work either way round.",
  },
  {
    title: "Dual-camera monitoring",
    description:
      "Front and rear cameras with enlarged mirrors, cutting the blind spots that matter on a busy site.",
  },
  {
    title: "Attachment-ready hydraulics",
    description:
      "Plumbed for a hydraulic breaker with auxiliary lines and a proportional electric control handle. Quick coupler optional.",
  },
];

export const XINYUAN_SPECS: Record<string, XinyuanModelData> = {
  /* ─────────────────────────────────────────────────────────── C65 ───── */
  C65: {
    tagline: "Stage IV clean, and quick between jobs",
    summary:
      "A 6.2 tonne wheeled excavator on a Stage IV Yuchai F30, travelling at 28 km/h between sites on four-wheel hydraulic disc brakes.",
    description:
      "The C65 is the compact end of the C Series: a 6.2 tonne wheeled excavator on a Yuchai F30 engine certified to non-road Stage IV, without giving up power to get there. A 28 km/h travel speed and 1,975 mm width let it move itself between sites rather than waiting on a low-loader, and four-wheel hydraulic disc brakes and dual cameras keep that practical on public roads.",
    highlights: [
      s("Operating weight", "6,200", "kg"),
      s("Bucket capacity", "0.18", "m³"),
      s("Engine power", "36.8", "kW"),
      s("Max digging force", "35", "kN"),
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          s("Engine model", "Yuchai F30"),
          s("Emission standard", "Non-road Stage IV"),
          s("Displacement", "2,982", "mL"),
          s("Rated power", "36.8", "kW"),
          s("Rated speed", "2,200", "rpm"),
        ],
      },
      {
        title: "Operating",
        specs: [
          s("Operating weight", "6,200", "kg"),
          s("Bucket capacity", "0.18", "m³"),
          s("Fuel tank", "135", "L"),
          s("Hydraulic tank", "120", "L"),
          s("Hydraulic flow rate", "190", "L/min"),
          s("Main relief valve", "24.5", "MPa"),
          s("Swing pressure", "21.5", "MPa"),
        ],
      },
      {
        title: "Performance",
        specs: [
          s("Max digging force", "35", "kN"),
          s("Max traction force", "35", "kN"),
          s("Max travel speed", "28", "km/h"),
          s("Platform swing speed", "8.5", "rpm"),
        ],
      },
      {
        title: "Dimensions",
        specs: [
          s("Overall length", "5,855", "mm"),
          s("Overall width", "1,975", "mm"),
          s("Overall height", "2,800", "mm"),
          s("Wheelbase", "2,410", "mm"),
          s("Min ground clearance", "250", "mm"),
          s("Front track", "1,570", "mm"),
          s("Rear track", "1,525", "mm"),
        ],
      },
      {
        title: "Working range",
        specs: [
          s("Max digging reach", "6,145", "mm"),
          s("Max digging depth", "3,315", "mm"),
          s("Max digging height", "5,910", "mm"),
          s("Max dumping height", "4,390", "mm"),
          s("Min front swing radius", "2,350", "mm"),
          s("Min tail swing radius", "1,650", "mm"),
        ],
      },
      {
        title: "Configuration",
        specs: [
          s("Drive system", "Hydrostatic transmission"),
          s("Brakes", "4-wheel hydraulic disc"),
          s("Boom length", "3,150", "mm"),
          s("Arm length", "1,750", "mm"),
          s("Standard bucket width", "630", "mm"),
          s("Blade width", "1,975", "mm"),
          s("Blade max rise", "390", "mm"),
          s("Blade max drop", "45", "mm"),
        ],
      },
    ],
    features: [
      {
        title: "Stage IV without losing power",
        description:
          "Meets non-road Stage IV emission limits while holding 36.8 kW, so tightening regulation does not cost productivity.",
      },
      ...CAB_FEATURES.slice(1),
    ],
    isPlaceholder: false,
  },

  /* ─────────────────────────────────────────────────────────── C70 ───── */
  C70: {
    tagline: "Built to move, built to last",
    summary:
      "A 6.7 tonne machine on Xinyuan's own reinforced axles, with four-wheel independent hydraulic braking and 50 kN of traction.",
    description:
      "The C70W is Xinyuan's own design, carrying more than eighty technical patents across the machine. A reinforced front and rear axle set, four-wheel independent hydraulic braking and heavy wear-resistant tyres give it a chassis meant for rough ground, while a 30 km/h road speed keeps it useful across scattered sites.",
    highlights: [
      s("Operating weight", "6,665", "kg"),
      s("Bucket capacity", "0.2", "m³"),
      s("Engine power", "48", "kW"),
      s("Max traction force", "50", "kN"),
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          s("Model", "XYC70WTJ"),
          s("Engine", "Yuchai 4F30"),
          s("Rated power", "48", "kW"),
          s("Rated speed", "2,200", "rpm"),
        ],
      },
      {
        title: "Operating",
        specs: [
          s("Operating weight", "6,665", "kg"),
          s("Bucket capacity", "0.2", "m³"),
          s("Main relief valve", "24", "MPa"),
          s("Fuel tank", "140", "L"),
          s("Hydraulic tank", "120", "L"),
        ],
      },
      {
        title: "Performance",
        specs: [
          s("Max digging force", "30", "kN"),
          s("Max traction force", "50", "kN"),
          s("Max travel speed", "30", "km/h"),
          s("Platform swing speed", "10.5", "rpm"),
          s("Gradeability", "35", "°"),
        ],
      },
      {
        title: "Dimensions",
        specs: [
          s("Overall length", "5,775", "mm"),
          s("Overall width", "2,010", "mm"),
          s("Overall height", "2,845", "mm"),
          s("Wheelbase", "2,456", "mm"),
          s("Tyre type", "8.25-16"),
          s("Ground contact width", "500", "mm"),
          s("Track", "1,595", "mm"),
          s("Min ground clearance", "285", "mm"),
        ],
      },
      {
        title: "Working range",
        specs: [
          s("Max digging reach", "6,535", "mm"),
          s("Max digging depth", "3,560", "mm"),
          s("Max digging height", "6,685", "mm"),
          s("Max dumping height", "4,875", "mm"),
          s("Min front swing radius", "2,275", "mm"),
          s("Min tail swing radius", "1,655", "mm"),
        ],
      },
      {
        title: "Configuration",
        specs: [
          s("Bucket width", "700", "mm"),
          s("Blade width", "2,070", "mm"),
          s("Blade max rise", "470", "mm"),
          s("Blade max drop", "50", "mm"),
          s("Certification", "CE, ISO 9001:2015, ISO 14001:2015"),
        ],
      },
    ],
    features: [
      {
        title: "Reinforced four-wheel chassis",
        description:
          "Xinyuan's own strengthened front and rear axles with four-wheel independent hydraulic brakes and heavy wear-resistant tyres.",
      },
      ...CAB_FEATURES.slice(0, 3),
    ],
    isPlaceholder: false,
  },

  /* ─────────────────────────────────────────────────────────── C75 ───── */
  C75: {
    tagline: "Long shifts, fewer stops",
    summary:
      "A 6.7 tonne excavator on an open hydraulic circuit built for dirty conditions, with tank capacity sized for long shifts.",
    description:
      "The C75W runs an open hydraulic system with an air-blown parallel radiator — mature, tolerant of dirty conditions and cheap to keep going. A larger fuel tank and the option of a bigger hydraulic tank extend the working day, and a new upper frame with double C-section side beams carries the load.",
    highlights: [
      s("Operating weight", "6,700", "kg"),
      s("Bucket capacity", "0.2", "m³"),
      s("Engine power", "50", "kW"),
      s("Max traction force", "50", "kN"),
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          s("Model", "XYC75WYTJ"),
          s("Engine", "Yuchai 4FA / Yuchai 4DK"),
          s("Rated power", "50", "kW"),
          s("Rated speed", "2,200", "rpm"),
        ],
      },
      {
        title: "Operating",
        specs: [
          s("Operating weight", "6,700", "kg"),
          s("Bucket capacity", "0.2", "m³"),
          s("Main relief valve", "22", "MPa"),
          s("Fuel tank", "130", "L"),
          s("Hydraulic tank", "135", "L"),
        ],
      },
      {
        title: "Performance",
        specs: [
          s("Max digging force", "30", "kN"),
          s("Max traction force", "50", "kN"),
          s("Max travel speed", "28", "km/h"),
          s("Platform swing speed", "10.5", "rpm"),
          s("Gradeability", "35", "°"),
        ],
      },
      {
        title: "Dimensions",
        specs: [
          s("Overall length", "6,005", "mm"),
          s("Overall width", "1,950", "mm"),
          s("Overall height", "2,845", "mm"),
          s("Wheelbase", "2,410", "mm"),
          s("Tyre type", "8.25-16"),
          s("Ground contact width", "430", "mm"),
          s("Track", "1,520", "mm"),
          s("Min ground clearance", "230", "mm"),
        ],
      },
      {
        title: "Working range",
        specs: [
          s("Max digging reach", "6,540", "mm"),
          s("Max digging depth", "3,365", "mm"),
          s("Max digging height", "6,657", "mm"),
          s("Max dumping height", "4,860", "mm"),
          s("Min front swing radius", "2,315", "mm"),
          s("Min tail swing radius", "1,840", "mm"),
        ],
      },
      {
        title: "Configuration",
        specs: [
          s("Bucket width", "700", "mm"),
          s("Blade width", "1,910", "mm"),
          s("Blade max rise", "390", "mm"),
          s("Blade max drop", "45", "mm"),
          s("Certification", "CE, ISO 9001:2015, ISO 14001:2015"),
        ],
      },
    ],
    features: [
      {
        title: "Open hydraulic system",
        description:
          "Air-blown parallel radiator and an open circuit: proven technology, high tolerance of contamination, low failure rate and simple maintenance.",
      },
      {
        title: "Long continuous operation",
        description:
          "High-capacity fuel tank with an enlarged hydraulic tank available, for shifts that do not stop to refill.",
      },
      ...CAB_FEATURES.slice(1, 3),
    ],
    isPlaceholder: false,
  },

  /* ─────────────────────────────────────────────────────────── C80 ───── */
  C80: {
    tagline: "Extra reach on the same footprint",
    summary:
      "Nearly 7 metres of reach and 3.65 metres of depth on a 6.65 tonne chassis that still travels at 30 km/h.",
    description:
      "The C80W carries the longest working envelope of the six-tonne machines in the range — nearly 7 metres of reach and 3.65 metres of depth — on a chassis that still travels at 30 km/h. It shares the C75's open hydraulic system and upgraded upper frame, with a wider 195/85-20 tyre for load carrying.",
    highlights: [
      s("Operating weight", "6,650", "kg"),
      s("Bucket capacity", "0.2", "m³"),
      s("Engine power", "48", "kW"),
      s("Max digging reach", "6,950", "mm"),
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          s("Model", "XYC80WYT"),
          s("Engine", "Yuchai F3065-T300"),
          s("Rated power", "48", "kW"),
          s("Rated speed", "2,200", "rpm"),
        ],
      },
      {
        title: "Operating",
        specs: [
          s("Operating weight", "6,650", "kg"),
          s("Bucket capacity", "0.2", "m³"),
          s("Main relief valve", "22", "MPa"),
          s("Fuel tank", "130", "L"),
          s("Hydraulic tank", "135", "L"),
        ],
      },
      {
        title: "Performance",
        specs: [
          s("Max digging force", "35", "kN"),
          s("Max traction force", "50", "kN"),
          s("Max travel speed", "30", "km/h"),
          s("Platform swing speed", "8.5", "rpm"),
          s("Gradeability", "35", "°"),
        ],
      },
      {
        title: "Dimensions",
        specs: [
          s("Overall length", "6,435", "mm"),
          s("Overall width", "1,980", "mm"),
          s("Overall height", "2,845", "mm"),
          s("Wheelbase", "2,410", "mm"),
          s("Tyre type", "195/85-20"),
          s("Ground contact width", "430", "mm"),
          s("Track", "1,520", "mm"),
          s("Min ground clearance", "230", "mm"),
        ],
      },
      {
        title: "Working range",
        specs: [
          s("Max digging reach", "6,950", "mm"),
          s("Max digging depth", "3,655", "mm"),
          s("Max digging height", "7,090", "mm"),
          s("Max dumping height", "5,245", "mm"),
          s("Min front swing radius", "2,455", "mm"),
          s("Min tail swing radius", "1,965", "mm"),
        ],
      },
      {
        title: "Configuration",
        specs: [
          s("Bucket width", "700", "mm"),
          s("Blade width", "1,980", "mm"),
          s("Blade max rise", "390", "mm"),
          s("Blade max drop", "45", "mm"),
          s("Certification", "CE, ISO 9001:2015, ISO 14001:2015"),
        ],
      },
    ],
    features: [
      {
        title: "Longest reach in its class",
        description:
          "6,950 mm of digging reach and 7,090 mm of height, so more of the site is covered without repositioning.",
      },
      ...CAB_FEATURES.slice(1, 3),
    ],
    isPlaceholder: false,
  },

  /* ────────────────────────────────────────── C95 ───── */
  /*
   * C95 G4, from the manufacturer's own sheet.
   *
   * This REPLACES a set of "C95W" figures taken from an online listing, which
   * gave 8,875 kg and 73.5 kW and matched the C120W row for row. That listing
   * describes a different configuration and is not this machine.
   *
   * It shares a 7,100 kg platform with the C85M G4 — same bucket range, relief
   * pressure, digging and traction force, swing speed and tank capacities — the
   * C95 being the grapple build of it, on outriggers with a longer arm, a
   * taller superstructure and a smaller engine. The C85 itself is no longer
   * carried (it is not part of the dealership), but the note is worth keeping:
   * if a future sheet for either machine repeats these figures, that is the
   * shared platform showing through and not a transcription error.
   */
  C95: {
    tagline: "Grapple build, on outriggers",
    summary:
      "The grapple configuration of the 7.1 tonne platform: outriggers spreading to 2,805 mm and a long arm reaching 7.14 metres.",
    description:
      "The C95 G4 is the grapple build of Xinyuan's 7.1 tonne platform. Outriggers fold out from 1,970 to 2,805 mm to plant the machine for handling out to the side, and a longer 2,300 mm arm takes the reach to 7,140 mm - almost two metres further out than the machine is long. A Yuchai F3065-T480 at 48 kW, 30 km/h on the road, and a dozer blade that drops 110 mm below grade.",
    highlights: [
      s("Operating weight", "7,100", "kg"),
      s("Bucket capacity", "0.2-0.35", "m³"),
      s("Engine power", "48", "kW"),
      s("Max digging reach", "7,140", "mm"),
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          s("Model", "C95 G4 (grapple type)"),
          s("Engine model", "Yuchai F3065-T480"),
          s("Rated power", "48", "kW"),
          s("Rated speed", "2,200", "rpm"),
        ],
      },
      {
        title: "Operating",
        specs: [
          s("Operating weight", "7,100", "kg"),
          s("Bucket capacity", "0.2-0.35", "m³"),
          s("Fuel tank", "160", "L"),
          s("Hydraulic tank", "130", "L"),
          s("Main relief valve", "24.5", "MPa"),
        ],
      },
      {
        title: "Performance",
        specs: [
          s("Max digging force", "35", "kN"),
          s("Max traction force", "35", "kN"),
          s("Max travel speed", "30", "km/h"),
          s("Platform swing speed", "8.5", "rpm"),
          s("Gradeability", "35", "°"),
        ],
      },
      {
        title: "Dimensions",
        specs: [
          s("Overall length", "6,135", "mm"),
          s("Overall width", "1,970", "mm"),
          s("Overall height", "3,150", "mm"),
          s("Wheelbase", "2,410", "mm"),
          s("Tyre type", "195/85-20"),
          s("Ground contact width", "430", "mm"),
          s("Front track", "1,570", "mm"),
          s("Rear track", "1,525", "mm"),
          s("Min ground clearance", "230", "mm"),
        ],
      },
      {
        title: "Working range",
        specs: [
          s("Max digging reach", "7,140", "mm"),
          s("Max digging depth", "3,850", "mm"),
          s("Max digging height", "7,225", "mm"),
          s("Max dumping height", "5,380", "mm"),
          s("Min front swing radius", "2,495", "mm"),
          s("Min tail swing radius", "1,965", "mm"),
        ],
      },
      {
        title: "Outriggers",
        specs: [
          s("Folded width", "1,970", "mm"),
          s("Unfolded width", "2,805", "mm"),
          s("Folding angle", "128", "°"),
        ],
      },
      {
        title: "Configuration",
        specs: [
          s("Boom length", "3,600", "mm"),
          s("Arm length", "2,300", "mm"),
          s("Standard bucket width", "730", "mm"),
          s("Blade width", "1,910", "mm"),
          s("Blade max rise", "505", "mm"),
          s("Blade max drop", "110", "mm"),
        ],
      },
    ],
    features: [
      {
        title: "Outriggers for side loading",
        description:
          "Legs fold out from 1,970 to 2,805 mm, planting the machine to work over the side without the tail coming light.",
      },
      {
        title: "Long arm, long reach",
        description:
          "A 2,300 mm arm takes the reach to 7,140 mm and dumping height to 5,380 mm, for loading over the side of a trailer.",
      },
      {
        title: "Blade below grade",
        description:
          "The dozer blade rises 505 mm and drops 110 mm under the machine, for levelling and for bracing on soft ground.",
      },
      CAB_FEATURES[3],
    ],
    isPlaceholder: false,
  },

  /* ────────────────────────────────────────────────────────── C105 ───── */
  C105: {
    tagline: "Tight tail, full-size dig",
    summary:
      "An 8.3 tonne machine inside a 1,945 mm tail swing, with twin boom cylinders as standard for digging and lifting alike.",
    description:
      "The C105W puts an 8.3 tonne machine into a 1,945 mm tail swing, so it works close to trucks and walls without giving up capacity. A wide-body chassis lowers the centre of gravity, twin boom cylinders as standard carry both digging and lifting, and an intelligent control system monitors more than 800 fault conditions across power, hydraulics and body.",
    highlights: [
      s("Operating weight", "8,300", "kg"),
      s("Bucket capacity", "0.32", "m³"),
      s("Engine power", "56", "kW"),
      s("Max digging force", "45", "kN"),
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          s("Model", "XYC105WT"),
          s("Engine", "Yuchai 4DK"),
          s("Rated power", "56", "kW"),
          s("Rated speed", "2,200", "rpm"),
        ],
      },
      {
        title: "Operating",
        specs: [
          s("Operating weight", "8,300", "kg"),
          s("Bucket capacity", "0.32", "m³"),
          s("Main relief valve", "25", "MPa"),
          s("Fuel tank", "180", "L"),
          s("Hydraulic tank", "165", "L"),
        ],
      },
      {
        title: "Performance",
        specs: [
          s("Max digging force", "45", "kN"),
          s("Max traction force", "50", "kN"),
          s("Max travel speed", "30", "km/h"),
          s("Platform swing speed", "11", "rpm"),
          s("Gradeability", "35", "°"),
        ],
      },
      {
        title: "Dimensions",
        specs: [
          s("Overall length", "6,020", "mm"),
          s("Overall width", "2,250", "mm"),
          s("Overall height", "2,910", "mm"),
          s("Wheelbase", "2,500", "mm"),
          s("Tyre type", "7.50-20"),
          s("Ground contact width", "490", "mm"),
          s("Track", "1,755", "mm"),
          s("Min ground clearance", "328", "mm"),
        ],
      },
      {
        title: "Working range",
        specs: [
          s("Max digging reach", "6,800", "mm"),
          s("Max digging depth", "3,980", "mm"),
          s("Max digging height", "7,410", "mm"),
          s("Max dumping height", "5,290", "mm"),
          s("Min front swing radius", "2,115", "mm"),
          s("Min tail swing radius", "1,945", "mm"),
        ],
      },
      {
        title: "Configuration",
        specs: [
          s("Bucket width", "720", "mm"),
          s("Blade width", "2,250", "mm"),
          s("Blade max rise", "500", "mm"),
          s("Blade max drop", "85", "mm"),
          s("Certification", "CE, ISO 9001:2015, ISO 14001:2015"),
        ],
      },
    ],
    features: [
      {
        title: "1,945 mm tail swing",
        description:
          "Works close in to trucks and structures without the tail needing space it has not got.",
      },
      {
        title: "Twin boom cylinders as standard",
        description:
          "More capable at both digging and lifting; the clamp variant adds a longer boom and arm for a wider working envelope.",
      },
      {
        title: "800-fault diagnostic system",
        description:
          "Intelligent control monitors power, hydraulic and body faults in real time and prompts for maintenance before it becomes downtime.",
      },
      CAB_FEATURES[2],
    ],
    isPlaceholder: false,
  },

  /* ────────────────────────────────────────────────────────── C115 ───── */
  C115: {
    tagline: "More power over the same tail",
    summary:
      "An 8.05 tonne machine with 73.5 kW and over 7 metres of reach on the wide-body chassis, and a 190 litre tank for long working days.",
    description:
      "The C115W is an 8.05 tonne machine that lifts rated power to 73.5 kW and stretches the working envelope past 7 metres of reach and 4.28 metres of depth, on the same wide-body chassis and 2,090 mm tail swing as the C120. A 190 litre fuel tank and load-tolerant hydraulics keep it working through long days.",
    highlights: [
      s("Operating weight", "8,050", "kg"),
      s("Bucket capacity", "0.32", "m³"),
      s("Engine power", "73.5", "kW"),
      s("Max digging force", "50", "kN"),
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          s("Model", "XYC115WT"),
          s("Engine", "Yuchai 4DK100-T304"),
          s("Rated power", "73.5", "kW"),
          s("Rated speed", "2,200", "rpm"),
        ],
      },
      {
        title: "Operating",
        specs: [
          s("Operating weight", "8,050", "kg"),
          s("Bucket capacity", "0.32", "m³"),
          s("Main relief valve", "25", "MPa"),
          s("Fuel tank", "190", "L"),
          s("Hydraulic tank", "165", "L"),
        ],
      },
      {
        title: "Performance",
        specs: [
          s("Max digging force", "50", "kN"),
          s("Max traction force", "50", "kN"),
          s("Max travel speed", "30", "km/h"),
          s("Platform swing speed", "8.5", "rpm"),
          s("Gradeability", "35", "°"),
        ],
      },
      {
        title: "Dimensions",
        specs: [
          s("Overall length", "6,575", "mm"),
          s("Overall width", "2,250", "mm"),
          s("Overall height", "3,240", "mm"),
          s("Wheelbase", "2,500", "mm"),
          s("Tyre type", "7.50-20"),
          s("Ground contact width", "490", "mm"),
          s("Track", "1,755", "mm"),
          s("Min ground clearance", "328", "mm"),
        ],
      },
      {
        title: "Working range",
        specs: [
          s("Max digging reach", "7,100", "mm"),
          s("Max digging depth", "4,280", "mm"),
          s("Max digging height", "7,625", "mm"),
          s("Max dumping height", "5,500", "mm"),
          s("Min front swing radius", "2,275", "mm"),
          s("Min tail swing radius", "2,090", "mm"),
        ],
      },
      {
        title: "Configuration",
        specs: [
          s("Bucket width", "720", "mm"),
          s("Blade width", "2,250", "mm"),
          s("Blade max rise", "500", "mm"),
          s("Blade max drop", "85", "mm"),
          s("Certification", "CE, ISO 9001:2015, ISO 14001:2015"),
        ],
      },
    ],
    features: [
      {
        title: "Standard and clamp variants",
        description:
          "Both carry twin boom cylinders; the clamp model adds a longer, stronger boom and arm for a wider attachment range.",
      },
      {
        title: "800-fault diagnostic system",
        description:
          "Real-time monitoring of power, hydraulic and body faults, with maintenance prompts rather than post-mortems.",
      },
      CAB_FEATURES[2],
    ],
    isPlaceholder: false,
  },

  /* ────────────────────────────────────────────────────────── C120 ───── */
  C120: {
    tagline: "The high-end nine tonne",
    summary:
      "The top of the mid-range: 8.875 tonnes on load-sensing hydraulics, with the highest relief setting in the series below the C150.",
    description:
      "The C120W is the top of the mid-range: 8.875 tonnes (8,875 kg) on a load-sensing hydraulic system that supplies only the power the machine is actually asking for, which cuts both fuel burn and heat. Twin boom cylinders and a reinforced boom and arm carry heavy digging and lifting, and a 28 MPa relief setting is the highest in the series below the C150.",
    highlights: [
      s("Operating weight", "8,875", "kg"),
      s("Bucket capacity", "0.32", "m³"),
      s("Engine power", "73.5", "kW"),
      s("Max digging force", "50", "kN"),
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          s("Model", "XYC120WT"),
          s("Engine", "Yuchai 4DK"),
          s("Rated power", "73.5", "kW"),
          s("Rated speed", "2,200", "rpm"),
        ],
      },
      {
        title: "Operating",
        specs: [
          s("Operating weight", "8,875", "kg"),
          s("Bucket capacity", "0.32", "m³"),
          s("Main relief valve", "28", "MPa"),
          s("Fuel tank", "180", "L"),
          s("Hydraulic tank", "165", "L"),
        ],
      },
      {
        title: "Performance",
        specs: [
          s("Max digging force", "50", "kN"),
          s("Max traction force", "48", "kN"),
          s("Max travel speed", "31", "km/h"),
          s("Platform swing speed", "11", "rpm"),
          s("Gradeability", "35", "°"),
        ],
      },
      {
        title: "Dimensions",
        specs: [
          s("Overall length", "6,375", "mm"),
          s("Overall width", "2,250", "mm"),
          s("Overall height", "2,950", "mm"),
          s("Wheelbase", "2,500", "mm"),
          s("Tyre type", "8.25-20"),
          s("Ground contact width", "490", "mm"),
          s("Track", "1,755", "mm"),
          s("Min ground clearance", "345", "mm"),
        ],
      },
      {
        title: "Working range",
        specs: [
          s("Max digging reach", "6,865", "mm"),
          s("Max digging depth", "4,075", "mm"),
          s("Max digging height", "7,435", "mm"),
          s("Max dumping height", "5,245", "mm"),
          s("Min front swing radius", "2,250", "mm"),
          s("Min tail swing radius", "2,090", "mm"),
        ],
      },
      {
        title: "Configuration",
        specs: [
          s("Bucket width", "780", "mm"),
          s("Blade width", "2,250", "mm"),
          s("Blade max rise", "500", "mm"),
          s("Blade max drop", "85", "mm"),
          s("Certification", "CE, ISO 9001:2015, ISO 14001:2015"),
        ],
      },
    ],
    features: [
      {
        title: "Load-sensing hydraulics",
        description:
          "Supplies the pressure and flow the load actually needs, so movements are quick and smooth while fuel burn and hydraulic heat both drop.",
      },
      {
        title: "Twin boom cylinders",
        description:
          "Reinforced boom and arm with two cylinders, for heavy digging and for lifting work at reach.",
      },
      {
        title: "800-fault diagnostic system",
        description:
          "Real-time monitoring across power, hydraulics and body, with maintenance prompted rather than discovered.",
      },
      CAB_FEATURES[2],
    ],
    isPlaceholder: false,
  },

  /* ────────────────────────────────────────────────────────── C130 ───── */
  C130: {
    tagline: "Thirteen tonnes, 4.7 m down",
    summary:
      "Thirteen tonnes and 86 kW, digging 4.76 metres down and reaching 7.72 metres out on dual-circuit disc brakes.",
    description:
      "The C130S is the heavy end of the wheeled range: 13 tonnes on an 86 kW Yuchai 4DK, digging 4.76 metres down and reaching 7.72 metres out. Dual-circuit four-wheel hydraulic disc brakes and 35° gradeability make a machine this size practical to move under its own power, and load-sensing hydraulics keep the fuel burn in proportion to the work.",
    highlights: [
      s("Operating weight", "13,000", "kg"),
      s("Engine power", "86", "kW"),
      s("Max digging force", "55", "kN"),
      s("Max digging depth", "4,765", "mm"),
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          s("Engine model", "Yuchai 4DK"),
          s("Emission standard", "Non-road Stage III"),
          s("Aftertreatment", "Fitted"),
          s("Displacement", "3,621", "mL"),
          s("Rated power", "86", "kW"),
          s("Rated speed", "2,200", "rpm"),
        ],
      },
      {
        title: "Operating",
        specs: [
          s("Operating weight", "13,000", "kg"),
          s("Fuel tank", "200", "L"),
          s("Hydraulic tank", "165", "L"),
          s("Hydraulic flow rate", "230", "L/min"),
          s("Main relief valve", "25", "MPa"),
        ],
      },
      {
        title: "Performance",
        specs: [
          s("Max digging force", "55", "kN"),
          s("Max traction force", "50", "kN"),
          s("Max travel speed", "30", "km/h"),
          s("Platform swing speed", "8.5", "rpm"),
          s("Gradeability", "35", "°"),
        ],
      },
      {
        title: "Dimensions",
        specs: [
          s("Overall length", "7,035", "mm"),
          s("Overall width", "2,290", "mm"),
          s("Overall height", "3,109", "mm"),
          s("Wheelbase", "2,750", "mm"),
          s("Min ground clearance", "320", "mm"),
          s("Track", "1,725", "mm"),
          s("Tyre type", "8.25-20"),
          s("Ground contact width", "490", "mm"),
        ],
      },
      {
        title: "Working range",
        specs: [
          s("Max digging reach", "7,720", "mm"),
          s("Max digging depth", "4,765", "mm"),
          s("Max digging height", "7,960", "mm"),
          s("Max dumping height", "5,750", "mm"),
          s("Min front swing radius", "2,815", "mm"),
          s("Min tail swing radius", "2,135", "mm"),
        ],
      },
      {
        title: "Configuration",
        specs: [
          s("Drive system", "Hydrostatic transmission"),
          s("Brakes", "Dual-circuit 4-wheel hydraulic disc"),
          s("Hydraulic system", "Load-sensing"),
          s("Boom length", "4,150", "mm"),
          s("Arm length", "2,300", "mm"),
          s("Standard bucket width", "850", "mm"),
          s("Blade width", "2,250", "mm"),
          s("Blade max rise", "470", "mm"),
          s("Blade max drop", "115", "mm"),
        ],
      },
    ],
    features: [
      {
        title: "Deep trenching capability",
        description:
          "4.76 metres of digging depth and 55 kN of breakout, for foundations and deep services in hard material.",
      },
      {
        title: "Dual-circuit braking",
        description:
          "Four-wheel hydraulic disc brakes on two independent circuits — the safety margin a 13 tonne machine needs on the road.",
      },
      {
        title: "Load-sensing hydraulics",
        description:
          "Flow matched to demand, so cycle times stay quick without paying for it in fuel and heat.",
      },
      CAB_FEATURES[3],
    ],
    isPlaceholder: false,
  },

  /* ────────────────────────────────────────────────────────── C150 ───── */
  /* ────────────────────────────────────────────────────────── C150 ───── */
  /*
   * C150W / XYC150WT, reconciled against Fujian Xinyuan's own product page.
   *
   * This model was published incomplete: power and weight were withheld because
   * the client's sheet gave power only as "92-110 kW" and weight as both
   * "13 tons" and a "15-ton class". The manufacturer's technical table settles
   * both — 118 kW at 1,800 rpm, and a machine weight of 12,500 kg.
   *
   * WHERE THE MANUFACTURER CONTRADICTS ITSELF, THE TABLE WINS. Its own blurb
   * still says "13 ton" while its specification table says 12,500 kg; the same
   * precedence was applied to the C70 and the C115 above, for the same reason —
   * the table is the internally consistent document.
   *
   * FOUR FIGURES HERE WERE WRONG AND ARE CORRECTED:
   *   bucket 0.57 -> 0.55 m³   (the sheet says 0.55 in all three places)
   *   length 7,730 -> 7,790 mm
   *   height 2,800 -> 3,150 mm (2,800 is the WHEELBASE; the two were conflated)
   *   engine  A05  -> A05160
   *
   * AND ONE IS REMOVED. A hydraulic flow rate of "310 L/min" was carried in the
   * highlights, the description and a feature. The manufacturer's table lists
   * no flow rate at all, and 310 is exactly its fuel tank capacity in litres,
   * so this is near-certainly the tank figure transcribed into the wrong row.
   * It is gone rather than corrected: a plausible-looking wrong number on a
   * dealer's spec table is worse than an absent one, and nothing here should be
   * guessed. Worth reinstating if the client's own sheet genuinely lists it.
   */
  C150: {
    tagline: "The largest in the range",
    summary:
      "A 12.5 tonne machine on 118 kW, reaching 8.39 metres out with a 0.55 m³ bucket for large-site excavation.",
    description:
      "The C150W tops the C Series: 12.5 tonnes on a 118 kW Yuchai A05160, carrying a 0.55 m³ bucket at a 32 MPa relief setting and reaching 8.39 metres out and 5.3 metres down. An extended working device — a 4,600 mm boom on a 2,500 mm arm — covers a large site from fewer set-ups, while a 310 litre fuel tank and 360 mm of ground clearance suit it to days where refuelling and rough ground both cost time.",
    highlights: [
      s("Operating weight", "12,500", "kg"),
      s("Bucket capacity", "0.55", "m³"),
      s("Engine power", "118", "kW"),
      s("Max digging force", "75", "kN"),
    ],
    specs: [
      {
        title: "Engine",
        specs: [
          s("Engine model", "Yuchai A05160"),
          s("Emission standard", "Non-road Stage III"),
          s("Aftertreatment", "Fitted"),
          s("Displacement", "4,837", "mL"),
          s("Rated power", "118", "kW"),
          s("Rated speed", "1,800", "rpm"),
        ],
      },
      {
        title: "Operating",
        specs: [
          s("Operating weight", "12,500", "kg"),
          s("Bucket capacity", "0.55", "m³"),
          s("Fuel tank", "310", "L"),
          s("Hydraulic tank", "240", "L"),
          s("Main relief valve", "32", "MPa"),
          s("Swing pressure", "27", "MPa"),
        ],
      },
      {
        title: "Performance",
        specs: [
          s("Max digging force", "75", "kN"),
          s("Max traction force", "55", "kN"),
          s("Max travel speed", "30", "km/h"),
          s("Gradeability", "35", "°"),
          s("Platform swing speed", "8.5", "rpm"),
        ],
      },
      {
        title: "Dimensions",
        specs: [
          s("Overall length", "7,790", "mm"),
          s("Overall width (blade)", "2,520", "mm"),
          s("Overall height", "3,150", "mm"),
          s("Wheelbase", "2,800", "mm"),
          s("Min ground clearance", "360", "mm"),
          s("Track", "1,975", "mm"),
          s("Tyre type", "9.00-20"),
          s("Ground contact width", "560", "mm"),
        ],
      },
      {
        title: "Working range",
        specs: [
          s("Max digging reach", "8,390", "mm"),
          s("Max digging depth", "5,295", "mm"),
          s("Max digging height", "9,060", "mm"),
          s("Max dumping height", "6,415", "mm"),
          s("Min front swing radius", "2,470", "mm"),
          s("Min tail swing radius", "2,318", "mm"),
        ],
      },
      {
        title: "Configuration",
        specs: [
          s("Drive system", "Hydrostatic transmission"),
          s("Brakes", "Dual-circuit hydraulic wheel-end"),
          s("Hydraulic system", "Load-sensing"),
          s("Boom length", "4,600", "mm"),
          s("Arm length", "2,500", "mm"),
          s("Standard bucket width", "900", "mm"),
          s("Blade width", "2,520", "mm"),
          s("Blade max rise", "540", "mm"),
          s("Blade max drop", "80", "mm"),
        ],
      },
    ],
    features: [
      {
        title: "Extended working device",
        description:
          "A 4,600 mm boom on a 2,500 mm arm, with a reinforced main arm support, covering a larger working range from fewer set-ups.",
      },
      {
        title: "Largest working envelope",
        description:
          "8.39 metres of reach and 5.3 metres of depth cover a large site without repositioning.",
      },
      {
        title: "Dual-circuit wet braking",
        description:
          "Front and rear axles each carry an independent wet braking system, so service braking is doubly protected.",
      },
      {
        title: "Long endurance",
        description:
          "310 litres of fuel and 360 mm of ground clearance, for full days on rough, spread-out sites.",
      },
    ],
    isPlaceholder: false,
  },


};
