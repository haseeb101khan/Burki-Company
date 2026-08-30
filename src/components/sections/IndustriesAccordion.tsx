"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { ArrowRight } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import type { Industry } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Industries, collapsed to a single strip until asked for.
 *
 * Closed it is a navy bar with white type — a deliberate dark break in the
 * page. Opening flips the whole block to the light ground the rest of the site
 * uses and reveals the sector tiles, so the section only takes the space it
 * needs.
 *
 * The heading is a real <button> with aria-expanded/aria-controls, so it works
 * from the keyboard and reads correctly to a screen reader.
 */
export function IndustriesAccordion({ industries }: { industries: Industry[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section
      className={cn(
        "transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "bg-white" : "navy-depth bg-navy-800",
      )}
    >
      <Container>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-8 py-12 text-left md:py-16"
        >
          <span className="block">
            <span
              className={cn(
                "eyebrow-rule block font-display text-eyebrow uppercase transition-colors duration-500",
                open ? "text-navy-700" : "text-amber-500",
              )}
            >
              Industries
            </span>

            <span
              className={cn(
                "mt-4 block text-display-md uppercase transition-colors duration-500",
                open ? "text-navy-800" : "text-white",
              )}
            >
              Find equipment by the work you do
            </span>

            <span
              className={cn(
                "mt-4 block max-w-2xl text-[0.9375rem] leading-relaxed transition-colors duration-500 md:text-base",
                open ? "text-steel-600" : "text-white/65",
              )}
            >
              {open
                ? "Choose your sector and go straight to the machines specified for it."
                : "Six sectors, each linked to the machines specified for it. Open to browse."}
            </span>
          </span>

          {/* Grows and takes the accent colour under the cursor. */}
          <span
            aria-hidden="true"
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-xl transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 md:h-14 md:w-14 md:text-2xl",
              open
                ? "border-navy-200 bg-navy-50 text-navy-700 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-navy-900"
                : "border-white/30 text-white group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-navy-900",
            )}
          >
            <ChevronDownIcon
              className={cn(
                "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                open && "rotate-180",
              )}
            />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.35, ease: "linear" },
              }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 pb-14 md:grid-cols-3 md:gap-4 md:pb-20">
                {industries.map((industry) => (
                  <Link
                    key={industry.id}
                    href={`/industries/${industry.slug}`}
                    className="group/tile relative flex aspect-[16/10] overflow-hidden rounded-[3px] bg-navy-900 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-26px_rgba(0,17,46,0.65)]"
                  >
                    <Image
                      src={industry.image.src}
                      alt={industry.image.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover opacity-80 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tile:scale-[1.05] group-hover/tile:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/35 to-navy-950/5" />

                    <span className="relative mt-auto flex w-full items-end justify-between gap-3 p-4 md:p-5">
                      <span className="text-base font-bold uppercase leading-tight tracking-tight text-white md:text-lg">
                        {industry.name}
                      </span>
                      <span className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-white/25 text-white transition-all duration-300 group-hover/tile:border-amber-500 group-hover/tile:bg-amber-500 group-hover/tile:text-navy-900">
                        <ArrowRight />
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </section>
  );
}
