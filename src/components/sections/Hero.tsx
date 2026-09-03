"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import {
  HERO_DWELL_MS,
  HERO_FADE_MS,
  heroSlides,
  type HeroSlide,
} from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The homepage hero: the banner artwork, and nothing on top of it.
 *
 * THE PICTURE IS THE INTERFACE. These banners arrive with the lockup, the
 * headline and the tagline already set by a designer, so there is no HTML text
 * over them at all — no heading, no body, no buttons, no scrim behind type that
 * is not there. Everything this component adds is a thin indicator rail and a
 * scroll cue, both of which get out of the way.
 *
 * AND BECAUSE THE TYPE IS PART OF THE PICTURE, WHERE THE CROP FALLS IS THE
 * WHOLE DESIGN. This took three goes. Sized in `vh` it cut the "Burki & Company
 * | LOAD-X" lockup off the top of a laptop. Fitted inside the frame instead, it
 * stopped cutting anything and left navy margins down the sides, which is
 * worse — a hero has to reach the edge of the screen. It now fills a frame cut
 * to the film's proportions, which the banners are close enough to that the
 * crop is a sliver, and each sliver is aimed at a part of the artwork that is
 * carrying nothing. See the note on the container below.
 *
 * WHAT MOVES, AND ALL OF IT IS TRANSFORM OR OPACITY:
 *
 *  1. The opening reveal — the first slide fades up from `scale(1.035)` over
 *     1.4s. Slow enough to register as a settle rather than a zoom.
 *  2. The change itself. The outgoing slide is NOT unmounted before the
 *     incoming one arrives — both are in the DOM for the whole crossfade, so
 *     there is never a frame of empty hero. Incoming comes up from 1.025 and
 *     1.5% to the right, outgoing falls away to 1.015 and 1% left. Opacity
 *     carries it; the movement is there to stop it reading as a slideshow.
 *  3. A slow drift while a slide is held — see the note where it is applied.
 *  4. The indicator fill, which is a scaleX tied to the same clock.
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

  const count = slides.length;

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

  /* A hidden tab pauses it, and coming back resumes rather than restarting the
     clock. This is the ONLY pause: it is not a stop the visitor can see, and
     running an off-screen carousel only costs battery. */
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* Every slide runs on the same clock, the film included — it is cut at the
     dwell rather than played out to its own end. `index` is in the dependency
     list so a manual jump restarts the dwell rather than inheriting whatever
     was left of the last one. */
  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setTimeout(() => go(index + 1), HERO_DWELL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, count, go]);

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
      /*
       * NO POINTER PAUSE. Hovering used to hold the banner, which on a wide
       * screen meant the carousel simply stopped for anyone whose cursor
       * happened to be resting over it. Nothing sits longer than the dwell.
       */
      className={cn(
        "relative w-full overflow-hidden bg-navy-950",
        /*
         * THE HEADER SITS ABOVE THIS, NOT OVER IT — and that is a decision the
         * artwork forced.
         *
         * A transparent nav floating on the banner was the plan, and it was
         * built. It does not work with these particular assets. Every one of
         * them carries its OWN "Burki & Company" lockup in the top left, which
         * is exactly where the site header puts the same logo: two Burki marks
         * stacked, the header's blur smearing the artwork's. And all three have
         * pale sky behind the nav, so white nav type sat on near-white cloud. A
         * scrim rescues the type and ruins the lockup, which is dark on light.
         *
         * `HeaderNav` still takes `overlay`, ready for artwork designed with a
         * clear, dark top band.
         *
         * A RATIO, NOT A `vh` HEIGHT — and every banner FILLS it.
         *
         * Sizing a hero in viewport height lets the frame decide how much of a
         * banner you get, and on a laptop what it decided to take was the top:
         * the "Burki & Company" lockup went with it. Fitting the pictures
         * inside the frame instead fixed the cropping and introduced something
         * worse — navy margins down the sides of the squarest banner. A hero
         * that does not reach the edge of the screen looks broken, and no
         * explanation of the aspect ratios makes it look less broken.
         *
         * So the frame takes the FILM'S proportions and the stills fill it. The
         * reason that works is arithmetic rather than luck: at 1.86 the Xinyuan
         * banner gives up 2.8% of its height, XCMG is already wider than the
         * frame and gives up 2% of its width, and only LOAD-X gives up anything
         * real — 18.8%, which comes out of bare sky and bare gravel because its
         * anchor is set to spend it there. See hero-slides.ts, where each of
         * those anchors is a measurement of the file rather than a preference.
         *
         * Phones take a squarer 1.35 and anchor hard left. A 1.86 frame on a
         * 390px screen is a 210px letterbox strip with headline type too small
         * to read; 1.35 gives it 289px, keeps every banner full height, and
         * spends the crop on the far end of the machine instead of the message.
         *
         * NO MAX-HEIGHT. There was one, capping the hero to whatever the
         * viewport had left under the header, and it quietly broke the whole
         * arrangement: a cap does not shorten the frame, it WIDENS it. At
         * 1920x1080 the cap turned 1.86 into 1.99, which took the LOAD-X crop
         * from 18.8% to 24% — past the 8% of bare sky its anchor was budgeted
         * against — and clipped the top of the Burki badge. The ratio has to
         * hold at every width or the anchors underneath it stop meaning
         * anything. On a 1080-tall screen that leaves the last 170px of the
         * hero below the fold, which is what heroes do.
         */
        "aspect-[1.35/1] md:aspect-[1.86/1]",
      )}
    >
      {slides.map((slide, i) => {
        const isActive = i === index;
        const isLeaving = i === previous && i !== index;
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
                ? 0.3
                : previous === null && isActive
                  ? 1.4
                  : HERO_FADE_MS / 1000,
              ease: EASE,
            }}
            onAnimationComplete={() => {
              if (isLeaving) setPrevious(null);
            }}
          >
            {/* The drift is back, and small. It was dropped while the banners
                were fitted rather than filled, because a creeping `scale` on a
                fitted picture is not depth, it is a crop that grows. Now that
                they fill the frame there is slack to move inside — but only a
                little: 1.5% over the dwell, where a fuller 2.5% would start
                eating the margin the LOAD-X anchor is already spending. Its own
                element regardless, because the drift and the transition both
                write `scale` and one would sit on the other. */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: isActive && !reduceMotion ? (slide.video ? 1.03 : 1.015) : 1 }}
              transition={{ duration: isActive ? (slide.video ? 6 : 5) : 0, ease: "linear" }}
            >
              <SlideMedia slide={slide} priority={i === 0} eager={isActive} />
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
                                duration: paused ? 0.5 : HERO_DWELL_MS / 1000,
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
 * EVERYTHING COVERS, AND THE ANCHOR IS THE WHOLE ARGUMENT. `object-cover`
 * fills the frame; `object-position` decides which sliver is given up to do
 * it. On artwork with the type baked into it that anchor is the difference
 * between a hero and a decapitated logo, which is why the anchors in
 * hero-slides.ts are measured off the files rather than chosen by eye.
 *
 * The anchor is a CSS variable per breakpoint rather than an inline value,
 * because it has to change at `md` and `lg` and an inline style cannot hold a
 * media query.
 */
function SlideMedia({
  slide,
  priority,
  eager,
}: {
  slide: HeroSlide;
  priority: boolean;
  eager: boolean;
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
          src={slide.video.src}
          poster={slide.image.src}
          autoPlay={eager}
          muted
          playsInline
          preload={eager ? "auto" : "none"}
          aria-label={slide.image.alt}
          style={position}
          className={cn("absolute inset-0 h-full w-full object-cover", objectPosition)}
        />
      </>
    );
  }

  return slide.mobileImage ? (
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
  );
}
