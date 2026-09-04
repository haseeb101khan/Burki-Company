"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageRef } from "@/lib/data";
import { PlayIcon } from "@/components/ui/Icons";

/**
 * A brand's introduction film, on the catalogue header.
 *
 * Introduction films remain poster-first when they carry narration. A brand
 * can instead opt into a muted looping banner for footage designed to behave
 * like the homepage hero rather than a film the visitor explicitly watches.
 *
 * `preload="none"` protects the manual mode from downloading until requested;
 * the muted banner mode uses metadata preload because autoplay needs the media.
 *
 * The frame is 16:9 because that is the clip's own shape (848x478). Matching it
 * means no letterbox bars and no crop across the branding in the footage.
 */
export function BrandIntroVideo({
  src,
  poster,
  brandName,
  autoplayMuted = false,
}: {
  src: string;
  poster: ImageRef | null;
  brandName: string;
  autoplayMuted?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  if (autoplayMuted) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-[3px] bg-navy-950">
        <video
          src={src}
          poster={poster?.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${brandName} equipment video banner`}
          className="h-full w-full object-cover"
        />
        <span className="pointer-events-none absolute bottom-3 left-4 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/85">
          {brandName}
        </span>
      </div>
    );
  }

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-[3px] bg-navy-950">
        {/* No caption track: none was supplied with the clip, and inventing
            one would put words in the manufacturer's mouth. Listed as
            outstanding in CMS.md. */}
        <video
          src={src}
          poster={poster?.src}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play the ${brandName} introduction film`}
      className="group relative block aspect-video w-full overflow-hidden rounded-[3px] bg-navy-950"
    >
      {poster ? (
        <Image
          src={poster.src}
          alt={poster.alt}
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      ) : null}

      {/* A wash under the badge so it reads on any frame, without burying the
          photograph the way a full-frame scrim would. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(0,17,46,0.55),rgba(0,17,46,0.12)_70%,transparent)]"
      />

      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-navy-800 shadow-[0_10px_30px_-10px_rgba(0,17,46,0.7)] transition-all duration-300 group-hover:scale-105 group-hover:bg-white md:h-20 md:w-20"
      >
        <PlayIcon />
      </span>

      <span className="absolute bottom-4 left-4 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/85">
        {brandName} — introduction
      </span>
    </button>
  );
}
