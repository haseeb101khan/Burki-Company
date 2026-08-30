import Image from "next/image";
import Link from "next/link";
import { categoryIcons, AttachmentsIcon } from "@/components/ui/EquipmentIcons";
import type { EquipmentCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

/**
 * Category tile: a machine icon at rest, the real photograph on hover.
 *
 * Both layers are always rendered and cross-faded, so the photo is decoded
 * before the cursor arrives rather than popping in a frame late.
 */
export function CategoryIconTile({
  category,
  count,
  compact = false,
  className,
}: {
  category: EquipmentCategory;
  count?: number;
  /**
   * Strip sizing: eight across a row rather than six. The icon and label come
   * down with the tile, and the model count is dropped — at this width it
   * wraps to a second line and pushes the label off the tile.
   */
  compact?: boolean;
  className?: string;
}) {
  const Icon = categoryIcons[category.slug] ?? AttachmentsIcon;

  return (
    <Link
      href={routes.category(category)}
      className={cn(
        "group relative flex flex-col items-center justify-center overflow-hidden rounded-[3px]",
        compact ? "aspect-square p-1.5" : "aspect-[4/3] p-2 sm:p-3",
        "border border-steel-200 bg-steel-50 text-center transition-all duration-400",
        "ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-300",
        "hover:shadow-[0_18px_38px_-24px_rgba(0,17,46,0.5)]",
        className,
      )}
    >
      {/* photograph, revealed on hover or touch */}
      <Image
        src={category.image.src}
        alt=""
        aria-hidden="true"
        fill
        sizes={compact ? "(min-width: 1024px) 12vw, 25vw" : "(min-width: 1024px) 16vw, 33vw"}
        className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100"
      />
      <div className="absolute inset-0 bg-navy-950/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100" />

      <Icon
        className={cn(
          "relative text-navy-700 transition-all duration-400 group-hover:scale-90 group-hover:opacity-0 group-active:scale-90 group-active:opacity-0",
          compact ? "text-[16px] sm:text-[20px] md:text-[26px]" : "text-[20px] sm:text-[28px] md:text-[38px] lg:text-[44px]",
        )}
      />

      <span
        className={cn(
          "relative font-display font-semibold uppercase leading-tight text-navy-800 transition-colors duration-400 group-hover:text-white group-active:text-white group-focus-visible:text-white",
          compact
            ? "mt-1 text-[0.45rem] sm:text-[0.5rem] tracking-[0.04em]"
            : "mt-1.5 sm:mt-2.5 text-[0.5rem] sm:text-[0.625rem] md:text-[0.6875rem] lg:text-[0.75rem] tracking-[0.08em] sm:tracking-[0.1em]",
        )}
      >
        {category.name}
      </span>

      {!compact && typeof count === "number" && count > 0 ? (
        <span className="relative mt-1 font-display text-[0.625rem] font-medium uppercase tracking-[0.12em] text-steel-400 transition-colors duration-400 group-hover:text-white/70">
          {count} {count === 1 ? "model" : "models"}
        </span>
      ) : null}
    </Link>
  );
}
