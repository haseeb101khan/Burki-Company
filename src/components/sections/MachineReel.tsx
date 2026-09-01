"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
/** How long a set holds before the next slides in. The client's number. */
const DWELL_MS = 4000;
const SLIDE_MS = 0.62;

export type ReelItem = {
  slug: string;
  href: string;
  brand: string;
  model: string;
  summary: string;
  image: { src: string; alt: string };
};

const chunk = <T,>(list: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
};

/**
 * The range, a few machines at a time.
 *
 * IT ACTUALLY SLIDES. The first version cross-faded one set out and the next
 * in, which reads as a switch rather than as movement. This is a single track
 * carrying every set side by side, translated one set-width at a time: the
 * outgoing machines leave to the left while the incoming ones arrive from the
 * right, in one motion, because they are the same motion.
 *
 * THE WRAP GOES THE SAME WAY. The track carries a COPY of the first set on the
 * end. Reaching it slides left like every other advance; the moment that
 * settles, the track jumps back to the real first set with the animation
 * switched off — invisible, because the two are identical. Without the copy the
 * loop would have to travel backwards through every set to start again, which
 * is the one direction this is not supposed to move in.
 *
 * NO BOXES. The machines are cutouts on transparency and they sit directly on
 * the section, shadow and all. That is the entire point of cutting them out; a
 * bordered card around each one puts the box straight back and flattens the
 * thing the cutout was made to give.
 *
 * PAGE SIZE IS MEASURED, NOT ASSUMED. Three across on a desktop and two on a
 * phone, so the size of a set is a property of the viewport rather than of the
 * data. `matchMedia` after mount, never a branch during render: branching on a
 * client-only media query while rendering desynchronises SSR, which this
 * codebase has been caught by before.
 */
export function MachineReel({ items }: { items: ReelItem[] }) {
  /* Three is the server's assumption, so the markup a crawler sees is the
     desktop one; a phone drops to two immediately after mount. */
  const [perPage, setPerPage] = useState(3);
  const [index, setIndex] = useState(0);
  /** Set while the track snaps from the trailing copy back to the real first
      set, so that one move happens with no animation. */
  const [snapping, setSnapping] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPerPage(mq.matches ? 3 : 2);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const pages = useMemo(() => chunk(items, perPage), [items, perPage]);
  const looping = pages.length > 1;
  /* The trailing copy only earns its place when there is something to loop. */
  const track = looping ? [...pages, pages[0]] : pages;

  /* Keep the position in range when the page size changes under it — a rotation
     to landscape on the last set would otherwise leave the track off the end. */
  useEffect(() => {
    setSnapping(true);
    setIndex(0);
  }, [perPage]);

  /* `index` is in the dependency list deliberately: it restarts the clock on a
     manual change instead of letting the timer fire early on its original
     schedule. The same fix the other carousels on this page carry. */
  useEffect(() => {
    if (paused || reduceMotion || !looping) return;
    const id = window.setTimeout(() => {
      setSnapping(false);
      setIndex((i) => i + 1);
    }, DWELL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduceMotion, looping]);

  if (items.length === 0) return null;

  const active = index % pages.length;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* The window the track runs behind. */}
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${index * 100}%` }}
          transition={
            snapping || reduceMotion
              ? { duration: 0 }
              : { duration: SLIDE_MS, ease: EASE }
          }
          onAnimationComplete={() => {
            /* Landed on the trailing copy: step back onto the real first set
               without animating. Identical content, so nothing is seen. */
            if (looping && index === pages.length) {
              setSnapping(true);
              setIndex(0);
            }
          }}
        >
          {track.map((page, pageIndex) => (
            <ul
              key={pageIndex}
              /* `aria-hidden` on the trailing copy: it is the same three
                 machines again and a screen reader should not read them twice. */
              aria-hidden={looping && pageIndex === pages.length ? true : undefined}
              className="grid w-full shrink-0 grid-cols-2 gap-x-5 gap-y-9 px-px md:grid-cols-3 md:gap-x-10"
            >
              {page.map((item) => (
                <li key={`${pageIndex}-${item.slug}`}>
                  <Link
                    href={item.href}
                    tabIndex={looping && pageIndex === pages.length ? -1 : undefined}
                    className="group block"
                  >
                    {/* The machine stands on the page, not in a box. The shadow
                        under it is what gives a flat cutout its ground. */}
                    <div className="relative aspect-[5/4] w-full">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 768px) 30vw, 45vw"
                        className={cn(
                          "object-contain object-bottom",
                          "drop-shadow-[0_16px_14px_rgba(0,17,46,0.16)]",
                          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          "group-hover:-translate-y-1.5 group-hover:scale-[1.02]",
                        )}
                      />
                    </div>

                    <p className="mt-5 font-display text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-amber-600 sm:text-[0.6875rem]">
                      {item.brand}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-bold uppercase leading-tight tracking-tight text-navy-800 sm:text-2xl md:text-3xl">
                      {item.model}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-[2px] w-9 bg-amber-500 transition-all duration-500 group-hover:w-14"
                    />
                    <p className="mt-3.5 line-clamp-3 text-[0.8125rem] leading-relaxed text-steel-600 sm:text-sm">
                      {item.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-navy-700 transition-colors group-hover:text-amber-600 sm:text-[0.75rem]">
                      Learn more
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </motion.div>
      </div>

      {/* Segments rather than dots: they read as a strip of the range being
          worked through, which is what the sequence is. */}
      {looping ? (
        <ul className="mt-10 flex items-center gap-1.5" aria-label="Choose a set">
          {pages.map((_, i) => (
            <li key={i} className="flex-1">
              <button
                type="button"
                onClick={() => {
                  setSnapping(false);
                  setIndex(i);
                }}
                aria-label={`Set ${i + 1} of ${pages.length}`}
                aria-current={i === active}
                className={cn(
                  "h-0.5 w-full rounded-full transition-colors duration-300",
                  i === active ? "bg-amber-500" : "bg-steel-200 hover:bg-steel-400",
                )}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
