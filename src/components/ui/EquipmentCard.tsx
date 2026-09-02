import Image from "next/image";
import Link from "next/link";
import type { Equipment } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Button";
import { routes } from "@/lib/routes";

/**
 * Equipment card used across the catalogue. The whole card is one link target.
 *
 * THE PANEL IS THE MANUFACTURER'S OWN CARD, IN OUR COLOURS.
 *
 * Modelled on Xinyuan's product cards, which the client asked for: a dotted
 * field, a diagonal band behind the machine, the maker top left, the model top
 * right, and a "view specifications" ribbon across the foot. Theirs is yellow;
 * this is the navy.
 *
 * THE BAND IS LIGHT BLUE, NOT NAVY, AND THAT IS THE ONE DELIBERATE DEPARTURE.
 * Their yellow works because the machines are near-black and the band is the
 * brightest thing on the card. Swapping yellow for navy would have put a dark
 * band behind a dark machine and lost the boom and the tyres into it. The band
 * carries the blue at a tint the cutouts read against; the ribbon and the type
 * carry it at full strength, so the card is unmistakably navy without eating
 * the thing it is selling.
 *
 * ONLY CUTOUTS GET THE PANEL. A machine with no cutout falls back to its
 * photograph, which brings its own background — a dotted field and a diagonal
 * band behind a full-bleed photo would be decoration stacked on decoration. It
 * keeps the plain covered treatment it always had.
 */
export function EquipmentCard({
  item,
  className,
  priority = false,
}: {
  item: Equipment;
  className?: string;
  priority?: boolean;
}) {
  /* Two figures is the most a narrow tile holds without the labels wrapping
     into columns of single words. The rest are on the detail page. */
  const keyHighlights = item.highlights.slice(0, 2);

  const cutout = item.cutoutImage;
  const display = cutout ?? item.image;

  return (
    <Link
      href={routes.equipmentItem(item)}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[3px] border border-steel-200 bg-white",
        "transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        "hover:border-navy-300 hover:shadow-[0_22px_44px_-28px_rgba(0,17,46,0.5)] focus-visible:border-navy-400",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[5/4] overflow-hidden",
          cutout ? "bg-white" : "bg-steel-100",
        )}
      >
        {cutout ? (
          <>
            {/* The dotted field. A plain grid rather than their world map: a
                map traced in dots is their brand's device, not ours. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 [background-image:radial-gradient(circle,rgba(0,38,101,0.13)_1px,transparent_1px)] [background-size:13px_13px]"
            />

            {/* Two diagonals, thick over thin, as on the original. Behind the
                machine in the DOM, so the cutout sits on top of them. */}
            <span
              aria-hidden="true"
              className="absolute -left-[12%] bottom-[15%] h-[19%] w-[128%] -rotate-[13deg] bg-navy-200"
            />
            <span
              aria-hidden="true"
              className="absolute -left-[12%] bottom-[9%] h-[5%] w-[128%] -rotate-[13deg] bg-navy-300/70"
            />
          </>
        ) : null}

        <Image
          src={display.src}
          alt={display.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={cn(
            "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            /* Inset so the machine clears the maker and model above it and the
               ribbon below, rather than running under either. */
            cutout
              ? "object-contain px-3 pt-8 pb-9 drop-shadow-[0_10px_9px_rgba(0,17,46,0.14)] group-hover:scale-[1.05] md:pt-9 md:pb-10"
              : "object-cover group-hover:scale-[1.04]",
          )}
          style={display.focus ? { objectPosition: display.focus } : undefined}
        />

        {cutout ? (
          <>
            {/* Maker left, model right, as the reference sets them. */}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 px-3 pt-2.5 md:px-4 md:pt-3">
              <span className="font-display text-[0.625rem] font-bold uppercase tracking-[0.14em] text-navy-700 md:text-[0.6875rem]">
                {item.brand}
              </span>
              <span className="font-display text-base font-bold uppercase leading-none tracking-tight text-navy-800 sm:text-lg md:text-xl">
                {item.model}
              </span>
            </div>

            {/* The ribbon. Angled ends by clip-path rather than by rotating a
                box, so it stays flush to the panel's bottom edge at any width. */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center">
              <span
                className={cn(
                  "w-[86%] bg-navy-700 py-1.5 text-center transition-colors duration-300 group-hover:bg-amber-500",
                  "font-display text-[0.5625rem] font-bold uppercase tracking-[0.12em] text-white group-hover:text-navy-900",
                  "[clip-path:polygon(4%_0,100%_0,96%_100%,0_100%)]",
                  "sm:text-[0.625rem] md:py-2 md:text-[0.6875rem] md:tracking-[0.16em]",
                )}
              >
                View specifications
              </span>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col border-t border-steel-100 p-3.5 md:p-4">
        {/* The model is on the panel now, so this is the descriptive line — the
            job the long product title does on the reference card. */}
        <p className="line-clamp-2 text-[0.8125rem] leading-relaxed text-steel-600 sm:line-clamp-3 md:text-sm">
          {item.summary}
        </p>

        {keyHighlights.length > 0 ? (
          /* Stacked in a narrow column and side by side from `sm`: at two cards
             to a phone screen, "Operating weight" and "Bucket capacity" cannot
             share a row without breaking one word to a line. */
          <dl className="mt-3.5 grid gap-px overflow-hidden rounded-[2px] bg-steel-200 sm:grid-cols-2">
            {keyHighlights.map((highlight) => (
              <div key={highlight.label} className="min-w-0 bg-steel-50 px-2.5 py-2">
                <dt className="text-[0.5625rem] font-medium uppercase leading-[1.3] tracking-[0.08em] text-steel-500 md:text-[0.625rem] md:tracking-[0.1em]">
                  {highlight.label}
                </dt>
                <dd className="mt-0.5 whitespace-nowrap font-display text-[0.8125rem] font-semibold tabular-nums text-navy-700 sm:text-sm md:text-base">
                  {highlight.value}
                  {highlight.unit ? (
                    <span className="ml-1 text-[0.625rem] font-medium text-steel-500 md:text-xs">
                      {highlight.unit}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {/* Only where the panel has no ribbon to carry it. */}
        {cutout ? null : (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-3.5 font-display text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-navy-700 transition-colors group-hover:text-amber-600 sm:text-[0.6875rem] sm:tracking-[0.1em] md:text-[0.75rem]">
            View specifications
            <ArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </Link>
  );
}
