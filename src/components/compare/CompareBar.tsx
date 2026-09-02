"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CloseIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import { COMPARE_LIMIT, useCompare } from "./CompareProvider";

/**
 * The tray that appears once something is selected for comparison.
 *
 * Pinned to the base of the window rather than sitting in the page, because the
 * second machine is usually chosen after scrolling — a bar in the flow would be
 * somewhere above the fold by the time it mattered.
 *
 * IT ONLY EXISTS WHEN IT HAS SOMETHING TO SAY. Nothing selected, nothing
 * rendered: no empty rail across the foot of every page. It also waits for
 * `ready`, so a stored selection does not arrive a frame late as a jump.
 *
 * Comparison happens at /compare, addressed by query string rather than by
 * reading the stored selection, so a comparison can be sent to somebody.
 */
export function CompareBar() {
  const { selected, machines, remove, clear, ready } = useCompare();
  const reduceMotion = useReducedMotion();

  const chosen = selected
    .map((slug) => machines.find((m) => m.slug === slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const show = ready && chosen.length > 0;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ y: reduceMotion ? 0 : "100%" }}
          animate={{ y: 0 }}
          exit={{ y: reduceMotion ? 0 : "100%" }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-900 text-white shadow-[0_-12px_40px_-24px_rgba(0,10,28,0.9)]"
          aria-label="Machines selected for comparison"
        >
          <Container className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:gap-6 md:py-4">
            <ul className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto md:gap-5">
              {chosen.map((machine) => (
                <li key={machine.slug} className="flex shrink-0 items-center gap-2">
                  <div className="relative h-10 w-14 shrink-0 md:h-12 md:w-16">
                    <Image
                      src={machine.image.src}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-[0.5625rem] uppercase tracking-[0.14em] text-amber-500">
                      {machine.brand}
                    </p>
                    <p className="font-display text-sm font-bold uppercase leading-tight">
                      {machine.model}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(machine.slug)}
                    aria-label={`Remove ${machine.model} from the comparison`}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <CloseIcon className="text-[0.7em]" />
                  </button>
                </li>
              ))}

              {chosen.length < COMPARE_LIMIT ? (
                <li className="shrink-0 font-display text-[0.6875rem] uppercase tracking-[0.12em] text-white/45">
                  {/* Says what to do next rather than leaving an empty slot to
                      be interpreted. */}
                  Pick {COMPARE_LIMIT - chosen.length} more, or compare these
                </li>
              ) : null}
            </ul>

            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={clear}
                className="px-3 py-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white/60 transition-colors hover:text-white"
              >
                Clear
              </button>
              <Link
                href={`/compare?models=${chosen.map((m) => m.slug).join(",")}`}
                className="rounded-[3px] bg-amber-500 px-4 py-2.5 font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-navy-900 transition-colors hover:bg-amber-400 md:px-5 md:text-[0.75rem]"
              >
                Compare {chosen.length > 1 ? `(${chosen.length})` : ""}
              </Link>
            </div>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
