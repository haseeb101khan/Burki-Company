"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
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
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
