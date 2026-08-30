"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Section";
import type { ImageRef } from "@/lib/data";

/**
 * The page's opening frame: the cover photograph, the section name over it, and
 * a slow zoom OUT — the picture starts in tight and settles back, the way the
 * client's reference (SANY) opens its About page.
 *
 * The zoom runs on mount rather than on scroll. This is the first thing on the
 * page, so it is already in view; a scroll-linked effect would need the visitor
 * to scroll before anything happened, which is the opposite of an opening shot.
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
    <section className="relative isolate overflow-hidden bg-navy-950">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.22 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Enough scrim for the title to hold at any crop, without burying the
          premises the photograph is there to show. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,10,28,0.88)_0%,rgba(0,10,28,0.45)_45%,rgba(0,10,28,0.3)_100%)]" />

      <Container className="relative flex min-h-[62svh] flex-col justify-end pb-16 md:min-h-[72svh] md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow ? (
            <p className="eyebrow-rule font-display text-eyebrow uppercase text-amber-500">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-5 text-display-xl uppercase text-white [text-shadow:0_2px_20px_rgba(0,10,28,0.6)]">
            {title}
          </h1>
        </motion.div>
      </Container>
    </section>
  );
}
