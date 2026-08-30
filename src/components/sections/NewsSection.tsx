import { NewsStrip } from "./NewsStrip";
import { getCompanyInfo, getNews } from "@/lib/data";

/**
 * Server wrapper for the news strip.
 *
 * The strip holds scroll state, so it is a client component and cannot reach
 * the data layer. This fetches the posts and the social accounts once and
 * hands both down.
 */
export async function NewsSection() {
  const [posts, info] = await Promise.all([getNews(), getCompanyInfo()]);
  if (posts.length === 0) return null;
  return <NewsStrip posts={posts} socials={info.socials} />;
}
