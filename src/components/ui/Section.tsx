import type { ReactNode } from "react";
import { Reveal, RevealMask } from "./Reveal";
import { cn } from "@/lib/utils";

/** Page gutter + max width. One place to change the site's measure. */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "default" && "max-w-[1400px]",
        size === "wide" && "max-w-[1680px]",
        size === "narrow" && "max-w-[900px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Vertical rhythm wrapper. Tone sets the section's ground colour. */
export function Section({
  children,
  className,
  tone = "light",
  spacing = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "muted" | "navy" | "none";
  spacing?: "default" | "tight" | "loose" | "none";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        tone === "light" && "bg-white text-ink",
        tone === "muted" && "bg-steel-50 text-ink",
        tone === "navy" && "navy-depth bg-navy-800 text-white",
        spacing === "default" && "py-16 md:py-22",
        spacing === "tight" && "py-12 md:py-16",
        spacing === "loose" && "py-20 md:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Small uppercase label with the amber tick rule. */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow-rule font-display text-eyebrow uppercase",
        tone === "dark" ? "text-navy-700" : "text-white/70",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Section heading block.
 *
 * ONE alignment, always: eyebrow, title, supporting line and action stack in a
 * single left-aligned column, each directly under the last. An earlier version
 * floated the description off to the right of the title, which read as two
 * unrelated fragments on the same row — the layout this replaces.
 *
 * Keep supporting copy to one or two lines. If a section needs more explaining
 * than that, the section itself is doing too much.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  tone = "dark",
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <Reveal y={12}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <h2
        className={cn(
          "mt-4 text-display-md uppercase",
          tone === "dark" ? "text-navy-800" : "text-white",
        )}
      >
        <RevealMask delay={0.05}>{title}</RevealMask>
      </h2>

      {description ? (
        <Reveal delay={0.15} y={16}>
          <p
            className={cn(
              "mt-4 max-w-2xl text-[0.9375rem] leading-relaxed md:text-base",
              tone === "dark" ? "text-steel-600" : "text-white/65",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}

      {action ? (
        <Reveal delay={0.22} y={16}>
          <div className="mt-7">{action}</div>
        </Reveal>
      ) : null}
    </div>
  );
}
