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
  video,
}: {
  cards: IntroCard[];
  video: { src: string | null; poster: string };
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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          {/* --------------------------------------------------- rotating copy */}
          <div>
            <p className="eyebrow-rule font-display text-eyebrow uppercase text-amber-500">
              Burki &amp; Company
            </p>

            <div className="mt-6 min-h-[290px] sm:min-h-[196px]">
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

                  <div className="mt-5 flex gap-5">
                    {card.portrait ? (
                      <figure className="shrink-0">
                        <div className="relative h-[104px] w-[84px] overflow-hidden rounded-[3px] border border-white/20 bg-navy-900">
                          <Image
                            src={card.portrait.src}
                            alt={card.portrait.alt}
                            fill
                            sizes="84px"
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="mt-2 w-[84px] font-display text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.1em] text-white/50">
                          {card.portrait.role}
                        </figcaption>
                      </figure>
                    ) : null}

                    <div>
                      <p className="max-w-xl text-[0.9375rem] leading-relaxed text-white/70 md:text-base">
                        {card.body}
                      </p>
                      {card.portrait ? (
                        <p className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.08em] text-white">
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

          {/* -------------------------------------------------------- video */}
          <div>
            <div className="relative aspect-video overflow-hidden rounded-[3px] border border-white/15 bg-navy-900">
              {video.src ? (
                <video
                  controls
                  preload="metadata"
                  poster={video.poster}
                  className="h-full w-full object-cover"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
              ) : (
                <>
                  <Image
                    src={video.poster}
                    alt="Burki &amp; Company introduction"
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover opacity-55"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-navy-950/40 backdrop-blur-sm">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-6 w-6 translate-x-[2px] fill-white"
                      >
                        <path d="M8 5.5v13l11-6.5-11-6.5z" />
                      </svg>
                    </span>
                  </div>
                </>
              )}
            </div>
            <p className="mt-3 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/45">
              Company introduction
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
