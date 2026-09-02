"use client";

import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { COMPARE_LIMIT, useCompare } from "./CompareProvider";

/**
 * The "Compare" control on a catalogue card.
 *
 * A BUTTON, NOT A CHECKBOX INPUT, because it reads as a checkbox but behaves as
 * a toggle with a cap: at three selected it refuses rather than accepting a
 * fourth. `aria-pressed` says the state; `disabled` plus a title says why it
 * will not take another.
 *
 * The card around it is not a link. That is deliberate and the reason the card
 * was restructured: a checkbox inside an anchor is invalid and, worse, clicking
 * it navigates. The picture and the model name link to the machine, this
 * toggles, and "More" is the explicit way in.
 */
export function CompareToggle({ slug }: { slug: string }) {
  const { isSelected, toggle, isFull, ready } = useCompare();
  const on = isSelected(slug);
  const blocked = !on && isFull;

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={on}
      disabled={!ready || blocked}
      title={blocked ? `Comparing ${COMPARE_LIMIT} machines already` : undefined}
      className={cn(
        "flex items-center justify-center gap-2 py-3 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] transition-colors md:text-[0.75rem]",
        blocked
          ? "cursor-not-allowed text-steel-400"
          : on
            ? "text-amber-600"
            : "text-navy-700 hover:bg-navy-50",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border transition-colors",
          on ? "border-amber-500 bg-amber-500 text-white" : "border-steel-300",
        )}
      >
        {on ? <CheckIcon className="text-[0.7em]" /> : null}
      </span>
      Compare
    </button>
  );
}
