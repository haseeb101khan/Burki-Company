"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { cn, toDialString } from "@/lib/utils";

/*
 * Shared nav-link styling: an amber rule wipes in from the left on hover.
 *
 * Sized up twice: 13px/semibold to 15px, and 15px to 17px on the client's call.
 * At the original size the primary navigation read as fine print next to the
 * amber quote button — smaller than the utility bar's own phone number. These
 * are the main routes through the site and should look like it.
 *
 * Tracking eased at each step, because letterspacing that reads as deliberate
 * at 13px sprawls at 17. Horizontal padding comes in a little below `lg` so the
 * six items still clear the logo and the quote button on a 1280px screen.
 */
const NAV_LINK =
  "relative inline-flex items-center gap-1.5 px-3 py-2 font-display text-[1.0625rem] font-bold uppercase tracking-[0.05em] transition-colors lg:px-3.5 " +
  "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:origin-left after:scale-x-0 after:bg-amber-500 " +
  "after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100";

export type NavPanelItem = { label: string; href: string };
export type NavPromo = {
  title: string;
  description: string;
  href: string;
  image: { src: string; alt: string };
};
export type NavItem = {
  label: string;
  href: string;
  panel?: {
    items: NavPanelItem[];
    columns: 1 | 2 | 3;
    /**
     * A highlighted column on the left of the panel, ahead of `items`.
     *
     * Equipment uses it for the manufacturers. For a multi-brand
     * distributor that is the first cut a buyer makes — "what do you carry from
     * Xinyuan" — so it leads the panel and is styled to be read first, with the
     * machine categories beside it as the second way in.
     */
    lead?: { title: string; items: NavPanelItem[] };
    promo?: NavPromo;
  };
};

type HeaderNavProps = {
  nav: NavItem[];
  contact: { phone: string; email: string };
  /**
   * True where the bar sits over a full-bleed hero — the homepage.
   *
   * A solid white bar above a hero reads as a lid on it: the banner starts
   * below a band of chrome instead of being the first thing on the page. Over
   * a hero the bar is transparent with white type until the visitor scrolls,
   * at which point it becomes the solid bar every other page starts with.
   */
  overlay?: boolean;
};

export function HeaderNav({ nav, contact, overlay = false }: HeaderNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const pathname = usePathname();

  /*
   * Only one thing is now inverted: the bar while it floats over a hero.
   *
   * It used to flip white-on-navy the moment you scrolled, on every page. That
   * left the homepage with a white lid above its banner and a navy bar below
   * it — two states, neither of them the hero's. The bar is now white with navy
   * type whenever it is solid, and transparent with white type only while it is
   * over the hero. Scrolling on the homepage is therefore a fade from
   * transparent to the same bar every other page has.
   */
  const inverted = overlay && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close everything on navigation. Adjusting state during render (React's
     documented pattern for resetting on a changed value) rather than in an
     effect, which would render the stale open menu for a frame first. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setDrawerOpen(false);
    setOpenAccordion(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Lock the page behind the mobile drawer. */
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  const isActive = useCallback(
    (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href)),
    [pathname],
  );

  // Negative top on desktop lets the 36px utility bar scroll away while the
  // main bar stays pinned.
  return (
    <header className="sticky top-0 z-50 md:top-[-36px]">
      {/* ---------------------------------------------------- utility bar */}
      <div
        className={cn(
          "hidden h-9 items-center border-b border-navy-700/60 text-white/75 md:flex",
          overlay ? "bg-navy-950/70 backdrop-blur-sm" : "bg-navy-800",
        )}
      >
        <Container className="flex items-center justify-between gap-6">
          <p className="font-display text-[0.6875rem] font-medium uppercase tracking-[0.16em]">
            Heavy equipment, parts &amp; after-sales support
          </p>
          <div className="flex items-center gap-6 text-[0.75rem]">
            <a
              href={`tel:${toDialString(contact.phone)}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-amber-400"
            >
              <PhoneIcon className="text-[0.9em]" />
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-amber-400"
            >
              <MailIcon className="text-[0.9em]" />
              {contact.email}
            </a>
          </div>
        </Container>
      </div>

      {/* ----------------------------------------------------- main nav bar */}
      <div
        className={cn(
          "backdrop-blur-md transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          inverted
            ? /* Over the hero: no ground, no rule. A hairline here would draw a
                 line across the artwork. */
              "border-b border-white/10 bg-transparent"
            : "border-b border-steel-200 bg-white/95 shadow-[0_10px_30px_-26px_rgba(0,17,46,0.55)]",
        )}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
          <Logo variant={inverted ? "white" : "navy"} height={40} priority />

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const hasPanel = Boolean(item.panel);
              const open = openMenu === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(hasPanel ? item.label : null)}
                >
                  {hasPanel ? (
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenMenu(open ? null : item.label)}
                      className={cn(
                        NAV_LINK,
                        inverted
                          ? isActive(item.href)
                            ? "text-amber-400"
                            : "text-white/85 hover:text-amber-400"
                          : isActive(item.href)
                            ? "text-amber-600"
                            : "text-navy-800 hover:text-amber-600",
                      )}
                    >
                      {item.label}
                      <ChevronDownIcon
                        className={cn(
                          "text-[0.85em] transition-transform duration-300",
                          open && "rotate-180",
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        NAV_LINK,
                        inverted
                          ? isActive(item.href)
                            ? "text-amber-400"
                            : "text-white/85 hover:text-amber-400"
                          : isActive(item.href)
                            ? "text-amber-600"
                            : "text-navy-800 hover:text-amber-600",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href="/request-a-quote"
              size="sm"
              variant="primary"
              className="hidden sm:inline-flex"
            >
              Request a Quote
            </Button>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-[3px] text-2xl transition-colors lg:hidden",
                inverted ? "text-white hover:bg-white/10" : "text-navy-800 hover:bg-steel-100",
              )}
            >
              <MenuIcon />
            </button>
          </div>
        </Container>

        {/* ------------------------------------------------ mega panel */}
        {nav.map((item) => {
          if (!item.panel || openMenu !== item.label) return null;
          const { items, columns, promo, lead } = item.panel;

          return (
            <div
              key={`${item.label}-panel`}
              className="absolute inset-x-0 top-full hidden border-b border-steel-200 bg-white shadow-[0_20px_40px_-24px_rgba(0,17,46,0.35)] lg:block"
            >
              <Container
                className={cn(
                  "grid gap-10 py-9",
                  lead ? "lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_auto]" : "lg:grid-cols-[1fr_auto]",
                )}
              >
                {lead ? (
                  <div className="lg:min-w-[210px]">
                    <p className="eyebrow-rule font-display text-eyebrow uppercase text-navy-700">
                      {lead.title}
                    </p>
                    <ul className="mt-6 space-y-1">
                      {lead.items.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group flex items-center justify-between gap-4 rounded-[3px] px-3 py-2.5 font-display text-[0.9375rem] font-semibold uppercase tracking-[0.06em] text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                          >
                            {link.label}
                            <ChevronRightIcon className="text-[0.9em] text-navy-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-amber-500" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div>
                  <p className="eyebrow-rule font-display text-eyebrow uppercase text-navy-700">
                    {item.label}
                  </p>
                  <ul
                    className={cn(
                      "mt-6 grid gap-x-10 gap-y-1",
                      columns === 3 && "grid-cols-3",
                      columns === 2 && "grid-cols-2",
                      columns === 1 && "grid-cols-1",
                    )}
                  >
                    {items.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between gap-4 border-b border-steel-100 py-2.5 text-sm font-medium text-steel-700 transition-colors hover:text-amber-600"
                        >
                          {link.label}
                          <ChevronRightIcon className="text-[0.9em] text-steel-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-amber-500" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-navy-700 transition-colors hover:text-amber-600"
                  >
                    View all {item.label.toLowerCase()}
                    <ChevronRightIcon className="text-[0.9em]" />
                  </Link>
                </div>

                {promo ? (
                  <Link
                    href={promo.href}
                    className="group relative flex w-[300px] flex-col justify-end overflow-hidden rounded-[3px] bg-navy-900 p-5"
                  >
                    <Image
                      src={promo.image.src}
                      alt={promo.image.alt}
                      fill
                      sizes="300px"
                      className="object-cover opacity-60 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent" />
                    <div className="relative">
                      <h4 className="text-lg font-bold uppercase leading-tight text-white">
                        {promo.title}
                      </h4>
                      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-white/70">
                        {promo.description}
                      </p>
                    </div>
                  </Link>
                ) : null}
              </Container>
            </div>
          );
        })}
      </div>

      {/* ----------------------------------------------------- mobile drawer */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-steel-200 px-5">
              <Logo variant="navy" height={30} />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] text-2xl text-navy-800 hover:bg-steel-100"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-4" aria-label="Mobile">
              <ul className="divide-y divide-steel-100">
                {nav.map((item) => {
                  const expanded = openAccordion === item.label;
                  return (
                    <li key={item.label} className="py-1">
                      {item.panel ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={expanded}
                            onClick={() => setOpenAccordion(expanded ? null : item.label)}
                            className="flex w-full items-center justify-between py-3 text-left font-display text-base font-semibold uppercase tracking-[0.06em] text-navy-800"
                          >
                            {item.label}
                            <ChevronDownIcon
                              className={cn(
                                "text-lg text-steel-400 transition-transform duration-300",
                                expanded && "rotate-180",
                              )}
                            />
                          </button>
                          {expanded ? (
                            <ul className="mb-3 space-y-0.5 border-l-2 border-amber-500 pl-4">
                              {item.panel.items.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="block py-2 text-sm text-steel-600 hover:text-amber-600"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href={item.href}
                                  className="block py-2 font-display text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-navy-700"
                                >
                                  View all {item.label.toLowerCase()}
                                </Link>
                              </li>
                            </ul>
                          ) : null}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="block py-3 font-display text-base font-semibold uppercase tracking-[0.06em] text-navy-800"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="shrink-0 space-y-3 border-t border-steel-200 p-5">
              <Button href="/request-a-quote" size="md" className="w-full">
                Request a Quote
              </Button>
              <a
                href={`tel:${toDialString(contact.phone)}`}
                className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-navy-700"
              >
                <PhoneIcon /> {contact.phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
