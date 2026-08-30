import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Button } from "@/components/ui/Button";
import { EquipmentCard } from "@/components/ui/EquipmentCard";
import { ChevronRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { getEquipment, getEquipmentCategories, getEquipmentCategoryBySlug } from "@/lib/data";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * ONE MACHINE CLASS, ACROSS EVERY BRAND.
 *
 * The catalogue's second axis. `/equipment/<brand>` answers "what do you carry
 * from Xinyuan"; this answers "show me every excavator you have, whoever makes
 * it". Neither is subordinate — they are the same machines cut two ways.
 *
 * It sits under a fixed `category` segment because `/equipment/[brand]` and
 * `/equipment/[category]` would be the same route to Next, and brand won the
 * top level.
 */

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const one = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export async function generateStaticParams() {
  const categories = await getEquipmentCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getEquipmentCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const brandSlug = one((await searchParams).brand);

  const category = await getEquipmentCategoryBySlug(slug);
  if (!category) notFound();

  const all = await getEquipment({ categorySlug: slug });
  const machines = brandSlug ? all.filter((m) => m.brandSlug === brandSlug) : all;

  /* Built from the machines actually in this category, so the chips can never
     offer a brand that has nothing of this class. */
  const brandsHere = [...new Map(all.map((m) => [m.brandSlug, m.brand])).entries()]
    .map(([s, name]) => ({ slug: s, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const href = (brand?: string) =>
    brand ? `${routes.category(slug)}?brand=${brand}` : routes.category(slug);

  return (
    <>
      <Header />
      <main>
        <div className="border-b border-steel-200 bg-steel-50">
          <Container>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 py-3.5 text-[0.8125rem] text-steel-600"
            >
              <Link href="/" className="transition-colors hover:text-navy-700">
                Home
              </Link>
              <ChevronRightIcon className="shrink-0 text-steel-400" />
              <Link href={routes.equipment()} className="transition-colors hover:text-navy-700">
                Equipment
              </Link>
              <ChevronRightIcon className="shrink-0 text-steel-400" />
              <span className="font-medium text-navy-800">{category.name}</span>
            </nav>
          </Container>
        </div>

        <Section tone="light" spacing="tight">
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
              <SectionHeader
                eyebrow="Equipment"
                title={category.name}
                description={category.description}
                action={
                  <Button href={routes.quote()} size="sm">
                    Request a quote
                    <ArrowRight />
                  </Button>
                }
              />
              {category.image.src ? (
                <Reveal y={16}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-steel-100">
                    <Image
                      src={category.image.src}
                      alt={category.image.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                      style={
                        category.image.focus
                          ? { objectPosition: category.image.focus }
                          : undefined
                      }
                    />
                  </div>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </Section>

        {brandsHere.length > 1 ? (
          <Section tone="muted" spacing="tight" className="border-y border-steel-200">
            <Container>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <h2 className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-steel-500">
                  Brand
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={href()}
                    aria-current={!brandSlug ? "true" : undefined}
                    className={cn(
                      "rounded-[3px] border px-3.5 py-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                      !brandSlug
                        ? "border-navy-700 bg-navy-700 text-white"
                        : "border-steel-200 bg-white text-navy-700 hover:border-navy-400",
                    )}
                  >
                    All brands
                  </Link>
                  {brandsHere.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={brandSlug === brand.slug ? href() : href(brand.slug)}
                      aria-current={brandSlug === brand.slug ? "true" : undefined}
                      className={cn(
                        "rounded-[3px] border px-3.5 py-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                        brandSlug === brand.slug
                          ? "border-navy-700 bg-navy-700 text-white"
                          : "border-steel-200 bg-white text-navy-700 hover:border-navy-400",
                      )}
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        ) : null}

        <Section tone="light">
          <Container>
            {machines.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {machines.map((item, index) => (
                  <Reveal key={item.id} delay={(index % 3) * 0.06} className="h-full">
                    <EquipmentCard
                      item={item}
                      categoryLabel={category.name}
                      className="h-full"
                      priority={index < 3}
                    />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-lg py-8 text-center">
                <h2 className="font-display text-2xl font-bold uppercase text-navy-800">
                  Nothing listed here yet
                </h2>
                <p className="mt-3 text-base leading-relaxed text-steel-600">
                  We supply {category.name.toLowerCase()} and can source to
                  specification — the models are not catalogued on the site yet.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Button href={routes.quote()}>
                    Request a quote
                    <ArrowRight />
                  </Button>
                  <Button href={routes.equipment()} variant="outline">
                    All equipment
                  </Button>
                </div>
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
