import { ArrowRight, Button } from "@/components/ui/Button";
import { CategoryIconTile } from "@/components/ui/CategoryIconTile";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import {
  getEquipmentCategories,
  getEquipmentCountByCategory,
  getFeaturedEquipment,
} from "@/lib/data";
import { FeaturedProducts } from "./FeaturedProducts";

/**
 * Equipment section: featured machines on top, then the full category set.
 *
 * The split follows the client's reference — a small number of "hot" machines
 * shown properly, with everything else reachable through compact icon tiles
 * rather than a second wall of photographs.
 */
export async function EquipmentCategories() {
  const [categories, counts, featured] = await Promise.all([
    getEquipmentCategories(),
    getEquipmentCountByCategory(),
    getFeaturedEquipment(4),
  ]);

  return (
    <Section tone="light">
      <Container>
        <SectionHeader
          eyebrow="Equipment"
          title="Explore our equipment"
          description="Featured machines from the range we import and support, and the twelve categories behind them."
        />

        <Reveal className="mt-10">
          <FeaturedProducts items={featured} />
        </Reveal>

        <div className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-steel-200 pt-8">
            <h3 className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-steel-500">
              All equipment categories
            </h3>
            <Button href="/equipment" variant="outline" size="sm">
              View all equipment
              <ArrowRight />
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category, index) => (
              <Reveal key={category.id} delay={(index % 6) * 0.04}>
                <CategoryIconTile category={category} count={counts[category.slug]} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
