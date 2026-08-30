import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The design system adds custom font sizes (`text-display-xl`, `text-eyebrow`
 * …) through Tailwind's `--text-*` theme namespace. tailwind-merge cannot infer
 * those from the CSS, so without this it classes them as *text colours* — and a
 * later `text-navy-800` in the same `cn()` call silently strips the font size.
 *
 * Registering them under `font-size` keeps size and colour as separate concerns.
 * Any new `--text-*` token must be added here too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-lg",
            "display-md",
            "display-sm",
            "eyebrow",
          ],
        },
      ],
    },
  },
});

/** Merge conditional class names, resolving conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "+92 300 1234567" -> "+923001234567" for tel: links. */
export function toDialString(value: string) {
  return value.replace(/[^\d+]/g, "");
}

/** "+92 300 1234567" -> "923001234567" for wa.me URLs (no leading +). */
export function toWhatsAppNumber(value: string) {
  return toDialString(value).replace(/^\+/, "");
}
