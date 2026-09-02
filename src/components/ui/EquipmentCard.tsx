import Image from "next/image";
import Link from "next/link";
import { CompareToggle } from "@/components/compare/CompareToggle";
import type { Equipment } from "@/lib/data";
import { keyFigures } from "@/lib/key-figures";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

/**
 * Equipment card used across the catalogue.
 *
 * PLAIN AGAIN, ON THE CLIENT'S CALL. The dotted map, the diagonal bands and the
 * ribbon are gone: the machine on white, its name under it, three figures, two
 * actions. Modelled on XCMG's own catalogue card, which does exactly that and
 * lets the machine carry the card.
 *
 * THREE FIGURES, AND THE SAME THREE EVERY TIME — weight, engine, bucket, in that
 * order, whatever the manufacturer's sheet called them. See `keyFigures`: the
 * labels are inconsistent across the range, so they are matched by meaning
 * rather than taken by position, and printed under one house label so a row of
 * cards reads as a table rather than as three different sheets.
 *
 * THE CARD IS NOT A LINK ANY MORE, and that is what the two buttons cost. A
 * toggle inside an anchor is invalid markup, and clicking it would navigate.
 * The picture and the name are the link; Compare toggles; More is the explicit
 * way in for anyone who wants a target rather than a picture.
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
  const figures = keyFigures(item);
  const cutout = item.cutoutImage;
  const display = cutout ?? item.image;
  const href = routes.equipmentItem(item);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[3px] border border-steel-200 bg-white",
        "transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:border-navy-300 hover:shadow-[0_22px_44px_-28px_rgba(0,17,46,0.5)]",
        className,
      )}
    >
      <Link href={href} className="block px-3 pt-3 md:px-4 md:pt-4">
        {/* 4:3 and almost no padding: the machine is the card, and every pixel
            given to a margin here comes straight off it. */}
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={display.src}
            alt={display.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className={cn(
              "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
              cutout ? "object-contain" : "object-cover",
            )}
            style={display.focus ? { objectPosition: display.focus } : undefined}
          />
        </div>

        <h3 className="mt-1 text-center font-display text-2xl font-bold uppercase leading-none tracking-tight text-navy-800 md:text-3xl">
          {item.model}
        </h3>
      </Link>

      <div className="px-3 pt-3 md:px-4 md:pt-4">
        <div className="border-t border-steel-200 pt-3 md:pt-4">
          {figures.length > 0 ? (
            <dl className="space-y-1.5">
              {figures.map((figure) => (
                <div key={figure.label} className="flex items-baseline gap-1.5">
                  <dt className="text-[0.75rem] text-steel-600 md:text-[0.8125rem]">
                    {figure.label}:
                  </dt>
                  <dd className="font-display text-[0.8125rem] font-semibold tabular-nums text-navy-800 md:text-sm">
                    {figure.value}
                    {figure.unit ? (
                      <span className="ml-0.5 font-medium text-steel-500">{figure.unit}</span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>

      {/* `mt-auto` so the actions sit on the floor of the card whatever the
          figures above them came to — a row of cards keeps one baseline. */}
      <div className="mt-auto grid grid-cols-2 divide-x divide-steel-200 border-t border-steel-200">
        <CompareToggle slug={item.slug} />
        <Link
          href={href}
          className="flex items-center justify-center py-3 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900 md:text-[0.75rem]"
        >
          More
        </Link>
      </div>
    </article>
  );
}
