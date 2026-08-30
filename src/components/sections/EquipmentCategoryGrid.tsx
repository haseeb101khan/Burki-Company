import { ArrowRight, Button } from "@/components/ui/Button";
import { CategoryIconTile } from "@/components/ui/CategoryIconTile";
import { Reveal } from "@/components/ui/Reveal";
import { getEquipmentCategories, getEquipmentCountByCategory } from "@/lib/data";

/**
 * The twelve equipment categories, as icon tiles.
 *
 * This block used to live inside an "Explore our equipment" section that the
 * brand showcase replaced. The tiles were worth keeping: the showcase answers
 * "who do you represent", and a visitor who arrives knowing they want a roller
 * rather than a brand needs the other axis into the catalogue.
 *
 * It renders WITHOUT its own Section wrapper, as a trailing block inside the
 * showcase's section, separated by a hairline. Giving it a section of its own
 * would have put a third band of the same tone next to two others and read as
 * one long stretch of page; sitting under the showcase's own heading, it reads
 * as the second half of one idea.
 */
export async function EquipmentCategoryGrid() {
  const [categories, counts] = await Promise.all([
    getEquipmentCategories(),
    getEquipmentCountByCategory(),
  ]);

  if (categories.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-steel-200 pt-8">
        <h3 className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-steel-500">
          Browse by category
        </h3>
        <Button href="/equipment" variant="outline" size="sm">
          View all equipment
          <ArrowRight />
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={(index % 6) * 0.04}>
            <CategoryIconTile category={category} count={counts[category.slug]} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
