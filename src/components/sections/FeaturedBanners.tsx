import { getBanners } from "@/lib/data";
import { FeaturedCarousel } from "./FeaturedCarousel";

/**
 * Server wrapper for the banner carousel. Slide content — promotional panels
 * and machine records alike — is resolved in the data layer, so this component
 * only decides where the carousel sits on the page.
 */
export async function FeaturedBanners() {
  const slides = await getBanners();
  return <FeaturedCarousel slides={slides} />;
}
