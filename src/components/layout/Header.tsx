import {
  getCatalogueBrands,
  getEquipment,
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
export async function Header({ overlay = false }: { overlay?: boolean } = {}) {
  const [brands, categories, equipment, partCategories, services, site] = await Promise.all([
    getCatalogueBrands({ includeEmpty: true }),
    getEquipmentCategories(),
    getEquipment(),
    getPartCategories(),
    getServices(),
    getSiteConfig(),
  ]);

  const catalogueGroups = [
    {
      slug: "excavators",
      models: ["C65", "C70", "C75", "C80", "C95", "C105", "C115", "C120", "C130", "C150"],
    },
    { slug: "wheel-loaders", models: ["LX-926", "LX-930", "LX-936"] },
    { slug: "backhoe-loaders", models: ["LW300FN", "LW500FN", "ZL50GN"] },
  ];

  const catalogueItems = catalogueGroups.flatMap((group) => {
    const category = categories.find((item) => item.slug === group.slug);
    if (!category) return [];

    const children = group.models.flatMap((model) => {
      const machine = equipment.find(
        (item) => item.categorySlug === group.slug && item.model === model,
      );
      return machine
        ? [{ label: machine.model, href: routes.equipmentItem(machine) }]
        : [];
    });

    return [{ label: category.name, href: routes.category(category), children }];
  });

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
        columns: 3,
        items: catalogueItems,
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
      overlay={overlay}
      nav={nav}
      contact={{
        phone: site.phone,
        email: site.email,
      }}
    />
  );
}
