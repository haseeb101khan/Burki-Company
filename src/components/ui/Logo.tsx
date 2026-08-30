import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * THE SINGLE LOGO SWAP POINT.
 *
 * Both variants are derived from the client-supplied artwork, background
 * removed and trimmed to the mark's bounding box (see design/logo-source/).
 * To drop in new artwork, replace the two files in /public/brand and keep the
 * same aspect ratio — nothing else in the app references the logo directly.
 */

const LOGO_ASPECT = 1023 / 412; // intrinsic ratio of the supplied artwork

type LogoProps = {
  /** "navy" for light backgrounds, "white" for navy/photographic backgrounds. */
  variant?: "navy" | "white";
  /** Rendered height in px; width is derived from the artwork's aspect ratio. */
  height?: number;
  className?: string;
  /** Wraps the mark in a link to home. Set false inside an existing link. */
  href?: string | null;
  priority?: boolean;
};

export function Logo({
  variant = "navy",
  height = 40,
  className,
  href = "/",
  priority = false,
}: LogoProps) {
  const width = Math.round(height * LOGO_ASPECT);

  const mark = (
    <Image
      src={variant === "white" ? "/brand/logo-white.png" : "/brand/logo-navy.png"}
      alt="Burki &amp; Company"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ height, width }}
    />
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      aria-label="Burki &amp; Company — home"
      className="inline-flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80"
    >
      {mark}
    </Link>
  );
}
