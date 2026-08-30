"use client";

import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  PointerEvent as ReactPointerEvent,
  RefObject,
  SVGProps,
} from "react";
import { ChevronRightIcon } from "@/components/ui/Icons";
import { Reveal, RevealMask } from "@/components/ui/Reveal";
import type { Highlight } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { OrbitItem } from "./orbitItem";

/* ══════════════════════════════════════════════════════════ the geometry ══
 *
 * The whole section is one curve. A quadratic Bézier whose two ends sit level
 * and whose control point is lifted by the same amount above the apex traces
 * an exact parabola:
 *
 *   M 0,(apex+depth)  Q W/2,(apex-depth)  W,(apex+depth)
 *   ⇒  y(x) = apex + depth · u²,  u = (x − W/2) / (W/2)
 *
 * so `curveY` below and the rendered <path> are guaranteed to agree — a
 * machine placed with `curveY` is standing *on* the drawn path, not near it.
 *
 * Machines are spaced by ANGLE, not by pixels: x = A·sin(θ), θ stepping 40°
 * per slot. That is the horizontal projection of a body travelling a circle,
 * so outer machines bunch toward the edges the way real ones would as they
 * swing away from the viewer. Even pixel spacing is what makes this sort of
 * thing read as flat cards sitting on a decorative squiggle.
 */

const STEP_DEG = 40;
const RAD = Math.PI / 180;
/** How far past each edge the path keeps running, as a fraction of width. */
const OVERRUN = 0.14;
/** Below this the arc carries two neighbours instead of four. */
const COMPACT_AT = 620;

const xFactor = (o: number) =>
  Math.sin(o * STEP_DEG * RAD) / Math.sin(2 * STEP_DEG * RAD);

/** Cosine falloff, sharpened — drives every "how central am I" quantity. */
function centrality(o: number, power: number) {
  const c = Math.cos(Math.max(-2.25, Math.min(2.25, o)) * STEP_DEG * RAD);
  return Math.pow(Math.max(0, c), power);
}

/** Machine box, wide enough for the longest loader; images are object-contain. */
const IMG_ASPECT = 1.62;

const imgScaleAt = (o: number) => 0.34 + 0.66 * centrality(o, 4);

type Geom = {
  w: number;
  topH: number;
  depth: number;
  imgH: number;
  /** Horizontal spread as a fraction of width, measured to the outermost slot. */
  spread: number;
  /** Last slot that stays on the arc; beyond it a machine has faded out. */
  maxSlot: number;
  /** Width of one identity block. Derived — see `geometry`. */
  infoW: number;
  /** Whether off-centre machines can afford their three numbers under the name. */
  neighbourStats: boolean;
  /**
   * Phone layout. A 360px arc cannot carry five machines *and* five sets of
   * numbers — the identity blocks are wider than the gap between slots and
   * simply pile on top of each other. Narrow screens therefore run a shorter
   * orbit: two neighbours instead of four, pushed out to the edges, and only
   * the centred machine named. The concept survives; the collisions do not.
   */
  compact: boolean;
  /** Clearance between the bottom of a machine box and its node on the path. */
  lift: number;
  stroke: number;
  height: number;
};

function geometry(w: number): Geom {
  const compact = w < COMPACT_AT;
  const imgH = Math.max(104, Math.min(268, w * (compact ? 0.3 : 0.205)));
  const depth = Math.max(30, Math.min(112, w * 0.078));
  const stroke = w < 640 ? 8 : w < 1024 ? 10 : 12;
  const topH = imgH + 18;
  const bottomH = compact ? 205 : Math.max(178, Math.min(232, w * 0.19));
  const spread = compact ? 0.62 : 0.46;

  /**
   * How wide one machine's name-and-numbers block may be.
   *
   * The blocks are centred on their nodes, so two neighbours collide as soon as
   * their half-widths exceed the gap between slots — and that gap is a fixed
   * fraction of width while a fixed `max-width` is not. Deriving the block from
   * the spacing is what keeps the text apart at 700px as well as at 1500px; a
   * constant here reads fine on a desktop and prints the neighbours' numbers
   * straight through the centred machine's tagline on a tablet.
   *
   * Off-centre blocks are also lighter than the centred one: below 1100px they
   * drop to the model name alone, which is what buys the narrower gap.
   */
  const neighbourStats = w >= 1100;
  const infoW = compact
    ? Math.min(416, w * 0.92)
    : Math.min(416, w * 0.6 - (neighbourStats ? 0 : 130));

  const g: Geom = {
    w,
    topH,
    depth,
    imgH,
    spread,
    maxSlot: compact ? 1 : 2,
    infoW,
    neighbourStats,
    compact,
    lift: 0,
    stroke,
    height: 0,
  };

  /**
   * How far a machine has to stand off its node so the arc never runs through
   * its box.
   *
   * The boxes are rectangles and the path is a curve, so an off-centre machine
   * has the path climbing into its inboard corner — worst at the corner
   * nearest the apex. Eyeballing a fixed gap works at one viewport and fails
   * at the next, because both the arc's depth and the machines scale with
   * width but not at the same rate. Measuring the actual climb across each box
   * keeps them clear at every size.
   */
  let need = 0;
  for (let o = 1; o <= g.maxSlot; o++) {
    const hw = (imgH * IMG_ASPECT * imgScaleAt(o)) / 2;
    const p = slotPoint(-o, g); // left half; the path rises to its right
    need = Math.max(need, p.y - curveY(p.x + hw, g));
  }
  g.lift = Math.ceil(need + stroke / 2 + 8);
  g.height = topH + depth + bottomH;
  return g;
}

/** Where the path sits at a given x. */
const curveY = (x: number, g: Geom) => {
  const u = (x - g.w / 2) / (g.w / 2);
  return g.topH + g.depth * u * u;
};

/** Slot offset → point on the path. */
function slotPoint(o: number, g: Geom) {
  const x = g.w / 2 + g.spread * g.w * xFactor(o);
  return { x, y: curveY(x, g) };
}

/**
 * The <path> for `curveY`, run out past both edges so the arc reads as part of
 * something larger than the section.
 *
 * A symmetric quadratic traces y = c + k·τ² with c = (yEnd + yCtrl)/2 and
 * k = (yEnd − yCtrl)/2, so reproducing `curveY` over a *wider* span means
 * lifting the control point by the same amount the ends drop — not by `depth`.
 * Getting this wrong is invisible in the markup and obvious on screen: the
 * machines stand off the line they are supposed to be riding.
 */
function curvePath(g: Geom) {
  const x0 = -OVERRUN * g.w;
  const x1 = g.w * (1 + OVERRUN);
  const drop = g.depth * (1 + 2 * OVERRUN) ** 2;
  return `M ${x0},${g.topH + drop} Q ${g.w / 2},${g.topH - drop} ${x1},${g.topH + drop}`;
}

/* ═══════════════════════════════════════════════════════════════ spec bits ══ */

/**
 * Three numbers per machine, chosen by meaning rather than by array order, so
 * the row reads consistently across models whose `highlights` were authored in
 * different orders (power · capacity · mass). Anything unmatched falls through
 * to source order, so a machine with unusual highlights still shows three.
 */
const PRIORITY = [
  /power|output|engine/i,
  /bucket|capacity/i,
  /weight|mass/i,
  /load/i,
];

function pickSpecs(highlights: Highlight[]): Highlight[] {
  const out: Highlight[] = [];
  for (const rx of PRIORITY) {
    if (out.length >= 3) break;
    const hit = highlights.find((h) => rx.test(h.label) && !out.includes(h));
    if (hit) out.push(hit);
  }
  for (const h of highlights) {
    if (out.length >= 3) break;
    if (!out.includes(h)) out.push(h);
  }
  return out.slice(0, 3);
}

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Spec glyphs. Local to this section on purpose: they annotate *highlight
 * rows*, a different job from the category silhouettes in EquipmentIcons, and
 * nothing else needs them.
 */
const glyph = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const PowerGlyph = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path
      d="M4.5 15.5v-4a2 2 0 0 1 2-2h2l2-2h3.5v8H6.5a2 2 0 0 0-2 2"
      {...glyph}
    />
    <path d="M14 7.5h3l2.5 3.5v4.5H14" {...glyph} />
    <path d="M9 5.5v-2M12 5.5v-2M7.5 15.5v3M17 15.5v3" {...glyph} />
  </svg>
);

const BucketGlyph = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path
      d="M4.5 8h15l-2.6 8.2a2 2 0 0 1-1.9 1.4H9a2 2 0 0 1-1.9-1.4L4.5 8Z"
      {...glyph}
    />
    <path d="M4.5 8 3.5 4.5M19.5 8 21 5" {...glyph} />
    <path d="M8.5 17.6v2.4M12 17.6v2.4M15.5 17.6v2.4" {...glyph} />
  </svg>
);

const WeightGlyph = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path
      d="M6.6 8h10.8l1.8 10.8a1.4 1.4 0 0 1-1.4 1.7H6.2a1.4 1.4 0 0 1-1.4-1.7L6.6 8Z"
      {...glyph}
    />
    <path d="M9.8 8a2.2 2.2 0 1 1 4.4 0" {...glyph} />
  </svg>
);

const GaugeGlyph = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path d="M4.5 17.5a7.5 7.5 0 1 1 15 0" {...glyph} />
    <path d="M12 17.5 15.5 12" {...glyph} />
  </svg>
);

function specGlyph(label: string) {
  if (/power|output|engine/i.test(label)) return PowerGlyph;
  if (/bucket|capacity/i.test(label)) return BucketGlyph;
  if (/weight|mass|load/i.test(label)) return WeightGlyph;
  return GaugeGlyph;
}

/* ══════════════════════════════════════════════════════════════ one machine ══ */

/**
 * A single machine riding the path.
 *
 * `lap` is the wrap offset. Every machine renders three times — one lap back,
 * in place, one lap forward — each copy fading out past the ends of the visible
 * arc. That is what closes the orbit: the machine sliding off the right edge
 * *is* the one already easing in on the left, so nothing pops in or out of
 * existence mid-travel and no subtree unmounts while a drag is in flight.
 */
function OrbitNode({
  item,
  index,
  lap,
  count,
  pos,
  geom,
  onFocusNode,
  suppressClick,
}: {
  item: OrbitItem;
  index: number;
  lap: number;
  count: number;
  pos: MotionValue<number>;
  geom: Geom;
  onFocusNode: () => void;
  suppressClick: RefObject<boolean>;
}) {
  const offset = useTransform(pos, (p) => index - p + lap * count);

  const x = useTransform(offset, (o) => slotPoint(o, geom).x);
  const y = useTransform(offset, (o) => slotPoint(o, geom).y);

  const imgScale = useTransform(offset, imgScaleAt);
  const textScale = useTransform(offset, (o) => 0.46 + 0.54 * centrality(o, 4));
  const dotScale = useTransform(offset, (o) => 0.55 + 0.45 * centrality(o, 4));

  // Visible out to the last slot, then a short fade so the wrap is never a pop.
  const { maxSlot } = geom;
  const opacity = useTransform(offset, (o) => {
    const a = Math.abs(o);
    const edge = 1 - 0.22 * maxSlot;
    if (a <= maxSlot) return 1 - 0.22 * a;
    return Math.max(0, edge * (1 - (a - maxSlot) / 0.4));
  });
  const zIndex = useTransform(offset, (o) => Math.round(40 - Math.abs(o) * 10));
  /**
   * `visibility`, not just `pointer-events`: rendering every machine on three
   * laps means most copies are parked off the arc at zero opacity, and a
   * transparent link is still tabbable and still announced. Hiding them takes
   * them out of the tab order and the accessibility tree, so a keyboard user
   * walks the four machines on screen rather than twelve.
   */
  const visibility = useTransform(opacity, (o) =>
    o > 0.02 ? "visible" : "hidden",
  );

  /**
   * The full block (tagline + iconed specs) belongs to the centred machine
   * only; the compact stat line takes over the moment it swings away. The two
   * ranges are kept disjoint — lead is gone by |o| = 0.2, compact starts at
   * 0.2 — because they share the same slot, and any overlap prints one on top
   * of the other for the length of the handoff.
   */
  const leadOpacity = useTransform(offset, (o) =>
    Math.max(0, 1 - Math.abs(o) * 5),
  );
  const compactOpacity = useTransform(offset, (o) =>
    geom.neighbourStats ? Math.max(0, Math.min(1, (Math.abs(o) - 0.2) * 5)) : 0,
  );
  /**
   * On a phone the identity block belongs to the centred machine alone — the
   * neighbours ride the track unlabelled, because at that width their names
   * would land on top of the centred machine's numbers.
   */
  const infoOpacity = useTransform(offset, (o) =>
    geom.compact ? Math.max(0, 1 - Math.abs(o) * 3) : 1,
  );

  const specs = pickSpecs(item.figures);
  const cutout = item.cutout;
  const photo = cutout ?? item.photo;

  return (
    <motion.div
      className="absolute top-0 left-0 w-0"
      style={{ x, y, zIndex, opacity, visibility }}
      /**
       * The server and the client agree on the geometry but not on how to
       * write it down: SSR serialises the motion values into a style string
       * (`translateX(112.67px)`, `z-index: "-20"`) while React's client render
       * holds them as an object of raw numbers (`112.66969087481795`, `-20`).
       * The positions are identical — only the formatting differs, and no
       * amount of rounding reconciles a number against its own string form.
       * Motion writes the authoritative values on mount either way.
       */
      suppressHydrationWarning
    >
      <Link
        href={item.href}
        onClick={(e) => {
          if (suppressClick.current) e.preventDefault();
        }}
        onFocus={onFocusNode}
        aria-label={`${item.name} — view details`}
        className="group block rounded-[3px] outline-offset-8"
        draggable={false}
      >
        {/* ----------------------------------------- machine, above the path */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: geom.lift,
            scale: imgScale,
            originX: 0.5,
            originY: 1,
          }}
        >
          <div
            className="relative"
            style={{ width: geom.imgH * IMG_ASPECT, height: geom.imgH }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 70vw, 520px"
              draggable={false}
              className={cn(
                "select-none",
                "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-hover:-translate-y-1.5",
                // A cutout is contained and stood on its baseline so the
                // machine keeps its real proportions. A photo is covered
                // instead: the edge feather below is applied to the element
                // box, and `contain` letterboxes the picture away from that
                // box, so the fade would land on empty space and leave the
                // photo's own hard edge showing.
                cutout ? "object-contain object-bottom" : "object-cover",
                // The white-point lift that used to sit here is gone. It existed
                // to clip a cutout's near-white surround (248-253) to 255 so it
                // stopped printing a faint grey rectangle on the page. The
                // cutouts now have their background genuinely removed — see
                // scripts/lib/cutout.mjs — so there is nothing left to clip and
                // the lift would only wash out the machine itself.
                cutout
                  ? ""
                  : // No cutout for this model, so the photo brings its own
                    // background. Two crossed linear masks feather the four
                    // edges into the page — a radial one large enough to keep
                    // the machine intact finishes its fade outside the box and
                    // leaves the hard rectangle exactly where it was.
                    "[mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent),linear-gradient(to_bottom,transparent,#000_11%,#000_89%,transparent)] " +
                    "[mask-composite:intersect] [-webkit-mask-composite:source-in]",
              )}
            />
          </div>
        </motion.div>

        {/* ------------------------------------------------- node, on the path */}
        <motion.span
          aria-hidden="true"
          className="absolute top-0 left-1/2 block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-navy-700 bg-white transition-colors duration-300 group-hover:border-amber-500"
          style={{ scale: dotScale }}
        />

        {/* -------------------------------------------- identity, below the path */}
        {/* The 42px drop clears the path itself: near the apex the curve is
            almost flat, so a tighter gap puts the model name straight through
            the stroke. */}
        <motion.div
          className="absolute top-[42px] left-1/2 -translate-x-1/2 text-center"
          style={{
            width: geom.infoW,
            scale: textScale,
            originX: 0.5,
            originY: 0,
            opacity: infoOpacity,
          }}
        >
          <p className="font-display text-[2.1rem] leading-none font-bold tracking-tight text-navy-800 uppercase transition-colors duration-300 group-hover:text-navy-600">
            {item.title}
          </p>
          <span
            className="mx-auto mt-2.5 block h-[3px] w-9 bg-amber-500"
            aria-hidden="true"
          />

          {/* Both states occupy the same slot and cross-fade, so the text under
              the path never reflows as the machines travel. */}
          <div className="relative mt-3.5">
            <motion.div style={{ opacity: leadOpacity }}>
              {/* Clamped: some models carry a one-line tagline and others fall
                  back to a full summary sentence, and the block sits in a
                  fixed-height stage. */}
              <p className="line-clamp-2 text-[0.9rem] leading-relaxed text-steel-600">
                {item.subtitle}
              </p>

              <div className="mt-5 flex items-start justify-center divide-x divide-steel-200">
                {specs.map((s) => {
                  const Glyph = specGlyph(s.label);
                  return (
                    <div
                      key={s.label}
                      className="flex items-center gap-1.5 px-2.5 sm:gap-2.5 sm:px-5"
                    >
                      <Glyph className="hidden shrink-0 text-[1.55rem] text-navy-700/55 sm:block" />
                      <div className="text-center sm:text-left">
                        <p className="font-display text-[0.625rem] leading-none font-semibold tracking-[0.16em] text-steel-500 uppercase">
                          {s.label}
                        </p>
                        <p className="mt-1.5 font-display text-[1.05rem] leading-none font-bold text-navy-800">
                          {s.value}
                          {s.unit ? (
                            <span className="ml-1 text-[0.8rem] font-semibold text-steel-500">
                              {s.unit}
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="font-display mt-5 text-[0.6875rem] font-semibold tracking-[0.18em] text-navy-700 uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View specifications →
              </p>
            </motion.div>

            <motion.div
              className="absolute inset-x-0 top-0 space-y-1"
              style={{ opacity: compactOpacity }}
              aria-hidden="true"
            >
              {specs.map((s) => (
                <p
                  key={s.label}
                  className="text-[1rem] leading-snug text-steel-500"
                >
                  {s.value}
                  {s.unit ? ` ${s.unit}` : ""}
                </p>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════ the section ══ */

const ARROW =
  "flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-white " +
  "shadow-[0_10px_26px_-14px_rgba(0,17,46,0.9)] transition-all duration-300 " +
  "hover:bg-amber-500 hover:text-navy-900 active:scale-95 md:h-13 md:w-13";

/**
 * "Explore other variants" — the family of a series laid out along one deep
 * blue arc, machines standing above it and their numbers hanging below.
 *
 * The current model is never in `items`; the data layer excludes it.
 */
export function VariantOrbit({
  items,
  eyebrow,
  title,
  description,
  note,
}: {
  items: OrbitItem[];
  eyebrow?: string;
  title: string;
  description?: string;
  note?: string;
}) {
  const count = items.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  const [width, setWidth] = useState(1180);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  /**
   * One continuous position for the whole assembly, in slot units. Every
   * machine derives x/y/scale from it, which is why they travel *along* the
   * path together rather than each animating its own start→end tween — that
   * would cut straight chords across the curve and lose the orbit entirely.
   * Deliberately unbounded; wrapping is handled at render time by `lap`.
   */
  const pos = useMotionValue(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  useMotionValueEvent(pos, "change", (p) => {
    const next = ((Math.round(p) % count) + count) % count;
    setActive((prev) => (prev === next ? prev : next));
  });

  const settle = useCallback(
    (target: number) => {
      animate(
        pos,
        target,
        reduced
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 58,
              damping: 17,
              mass: 1.1,
              restDelta: 0.0005,
            },
      );
    },
    [pos, reduced],
  );

  /** Step by whole slots from wherever the assembly currently rests. */
  const step = useCallback(
    (dir: number) => settle(Math.round(pos.get()) + dir),
    [pos, settle],
  );

  /** Shortest way round to a given item, so the dots never take the long lap. */
  const goTo = useCallback(
    (i: number) => {
      const current = Math.round(pos.get());
      const here = ((current % count) + count) % count;
      let d = (((i - here) % count) + count) % count;
      if (d > count / 2) d -= count;
      settle(current + d);
    },
    [count, pos, settle],
  );

  const geom = geometry(width);
  /**
   * Pixels of travel that equal one slot, taken from the real gap between the
   * centre and its neighbour, so a swipe tracks the machine under the finger.
   */
  const stepPx = Math.max(90, geom.spread * width * xFactor(1));

  /* ------------------------------------------------------- drag / swipe ---- */
  const drag = useRef<{
    id: number;
    x: number;
    from: number;
    moved: number;
    captured: boolean;
  } | null>(null);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      from: pos.get(),
      moved: 0,
      captured: false,
    };
    suppressClick.current = false;
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    d.moved = Math.max(d.moved, Math.abs(dx));

    /**
     * Capture is taken on the first real movement, never on press.
     *
     * A pointer captured at pointerdown retargets the following `click` to the
     * capturing element, so capturing up front silently breaks every machine's
     * link — the press lands on the stage and the anchor never sees it.
     * Deferring means a tap stays a tap and a drag still gets the events it
     * needs once the finger leaves the stage.
     */
    if (d.moved > 6) {
      suppressClick.current = true;
      if (!d.captured) {
        e.currentTarget.setPointerCapture(e.pointerId);
        d.captured = true;
      }
    }
    if (d.captured) pos.set(d.from - dx / stepPx);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.captured) return; // a tap: leave the assembly alone, let the link run
    const dx = e.clientX - d.x;
    // A short flick still advances a slot; anything slower snaps to nearest.
    const target =
      Math.abs(dx) > 12 && Math.abs(dx) < stepPx * 0.5
        ? d.from + (dx < 0 ? 1 : -1)
        : pos.get();
    settle(Math.round(target));
    // Release the click guard after the click event that follows pointerup.
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  if (count === 0) return null;

  return (
    <div className="relative">
      {/* ------------------------------------------------------------ header */}
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow ? (
          <Reveal y={12}>
            <p className="font-display text-eyebrow inline-flex items-center gap-3 text-navy-700 uppercase">
              <span className="h-px w-7 bg-amber-500" aria-hidden="true" />
              {eyebrow}
              <span className="h-px w-7 bg-amber-500" aria-hidden="true" />
            </p>
          </Reveal>
        ) : null}

        <h2 className="text-display-md mt-4 text-navy-800 uppercase">
          <RevealMask delay={0.05}>{title}</RevealMask>
        </h2>

        {description ? (
          <Reveal delay={0.15} y={16}>
            <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-steel-600 md:text-base">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>

      {/* ------------------------------------------------------ stage + arrows */}
      <div className="relative">
        <Reveal delay={0.2} y={24}>
          <div
            ref={stageRef}
            className="relative mt-12 touch-pan-y select-none md:mt-16"
            style={{ height: geom.height }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            role="group"
            aria-roledescription="carousel"
            aria-label={`${title} — ${count} models`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                step(1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                step(-1);
              }
            }}
          >
            {/* The path — the same parabola the machines ride. `overflow-visible`
              is load-bearing: the arc deliberately leaves the viewBox. */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${geom.w} ${geom.height}`}
              fill="none"
              aria-hidden="true"
            >
              <path
                d={curvePath(geom)}
                stroke="var(--color-navy-700)"
                strokeWidth={geom.stroke}
                strokeLinecap="round"
              />
            </svg>

            {items.map((item, i) =>
              [-1, 0, 1].map((lap) => (
                <OrbitNode
                  key={`${item.id}:${lap}`}
                  item={item}
                  index={i}
                  lap={lap}
                  count={count}
                  pos={pos}
                  geom={geom}
                  onFocusNode={() => goTo(i)}
                  suppressClick={suppressClick}
                />
              )),
            )}
          </div>
        </Reveal>

        {/* Sat level with the outermost machines — above the path where it is
            lowest, so they read as controls on the track rather than floating
            over the copy. */}
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => step(dir)}
            aria-label={dir < 0 ? "Previous variant" : "Next variant"}
            className={cn(
              ARROW,
              "absolute z-50 -translate-y-1/2",
              dir < 0 ? "left-0" : "right-0",
            )}
            style={{ top: geom.topH * 0.9 }}
          >
            <ChevronRightIcon
              className={cn("text-lg", dir < 0 && "rotate-180")}
            />
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------- dots */}
      <div className="mt-10 flex items-center justify-center gap-3">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${item.title}`}
            aria-current={i === active}
            className={cn(
              "h-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              i === active
                ? "w-7 bg-navy-700"
                : "w-2.5 bg-steel-300 hover:bg-steel-400",
            )}
          />
        ))}
      </div>

      {note ? (
        <p className="mt-6 text-center text-[0.8125rem] text-steel-400">
          {note}
        </p>
      ) : null}
    </div>
  );
}
