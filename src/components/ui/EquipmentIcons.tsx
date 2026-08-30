import type { SVGProps } from "react";

/**
 * Machine icons, one per equipment category.
 *
 * Drawn as solid silhouettes on a wide 64x40 field rather than line art:
 * machines are horizontal and detailed, and outlines of them turn to mush at
 * tile size. Filled shapes stay readable small.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Machine({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="currentColor"
      aria-hidden="true"
      width="1em"
      height="0.625em"
      {...props}
    >
      {children}
    </svg>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const ExcavatorIcon = (p: IconProps) => (
  <Machine {...p}>
    <rect x="5" y="29" width="34" height="9" rx="4.5" />
    <path d="M11 17h17a3 3 0 0 1 3 3v9H8v-9a3 3 0 0 1 3-3Z" />
    <path d="M30 21 45 9l7 11" {...stroke} strokeWidth="3.5" />
    <path d="M48 19h10l-2.5 8h-7z" />
  </Machine>
);

export const WheelLoaderIcon = (p: IconProps) => (
  <Machine {...p}>
    <circle cx="20" cy="30" r="7.5" />
    <circle cx="46" cy="30" r="7.5" />
    <rect x="14" y="20" width="38" height="9" rx="2" />
    <path d="M34 9h13a3 3 0 0 1 3 3v8H31v-8a3 3 0 0 1 3-3Z" />
    <path d="M33 23 16 19" {...stroke} strokeWidth="3.5" />
    <path d="M6 13h10v14H9z" />
  </Machine>
);

export const BackhoeLoaderIcon = (p: IconProps) => (
  <Machine {...p}>
    <circle cx="17" cy="31" r="6" />
    <circle cx="47" cy="29" r="8" />
    <rect x="14" y="19" width="34" height="9" rx="2" />
    <path d="M23 8h12a3 3 0 0 1 3 3v8H20v-8a3 3 0 0 1 3-3Z" />
    <path d="M6 15h9v13H8z" />
    <path d="M49 19 59 11l-2 12" {...stroke} strokeWidth="3.2" />
  </Machine>
);

export const BulldozerIcon = (p: IconProps) => (
  <Machine {...p}>
    <rect x="13" y="27" width="35" height="11" rx="5.5" />
    <path d="M24 13h14a3 3 0 0 1 3 3v11H21V16a3 3 0 0 1 3-3Z" />
    <path d="M5 17h7v21H5z" />
    <path d="M13 23 21 25" {...stroke} strokeWidth="3.2" />
  </Machine>
);

export const DumpTruckIcon = (p: IconProps) => (
  <Machine {...p}>
    <circle cx="17" cy="31" r="6" />
    <circle cx="42" cy="31" r="6" />
    <circle cx="54" cy="31" r="6" />
    <path d="M6 15h12l5 7v7H6z" />
    <path d="M26 9h33l-5 15H26z" />
  </Machine>
);

export const MixerTruckIcon = (p: IconProps) => (
  <Machine {...p}>
    <circle cx="15" cy="31" r="6" />
    <circle cx="40" cy="31" r="6" />
    <circle cx="52" cy="31" r="6" />
    <path d="M4 15h11l4 7v7H4z" />
    <path d="M24 22c0-7 4-13 10-13h13c6 0 10 4 10 8 0 5-4 9-10 9H27a3 3 0 0 1-3-4Z" />
  </Machine>
);

export const ConcretePumpIcon = (p: IconProps) => (
  <Machine {...p}>
    <circle cx="16" cy="32" r="5.5" />
    <circle cx="38" cy="32" r="5.5" />
    <circle cx="50" cy="32" r="5.5" />
    <rect x="7" y="22" width="50" height="8" rx="2" />
    <path d="M7 16h10v6H7z" />
    <path d="M22 21 32 7l16 7-9 9" {...stroke} strokeWidth="3.2" />
  </Machine>
);

export const CraneIcon = (p: IconProps) => (
  <Machine {...p}>
    <circle cx="16" cy="32" r="5.5" />
    <circle cx="30" cy="32" r="5.5" />
    <circle cx="48" cy="32" r="5.5" />
    <rect x="7" y="22" width="50" height="8" rx="2" />
    <path d="M18 22 54 7" {...stroke} strokeWidth="4" />
    <path d="M54 8v9" {...stroke} strokeWidth="2" />
    <path d="M51 17h6v5h-6z" />
  </Machine>
);

export const ForkliftIcon = (p: IconProps) => (
  <Machine {...p}>
    <circle cx="26" cy="31" r="6" />
    <circle cx="46" cy="32" r="4.5" />
    <rect x="20" y="18" width="30" height="12" rx="2" />
    <path d="M28 7h12a3 3 0 0 1 3 3v8H25v-8a3 3 0 0 1 3-3Z" />
    <rect x="11" y="5" width="5" height="31" rx="1" />
    <path d="M2 29h10v5H2z" />
  </Machine>
);

export const RollerIcon = (p: IconProps) => (
  <Machine {...p}>
    <circle cx="17" cy="27" r="11" />
    <circle cx="50" cy="30" r="7.5" />
    <rect x="24" y="18" width="30" height="11" rx="2" />
    <path d="M31 6h13a3 3 0 0 1 3 3v9H28V9a3 3 0 0 1 3-3Z" />
  </Machine>
);

export const GraderIcon = (p: IconProps) => (
  <Machine {...p}>
    <circle cx="11" cy="31" r="6" />
    <circle cx="45" cy="31" r="6" />
    <circle cx="57" cy="31" r="6" />
    <rect x="7" y="19" width="52" height="7" rx="2" />
    <path d="M41 7h13a3 3 0 0 1 3 3v9H38v-9a3 3 0 0 1 3-3Z" />
    <path d="m19 31 17-5 1.4 4.6-17 5z" />
  </Machine>
);

export const AttachmentsIcon = (p: IconProps) => (
  <Machine {...p}>
    <path d="M11 8h36l-5 18H16z" />
    <path d="M16 26h5v6h-5zm8 0h5v6h-5zm8 0h5v6h-5zm8 0h5v6h-5z" />
  </Machine>
);

/** Category slug -> icon. Falls back to the attachments mark if unmapped. */
export const categoryIcons: Record<string, (p: IconProps) => React.JSX.Element> = {
  excavators: ExcavatorIcon,
  "wheel-loaders": WheelLoaderIcon,
  "backhoe-loaders": BackhoeLoaderIcon,
  bulldozers: BulldozerIcon,
  "dump-trucks": DumpTruckIcon,
  "mixer-trucks": MixerTruckIcon,
  "concrete-pumps": ConcretePumpIcon,
  cranes: CraneIcon,
  forklifts: ForkliftIcon,
  rollers: RollerIcon,
  graders: GraderIcon,
  attachments: AttachmentsIcon,
};
