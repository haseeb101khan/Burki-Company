/**
 * Site-level environment.
 *
 * The only environment variable the site still reads. Everything else — the
 * catalogue, the images, the films — is baked in and served from this project,
 * so a build needs no credentials and a page render needs no network.
 *
 * `metadataBase` is the one thing that genuinely has to know its own public
 * origin: canonical links and Open Graph URLs are absolute, so getting this
 * wrong ships `localhost:3000` into every share preview and every canonical
 * tag. The order below is deliberate:
 *
 *  1. NEXT_PUBLIC_SITE_URL — the real domain, once there is one. Always wins.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — the project's stable production host,
 *     injected by Vercel. It is the same on every production deploy, so
 *     canonicals stay put. This is what makes a deploy correct before anyone
 *     has configured a domain, rather than quietly correct-looking and wrong.
 *  3. localhost — development.
 *
 * VERCEL_URL is deliberately NOT used: it is unique per deployment, so it would
 * point canonical tags at a build-specific host that changes on every push.
 *
 * Both Vercel variables are server-only, which is fine — metadata is generated
 * on the server. Nothing in the browser needs this value.
 */
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : null;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  fromVercel ||
  "http://localhost:3000"
).replace(/\/$/, "");
