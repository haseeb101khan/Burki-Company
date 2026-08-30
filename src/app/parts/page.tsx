import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { getPartCategories, getPartCountByCategory } from "@/lib/data";
import { routes } from "@/lib/routes";

/**
 * PARTS AND ATTACHMENTS — the category index.
 *
 * Attachments are filed here rather than under equipment, on the client's
 * instruction: a grapple or a breaker is bought against a machine somebody
 * already owns. Each one also appears on the detail page of every machine it
 * fits, so the same record is reachable from both directions.
 */

export const metadata: Metadata = {
  title: "Parts & Attachments",
  description:
    "Attachments, wear parts and driveline components for the equipment Burki & Company supplies and services.",
};

export default async function PartsPage() {
  const [categories, counts] = await Promise.all([
    getPartCategories(),
    getPartCountByCategory(),
  ]);

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

  return (
    <>
      <Header />
      <main>
        <Section tone="light" spacing="tight">
          <Container>
            <SectionHeader
              eyebrow="Parts"
              title="Parts & attachments"
              description="Attachments that turn one machine into several, and the wear parts that keep it earning. Everything here is cross-referenced against the machines it fits."
              action={
                <Button href={routes.quote()} size="sm">
                  Request a quote
                  <ArrowRight />
                </Button>
              }
            />
          </Container>
        </Section>

        <Section tone="light" spacing="tight">
          <Container>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => {
                const count = counts[category.slug] ?? 0;
                return (
                  <li key={category.id}>
                    <Reveal delay={(index % 3) * 0.06} className="h-full">
                      <Link
                        href={routes.partCategory(category)}
                        className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-steel-200 bg-white transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-300 hover:shadow-[0_22px_44px_-28px_rgba(0,17,46,0.5)]"
                      >
                        {category.image.src ? (
                          <div className="relative aspect-[16/9] overflow-hidden bg-steel-100">
                            <Image
                              src={category.image.src}
                              alt={category.image.alt}
                              fill
                              sizes="(min-width: 1024px) 30vw, 100vw"
                              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                            />
                          </div>
                        ) : null}
                        <div className="flex flex-1 flex-col p-5 md:p-6">
                          <div className="flex items-baseline justify-between gap-3">
                            <h2 className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-navy-800">
                              {category.name}
                            </h2>
                            <span className="shrink-0 tabular-nums text-[0.75rem] text-steel-500">
                              {count}
                            </span>
                          </div>
                          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-steel-600">
                            {category.description}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-navy-700 transition-colors group-hover:text-amber-600">
                            {count > 0 ? "Browse" : "Enquire"}
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

        <Section tone="navy" spacing="tight">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-display-sm uppercase text-white">
                  Not sure which part you need?
                </h2>
                <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-white/65">
                  Send us the machine model and serial and we will identify it.
                  We also source parts for machines outside the {total} listed
                  here.
                </p>
              </div>
              <Button href={routes.quote()}>
                Ask about a part
                <ArrowRight />
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
