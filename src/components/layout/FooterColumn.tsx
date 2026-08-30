"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * One footer link column: a disclosure while the columns are stacked, a plain
 * column once they sit side by side.
 *
 * The four lists together are around twenty-five links. Side by side that is a
 * tidy block at the foot of the page; stacked on a phone it was most of a
 * screen of undifferentiated links between the visitor and the copyright line,
 * and the headings that organise it scrolled past one at a time. Collapsed, the
 * whole of it — Equipment, Parts, Industries, Company — fits at a glance and
 * opens where the visitor is actually going.
 *
 * THE BREAKPOINT IS THE LAYOUT'S, NOT ITS OWN. It collapses exactly while the
 * grid is stacked (below `lg`) and is always open once the grid gives it a
 * column, so there is never a chevron next to a list that cannot close.
 *
 * Open and closed are a `0fr`/`1fr` grid row rather than a measured height:
 * that animates in CSS at any content length, needs no ref and no layout read,
 * and `lg:grid-rows-[1fr]` then pins it open at the wide breakpoint without a
 * media query in JavaScript — which is what matters here, since branching on a
 * client-only media query during render desynchronises SSR (the same reasoning
 * as `Reveal`).
 *
 * Collapsed links stay in the DOM, as the specification table's rows do, so
 * they remain crawlable and findable by in-page search.
 */
export function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-white/10 lg:border-b-0">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            "flex w-full items-center justify-between gap-4 py-4 text-left",
            "font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-amber-500",
            "focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:-outline-offset-2",
            /* Once the column is open for good, the heading is a heading: no
               pointer, no chevron, nothing that offers a toggle that does
               nothing. */
            "lg:pointer-events-none lg:py-0",
          )}
        >
          {title}
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(
              "shrink-0 text-base text-white/45 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
              open && "rotate-180",
            )}
          />
        </button>
      </h3>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "lg:grid-rows-[1fr]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <ul className="space-y-2.5 pb-4 lg:mt-5 lg:pb-0">
            {links.map((link) => (
              <li key={`${title}-${link.href}-${link.label}`}>
                <Link
                  href={link.href}
                  className="text-[0.875rem] text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
