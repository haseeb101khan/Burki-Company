"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
/** How long a set holds before the next one comes in. The client's number. */
const DWELL_MS = 7000;

export type ReelItem = {
  slug: string;
  href: string;
  brand: string;
  model: string;
  summary: string;
  image: { src: string; alt: string };
};

/**
 * The range, a few machines at a time.
 *
 * Modelled on the "Main Series" strip from the manufacturer's own site, which
 * the client asked for: a set slides in from the right, holds, and the next set
 * follows. It replaces a grid of twelve category icons — with a catalogue this
 * size, most of those icons led to an empty category, and a machine with its
 * name and a line of copy sells the range in a way an icon for "Graders" does
 * not.
 *
 * PAGE SIZE IS MEASURED, NOT ASSUMED. Three across on a desktop and two on a
 * phone, as asked, which means the number of machines in a set is a property of
 * the viewport rather than of the data. `matchMedia` after mount rather than a
 * branch during render: branching on a client-only media query while rendering
 * desynchronises SSR, which this codebase has been bitten by before. The server
 * renders three; a phone corrects to two on hydration.
 *
 * WRAPPING IS NOT A REWIND. The last set advances to the first exactly as any
 * other advance does — in from the right — so the sequence reads as continuous
 * rather than snapping back to the beginning. That is the whole reason this
 * pages one set at a time instead of scrolling a long track.
 *
 * The order is set on the server: three from one brand, then three from the
 * next, so each set is coherent rather than a shuffle of everything.
 */
export function MachineReel({ items }: { items: ReelItem[] }) {
  /* Three is the server's assumption, so the markup a crawler sees is the
     desktop one; a phone drops to two immediately after mount. */
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPerPage(mq.matches ? 3 : 2);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const pages = Math.max(1, Math.ceil(items.length / perPage));

  /* Keep the current set in range when the page size changes under it — a
     rotation to landscape on the last set would otherwise land past the end. */
  useEffect(() => {
    setPage((p) => p % pages);
  }, [pages]);

  /* `page` is in the dependency list deliberately: it restarts the clock on a
     manual change, instead of letting the interval fire early on its original
     schedule. The same fix the other carousels on this page carry. */
  useEffect(() => {
    if (paused || reduceMotion || pages < 2) return;
    const id = window.setTimeout(() => setPage((p) => (p + 1) % pages), DWELL_MS);
    return () => window.clearTimeout(id);
  }, [page, paused, reduceMotion, pages]);

  if (items.length === 0) return null;

  const start = page * perPage;
  const visible = items.slice(start, start + perPage);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* `overflow-hidden` is what makes it slide IN rather than simply appear:
          the incoming set starts outside this box. */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.ul
            key={page}
            initial={{ opacity: 0, x: reduceMotion ? 0 : "7%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : "-5%" }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
            className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5"
          >
            {visible.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-full flex-col gap-3 rounded-[3px] border border-white/12 bg-white/[0.03] p-3.5",
                    "transition-colors duration-300 hover:border-amber-500/45 hover:bg-white/[0.07]",
                    /* Side by side only where the card is genuinely wide. At
                       three across on a 1024px screen each card is about 300px,
                       and splitting that gives a 130px machine beside a 130px
                       column of text — worse than stacking. */
                    "xl:flex-row xl:items-center xl:gap-4 xl:p-4",
                  )}
                >
                  <div className="relative aspect-[5/4] w-full shrink-0 xl:w-[44%]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1280px) 18vw, (min-width: 768px) 30vw, 45vw"
                      className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-amber-500">
                      {item.brand}
                    </p>
                    <h3 className="mt-1 font-display text-base font-bold uppercase leading-tight tracking-tight text-white sm:text-lg xl:text-xl">
                      {item.model}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-2.5 block h-px w-8 bg-white/25 transition-all duration-500 group-hover:w-12 group-hover:bg-amber-500"
                    />
                    <p className="mt-2.5 line-clamp-3 text-[0.75rem] leading-relaxed text-white/60 sm:text-[0.8125rem]">
                      {item.summary}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 font-display text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors group-hover:text-amber-500 sm:text-[0.6875rem]">
                      Learn more
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      {/* Segments rather than dots: they read as a strip of the range being
          worked through, which is what the sequence is. */}
      {pages > 1 ? (
        <ul className="mt-7 flex items-center gap-1.5" aria-label="Choose a set">
          {Array.from({ length: pages }, (_, i) => (
            <li key={i} className="flex-1">
              <button
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Set ${i + 1} of ${pages}`}
                aria-current={i === page}
                className={cn(
                  "h-0.5 w-full rounded-full transition-colors duration-300",
                  i === page ? "bg-amber-500" : "bg-white/20 hover:bg-white/45",
                )}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
