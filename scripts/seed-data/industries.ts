import type { SeedIndustry as Industry } from "./types";

/**
 * SEED DATA — input to scripts/seed.ts only. The running site reads Sanity.
 *
 * Sector copy is representative and awaiting client sign-off. No project
 * references, client names or case studies are included: none have been
 * supplied, and inventing them would be worse than leaving the space open.
 */
export const industries: Industry[] = [
  {
    id: "in-01",
    slug: "construction",
    name: "Construction",
    summary:
      "Building work from foundation to handover, where machine availability sets the programme.",
    description:
      "General contracting puts mixed demands on a fleet: excavation and foundations early, material handling through the structure, then site clearance at the end. The machines that suit it are versatile rather than specialised, and easy to move between sites.",
    image: { src: "/images/ind-construction.jpg", alt: "Construction site with tower cranes and structure under way" },
    demands: [
      { title: "Mixed duty", description: "One machine covering excavation, loading and site logistics across a single contract." },
      { title: "Site mobility", description: "Transportable within legal limits so plant can follow the programme between sites." },
      { title: "Uptime", description: "Parts availability that keeps a critical-path machine from stopping the pour." },
    ],
    recommendedCategorySlugs: ["excavators", "wheel-loaders", "backhoe-loaders", "cranes"],
    recommendedEquipmentSlugs: ["lx-926"],
    order: 1,
  },
  {
    id: "in-02",
    slug: "infrastructure",
    name: "Infrastructure",
    summary:
      "Bridges, water schemes and public works measured in years rather than months.",
    description:
      "Infrastructure contracts run long, and the plant on them is expected to run long with them. Machines are specified for sustained duty, deep excavation and heavy lifting, with service support planned around the contract rather than the individual breakdown.",
    image: { src: "/images/ind-infrastructure.jpg", alt: "Large bridge construction with cranes" },
    demands: [
      { title: "Sustained duty", description: "Cooling and filtration sized for months of continuous operation, not intermittent site work." },
      { title: "Deep excavation", description: "Reach and breakout for foundations, piers and cut-off walls." },
      { title: "Planned maintenance", description: "Scheduled service against contract milestones instead of reactive repair." },
    ],
    recommendedCategorySlugs: ["excavators", "cranes", "concrete-pumps", "dump-trucks"],
    recommendedEquipmentSlugs: ["lx-936"],
    order: 2,
  },
  {
    id: "in-03",
    slug: "road-development",
    name: "Road Development",
    summary:
      "Formation, compaction and surfacing, where the whole fleet has to move at the pace of the paving train.",
    description:
      "Road work is a sequence, and every machine in it is a dependency. Subgrade is cut and trimmed, base course is laid and compacted to density, aggregate is fed forward, and surfacing follows. A machine down at any stage stalls the ones behind it, so road contractors buy on availability and parts support as much as on specification. The fleet below covers formation through compaction, with the loading and haulage that keeps material moving to the front.",
    image: { src: "/images/ind-road-development.jpg", alt: "Excavator and machinery working on a road construction project" },
    demands: [
      { title: "Level control", description: "Fine grading to specified formation levels and camber, checked and held across long chainages." },
      { title: "Compaction to density", description: "Achieving and proving specified density on subgrade, sub-base and base course layers." },
      { title: "Continuous material supply", description: "Loading and haulage sized so the paving train never waits on aggregate." },
      { title: "Linear site logistics", description: "Machines that travel the alignment under their own power between working faces." },
    ],
    recommendedCategorySlugs: ["rollers", "graders", "excavators", "wheel-loaders", "dump-trucks"],
    recommendedEquipmentSlugs: ["lx-930"],
    order: 3,
  },
  {
    id: "in-04",
    slug: "mining-quarrying",
    name: "Mining and Quarrying",
    summary:
      "Extraction measured in tonnes per hour, on the hardest duty cycle a machine will see.",
    description:
      "Quarry and mine work is the most punishing environment in the catalogue: abrasive material, long shifts, high ambient temperatures and haul roads that test structures and undercarriage alike. Specification here favours reinforced structures, heavy filtration and wear parts that can be replaced on site.",
    image: { src: "/images/ind-mining-quarrying.jpg", alt: "Open pit quarry with haul roads" },
    demands: [
      { title: "Abrasion resistance", description: "Ground-engaging tools and structures specified for high-density, abrasive material." },
      { title: "High-volume loading", description: "Bucket capacity matched to haul truck size to keep passes down." },
      { title: "Field-replaceable wear parts", description: "Cutting edges, teeth and undercarriage changed on site rather than in a workshop." },
    ],
    recommendedCategorySlugs: ["wheel-loaders", "excavators", "dump-trucks", "bulldozers"],
    recommendedEquipmentSlugs: ["lx-936"],
    order: 4,
  },
  {
    id: "in-05",
    slug: "material-handling",
    name: "Material Handling",
    summary:
      "Ports, warehouses and industrial yards where throughput is the only measure that matters.",
    description:
      "Material handling is repetitive, high-cycle work in constrained space. Machines are chosen for manoeuvrability, visibility and the ability to run shift after shift with predictable service intervals.",
    image: { src: "/images/ind-material-handling.jpg", alt: "Container terminal with cranes and stacked containers" },
    demands: [
      { title: "Manoeuvrability", description: "Working in aisles, between stacks and around fixed structures without repositioning." },
      { title: "Cycle consistency", description: "Predictable performance across full shifts rather than peak figures." },
      { title: "Attachment flexibility", description: "Forks, grapples and specialist tools changed quickly as the load changes." },
    ],
    recommendedCategorySlugs: ["forklifts", "wheel-loaders", "attachments"],
    recommendedEquipmentSlugs: ["lx-926"],
    order: 5,
  },
  {
    id: "in-06",
    slug: "industrial-projects",
    name: "Industrial Projects",
    summary:
      "Plant construction, installation and expansion inside operating industrial sites.",
    description:
      "Industrial work means operating inside someone else's live facility, often with restricted access and fixed shutdown windows. Machines are specified for controlled lifting, precise placement and the ability to work in confined space without disrupting production.",
    image: { src: "/images/ind-industrial-projects.jpg", alt: "Industrial plant under construction" },
    demands: [
      { title: "Confined access", description: "Compact machines that reach the work without dismantling the surrounding facility." },
      { title: "Controlled placement", description: "Precise, repeatable lifting and positioning for plant and structural elements." },
      { title: "Shutdown windows", description: "Reliability planned around fixed outage periods with no slack for breakdowns." },
    ],
    recommendedCategorySlugs: ["cranes", "forklifts", "excavators", "attachments"],
    recommendedEquipmentSlugs: ["lx-926"],
    order: 6,
  },
];
