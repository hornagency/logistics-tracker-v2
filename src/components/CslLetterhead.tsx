import { CslLogo } from "@/components/CslLogoMark";

/**
 * Crystal Sky Logistics letterhead — used on all printed documents.
 * Renders identically on screen and in print.
 */
export function CslLetterhead() {
  return (
    <div className="flex items-start justify-between border-b-2 border-primary pb-6">
      {/* Logo + brand */}
      <CslLogo size="lg" />

      {/* Company contact */}
      <div className="text-right text-xs text-slate-500 leading-5">
        <p className="font-medium text-slate-700">Crystal Sky Logistics Ltd.</p>
        <p>Global Operations Center</p>
        <p>contact@crystalskylogistics.com</p>
        <p>+1 (555) 000-0000</p>
        <p>www.crystalskylogistics.com</p>
      </div>
    </div>
  );
}
