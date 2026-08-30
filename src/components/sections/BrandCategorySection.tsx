"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Button } from "@/components/ui/Button";
import { EquipmentCard } from "@/components/ui/EquipmentCard";
import { ChevronRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function BrandCategorySection({
  brand,
  categories,
  categorySlug,
  countsHere,
  machines,
  categoryName,
  href,
  all,
}: {
  brand: { name: string };
  categories: any[];
  categorySlug: string | undefined;
  countsHere: Map<string, number>;
  machines: any[];
  categoryName: (s: string) => string | undefined;
  href: (category?: string) => string;
  all: any[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Section tone="light" spacing="tight" className="pt-8 md:pt-10">
      <Container>
        <div className="lg:grid lg:grid-cols-[236px_minmax(0,1fr)] lg:gap-10">
          {/* ------- CATEGORY DROPDOWN (Mobile) / SIDEBAR (Desktop) ------- */}
          <div>
            {/* Mobile dropdown button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-full mb-6 flex items-center justify-between gap-3 bg-navy-700 text-white px-4 py-3.5 rounded-[3px] font-display text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-navy-800"
            >
              <span>Filter by category</span>
              <ChevronRightIcon
                className={cn(
                  "text-lg transition-transform duration-300",
                  open ? "rotate-90" : ""
                )}
              />
            </button>

            {/* Desktop sidebar - always shown on lg+ */}
            <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
              <h2 className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-steel-500">
                Categories
              </h2>

              <ul className="mt-4 space-y-px overflow-hidden rounded-[3px] border border-steel-200">
                <li>
                  <Link
                    href={href()}
                    aria-current={!categorySlug ? "true" : undefined}
                    className={cn(
                      "flex items-center justify-between gap-3 px-4 py-3 text-[0.875rem] font-medium transition-colors",
                      !categorySlug
                        ? "bg-navy-700 text-white"
                        : "bg-white text-navy-800 hover:bg-navy-50",
                    )}
                  >
                    <span>All {brand.name}</span>
                    <span className="shrink-0 tabular-nums text-[0.75rem] opacity-70">
                      {all.length}
                    </span>
                  </Link>
                </li>

                {categories.map((category) => {
                  const count = countsHere.get(category.slug) ?? 0;
                  const isActive = categorySlug === category.slug;
                  const carried = count > 0;
                  return (
                    <li key={category.id}>
                      <Link
                        href={carried ? href(category.slug) : routes.category(category)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex items-center justify-between gap-3 px-4 py-3 text-[0.875rem] transition-colors",
                          isActive
                            ? "bg-navy-700 font-medium text-white"
                            : carried
                              ? "bg-white font-medium text-navy-800 hover:bg-navy-50"
                              : "bg-white text-steel-500 hover:bg-steel-50 hover:text-navy-700",
                        )}
                      >
                        <span>{category.name}</span>
                        {carried ? (
                          <span className="shrink-0 tabular-nums text-[0.75rem] opacity-70">
                            {count}
                          </span>
                        ) : (
                          <ChevronRightIcon className="shrink-0 text-[0.85em] text-steel-300" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 rounded-[3px] border border-steel-200 bg-steel-50 p-4">
                <p className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
                  Need help choosing?
                </p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-steel-600">
                  Tell us the job and the site, and we will specify the machine.
                </p>
                <Button href={routes.quote()} size="sm" variant="outline" className="mt-4 w-full">
                  Contact us
                </Button>
              </div>
            </aside>

            {/* Mobile expanded grid - fits in one frame */}
            {open && (
              <div className="lg:hidden grid grid-cols-3 gap-2 bg-navy-700 text-white p-3 rounded-[3px] max-h-64 overflow-y-auto">
                <Link
                  href={href()}
                  onClick={() => setOpen(false)}
                  aria-current={!categorySlug ? "true" : undefined}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 px-2 py-2.5 rounded text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-center transition-all",
                    !categorySlug
                      ? "bg-navy-900 text-amber-500"
                      : "text-white/70 hover:text-white",
                  )}
                >
                  <span>All</span>
                  <span className="text-[0.625rem] opacity-70">{all.length}</span>
                </Link>

                {categories.map((category) => {
                  const count = countsHere.get(category.slug) ?? 0;
                  const isActive = categorySlug === category.slug;
                  const carried = count > 0;
                  return (
                    <Link
                      key={category.id}
                      href={carried ? href(category.slug) : routes.category(category)}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1 px-2 py-2.5 rounded text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-center transition-all",
                        isActive
                          ? "bg-navy-900 text-amber-500"
                          : "text-white/70 hover:text-white",
                      )}
                    >
                      <span>{category.name}</span>
                      {carried && (
                        <span className="text-[0.625rem] opacity-70">{count}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Equipment cards grid */}
          <div>
            {machines.length > 0 ? (
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {machines.map((item, index) => (
                  <Reveal key={item.id} delay={(index % 3) * 0.06} className="h-full">
                    <EquipmentCard
                      item={item}
                      categoryLabel={categoryName(item.categorySlug)}
                      className="h-full"
                      priority={index < 3}
                    />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-lg py-8 text-center">
                <Eyebrow>Coming soon</Eyebrow>
                <h2 className="font-display mt-4 text-2xl font-bold uppercase text-navy-800">
                  {brand.name} models are being catalogued
                </h2>
                <p className="mt-3 text-base leading-relaxed text-steel-600">
                  We supply {brand.name} equipment and can quote against a
                  specification today — the individual models are not on the
                  site yet.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Button href={routes.quote()}>
                    Request a quote
                    <ArrowRight />
                  </Button>
                  <Button href={routes.equipment()} variant="outline">
                    All brands
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
