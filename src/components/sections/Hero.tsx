"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HERO_DWELL_MS,
  HERO_FADE_MS,
  heroSlides,
  type HeroSlide,
} from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The homepage hero: full-bleed artwork, and nothing on top of it.
 *
 * THE PHOTOGRAPH IS THE INTERFACE. These banners arrive with the lockup, the
 * headline and the tagline already set by a designer, so there is no HTML text
 * over them at all — no heading, no body, no buttons, no scrim behind type that
 * is not there. Everything this component adds is a thin indicator rail and a
 * scroll cue, both of which get out of the way.
 *
 * FOUR THINGS MOVE, AND ALL OF THEM ARE TRANSFORM OR OPACITY:
 *
 *  1. The opening reveal — the first slide fades up from `scale(1.035)` over
 *     1.4s. Slow enough to register as a settle rather than a zoom.
 *  2. A drift while a slide is held: `scale(1)` to `1.025` across the dwell.
 *     Depth, not animation; if you notice it, it is too much.
 *  3. The change itself. The outgoing slide is NOT unmounted before the
 *     incoming one arrives — both are in the DOM for the whole crossfade, so
 *     there is never a frame of empty hero. Incoming comes up from 1.025 and
 *     1.5% to the right, outgoing falls away to 1.015 and 1% left. Opacity
 *     carries it; the movement is there to stop it reading as a slideshow.
 *  4. The indicator fill, which is a scaleX tied to the same clock.
 *
 * The drift and the transition are on SEPARATE elements on purpose: both want
 * to write `scale`, and one animation would keep resetting the other.
 *
 * `will-change` is set only on the two slides actually moving. On all of them
 * it costs a compositor layer per banner for the entire life of the page.
 *
 * Under `prefers-reduced-motion` every scale and translation drops out and the
 * slides simply cross-fade.
 */
export function Hero({ slides = heroSlides }: { slides?: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const count = slides.length;
  const active = slides[index];
  const isFilm = Boolean(active?.video);

  const go = useCallback(
    (next: number) => {
      setIndex((current) => {
        if (next === current) return current;
        setPrevious(current);
        return ((next % count) + count) % count;
      });
    },
    [count],
  );

  /* The tab going away pauses it. Coming back does not restart the clock from
     where it left off — it simply resumes, which is what "do not aggressively
     reset the timer" asks for. */
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* A film runs to its own end; a still runs on the clock. `index` is in the
     dependency list so a manual jump restarts the dwell rather than inheriting
     the remainder of the last one. */
  useEffect(() => {
    if (paused || count < 2 || isFilm) return;
    const id = window.setTimeout(() => go(index + 1), HERO_DWELL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, count, isFilm, go]);

  /* The scroll cue is for the top of the page only. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Burki & Company equipment"
      className={cn(
        "relative w-full overflow-hidden bg-navy-950",
        /*
         * THE HEADER SITS ABOVE THIS, NOT OVER IT — and that is a decision the
         * artwork forced.
         *
         * A transparent nav floating on the banner was the plan, and it was
         * tried. It does not work with these particular assets. Every one of
         * them carries its OWN "Burki & Company" lockup in the top left, which
         * is exactly where the site header puts the same logo: two Burki marks
         * on top of each other, the header's blur smearing the artwork's. And
         * all three have pale sky behind the nav, so white nav type sat on
         * near-white cloud. A scrim would fix the type and ruin the lockup,
         * which is dark text on light.
         *
         * So the header keeps its ground and the banner keeps its composition
         * whole. `HeaderNav` still takes `overlay`, ready for artwork designed
         * with a clear, dark top band — pass it from the page and pull this
         * section up by the header's height.
         *
         * The heights subtract the header so that header plus hero comes to
         * about 90vh: the fold still lands inside the photograph.
         */
        /*
         * THE PHONE HEIGHT IS SET BY THE ARTWORK, NOT BY TASTE.
         *
         * How much of a banner's WIDTH a full-bleed hero shows is decided by
         * its HEIGHT: `cover` on a 1.9:1 banner in a 390x594 window keeps a
         * 35% strip, and the type block on these runs to about 55%. At 78svh
         * that cut "PERFORMANCE" mid-letter no matter where the crop was
         * anchored — there is no anchor that makes a strip wider than itself.
         * Shortening the hero widens the strip: 66svh keeps roughly 41%, which
         * clears the headline and the tagline on all three.
         *
         * So this is deliberately short of the 70-82svh a hero would otherwise
         * want. The proper fix is a portrait export of each banner — set
         * `mobileImage` in hero-slides.ts and the phone stops cropping — at
         * which point this can go back up.
         */
        "h-[calc(66svh-64px)] min-h-[380px]",
        "md:h-[calc(90vh-116px)] md:max-h-[880px] md:min-h-[600px]",
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const isActive = i === index;
        const isLeaving = i === previous && i !== index;
        if (!isActive && !isLeaving) {
          /* Everything else stays mounted but is not painted, so the browser
             is not compositing four full-bleed layers at once. */
          return (
            <div key={slide.id} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
              <SlideMedia slide={slide} priority={i === 0} eager={false} />
            </div>
          );
        }

        return (
          <motion.div
            key={slide.id}
            aria-hidden={!isActive}
            className="absolute inset-0"
            style={{ willChange: "transform, opacity", zIndex: isActive ? 2 : 1 }}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : /* The very first paint uses the opening reveal; every later
                     arrival comes in from the right. */
                  previous === null
                  ? { opacity: 0, scale: 1.035, x: 0 }
                  : { opacity: 0, scale: 1.025, x: "1.5%" }
            }
            animate={
              isActive
                ? { opacity: 1, scale: 1, x: 0 }
                : reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.015, x: "-1%" }
            }
            transition={{
              duration: reduceMotion
                ? 0.35
                : previous === null && isActive
                  ? 1.4
                  : HERO_FADE_MS / 1000,
              ease: EASE,
            }}
            onAnimationComplete={() => {
              if (isLeaving) setPrevious(null);
            }}
          >
            {/* The drift lives on its own element so it is not fighting the
                transition for the transform. */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: isActive && !reduceMotion ? 1.025 : 1 }}
              transition={{ duration: isActive ? 8.5 : 0, ease: "linear" }}
            >
              <SlideMedia
                slide={slide}
                priority={i === 0}
                eager={isActive}
                videoRef={isActive && slide.video ? videoRef : undefined}
                onEnded={isActive && slide.video ? () => go(index + 1) : undefined}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* ------------------------------------------------------- indicators
       *
       * Numbered rules rather than dots or arrows: they say how many banners
       * there are and how far through the current one you are, and they sit at
       * the foot of the frame instead of over the machinery. The active rule
       * fills across the dwell, so the carousel tells you it is about to move
       * rather than just moving.
       */}
      {count > 1 ? (
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto flex w-full max-w-[1400px] items-end justify-between gap-6 px-5 pb-6 sm:px-8 md:pb-8 lg:px-12">
            <ul className="flex flex-1 items-center gap-4 md:gap-6" aria-label="Choose a banner">
              {slides.map((slide, i) => (
                <li key={slide.id} className="flex max-w-[7rem] flex-1 items-center gap-2 md:max-w-[9rem] md:gap-3">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show banner ${i + 1} of ${count}`}
                    aria-current={i === index}
                    className="group flex w-full items-center gap-2 py-3 md:gap-3"
                  >
                    <span
                      className={cn(
                        "font-display text-[0.625rem] font-semibold tabular-nums tracking-[0.12em] transition-colors duration-500 md:text-[0.6875rem]",
                        i === index ? "text-white" : "text-white/45 group-hover:text-white/75",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative h-px flex-1 overflow-hidden bg-white/25">
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 origin-left bg-amber-500"
                        initial={false}
                        animate={{ scaleX: i === index ? 1 : 0 }}
                        transition={
                          i === index
                            ? {
                                duration: paused || slide.video ? 0.5 : HERO_DWELL_MS / 1000,
                                ease: "linear",
                              }
                            : { duration: 0.3 }
                        }
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* --------------------------------------------------- scroll cue
             *
             * Desktop only, and it leaves as soon as the visitor starts. A cue
             * that is still there once you have scrolled is decoration. */}
            <div
              aria-hidden="true"
              className={cn(
                "hidden shrink-0 flex-col items-center gap-2 pb-2 transition-opacity duration-500 lg:flex",
                scrolled ? "opacity-0" : "opacity-100",
              )}
            >
              <span className="font-display text-[0.5625rem] font-semibold uppercase tracking-[0.24em] text-white/55">
                Scroll
              </span>
              <span className="relative block h-9 w-px overflow-hidden bg-white/20">
                <motion.span
                  className="absolute inset-x-0 top-0 h-3 bg-white/70"
                  animate={reduceMotion ? {} : { y: ["-100%", "300%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/**
 * One slide's media.
 *
 * `object-position` is a CSS variable per breakpoint rather than an inline
 * value, because it has to change at `md` and `lg` and an inline style cannot
 * hold a media query. A phone-composed asset, where one exists, replaces the
 * cropping entirely.
 */
function SlideMedia({
  slide,
  priority,
  eager,
  videoRef,
  onEnded,
}: {
  slide: HeroSlide;
  priority: boolean;
  eager: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  onEnded?: () => void;
}) {
  const position = {
    "--pos-mobile": slide.position?.mobile ?? "center",
    "--pos-tablet": slide.position?.tablet ?? slide.position?.desktop ?? "center",
    "--pos-desktop": slide.position?.desktop ?? "center",
  } as React.CSSProperties;

  const objectPosition =
    "[object-position:var(--pos-mobile)] md:[object-position:var(--pos-tablet)] lg:[object-position:var(--pos-desktop)]";

  if (slide.video) {
    return (
      <>
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          fill
          priority={priority}
          sizes="100vw"
          quality={90}
          style={position}
          className={cn("object-cover", objectPosition)}
        />
        {/* Sits over its own poster, so the frame is never black while the
            first video frame decodes. */}
        <video
          ref={videoRef}
          src={slide.video.src}
          poster={slide.image.src}
          autoPlay={eager}
          muted
          playsInline
          preload={eager ? "auto" : "none"}
          onEnded={onEnded}
          aria-label={slide.image.alt}
          style={position}
          className={cn("absolute inset-0 h-full w-full object-cover", objectPosition)}
        />
      </>
    );
  }

  return (
    <>
      {slide.mobileImage ? (
        <>
          <Image
            src={slide.mobileImage.src}
            alt={slide.mobileImage.alt}
            fill
            priority={priority}
            sizes="100vw"
            quality={90}
            className="object-cover md:hidden"
          />
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            priority={priority}
            sizes="100vw"
            quality={90}
            style={position}
            className={cn("hidden object-cover md:block", objectPosition)}
          />
        </>
      ) : (
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          fill
          priority={priority}
          sizes="100vw"
          quality={90}
          style={position}
          className={cn("object-cover", objectPosition)}
        />
      )}
    </>
  );
}
