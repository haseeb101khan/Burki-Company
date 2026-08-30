import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/lib/data";
import { getStripBrands } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { routes } from "@/lib/routes";

/**
 * Manufacturer strip, directly under the nav.
 *
 * Which brands appear here is an explicit per-brand flag in the CMS, not a
 * consequence of how the brand is classified. With the brand list open-ended
 * and growing, that is an editorial decision the client makes in the Studio.
 * All six brands currently appear here. The earlier exception — keeping the
 * house lines out — no longer applies: every brand on the site is now a
 * manufacturer Burki distributes.
 *
 * Every logo ships as a pair of single-colour silhouettes on an identical
 * 480x192 canvas. That matters twice over: the boxes stay visually even no
 * matter how differently the original artwork was proportioned (Doosan is 7:1,
 * Volvo is square), and the mark stays legible when its box inverts to navy —
 * two of the supplied files were white-on-black, which would have vanished
 * against a white strip, and two were pale silver, which would have washed out.
 */
function BrandMark({ brand }: { brand: Brand }) {
  if (!brand.logo) {
    /*
     * No artwork supplied: a drawn wordmark rather than a line of body text.
     *
     * LOAD-X sat among five real manufacturer marks looking like a caption that
     * had lost its logo. This gives it the weight of one — the display face at
     * mark scale, tight tracking, and the X carried in the accent colour so it
     * reads as a device rather than a letter. Still just type, so it needs no
     * artwork and no permission, and it inverts with the box like the rest.
     */
    const [head, tail] = brand.name.split(/-(?=[^-]*$)/);
    return (
      <span className="flex aspect-[5/2] w-full max-w-[140px] items-center justify-center">
        <span className="font-display whitespace-nowrap text-[1.6rem] font-bold uppercase leading-none tracking-[-0.02em] text-navy-800 transition-colors duration-300 group-hover:text-white md:text-[1.75rem]">
          {tail ? (
            <>
              {head}
              <span className="text-amber-500">–{tail}</span>
            </>
          ) : (
            brand.name
          )}
        </span>
      </span>
    );
  }

  /* Both variants are stacked and cross-faded, so hovering never waits on a
     network request for the second image. The box is fluid with a fixed 5:2
     ratio — matching the shared canvas — so every logo scales identically as
     the grid narrows. */
  return (
    <span className="relative block aspect-[5/2] w-full max-w-[140px]">
      <Image
        src={brand.logo.navy}
        alt={brand.name}
        fill
        sizes="(min-width: 1024px) 140px, 22vw"
        className="object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-0 group-active:opacity-0 group-focus-visible:opacity-0"
      />
      <Image
        src={brand.logo.white}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 140px, 22vw"
        className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100"
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
        {/* Six columns because there are six brands. An eight-column grid left
            two dead cells hanging off the end of the row. If the list grows,
            this is the number to change. */}
        <ul className="flex overflow-x-auto gap-px bg-steel-200 lg:grid lg:grid-cols-6">
          {brands.map((brand, index) => (
            <li key={brand.id} className="min-w-[calc(100%/3)] sm:min-w-[calc(100%/3)] lg:min-w-auto">
              <Reveal delay={index * 0.04} y={10}>
                {/* The strip was six inert boxes. Each cell now opens that
                    brand's catalogue, which is the only thing anyone would
                    expect a manufacturer logo on a dealer's homepage to do. */}
                <Link
                  href={routes.brand(brand)}
                  aria-label={`${brand.name} equipment`}
                  className="group flex items-center justify-center bg-white px-2.5 py-4 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-navy-800 md:px-4 md:py-5 h-full"
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
