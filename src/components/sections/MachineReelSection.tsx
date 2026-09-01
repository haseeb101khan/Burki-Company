import { ArrowRight, Button } from "@/components/ui/Button";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { getEquipment } from "@/lib/data";
import { routes } from "@/lib/routes";
import { MachineReel, type ReelItem } from "./MachineReel";

/**
 * Server wrapper for the range reel: fetches the catalogue and decides the
 * ORDER the machines cycle in.
 *
 * THREE FROM A BRAND, THEN THREE FROM THE NEXT. The client asked for sets that
 * hold together — three excavators, then three LOAD-X loaders, then three XCMG
 * loaders, then back for the next three excavators — rather than the catalogue
 * in its own order, which would have spent five consecutive sets on Xinyuan
 * before reaching anything else.
 *
 * So the brands are taken round-robin, three at a time, until each is spent.
 * With ten Xinyuan and three of each of the others that produces exactly the
 * sequence asked for, and it needs no hand-maintained list: adding a machine or
 * a brand re-deals the sets on the next build.
 *
 * The step is three even though a phone shows two. Three is the unit the sets
 * were designed around, and a phone simply reads the same order two at a time.
 */
const PER_BRAND = 3;

export async function MachineReelSection() {
  const machines = await getEquipment();
  if (machines.length === 0) return null;

  /* Grouped in catalogue order, so the brands cycle in the order they appear
     and each brand's own machines stay in their listed sequence. */
  const queues = new Map<string, typeof machines>();
  for (const machine of machines) {
    const queue = queues.get(machine.brand);
    if (queue) queue.push(machine);
    else queues.set(machine.brand, [machine]);
  }

  const ordered: typeof machines = [];
  const remaining = [...queues.values()];
  let took = true;
  while (took) {
    took = false;
    for (const queue of remaining) {
      const batch = queue.splice(0, PER_BRAND);
      if (batch.length > 0) {
        ordered.push(...batch);
        took = true;
      }
    }
  }

  const items: ReelItem[] = ordered.map((machine) => ({
    slug: machine.slug,
    href: routes.equipmentItem(machine),
    brand: machine.brand,
    model: machine.model,
    summary: machine.summary,
    /* The cutout, not the photograph: these sit on navy, and a photograph would
       bring its own background into a row of machines that are otherwise
       standing on the section itself. */
    image: machine.cutoutImage ?? machine.image,
  }));

  /*
   * WHITE, NOT NAVY. This ran on the navy ground first and the machines looked
   * wrong on it: every cutout is a studio shot lit for white, so on a dark
   * field the tyres and the black boom work close out into the background and
   * the soft shadow under each machine has nothing to fall on. On white they
   * read as the objects they were cut out to be.
   */
  return (
    <Section tone="light" spacing="default" className="relative overflow-hidden">
      {/* A single soft sweep across the top right, so the field is not a flat
          slab of white behind a row of machines. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 -top-1/3 h-[130%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(0,38,101,0.05),transparent)]"
      />

      <Container className="relative">
        <SectionHeader
          eyebrow="The range"
          title="Every machine we carry"
          description="Excavators, wheel loaders and the attachments that go on them, from the two lines we distribute nationwide and the manufacturers we supply alongside them."
          action={
            <Button href="/equipment" size="sm" variant="navy">
              View all equipment
              <ArrowRight />
            </Button>
          }
        />

        <div className="mt-12 md:mt-14">
          <MachineReel items={items} />
        </div>
      </Container>
    </Section>
  );
}
