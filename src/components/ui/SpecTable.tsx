"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import type { SpecGroup } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full specification table as a stack of collapsible navy strips —
 * Identification, Operating, Engine, Transmission, Axle and Brakes, Tyres and
 * Dimensions, or whatever groups the model actually carries.
 *
 * Collapsed by default. A full loader spec is roughly forty rows, and printing
 * all of it at once buries the rest of the page; as strips the buyer sees the
 * shape of the specification first and opens the section they came for. The
 * rows stay in the DOM either way, so they remain findable by in-page search
 * and by crawlers.
 *
 * Group titles are the navy bar itself rather than a heading inside a card:
 * the table then scans as sections from across the page, not just up close.
 */
export function SpecTable({ groups }: { groups: SpecGroup[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  if (groups.length === 0) return null;

  const openCount = groups.filter((g) => open[g.title]).length;
  const allOpen = openCount === groups.length;

  const toggleAll = () =>
    setOpen(
      allOpen ? {} : Object.fromEntries(groups.map((g) => [g.title, true])),
    );

  return (
    <div>
      {groups.length > 1 ? (
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={toggleAll}
            className="font-display text-[0.6875rem] font-semibold tracking-[0.14em] text-navy-700 uppercase underline-offset-4 transition-colors hover:text-amber-600 hover:underline"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
      ) : null}

      <div className="space-y-2.5">
        {groups.map((group, index) => {
          const isOpen = Boolean(open[group.title]);
          const panelId = `${baseId}-${index}`;

          return (
            <Reveal key={group.title} delay={Math.min(index, 5) * 0.04}>
              <div className="overflow-hidden rounded-[3px]">
                <h3>
                  <button
                    type="button"
                    onClick={() =>
                      setOpen((prev) => ({ ...prev, [group.title]: !prev[group.title] }))
                    }
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left",
                      "font-display text-[0.75rem] font-semibold tracking-[0.14em] text-white uppercase",
                      "transition-colors duration-300 hover:bg-navy-700",
                      "focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:-outline-offset-2",
                      // An open strip stays lighter, so which sections are
                      // open is readable without hovering each one.
                      isOpen ? "bg-navy-700" : "bg-navy-800",
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      {group.title}
                      <span className="font-sans text-[0.6875rem] font-normal tracking-normal text-white/45 tabular-nums">
                        {group.specs.length}
                      </span>
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

                {/* `height: auto` is animatable here because the panel is a
                    plain block; the inner wrapper keeps padding out of the
                    measured height so the collapse lands exactly on zero. */}
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
                      className="overflow-hidden border-x border-b border-steel-200 bg-white"
                    >
                      <dl className="grid sm:grid-cols-2">
                        {group.specs.map((spec, i) => (
                          <div
                            key={spec.label}
                            className={cn(
                              "flex items-baseline justify-between gap-4 border-b border-steel-100 px-5 py-3",
                              // Two columns need a divider between them, and
                              // the final row of each column loses its rule.
                              "sm:odd:border-r sm:odd:border-r-steel-100",
                              i >= group.specs.length - (group.specs.length % 2 === 0 ? 2 : 1) &&
                                "sm:border-b-0",
                              i === group.specs.length - 1 && "border-b-0",
                            )}
                          >
                            <dt className="text-[0.8125rem] text-steel-600">{spec.label}</dt>
                            <dd className="shrink-0 text-right font-display text-[0.9375rem] font-semibold text-navy-800 tabular-nums">
                              {spec.value}
                              {spec.unit ? (
                                <span className="ml-1 text-[0.75rem] font-medium text-steel-500">
                                  {spec.unit}
                                </span>
                              ) : null}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
