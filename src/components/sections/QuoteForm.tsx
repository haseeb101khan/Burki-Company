"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/Field";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { submitQuoteRequest } from "@/lib/actions/quote";
import type {
  Country,
  EquipmentCategory,
  QuoteRequest,
  SelectOption,
} from "@/lib/data";
import { cn, toWhatsAppNumber } from "@/lib/utils";

/** Just enough of a machine for the model select. */
export type QuoteEquipmentOption = {
  slug: string;
  model: string;
  name: string;
  categorySlug: string;
};

/** Sentinel for "the machine I want is not in the list". */
const OTHER = "__other__";

type Values = {
  categorySlug: string;
  equipmentSlug: string;
  equipmentOther: string;
  quantity: string;
  countryCode: string;
  city: string;
  name: string;
  dialCode: string;
  phone: string;
  email: string;
  company: string;
  timeframe: string;
  preferredContact: string;
  details: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

/**
 * Validation runs on submit, then live for any field already in error.
 *
 * Validating every keystroke from the start shouts at someone halfway through
 * typing their email; validating only on submit leaves them hunting for what
 * they fixed. Erroring on submit and clearing as they correct is the middle
 * that behaves the way people expect.
 */
function validate(v: Values): Errors {
  const e: Errors = {};

  if (!v.categorySlug) e.categorySlug = "Choose the type of machine you need.";
  if (!v.equipmentSlug) e.equipmentSlug = "Choose a model, or pick “Other”.";
  if (v.equipmentSlug === OTHER && !v.equipmentOther.trim())
    e.equipmentOther = "Tell us which machine you are after.";

  const qty = Number(v.quantity);
  if (!v.quantity.trim() || !Number.isFinite(qty) || qty < 1 || qty > 999)
    e.quantity = "Enter a quantity between 1 and 999.";

  if (!v.countryCode) e.countryCode = "Select the country the machine is for.";

  if (!v.name.trim()) e.name = "Please give us a name to reply to.";
  else if (v.name.trim().length < 2) e.name = "That name looks too short.";

  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "A phone number lets us call you back.";
  else if (digits.length < 6 || digits.length > 15)
    e.phone = "Enter a phone number between 6 and 15 digits.";

  // Deliberately permissive: the shape of a real address, not a spec-perfect
  // regex that rejects valid ones.
  if (!v.email.trim()) e.email = "We need an email to send the quote to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "That does not look like a complete email address.";

  if (!v.timeframe) e.timeframe = "Let us know when you need it.";
  if (!v.consent) e.consent = "Please agree before sending.";

  return e;
}

/** Submit order, so focus lands on the first thing that actually failed. */
const FIELD_ORDER: (keyof Values)[] = [
  "categorySlug",
  "equipmentSlug",
  "equipmentOther",
  "quantity",
  "countryCode",
  "name",
  "phone",
  "email",
  "timeframe",
  "consent",
];

export function QuoteForm({
  categories,
  equipment,
  countries,
  timeframes,
  contactMethods,
  defaultCountry,
  initialModel,
  whatsapp,
}: {
  categories: EquipmentCategory[];
  equipment: QuoteEquipmentOption[];
  countries: Country[];
  timeframes: SelectOption[];
  contactMethods: SelectOption[];
  defaultCountry: string;
  /** Slug of a machine to preselect, from `?model=` on the detail-page CTA. */
  initialModel?: string;
  whatsapp: string;
}) {
  const preset = initialModel ? equipment.find((e) => e.slug === initialModel) : undefined;
  const home = countries.find((c) => c.code === defaultCountry);

  const [values, setValues] = useState<Values>({
    categorySlug: preset?.categorySlug ?? "",
    equipmentSlug: preset?.slug ?? "",
    equipmentOther: "",
    quantity: "1",
    countryCode: defaultCountry,
    city: "",
    name: "",
    dialCode: home?.dialCode ?? "",
    phone: "",
    email: "",
    company: "",
    timeframe: "",
    preferredContact: contactMethods[0]?.value ?? "",
    details: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  /* Whether the enquiry actually reached the CMS, and the pre-filled WhatsApp
     link the server built for it. Both decide what the success screen says. */
  const [stored, setStored] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  /** The dial code follows the country until the buyer overrides it. */
  const dialTouched = useRef(false);
  const refs = useRef<Partial<Record<keyof Values, HTMLElement | null>>>({});

  const models = useMemo(
    () =>
      values.categorySlug
        ? equipment.filter((e) => e.categorySlug === values.categorySlug)
        : equipment,
    [equipment, values.categorySlug],
  );

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };

      // Changing category invalidates a model from a different one.
      if (key === "categorySlug" && prev.equipmentSlug !== OTHER) {
        const still = equipment.find(
          (e) => e.slug === prev.equipmentSlug && e.categorySlug === value,
        );
        if (!still) next.equipmentSlug = "";
      }

      // Picking a model fills in its category, so the two can never disagree.
      if (key === "equipmentSlug" && value !== OTHER) {
        const picked = equipment.find((e) => e.slug === value);
        if (picked) next.categorySlug = picked.categorySlug;
      }

      if (key === "countryCode" && !dialTouched.current) {
        const country = countries.find((c) => c.code === value);
        if (country) next.dialCode = country.dialCode;
      }

      return next;
    });

    // Clear an error the moment the field it belongs to is corrected.
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFailure(null);

    const found = validate(values);
    setErrors(found);

    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) {
      const el = refs.current[first];
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      el?.focus({ preventScroll: true });
      return;
    }

    const payload: QuoteRequest = {
      categorySlug: values.categorySlug,
      equipmentSlug: values.equipmentSlug === OTHER ? "" : values.equipmentSlug,
      equipmentOther: values.equipmentSlug === OTHER ? values.equipmentOther.trim() : "",
      quantity: Number(values.quantity),
      countryCode: values.countryCode,
      city: values.city.trim(),
      name: values.name.trim(),
      dialCode: values.dialCode,
      phone: values.phone.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      timeframe: values.timeframe,
      preferredContact: values.preferredContact,
      details: values.details.trim(),
      consent: values.consent,
    };

    setPending(true);
    try {
      const result = await submitQuoteRequest(payload);
      if (result.ok) {
        setReference(result.reference);
        setStored(result.stored);
        setWhatsappUrl(result.whatsappUrl);
        setSubmitted(true);
      } else {
        setFailure(result.message);
      }
    } catch {
      setFailure("Something went wrong sending your request. Please try again, or call us.");
    } finally {
      setPending(false);
    }
  }

  /* ------------------------------------------------------------- success -- */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[3px] border border-steel-200 bg-white p-8 text-center sm:p-12"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-700 text-2xl text-white">
          <CheckIcon />
        </span>
        <h2 className="font-display mt-6 text-2xl font-bold text-navy-800 uppercase">
          Request received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-steel-600">
          Your reference is{" "}
          <span className="font-display font-semibold text-navy-800 tabular-nums">
            {reference}
          </span>
          . Keep it handy if you call us about this enquiry.
        </p>

        {/* Says which of the two things actually happened. No invented promise
            about response times either way — that is the client to make, not
            ours to fabricate. */}
        {stored ? (
          <p className="mx-auto mt-6 max-w-md rounded-[3px] border border-steel-200 bg-steel-50 px-4 py-3 text-[0.8125rem] leading-relaxed text-navy-800">
            Your request is with our sales team. If it is urgent, message us on
            WhatsApp below — your reference is already in the message.
          </p>
        ) : (
          <p className="mx-auto mt-6 max-w-md rounded-[3px] border border-amber-200 bg-amber-50 px-4 py-3 text-[0.8125rem] leading-relaxed text-navy-800">
            <strong className="font-semibold">Please send this to us directly.</strong>{" "}
            Message it on WhatsApp below — your reference is already in the
            message — or give us a call.
          </p>
        )}

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            href={whatsappUrl ?? `https://wa.me/${toWhatsAppNumber(whatsapp)}`}
            external
            variant="navy"
          >
            <WhatsAppIcon />
            Message on WhatsApp
          </Button>
          <Button href="/equipment" variant="outline">
            Back to equipment
            <ArrowRight />
          </Button>
        </div>
      </motion.div>
    );
  }

  /* ---------------------------------------------------------------- form -- */
  const errorCount = Object.keys(errors).length;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-8">
      {/* Announced once on a failed submit rather than per field, so a screen
          reader user hears the scale of the problem before being moved. */}
      <p aria-live="polite" className="sr-only">
        {errorCount > 0 ? `${errorCount} field${errorCount === 1 ? "" : "s"} need attention.` : ""}
      </p>

      {/* ------------------------------------------------------- equipment */}
      <fieldset>
        <legend className="font-display text-[0.8125rem] font-semibold tracking-[0.04em] text-navy-800 uppercase">
          Equipment
          <span aria-hidden="true" className="ml-0.5 text-amber-600">
            *
          </span>
        </legend>

        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_7rem]">
          <Field label="Category" htmlFor="q-category" error={errors.categorySlug}>
            <Select
              id="q-category"
              ref={(el) => {
                refs.current.categorySlug = el;
              }}
              value={values.categorySlug}
              placeholder="Product category"
              invalid={Boolean(errors.categorySlug)}
              onChange={(e) => set("categorySlug", e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.shortName ?? c.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Model" htmlFor="q-model" error={errors.equipmentSlug}>
            <Select
              id="q-model"
              ref={(el) => {
                refs.current.equipmentSlug = el;
              }}
              value={values.equipmentSlug}
              placeholder="Equipment model"
              invalid={Boolean(errors.equipmentSlug)}
              onChange={(e) => set("equipmentSlug", e.target.value)}
            >
              {models.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.model}
                </option>
              ))}
              <option value={OTHER}>Other / not listed</option>
            </Select>
          </Field>

          <Field label="Qty" htmlFor="q-qty" error={errors.quantity}>
            <Input
              id="q-qty"
              ref={(el) => {
                refs.current.quantity = el;
              }}
              type="number"
              min={1}
              max={999}
              inputMode="numeric"
              value={values.quantity}
              invalid={Boolean(errors.quantity)}
              onChange={(e) => set("quantity", e.target.value)}
            />
          </Field>
        </div>

        {values.equipmentSlug === OTHER ? (
          <Field
            className="mt-4"
            label="Which machine?"
            htmlFor="q-other"
            hint="Make and model if you know it, or describe the job it has to do."
            error={errors.equipmentOther}
          >
            <Input
              id="q-other"
              ref={(el) => {
                refs.current.equipmentOther = el;
              }}
              value={values.equipmentOther}
              placeholder="e.g. 20-tonne excavator, long reach"
              invalid={Boolean(errors.equipmentOther)}
              onChange={(e) => set("equipmentOther", e.target.value)}
            />
          </Field>
        ) : null}
      </fieldset>

      {/* -------------------------------------------------------- location */}
      <fieldset>
        <legend className="font-display text-[0.8125rem] font-semibold tracking-[0.04em] text-navy-800 uppercase">
          Project location
          <span aria-hidden="true" className="ml-0.5 text-amber-600">
            *
          </span>
        </legend>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Country" htmlFor="q-country" error={errors.countryCode}>
            <Select
              id="q-country"
              ref={(el) => {
                refs.current.countryCode = el;
              }}
              value={values.countryCode}
              placeholder="Select your country"
              invalid={Boolean(errors.countryCode)}
              onChange={(e) => set("countryCode", e.target.value)}
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="City or area" htmlFor="q-city">
            <Input
              id="q-city"
              value={values.city}
              placeholder="Where the machine will work"
              onChange={(e) => set("city", e.target.value)}
            />
          </Field>
        </div>
      </fieldset>

      {/* --------------------------------------------------------- contact */}
      <fieldset>
        <legend className="font-display text-[0.8125rem] font-semibold tracking-[0.04em] text-navy-800 uppercase">
          Contact information
          <span aria-hidden="true" className="ml-0.5 text-amber-600">
            *
          </span>
        </legend>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Name" htmlFor="q-name" error={errors.name}>
            <Input
              id="q-name"
              ref={(el) => {
                refs.current.name = el;
              }}
              autoComplete="name"
              value={values.name}
              placeholder="Your name"
              invalid={Boolean(errors.name)}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>

          <Field label="Email" htmlFor="q-email" error={errors.email}>
            <Input
              id="q-email"
              ref={(el) => {
                refs.current.email = el;
              }}
              type="email"
              autoComplete="email"
              value={values.email}
              placeholder="you@company.com"
              invalid={Boolean(errors.email)}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>

          <Field label="Business phone" error={errors.phone} className="sm:col-span-2">
            <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-3">
              <Select
                aria-label="Country dialling code"
                value={values.dialCode}
                onChange={(e) => {
                  dialTouched.current = true;
                  set("dialCode", e.target.value);
                }}
              >
                {/* Several countries share a dialling code, so the option key
                    has to be the country, not the code. */}
                {countries.map((c) => (
                  <option key={c.code} value={c.dialCode}>
                    {c.code} +{c.dialCode}
                  </option>
                ))}
              </Select>
              <Input
                id="q-phone"
                ref={(el) => {
                  refs.current.phone = el;
                }}
                type="tel"
                autoComplete="tel"
                value={values.phone}
                placeholder="300 1234567"
                invalid={Boolean(errors.phone)}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
          </Field>
        </div>
      </fieldset>

      {/* ---------------------------------------------------------- buying */}
      <fieldset>
        <legend className="sr-only">About the purchase</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company name" htmlFor="q-company">
            <Input
              id="q-company"
              autoComplete="organization"
              value={values.company}
              placeholder="Company name"
              onChange={(e) => set("company", e.target.value)}
            />
          </Field>

          <Field label="Preferred contact" htmlFor="q-contact-method">
            <Select
              id="q-contact-method"
              value={values.preferredContact}
              onChange={(e) => set("preferredContact", e.target.value)}
            >
              {contactMethods.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label="Purchase timeframe"
            required
            htmlFor="q-timeframe"
            error={errors.timeframe}
            className="sm:col-span-2 sm:max-w-md"
          >
            <Select
              id="q-timeframe"
              ref={(el) => {
                refs.current.timeframe = el;
              }}
              value={values.timeframe}
              placeholder="When do you need it?"
              invalid={Boolean(errors.timeframe)}
              onChange={(e) => set("timeframe", e.target.value)}
            >
              {timeframes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </fieldset>

      <Field
        label="More specifics"
        htmlFor="q-details"
        hint="Attachments, tyre spec, site conditions, delivery terms — anything that changes the price."
      >
        <Textarea
          id="q-details"
          value={values.details}
          placeholder="Tell us more about the job."
          onChange={(e) => set("details", e.target.value)}
        />
      </Field>

      {/* ---------------------------------------------------- consent + go */}
      <div className="border-t border-steel-200 pt-7">
        <Checkbox
          id="q-consent"
          ref={(el) => {
            refs.current.consent = el;
          }}
          checked={values.consent}
          invalid={Boolean(errors.consent)}
          error={errors.consent}
          onChange={(e) => set("consent", e.target.checked)}
          label={
            <>
              I agree that the details I have entered may be stored and used to
              answer this enquiry.{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-navy-700 underline underline-offset-2 transition-colors hover:text-amber-600"
              >
                Privacy Policy
              </Link>
            </>
          }
        />

        {failure ? (
          <p
            role="alert"
            className="mt-5 rounded-[3px] border border-red-200 bg-red-50 px-4 py-3 text-[0.875rem] text-red-700"
          >
            {failure}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" disabled={pending} className={cn(pending && "opacity-70")}>
            {pending ? "Sending…" : "Send request"}
            {pending ? null : <ArrowRight />}
          </Button>
          <p className="text-[0.8125rem] text-steel-500">
            Fields marked <span className="text-amber-600">*</span> are required.
          </p>
        </div>
      </div>
    </form>
  );
}
