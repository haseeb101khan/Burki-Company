"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The client asked for "the box animation in PowerPoint" — the entrance where a
 * rectangle opens from its centre outwards until the content is fully shown.
 *
 * That is a clip-path animation, not a scale or a fade: the panel's edges stay
 * exactly where they land, and the *window* onto it opens. Scaling would move
 * the content and change its size on the way in, which is a different effect
 * and reads as a zoom.
 *
 * The inner scale is the second half of it. The picture starts slightly larger
 * and settles as the window opens, so the image drifts rather than sitting
 * dead still behind a moving frame.
 *
 * Reduced motion is handled globally by `MotionProvider` (MotionConfig
 * reducedMotion="user"); this does not branch on it, because branching on a
 * client-only media query during render desynchronises SSR.
 *
 * ---------------------------------------------------------------------------
 * THE OBSERVER IS EXPLICIT, AND IT HAS NO MARGIN.
 *
 * This ran on `whileInView` with `viewport={{ margin: "-90px" }}`. On a phone
 * it never fired. The founder's portrait, the distributor certificate and the
 * entire client wall sat at their initial `inset(50%)` — files loaded, boxes
 * laid out, fully opaque, and clipped to nothing. On the same page and the
 * same scroll the ordinary `Reveal`s animated normally, which is what makes
 * the margin the culprit: it shrinks the detection box on all four sides, and
 * at 390px wide there is not enough of it left for these elements to satisfy.
 *
 * `useInView` with no margin fires on the first visible pixel, which is all
 * this needs — the box opens as it arrives, at any viewport width.
 *
 * Worth remembering why this one mattered: a reveal whose resting state is
 * "hidden" turns any missed trigger into permanently missing content, and what
 * went missing here was the client's own portrait and the certificate that
 * proves the distributorship. Prefer triggers that fail open.
 * ---------------------------------------------------------------------------
 */
export function BoxReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
      animate={{ clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(50% 50% 50% 50%)" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.12 }}
        animate={{ scale: inView ? 1 : 1.12 }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
