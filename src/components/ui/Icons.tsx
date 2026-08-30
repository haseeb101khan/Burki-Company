import type { SVGProps } from "react";

/**
 * Inline icon set. Kept small and deliberately plain — line icons at a
 * consistent 1.6 stroke weight, no gears, no 3D, no decorative flourishes.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Four corner brackets pushing outward — "make this bigger". */
export const ExpandIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 6l6 6-6 6" />
  </Icon>
);

export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 4h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a1.5 1.5 0 01-1.7 1.5A16.5 16.5 0 013 5.7 1.5 1.5 0 014.5 4z" />
  </Icon>
);

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3.5 6l8.5 6 8.5-6" />
  </Icon>
);

export const MapPinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </Icon>
);

export const PlayIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </Icon>
);

export const AlertIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5M12 16.2v.3" />
  </Icon>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    width="1em"
    height="1em"
    {...p}
  >
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.18-1.36a9.9 9.9 0 004.86 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0012.04 2zm0 18.16a8.2 8.2 0 01-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 01-1.26-4.38c0-4.56 3.71-8.27 8.27-8.27 2.21 0 4.28.86 5.84 2.42a8.2 8.2 0 012.42 5.85c0 4.56-3.71 8.24-8.28 8.24zm4.53-6.17c-.25-.13-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.38-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.12.25-.29.37-.44.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.19 3.7.59.26 1.04.41 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="1em" height="1em" {...p}>
    <path d="M14 8.5V7c0-.7.3-1 1-1h1.5V3H14c-2.2 0-3.5 1.4-3.5 3.7V8.5H8V12h2.5v9H14v-9h2.4l.4-3.5H14z" />
  </svg>
);

export const LinkedInIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="1em" height="1em" {...p}>
    <path d="M6.94 5.5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.9h3.1V21H3.4V8.9zm5.5 0h2.97v1.65h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.09v-5.66c0-1.35-.02-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99V21H8.9V8.9z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true" width="1em" height="1em" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const YouTubeIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="1em" height="1em" {...p}>
    <path d="M21.6 7.2s-.2-1.4-.8-2c-.75-.8-1.6-.8-2-.85C16 4.2 12 4.2 12 4.2h-.01s-4 0-6.8.2c-.4.05-1.25.05-2 .85-.6.6-.8 2-.8 2S2.2 8.8 2.2 10.5v1.6c0 1.6.2 3.3.2 3.3s.2 1.4.8 2c.75.8 1.74.78 2.2.86 1.6.15 6.8.2 6.8.2s4 0 6.8-.21c.4-.05 1.25-.05 2-.85.6-.6.8-2 .8-2s.2-1.65.2-3.3v-1.6c0-1.65-.2-3.3-.2-3.3zM9.9 14.3V8.9l5.2 2.7-5.2 2.7z" />
  </svg>
);

export const TikTokIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="1em" height="1em" {...p}>
    <path d="M16.6 5.82A4.28 4.28 0 0115.54 3h-3.09v12.4a2.59 2.59 0 01-2.59 2.5 2.59 2.59 0 01-2.59-2.59 2.59 2.59 0 013.35-2.48V9.7a5.67 5.67 0 00-.76-.05A5.68 5.68 0 004.18 15.3 5.68 5.68 0 009.86 21a5.68 5.68 0 005.68-5.68V9.01a7.35 7.35 0 004.28 1.37V7.29a4.28 4.28 0 01-3.22-1.47z" />
  </svg>
);

/** Maps a `SocialLink.platform` string to its icon. */
export const socialIcons: Record<string, (p: IconProps) => React.JSX.Element> = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  whatsapp: WhatsAppIcon,
};
