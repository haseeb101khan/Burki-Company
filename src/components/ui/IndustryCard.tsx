import Image from "next/image";
import Link from "next/link";
import type { Industry } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Button";

/**
 * Industry tile. Carries a line of copy as well as a label, so it uses a
 * lighter image treatment than the equipment category tiles.
 */
export function IndustryCard({
  industry,
  className,
}: {
  industry: Industry;
  className?: string;
}) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[3px] border border-steel-200 bg-white transition-colors duration-300 hover:border-navy-300",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-steel-100">
        <Image
          src={industry.image.src}
          alt={industry.image.alt}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-lg font-bold uppercase leading-tight tracking-tight text-navy-800 md:text-xl">
          {industry.name}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-steel-600">
          {industry.summary}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-navy-700 transition-colors group-hover:text-amber-600">
          Recommended equipment
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
