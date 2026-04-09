/**
 * Vectora Logistics brand mark.
 * Use <VectoraLogoMark /> for the icon alone, <VectoraLogo /> for icon + wordmark.
 */

interface LogoMarkProps {
  className?: string;
}

export function VectoraLogoMark({ className = "h-9 w-9" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" className="fill-primary" />
      {/* Vectora monogram */}
      <path
        d="M12 28 L20 11 L28 28"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LogoProps {
  size?: "sm" | "md" | "lg";
  light?: boolean;
}

const SIZE = {
  sm: { mark: "h-7 w-7", name: "text-base", sub: "hidden" },
  md: { mark: "h-9 w-9", name: "text-lg", sub: "text-[10px]" },
  lg: { mark: "h-12 w-12", name: "text-2xl", sub: "text-xs" },
};

export function VectoraLogo({ size = "md", light = false }: LogoProps) {
  const s = SIZE[size];
  const nameColor = light ? "text-white" : "text-slate-900";
  const subColor = light ? "text-white/60" : "text-slate-500";

  return (
    <span className="inline-flex items-center gap-2.5">
      <VectoraLogoMark className={s.mark} />
      <span className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight ${s.name} ${nameColor}`}>
          Vectora
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
