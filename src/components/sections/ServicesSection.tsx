import Image from "next/image";
import { ArrowRight, Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { getServices } from "@/lib/data";

export async function ServicesSection() {
  const services = await getServices();

  return (
    <Section tone="light">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          {/* --------------------------------------------------- intro side */}
          <div>
            <Reveal>
              <Eyebrow>Services &amp; support</Eyebrow>
              <h2 className="mt-4 text-display-md uppercase text-navy-800">
                Equipment,
                <br className="hidden sm:block" /> parts and support
                <br className="hidden sm:block" /> as one thing
              </h2>
              <p className="mt-5 text-base leading-relaxed text-steel-600">
                Specification, supply and everything after it. The same team
                answers the sizing question and the breakdown call.
              </p>
              <div className="mt-8">
                <Button href="/services" variant="outline">
                  All services
                  <ArrowRight />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-10 hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-steel-100">
                <Image
                  src="/images/band-support.jpg"
                  alt="Technician working on heavy machinery components"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------------- service grid */}
          <div className="grid gap-px bg-steel-200 sm:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.07} className="bg-white">
                <article className="flex h-full flex-col p-6 md:p-8">
                  <span className="font-display text-sm font-semibold tabular-nums text-amber-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-bold uppercase leading-tight tracking-tight text-navy-800 md:text-xl">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-600">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-steel-100 pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-steel-600"
                      >
                        <CheckIcon className="mt-0.5 shrink-0 text-sm text-amber-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
