"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Button } from "@/components/ui/Button";
import { ChevronRightIcon } from "@/components/ui/Icons";
import type { Equipment } from "@/lib/data";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

const INTERVAL_MS = 20000;

const ARROW =
  "flex h-11 w-11 items-center justify-center rounded-full border border-steel-300 bg-white " +
  "text-navy-800 shadow-[0_6px_18px_-10px_rgba(0,17,46,0.5)] transition-all duration-300 " +
  "hover:border-amber-500 hover:bg-amber-500 hover:text-navy-900";

/**
 * Featured ("hot") machines.
 *
 * Photograph left, detail panel right. Hovering the photograph reveals a second
 * frame of the same machine where one exists.
 *
 * Photography is expected to be a clean studio shot on a plain white ground
 * (that is what gives it the floating, premium look this layout is built
 * around) — no fade or vignette is applied over it. A machine still shot
 * on-site rather than in studio will show its real background plainly; get a
 * white-background photo for it before featuring it here.
 */
export function FeaturedProducts({ items }: { items: Equipment[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = items.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  /* `index` is a dependency on purpose — see FeaturedCarousel for why: it
     restarts the clock on every manual change instead of letting the timer
     run on its original schedule. */
  useEffect(() => {
    if (reduceMotion || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, count, index]);

  if (count === 0) return null;
  const item = items[index];
  const specs = item.highlights.slice(0, 3);
  const photo = item.featuredImage ?? item.image;
  const photoHover = item.featuredHoverImage;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[3px] border border-steel-200 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
          >
            {/* ------------------------------------------------ photograph */}
            <div className="group relative aspect-[4/3] bg-white sm:aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className={cn(
                  "object-cover transition-opacity duration-500",
                  photoHover && "group-hover:opacity-0",
                )}
              />
              {photoHover ? (
                <Image
                  src={photoHover.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              ) : null}

              <span className="absolute left-0 top-5 z-10 bg-amber-500 px-3 py-1 font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-navy-900">
                Hot
              </span>

              {photoHover ? (
                <span className="pointer-events-none absolute bottom-4 right-5 z-10 font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-steel-400 transition-opacity duration-300 group-hover:opacity-0">
                  Hover for another view
                </span>
              ) : null}
            </div>

            {/* --------------------------------------------------- details */}
            <div className="flex flex-col justify-center border-t border-steel-200 bg-steel-50 p-7 md:p-10 lg:border-l lg:border-t-0">
              <p className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-amber-600">
                {item.brand}
              </p>

              <h3 className="mt-2.5 text-display-sm uppercase leading-none text-navy-800">
                {item.model}
              </h3>

              {item.tagline ? (
                <p className="mt-2 font-display text-base font-semibold uppercase tracking-[0.08em] text-steel-500">
                  {item.tagline}
                </p>
              ) : null}

              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-steel-600">
                {item.summary}
              </p>

              <dl className="mt-6 space-y-2 border-t border-steel-200 pt-5">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-6">
                    <dt className="text-[0.8125rem] text-steel-500">{spec.label}</dt>
                    <dd className="font-display text-[0.9375rem] font-semibold tabular-nums text-navy-800">
                      {spec.value}
                      {spec.unit ? (
                        <span className="ml-1 text-[0.8125rem] font-medium text-steel-500">
                          {spec.unit}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/request-a-quote" size="md">
                  Inquire
                  <ArrowRight />
                </Button>
                <Button
                  href={routes.equipmentItem(item)}
                  size="md"
                  variant="outline"
                >
                  View More
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --------------------------------------------------------- controls */}
      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous machine"
            className={cn(ARROW, "absolute -left-3 top-1/2 hidden -translate-y-1/2 xl:flex")}
          >
            <ChevronRightIcon className="rotate-180 text-lg" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next machine"
            className={cn(ARROW, "absolute -right-3 top-1/2 hidden -translate-y-1/2 xl:flex")}
          >
            <ChevronRightIcon className="text-lg" />
          </button>

          <div className="mt-5 flex items-center justify-between gap-6">
            <ul className="flex items-center gap-2.5" aria-label="Choose machine">
              {items.map((m, i) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={m.model}
                    aria-current={i === index}
                    className={cn(
                      "relative block h-1 overflow-hidden rounded-full transition-all duration-500",
                      i === index ? "w-10 bg-steel-200" : "w-5 bg-steel-200 hover:bg-steel-300",
                    )}
                  >
                    {i === index ? (
                      <span
                        key={index}
                        className="absolute inset-0 origin-left bg-amber-500"
                        style={{ animation: `dot-fill ${INTERVAL_MS}ms linear forwards` }}
                      />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous machine"
                className={ARROW}
              >
                <ChevronRightIcon className="rotate-180 text-lg" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next machine"
                className={ARROW}
              >
                <ChevronRightIcon className="text-lg" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
