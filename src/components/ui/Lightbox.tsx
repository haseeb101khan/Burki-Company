"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ImageRef } from "@/lib/data";
import { ChevronRightIcon, CloseIcon } from "@/components/ui/Icons";
import { useAutoHideChrome } from "@/components/ui/useAutoHideChrome";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Horizontal travel, in px, that counts as a deliberate swipe. */
const SWIPE_PX = 60;

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
  const count = images.length;
  /* Full screen is where the arrows hurt most — the picture fills the display,
     so a control pinned to the middle of each edge is guaranteed to be on top
     of the machine. */
  const { hold, release, surfaceProps, chromeClass } = useAutoHideChrome();

  const step = useCallback(
    (d: number) => onIndexChange(((index + d) % count + count) % count),
    [count, index, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        /* Two focusable stops in here; keep Tab cycling between them rather
           than escaping into the page behind the overlay. */
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
  }, [onClose, step]);

  const current = images[index];
  if (!current) return null;

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
        <div className="flex shrink-0 items-center justify-between p-4 md:p-5">
          <p
            className={cn(
              "font-display text-[0.8125rem] font-semibold uppercase tracking-[0.14em] tabular-nums",
              fit === "contain" ? "text-navy-700" : "text-white/70",
            )}
          >
            {index + 1} / {count}
          </p>
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

        <div
          className="relative min-h-0 flex-1"
          onClick={(e) => e.stopPropagation()}
          {...surfaceProps}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
              drag={count > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) < SWIPE_PX) return;
                step(info.offset.x < 0 ? 1 : -1);
              }}
            >
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
          </AnimatePresence>

          {count > 1
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
                    fit === "contain"
                      ? "bg-navy-800/90 text-white hover:bg-amber-500 hover:text-navy-900"
                      : "bg-white/12 text-white backdrop-blur-sm hover:bg-amber-500 hover:text-navy-900",
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
