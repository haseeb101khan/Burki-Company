"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Applies reduced-motion preferences across every animation in the app at
 * runtime, so individual components never branch on the media query during
 * render (which would desynchronise SSR and hydration).
 *
 * "user" disables transform and layout animation for people who ask for it,
 * while leaving opacity fades — which are not motion-sickness triggers — intact.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
