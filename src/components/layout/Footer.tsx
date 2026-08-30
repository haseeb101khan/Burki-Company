import Link from "next/link";
import {
  getEquipmentCategories,
  getIndustries,
  getPartCategories,
  getSiteConfig,
} from "@/lib/data";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  socialIcons,
} from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { toDialString } from "@/lib/utils";
import { routes } from "@/lib/routes";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-amber-500">
        {title}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-[0.875rem] text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Footer() {
  const [site, categories, partCategories, industries] = await Promise.all([
    getSiteConfig(),
    getEquipmentCategories(),
    getPartCategories(),
    getIndustries(),
  ]);

  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          {/* ------------------------------------------------ brand block */}
          <div className="max-w-sm">
            <Logo variant="white" height={38} />
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-white/60">
              {site.tagline}
            </p>

            <div className="mt-7 space-y-3 text-[0.875rem] text-white/60">
              <p className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 shrink-0 text-base text-amber-500" />
                <span>
                  {site.address.line1}
                  {site.address.line2 ? <>, {site.address.line2}</> : null}
                  <br />
                  {site.address.city}, {site.address.country}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <PhoneIcon className="shrink-0 text-base text-amber-500" />
                <a
                  href={`tel:${toDialString(site.phone)}`}
                  className="transition-colors hover:text-white"
                >
                  {site.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <MailIcon className="shrink-0 text-base text-amber-500" />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <ClockIcon className="shrink-0 text-base text-amber-500" />
                <span>{site.hours}</span>
              </p>
            </div>

            <div className="mt-7 flex items-center gap-3">
              {site.socials.map((social) => {
                const SocialIcon = socialIcons[social.platform];
                if (!SocialIcon) return null;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    aria-label={social.label}
                    /* Leaving the site: open a new tab, and never hand the
                       destination a window handle back to this page. */
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-white/15 text-base text-white/70 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-navy-900"
                  >
                    <SocialIcon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------ link columns */}
          <FooterColumn
            title="Equipment"
            links={[
              ...categories.slice(0, 7).map((c) => ({
                label: c.name,
                href: routes.category(c),
              })),
              { label: "All equipment", href: routes.equipment() },
            ]}
          />

          <FooterColumn
            title="Parts"
            links={[
              ...partCategories.map((c) => ({
                label: c.name,
                href: `/parts/${c.slug}`,
              })),
              { label: "All parts", href: "/parts" },
            ]}
          />

          <div className="space-y-10">
            <FooterColumn
              title="Industries"
              links={industries.slice(0, 6).map((i) => ({
                label: i.name,
                href: `/industries/${i.slug}`,
              }))}
            />
            <FooterColumn
              title="Company"
              links={[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Contact", href: "/contact" },
                { label: "Request a Quote", href: "/request-a-quote" },
              ]}
            />
          </div>
        </div>
      </Container>

      {/* ------------------------------------------------------- bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-[0.75rem] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          {/* The founding year is not confirmed — see CMS.md. Until it is, this
              says what is actually known rather than printing a guessed year. */}
          <p>
            Heavy equipment and parts since{" "}
            {site.foundedYear ?? "the late 1970s"}.
          </p>
        </Container>
      </div>
    </footer>
  );
}
