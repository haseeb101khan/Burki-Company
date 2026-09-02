"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CloseIcon } from "@/components/ui/Icons";
import { useCompare } from "./CompareProvider";

/**
 * Keeps the tray's selection in step with the comparison the page is showing.
 *
 * The page is addressed by query string so a comparison can be sent to someone.
 * Arriving by that link would otherwise leave the visitor's stored picks and the
 * comparison on screen disagreeing — the tray saying one thing, the table
 * another. Pushing the URL's models into the provider on mount settles it, and
 * makes "clear" and the per-column remove mean what they look like they mean.
 *
 * Renders nothing; it exists for the effect.
 */
export function CompareSync({ slugs }: { slugs: string[] }) {
  const { replace } = useCompare();
  const key = slugs.join(",");

  useEffect(() => {
    replace(key ? key.split(",") : []);
  }, [key, replace]);

  return null;
}

/** Empties the comparison and returns the page to its empty state. */
export function CompareClear() {
  const { clear } = useCompare();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        clear();
        router.push("/compare");
      }}
      className="rounded-[3px] bg-navy-700 px-5 py-3 font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-navy-800 md:text-[0.75rem]"
    >
      Clear products
    </button>
  );
}

/** Drops one machine out of the comparison, keeping the rest. */
export function CompareRemove({ slug, model }: { slug: string; model: string }) {
  const { selected, remove } = useCompare();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        remove(slug);
        const rest = selected.filter((s) => s !== slug);
        router.push(rest.length > 0 ? `/compare?models=${rest.join(",")}` : "/compare");
      }}
      aria-label={`Remove ${model} from the comparison`}
      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-steel-400 transition-colors hover:bg-steel-100 hover:text-navy-700"
    >
      <CloseIcon className="text-[0.8em]" />
    </button>
  );
}
