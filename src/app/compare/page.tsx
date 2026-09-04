import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CompareClear,
  CompareRemove,
  CompareSync,
} from "@/components/compare/CompareControls";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { COMPARE_LIMIT } from "@/lib/compare";
import { getEquipment } from "@/lib/data";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * Side by side, on the figures.
 *
 * ADDRESSED BY QUERY STRING, not by reading the stored selection. The tray keeps
 * the selection so it survives moving between brand catalogues, but the page
 * takes `?models=a,b,c` — so a comparison can be sent to somebody, and the page
 * renders on the server rather than waiting on localStorage. `CompareSync` then
 * pushes those models back into the tray so the two never disagree.
 *
 * Only figures published by every selected machine are shown. Manufacturer
 * sheets often use different labels for the same measurement, so equivalent
 * labels are normalized before that intersection is built. This keeps LOAD-X
 * comparisons useful without introducing blank cells or placeholder dashes.
 */

export const metadata: Metadata = {
  title: "Compare machines",
  description:
    "Compare the specifications of machines from the Burki & Company catalogue side by side.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const one = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const comparisonLabels: Record<string, string> = {
  "Total weight": "Operating weight",
  "Rated payload": "Rated load",
  "Rated output": "Rated power",
  "Max speed": "Max travel speed",
  "Loader length": "Overall length",
  "Loader width": "Overall width",
  "Overall width (bucket)": "Overall width",
  "Loader height": "Overall height",
  "Overall height (cab)": "Overall height",
  "Gear shifts": "Gears",
};

const comparisonLabel = (label: string) => comparisonLabels[label] ?? label;

export default async function ComparePage({ searchParams }: Props) {
  const requested = (one((await searchParams).models) ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, COMPARE_LIMIT);

  const all = await getEquipment();
  /* In the order asked for, not catalogue order — the columns should stand in
     the order the machines were picked. */
  const machines = requested
    .map((slug) => all.find((m) => m.slug === slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  if (machines.length === 0) {
    return (
      <>
        <Header />
        <CompareSync slugs={[]} />
        <main>
          <Section tone="light">
            <Container size="narrow">
              <div className="py-10 text-center">
                <h1 className="font-display text-3xl font-bold uppercase text-navy-800">
                  Nothing to compare yet
                </h1>
                <p className="mt-4 text-base leading-relaxed text-steel-600">
                  Pick machines with the Compare button on any catalogue card,
                  then come back here to see their figures side by side.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Button href={routes.equipment()}>
                    Browse equipment
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </Container>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  /* Gather normalized labels first, preserving the manufacturers' order. */
  const publishedLabels: string[] = [];
  for (const machine of machines) {
    for (const group of machine.specs) {
      for (const spec of group.specs) {
        const label = comparisonLabel(spec.label);
        if (!publishedLabels.includes(label)) publishedLabels.push(label);
      }
    }
  }

  const specFor = (machine: (typeof machines)[number], label: string) =>
    machine.specs
      .flatMap((group) => group.specs)
      .find((spec) => comparisonLabel(spec.label) === label);

  const rows = publishedLabels.filter((label) =>
    machines.every((machine) => Boolean(specFor(machine, label))),
  );

  const valueFor = (machine: (typeof machines)[number], label: string) => {
    const spec = specFor(machine, label);
    if (!spec) return null;
    return spec.unit ? `${spec.value} ${spec.unit}` : spec.value;
  };

  /* One track for the label column and one per machine, so the header cells and
     the table below them line up on the same grid whatever the count. */
  const columns = `minmax(9rem,1.1fr) repeat(${machines.length}, minmax(0,1fr))`;

  return (
    <>
      <Header />
      <CompareSync slugs={machines.map((m) => m.slug)} />
      <main>
        <Section tone="light" spacing="tight">
          <Container>
            {/* ------------------------------------------------ the machines
             *
             * One bordered box divided into cells: the title and the clear
             * control in the first, then a machine in each of the rest, then a
             * cell inviting another while there is room for one. Drawn as a
             * grid rather than as separate cards, so it reads as the head of
             * the table underneath rather than as a row of tiles above it.
             */}
            <div
              className="grid overflow-hidden rounded-[3px] border border-steel-200 bg-white"
              style={{ gridTemplateColumns: columns }}
            >
              <div className="flex flex-col justify-center gap-5 border-r border-steel-200 p-5 md:p-7">
                <h1 className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-navy-800 md:text-2xl">
                  Product
                  <br />
                  comparison
                </h1>
                <div>
                  <CompareClear />
                </div>
              </div>

              {machines.map((machine) => {
                const art = machine.cutoutImage ?? machine.image;
                return (
                  <div
                    key={machine.slug}
                    className="relative flex flex-col border-r border-steel-200 p-4 last:border-r-0 md:p-5"
                  >
                    <CompareRemove slug={machine.slug} model={machine.model} />

                    <Link href={routes.equipmentItem(machine)} className="group block">
                      <div className="relative mx-auto aspect-[4/3] w-full max-w-[220px]">
                        <Image
                          src={art.src}
                          alt={art.alt}
                          fill
                          sizes="220px"
                          className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <p className="mt-2 text-center font-display text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-amber-600 md:text-[0.625rem]">
                        {machine.brand}
                      </p>
                      <p className="text-center font-display text-lg font-bold uppercase leading-tight tracking-tight text-navy-800 transition-colors group-hover:text-amber-600 md:text-2xl">
                        {machine.model}
                      </p>
                    </Link>

                    <div className="mt-auto pt-4">
                      <Button
                        href={routes.quote(machine)}
                        size="sm"
                        variant="navy"
                        className="w-full"
                      >
                        Request a quote
                      </Button>
                    </div>
                  </div>
                );
              })}

              {machines.length < COMPARE_LIMIT ? (
                <Link
                  href={routes.equipment()}
                  className="group flex flex-col items-center justify-center gap-4 p-5 text-center transition-colors hover:bg-steel-50"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-16 w-16 items-center justify-center rounded-[3px] bg-steel-100 font-display text-3xl font-light text-steel-400 transition-colors group-hover:bg-steel-200 group-hover:text-navy-700"
                  >
                    +
                  </span>
                  <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-navy-700 md:text-[0.75rem]">
                    Add comparison
                    <br />
                    product
                  </span>
                </Link>
              ) : null}
            </div>
          </Container>
        </Section>

        {/* --------------------------------------------------------- the table */}
        <Section tone="light" spacing="tight" className="pt-0 md:pt-0">
          <Container>
            {rows.length > 0 ? (
              <div
                className="grid overflow-hidden rounded-[3px] border border-steel-200"
                style={{ gridTemplateColumns: columns }}
                role="table"
                aria-label="Specifications compared"
              >
                {/* Header */}
                <div
                  role="columnheader"
                  className="border-b border-r border-steel-200 bg-steel-100 p-3 font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy-800"
                >
                  Model
                </div>
                {machines.map((machine) => (
                  <div
                    key={machine.slug}
                    role="columnheader"
                    className="border-b border-r border-steel-200 bg-steel-100 p-3 text-center font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy-800 last:border-r-0"
                  >
                    {machine.model}
                  </div>
                ))}

                {/* Rows. Every cell paints its own rules, so the grid is drawn
                    all the way across even where a value is short. */}
                {rows.map((label, index) => {
                  const striped = index % 2 === 1;
                  const last = index === rows.length - 1;
                  return (
                    <div key={label} className="contents" role="row">
                      <div
                        role="rowheader"
                        className={cn(
                          "border-r border-steel-200 p-3 text-[0.8125rem] text-steel-600",
                          !last && "border-b",
                          striped && "bg-steel-50",
                        )}
                      >
                        {label}
                      </div>
                      {machines.map((machine) => (
                        <div
                          key={machine.slug}
                          role="cell"
                          className={cn(
                            "border-r border-steel-200 p-3 text-center font-display text-[0.875rem] font-semibold tabular-nums text-navy-800 last:border-r-0",
                            !last && "border-b",
                            striped && "bg-steel-50",
                          )}
                        >
                          {valueFor(machine, label)}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-[3px] border border-dashed border-steel-300 bg-steel-50 p-8 text-center">
                <p className="text-[0.9375rem] leading-relaxed text-steel-600">
                  These machines publish no specification in common, so there is
                  nothing to line up. Comparing machines of the same class —
                  two excavators, or two loaders — gives a fuller table.
                </p>
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
