import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BrandIntroVideo } from "@/components/ui/BrandIntroVideo";
import { ArrowRight, Button } from "@/components/ui/Button";
import { ChevronRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { BrandCategorySection } from "@/components/sections/BrandCategorySection";
import {
  getBrandBySlug,
  getEquipment,
  getEquipmentCategories,
} from "@/lib/data";
import { routes } from "@/lib/routes";

/**
 * ONE BRAND'S CATALOGUE.
 *
 * The structure the client asked for: brand name and intro first, the machines
 * below. This is the page a buyer lands on from the brand index, and the one a
 * machine's detail page belongs to — which is why the detail URL is keyed on
 * brand rather than category, so nobody falls out of the catalogue they came
 * in through.
 *
 * The category chips narrow within the brand. Cutting the other way — every
 * excavator across all brands — lives at /equipment/category/<slug>.
 */

type Props = {
  params: Promise<{ brand: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const one = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/*
 * No generateStaticParams: this page reads `searchParams` for its category
 * filter, which forces dynamic rendering. Declaring static params as well puts
 * the route in both modes at once and every request fails with
 * DYNAMIC_SERVER_USAGE.
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: "Brand not found" };
  return {
    title: `${brand.name} Equipment`,
    description:
      brand.shortDescription ??
      `The full ${brand.name} range supplied and supported by Burki & Company.`,
  };
}

export default async function BrandCataloguePage({ params, searchParams }: Props) {
  const { brand: slug } = await params;
  const categorySlug = one((await searchParams).category);

  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  const [all, categories] = await Promise.all([
    getEquipment({ brandSlug: slug }),
    getEquipmentCategories(),
  ]);

  const machines = categorySlug
    ? all.filter((m) => m.categorySlug === categorySlug)
    : all;

  /* How many of this brand's machines sit in each category, so the strip can
     show a count where there is one and route elsewhere where there is not. */
  const countsMap = all.reduce<Map<string, number>>(
    (acc, m) => acc.set(m.categorySlug, (acc.get(m.categorySlug) ?? 0) + 1),
    new Map(),
  );
  const countsHere = Object.fromEntries(countsMap);

  const href = (category?: string) =>
    category ? `${routes.brand(slug)}?category=${category}` : routes.brand(slug);

  const categoryName = (s: string) => categories.find((c) => c.slug === s)?.name;

  return (
    <>
      <Header />
      <main>
        {/* -------------------------------------------------------- breadcrumb */}
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
              <span className="font-medium text-navy-800">{brand.name}</span>
            </nav>
          </Container>
        </div>

        {/* ------------------------------------------- brand name and intro */}
        {/* No bottom padding: the listings section directly below supplies the
            gap. Two full-padding sections back to back left a dead band of
            white between the intro and the catalogue. */}
        <Section tone="light" spacing="tight" className="pb-0 md:pb-0">
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12">
              <div>
                <SectionHeader
                  eyebrow="Brand catalogue"
                  title={brand.name}
                  description={brand.shortDescription}
                  action={
                    <Button href={routes.quote()} size="sm">
                      Request a quote
                      <ArrowRight />
                    </Button>
                  }
                />

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-steel-500">
                  {brand.countryOfOrigin ? <span>{brand.countryOfOrigin}</span> : null}
                  {brand.manufacturerLegalName ? (
                    <span>{brand.manufacturerLegalName}</span>
                  ) : null}
                  <span>
                    {all.length} {all.length === 1 ? "model" : "models"}
                  </span>
                  {brand.website ? (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-navy-700 transition-colors hover:text-amber-600"
                    >
                      Manufacturer site
                    </a>
                  ) : null}
                </div>
              </div>

              {/*
               * The introduction film where a brand has one, its photography
               * otherwise, and nothing at all for the four brands with neither
               * — the header simply runs full width there.
               */}
              {brand.showcaseVideoUrl ? (
                <Reveal y={16}>
                  <BrandIntroVideo
                    src={brand.showcaseVideoUrl}
                    poster={brand.showcaseImages[0] ?? null}
                    brandName={brand.name}
                  />
                </Reveal>
              ) : brand.showcaseImages[0] ? (
                <Reveal y={16}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-steel-100">
                    <Image
                      src={brand.showcaseImages[0].src}
                      alt={brand.showcaseImages[0].alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </Section>

        {/* --------------------------------------- categories + the listings */}
        <BrandCategorySection
          brand={brand}
          categories={categories}
          categorySlug={categorySlug}
          countsHere={countsHere}
          machines={machines}
          categoryName={categoryName}
          href={href}
          all={all}
        />
      </main>
      <Footer />
    </>
  );
}
