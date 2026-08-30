import {
  contactMethods,
  countries,
  HOME_COUNTRY,
  purchaseTimeframes,
} from "./_sources/form";
import type { Country, SelectOption } from "./types";

/**
 * FORM REFERENCE DATA
 *
 * Deliberately NOT in the CMS. A country list, a set of purchase timeframes and
 * three contact methods are not content the client will ever want to edit —
 * putting them in the Studio adds three document types to maintain and one more
 * thing that can be half-filled, in exchange for nothing.
 *
 * Submission lives in `src/lib/actions/quote.ts` as a server action, because it
 * writes to Sanity and is called from a client component.
 */

/**
 * Countries, home market first and the rest alphabetical.
 *
 * Pakistan sitting at the top is not decoration — it is the overwhelmingly
 * likely answer, and scrolling past 150 entries to reach it is the single
 * most annoying thing a country select can do.
 */
export async function getCountries(): Promise<Country[]> {
  const home = countries.filter((c) => c.code === HOME_COUNTRY);
  const rest = countries
    .filter((c) => c.code !== HOME_COUNTRY)
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...home, ...rest];
}

export async function getPurchaseTimeframes(): Promise<SelectOption[]> {
  return [...purchaseTimeframes];
}

export async function getContactMethods(): Promise<SelectOption[]> {
  return [...contactMethods];
}

/** The default country for a fresh form. */
export const defaultCountryCode = HOME_COUNTRY;
