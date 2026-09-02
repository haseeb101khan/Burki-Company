import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { getEquipment } from "@/lib/data";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * Side by side, on the figures.
 *
 * ADDRESSED BY QUERY STRING, not by reading the stored selection. The bar keeps
 * the selection so it survives moving between brand catalogues, but the page
 * itself takes `?models=a,b,c` — which means a comparison can be sent to
 * somebody, and the page renders on the server rather than waiting for
 * localStorage.
 *
 * THE ROWS ARE THE UNION OF WHAT THE MACHINES ACTUALLY PUBLISH, in the order the
 * first machine lists them. A fixed row list would either invent rows nobody
 * has a figure for or drop figures that only one machine carries — and the C150
 * and the LX-926 do not describe themselves with the same set. Where a machine
 * has no figure for a row it gets an em dash, which is a fact about the sheet
 * rather than a gap in the table.
 */

export const metadata: Metadata = {
  title: "Compare machines",
  description: "Compare the specifications of machines from the Burki & Company catalogue side by side.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const one = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export default async function ComparePage({ searchParams }: Props) {
  const requested = (one((await searchParams).models) ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const all = await getEquipment();
  /* In the order asked for, not catalogue order — the columns should match the
     order the machines were picked in. */
  const machines = requested
    .map((slug) => all.find((m) => m.slug === slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  if (machines.length === 0) {
    return (
      <>
        <Header />
        <main>
          <Section tone="light">
            <Container size="narrow">
              <div className="py-10 text-center">
                <h1 className="font-display text-3xl font-bold uppercase text-navy-800">
                  Nothing to compare yet
                </h1>
                <p className="mt-4 text-base leading-relaxed text-steel-600">
                  Pick machines with the Compare button on any catalogue card, then
                  come back here to see their figures side by side.
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

  /*
   * Every label any selected machine publishes — but ordered by how many of
   * them publish it, most-shared first.
   *
   * First-seen order was the obvious choice and it buried the point of the
   * page: comparing a Xinyuan against an XCMG, the two sheets share barely a
   * third of their labels, so rows only one machine carries were scattered
   * through the table and the reader had to hunt for the ones that actually
   * line up. Sorting by coverage puts every directly comparable figure at the
   * top and lets the one-offs settle underneath, where they still say what
   * that machine publishes that the others do not.
   *
   * The sort is stable, so within a coverage band the manufacturer's own
   * running order survives.
   */
  const labelCounts = new Map<string, number>();
  for (const machine of machines) {
    const seen = new Set<string>();
    for (const group of machine.specs) {
      for (const spec of group.specs) {
        if (seen.has(spec.label)) continue;
        seen.add(spec.label);
        labelCounts.set(spec.label, (labelCounts.get(spec.label) ?? 0) + 1);
      }
    }
  }
  const rows = [...labelCounts.keys()].sort(
    (a, b) => (labelCounts.get(b) ?? 0) - (labelCounts.get(a) ?? 0),
  );

  const valueFor = (machine: (typeof machines)[number], label: string) => {
    const spec = machine.specs
      .flatMap((group) => group.specs)
      .find((s) => s.label === label);
    if (!spec) return null;
    return spec.unit ? `${spec.value} ${spec.unit}` : spec.value;
  };

  return (
    <>
      <Header />
      <main>
        <Section tone="light" spacing="tight">
          <Container>
            <SectionHeader
              eyebrow="Compare"
              title="Side by side"
              description={`${machines.length} ${machines.length === 1 ? "machine" : "machines"}, on the figures their manufacturers publish.`}
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
            {/* One scroll container for the whole table, so the machine headers
                and their figures never drift out of line on a narrow screen. */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr>
                    <th scope="col" className="w-[26%] border-b border-steel-200 p-3 align-bottom">
                      <span className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-steel-500">
                        Model
                      </span>
                    </th>
                    {machines.map((machine) => (
                      <th
                        key={machine.slug}
                        scope="col"
                        className="border-b border-steel-200 p-3 align-bottom"
                      >
                        <Link href={routes.equipmentItem(machine)} className="group block">
                          <div className="relative mx-auto aspect-[4/3] w-full max-w-[190px]">
                            <Image
                              src={(machine.cutoutImage ?? machine.image).src}
                              alt={(machine.cutoutImage ?? machine.image).alt}
                              fill
                              sizes="190px"
                              className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          </div>
                          <p className="mt-1 text-center font-display text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-amber-600">
                            {machine.brand}
                          </p>
                          <p className="text-center font-display text-xl font-bold uppercase leading-tight tracking-tight text-navy-800 transition-colors group-hover:text-amber-600 md:text-2xl">
                            {machine.model}
                          </p>
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((label, index) => (
                    <tr key={label} className={cn(index % 2 === 1 && "bg-steel-50")}>
                      <th
                        scope="row"
                        className="border-b border-steel-100 p-3 text-[0.8125rem] font-medium text-steel-600"
                      >
                        {label}
                      </th>
                      {machines.map((machine) => {
                        const value = valueFor(machine, label);
                        return (
                          <td
                            key={machine.slug}
                            className={cn(
                              "border-b border-steel-100 p-3 font-display text-[0.875rem] tabular-nums",
                              value ? "font-semibold text-navy-800" : "text-steel-400",
                            )}
                          >
                            {/* An em dash means this machine's sheet does not
                                carry the row, which is worth showing. */}
                            {value ?? "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
