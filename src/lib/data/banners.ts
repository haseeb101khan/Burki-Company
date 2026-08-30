import { content } from "@/lib/content/content";
import type { Banner } from "./types";

/**
 * BANNER DATA ACCESS
 *
 * Both slide kinds were already resolved into the one `Banner` shape at build
 * time, so the carousel never branches on where a slide came from.
 */
export async function getBanners(): Promise<Banner[]> {
  return structuredClone(content.banners);
}
