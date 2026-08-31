"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Button } from "@/components/ui/Button";
import { ChevronRightIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export type IntroCard = {
  id: string;
  title: string;
  body: string;
  /** Only the founder card carries a portrait. */
  portrait?: { src: string; alt: string; name: string; role: string };
};

const INTERVAL_MS = 5000;

/**
 * Company introduction, rotating on a five-second cycle with manual controls.
 *
 * The card area holds a minimum height so the block does not resize as cards
 * change — the founder card is taller than the others and the jump would be
 * obvious against a solid colour field.
 */
export function AboutIntroCards({
  cards,
  aside,
}: {
  cards: IntroCard[];
  /**
   * The picture in the right-hand column.
   *
   * This column held the brand film. When that came out the grid was left with
   * one child and a `lg:grid-cols-2` shape, so on a desktop the copy sat in the
   * left half and the right half was simply empty navy — which reads as a
   * section that failed to load rather than one that is deliberately spare.
   */
  aside?: { src: string; alt: string };
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = cards.length;

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
  const card = cards[index];

  return (
    <section className="navy-depth bg-navy-800 text-white">
      <Container className="py-16 md:py-22">
        <div
          className={cn(
            "grid gap-10 lg:gap-16",
            aside && "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)]",
          )}
        >
          {/* --------------------------------------------------- rotating copy */}
          <div>
            <p className="eyebrow-rule font-display text-eyebrow uppercase text-amber-500">
              Burki &amp; Company
            </p>

            {/* Holds the tallest card's height so the block does not resize as
                cards change. Raised with the portrait — the founder card is the
                tall one, and against a solid colour field the jump shows. */}
            <div className="mt-6 min-h-[340px] sm:min-h-[248px]">
              <AnimatePresence mode="wait">
                <motion.article
                  key={card.id}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="text-display-sm uppercase text-white">
                    {card.title}
                  </h2>

                  <div className="mt-5 flex gap-4 sm:gap-6">
                    {card.portrait ? (
                      <figure className="w-[104px] shrink-0 sm:w-[132px]">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[3px] border border-white/20 bg-navy-900">
                          <Image
                            src={card.portrait.src}
                            alt={card.portrait.alt}
                            fill
                            sizes="(min-width: 640px) 132px, 104px"
                            /* The portrait is a cutout on transparency, so the
                               box's navy is what stands behind him — `contain`
                               keeps the whole figure rather than cropping a
                               head-and-shoulders out of a standing shot. */
                            className="object-contain object-bottom"
                          />
                        </div>
                        <figcaption className="mt-2 font-display text-[0.6875rem] font-semibold uppercase leading-tight tracking-[0.1em] text-white/50 sm:text-[0.75rem]">
                          {card.portrait.role}
                        </figcaption>
                      </figure>
                    ) : null}

                    <div>
                      <p className="max-w-xl text-[0.9375rem] leading-relaxed text-white/70 md:text-base">
                        {card.body}
                      </p>
                      {card.portrait ? (
                        <p className="mt-3.5 font-display text-base font-bold uppercase tracking-[0.06em] text-white sm:text-lg md:text-xl">
                          {card.portrait.name}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* ------------------------------------------------------ controls */}
            <div className="mt-8 flex items-center justify-between gap-6 border-t border-white/15 pt-6">
              <ul className="flex items-center gap-2.5">
                {cards.map((c, i) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={c.title}
                      aria-current={i === index}
                      className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        i === index ? "w-10 bg-amber-500" : "w-5 bg-white/30 hover:bg-white/60",
                      )}
                    />
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-white/25 text-white transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-navy-900"
                >
                  <ChevronRightIcon className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next"
                  className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-white/25 text-white transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-navy-900"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>

            <div className="mt-8">
              <Button href="/about" size="lg">
                Explore more
                <ArrowRight />
              </Button>
            </div>
          </div>

          {/* ------------------------------------------------------- the aside
           *
           * Stretched to the row on a desktop, so the picture ends level with
           * the button rather than floating at the top of an over-tall column.
           * A fixed ratio on smaller screens, where it sits under the copy and
           * has no row height to match.
           */}
          {aside ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] border border-white/15 bg-navy-900 sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]">
              <Image
                src={aside.src}
                alt={aside.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
