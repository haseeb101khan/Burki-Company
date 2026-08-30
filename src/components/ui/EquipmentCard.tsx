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
 * THE MACHINE IS THE CARD.
 *
 * This carried a three-line summary and two key figures under the picture,
 * which made the tile mostly text and left the cutout a band across the top.
 * On the client's call the picture now takes the card and the text is the model
 * name and the way in — a catalogue page is a visitor scanning a range for the
 * shape of the machine they want, and they compare figures on the detail page
 * once they have picked one. The summary and the highlights are still on that
 * page; nothing was lost, it was moved to where it gets read.
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
  className,
  priority = false,
}: {
  item: Equipment;
  className?: string;
  priority?: boolean;
}) {
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
            /* Tight padding: with nothing else competing for the card, the
               machine is allowed to fill its frame. */
            cutout
              ? "object-contain object-bottom p-2.5 pb-[7%] drop-shadow-[0_14px_12px_rgba(0,17,46,0.13)] group-hover:scale-[1.05]"
              : "object-cover group-hover:scale-[1.04]",
          )}
          style={display.focus ? { objectPosition: display.focus } : undefined}
        />
        <div className="absolute left-0 top-0 bg-navy-800/90 px-2.5 py-1 font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm md:px-3 md:py-1.5 md:text-[0.6875rem]">
          {item.brand}
        </div>
      </div>

      {/* Sized to stay on one line in a two-up phone column — "View
          specifications" wrapping under its own arrow was the tell that the old
          card was built for a wider tile. */}
      <div className="flex flex-1 flex-col gap-2 border-t border-steel-100 p-3.5 md:p-4">
        <h3 className="text-base font-bold uppercase leading-tight tracking-tight text-navy-800 sm:text-lg md:text-xl">
          {item.model}
        </h3>

        <span className="mt-auto inline-flex items-center gap-1.5 font-display text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-navy-700 transition-colors group-hover:text-amber-600 sm:text-[0.6875rem] sm:tracking-[0.1em] md:text-[0.75rem]">
          View specifications
          <ArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
