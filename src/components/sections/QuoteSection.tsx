import Image from "next/image";
import { ArrowRight, Button } from "@/components/ui/Button";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { getSiteConfig } from "@/lib/data";
import { toDialString, toWhatsAppNumber } from "@/lib/utils";

/** Closing conversion block: request a quote, or call / message directly. */
export async function QuoteSection() {
  const site = await getSiteConfig();

  return (
    <section className="relative overflow-hidden bg-navy-900">
      <Image
        src="/images/band-cta.jpg"
        alt="Construction machinery working on site"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy-950/85" />

      <Container className="relative py-16 md:py-22">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <Reveal>
            <p className="eyebrow-rule font-display text-eyebrow uppercase text-amber-500">
              Request a quote
            </p>
            <h2 className="mt-5 text-display-lg uppercase text-white">
              Tell us what the job needs
            </h2>
            <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-white/70 md:text-base">
              Send the machine you are after, or just the material and the site
              conditions. We will come back with what fits and what it takes to
              keep it running.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/request-a-quote" size="lg">
                Request a Quote
                <ArrowRight />
              </Button>
              <Button href="/contact" size="lg" variant="outlineLight">
                Contact us
              </Button>
            </div>
          </Reveal>

          {/* Direct lines, for buyers who would rather not fill in a form. */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3 border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <a
                href={`tel:${toDialString(site.phone)}`}
                className="group flex items-center gap-4 text-white/75 transition-colors hover:text-white"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] border border-white/20 text-lg text-amber-500 transition-colors group-hover:border-amber-500">
                  <PhoneIcon />
                </span>
                <span>
                  <span className="block font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                    Call
                  </span>
                  <span className="font-display text-base font-semibold tabular-nums">
                    {site.phone}
                  </span>
                </span>
              </a>

              <a
                href={`https://wa.me/${toWhatsAppNumber(site.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-white/75 transition-colors hover:text-white"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] border border-white/20 text-lg text-amber-500 transition-colors group-hover:border-amber-500">
                  <WhatsAppIcon />
                </span>
                <span>
                  <span className="block font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                    WhatsApp
                  </span>
                  <span className="font-display text-base font-semibold tabular-nums">
                    {site.whatsapp}
                  </span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
