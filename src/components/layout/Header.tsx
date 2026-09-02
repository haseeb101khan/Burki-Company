import {
  getCatalogueBrands,
  getEquipmentCategories,
  getPartCategories,
  getServices,
  getSiteConfig,
} from "@/lib/data";
import { HeaderNav, type NavItem } from "./HeaderNav";
import { routes } from "@/lib/routes";

/**
 * Server wrapper: pulls navigation content through the data layer and hands it
 * to the interactive nav. When the CMS lands, only these calls change.
 */
export async function Header() {
  const [brands, categories, partCategories, services, site] = await Promise.all([
    getCatalogueBrands({ includeEmpty: true }),
    getEquipmentCategories(),
    getPartCategories(),
    getServices(),
    getSiteConfig(),
  ]);

  const nav: NavItem[] = [
    {
      label: "Equipment",
      href: routes.equipment(),
      panel: {
        /* Brands lead, categories beside them in two columns. */
        lead: {
          title: "By brand",
          items: brands.map((b) => ({ label: b.name, href: routes.brand(b) })),
        },
        columns: 2,
        items: categories.map((c) => ({
          label: c.name,
          href: routes.category(c),
        })),
        promo: {
          title: "Xinyuan C Series",
          description: "Eleven wheeled excavators, 6.5 to 15 tonnes.",
          href: routes.brand("xinyuan"),
          image: {
            src: "/images/xinyuan/xinyuan-banner-1.jpg",
            alt: "XINYUAN branding on an excavator boom",
          },
        },
      },
    },
    {
      label: "Parts",
      href: "/parts",
      panel: {
        columns: 2,
        items: partCategories.map((c) => ({
          label: c.name,
          href: `/parts/${c.slug}`,
        })),
        promo: {
          title: "Parts Support",
          description: "Filters, wear parts and driveline components held locally.",
          href: "/parts",
          image: {
            src: "/images/part-hydraulic.jpg",
            alt: "Hydraulic components on a machine",
          },
        },
      },
    },
    {
      label: "Services",
      href: "/services",
      panel: {
        columns: 1,
        items: services.map((s) => ({
          label: s.name,
          href: `/services#${s.slug}`,
        })),
      },
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <HeaderNav
      nav={nav}
      contact={{
        phone: site.phone,
        email: site.email,
      }}
    />
  );
}
