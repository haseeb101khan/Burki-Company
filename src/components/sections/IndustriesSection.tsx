import { getIndustries } from "@/lib/data";
import { IndustriesAccordion } from "./IndustriesAccordion";

/** Server wrapper: the sector list, rendered by the collapsible strip. */
export async function IndustriesSection() {
  const industries = await getIndustries();
  return <IndustriesAccordion industries={industries} />;
}
