"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Button } from "@/components/ui/Button";
import { ChevronRightIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import type { Banner } from "@/lib/data";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 10000;

const ARROW =
  "flex h-11 w-11 items-center justify-center rounded-[3px] border border-white/25 " +
  "bg-navy-950/30 text-white backdrop-blur-sm transition-all duration-300 " +
  "hover:border-amber-500 hover:bg-amber-500 hover:text-navy-900";

/**
 * Featured equipment banners.
 *
 * Each slide is a real machine from the data layer and links straight to its
 * detail page, so the banner is a route into the catalogue rather than
 * decoration. Auto-advances, pauses on hover and focus, and stops advancing
 * entirely for anyone who prefers reduced motion.
 */
export function FeaturedCarousel({ slides }: { slides: Banner[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = slides.length;

  const [filmRunning, setFilmRunning] = useState(false);

  /*
   * Every route out of a slide goes through here — arrow, dot, or the film
   * ending — so this is the one place that hands timing back to the clock.
   *
   * Done in the setter rather than an effect watching `index`: reacting to a
   * state change with another state change is a render the component does not
   * need, and React rightly complains about it.
   */
  const go = useCallback(
    (next: number) => {
      setFilmRunning(false);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  /*
   * A film slide sets its own pace: the carousel waits for `ended` rather than
   * cutting the clip off at the ten second mark.
   *
   * `filmRunning` is what suspends the interval, and it is only true once the
   * video has ACTUALLY STARTED. Autoplay is refused often enough — data saver,
   * a battery-saving mode, some mobile browsers — that keying off "this slide
   * has a video" would leave the carousel stuck forever on a still frame in
   * exactly those cases. The clock only stops once playback is real.
   */
  /* `index` is in the dependency array on purpose: a manual click or arrow
     press changes `index`, which tears down this interval and starts a fresh
     one. Without it, the timer keeps running on its original schedule, so a
     slide picked mid-cycle only gets whatever time was left rather than a
     full turn — the bug where the next slide vanished almost immediately. */
  useEffect(() => {
    if (reduceMotion || count < 2 || filmRunning) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, count, index, filmRunning]);

  if (count === 0) return null;
  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured equipment"
      className="relative overflow-hidden bg-navy-900"
    >
      <div className="relative min-h-[72svh] md:min-h-[78svh]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Slow push-in over the slide's dwell time. Barely perceptible
                frame to frame, but it stops the banner feeling like a static
                photo behind text. */}
            {/* The slow push-in exists to stop a still photograph feeling
                static. A film is already moving, so it is left alone. */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: slide.video ? 1 : 1.03 }}
              transition={{ duration: INTERVAL_MS / 1000 + 2, ease: "linear" }}
            >
              {/*
               * Every slide is eager, not just the first.
               *
               * With only the opening frame prioritised the rest stayed lazy,
               * and the carousel cross-faded to an image the browser had not
               * finished decoding — a blank panel for a beat, which is exactly
               * the "images not showing" the client reported. There are a
               * handful of slides and they are all certain to be seen, so
               * there is nothing to defer.
               */}
              {slide.video ? (
                /* Poster is the still from the same slide, so the banner shows
                   the right frame before a byte of video has decoded. */
                <video
                  key={slide.video.src}
                  src={slide.video.src}
                  poster={slide.image.src}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  aria-label={slide.image.alt}
                  onPlaying={() => setFilmRunning(true)}
                  onEnded={() => go(index + 1)}
                  /* If the browser refuses to start it, fall back to the clock
                     rather than parking the carousel on a frozen frame. */
                  onError={() => setFilmRunning(false)}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  priority={index === 0}
                  loading="eager"
                  sizes="100vw"
                  className="object-cover object-center"
                />
              )}
            </motion.div>
            {/* Readability scrim, kept tight to the text column so the
                photograph stays legible. The previous version ran to 92% across
                the left and a second wash over the whole frame, which buried
                the client's own premises and yard shots. */}
            {/* Phones: the copy spans the full width, so the scrim has to come
                up from the base rather than in from the left. A film's copy is
                at the top, so its scrim comes down from there instead. */}
            <div
              className={cn(
                "absolute inset-0 md:hidden",
                slide.video
                  ? "bg-[linear-gradient(to_bottom,rgba(0,10,28,0.88)_0%,rgba(0,10,28,0.5)_34%,rgba(0,10,28,0.12)_62%,rgba(0,10,28,0)_100%)]"
                  : "bg-[linear-gradient(to_top,rgba(0,10,28,0.92)_0%,rgba(0,10,28,0.74)_42%,rgba(0,10,28,0.44)_72%,rgba(0,10,28,0.28)_100%)]",
              )}
            />
            {/* Wider screens: tight to the text column, so most of the frame
                stays clear. The film's runs from the top-left corner, which is
                where its copy sits and where the footage is emptiest. */}
            <div
              className={cn(
                "absolute inset-0 hidden md:block",
                slide.video
                  ? "bg-[linear-gradient(to_bottom_right,rgba(0,10,28,0.85)_0%,rgba(0,10,28,0.45)_28%,rgba(0,10,28,0.1)_52%,rgba(0,10,28,0)_72%)]"
                  : "bg-[linear-gradient(to_right,rgba(0,10,28,0.82)_0%,rgba(0,10,28,0.52)_32%,rgba(0,10,28,0.14)_60%,rgba(0,10,28,0)_82%)]",
              )}
            />
            {/* Only the base, so the dots and arrows keep their contrast. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-navy-950/70 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content sits in normal flow so the section height follows the copy. */}
        <Container
          className={cn(
            "relative flex min-h-[72svh] flex-col py-20 md:min-h-[78svh] md:py-24 lg:pl-20 lg:pr-20",
            /* A film carries its own composition — and this one closes on a
               centred logo. Its copy splits to the top and its actions to the
               base, leaving the middle of the frame to the film. */
            slide.video ? "pt-8 md:pt-10" : "justify-center",
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              className={cn(
                slide.video
                  ? "flex w-full flex-1 flex-col justify-between"
                  : "max-w-3xl",
              )}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={cn(slide.video && "max-w-2xl")}>
                <p className="eyebrow-rule font-display text-eyebrow uppercase text-amber-500">
                  {slide.eyebrow}
                </p>

                <h1
                  className={cn(
                    "mt-5 uppercase text-white [text-shadow:0_2px_18px_rgba(0,10,28,0.55)]",
                    /* The film has to share the frame with its own titling, so
                     its headline is set two steps down from a still's. */
                    slide.video ? "text-display-md" : "text-display-xl",
                  )}
                >
                  {slide.title}
                </h1>

                {slide.video && slide.meta ? (
                  <p className="mt-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-white/75 [text-shadow:0_1px_10px_rgba(0,10,28,0.65)]">
                    {slide.meta}
                  </p>
                ) : null}
              </div>

              <div
                className={cn(
                  "flex flex-col gap-3 sm:flex-row sm:items-center",
                  slide.video ? "mt-10" : "mt-8",
                )}
              >
                <Button href={slide.primary.href} size="lg">
                  {slide.primary.label}
                  <ArrowRight />
                </Button>
                <Button
                  href={slide.secondary.href}
                  size="lg"
                  variant="outlineLight"
                >
                  {slide.secondary.label}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </Container>

        {/* Side arrows from md up. On phones the copy runs the full width, so
            they would overlap it — those keep the bottom pair instead. */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous banner"
          className={cn(
            ARROW,
            "absolute left-5 top-1/2 hidden -translate-y-1/2 lg:flex",
          )}
        >
          <ChevronRightIcon className="rotate-180 text-lg" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next banner"
          className={cn(
            ARROW,
            "absolute right-5 top-1/2 hidden -translate-y-1/2 lg:flex",
          )}
        >
          <ChevronRightIcon className="text-lg" />
        </button>

        {/* ------------------------------------------------------- controls */}
        <Container className="pointer-events-none absolute inset-x-0 bottom-0 pb-7 md:pb-9">
          <div className="pointer-events-auto flex items-center justify-between gap-6 border-t border-white/15 pt-5">
            <ul className="flex items-center gap-2.5" aria-label="Choose slide">
              {slides.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show ${s.title}`}
                    aria-current={i === index}
                    className={cn(
                      "relative block h-1 overflow-hidden rounded-full transition-all duration-500",
                      i === index
                        ? "w-10 bg-white/25"
                        : "w-5 bg-white/25 hover:bg-white/50",
                    )}
                  >
                    {i === index ? (
                      <span
                        key={index}
                        className="absolute inset-0 origin-left bg-amber-500"
                        style={{
                          animation: `dot-fill ${INTERVAL_MS}ms linear forwards`,
                        }}
                      />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <span className="mr-2 hidden font-display text-[0.75rem] font-semibold tabular-nums tracking-[0.14em] text-white/50 sm:block">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous banner"
                className={cn(ARROW, "lg:hidden")}
              >
                <ChevronRightIcon className="rotate-180 text-lg" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next banner"
                className={cn(ARROW, "lg:hidden")}
              >
                <ChevronRightIcon className="text-lg" />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
