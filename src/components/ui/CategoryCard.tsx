import Image from "next/image";
import Link from "next/link";
import type { EquipmentCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Button";
import { routes } from "@/lib/routes";

/**
 * Photographic category tile. The image carries the weight; the navy scrim
 * exists only so the label stays legible over it.
 */
export function CategoryCard({
  category,
  count,
  className,
  size = "default",
}: {
  category: EquipmentCategory;
  count?: number;
  className?: string;
  size?: "default" | "tall";
}) {
  return (
    <Link
      href={routes.category(category)}
      className={cn(
        "group relative flex overflow-hidden rounded-[3px] bg-navy-900",
        "transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        "hover:shadow-[0_22px_44px_-26px_rgba(0,17,46,0.65)]",
        size === "default" ? "aspect-[4/3]" : "aspect-[3/4]",
        className,
      )}
    >
      <Image
        src={category.image.src}
        alt={category.image.alt}
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
        className="object-cover opacity-85 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:opacity-100"
      />

      {/* Scrim: strongest at the base where the label sits. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/35 to-navy-950/5" />

      <div className="relative mt-auto flex w-full items-end justify-between gap-3 p-4 md:p-5">
        <div>
          <h3 className="text-lg font-bold uppercase leading-tight tracking-tight text-white md:text-xl">
            {category.name}
          </h3>
          {typeof count === "number" && count > 0 ? (
            <p className="mt-1 font-display text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/60">
              {count} {count === 1 ? "model" : "models"}
            </p>
          ) : null}
        </div>

        <span
          aria-hidden="true"
          className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-white/25 text-white transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-navy-900"
        >
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
