"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRightIcon, socialIcons } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import type { NewsPost, SocialLink } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * NEWS AND UPDATES — the client's social posts, on the homepage.
 *
 * Modelled on the client's reference (SANY's news block): a row of cards, each
 * a photograph over a caption, with arrows to move along the row.
 *
 * IT IS A SCROLLER, NOT A TRANSFORM CAROUSEL. The track is a scroll container
 * with snap points, and the arrows scroll it. That means touch, trackpad and
 * keyboard all work with no gesture handling of our own, the card count can
 * change without arithmetic, and the arrows only need to know a card's width.
 * A transform carousel would have had to reimplement all of that.
 *
 * Every card leaves the site, so each opens in a new tab.
 */
export function NewsStrip({
  posts,
  socials,
}: {
  posts: NewsPost[];
  socials: SocialLink[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* Arrows disable at the ends rather than wrapping — a scroller that jumps
     back to the beginning under the cursor is disorienting. */
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    const onResize = () => sync();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sync]);

  const step = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    /* Fall back to two thirds of the viewport if the card cannot be measured,
       which is only possible before first paint. */
    const distance = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.66;
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  if (posts.length === 0) return null;

  return (
    <Section tone="light">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Reveal>
            <p className="eyebrow-rule font-display text-eyebrow uppercase text-navy-700">
              Latest
            </p>
            <h2 className="mt-5 text-display-md uppercase text-navy-900">
              News &amp; updates
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.platform];
                if (!Icon) return null;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Burki & Company on ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-steel-200 text-base text-navy-700 transition-all duration-300 hover:border-navy-800 hover:bg-navy-800 hover:text-white"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="mt-10">
          <ul
            ref={trackRef}
            onScroll={sync}
            className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((post) => {
              const Icon = socialIcons[post.platform];
              return (
                <li
                  key={post.id}
                  className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/3)]"
                >
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-steel-200 bg-white transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-300 hover:shadow-[0_20px_44px_-28px_rgba(0,17,46,0.55)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-steel-100">
                      <Image
                        src={post.image.src}
                        alt={post.image.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col bg-steel-50 p-5 transition-colors duration-400 group-hover:bg-white">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-display text-[0.6875rem] font-medium uppercase tracking-[0.14em] tabular-nums text-steel-500">
                          {post.date
                            ? new Date(post.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : " "}
                        </span>
                        <span className="flex items-center gap-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-navy-700">
                          {Icon ? <Icon className="text-sm" /> : null}
                          {post.platform}
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-3 text-[0.9375rem] font-medium leading-relaxed text-navy-900">
                        {post.caption}
                      </p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-6 flex justify-end gap-2">
          {([-1, 1] as const).map((direction) => {
            const disabled = direction < 0 ? atStart : atEnd;
            return (
              <button
                key={direction}
                type="button"
                onClick={() => step(direction)}
                disabled={disabled}
                aria-label={direction < 0 ? "Previous posts" : "Next posts"}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-[3px] border transition-all duration-300",
                  disabled
                    ? "cursor-not-allowed border-steel-200 text-steel-300"
                    : "border-steel-300 text-navy-800 hover:border-navy-800 hover:bg-navy-800 hover:text-white active:scale-95",
                )}
              >
                <ChevronRightIcon
                  className={cn("text-lg", direction < 0 && "rotate-180")}
                />
              </button>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
