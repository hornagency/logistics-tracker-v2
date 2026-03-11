/**
 * Crystal Sky Logistics brand mark.
 * Use <CslLogoMark /> for the icon alone, <CslLogo /> for icon + wordmark.
 */

interface LogoMarkProps {
  className?: string;
  /** Icon background fill — defaults to current CSS --color-primary */
  bg?: string;
}

export function CslLogoMark({ className = "h-9 w-9" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Rounded square background */}
      <rect width="40" height="40" rx="10" className="fill-primary" />
      {/* Stylised upward-angled flight path / cargo arrow */}
      <path
        d="M8 26 L17 14 L23 20 L30 10"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow head on the flight path */}
      <path
        d="M25 9 L31 10 L30 16"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ground line / runway */}
      <line x1="7" y1="30" x2="33" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

interface LogoProps {
  /** Controls overall size — scales both mark and text */
  size?: "sm" | "md" | "lg";
  /** Use white text (for dark backgrounds) */
  light?: boolean;
}

const SIZE = {
  sm: { mark: "h-7 w-7", name: "text-base", sub: "hidden" },
  md: { mark: "h-9 w-9", name: "text-lg",   sub: "text-[10px]" },
  lg: { mark: "h-12 w-12", name: "text-2xl", sub: "text-xs" },
};

export function CslLogo({ size = "md", light = false }: LogoProps) {
  const s = SIZE[size];
  const nameColor = light ? "text-white" : "text-slate-900";
  const subColor  = light ? "text-white/60" : "text-slate-500";

  return (
    <span className="inline-flex items-center gap-2.5">
      <CslLogoMark className={s.mark} />
      <span className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight ${s.name} ${nameColor}`}>
          Crystal Sky
        </span>
        {s.sub !== "hidden" && (
          <span className={`font-semibold uppercase tracking-widest ${s.sub} ${subColor}`}>
            Logistics
          </span>
        )}
      </span>
    </span>
  );
}
