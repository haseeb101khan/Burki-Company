"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal. Deliberately small: a short rise and a fade, once, on enter.
 * Anything more starts to feel like a template.
 *
 * Reduced motion is handled globally by `MotionProvider` (MotionConfig
 * reducedMotion="user"), not by branching here — branching on a client-only
 * media query during render desynchronises SSR and causes hydration errors.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked line reveal — the text rises from behind a clipped edge rather than
 * fading in. Used on section headings, where a fade reads as slow and a rise
 * reads as deliberate.
 *
 * Render a single line per instance: the mask clips at the element box, so a
 * wrapping paragraph would have every line but the first appear cut off.
 */
export function RevealMask({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  /**
   * The observer sits on the OUTER wrapper, not the animated span.
   *
   * `whileInView` on the inner span cannot work here: that element starts
   * translated fully below the mask, so the wrapper's `overflow: hidden` clips
   * it to zero and it never intersects the viewport — leaving the heading
   * permanently invisible. It bit the two-line headings specifically, since
   * their larger offset put them further outside the clip box.
   */
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <span ref={ref} className={cn("block overflow-hidden pb-[0.12em]", className)}>
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: inView ? "0%" : "108%" }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Staggers a list of children by index. Used for card grids so a row settles
 * in sequence rather than all at once.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  baseDelay = 0,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  baseDelay?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <Reveal key={index} delay={baseDelay + index * stagger}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
