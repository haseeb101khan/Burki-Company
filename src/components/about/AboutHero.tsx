"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Section";
import type { ImageRef } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The page's opening frame: the office photograph, the section name over it,
 * and a slow zoom OUT — the picture starts in tight and settles back, the way
 * the client's reference (SANY) opens its About page.
 *
 * IT TAKES THE SCREEN. The brief was that opening About should show the office
 * and the words "About Us", and that the rest of the page opens after it, so
 * the frame is sized against the viewport rather than to a comfortable band.
 * `svh` and not `vh`: on a phone `vh` is the height with the browser's address
 * bar retracted, so a full-height `vh` hero is always a bar's worth taller than
 * the screen and the first thing the visitor sees is a section that does not
 * fit. It stops short of the full height on purpose — a sliver of the section
 * below shows through, which is what tells the visitor there is a page under
 * the cover.
 *
 * THE ANIMATION IS STAGED, NOT SIMULTANEOUS. The photograph settles, then the
 * eyebrow, then the title rises out of a mask, then the cue to keep going. Each
 * waits on the last, so it reads as one movement resolving rather than four
 * things arriving at once. The title's mask is the same device as `RevealMask`
 * on section headings — the letters climb out from behind a clipped edge — and
 * it needs the wrapper's `overflow-hidden` to do it.
 *
 * The zoom runs on mount rather than on scroll. This is the first thing on the
 * page, so it is already in view; a scroll-linked effect would need the visitor
 * to scroll before anything happened, which is the opposite of an opening shot.
 *
 * Reduced motion is handled globally by `MotionProvider` (MotionConfig
 * reducedMotion="user"), which drops the transforms and leaves the fades.
 *
 * It is a `<section>` and not the shared `Section` component because it is
 * full-bleed and sets its own height against the viewport.
 */
export function AboutHero({
  image,
  eyebrow,
  title,
}: {
  image: ImageRef;
  eyebrow?: string;
  title: string;
}) {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-navy-950 md:block">
      {/*
       * THE PICTURE IS A BAND ON A PHONE, A BACKDROP FROM `md` UP.
       *
       * Same reasoning as the homepage banners: a 16:9 photograph covering a
       * portrait frame keeps about a third of its width, and here that third
       * was the office ceiling. Cropping to 95% rescued the name board but
       * still threw away most of the room. As a 62vw band across the top,
       * nearly all of the photograph survives and the title sits under it on
       * the section's own navy, in the same order the banners now use —
       * eyebrow, title, then the page.
       *
       * The band is a little taller than the banners' 54vw because this frame
       * carries no buttons under it, and because the picture is 16:9 rather
       * than 2.4:1 and so needs less width thrown away to fit.
       */}
      <div className="relative order-1 h-[62vw] w-full overflow-hidden md:absolute md:inset-0 md:order-none md:h-auto">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            /* Only meaningful from `md` up now. Below that the whole width is
               in frame, so there is nothing for a focus point to rescue. */
            style={image.focus ? { objectPosition: image.focus } : undefined}
          />
        </motion.div>

        {/* On a phone, a short fade at the band's base so the photograph
            resolves into the navy under it instead of stopping on an edge. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,10,28,0)_60%,rgba(0,10,28,0.5)_86%,rgba(0,10,28,0.95)_100%)] md:hidden" />
      </div>

      {/* Enough scrim for the title to hold at any crop, without burying the
          premises the photograph is there to show. Not on a phone, where
          nothing is written over the picture any more. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgba(0,10,28,0.9)_0%,rgba(0,10,28,0.5)_45%,rgba(0,10,28,0.32)_100%)] md:block" />

      <Container className="relative order-2 flex flex-col justify-end py-10 md:order-none md:min-h-[92svh] md:py-0 md:pb-20">
        {eyebrow ? (
          <motion.p
            className="eyebrow-rule font-display text-eyebrow uppercase text-amber-500"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          >
            {eyebrow}
          </motion.p>
        ) : null}

        {/* The mask is the wrapper's `overflow-hidden`; the heading climbs out
            from behind its own bottom edge. `pb-[0.12em]` keeps a descender
            from being shaved by the clip. */}
        <h1 className="mt-5 overflow-hidden pb-[0.12em] text-display-xl uppercase text-white [text-shadow:0_2px_20px_rgba(0,10,28,0.55)]">
          <motion.span
            className="block"
            initial={{ y: "112%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: 0.68, ease: EASE }}
          >
            {title}
          </motion.span>
        </h1>

        {/* The rule closes the sequence. There was a scroll cue under it —
            taken out on the client's call. The frame already stops short of
            the full viewport, so the section below shows through and says the
            same thing without a badge over the photograph. */}
        <motion.span
          aria-hidden="true"
          className="mt-6 block h-px w-16 origin-left bg-amber-500 md:w-24"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
        />
      </Container>
    </section>
  );
}
