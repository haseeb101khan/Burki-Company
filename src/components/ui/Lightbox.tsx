"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import type { ImageRef } from "@/lib/data";
import {
  ChevronRightIcon,
  CloseIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@/components/ui/Icons";
import { useAutoHideChrome } from "@/components/ui/useAutoHideChrome";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Horizontal travel, in px, that counts as a deliberate swipe. */
const SWIPE_PX = 60;

const MIN_SCALE = 1;
const MAX_SCALE = 4;
/** One press of the +/- buttons, and the step a double-tap jumps to. */
const STEP_SCALE = 0.75;
const DOUBLE_TAP_SCALE = 2.5;
/** Two taps closer together than this, and near enough, count as a double. */
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_SLOP = 14;
/** Below this the picture is close enough to unzoomed to just snap back. */
const SNAP_BACK = 1.02;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Full-screen image viewer.
 *
 * Rendered through a PORTAL onto `document.body`, not inside the gallery. The
 * gallery sits in a grid column with `overflow-hidden` on its frame; a fixed
 * overlay declared inside it would be clipped to that column and cover about a
 * third of the screen. Escaping the layout is the whole reason this is a portal
 * rather than a `fixed` div in place.
 *
 * While it is open the page behind is locked and focus is trapped, so the
 * viewer behaves like the modal it is: Escape and the close button get out,
 * arrows and swipe move between frames, and tabbing cannot wander into the
 * page underneath.
 *
 * ---------------------------------------------------------------------------
 * ZOOM
 *
 * A buyer looking at a full-screen photograph of a machine wants to get closer
 * — at the coupler, the cab, the plate on the boom. Every way in is wired to
 * the same clamped scale so they all agree:
 *
 *   - pinch          two fingers, scaled about the midpoint between them
 *   - double tap     in at the point tapped, out again on the second double
 *   - wheel          desktop and trackpad, about the cursor
 *   - the buttons    for anyone who does not think to try the gestures
 *
 * Zooming keeps the point under the fingers under the fingers: the new offset
 * is `p - (p - t) * (s2 / s)`, which holds that content point still. Anchoring
 * to the centre instead is the usual shortcut and it makes the picture crawl
 * away from whatever the visitor was aiming at.
 *
 * The gestures are hand-rolled on pointer events rather than handed to the
 * animation library's `drag`, because a single pointer means two different
 * things here — pan while zoomed in, change picture while not — and one
 * gesture owner has to decide which. `touch-action: none` on the stage takes
 * the browser's own pan and pinch out of the argument.
 * ---------------------------------------------------------------------------
 */
export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  fit = "cover",
  label,
}: {
  images: ImageRef[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
  /** Cutouts are contained on white; photographs get the dark ground. */
  fit?: "cover" | "contain";
  label: string;
}) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const count = images.length;
  const { hold, release, surfaceProps, chromeClass } = useAutoHideChrome();

  /* The transform lives in motion values, not React state: a pinch updates it
     on every pointer move, and re-rendering the tree at that rate to redraw
     one picture would be wasted work. `zoomed` is the one bit React needs — it
     decides whether a drag pans or changes picture, and whether the zoom-out
     button is live — so it is tracked separately and only flips at the
     threshold. */
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [zoomed, setZoomed] = useState(false);

  const step = useCallback(
    (d: number) => onIndexChange(((index + d) % count + count) % count),
    [count, index, onIndexChange],
  );

  /** Largest offset that still keeps picture over frame at this scale. */
  const bounds = useCallback((s: number) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return { mx: 0, my: 0 };
    return { mx: ((s - 1) * r.width) / 2, my: ((s - 1) * r.height) / 2 };
  }, []);

  /**
   * Scale to `next`, holding the content under (`px`, `py`) still.
   * Coordinates are viewport coordinates; omit them to zoom about the centre.
   */
  const zoomTo = useCallback(
    (next: number, px?: number, py?: number) => {
      const r = stageRef.current?.getBoundingClientRect();
      const s1 = scale.get();
      const s2 = clamp(next, MIN_SCALE, MAX_SCALE);

      if (s2 <= SNAP_BACK) {
        scale.set(1);
        x.set(0);
        y.set(0);
        setZoomed(false);
        return;
      }

      if (r) {
        /* Pointer relative to the middle of the stage, which is where the
           untransformed picture is centred. */
        const cx = px === undefined ? 0 : px - (r.left + r.width / 2);
        const cy = py === undefined ? 0 : py - (r.top + r.height / 2);
        const ratio = s2 / s1;
        const { mx, my } = bounds(s2);
        x.set(clamp(cx - (cx - x.get()) * ratio, -mx, mx));
        y.set(clamp(cy - (cy - y.get()) * ratio, -my, my));
      }

      scale.set(s2);
      setZoomed(true);
    },
    [bounds, scale, x, y],
  );

  const resetZoom = useCallback(() => {
    scale.set(1);
    x.set(0);
    y.set(0);
    setZoomed(false);
  }, [scale, x, y]);

  /* A new picture always arrives unzoomed. Carrying the previous frame's scale
     over lands the visitor deep inside an image they have not seen yet. */
  useEffect(() => {
    resetZoom();
  }, [index, resetZoom]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "+" || e.key === "=") zoomTo(scale.get() + STEP_SCALE);
      else if (e.key === "-") zoomTo(scale.get() - STEP_SCALE);
      else if (e.key === "0") resetZoom();
      else if (e.key === "Tab") {
        /* Keep Tab cycling within the overlay rather than escaping into the
           page behind it. */
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    /* Lock the page behind, and compensate for the scrollbar's width so the
       layout does not jump sideways as it disappears. */
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [onClose, resetZoom, scale, step, zoomTo]);

  /* Wheel is bound by hand because it has to be non-passive: React's own
     onWheel cannot call preventDefault, and without that a trackpad pinch
     zooms the whole browser page instead of the picture. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomTo(scale.get() * (1 - e.deltaY * 0.0016), e.clientX, e.clientY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [scale, zoomTo]);

  /* ------------------------------------------------------------- gestures */
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  /**
   * The single-pointer gesture in flight.
   *
   * `mode` is fixed at pointer-down from the scale at that moment, because one
   * finger means two different things: pan the picture when zoomed in, change
   * the picture when not. What it must NOT decide is whether a tap counts —
   * that is measured from the distance travelled when the finger lifts, so a
   * double tap zooms back out while panning is the active mode. Keeping tap
   * detection inside the swipe branch is what made zooming out by double tap
   * impossible.
   */
  const gesture = useRef<{
    mode: "pan" | "swipe";
    startX: number;
    startY: number;
    tx: number;
    ty: number;
  } | null>(null);
  const lastTap = useRef({ t: 0, x: 0, y: 0 });

  const twoPointers = () => {
    const [a, b] = [...pointers.current.values()];
    return { a, b, dist: Math.hypot(b.x - a.x, b.y - a.y) };
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      gesture.current = null;
      pinch.current = { dist: twoPointers().dist, scale: scale.get() };
      return;
    }
    if (pointers.current.size !== 1) return;

    gesture.current = {
      mode: scale.get() > 1 ? "pan" : "swipe",
      startX: e.clientX,
      startY: e.clientY,
      tx: x.get(),
      ty: y.get(),
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pinch.current && pointers.current.size >= 2) {
      const { a, b, dist } = twoPointers();
      zoomTo(
        (pinch.current.scale * dist) / pinch.current.dist,
        (a.x + b.x) / 2,
        (a.y + b.y) / 2,
      );
      return;
    }

    const g = gesture.current;
    if (!g) return;

    if (g.mode === "pan") {
      const { mx, my } = bounds(scale.get());
      x.set(clamp(g.tx + (e.clientX - g.startX), -mx, mx));
      y.set(clamp(g.ty + (e.clientY - g.startY), -my, my));
      return;
    }

    /* Not zoomed: the picture follows the finger a little, so a swipe feels
       connected before it commits to changing frame. */
    x.set((e.clientX - g.startX) * 0.55);
  };

  const endGesture = (e: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2 && pinch.current) {
      pinch.current = null;
      if (scale.get() <= SNAP_BACK) resetZoom();
      /* A finger lifted from a pinch must not become a pan or a swipe. */
      pointers.current.clear();
      gesture.current = null;
      return;
    }
    if (pointers.current.size > 0) return;

    const g = gesture.current;
    gesture.current = null;
    if (!g) return;

    const dx = e.clientX - g.startX;
    /* A swipe's live offset is undone either way — a committed swipe is
       replaced by the incoming frame, an abandoned one springs back. */
    if (g.mode === "swipe") x.set(0);

    /* Did the finger actually go anywhere? Measured across both modes, so a
       tap is a tap whether or not the picture was zoomed. */
    if (Math.hypot(dx, e.clientY - g.startY) < DOUBLE_TAP_SLOP) {
      const now = Date.now();
      const prev = lastTap.current;
      const near = Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < DOUBLE_TAP_SLOP;
      if (now - prev.t < DOUBLE_TAP_MS && near) {
        if (scale.get() > 1) resetZoom();
        else zoomTo(DOUBLE_TAP_SCALE, e.clientX, e.clientY);
        lastTap.current = { t: 0, x: 0, y: 0 };
      } else {
        lastTap.current = { t: now, x: e.clientX, y: e.clientY };
      }
      return;
    }

    if (g.mode === "swipe" && Math.abs(dx) >= SWIPE_PX) step(dx < 0 ? 1 : -1);
  };

  const current = images[index];
  if (!current) return null;

  const controlClass =
    fit === "contain"
      ? "bg-navy-800/90 text-white hover:bg-amber-500 hover:text-navy-900"
      : "bg-white/12 text-white backdrop-blur-sm hover:bg-amber-500 hover:text-navy-900";

  return createPortal(
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${label} — image ${index + 1} of ${count}`}
        ref={panelRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}
        className={cn(
          "fixed inset-0 z-[100] flex flex-col",
          fit === "contain" ? "bg-white/98" : "bg-navy-950/97",
        )}
        /* Clicking the backdrop closes; clicking the picture does not, so a
           drag that ends on the image is not read as "get me out of here". */
        onClick={onClose}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 p-4 md:p-5">
          <p
            className={cn(
              "font-display text-[0.8125rem] font-semibold uppercase tracking-[0.14em] tabular-nums",
              fit === "contain" ? "text-navy-700" : "text-white/70",
            )}
          >
            {index + 1} / {count}
          </p>

          {/* The zoom controls live in the bar, not over the picture: they are
              the one set of controls a visitor may want while looking closely,
              and putting them on the image would reintroduce exactly what the
              arrows were doing wrong. */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => zoomTo(scale.get() - STEP_SCALE)}
              disabled={!zoomed}
              aria-label="Zoom out"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full text-lg transition-colors",
                "disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white/12",
                controlClass,
                fit === "contain" && "disabled:hover:bg-navy-800/90",
              )}
            >
              <ZoomOutIcon />
            </button>
            <button
              type="button"
              onClick={() => zoomTo(scale.get() + STEP_SCALE)}
              aria-label="Zoom in"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full text-lg transition-colors",
                controlClass,
              )}
            >
              <ZoomInIcon />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close full screen"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full text-xl transition-colors",
                fit === "contain"
                  ? "bg-navy-800 text-white hover:bg-amber-500 hover:text-navy-900"
                  : "bg-white/12 text-white hover:bg-amber-500 hover:text-navy-900",
              )}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div
          ref={stageRef}
          className={cn(
            "relative min-h-0 flex-1 touch-none overflow-hidden",
            zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
          )}
          onClick={(e) => e.stopPropagation()}
          {...surfaceProps}
          /* Both want the pointer-down: the auto-hide to bring the arrows
             back, the gesture handler to start a pinch, pan or swipe. Spread
             first, then compose — declared the other way round the spread
             silently replaces the gesture. */
          onPointerDown={(e) => {
            surfaceProps.onPointerDown(e);
            onPointerDown(e);
          }}
          onPointerMove={onPointerMove}
          onPointerUp={endGesture}
          onPointerCancel={endGesture}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
            >
              {/* The zoom transform is a layer of its own so it survives the
                  cross-fade above it — one element cannot be both the thing
                  entering and the thing being panned. */}
              <motion.div className="h-full w-full" style={{ x, y, scale }}>
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  priority
                  draggable={false}
                  className="object-contain p-4 select-none md:p-8"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Hidden while zoomed in: at that point the same drag is panning the
              picture, and a step control sitting over it is both in the way and
              the wrong gesture. */}
          {count > 1 && !zoomed
            ? ([-1, 1] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    step(d);
                    /* Stepping is a reason to keep the controls a moment
                       longer — the visitor is working through the set. */
                    release();
                  }}
                  onFocus={hold}
                  aria-label={d < 0 ? "Previous image" : "Next image"}
                  className={cn(
                    "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full",
                    "transition-all duration-300 active:scale-95",
                    controlClass,
                    d < 0 ? "left-3 md:left-6" : "right-3 md:right-6",
                    chromeClass,
                  )}
                >
                  <ChevronRightIcon className={cn("text-xl", d < 0 && "rotate-180")} />
                </button>
              ))
            : null}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
