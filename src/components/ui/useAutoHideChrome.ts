"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

/**
 * Visibility for controls that sit ON TOP of a photograph.
 *
 * The step arrows are pinned to the middle of the frame, which on a phone is
 * exactly where the machine is — the two of them landed on the cab and the
 * boom and stayed there while the visitor was trying to look at the thing they
 * came to see. Persistent controls over an image are a desktop habit: there,
 * the cursor says when someone is engaging with the picture, and there is
 * usually room either side of it.
 *
 * So the controls announce themselves once, then get out of the way:
 *
 *   - mouse       — visible the whole time the pointer is over the frame,
 *                   because the pointer already says "I am looking at this".
 *   - touch / pen — a tap brings them back for a few seconds. Swipe and the
 *                   thumbnail strip both still work while they are hidden, so
 *                   nothing is lost by not showing them.
 *
 * Hidden means `opacity-0` plus `pointer-events-none`, never `hidden` — a
 * removed button cannot be reached by keyboard, and a transparent one that
 * still swallowed taps would block the swipe it is standing in for.
 */
export function useAutoHideChrome(holdMs = 2400) {
  /* Starts visible: the controls are worth seeing once, so the visitor knows
     the frame steps at all. The mount effect fades them shortly after. */
  const [visible, setVisible] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  /** Show, and keep showing until something asks otherwise. */
  const hold = useCallback(() => {
    clear();
    setVisible(true);
  }, [clear]);

  /** Show now, hide after the delay. */
  const release = useCallback(
    (delay = holdMs) => {
      clear();
      timer.current = setTimeout(() => setVisible(false), delay);
    },
    [clear, holdMs],
  );

  useEffect(() => {
    release(holdMs);
    return clear;
  }, [clear, holdMs, release]);

  /**
   * Spread onto the element the controls are laid over — the frame, not the
   * buttons. A pointer that is over the picture is engaging with the picture.
   */
  const surfaceProps = {
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType === "mouse") hold();
    },
    onPointerLeave: (e: PointerEvent) => {
      if (e.pointerType === "mouse") release(160);
    },
    /* Touch has no hover to lean on, so the tap itself is the request. This
       fires alongside the start of a swipe, which is fine: the controls come
       back for a moment and fade again on their own. */
    onPointerDown: (e: PointerEvent) => {
      if (e.pointerType !== "mouse") release();
    },
  };

  /**
   * Class pair for a control. Focus is deliberately excluded from the fade —
   * a keyboard user tabbing to a button they cannot see would have no idea
   * where they are.
   */
  const chromeClass = visible
    ? "opacity-100"
    : "pointer-events-none opacity-0 focus-visible:pointer-events-auto focus-visible:opacity-100";

  return { visible, hold, release, surfaceProps, chromeClass };
}
