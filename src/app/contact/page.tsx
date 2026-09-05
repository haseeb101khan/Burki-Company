import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OfficeMaps } from "@/components/about/OfficeMaps";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArrowRight, Button } from "@/components/ui/Button";
import {
  ChevronRightIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { getCompanyInfo, getSiteConfig } from "@/lib/data";
import { toDialString, toWhatsAppNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Burki & Company by WhatsApp, phone or email, or find our Karachi and Islamabad offices.",
};

export default async function ContactPage() {
  const [site, company] = await Promise.all([
    getSiteConfig(),
    getCompanyInfo(),
  ]);

  const whatsappHref = `https://wa.me/${toWhatsAppNumber(site.whatsapp)}`;
  const methods = [
    {
      label: "WhatsApp",
      note: "Primary line for equipment, parts and service enquiries.",
      value: site.whatsapp,
      href: whatsappHref,
      icon: <WhatsAppIcon />,
      action: "Message us",
      external: true,
      primary: true,
    },
    {
      label: "Helpline",
      note: "Call our team during business hours.",
      value: site.phone,
      href: `tel:${toDialString(site.phone)}`,
      icon: <PhoneIcon />,
      action: "Call now",
      external: false,
      primary: false,
    },
    {
      label: "Email",
      note: "Send documents, specifications and company enquiries.",
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <MailIcon />,
      action: "Write to us",
      external: false,
      primary: false,
    },
  ];

  return (
    <>
      <Header />
      <main id="main">
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
              <span className="text-navy-800">Contact</span>
            </nav>
          </Container>
        </div>

        <section className="relative isolate min-h-[430px] overflow-hidden bg-navy-950 text-white md:min-h-[510px]">
          <Image
            src="/images/about/burki-group-hq.webp"
            alt="Burki Group of Companies head office"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/80" />

          <Container className="relative flex min-h-[430px] items-center py-14 pr-[6.75rem] sm:pr-32 md:min-h-[510px] md:py-18 lg:pr-12">
            <Reveal className="max-w-3xl">
              <Eyebrow tone="light">Burki &amp; Company</Eyebrow>
              <h1 className="mt-5 text-display-lg tracking-normal uppercase text-white">
                Talk directly to our team
              </h1>
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-white/75 md:text-lg">
                For equipment, genuine parts or after-sales support, WhatsApp is
                the fastest way to reach us. You can also call the helpline or
                visit our Karachi and Islamabad offices.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={whatsappHref} external size="lg">
                  <WhatsAppIcon />
                  Message on WhatsApp
                </Button>
                <Button href="/request-a-quote" variant="outlineLight" size="lg">
                  Request a Quote
                  <ArrowRight />
                </Button>
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm text-white/70">
                <WhatsAppIcon className="text-amber-400" />
                <span>Primary contact: {site.whatsapp}</span>
              </p>
            </Reveal>
          </Container>
        </section>

        <Section tone="light" spacing="tight">
          <Container>
            <Reveal>
              <Eyebrow>Contact directory</Eyebrow>
              <h2 className="mt-4 text-display-sm tracking-normal uppercase text-navy-900">
                Choose the fastest route
              </h2>
            </Reveal>

            <div className="mt-9 grid overflow-hidden rounded-[3px] border border-steel-200 md:grid-cols-3">
              {methods.map((method, index) => (
                <Reveal key={method.label} delay={index * 0.07} className="h-full">
                  <a
                    href={method.href}
                    {...(method.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`group flex h-full min-h-56 flex-col border-steel-200 p-6 transition-colors md:p-7 ${
                      index > 0 ? "border-t md:border-l md:border-t-0" : ""
                    } ${method.primary ? "bg-navy-50" : "bg-white hover:bg-steel-50"}`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-steel-300 bg-white text-xl text-navy-700 transition-colors group-hover:border-amber-500 group-hover:text-amber-600">
                      {method.icon}
                    </span>
                    <span className="mt-6 font-display text-sm font-bold tracking-normal uppercase text-navy-900">
                      {method.label}
                      {method.primary ? (
                        <span className="ml-2 text-[0.6875rem] font-semibold text-amber-700">
                          Primary
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-2 break-words font-display text-xl font-semibold tracking-normal text-navy-800">
                      {method.value}
                    </span>
                    <span className="mt-3 text-[0.875rem] leading-relaxed text-steel-600">
                      {method.note}
                    </span>
                    <span className="mt-auto flex items-center gap-1.5 pt-5 font-display text-sm font-semibold tracking-normal uppercase text-navy-700 transition-colors group-hover:text-amber-700">
                      {method.action}
                      <ArrowRight />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.18}>
              <p className="mt-6 flex items-start gap-3 border-l-2 border-amber-500 bg-steel-50 px-4 py-3.5 text-[0.875rem] leading-relaxed text-steel-700">
                <ClockIcon className="mt-0.5 shrink-0 text-base text-navy-700" />
                <span>
                  <strong className="font-semibold text-navy-900">Business hours:</strong>{" "}
                  {site.hours}
                </span>
              </p>
            </Reveal>
          </Container>
        </Section>

        <OfficeMaps locations={company.locations} />

        <Section tone="navy" spacing="tight">
          <Container>
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
              <Reveal>
                <Eyebrow tone="light">Planning a purchase?</Eyebrow>
                <h2 className="mt-4 text-display-sm tracking-normal uppercase text-white">
                  Send the machine and job details
                </h2>
                <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-white/65">
                  The quote form gives our team the specifications, location and
                  timeframe needed to respond accurately.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button href="/request-a-quote" size="lg">
                    Request a Quote
                    <ArrowRight />
                  </Button>
                  <Button href="/equipment" size="lg" variant="outlineLight">
                    Browse Equipment
                  </Button>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
