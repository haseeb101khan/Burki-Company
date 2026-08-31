import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { getServices } from "@/lib/data";
import { routes } from "@/lib/routes";

/**
 * SERVICES — one page, every service on it.
 *
 * NOT A CATEGORY INDEX. Four services, each of which is a paragraph and three
 * lines, would make four detail pages carrying about a screen of copy each and
 * an index whose only job is to link to them. On a single page a visitor
 * reading "what do you actually do after I buy the machine" gets the whole
 * answer by scrolling, which is the question this page exists to answer. If the
 * client later writes a page's worth of copy per service, each one already has
 * a slug to be split out on.
 *
 * EVERY SERVICE CARRIES ITS OWN QUOTE BUTTON, on the client's instruction, and
 * it is the right call for a reason worth writing down: the visitor decides
 * they want to talk to somebody at the point they read the thing they need, not
 * at the bottom of the page. Each button deep-links the same quote form.
 *
 * The copy is the client's own, from `scripts/seed-data/site.ts`. Nothing here
 * describes a capability they have not claimed.
 */

export const metadata: Metadata = {
  title: "Services",
  description:
    "Equipment consultation, parts support, maintenance and repair, and after-sales support from Burki & Company.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Header />
      <main>
        <Section tone="light" spacing="tight">
          <Container>
            <SectionHeader
              eyebrow="Services"
              title="What we do after the sale"
              description="Buying the machine is the short part. Specifying it correctly, keeping the parts on a shelf and getting an engineer to it when it stops are what decide whether it earns."
              action={
                <Button href={routes.quote()} size="sm">
                  Request a quote
                  <ArrowRight />
                </Button>
              }
            />
          </Container>
        </Section>

        {/* ------------------------------------------------------- the services
         *
         * Numbered rows rather than a grid of cards. Four cards on a desktop
         * read as four equivalent options to choose between; these are not
         * alternatives, they are the sequence of a single relationship — spec
         * the machine, supply the parts, service it, stay on the end of the
         * phone. Rows in order say that; a grid does not.
         */}
        <Section tone="light" spacing="tight">
          <Container>
            <ul className="border-t border-steel-200">
              {services.map((service, index) => (
                <li key={service.id}>
                  <Reveal delay={Math.min(index, 4) * 0.05}>
                    <article className="grid gap-6 border-b border-steel-200 py-10 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-10 md:py-12 lg:gap-14">
                      {/* Outlined, not filled: the numeral is structure, not
                          something to read before the heading. */}
                      <span
                        aria-hidden="true"
                        className="font-display text-[2.25rem] font-bold leading-none tabular-nums text-transparent [-webkit-text-stroke:1px_var(--color-steel-300,#cbd4e1)] md:text-[3rem]"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <h2 className="text-xl font-bold uppercase leading-tight tracking-tight text-navy-800 md:text-2xl">
                          {service.name}
                        </h2>

                        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-steel-600 md:text-base">
                          {service.description}
                        </p>

                        {service.points.length > 0 ? (
                          <ul className="mt-5 space-y-2.5">
                            {service.points.map((point) => (
                              <li key={point} className="flex gap-3">
                                <CheckIcon
                                  aria-hidden="true"
                                  className="mt-[0.2em] shrink-0 text-[0.9em] text-amber-500"
                                />
                                <span className="text-[0.875rem] leading-relaxed text-steel-700">
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>

                      {/* Full width on a phone, where a button beside the copy
                          would be a third of a column wide. */}
                      <div className="md:self-start md:pt-1">
                        <Button
                          href={routes.quote()}
                          size="sm"
                          variant="outline"
                          className="w-full md:w-auto"
                        >
                          Request a quote
                          <ArrowRight />
                        </Button>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* ------------------------------------------------------------- close */}
        <Section tone="navy" spacing="default">
          <Container size="narrow">
            <Reveal>
              <div className="flex flex-col items-center gap-6 text-center">
                <h2 className="text-display-sm uppercase text-white">
                  Tell us what the machine has to do
                </h2>
                <p className="max-w-xl text-[0.9375rem] leading-relaxed text-white/65">
                  The job, the material and the site are enough to start with. We
                  will come back with what fits, and what it will take to keep it
                  running.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button href={routes.quote()} size="lg">
                    Request a quote
                    <ArrowRight />
                  </Button>
                  <Button href="/contact" size="lg" variant="outlineLight">
                    Talk to us
                  </Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
