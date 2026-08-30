"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import type { Feature } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The machine's case, as a stack of collapsible strips.
 *
 * This was a rank of numbered columns divided by hairlines, which on a desktop
 * read well and on a phone collapsed into one very long scroll of headings and
 * paragraphs — four features became most of a screen each, and the buyer had to
 * wade through all of it to reach the variants below.
 *
 * As strips the shape of the argument is visible at a glance — longest reach,
 * reversible handle, dual-camera — and the paragraph is there for the one or
 * two that matter to this buyer. Same mechanism as `SpecTable`, deliberately:
 * a visitor who has just opened three specification groups already knows how
 * this behaves.
 *
 * The palette follows the section it sits in rather than the specification
 * table's, because this section is navy. The strips are the section's own dark
 * ground stepped one shade either way — bars in specification navy would sit on
 * a navy field and read as a mistake.
 */
export function FeatureAccordion({ features }: { features: Feature[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  if (features.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {features.map((feature, index) => {
        const isOpen = Boolean(open[feature.title]);
        const panelId = `${baseId}-${index}`;

        return (
          <Reveal key={feature.title} delay={Math.min(index, 5) * 0.05}>
            <div
              className={cn(
                "overflow-hidden rounded-[3px] border transition-colors duration-300",
                isOpen ? "border-amber-500/40" : "border-white/12",
              )}
            >
              <h3>
                <button
                  type="button"
                  onClick={() =>
                    setOpen((prev) => ({ ...prev, [feature.title]: !prev[feature.title] }))
                  }
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={cn(
                    "flex w-full items-center gap-4 px-4 py-4 text-left md:px-5",
                    "transition-colors duration-300",
                    "focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:-outline-offset-2",
                    // An open strip stays lighter, so which ones are open is
                    // readable without hovering each one.
                    isOpen ? "bg-navy-700" : "bg-navy-900/60 hover:bg-navy-700",
                  )}
                >
                  {/* Outlined, not filled: the numeral is structure, not a
                      thing to read before the heading. It fills in on open, so
                      the strip the visitor chose is marked from across the
                      page. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-display shrink-0 text-[1.375rem] font-bold leading-none tabular-nums transition-colors duration-300 md:text-[1.5rem]",
                      isOpen
                        ? "text-amber-500"
                        : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1 font-display text-[0.9375rem] font-bold uppercase leading-tight tracking-[0.02em] text-white md:text-base">
                    {feature.title}
                  </span>

                  <ChevronDownIcon
                    aria-hidden="true"
                    className={cn(
                      "shrink-0 text-base text-amber-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
              </h3>

              {/* `height: auto` is animatable here because the panel is a plain
                  block; the inner wrapper keeps padding out of the measured
                  height so the collapse lands exactly on zero. */}
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.38,
                      ease: EASE,
                      opacity: { duration: reduceMotion ? 0 : 0.22 },
                    }}
                    className="overflow-hidden bg-white/[0.04]"
                  >
                    {/* Indented to clear the numeral, so the paragraph hangs
                        off its own heading rather than the strip edge. */}
                    <p className="px-4 py-4 pl-[3.25rem] text-[0.875rem] leading-relaxed text-white/70 md:px-5 md:pl-[3.75rem]">
                      {feature.description}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
