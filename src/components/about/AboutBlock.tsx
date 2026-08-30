import type { ReactNode } from "react";
import { BoxReveal } from "@/components/about/BoxReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * One About section: a visual panel that opens with the box animation, and the
 * copy alongside it.
 *
 * `side` is which side the VISUAL sits on. The sections alternate down the
 * page, so the eye is not tracking the same column the whole way. On phones
 * the visual always comes first regardless — the copy reads better under the
 * picture it belongs to than above it.
 *
 * `align` is how the two columns meet. "center" balances them about the middle,
 * which suits a visual much shorter or taller than its copy. "stretch" makes
 * both columns the same height and lets the picture fill it, so the two start
 * and finish on the same lines — worth it when they are already close, because
 * nearly-aligned edges read as a mistake in a way clearly-different ones do not.
 */
export function AboutBlock({
  eyebrow,
  title,
  visual,
  side = "left",
  align = "center",
  tone = "light",
  children,
}: {
  eyebrow?: string;
  title: string;
  visual: ReactNode;
  side?: "left" | "right";
  align?: "center" | "stretch";
  tone?: "light" | "muted" | "navy";
  children: ReactNode;
}) {
  const dark = tone === "navy";

  return (
    <Section tone={tone}>
      <Container>
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-2 lg:gap-16",
            align === "stretch" ? "lg:items-stretch" : "items-center",
          )}
        >
          <BoxReveal
            className={cn(
              "rounded-[3px]",
              side === "right" && "lg:order-2",
              align === "stretch" && "h-full",
            )}
          >
            {visual}
          </BoxReveal>

          <div
            className={cn(
              side === "right" && "lg:order-1",
              align === "stretch" && "flex flex-col justify-center",
            )}
          >
            <Reveal delay={0.12}>
              {eyebrow ? (
                <p
                  className={cn(
                    "eyebrow-rule font-display text-eyebrow uppercase",
                    dark ? "text-amber-500" : "text-navy-700",
                  )}
                >
                  {eyebrow}
                </p>
              ) : null}
              <h2
                className={cn(
                  "mt-5 text-display-md uppercase",
                  dark ? "text-white" : "text-navy-900",
                )}
              >
                {title}
              </h2>
              <div
                className={cn(
                  "mt-6 space-y-4 text-base leading-relaxed",
                  dark ? "text-white/80" : "text-steel-700",
                )}
              >
                {children}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
