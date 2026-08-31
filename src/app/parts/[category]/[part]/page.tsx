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
import { Container, Eyebrow, Section, SectionHeader } from "@/components/ui/Section";
import {
  getCompatibleEquipment,
  getPartBySlug,
  getPartCategoryBySlug,
} from "@/lib/data";
import { routes } from "@/lib/routes";

/**
 * A single part or attachment.
 *
 * The compatible-machines list is derived from this part's own
 * `compatibleEquipment` references — the single source of truth for the
 * relationship — so it can never disagree with what the machine's own page
 * shows.
 */

type Props = { params: Promise<{ category: string; part: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { part: slug } = await params;
  const part = await getPartBySlug(slug);
  if (!part) return { title: "Part not found" };
  return { title: `${part.name} — ${part.partNumber}`, description: part.summary };
}

export default async function PartDetailPage({ params }: Props) {
  const { category, part: slug } = await params;

  const part = await getPartBySlug(slug);
  if (!part || part.categorySlug !== category) notFound();

  const [categoryInfo, machines] = await Promise.all([
    getPartCategoryBySlug(part.categorySlug),
    getCompatibleEquipment(part.slug),
  ]);

  const gallery = [part.image, ...(part.images ?? [])];

  return (
    <>
      <Header />
      <main>
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
              <Link href="/parts" className="shrink-0 transition-colors hover:text-navy-700">
                Parts
              </Link>
              {categoryInfo ? (
                <>
                  <ChevronRightIcon className="shrink-0 text-[0.7em] text-steel-300" />
                  <Link
                    href={routes.partCategory(categoryInfo)}
                    className="shrink-0 transition-colors hover:text-navy-700"
                  >
                    {categoryInfo.name}
                  </Link>
                </>
              ) : null}
              <ChevronRightIcon className="shrink-0 text-[0.7em] text-steel-300" />
              <span className="shrink-0 font-medium text-navy-800">{part.name}</span>
            </nav>
          </Container>
        </div>

        {/* ------------------------------------------------ images + overview */}
        <Section tone="light" spacing="tight">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                {/* Studio cutouts, so contained on a pale ground rather than
                    cropped — see the same reasoning in PartCard. */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-steel-50 p-6">
                  <Image
                    src={gallery[0].src}
                    alt={gallery[0].alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-contain"
                  />
                </div>
                {gallery.length > 1 ? (
                  <ul className="mt-3 grid grid-cols-4 gap-3">
                    {gallery.slice(1).map((image) => (
                      <li
                        key={image.src}
                        className="relative aspect-square overflow-hidden rounded-[2px] bg-steel-50 p-2"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="120px"
                          className="object-contain"
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div>
                <Eyebrow>{part.brand ?? "Parts"}</Eyebrow>
                <p className="font-display mt-4 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] tabular-nums text-amber-600">
                  {part.partNumber}
                </p>
                <h1 className="mt-2 text-display-sm uppercase text-navy-800">
                  {part.name}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-steel-600">
                  {part.summary}
                </p>

                <p className="mt-5 inline-flex items-center gap-2 rounded-[3px] border border-steel-200 bg-steel-50 px-3 py-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy-700">
                  {part.isGenuine ? "Genuine / OEM" : "Aftermarket equivalent"}
                </p>

                {part.attributes.length > 0 ? (
                  <dl className="mt-7 grid gap-px overflow-hidden rounded-[3px] bg-steel-200 sm:grid-cols-2">
                    {part.attributes.map((attribute) => (
                      <div key={attribute.label} className="bg-white px-4 py-3">
                        <dt className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-steel-500">
                          {attribute.label}
                        </dt>
                        <dd className="mt-1 font-display text-base font-semibold tabular-nums text-navy-700">
                          {attribute.value}
                          {attribute.unit ? (
                            <span className="ml-1 text-xs font-medium text-steel-500">
                              {attribute.unit}
                            </span>
                          ) : null}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={routes.quote()}>
                    Request a quote
                    <ArrowRight />
                  </Button>
                  <Button href="/contact" variant="outline">
                    Talk to sales
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ------------------------------------------------ compatible machines */}
        <Section tone="muted">
          <Container>
            <SectionHeader
              eyebrow="Fitment"
              title="Machines this fits"
              description={
                machines.length > 0
                  ? undefined
                  : "Compatibility for this attachment has not been confirmed against individual models yet. Send us your machine model and we will confirm the fit."
              }
            />
            {machines.length > 0 ? (
              <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {machines.map((item, index) => (
                  <Reveal key={item.id} delay={(index % 3) * 0.06} className="h-full">
                    <EquipmentCard item={item} className="h-full" />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-7">
                <Button href={routes.quote()} variant="outline">
                  Check compatibility
                  <ArrowRight />
                </Button>
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
