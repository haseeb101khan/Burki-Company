import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/lib/data";
import { getStripBrands } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { routes } from "@/lib/routes";

const ORIGINAL_LOGOS: Record<string, string> = {
  xinyuan: "/brand-logos/xinyuan-original.png",
  "load-x": "/brand-logos/load-x-original.png",
  xcmg: "/brand-logos/xcmg-original.png",
};

/**
 * Manufacturer strip, directly under the nav.
 *
 * Which brands appear here is an explicit per-brand flag in the CMS, not a
 * consequence of how the brand is classified. With the brand list open-ended
 * and growing, that is an editorial decision the client makes in the Studio.
 * All three brands currently appear here. The earlier exception — keeping the
 * house lines out — no longer applies: every brand on the site is now a
 * manufacturer Burki distributes.
 *
 * The supplied original-colour marks are normalised onto identical 560x180
 * transparent canvases. They therefore occupy exactly the same layout box
 * without stretching any manufacturer's artwork.
 */
function BrandMark({ brand }: { brand: Brand }) {
  const original = ORIGINAL_LOGOS[brand.slug];

  if (!original && !brand.logo) {
    return (
      <span className="flex aspect-[28/9] w-full max-w-[168px] items-center justify-center">
        <span className="font-display whitespace-nowrap text-2xl font-bold uppercase leading-none text-navy-800">
          {brand.name}
        </span>
      </span>
    );
  }

  return (
    <span className="relative block aspect-[28/9] w-full max-w-[168px]">
      <Image
        src={original ?? brand.logo!.navy}
        alt={brand.name}
        fill
        sizes="(min-width: 1024px) 168px, 30vw"
        className="object-contain"
      />
    </span>
  );
}

export async function BrandStrip() {
  const brands = await getStripBrands();

  return (
    <section
      aria-label="Brands we supply and support"
      className="border-b border-steel-200 bg-white"
    >
      <Container className="px-0 sm:px-0 lg:px-0">
        {/* gap-px over a steel ground draws the hairline grid; each cell paints
            its own white so it can flip to navy independently. */}
        {/* Three columns because there are three brands. A column count that
            outruns the list leaves dead cells hanging off the end of the row —
            which is what an eight-column grid did back when there were six.
            If the list grows, this is the number to change. */}
        <ul className="flex overflow-x-auto gap-px bg-steel-200 lg:grid lg:grid-cols-3">
          {brands.map((brand, index) => (
            <li key={brand.id} className="min-w-[calc(100%/3)] sm:min-w-[calc(100%/3)] lg:min-w-auto">
              <Reveal delay={index * 0.04} y={10}>
                {/* The strip was inert boxes. Each cell now opens that
                    brand's catalogue, which is the only thing anyone would
                    expect a manufacturer logo on a dealer's homepage to do. */}
                <Link
                  href={routes.brand(brand)}
                  aria-label={`${brand.name} equipment`}
                  className="group flex h-full items-center justify-center bg-white px-2.5 py-4 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-steel-50 md:px-4 md:py-5"
                >
                  <BrandMark brand={brand} />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
