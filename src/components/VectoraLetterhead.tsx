import { VectoraLogo } from "@/components/VectoraLogoMark";

/**
 * Vectora Logistics letterhead for printed documents.
 */
export function VectoraLetterhead() {
  return (
    <div className="flex items-start justify-between border-b-2 border-primary pb-6">
      <VectoraLogo size="lg" />

      <div className="text-right text-xs text-slate-500 leading-5">
        <p className="font-medium text-slate-700">Vectora Logistics Ltd.</p>
        <p>Global Operations Center</p>
        <p>contact@vectoralogistics.com</p>
        <p>+1 (555) 000-0000</p>
        <p>www.vectoralogistics.com</p>
      </div>
    </div>
  );
}
