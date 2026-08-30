import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { Partner } from "@/lib/data";

/**
 * The client wall, as a grid.
 *
 * Each logo sits in its own bordered cell on white. The artwork is already
 * normalised to one canvas size by `scripts/prepare-partners.mjs`, so the cells
 * only have to hold it — the optical balancing was done at build time, where a
 * tall mark and a wide wordmark could actually be measured against each other.
 *
 * NO NAMES ARE PRINTED. The marks carry their own names, and a caption under
 * each is an invitation to misspell somebody else's company. The name is on the
 * image's alt text, where a screen reader gets it and a typo cannot embarrass
 * the client in public.
 */
export function PartnerLogos({ partners }: { partners: Partner[] }) {
  const withLogos = partners.filter((p) => p.logo);
  if (withLogos.length === 0) return null;

  return (
    /* Five across, so ten logos fill two rows exactly and the block sits about
       as tall as the copy beside it. Bordered cells with a real gap rather than
       a 1px-gap grid over a tinted parent: that trick leaves a partial last row
       showing as empty grey boxes, and the logo count will change. */
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {withLogos.map((partner, index) => (
        <Reveal key={partner.id} delay={Math.min(index, 8) * 0.05}>
          <div className="flex h-full items-center justify-center rounded-[3px] border border-steel-200 bg-white px-3 py-4">
            {/* `fill` in a fixed box, so every logo letterboxes to its own
                proportions — the artwork keeps its natural aspect and no
                per-file dimensions have to live in the data. */}
            <div className="relative h-[46px] w-full max-w-[104px]">
              <Image
                src={partner.logo!}
                alt={partner.name}
                fill
                sizes="104px"
                className="object-contain"
              />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
