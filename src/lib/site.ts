/**
 * Site-level environment.
 *
 * The only environment variable the site still reads. Everything else — the
 * catalogue, the images, the films — is baked in and served from this project,
 * so a build needs no credentials and a page render needs no network.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
