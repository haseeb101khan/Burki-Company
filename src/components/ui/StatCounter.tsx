"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Counts up to a target when scrolled into view, once.
 *
 * `from` exists so a year (1978) can sweep from a sensible baseline rather than
 * spinning up from zero, which reads as a bug rather than an effect.
 *
 * The initial render is always `from` — server and client alike. Reduced motion
 * is resolved in an effect rather than during render, because branching on a
 * client-only media query while rendering produces a hydration mismatch.
 *
 * ---------------------------------------------------------------------------
 * THE OBSERVER HAS NO MARGIN.
 *
 * This watched with `margin: "-60px"`, and on a phone it never fired: the whole
 * stat band read 0, 0, 0, 0 while the same page on a desktop counted up
 * normally. A negative margin shrinks the detection box on all four sides, and
 * at 390px wide these cells never satisfied it. Identical to the bug that left
 * the founder's portrait and the certificate clipped shut — see `BoxReveal`.
 *
 * The counter fails OPEN as well: the figure is what matters, the count is
 * decoration, so if the observer has not fired by the time the fallback lands
 * the number is animated anyway. A statistic that renders as zero is worse than
 * one that arrives without its animation — zero is a wrong number, not a
 * missing effect.
 * ---------------------------------------------------------------------------
 */
/** How long to wait on the observer before showing the figure regardless. */
const FAILSAFE_MS = 2000;
export function StatCounter({
  value,
  from = 0,
  prefix,
  suffix,
  duration = 1.6,
  className,
}: {
  value: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(from);
  const [expired, setExpired] = useState(false);

  /* The safety net. Long enough that a visitor scrolling down at a normal pace
     still meets the count on the way in, short enough that nobody sits looking
     at a zero. */
  useEffect(() => {
    const t = setTimeout(() => setExpired(true), FAILSAFE_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    /* Reduced motion still needs the final figure — it just gets there in one
       frame. Driving all three cases through `animate` keeps the state update
       inside an external subscription rather than firing it straight from the
       effect. */
    if (!inView && !reduceMotion && !expired) return;

    const controls = animate(from, value, {
      duration: reduceMotion ? 0 : duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, expired, from, value, duration, reduceMotion]);

  /* Years are rendered bare; every other figure gets thousands separators. */
  const formatted =
    value > 1000 && value < 2200 ? String(display) : display.toLocaleString("en-US");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
