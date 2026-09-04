import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Button } from "@/components/ui/Button";
import { EquipmentGallery } from "@/components/ui/EquipmentGallery";
import { FeatureAccordion } from "@/components/ui/FeatureAccordion";
import { ChevronRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { SpecTable } from "@/components/ui/SpecTable";
import {
  getCompatibleParts,
  getEquipmentBySlug,
  getEquipmentCategoryBySlug,
  getSeriesVariants,
} from "@/lib/data";
import { VariantOrbit } from "@/components/sections/VariantOrbit";
import {
  equipmentToOrbitItem,
  partToOrbitItem,
} from "@/components/sections/orbitItem";
import { routes } from "@/lib/routes";

type Props = { params: Promise<{ brand: string; model: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { model } = await params;
  const item = await getEquipmentBySlug(model);
  if (!item) return { title: "Equipment not found" };
  return {
    title: `${item.name} — Specifications`,
    description: item.summary,
  };
}

export default async function EquipmentDetailPage({ params }: Props) {
  const { brand, model } = await params;

  const item = await getEquipmentBySlug(model);
  /* The brand in the URL must be this machine's brand, so /equipment/sany/lx-936
     404s rather than serving an LX under someone else's catalogue. */
  if (!item || item.brandSlug !== brand) notFound();

  /*
   * Is the gallery a studio cutout rather than site photography?
   *
   * Machines with no working photographs yet fall back to their cutout, and a
   * cutout must be contained, not cropped — covering it cuts the boom off at
   * the frame edge. Detected from the data rather than flagged by hand, so it
   * corrects itself the moment real photographs are added.
   */
  const galleryIsCutout =
    Boolean(item.cutoutImage) &&
    item.gallery.length === 1 &&
    item.gallery[0].src === item.cutoutImage?.src;

  const showCompatibleAttachments = item.categorySlug === "excavators";
  const [categoryInfo, compatibleParts, variants] = await Promise.all([
    getEquipmentCategoryBySlug(item.categorySlug),
    showCompatibleAttachments
      ? getCompatibleParts(item.slug, 30).then((parts) =>
          parts.filter((part) => part.categorySlug === "attachments").slice(0, 6),
        )
      : Promise.resolve([]),
    getSeriesVariants(item.slug),
  ]);

  return (
    <>
      <Header />
      <main>
        {/* -------------------------------------------------------- breadcrumb */}
        <div className="border-b border-steel-200 bg-steel-50">
          <Container>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-3.5 text-[0.8125rem] text-steel-500"
            >
              <Link href="/" className="shrink-0 transition-colors hover:text-navy-700">
                Home
              </Link>
              <ChevronRightIcon className="shrink-0 text-[0.7em] text-steel-300" />
              <Link
                href={routes.equipment()}
                className="shrink-0 transition-colors hover:text-navy-700"
              >
                Equipment
              </Link>
              {/* Brand before category: this machine belongs to a brand
                  catalogue, and that is the page the buyer came from. */}
              <ChevronRightIcon className="shrink-0 text-[0.7em] text-steel-300" />
              <Link
                href={routes.brand(item.brandSlug)}
                className="shrink-0 transition-colors hover:text-navy-700"
              >
                {item.brand}
              </Link>
              {categoryInfo ? (
                <>
                  <ChevronRightIcon className="shrink-0 text-[0.7em] text-steel-300" />
                  <Link
                    href={routes.category(categoryInfo.slug)}
                    className="shrink-0 transition-colors hover:text-navy-700"
                  >
                    {categoryInfo.name}
                  </Link>
                </>
              ) : null}
              <ChevronRightIcon className="shrink-0 text-[0.7em] text-steel-300" />
              <span className="shrink-0 font-medium text-navy-800">{item.model}</span>
            </nav>
          </Container>
        </div>

        {/* --------------------------------------------------- gallery + overview */}
        <Section tone="light" spacing="tight">
          <Container>
            <div className="grid gap-6 md:gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
              {/* `min-w-0` is load-bearing, not tidying. A grid item's automatic
                  minimum size is its content, so without it anything inside the
                  gallery that measures wider than the column widens the column
                  itself — on a phone that put the whole track past the viewport
                  and blew the photograph up to several screens wide. */}
              <Reveal className="min-w-0">
                <EquipmentGallery
                  images={item.gallery}
                  videos={item.videos}
                  name={item.model}
                  fit={galleryIsCutout ? "contain" : "cover"}
                />
              </Reveal>

              <Reveal delay={0.08}>
                <p className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-amber-600">
                  {item.brand}
                  {item.series ? ` — ${item.series}` : ""}
                </p>

                <h1 className="mt-3 text-2xl sm:text-3xl md:text-display-lg uppercase text-navy-800">{item.model}</h1>

                {item.tagline ? (
                  <p className="mt-2 font-display text-lg font-semibold uppercase tracking-[0.06em] text-steel-500">
                    {item.tagline}
                  </p>
                ) : null}

                <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-steel-600">
                  {item.summary}
                </p>

                {/*
                  * FOUR FIGURES, ONE ROW.
                  *
                  * This strip sits in the right-hand column, so four cells get
                  * roughly 150px each. At the old size labels like "Max digging
                  * force" broke awkwardly and the row looked broken rather than
                  * tight. Three things keep it on one line: a smaller label with
                  * tight leading that is allowed a clean second line, `min-w-0`
                  * so a long word cannot force the track wider than its share,
                  * and `whitespace-nowrap` on the figure itself — a value must
                  * never split from its unit.
                  */}
                {item.highlights.length > 0 ? (
                  <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-steel-200 bg-steel-200 sm:grid-cols-4">
                    {item.highlights.map((h) => (
                      <div key={h.label} className="min-w-0 bg-white px-3 py-3.5">
                        <dt className="hyphens-auto text-[0.625rem] leading-[1.25] uppercase tracking-[0.04em] text-steel-500">
                          {h.label}
                        </dt>
                        <dd className="mt-1.5 whitespace-nowrap font-display text-[1.0625rem] font-bold leading-none tabular-nums text-navy-800">
                          {h.value}
                          {h.unit ? (
                            <span className="ml-1 text-[0.6875rem] font-medium text-steel-500">
                              {h.unit}
                            </span>
                          ) : null}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {/* Carries the model through so the form opens with this
                      machine already selected. */}
                  <Button href={`/request-a-quote?model=${item.slug}`} size="lg">
                    Request a Quote
                    <ArrowRight />
                  </Button>
                  <Button href="/contact" size="lg" variant="outline">
                    Talk to Sales
                  </Button>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* ----------------------------------------------------- description */}
        {item.description ? (
          <Section tone="muted" spacing="tight">
            <Container size="narrow">
              <Reveal>
                <p className="text-base leading-relaxed text-steel-700">{item.description}</p>
              </Reveal>
            </Container>
          </Section>
        ) : null}

        {/* --------------------------------------------------- specifications */}
        {item.specs.length > 0 ? (
          <Section tone="light">
            <Container>
              <SectionHeader
                eyebrow="Specifications"
                title="Technical specification"
                description={
                  item.isPlaceholder
                    ? "Figures below are representative and pending final client confirmation."
                    : "Figures below are as supplied by the manufacturer."
                }
              />
              <div className="mt-10">
                <SpecTable groups={item.specs} />
              </div>
            </Container>
          </Section>
        ) : null}

        {/* -------------------------------------------------------- features */}
        {item.features.length > 0 ? (
          <Section tone="navy">
            <Container>
              <SectionHeader
                tone="light"
                eyebrow="Why this machine"
                title="Built for the work"
              />
              {/*
               * STRIPS, NOT COLUMNS.
               *
               * This was a rank of numbered columns divided by hairlines. It
               * read well across a desktop and turned into most of a screen per
               * feature on a phone, so the buyer scrolled through four full
               * paragraphs to reach the variants below.
               *
               * Collapsed strips put the whole argument on one screen and open
               * the one or two that matter — the same control as the
               * specification table further up the page, which is the point:
               * by the time the visitor reaches this they already know how it
               * behaves.
               */}
              <div className="mt-10 max-w-3xl">
                <FeatureAccordion features={item.features} />
              </div>
            </Container>
          </Section>
        ) : null}

        {/* ------------------------------------------------- other variants */}
        {variants.length > 0 ? (
          <Section tone="light" spacing="loose" className="overflow-hidden">
            <Container size="wide">
              <VariantOrbit
                items={variants.map(equipmentToOrbitItem)}
                eyebrow={item.series ?? "Variants"}
                title="Explore other variants"
                description={`Every other model in the ${item.series ?? item.brand} line — swing through the family to compare before you decide.`}
                note="Specifications may vary by region and configuration."
              />
            </Container>
          </Section>
        ) : null}

        {/* --------------------------------------------- compatible attachments */}
        {/*
         * Shown on the same arc as the variants, on the client's instruction.
         * It works here for the same reason it works there: the attachment
         * photography is studio cutouts on transparency, which is what the
         * orbit is built around. A grid of cards would have been the easier
         * build and a different visual language on the same page.
         */}
        {compatibleParts.length > 0 ? (
          <Section tone="light" spacing="loose" className="overflow-hidden">
            <Container size="wide">
              <VariantOrbit
                items={compatibleParts.map(partToOrbitItem)}
                eyebrow="Compatible attachments"
                title="What fits this excavator"
                description={`Attachments matched to the ${item.model} — swing through to see what the excavator can be turned into.`}
                note="Fitment is by carrier class. Confirm with us before ordering."
              />
              <div className="mt-10 flex justify-center">
                <Button href="/parts/attachments" variant="outline" size="sm">
                  Browse all attachments
                  <ArrowRight />
                </Button>
              </div>
            </Container>
          </Section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
