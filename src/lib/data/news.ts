import { content } from "@/lib/content/content";
import type { NewsPost } from "./types";

/**
 * NEWS DATA ACCESS
 *
 * Same contract as the rest of the layer: async in, cloned plain data out,
 * read from the baked-in content file. No platform API is involved — see the
 * note at the top of scripts/seed-data/news.ts for why.
 */

const clone = <T,>(value: T): T => structuredClone(value);

export async function getNews(limit?: number): Promise<NewsPost[]> {
  const posts = [...content.news].sort((a, b) => a.order - b.order);
  return clone(typeof limit === "number" ? posts.slice(0, limit) : posts);
}
