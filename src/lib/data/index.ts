/**
 * The public surface of the data layer.
 *
 * Pages and components import from `@/lib/data` only. Nothing outside this
 * folder should reach into `@/sanity` directly.
 *
 * These modules are server-only — they hold the Sanity client. Client
 * components may import TYPES from here (`import type { Equipment }`), which
 * TypeScript erases, but never values. The one value a client component needs
 * is `submitQuoteRequest`, which lives in `@/lib/actions/quote` as a server
 * action for exactly that reason.
 */
export * from "./types";
export * from "./banners";
export * from "./equipment";
export * from "./form";
export * from "./parts";
export * from "./news";
export * from "./site";
