import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QuoteForm, type QuoteEquipmentOption } from "@/components/sections/QuoteForm";
import { ChevronRightIcon, ClockIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import {
  defaultCountryCode,
  getContactMethods,
  getCountries,
  getEquipment,
  getEquipmentCategories,
  getPurchaseTimeframes,
  getSiteConfig,
} from "@/lib/data";
import { toDialString, toWhatsAppNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us the machine, the site and the timeframe. We come back with what fits, what it costs and what it takes to keep it running.",
};

type Props = { searchParams: Promise<{ model?: string }> };

export default async function RequestQuotePage({ searchParams }: Props) {
  const { model } = await searchParams;

  const [site, categories, equipment, countries, timeframes, contactMethods] =
    await Promise.all([
      getSiteConfig(),
      getEquipmentCategories(),
      getEquipment(),
      getCountries(),
      getPurchaseTimeframes(),
      getContactMethods(),
    ]);

  // The form only needs enough of a machine to label an option — sending whole
  // Equipment records (specs, features, galleries) across the client boundary
  // would be several hundred KB of payload for a select.
  const options: QuoteEquipmentOption[] = equipment.map((e) => ({
    slug: e.slug,
    model: e.model,
    name: e.name,
    categorySlug: e.categorySlug,
  }));

  return (
    <>
      <Header />
      <main>
        {/* -------------------------------------------------------- breadcrumb */}
        <div className="border-b border-steel-200 bg-steel-50">
          <Container>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 py-3.5 text-[0.8125rem] text-steel-500"
            >
              <Link href="/" className="transition-colors hover:text-navy-700">
                Home
              </Link>
              <ChevronRightIcon className="text-[0.7em] text-steel-300" />
              <span className="text-navy-800">Request a Quote</span>
            </nav>
          </Container>
        </div>

        <Section tone="light">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-16">
              {/* --------------------------------------------------- the form */}
              <div>
                <Reveal>
                  <Eyebrow>Request a quote</Eyebrow>
                  <h1 className="text-display-md mt-4 text-navy-800 uppercase">
                    Tell us what the job needs
                  </h1>
                  <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-steel-600 md:text-base">
                    The more you can tell us about the machine and the site, the
                    closer the first number will be. If you are not sure which
                    model fits, say what the job is and we will advise.
                  </p>
                </Reveal>

                {/* Some buyers would rather ask a person than fill in a form.
                    Saying so up front costs a line and saves an abandonment. */}
                <Reveal delay={0.08}>
                  <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[3px] border border-amber-200 bg-amber-50 px-4 py-3.5 text-[0.875rem] text-navy-800">
                    <span>Not sure which machine you need?</span>
                    <a
                      href={`https://wa.me/${toWhatsAppNumber(site.whatsapp)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display inline-flex items-center gap-1.5 font-semibold tracking-[0.04em] text-navy-700 uppercase underline underline-offset-4 transition-colors hover:text-amber-700"
                    >
                      <WhatsAppIcon aria-hidden="true" />
                      Ask us on WhatsApp
                    </a>
                  </p>
                </Reveal>

                <Reveal delay={0.14}>
                  <div className="mt-9">
                    <QuoteForm
                      categories={categories}
                      equipment={options}
                      countries={countries}
                      timeframes={timeframes}
                      contactMethods={contactMethods}
                      defaultCountry={defaultCountryCode}
                      initialModel={model}
                      whatsapp={site.whatsapp}
                    />
                  </div>
                </Reveal>
              </div>

              {/* --------------------------------------------------- side rail */}
              <Reveal delay={0.1}>
                <aside className="lg:sticky lg:top-28">
                  <div className="rounded-[3px] border border-steel-200 bg-steel-50 p-6">
                    <h2 className="font-display text-[0.75rem] font-semibold tracking-[0.14em] text-navy-800 uppercase">
                      Rather talk to someone?
                    </h2>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-steel-600">
                      Sales can size a machine over the phone in a few minutes.
                    </p>

                    <div className="mt-6 space-y-4">
                      {[
                        {
                          icon: <PhoneIcon />,
                          label: "Call",
                          value: site.phone,
                          href: `tel:${toDialString(site.phone)}`,
                          external: false,
                        },
                        {
                          icon: <WhatsAppIcon />,
                          label: "WhatsApp",
                          value: site.whatsapp,
                          href: `https://wa.me/${toWhatsAppNumber(site.whatsapp)}`,
                          external: true,
                        },
                        {
                          icon: <MailIcon />,
                          label: "Sales email",
                          value: site.salesEmail,
                          href: `mailto:${site.salesEmail}`,
                          external: false,
                        },
                      ].map((row) => (
                        <a
                          key={row.label}
                          href={row.href}
                          {...(row.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="group flex items-center gap-3.5 text-steel-700 transition-colors hover:text-navy-800"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] border border-steel-300 bg-white text-base text-navy-700 transition-colors group-hover:border-amber-500 group-hover:text-amber-600">
                            {row.icon}
                          </span>
                          <span className="min-w-0">
                            <span className="font-display block text-[0.625rem] font-semibold tracking-[0.16em] text-steel-500 uppercase">
                              {row.label}
                            </span>
                            <span className="font-display block truncate text-[0.9375rem] font-semibold text-navy-800">
                              {row.value}
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>

                    <p className="mt-6 flex items-start gap-2.5 border-t border-steel-200 pt-5 text-[0.8125rem] leading-relaxed text-steel-600">
                      <ClockIcon aria-hidden="true" className="mt-0.5 shrink-0 text-base text-steel-400" />
                      {site.hours}
                    </p>

                    {site.contactIsPlaceholder ? (
                      <p className="mt-4 rounded-[2px] bg-white px-3 py-2.5 text-[0.75rem] leading-relaxed text-steel-500">
                        Phone numbers shown are placeholders for this prototype
                        and are pending the client&rsquo;s real details.
                      </p>
                    ) : null}
                  </div>
                </aside>
              </Reveal>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
