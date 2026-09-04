import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { getPartCategories } from "@/lib/data";

const homepageCopy: Record<string, string> = {
  attachments: "Buckets, breakers and tools matched to your machine.",
  "xinyuan-genuine-parts": "Factory components matched by model and serial.",
  filters: "Oil, fuel, air and hydraulic filtration.",
  oil: "Engine, hydraulic and transmission oils.",
};

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
          title="Parts that keep machines working"
          description="Genuine components and service items matched to your machine model and serial."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={(index % 4) * 0.06}>
              <Link
                href={`/parts/${category.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-steel-200 bg-white transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy-300 hover:shadow-[0_22px_44px_-28px_rgba(0,17,46,0.5)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-steel-100">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex min-h-[7.75rem] flex-1 flex-col p-4 md:min-h-[8.25rem] md:p-5">
                  <h3 className="text-base font-bold uppercase leading-tight text-navy-800 md:text-lg">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-snug text-steel-600">
                    {homepageCopy[category.slug] ?? category.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18}>
          <Link
            href="/parts"
            className="group mt-4 flex flex-col justify-between gap-5 rounded-[3px] border border-navy-700 bg-navy-800 px-5 py-5 transition-colors hover:bg-navy-700 sm:flex-row sm:items-center md:px-7"
          >
            <div>
              <h3 className="text-lg font-bold uppercase leading-tight text-white md:text-xl">
                Looking for a specific part?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Send us the machine model and serial number and we will identify it.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 font-display text-sm font-semibold uppercase text-amber-500">
              Browse all parts
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
