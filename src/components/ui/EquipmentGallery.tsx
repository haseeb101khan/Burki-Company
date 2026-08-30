"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRightIcon, ExpandIcon, PlayIcon } from "@/components/ui/Icons";
import { Lightbox } from "@/components/ui/Lightbox";
import type { ImageRef, VideoRef } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Horizontal travel, in px, that counts as a deliberate swipe. */
const SWIPE_PX = 60;

type Slide = { key: string; image: ImageRef };

/**
 * Detail-page media gallery: one large frame over a thumbnail strip.
 *
 * The strip is the primary control — a buyer reading specs wants to jump
 * straight to "the cab" or "the bucket" rather than step through frames in
 * order. Arrows and swipe are there for the linear pass, and because on a
 * phone the thumbnails are small enough that dragging the big frame is the
 * more natural move.
 *
 * PHOTOGRAPHS AND FILM ARE SEPARATE TABS, not one merged reel. Mixing them put
 * a video in the middle of a walkaround sequence, where dragging past it fought
 * the scrubber and a play badge appeared among the stills with no warning. The
 * tabs also mean a machine with no film shows no film control at all, rather
 * than an empty affordance — eight of the eleven Xinyuan models have one.
 *
 * ---------------------------------------------------------------------------
 * NOTHING IN HERE MAY BE WIDER THAN ITS OWN COLUMN.
 *
 * This component is rendered into a CSS grid cell, and a grid item's automatic
 * minimum size is `auto` — it refuses to shrink below its content. A single
 * negative margin (the thumbnail strip once bled `-mx-5` to the page gutter)
 * therefore does not overhang: it widens the whole grid track past the
 * viewport, the `w-full` frame follows it, and the phone gets a hugely
 * magnified photograph over a page that scrolls sideways.
 *
 * So: no negative margins, no fixed pixel widths, `min-w-0` on the root, and
 * every horizontal strip is its own scroll container (a scroller's automatic
 * minimum size resolves to zero, which is what keeps the track honest).
 * ---------------------------------------------------------------------------
 */
export function EquipmentGallery({
  images,
  videos,
  name,
  fit = "cover",
}: {
  images: ImageRef[];
  videos?: VideoRef[];
  name: string;
  /**
   * How a frame sits in the window.
   *
   * `cover` for on-site photography, which brings its own background and should
   * fill the frame. `contain` for studio cutouts — a machine isolated on
   * transparency has no spare edge to crop into, and covering it lops the boom
   * or the bucket straight off.
   */
  fit?: "cover" | "contain";
}) {
  const slides: Slide[] = images.map((image, i) => ({ key: `i${i}:${image.src}`, image }));
  const films = videos ?? [];
  const hasFilm = films.length > 0;

  /* Photographs lead. A buyer comparing machines is reading the spec and
     glancing at the frames; the film is a deliberate second choice. */
  const [mode, setMode] = useState<"images" | "video">("images");
  const [active, setActive] = useState(0);
  /* Full-screen viewing. Kept here rather than inside the frame so the
     lightbox and the inline gallery stay on the same index — closing it leaves
     the visitor on the frame they were looking at. */
  const [fullscreen, setFullscreen] = useState(false);
  /** Which way the last change moved, so the incoming frame enters from the right side. */
  const [dir, setDir] = useState(0);
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const count = slides.length;

  const go = useCallback(
    (next: number, direction: number) => {
      if (count === 0) return;
      setDir(direction);
      setActive(((next % count) + count) % count);
    },
    [count],
  );

  const step = useCallback((d: number) => go(active + d, d), [active, go]);

  // Arrow keys drive the gallery only while it actually holds focus, so they
  // keep working for the rest of the page.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [step]);

  if (count === 0) return null;
  const current = slides[active] ?? slides[0];
  const multiple = count > 1;
  const showFilm = mode === "video" && hasFilm;

  return (
    <div className="w-full min-w-0">
      {/* --------------------------------------------------------- the tabs */}
      {/* Only rendered when there is actually a film. A machine with none
          shows no control at all rather than a dead or disabled one. */}
      {hasFilm ? (
        <div role="tablist" aria-label={`${name} media`} className="mb-3 flex gap-2">
          {(
            [
              ["images", `Images${count > 1 ? ` (${count})` : ""}`],
              ["video", "Detail video"],
            ] as const
          ).map(([value, label]) => {
            const isActive = mode === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setMode(value)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-[3px] border px-4 py-2",
                  "font-display text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                  isActive
                    ? "border-navy-700 bg-navy-700 text-white"
                    : "border-steel-200 bg-white text-navy-700 hover:border-navy-400 hover:bg-navy-50",
                )}
              >
                {value === "video" ? <PlayIcon className="text-[0.9em]" /> : null}
                {label}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* ---------------------------------------------------- the media window
       *
       * One window, one shape. The film and the photographs share the same
       * 16:9 box and the same border, so switching tabs swaps the content
       * without the page reflowing around it.
       */}
      <div
        className={cn(
          "w-full min-w-0 overflow-hidden rounded-[3px] border border-steel-200",
          showFilm ? "bg-navy-950" : fit === "contain" ? "bg-white" : "bg-steel-50",
        )}
      >
        {showFilm ? (
          /* `preload="none"` so a 10 MB film is not pulled on page load — it
             downloads when the tab is opened and play is pressed. The poster
             carries the frame until then. */
          <video
            key={films[0].src}
            src={films[0].src}
            poster={films[0].poster.src}
            controls
            playsInline
            preload="none"
            aria-label={`${films[0].title} — ${name}`}
            className="block aspect-video w-full bg-navy-950 object-contain"
          />
        ) : (
          <div
            ref={frameRef}
            tabIndex={multiple ? 0 : -1}
            role={multiple ? "group" : undefined}
            aria-roledescription={multiple ? "carousel" : undefined}
            aria-label={multiple ? `${name} media, ${count} items` : undefined}
            className={cn(
              "relative aspect-video w-full overflow-hidden",
              // Vertical panning stays with the page; only horizontal is ours.
              multiple && "touch-pan-y",
            )}
          >
            <AnimatePresence custom={dir} initial={false} mode="popLayout">
              <motion.div
                key={current.key}
                custom={dir}
                className="absolute inset-0"
                // A frame arrives from the side it is travelling from, so the
                // gesture and the motion agree. Thumbnail jumps pass dir 0 and
                // simply cross-fade, since there is no direction to honour.
                initial={{ opacity: 0, x: reduceMotion ? 0 : dir * 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduceMotion ? 0 : dir * -48 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
                drag={multiple ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) < SWIPE_PX) return;
                  step(info.offset.x < 0 ? 1 : -1);
                }}
              >
                <Image
                  src={current.image.src}
                  alt={current.image.alt}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  // Dragging an image fires the browser's native drag-and-drop,
                  // which cancels the pointer stream mid-swipe.
                  draggable={false}
                  className={cn(
                    "pointer-events-none select-none",
                    fit === "contain" ? "object-contain p-5" : "object-cover",
                  )}
                />
              </motion.div>
            </AnimatePresence>

            {multiple ? (
              <>
                {([-1, 1] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => step(d)}
                    aria-label={d < 0 ? "Previous item" : "Next item"}
                    className={cn(
                      "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full",
                      "bg-white/90 text-navy-800 shadow-[0_6px_20px_-8px_rgba(0,17,46,0.6)] backdrop-blur-sm",
                      "transition-all duration-300 hover:bg-amber-500 hover:text-navy-900 active:scale-95",
                      "md:h-11 md:w-11",
                      d < 0 ? "left-3 md:left-4" : "right-3 md:right-4",
                    )}
                  >
                    <ChevronRightIcon className={cn("text-lg", d < 0 && "rotate-180")} />
                  </button>
                ))}

                <p
                  aria-hidden="true"
                  className="absolute right-3 bottom-3 z-10 rounded-[2px] bg-navy-900/75 px-2.5 py-1 font-display text-[0.6875rem] font-semibold tracking-[0.1em] text-white tabular-nums md:right-4 md:bottom-4"
                >
                  {active + 1} / {count}
                </p>
              </>
            ) : null}

            {/* Full screen. A button rather than making the frame itself
                clickable: the frame is draggable, and a drag that ends inside
                it would otherwise be read as a click and throw the visitor
                into the lightbox every time they swiped. */}
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              aria-label={`View ${name} photographs full screen`}
              className={cn(
                "absolute left-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full md:left-4 md:bottom-4",
                "bg-navy-900/75 text-white backdrop-blur-sm transition-colors",
                "hover:bg-amber-500 hover:text-navy-900 active:scale-95",
              )}
            >
              <ExpandIcon className="text-base" />
            </button>
          </div>
        )}
      </div>

      {/* -------------------------------------------------------- thumbnails
       *
       * A horizontal strip, not a grid. C75 carries 25 frames and C95 carries
       * 21; as a five-column grid that is five rows of thumbnails pushing the
       * specification below the fold, and the gallery ends up dominating a page
       * that exists to sell on numbers. One scrolling row is the same control
       * at a fixed height, and behaves identically whether a machine has three
       * frames or twenty-five.
       *
       * The strip is hidden while the film is showing: it controls the
       * photographs, and leaving it under a playing video offers a control that
       * does not act on what is on screen.
       */}
      {multiple && !showFilm ? (
        <ul className="mt-3 flex w-full min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto pb-1">
          {slides.map((slide, i) => {
            const thumb = slide.image;
            const label = `Show photo ${i + 1} of ${name}`;
            return (
              <li
                key={slide.key}
                /* Percentage basis, never a pixel width: four-and-a-bit
                   thumbnails to a row at any viewport, and nothing that can
                   out-measure the column it sits in. */
                className="w-[22%] shrink-0 grow-0 basis-[22%] snap-start sm:w-[18%] sm:basis-[18%]"
              >
                <button
                  type="button"
                  onClick={() => go(i, i > active ? 1 : -1)}
                  aria-label={label}
                  aria-current={i === active}
                  className={cn(
                    "relative block aspect-square w-full overflow-hidden rounded-[2px] border transition-all duration-300",
                    fit === "contain" ? "bg-white" : "bg-steel-50",
                    i === active
                      ? "border-navy-700 ring-1 ring-navy-700"
                      : "border-steel-200 opacity-70 hover:opacity-100",
                  )}
                >
                  <Image
                    src={thumb.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="140px"
                    className={cn(fit === "contain" ? "object-contain p-1.5" : "object-cover")}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {fullscreen ? (
        <Lightbox
          images={images}
          index={active}
          onClose={() => setFullscreen(false)}
          onIndexChange={(next) => go(next, next > active ? 1 : -1)}
          fit={fit}
          label={name}
        />
      ) : null}
    </div>
  );
}
