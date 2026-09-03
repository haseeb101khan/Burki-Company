"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import type { BrandShowcaseEntry, Equipment } from "@/lib/data";
import { ArrowRight, Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * THE BRAND SHOWCASE — the homepage's centrepiece.
 *
 * Brand tabs across the top; the manufacturer's own photography on the left,
 * its headline machines on the right. Modelled on the client's reference
 * (SANY's "Cases" block), with two things they asked for specifically:
 *
 *  - THE MACHINES ARE AN ACCORDION, not a row of cards. One is open with its
 *    photograph, figures and actions; the rest are collapsed title bars. The
 *    section stays the same height however many machines a brand leads with,
 *    and the open one gets room to be seen properly.
 *
 *  - THE PHOTOGRAPH CYCLES on the same 7 second beat as the hero banners, so
 *    all of a brand's supplied imagery is shown rather than one picture winning
 *    and the rest never appearing.
 *
 * THE CUTOUTS ARE STICKERS. No card, no border, no tinted stage behind them.
 * An earlier build gave each machine its own bordered box and the boxes were
 * the first thing you saw. The machine now sits straight on the row with a soft
 * shadow beneath it, which is what makes it read as an object on the page
 * rather than a picture in a frame. That only works because the artwork has
 * real transparency — see scripts/lib/cutout.mjs. On the white-backed originals
 * it was an unmissable rectangle.
 */

/** Same cadence as the hero banners, so the page keeps one rhythm. */
const ROTATE_MS = 7000;

export function BrandShowcase({
  entries,
  footer,
}: {
  entries: BrandShowcaseEntry[];
  /* Rendered on the server and passed down as an element, because this
     component is a client boundary and cannot reach the data layer itself. */
  footer?: ReactNode;
}) {
  const [activeSlug, setActiveSlug] = useState(entries[0]?.brand.slug ?? "");
  const active = entries.find((e) => e.brand.slug === activeSlug) ?? entries[0];

  if (!active) return null;

  return (
    <Section tone="light">
      <Container>
        <SectionHeader
          eyebrow="Our brands"
          title="The lines we carry"
          /* Counted, not written out. This said "Six" for a while after three
             brands were withdrawn: a number in prose is a fact that has to be
             maintained by hand, and this one was not. */
          description={`${entries.length} manufacturers, imported and supported directly. Choose one to see the machines we lead with.`}
        />

        <div
          role="tablist"
          aria-label="Manufacturer"
          className="-mx-5 mt-9 overflow-x-auto px-5 sm:mx-0 sm:px-0"
        >
          <div className="flex w-max gap-7 border-b border-steel-200 sm:w-full">
            {entries.map((entry) => {
              const isActive = entry.brand.slug === active.brand.slug;
              return (
                <button
                  key={entry.brand.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSlug(entry.brand.slug)}
                  className={cn(
                    "relative -mb-px whitespace-nowrap pb-3 font-display text-sm font-semibold uppercase tracking-[0.1em] transition-colors md:text-base",
                    isActive ? "text-navy-800" : "text-steel-500 hover:text-navy-700",
                  )}
                >
                  {entry.brand.name}
                  {isActive ? (
                    <motion.span
                      layoutId="brand-tab-rule"
                      className="absolute inset-x-0 -bottom-px block h-0.5 bg-amber-500"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Keyed on the brand so the whole panel — banner timer and open
            machine alike — resets cleanly when the tab changes. */}
        <BrandPanel key={active.brand.slug} entry={active} />

        {footer}
      </Container>
    </Section>
  );
}

function BrandPanel({ entry }: { entry: BrandShowcaseEntry }) {
  const { brand, machines } = entry;
  const [openSlug, setOpenSlug] = useState(machines[0]?.slug ?? "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12"
    >
      <div>
        <BrandBanner brand={brand} />

        <h3 className="font-display mt-7 text-3xl font-bold uppercase leading-none tracking-tight text-navy-800">
          {brand.name}
        </h3>
        {brand.countryOfOrigin ? (
          <p className="mt-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-steel-500">
            {brand.countryOfOrigin}
            {brand.equipmentCount > 0
              ? ` · ${brand.equipmentCount} ${brand.equipmentCount === 1 ? "model" : "models"}`
              : ""}
          </p>
        ) : null}
        {brand.shortDescription ? (
          <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-steel-600">
            {brand.shortDescription}
          </p>
        ) : null}

        <Button href={routes.brand(brand)} variant="outline" size="sm" className="mt-6">
          View the {brand.name} range
          <ArrowRight />
        </Button>
      </div>

      <div>
        {machines.length > 0 ? (
          <ul className="space-y-3">
            {machines.map((machine) => (
              <li key={machine.id}>
                <MachineRow
                  machine={machine}
                  isOpen={machine.slug === openSlug}
                  onOpen={() => setOpenSlug(machine.slug)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-[3px] border border-dashed border-steel-300 bg-steel-50 p-8 text-center">
            <p className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-amber-600">
              Being catalogued
            </p>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-steel-600">
              We supply {brand.name} equipment and can quote against a
              specification today. The individual models are not on the site yet.
            </p>
            <Button href={routes.quote()} size="sm" className="mt-6">
              Request a quote
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * The brand's photography, cycling on the banner cadence.
 *
 * Falls back to one static frame when a brand has a single picture, and to a
 * typographic plate when it has none — four of the six are set up ahead of
 * their imagery arriving.
 */
function BrandBanner({ brand }: { brand: BrandShowcaseEntry["brand"] }) {
  const images = brand.showcaseImages;
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (images.length < 2 || reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), ROTATE_MS);
    return () => clearInterval(id);
    /* `index` belongs in this list. Without it the interval keeps its original
       schedule when the frame is changed by a dot click, and the next automatic
       advance fires early — the same timer-reset bug that was fixed across all
       three carousels on this page. */
  }, [images.length, reduceMotion, index]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-[3px] border border-dashed border-steel-300 bg-steel-50">
        <span className="font-display text-3xl font-bold uppercase tracking-tight text-steel-300">
          {brand.name}
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-steel-100">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            priority={index === 0}
            /* Eager for the same reason as the hero carousel: a rotating frame
               that is still decoding shows as a blank panel. */
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 ? (
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === index ? "w-7 bg-white" : "w-3 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * One machine: a collapsed title bar, or an open panel carrying the cutout,
 * its key figures and the two actions.
 */
function MachineRow({
  machine,
  isOpen,
  onOpen,
}: {
  machine: Equipment;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const art = machine.cutoutImage ?? machine.image;
  const figures = machine.highlights.slice(0, 3);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-expanded={false}
        className="group flex w-full items-center justify-between gap-4 rounded-[3px] bg-steel-50 px-5 py-4 text-left transition-colors hover:bg-steel-100"
      >
        <span className="font-display text-base font-semibold uppercase tracking-[0.04em] text-navy-800">
          {machine.model}
        </span>
        <ChevronDownIcon className="shrink-0 text-steel-400 transition-colors group-hover:text-navy-700" />
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-[3px] bg-steel-50 p-5 md:p-6"
    >
      <div className="grid gap-5 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] sm:items-center sm:gap-6">
        {/*
         * The sticker. Nothing behind it: no panel, no border, no tinted stage.
         *
         * The baseline the machine stands on is inside the artwork now — every
         * cutout is authored on one 5:4 canvas at one scale, standing 7% up
         * from its own bottom edge (`scripts/normalise-cutouts.mjs`). The
         * `pb-[8%]` that used to sit here was doing that job from the outside,
         * back when each file was cropped tight to its own machine; leaving it
         * would lift these off the floor and shrink them by another eighth.
         */}
        <div className="relative">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={art.src}
              alt={art.alt}
              fill
              sizes="(min-width: 640px) 26vw, 70vw"
              className="object-contain object-bottom drop-shadow-[0_16px_14px_rgba(0,17,46,0.14)]"
            />
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[8%] left-1/2 h-2 w-[56%] -translate-x-1/2 rounded-[50%] bg-navy-900/20 blur-[7px]"
          />
          <p className="mt-2 text-center font-display text-lg font-bold uppercase leading-none tracking-tight text-navy-800">
            {machine.model}
          </p>
        </div>

        <div>
          {figures.length > 0 ? (
            <dl className="grid grid-cols-3 gap-3">
              {figures.map((figure) => (
                <div key={figure.label}>
                  <dt className="text-[0.625rem] uppercase leading-tight tracking-[0.06em] text-steel-500">
                    {figure.label}
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold tabular-nums text-navy-800">
                    {figure.value}
                    {figure.unit ? (
                      <span className="ml-0.5 text-[0.6875rem] font-medium text-steel-500">
                        {figure.unit}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            /* No confirmed figures yet. Saying so beats an empty column, and it
               clears itself the moment specs are entered. */
            <p className="text-[0.8125rem] leading-relaxed text-steel-500">
              Full specifications are being confirmed with the manufacturer — ask
              us and we will send them.
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href={routes.quote(machine)} size="sm">
              Inquiry
            </Button>
            <Button href={routes.equipmentItem(machine)} variant="outline" size="sm">
              View detail
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
