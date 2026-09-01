import Image from "next/image";
import Link from "next/link";
import type { Part } from "@/lib/data";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * Parts card. Leads with the part number, because that is what a workshop
 * actually searches on.
 *
 * STACKED, NOT SIDE BY SIDE.
 *
 * This was a horizontal card — a small square thumbnail against a block of
 * text — which only works in a wide tile. Set two to a row on a phone it gave
 * the attachment about a thumbnail's worth of space and squeezed the name into
 * a column three words wide. Stacking it puts the tool across the full width of
 * its column and matches `EquipmentCard`, so a parts listing and a machine
 * listing read as the same catalogue.
 */
export function PartCard({
  part,
  compatibleLabel,
  className,
}: {
  part: Part;
  /** e.g. "Fits 5 machines" or "Compatible with LX-926". */
  compatibleLabel?: string;
  className?: string;
}) {
  return (
    <Link
      href={routes.part(part)}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[3px] border border-steel-200 bg-white",
        "transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        "hover:border-navy-300 hover:shadow-[0_22px_44px_-28px_rgba(0,17,46,0.5)] focus-visible:border-navy-400",
        className,
      )}
    >
      {/* `contain`, not `cover`. Attachment photography is studio cutouts on
          white with wildly varying proportions — a boom-mounted auger is tall
          and narrow, a pallet fork is wide — and cropping them to a square cuts
          the tool in half. A conventional part photograph letterboxes on the
          pale ground perfectly well; the reverse is not true. */}
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-steel-50">
        <Image
          src={part.image.src}
          alt={part.image.alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-contain p-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />

        {/* The same flag the machines carry. An attachment is bought against a
            carrier, so whose carrier it is built for is the first thing worth
            knowing — and a wall of tools with no maker on them reads as generic
            stock. Only where the part actually has a brand: most of the wear
            parts are unbranded on purpose, and "Unbranded" on a chip would look
            like a mistake rather than a fact. */}
        {part.brand ? (
          <div className="absolute left-0 top-0 bg-navy-800/90 px-3 py-1.5 font-display text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm md:px-4 md:py-2 md:text-[0.875rem]">
            {part.brand}
          </div>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col border-t border-steel-100 p-3.5 md:p-4">
        <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-amber-600 tabular-nums md:text-[0.6875rem] md:tracking-[0.14em]">
          {part.partNumber}
        </p>

        <h3 className="mt-1.5 text-sm font-bold uppercase leading-tight tracking-tight text-navy-800 sm:text-base md:text-lg">
          {part.name}
        </h3>

        {compatibleLabel ? (
          <p className="mt-auto pt-3 text-[0.625rem] font-medium uppercase tracking-[0.08em] text-navy-600 md:text-[0.6875rem] md:tracking-[0.1em]">
            {compatibleLabel}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
