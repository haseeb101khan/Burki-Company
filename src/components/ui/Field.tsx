"use client";

import type {
  ComponentPropsWithoutRef,
  ReactNode,
  Ref,
} from "react";
import { useId } from "react";
import { AlertIcon, ChevronDownIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Form primitives.
 *
 * Industrial to match the rest of the system: 3px radius, a 1px steel rule
 * that goes navy on focus, no soft shadows. Every control is the same 44px
 * high so a row of mixed inputs lines up on its baseline.
 *
 * `Field` owns the label/error/description wiring. Controls take an `invalid`
 * flag and set `aria-invalid` themselves, so an error is announced by a screen
 * reader and not merely coloured red.
 */

const CONTROL = [
  "w-full rounded-[3px] border bg-white px-3.5 text-[0.9375rem] text-ink",
  "transition-colors duration-200",
  "placeholder:text-steel-400",
  "focus:outline-none focus:ring-2",
  "disabled:cursor-not-allowed disabled:bg-steel-50 disabled:text-steel-400",
].join(" ");

const CONTROL_TONE = {
  base: "border-steel-300 hover:border-steel-400 focus:border-navy-700 focus:ring-navy-700/15",
  invalid: "border-red-500 hover:border-red-500 focus:border-red-600 focus:ring-red-500/15",
};

const H = "h-11";

function tone(invalid?: boolean) {
  return invalid ? CONTROL_TONE.invalid : CONTROL_TONE.base;
}

/* ─────────────────────────────────────────────────────────────── wrapper ── */

export function Field({
  label,
  required,
  hint,
  error,
  htmlFor,
  children,
  className,
}: {
  label: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  /** Rendered as an alert under the control when present. */
  error?: string;
  /** Point at the control this labels. Omit for a group of controls. */
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="font-display block text-[0.8125rem] font-semibold tracking-[0.04em] text-navy-800 uppercase"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-amber-600">
            *
          </span>
        ) : null}
      </label>

      {hint ? <p className="mt-1 text-[0.8125rem] text-steel-500">{hint}</p> : null}

      <div className="mt-2">{children}</div>

      {error ? (
        <p
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] font-medium text-red-600"
        >
          <AlertIcon aria-hidden="true" className="shrink-0 text-sm" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── inputs ── */

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "className"> & {
  invalid?: boolean;
  className?: string;
  ref?: Ref<HTMLInputElement>;
};

export function Input({ invalid, className, ...props }: InputProps) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL, H, tone(invalid), className)}
    />
  );
}

type SelectProps = Omit<ComponentPropsWithoutRef<"select">, "className"> & {
  invalid?: boolean;
  /** Shown as a disabled first option when the value is empty. */
  placeholder?: string;
  className?: string;
  ref?: Ref<HTMLSelectElement>;
};

export function Select({
  invalid,
  placeholder,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="relative">
      <select
        {...props}
        aria-invalid={invalid || undefined}
        className={cn(
          CONTROL,
          H,
          tone(invalid),
          // Room for the chevron, and the native arrow removed so the control
          // matches the inputs beside it across browsers.
          "cursor-pointer appearance-none pr-10",
          !props.value && placeholder ? "text-steel-400" : "",
          className,
        )}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-base text-steel-500"
      />
    </div>
  );
}

type TextareaProps = Omit<ComponentPropsWithoutRef<"textarea">, "className"> & {
  invalid?: boolean;
  className?: string;
  ref?: Ref<HTMLTextAreaElement>;
};

export function Textarea({ invalid, className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL, "min-h-32 resize-y py-3 leading-relaxed", tone(invalid), className)}
    />
  );
}

/**
 * Consent checkbox. The native input is kept (it is what makes the control
 * focusable, announced and form-associated) and a styled box is drawn over it
 * with `peer` so appearance never costs behaviour.
 */
export function Checkbox({
  label,
  invalid,
  error,
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<"input">, "type" | "className"> & {
  label: ReactNode;
  invalid?: boolean;
  error?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}) {
  const autoId = useId();
  const id = props.id ?? autoId;

  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <span className="relative mt-0.5 flex shrink-0">
          <input
            {...props}
            id={id}
            type="checkbox"
            aria-invalid={invalid || undefined}
            className={cn(
              "peer h-5 w-5 cursor-pointer appearance-none rounded-[2px] border bg-white",
              "transition-colors duration-200",
              "checked:border-navy-700 checked:bg-navy-700",
              "focus-visible:ring-2 focus-visible:ring-navy-700/25 focus-visible:outline-none",
              invalid ? "border-red-500" : "border-steel-300 hover:border-steel-400",
            )}
          />
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-5 w-5 scale-75 text-white opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
          >
            <path
              d="M5 10.5l3.5 3.5L15 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <label htmlFor={id} className="cursor-pointer text-[0.875rem] leading-relaxed text-steel-700">
          {label}
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] font-medium text-red-600"
        >
          <AlertIcon aria-hidden="true" className="shrink-0 text-sm" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
