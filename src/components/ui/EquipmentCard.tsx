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
 * TWO IMAGE TREATMENTS, PICKED FROM THE DATA.
 *
 * The client wants catalogue listings to show the studio cutout — the machine
 * isolated on white — because a row of cutouts reads as a product range, while
 * a row of on-site photos reads as a photo album. But a cutout cannot be
 * treated like a photograph: `object-cover` crops a bucket or a counterweight
 * off the edge of the frame, and the machine no longer sits on its own ground.
 *
 * So a cutout gets `object-contain` on a pale ground with padding, and grows
 * slightly on hover. A record with no cutout falls back to its photograph and
 * the original cover treatment, which is what every machine looked like before
 * and still looks right.
 */
export function EquipmentCard({
  item,
  categoryLabel,
  className,
  priority = false,
}: {
  item: Equipment;
  categoryLabel?: string;
  className?: string;
  priority?: boolean;
}) {
  /* Two key figures are enough on a card; the rest belong on the detail page. */
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
          a box. Only a photograph, which brings its own background, gets a
          ground to sit on. */}
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden",
          cutout ? "bg-white" : "bg-steel-100",
        )}
      >
        <Image
          src={display.src}
          alt={display.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className={cn(
            "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            cutout
              ? "object-contain object-bottom p-4 pb-[9%] drop-shadow-[0_14px_12px_rgba(0,17,46,0.13)] group-hover:scale-[1.05]"
              : "object-cover group-hover:scale-[1.04]",
          )}
          style={display.focus ? { objectPosition: display.focus } : undefined}
        />
        <div className="absolute left-0 top-0 bg-navy-800/90 px-3 py-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {item.brand}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        {categoryLabel ? (
          <p className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-steel-500">
            {categoryLabel}
          </p>
        ) : null}

        <h3 className="mt-2 text-xl font-bold uppercase leading-tight tracking-tight text-navy-800 md:text-2xl">
          {item.model}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-steel-600">
          {item.summary}
        </p>

        {keyHighlights.length > 0 ? (
          <dl className="mt-5 grid gap-px overflow-hidden rounded-[2px] bg-steel-200 sm:grid-cols-2">
            {keyHighlights.map((highlight) => (
              <div key={highlight.label} className="bg-steel-50 px-3 py-2.5">
                <dt className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-steel-500 line-clamp-2">
                  {highlight.label}
                </dt>
                <dd className="mt-1 font-display text-sm sm:text-base font-semibold tabular-nums text-navy-700">
                  {highlight.value}
                  {highlight.unit ? (
                    <span className="ml-1 text-xs font-medium text-steel-500">
                      {highlight.unit}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <span className="mt-5 inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-navy-700 transition-colors group-hover:text-amber-600">
          View specifications
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
