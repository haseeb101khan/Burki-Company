import Image from "next/image";
import Link from "next/link";
import type { Part } from "@/lib/data";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * Parts card. Leads with the part number, because that is what a workshop
 * actually searches on.
 */
export function PartCard({
  part,
  categoryLabel,
  compatibleLabel,
  className,
}: {
  part: Part;
  categoryLabel?: string;
  /** e.g. "Fits 5 machines" or "Compatible with LX-926". */
  compatibleLabel?: string;
  className?: string;
}) {
  return (
    <Link
      href={routes.part(part)}
      className={cn(
        "group flex h-full gap-4 overflow-hidden rounded-[3px] border border-steel-200 bg-white p-4 transition-colors duration-300 hover:border-navy-300 md:gap-5 md:p-5",
        className,
      )}
    >
      {/* `contain`, not `cover`. Attachment photography is studio cutouts on
          white with wildly varying proportions — a boom-mounted auger is tall
          and narrow, a pallet fork is wide — and cropping them to a square cuts
          the tool in half. A conventional part photograph letterboxes on the
          pale ground perfectly well; the reverse is not true. */}
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-[2px] bg-steel-50 p-2 md:w-28">
        <Image
          src={part.image.src}
          alt={part.image.alt}
          fill
          sizes="120px"
          className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-amber-600 tabular-nums">
          {part.partNumber}
        </p>

        <h3 className="mt-1.5 text-base font-bold uppercase leading-tight tracking-tight text-navy-800 md:text-lg">
          {part.name}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-steel-600">
          {part.summary}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-steel-500">
          {categoryLabel ? <span>{categoryLabel}</span> : null}
          {categoryLabel && compatibleLabel ? (
            <span aria-hidden="true" className="text-steel-300">
              /
            </span>
          ) : null}
          {compatibleLabel ? (
            <span className="text-navy-600">{compatibleLabel}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
