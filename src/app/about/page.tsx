import type { Metadata } from "next";
import Image from "next/image";
import { AboutBlock } from "@/components/about/AboutBlock";
import { BoxReveal } from "@/components/about/BoxReveal";
import { PartnerLogos } from "@/components/about/PartnerLogos";
import { AboutHero } from "@/components/about/AboutHero";
import { OfficeMaps } from "@/components/about/OfficeMaps";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Button } from "@/components/ui/Button";
import { CategoryIconTile } from "@/components/ui/CategoryIconTile";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { StatCounter } from "@/components/ui/StatCounter";
import { getCompanyInfo, getEquipmentCategories, getPartners } from "@/lib/data";
import { routes } from "@/lib/routes";

/**
 * ABOUT US.
 *
 * Follows the structure and the copy the client supplied, in their order:
 * the cover, who we are, the offices, the legacy, what we offer, the sole
 * distributorship, and the commitment that closes it.
 *
 * TWO RULES CARRIED OVER FROM THE EARLIER VERSION OF THIS PAGE:
 *
 *  - NOTHING IS INVENTED. Every sentence here is the client's own or is drawn
 *    from a document they supplied. Where a section's cover photograph has not
 *    arrived, a designed navy panel stands in — never a stock photograph of
 *    somebody else's yard, which would be a lie about their premises.
 *  - SECTIONS THAT HAVE NO CONTENT DO NOT RENDER. A heading over white space
 *    reads as broken; an absent section reads as a shorter page.
 */

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Burki & Company — five decades supplying heavy machinery from Karachi and Islamabad, and sole distributor of Xinyuan wheeled excavators and LOAD-X wheel loaders in Pakistan.",
};

/** The machine types named in the client's "What We Offer" copy. */
const OFFER_CATEGORY_SLUGS = [
  "excavators",
  "wheel-loaders",
  "bulldozers",
  "rollers",
  "cranes",
  "graders",
  "dump-trucks",
  "mixer-trucks",
];

export default async function AboutPage() {
  const [info, categories, partners] = await Promise.all([
    getCompanyInfo(),
    getEquipmentCategories(),
    getPartners(),
  ]);

  const offered = OFFER_CATEGORY_SLUGS.map((slug) =>
    categories.find((c) => c.slug === slug),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <Header />
      <main id="main">
        <AboutHero
          eyebrow={info.companyName}
          title="About Us"
          image={{
            src: "/images/banner-company.jpg",
            alt: "The Burki & Company premises in Karachi, with wheel loaders on the forecourt",
          }}
        />

        {/* ------------------------------------------------------ who we are */}
        {info.story.length > 0 ? (
          <Section tone="light">
            <Container>
              {/* Heading and copy in two columns rather than one centred
                  block: the heading is short and the copy is not, so stacking
                  them left a wide band of empty page under the title. */}
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
                <Reveal>
                  <p className="eyebrow-rule font-display text-eyebrow uppercase text-navy-700">
                    Who we are
                  </p>
                  <h2 className="mt-5 text-display-md uppercase text-navy-900">
                    Five decades in heavy equipment
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <div className="space-y-4 text-base leading-relaxed text-steel-700">
                    {info.story.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>
        ) : null}

        {/* ----------------------------------------------------------- stats */}
        {info.stats.length > 0 ? (
          <Section tone="light" spacing="tight">
            <Container>
              <dl className="grid gap-px overflow-hidden rounded-[3px] bg-steel-200 sm:grid-cols-2 lg:grid-cols-4">
                {info.stats.map((stat) => (
                  <div key={stat.id} className="bg-steel-50 px-5 py-7">
                    <dd className="font-display text-4xl font-bold tabular-nums text-navy-800">
                      <StatCounter
                        value={stat.value}
                        /* A year sweeping up from zero reads as a bug, not an
                           effect — start it near the target instead. */
                        from={stat.value > 1900 ? stat.value - 40 : 0}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </dd>
                    <dt className="mt-3 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
                      {stat.label}
                    </dt>
                    {stat.description ? (
                      <p className="mt-2 text-[0.8125rem] leading-relaxed text-steel-600">
                        {stat.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </dl>
            </Container>
          </Section>
        ) : null}

        {/* --------------------------------------------------------- offices */}
        <OfficeMaps locations={info.locations} />

        {/* ---------------------------------------------------------- legacy */}
        <Section tone="light">
          <Container>
            {/*
              Two rows, each pairing copy with the thing it is about: the
              founder's portrait beside the sentence about him, and the client
              wall beside the sentences about the clients. One row with
              everything stacked in the right-hand column would have put the
              logos level with a paragraph that does not mention them.
            */}
            <div className="grid gap-x-8 gap-y-8 md:gap-x-12 md:gap-y-10 md:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
              <Reveal>
                <p className="eyebrow-rule font-display text-eyebrow uppercase text-navy-700">
                  Our legacy
                </p>
                <h2 className="mt-5 text-display-md uppercase text-navy-900">
                  Deliver what you promise
                </h2>
                <p className="mt-6 text-base leading-relaxed text-steel-700">
                  Founded by {info.founder.name ?? "our founder"}, the company
                  grew through one principle: deliver what you promise. That
                  commitment earned the trust of clients across Pakistan,
                  Afghanistan and Iran — and it remains the cornerstone of
                  everything we do today.
                </p>
              </Reveal>

              {info.founder.image ? (
                <BoxReveal className="rounded-[3px]">
                  <figure className="mx-auto w-full max-w-[17rem] lg:mx-0 lg:ml-auto lg:mr-0">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-steel-100">
                      <Image
                        src={info.founder.image.src}
                        alt={info.founder.image.alt}
                        fill
                        sizes="(min-width: 1024px) 18vw, 70vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <figcaption className="mt-4">
                      <p className="font-display text-base font-bold uppercase tracking-[0.04em] text-navy-900">
                        {info.founder.name}
                      </p>
                      {info.founder.role ? (
                        <p className="mt-1 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-steel-500">
                          {info.founder.role}
                        </p>
                      ) : null}
                    </figcaption>
                  </figure>
                </BoxReveal>
              ) : null}

              <Reveal>
                <div className="space-y-4 text-base leading-relaxed text-steel-700">
                  <p>
                    Over five decades, Burki &amp; Company has supplied heavy
                    machinery to some of Pakistan&apos;s most prominent names
                    across construction, contracting, textiles, refineries,
                    mining, oil storage, rice mills, dairy and farming,
                    agriculture, and the energy and power sectors — as well as
                    government institutions, including municipal bodies and
                    various federal and provincial departments.
                  </p>
                  <p>
                    A client portfolio built over fifty years that speaks for
                    itself. Our partners reflect the trust that
                    Pakistan&apos;s industry has placed in us since 1970.
                  </p>
                </div>
              </Reveal>

              <BoxReveal className="rounded-[3px]">
                <PartnerLogos partners={partners} />
              </BoxReveal>
            </div>
          </Container>
        </Section>

        {/* ------------------------------------------------------ what we do */}
        <Section tone="muted">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
              <Reveal>
                <p className="eyebrow-rule font-display text-eyebrow uppercase text-navy-700">
                  What we offer
                </p>
                <h2 className="mt-5 text-display-md uppercase text-navy-900">
                  Machines for the work that builds
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-base leading-relaxed text-steel-700">
                  Burki &amp; Company provides a comprehensive range of heavy
                  machinery — including dumpers, wheel loaders, bulldozers,
                  rollers, cranes, graders, dumper trucks, mixer trucks and
                  excavators — purpose-built for construction, infrastructure
                  and earthmoving operations.
                </p>
              </Reveal>
            </div>

            {/* The same tiles as the homepage, in their compact size, so all
                eight sit on one row as a strip. Four across on phones, where
                eight would leave each label unreadable. */}
            {offered.length > 0 ? (
              <div className="mt-12 grid grid-cols-4 gap-2.5 lg:grid-cols-8">
                {offered.map((category, index) => (
                  <Reveal key={category.id} delay={(index % 8) * 0.04}>
                    <CategoryIconTile category={category} compact />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </Container>
        </Section>

        {/* ----------------------------------------------- sole distribution */}
        <AboutBlock
          eyebrow="Sole distribution"
          title="Authorised distributor for Pakistan"
          side="right"
          visual={
            <figure className="mx-auto w-full max-w-[24rem] lg:mx-0">
              <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[3px] border border-steel-200 bg-steel-50 p-5">
                <Image
                  src="/images/about/certificate-xinyuan.webp"
                  alt="Certificate of Authorization from Fujian Xinyuan Heavy Industry naming Burki & Company its regional distributor for the Islamic Republic of Pakistan"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-contain p-4"
                />
              </div>
              <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-steel-600">
                Certificate of Authorization No. XYZG2025053, issued by Fujian
                Xinyuan Heavy Industry Co., Ltd. Valid 1 March 2025 to 28
                February 2027.
              </figcaption>
            </figure>
          }
        >
          <p>
            Burki &amp; Company is the authorised sole distributor of Xinyuan
            wheeled excavators and LOAD-X wheel loaders across Pakistan —
            bringing proven Chinese engineering to Pakistan&apos;s construction
            industry.
          </p>
          <p>
            The certificate alongside is the manufacturer&apos;s own, naming
            Burki &amp; Company its regional distributor for the Islamic
            Republic of Pakistan, with full responsibility for the sale,
            service and after-sales support of its excavators and parts.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href={routes.brand({ slug: "xinyuan" })} variant="outline" size="sm">
              Xinyuan range
              <ArrowRight />
            </Button>
            <Button href={routes.brand({ slug: "load-x" })} variant="outline" size="sm">
              LOAD-X range
              <ArrowRight />
            </Button>
          </div>
        </AboutBlock>

        {/* ------------------------------------------------------ commitment */}
        <Section tone="navy">
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow-rule font-display text-eyebrow uppercase text-amber-500">
                Our commitment
              </p>
              {info.mission ? (
                <p className="mt-7 text-display-md uppercase text-white">
                  {info.mission}
                </p>
              ) : null}
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-12 flex flex-col items-center gap-5 border-t border-white/12 pt-10 text-center">
                <p className="max-w-xl text-[0.9375rem] leading-relaxed text-white/65">
                  Tell us the job, the material and the site, and we will come
                  back with what fits — including machines beyond the catalogue.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button href={routes.quote()}>
                    Request a quote
                    <ArrowRight />
                  </Button>
                  <Button href={routes.equipment()} variant="outlineLight">
                    Browse equipment
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
