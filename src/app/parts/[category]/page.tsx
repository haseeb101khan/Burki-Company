import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Button } from "@/components/ui/Button";
import { ChevronRightIcon } from "@/components/ui/Icons";
import { PartCard } from "@/components/ui/PartCard";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { getPartCategories, getPartCategoryBySlug, getParts } from "@/lib/data";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * One part category — every attachment or component of this kind.
 *
 * The brand filter is built from what is actually in the category, so it only
 * appears when there is more than one brand to choose between. Generic parts
 * carry no brand at all and are grouped under "Unbranded", which is honest: a
 * seal kit that fits several manufacturers should not be filed under one.
 */

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const one = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export async function generateStaticParams() {
  const categories = await getPartCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getPartCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return { title: category.name, description: category.description };
}

export default async function PartCategoryPage({ params, searchParams }: Props) {
  const { category: slug } = await params;
  const brandSlug = one((await searchParams).brand);

  const category = await getPartCategoryBySlug(slug);
  if (!category) notFound();

  const all = await getParts({ categorySlug: slug });
  const parts = brandSlug
    ? all.filter((p) => (p.brandSlug ?? "unbranded") === brandSlug)
    : all;

  const brandsHere = [
    ...new Map(
      all.map((p) => [p.brandSlug ?? "unbranded", p.brand ?? "Unbranded"]),
    ).entries(),
  ]
    .map(([s, name]) => ({ slug: s, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const href = (brand?: string) =>
    brand ? `${routes.partCategory(slug)}?brand=${brand}` : routes.partCategory(slug);

  const fitsLabel = (count: number) =>
    count > 0 ? `Fits ${count} ${count === 1 ? "machine" : "machines"}` : undefined;

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
              <Link href="/parts" className="transition-colors hover:text-navy-700">
                Parts
              </Link>
              <ChevronRightIcon className="shrink-0 text-steel-400" />
              <span className="font-medium text-navy-800">{category.name}</span>
            </nav>
          </Container>
        </div>

        <Section tone="light" spacing="tight">
          <Container>
            <SectionHeader
              eyebrow="Parts"
              title={category.name}
              description={category.description}
              action={
                <Button href={routes.quote()} size="sm">
                  Request a quote
                  <ArrowRight />
                </Button>
              }
            />
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
                    All
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

        {/* Tight when the brand filter above is hidden — a category carrying one
            brand (Attachments is all Xinyuan) otherwise gets two full-padding
            sections back to back and a dead band of white. */}
        <Section tone="light" spacing={brandsHere.length > 1 ? "default" : "tight"}>
          <Container>
            {parts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {parts.map((part, index) => (
                  <Reveal key={part.id} delay={(index % 2) * 0.06} className="h-full">
                    <PartCard
                      part={part}
                      compatibleLabel={fitsLabel(part.compatibleEquipmentSlugs.length)}
                      className="h-full"
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
                  We supply {category.name.toLowerCase()} and can source against a
                  machine model and serial. Tell us what you need.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Button href={routes.quote()}>
                    Ask about a part
                    <ArrowRight />
                  </Button>
                  <Button href="/parts" variant="outline">
                    All parts
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
