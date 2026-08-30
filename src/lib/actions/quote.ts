"use server";

import { content } from "@/lib/content/content";
import { toWhatsAppNumber } from "@/lib/utils";
import type { QuoteRequest, QuoteSubmitResult } from "@/lib/data/types";

/**
 * THE DELIVERY SEAM — now with somewhere to land.
 *
 * A submission becomes an `inquiry` document in Sanity, so quote requests are
 * persistent and visible in the Studio rather than living only in a server log.
 *
 * NOTHING IS STORED AND NO EMAIL IS SENT — that decision is still open. When a
 * destination is chosen, it hangs off this function and nothing else in the
 * form changes.
 *
 * Whichever of those is true, the buyer is never left staring at a failure: the
 * result says whether the request was filed, and the success screen hands them
 * a WhatsApp link already carrying their reference. Losing an enquiry silently
 * would be the worst outcome here.
 */

/** Short, human-quotable, and unique enough that two same-second submissions differ. */
function makeReference(): string {
  const time = Date.now().toString(36).toUpperCase().slice(-4);
  const salt = Math.floor(Math.random() * 36 ** 2)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `BQ-${time}${salt}`;
}

/** Server-side validation. The client validates too; this is the one that counts. */
function validate(request: QuoteRequest): string | null {
  if (!request.name?.trim()) return "Please give us a name to reply to.";
  if (!request.email?.trim() && !request.phone?.trim()) {
    return "Please give us either an email address or a phone number.";
  }
  if (!request.consent) {
    return "We need your consent before we can contact you about this enquiry.";
  }
  return null;
}

/**
 * Everything the confirmation needs, read from the baked-in content.
 *
 * This used to be a Sanity query. It is not any more: the whole point of baking
 * content in is that a page — or a form submission — never waits on a remote
 * service that may be unreachable. A buyer pressing submit should not have
 * their confirmation hang on a CMS lookup.
 */
function lookup(request: QuoteRequest) {
  const machine = content.equipment.find((e) => e.slug === request.equipmentSlug);
  return {
    machineId: machine ? `equipment-${machine.slug}` : null,
    categoryId: request.categorySlug ? `equipmentCategory-${request.categorySlug}` : null,
    machineLabel: machine?.model ?? request.equipmentOther ?? null,
    whatsapp: content.companyInfo.whatsapp,
  };
}

/**
 * A WhatsApp link that arrives already carrying the reference and the machine.
 *
 * The buyer retypes nothing, and whoever answers can identify the enquiry from
 * the first line rather than asking for details a second time.
 */
function buildWhatsAppUrl(
  whatsapp: string | null,
  reference: string,
  machine: string | null,
): string | null {
  if (!whatsapp) return null;
  const number = toWhatsAppNumber(whatsapp);
  if (!number) return null;

  const message = [
    `Hello, I have just submitted a quote request (${reference}).`,
    machine ? `It is for the ${machine}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export async function submitQuoteRequest(
  request: QuoteRequest,
): Promise<QuoteSubmitResult> {
  const invalid = validate(request);
  if (invalid) return { ok: false, message: invalid };

  const reference = makeReference();
  const details = lookup(request);
  const whatsappUrl = buildWhatsAppUrl(details.whatsapp, reference, details.machineLabel);

  /*
   * Nothing is stored, and that is the current design.
   *
   * The form validates, packages the request and hands the buyer a WhatsApp
   * link already carrying their reference and the machine. Where the enquiry
   * should ultimately land — an inbox, a CRM — has not been decided, and this
   * function is the one place that changes when it is.
   */
  return { ok: true, reference, stored: false, whatsappUrl };
}
