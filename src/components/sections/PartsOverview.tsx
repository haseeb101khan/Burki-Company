import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { getPartCategories } from "@/lib/data";

/**
 * Parts, at category level only.
 *
 * Deliberately not a parts listing: the client's instruction was that the
 * homepage should say "we supply engine parts" with a line explaining what that
 * covers, not enumerate individual items. Individual parts live on the category
 * pages behind these links.
 */
export async function PartsOverview() {
  const categories = await getPartCategories();

  return (
    <Section tone="muted">
      <Container>
        <SectionHeader
          eyebrow="Parts"
          title="Parts for every system on the machine"
          description="Whatever the component group, we supply the full range within it — identified from your machine model and serial."
        />

        <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={(index % 4) * 0.06}>
              <Link
                href={`/parts/${category.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-steel-200 bg-white transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-300 hover:shadow-[0_22px_44px_-28px_rgba(0,17,46,0.5)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-steel-100">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold uppercase leading-tight tracking-tight text-navy-800 md:text-lg">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-steel-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* Eighth tile completes the 4-column grid and carries the CTA. */}
          <Reveal delay={0.18}>
            <Link
              href="/parts"
              className="group flex h-full flex-col justify-between rounded-[3px] border border-navy-700 bg-navy-800 p-6 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-navy-700 hover:shadow-[0_22px_44px_-26px_rgba(0,17,46,0.65)]"
            >
              <h3 className="text-base font-bold uppercase leading-tight tracking-tight text-white md:text-lg">
                Looking for a
                <br />
                specific part?
              </h3>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-white/60">
                Send us the machine model and we will identify it for you.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-amber-500">
                Browse all parts
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
