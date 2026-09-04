import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/lib/data";
import { getStripBrands } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

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
     * IT HAS TO PASS AS ONE OF THE SET. An earlier version set the trailing
     * letter in the accent colour, which made LOAD-X the one coloured thing in
     * a row of grey silhouettes — it read as a highlighted item rather than a
     * sixth manufacturer. It now takes exactly the treatment the real marks
     * take: one colour, the same 70% weight at rest, and the same flip to white
     * when the cell inverts. Larger than the marks around it on purpose, since
     * type at a logo's cap height looks smaller than artwork filling the same
     * box.
     */
    return (
      <span className="flex aspect-[5/2] w-full max-w-[140px] items-center justify-center">
        <span className="font-display whitespace-nowrap text-[2rem] font-bold uppercase leading-none tracking-[-0.02em] text-navy-800 opacity-70 transition-all duration-300 group-hover:text-white group-hover:opacity-100 group-active:text-white group-focus-visible:text-white md:text-[2.25rem]">
          {brand.name}
        </span>
      </span>
    );
  }

  /* Both variants are stacked and cross-faded, so hovering never waits on a
     network request for the second image. The box is fluid with a fixed 5:2
     ratio — matching the shared canvas — so every logo scales identically as
     the grid narrows. */
  return (
    <span
      className={cn(
        "relative block aspect-[5/2] w-full",
        brand.slug === "load-x"
          ? "max-w-[168px] scale-[1.12] md:scale-[1.18]"
          : "max-w-[140px]",
      )}
    >
      <Image
        src={brand.logo.navy}
        alt={brand.name}
        fill
        sizes={brand.slug === "load-x" ? "(min-width: 1024px) 168px, 26vw" : "(min-width: 1024px) 140px, 22vw"}
        className="object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-0 group-active:opacity-0 group-focus-visible:opacity-0"
      />
      <Image
        src={brand.logo.white}
        alt=""
        aria-hidden="true"
        fill
        sizes={brand.slug === "load-x" ? "(min-width: 1024px) 168px, 26vw" : "(min-width: 1024px) 140px, 22vw"}
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
