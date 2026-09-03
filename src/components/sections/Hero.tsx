"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Button } from "@/components/ui/Button";
import { ChevronRightIcon } from "@/components/ui/Icons";
import {
  HERO_DWELL_MS,
  HERO_SLIDE_MS,
  heroSlides,
  type HeroSlide,
} from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Used for the indicator's fill animation before the film's real length is
    known from its own metadata. */
const FILM_FALLBACK_S = 8;

const ARROW =
  "flex h-9 w-9 items-center justify-center rounded-[3px] border border-white/25 " +
  "bg-navy-950/40 text-white backdrop-blur-sm transition-all duration-300 " +
  "hover:border-amber-500 hover:bg-amber-500 hover:text-navy-900 md:h-11 md:w-11";

/**
 * The homepage hero: the banner artwork, and (almost) nothing on top of it.
 *
 * THE PICTURE IS THE INTERFACE. These banners arrive with the lockup, the
 * headline and the tagline already set by a designer, so none of that is
 * redrawn in HTML. The one deliberate exception is the pair of buttons under
 * the frame — "View {brand} Full Range" and "Request a Quote" — which the
 * client asked to have back. They sit in a bar BELOW the picture, in normal
 * document flow, not on top of it: the photograph still carries no scrim, no
 * heading, nothing written across it.
 *
 * AND BECAUSE THE TYPE IS PART OF THE PICTURE, WHERE THE CROP FALLS IS THE
 * WHOLE DESIGN. This took three goes on desktop before it filled the frame
 * without cutting the lockup or leaving margins — see the note on the
 * container below and the longer one in hero-slides.ts. The phone frame is a
 * separate decision again: it uses a wide strip and contains the real artwork
 * so the baked-in text survives.
 *
 * WHAT MOVES, AND ALL OF IT IS TRANSFORM OR OPACITY:
 *
 *  1. The opening reveal — the first slide fades up from `scale(1.035)` over
 *     1.4s. Slow enough to register as a settle rather than a zoom.
 *  2. The change itself. The outgoing slide is NOT unmounted before the
 *     incoming one arrives — both are in the DOM for the whole horizontal
 *     travel, so there is never a frame of empty hero. The motion now reads
 *     as a real banner slider rather than a fade-in slideshow.
 *  3. A very small drift while a slide is held.
 *  4. The indicator fill, tied to the same clock — except on the film, which
 *     runs to its own end; see the note on the dwell effect below.
 *
 * `will-change` is set only on the two slides actually moving. On all of them
 * it costs a compositor layer per banner for the entire life of the page.
 *
 * Under `prefers-reduced-motion` every scale and translation drops out and the
 * slides simply fade.
 */
export function Hero({ slides = heroSlides }: { slides?: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filmRunning, setFilmRunning] = useState(false);
  const [filmDuration, setFilmDuration] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const count = slides.length;
  const active = slides[index];
  const isFilm = Boolean(active?.video);

  const go = useCallback(
    (next: number) => {
      setIndex((current) => {
        const wrapped = ((next % count) + count) % count;
        if (wrapped === current) return current;
        setDirection(next > current ? 1 : -1);
        setPrevious(current);
        setFilmRunning(false);
        setFilmDuration(null);
        return wrapped;
      });
    },
    [count],
  );

  /* A hidden tab pauses it, and coming back resumes rather than restarting the
     clock. This is the ONLY pause: it is not a stop the visitor can see, and
     running an off-screen carousel only costs battery. */
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /*
   * STILLS RUN ON THE DWELL CLOCK. THE FILM RUNS TO ITS OWN END.
   *
   * The film's own `onEnded` (on its <video>, in SlideMedia) is what advances
   * it — this effect steps aside once `filmRunning` is true. That flag is only
   * set once the clip has ACTUALLY started (`onPlaying`), not just because the
   * active slide happens to have one: autoplay is refused often enough — data
   * saver, a battery mode, some mobile browsers — that keying off "this slide
   * is a film" would leave the carousel parked on a frozen frame forever in
   * exactly those cases. Until it is confirmed playing, the ordinary dwell
   * clock is still live underneath it as a fallback.
   *
   * `index` is in the dependency list so a manual jump restarts the dwell
   * rather than inheriting whatever was left of the last one.
   */
  useEffect(() => {
    if (paused || count < 2 || (isFilm && filmRunning)) return;
    const id = window.setTimeout(() => go(index + 1), HERO_DWELL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, count, isFilm, filmRunning, go]);

  /* The scroll cue is for the top of the page only. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (count === 0) return null;
  const activeSlide = slides[index];

  return (
    <>
      <section
        aria-roledescription="carousel"
        aria-label="Burki & Company equipment"
        /*
         * NO POINTER PAUSE. Hovering used to hold the banner, which on a wide
         * screen meant the carousel simply stopped for anyone whose cursor
         * happened to be resting over it. Nothing sits longer than the dwell,
         * bar the film running to its own end.
         */
        className={cn(
          "relative w-full overflow-hidden bg-navy-950",
          /*
           * THE HEADER SITS ABOVE THIS, NOT OVER IT — and that is a decision
           * the artwork forced.
           *
           * A transparent nav floating on the banner was the plan, and it was
           * built. It does not work with these particular assets. Every one
           * of them carries its OWN "Burki & Company" lockup in the top left,
           * exactly where the site header puts the same logo: two Burki marks
           * stacked, the header's blur smearing the artwork's. And all three
           * have pale sky behind the nav, so white nav type sat on near-white
           * cloud. A scrim rescues the type and ruins the lockup, which is
           * dark on light.
           *
           * `HeaderNav` still takes `overlay`, ready for artwork designed with
           * a clear, dark top band.
           *
           * TWO DIFFERENT SIZING STRATEGIES, ONE PER SIDE OF `md`.
           *
           * From `md` up, the frame is a RATIO — the film's own proportions —
           * and every banner FILLS it. Sizing in viewport height let the frame
           * decide how much of a banner survived, and on a laptop it decided
           * to take the top: the lockup went with it. Fitting the pictures
           * inside the frame instead stopped the cropping and introduced
           * something worse, navy margins down the sides of the squarest
           * banner. Filling a frame shaped close to the artwork's own ratio is
           * what finally cost nothing worth noticing — 2-3% on two of the
           * three banners, spent on bare sky. LOAD-X pays for real, 18.8%, and
           * its anchor is aimed at the sky and gravel that can afford it; see
           * hero-slides.ts.
           *
           * BELOW `md`, THE SAME RATIO DOES NOT WORK, so it is not used. A
           * phone is roughly 0.6:1 and these banners are 1.5:1 to 2.34:1. A
           * tall mobile hero can only get there by throwing away a lot of the
           * sides, including exactly the logos and headlines the artwork is
           * supposed to preserve. So the phone frame follows Zoomlion's move:
           * a wide banner strip, with the full image contained over a softened
           * cover-fill copy of itself. The hero still reaches the edges, but
           * the actual banner art stays essentially whole.
           */
          "aspect-[1.7/1]",
          "md:aspect-[1.86/1]",
        )}
      >
        {slides.map((slide, i) => {
          const isActive = i === index;
          const isLeaving = i === previous && i !== index;
          const enterX = direction > 0 ? "100%" : "-100%";
          const leaveX = direction > 0 ? "-100%" : "100%";
          if (!isActive && !isLeaving) {
            /* Everything else stays mounted but is not painted, so the browser
               is not compositing four full-bleed layers at once. */
            return (
              <div
                key={slide.id}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0"
              >
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
                       arrival slides in from the side it is travelling from. */
                    previous === null
                    ? { opacity: 0, scale: 1.035, x: 0 }
                    : { opacity: 1, scale: 1, x: enterX }
              }
              animate={
                isActive
                  ? { opacity: 1, scale: 1, x: 0 }
                  : reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 1, scale: 1, x: leaveX }
              }
              transition={{
                duration: reduceMotion
                  ? 0.3
                  : previous === null && isActive
                    ? 1.4
                    : HERO_SLIDE_MS / 1000,
                ease: EASE,
              }}
              onAnimationComplete={() => {
                if (isLeaving) setPrevious(null);
              }}
            >
              {/* The drift is small and stays on its own element, because it
                  and the transition above both write `scale` and one would sit
                  on the other. 0.8% over the dwell for a still; a fuller drift
                  would start eating the margin the LOAD-X anchor is already
                  spending on tablet and desktop. The film gets a little more since
                  it fills its frame with room to spare at every width. */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: isActive && !reduceMotion ? (slide.video ? 1.012 : 1.008) : 1 }}
                transition={{ duration: isActive ? HERO_DWELL_MS / 1000 : 0, ease: "linear" }}
              >
                <SlideMedia
                  slide={slide}
                  priority={i === 0}
                  eager={isActive}
                  onEnded={isActive && slide.video ? () => go(index + 1) : undefined}
                  onPlaying={isActive && slide.video ? () => setFilmRunning(true) : undefined}
                  onErrorVideo={isActive && slide.video ? () => setFilmRunning(false) : undefined}
                  onDuration={
                    isActive && slide.video ? (seconds) => setFilmDuration(seconds) : undefined
                  }
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* ------------------------------------------------------------ arrows
         *
         * Manual navigation either side of the frame. Small and translucent —
         * they sit over live artwork at every width, so they read as a control
         * rather than another graphic competing with the banner.
         */}
        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous banner"
              className={cn(ARROW, "absolute left-3 top-1/2 z-10 -translate-y-1/2 md:left-6")}
            >
              <ChevronRightIcon className="rotate-180 text-base md:text-lg" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next banner"
              className={cn(ARROW, "absolute right-3 top-1/2 z-10 -translate-y-1/2 md:right-6")}
            >
              <ChevronRightIcon className="text-base md:text-lg" />
            </button>
          </>
        ) : null}

        {/* ------------------------------------------------------- indicators
         *
         * Numbered rules rather than dots: they say how many banners there are
         * and how far through the current one you are, and they sit at the
         * foot of the frame instead of over the machinery. The active rule
         * fills across the dwell, so the carousel tells you it is about to
         * move rather than just moving. On the film the fill runs to its
         * measured length once known, so it still reads as real progress
         * rather than a wrong five-second guess.
         */}
        {count > 1 ? (
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="mx-auto flex w-full max-w-[1400px] items-end justify-between gap-6 px-5 pb-4 sm:px-8 md:pb-8 lg:px-12">
              <ul className="flex flex-1 items-center gap-4 md:gap-6" aria-label="Choose a banner">
                {slides.map((slide, i) => (
                  <li
                    key={slide.id}
                    className="flex max-w-[7rem] flex-1 items-center gap-2 md:max-w-[9rem] md:gap-3"
                  >
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
                                  duration: paused
                                    ? 0.5
                                    : isFilm
                                      ? (filmDuration ?? FILM_FALLBACK_S)
                                      : HERO_DWELL_MS / 1000,
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
               * Desktop only, and it leaves as soon as the visitor starts. A
               * cue that is still there once you have scrolled is decoration.
               */}
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

      {/* ---------------------------------------------------------- CTA bar
       *
       * Below the frame, in normal flow, not on top of the photograph — the
       * client asked for these back, one pair per slide, keyed to whichever
       * banner is showing. Navy to bridge the hero's own colour into the white
       * section that follows, rather than a hard cut.
       */}
      <div className="relative border-t border-white/10 bg-navy-950">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-5 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <Button href={`/equipment/${activeSlide.brand.slug}`} size="md" variant="primary">
                {`View ${activeSlide.brand.name} Full Range`}
                <ArrowRight />
              </Button>
              <Button href="/request-a-quote" size="md" variant="outlineLight">
                Request A Quote
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

/**
 * One slide's media.
 *
 * Desktop covers, mobile contains. From `md` up, `object-cover` fills the
 * frame and `object-position` decides which sliver is given up to do it. Below
 * `md`, the real artwork is `object-contain` over a softened cover-fill
 * backdrop, keeping the banner legible instead of cropping the sides away.
 *
 * The anchor is a CSS variable per breakpoint rather than an inline value,
 * because it has to change at `md` and `lg` and an inline style cannot hold a
 * media query.
 */
function SlideMedia({
  slide,
  priority,
  eager,
  onEnded,
  onPlaying,
  onErrorVideo,
  onDuration,
}: {
  slide: HeroSlide;
  priority: boolean;
  eager: boolean;
  onEnded?: () => void;
  onPlaying?: () => void;
  onErrorVideo?: () => void;
  onDuration?: (seconds: number) => void;
}) {
  const position = {
    "--pos-mobile": slide.position?.mobile ?? "center",
    "--pos-tablet": slide.position?.tablet ?? slide.position?.desktop ?? "center",
    "--pos-desktop": slide.position?.desktop ?? "center",
  } as React.CSSProperties;

  const objectPosition =
    "[object-position:var(--pos-mobile)] md:[object-position:var(--pos-tablet)] lg:[object-position:var(--pos-desktop)]";
  const loading = priority ? undefined : eager ? "eager" : "lazy";
  const imageProps = {
    fill: true,
    preload: priority,
    loading,
    sizes: "100vw",
    quality: 90,
  } as const;

  if (slide.video) {
    return (
      <>
        <div className="absolute inset-0 md:hidden">
          <Image
            {...imageProps}
            src={slide.image.src}
            alt=""
            aria-hidden="true"
            style={position}
            className={cn("scale-110 object-cover opacity-65 blur-md", objectPosition)}
          />
          <div className="absolute inset-0 bg-navy-950/20" />
          <video
            key={`${slide.video.src}-${eager ? "active" : "idle"}-mobile`}
            src={slide.video.src}
            poster={slide.image.src}
            autoPlay={eager}
            muted
            playsInline
            preload={eager ? "auto" : "none"}
            aria-label={slide.image.alt}
            onEnded={onEnded}
            onPlaying={onPlaying}
            onError={onErrorVideo}
            onLoadedMetadata={(e) => onDuration?.(e.currentTarget.duration)}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image
            {...imageProps}
            src={slide.image.src}
            alt={slide.image.alt}
            style={position}
            className={cn("object-cover", objectPosition)}
          />
          {/* Sits over its own poster, so the frame is never black while the
              first video frame decodes. */}
          <video
            key={`${slide.video.src}-${eager ? "active" : "idle"}-desktop`}
            src={slide.video.src}
            poster={slide.image.src}
            autoPlay={eager}
            muted
            playsInline
            preload={eager ? "auto" : "none"}
            aria-label={slide.image.alt}
            style={position}
            onEnded={onEnded}
            onPlaying={onPlaying}
            onError={onErrorVideo}
            onLoadedMetadata={(e) => onDuration?.(e.currentTarget.duration)}
            className={cn("absolute inset-0 h-full w-full object-cover", objectPosition)}
          />
        </div>
      </>
    );
  }

  return slide.mobileImage ? (
    <>
      <Image
        {...imageProps}
        src={slide.mobileImage.src}
        alt={slide.mobileImage.alt}
        className="object-cover md:hidden"
      />
      <Image
        {...imageProps}
        src={slide.image.src}
        alt={slide.image.alt}
        style={position}
        className={cn("hidden object-cover md:block", objectPosition)}
      />
    </>
  ) : (
    <>
      <div className="absolute inset-0 md:hidden">
        <Image
          {...imageProps}
          src={slide.image.src}
          alt=""
          aria-hidden="true"
          style={position}
          className={cn("scale-110 object-cover opacity-60 blur-md", objectPosition)}
        />
        <div className="absolute inset-0 bg-white/15" />
        <Image
          {...imageProps}
          src={slide.image.src}
          alt={slide.image.alt}
          className="object-contain"
        />
      </div>
      <Image
        {...imageProps}
        src={slide.image.src}
        alt={slide.image.alt}
        style={position}
        className={cn("hidden object-cover md:block", objectPosition)}
      />
    </>
  );
}
