import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Button / link primitive.
 *
 * Industrial rather than soft: minimal radius, uppercase condensed label,
 * generous horizontal padding. The amber variant is the only "loud" element in
 * the system and is reserved for the primary action on a screen.
 */

type Variant = "primary" | "navy" | "outline" | "outlineLight" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[3px] font-display font-semibold uppercase tracking-[0.08em] " +
  "transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-amber-500 text-navy-900 hover:bg-amber-400 active:bg-amber-600 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]",
  navy: "bg-navy-700 text-white hover:bg-navy-600 active:bg-navy-800",
  outline:
    "border border-navy-700/25 text-navy-700 hover:border-navy-700 hover:bg-navy-50 active:bg-navy-100",
  outlineLight:
    "border border-white/35 text-white hover:border-white hover:bg-white/10 active:bg-white/15",
  ghost: "text-navy-700 hover:bg-navy-50 active:bg-navy-100",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

/** Right-pointing chevron used on CTA labels. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("h-3.5 w-3.5", className)}
    >
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
    </svg>
  );
}
