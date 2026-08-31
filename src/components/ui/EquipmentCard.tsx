import Image from "next/image";
import Link from "next/link";
import type { Equipment } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Button";
import { routes } from "@/lib/routes";

/**
 * Equipment card used across the catalogue, homepage and industry pages.
 * The whole card is one link target.
 *
 * THE PICTURE LEADS, THE FIGURES FOLLOW.
 *
 * The cutout takes the top of the card because a row of machines is what a
 * buyer scans first, but the card still has to answer "which one is this" —
 * stripped back to a model name it made the visitor open every tile to find
 * out. So the summary and the two key figures sit under the picture, clamped
 * short: enough to choose between an eight-tonne and a fifteen-tonne machine
 * without opening either, and not so much that the tile becomes a document.
 *
 * ONE SIZE FOR EVERY MACHINE.
 *
 * The frame is 5:4 and the cutouts are authored 5:4 (see
 * `scripts/normalise-cutouts.mjs`), so `object-contain` maps each file onto the
 * tile exactly and every machine arrives at the scale the artwork was
 * normalised to. Nothing here re-frames the picture: the padding and the
 * baseline the machines stand on are baked into the files, precisely so that
 * ten tiles cannot each crop their machine differently. Adding padding back on
 * this side would double it and undo the normalisation.
 *
 * TWO IMAGE TREATMENTS, PICKED FROM THE DATA.
 *
 * The client wants catalogue listings to show the studio cutout — the machine
 * isolated on white — because a row of cutouts reads as a product range, while
 * a row of on-site photos reads as a photo album. A record with no cutout falls
 * back to its photograph, which brings its own background and so gets covered
 * and a ground to sit on rather than contained.
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
      {/* A cutout gets no tinted tile behind it — it sits on the card itself
          with a soft shadow, so it reads as an object rather than a picture in
          a box. Only a photograph gets a ground to sit on. */}
      <div
        className={cn(
          "relative aspect-[5/4] overflow-hidden",
          cutout ? "bg-white" : "bg-steel-100",
        )}
      >
        <Image
          src={display.src}
          alt={display.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={cn(
            "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            cutout
              ? "object-contain drop-shadow-[0_14px_12px_rgba(0,17,46,0.13)] group-hover:scale-[1.05]"
              : "object-cover group-hover:scale-[1.04]",
          )}
          style={display.focus ? { objectPosition: display.focus } : undefined}
        />
        <div className="absolute left-0 top-0 bg-navy-800/90 px-2.5 py-1 font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm md:px-3 md:py-1.5 md:text-[0.6875rem]">
          {item.brand}
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-steel-100 p-3.5 md:p-4">
        <h3 className="text-base font-bold uppercase leading-tight tracking-tight text-navy-800 sm:text-lg md:text-xl">
          {item.model}
        </h3>

        {/* Two lines in a two-up phone column, three once the tile is wide
            enough to make a third worth reading. */}
        <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-steel-600 sm:line-clamp-3 md:text-sm">
          {item.summary}
        </p>

        {keyHighlights.length > 0 ? (
          /* Stacked in a narrow column and side by side from `sm`: at two
             cards to a phone screen, "Operating weight" and "Bucket capacity"
             cannot share a row without breaking one word to a line. */
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

        <span className="mt-auto inline-flex items-center gap-1.5 pt-3.5 font-display text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-navy-700 transition-colors group-hover:text-amber-600 sm:text-[0.6875rem] sm:tracking-[0.1em] md:text-[0.75rem]">
          View specifications
          <ArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
