import { ArrowRight } from "@/components/ui/Button";
import { MapPinIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import type { Location } from "@/lib/data";

/**
 * The two offices, each with a map.
 *
 * THIS IS THE ONLY PART OF THE SITE THAT TALKS TO ANOTHER SERVICE. Everything
 * else renders from content baked in at build time. Three things keep that
 * from mattering:
 *
 *  - the frame is `loading="lazy"`, so nothing is requested until a visitor
 *    scrolls to it, and the rest of the page never waits on Google;
 *  - the address is real text above the map, not a label inside it, so the
 *    card still does its job if the frame is blocked or slow;
 *  - a plain directions link sits beneath, which works with no frame at all.
 *
 * A map that fails degrades to an address and a link. It cannot take the page
 * down the way a content dependency could.
 */
function mapSrc(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

function directionsHref(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function OfficeMaps({ locations }: { locations: Location[] }) {
  const withMaps = locations.filter((l) => l.mapQuery);
  if (withMaps.length === 0) return null;

  return (
    <Section tone="muted">
      <Container>
        <SectionHeader
          eyebrow="Where to find us"
          title="Our offices"
          description="Visit our Karachi head office or Islamabad office."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-7">
          {withMaps.map((location, index) => {
            const query = location.mapQuery!;
            const lines = [location.line1, location.line2].filter(Boolean);

            return (
              <Reveal key={location.label} delay={index * 0.08}>
                <div className="flex h-full flex-col overflow-hidden rounded-[3px] border border-steel-200 bg-white">
                  <div className="relative aspect-[16/10] w-full bg-steel-100">
                    <iframe
                      src={mapSrc(query)}
                      title={`Map of the ${location.label} office`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg font-bold uppercase tracking-[0.04em] text-navy-900">
                        {location.label}
                      </h3>
                      {location.isPrimary ? (
                        <span className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-amber-600">
                          Head office
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-3 flex gap-2.5 text-[0.9375rem] leading-relaxed text-steel-700">
                      <MapPinIcon className="mt-1 shrink-0 text-navy-700" />
                      <span>
                        {lines.join(", ")}
                        <br />
                        {location.city}, {location.country}
                      </span>
                    </p>

                    <a
                      href={directionsHref(query)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 self-start font-display text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-navy-800 transition-colors hover:text-amber-600"
                    >
                      Get directions
                      <ArrowRight />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
