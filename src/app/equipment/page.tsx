import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import {
  getCatalogueBrands,
  getEquipmentCategories,
  getEquipmentCountByCategory,
} from "@/lib/data";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * THE CATALOGUE FRONT DOOR — the brands, not the machines.
 *
 * Burki distributes several manufacturers, and that is the first question a
 * buyer actually has. Leading with brands makes the shape of the business the
 * first thing on the page; the machine categories sit underneath as the second
 * way in, for someone who knows they want an excavator and does not mind whose.
 *
 * Brands with no machines yet still appear. Four of the six are set up ahead of
 * their catalogues arriving, and showing them as "being catalogued" is honest
 * and useful — hiding them would make the range look smaller than it is.
 */

export const metadata: Metadata = {
  title: "Equipment Catalogue",
  description:
    "Excavators, wheel loaders and construction equipment from every manufacturer Burki & Company distributes in Pakistan.",
};

export default async function EquipmentCataloguePage() {
  const [brands, categories, counts] = await Promise.all([
    getCatalogueBrands({ includeEmpty: true }),
    getEquipmentCategories(),
    getEquipmentCountByCategory(),
  ]);

  const totalMachines = brands.reduce((sum, b) => sum + b.equipmentCount, 0);
  const availableCategories = categories.filter((c) => (counts[c.slug] ?? 0) > 0);

  return (
    <>
      <Header />
      <main>
        <Section tone="light" spacing="tight">
          <Container>
            <SectionHeader
              eyebrow="Catalogue"
              title="Equipment by brand"
              description="Every manufacturer we distribute, imported and supported directly. Choose a brand to see its full range, or browse by machine category below."
              action={
                <Button href={routes.quote()} size="sm">
                  Request a quote
                  <ArrowRight />
                </Button>
              }
            />
          </Container>
        </Section>

        {/* ----------------------------------------------------------- brands */}
        <Section tone="light" spacing="tight">
          <Container>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brands.map((brand, index) => {
                const hasMachines = brand.equipmentCount > 0;
                return (
                  <li key={brand.id}>
                    <Reveal delay={(index % 3) * 0.06} className="h-full">
                      <Link
                        href={routes.brand(brand)}
                        className={cn(
                          "group flex h-full flex-col justify-between rounded-[3px] border bg-white p-6 md:p-7",
                          "transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          "hover:-translate-y-1 hover:border-navy-300 hover:shadow-[0_22px_44px_-28px_rgba(0,17,46,0.5)]",
                          hasMachines ? "border-steel-200" : "border-dashed border-steel-300",
                        )}
                      >
                        <div>
                          <div className="flex items-baseline justify-between gap-3">
                            <h2 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-navy-800">
                              {brand.name}
                            </h2>
                            {brand.countryOfOrigin ? (
                              <span className="shrink-0 font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-steel-500">
                                {brand.countryOfOrigin}
                              </span>
                            ) : null}
                          </div>

                          {brand.shortDescription ? (
                            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-steel-600">
                              {brand.shortDescription}
                            </p>
                          ) : null}
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-3">
                          <span
                            className={cn(
                              "font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em]",
                              hasMachines ? "text-steel-500" : "text-amber-600",
                            )}
                          >
                            {hasMachines
                              ? `${brand.equipmentCount} ${brand.equipmentCount === 1 ? "model" : "models"}`
                              : "Being catalogued"}
                          </span>
                          <span className="inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-navy-700 transition-colors group-hover:text-amber-600">
                            View range
                            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </Container>
        </Section>

        {/* -------------------------------------------------------- categories */}
        {availableCategories.length > 0 ? (
          <Section tone="muted">
            <Container>
              <SectionHeader
                eyebrow="Browse"
                title="By machine category"
                description={`Cut the same ${totalMachines} machines the other way — every model of one class, across all brands.`}
              />
              <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {availableCategories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={routes.category(category)}
                      className="group flex items-baseline justify-between gap-3 rounded-[3px] border border-steel-200 bg-white px-4 py-3.5 transition-colors hover:border-navy-400 hover:bg-navy-50"
                    >
                      <span className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-navy-800">
                        {category.name}
                      </span>
                      <span className="shrink-0 tabular-nums text-[0.75rem] text-steel-500">
                        {counts[category.slug]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
