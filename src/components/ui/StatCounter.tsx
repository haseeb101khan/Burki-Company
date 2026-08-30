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
 */
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    /* Reduced motion still needs the final figure — it just gets there in one
       frame. Driving both cases through `animate` keeps the state update inside
       an external subscription rather than firing it straight from the effect. */
    if (!inView && !reduceMotion) return;

    const controls = animate(from, value, {
      duration: reduceMotion ? 0 : duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, from, value, duration, reduceMotion]);

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
