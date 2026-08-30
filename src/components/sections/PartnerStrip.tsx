import Image from "next/image";
import { Container, Section } from "@/components/ui/Section";
import { getPartners } from "@/lib/data";

/**
 * The partner logos, running continuously across the homepage.
 *
 * HOW THE LOOP IS SEAMLESS: the track holds the logo set twice and translates
 * exactly -50%, which lands the second copy precisely where the first started.
 * Because it is a percentage, it holds at any logo count and any viewport width
 * — no measuring, no JavaScript, and nothing to resynchronise on resize. That
 * is also why this can stay a server component: there is no state to hold.
 *
 * The duration scales with the number of logos so the strip always travels at
 * about the same speed, rather than sprinting when there are few and crawling
 * when there are many.
 *
 * The second copy is `aria-hidden`: a screen reader should hear the client list
 * once, not twice.
 *
 * Reduced motion stops it outright — see `.marquee-track` in globals.css. The
 * same logos sit in a static grid on the About page, so nothing is lost.
 */
const SECONDS_PER_LOGO = 4.5;

export async function PartnerStrip() {
  const partners = (await getPartners()).filter((p) => p.logo);
  if (partners.length === 0) return null;

  const duration = partners.length * SECONDS_PER_LOGO;

  return (
    <Section tone="light" spacing="tight">
      <Container>
        <p className="text-center font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-steel-500">
          Trusted by
        </p>
      </Container>

      {/* Full-bleed, and masked at both ends so logos fade in and out rather
          than being chopped off at the viewport edge. */}
      <div
        className="group relative mt-8 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="marquee-track flex w-max items-center group-hover:[animation-play-state:paused]"
          style={{
            animation: `marquee-left ${duration}s linear infinite`,
          }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {partners.map((partner) => (
                <div
                  key={`${copy}-${partner.id}`}
                  className="flex shrink-0 items-center justify-center px-6 sm:px-8"
                >
                  <div className="relative h-[40px] w-[90px] sm:h-[50px] sm:w-[120px] md:h-[56px] md:w-[128px] lg:h-[62px] lg:w-[148px]">
                    <Image
                      src={partner.logo!}
                      alt={copy === 0 ? partner.name : ""}
                      fill
                      sizes="148px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
