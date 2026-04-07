import { prisma } from "@/lib/db";
import { VectoraLetterhead } from "@/components/VectoraLetterhead";
import { PrintButton } from "@/components/PrintButton";
import Link from "next/link";

const STATUS_BADGE: Record<string, string> = {
  Processing:         "bg-amber-100 text-amber-800",
  "In Transit":       "bg-blue-100 text-blue-800",
  "Out for Delivery": "bg-violet-100 text-violet-800",
  Delivered:          "bg-emerald-100 text-emerald-800",
};

export default async function ReportsPage() {
  const shipments = await prisma.shipment.findMany({
    include: { updates: true },
    orderBy: { createdAt: "desc" },
  });

  const total       = shipments.length;
  const processing  = shipments.filter((s) => s.status === "Processing").length;
  const inTransit   = shipments.filter((s) => s.status === "In Transit").length;
  const outDelivery = shipments.filter((s) => s.status === "Out for Delivery").length;
  const delivered   = shipments.filter((s) => s.status === "Delivered").length;

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      {/* Toolbar */}
      <div className="print:hidden border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/admin" className="text-sm text-slate-500 hover:text-primary">
            ← Dashboard
          </Link>
          <PrintButton label="Print / Export Report" />
        </div>
      </div>

      {/* Document */}
      <div className="mx-auto max-w-5xl bg-white p-10 shadow-lg print:shadow-none print:p-0 print:max-w-none my-8 print:my-0">
        <VectoraLetterhead />

        {/* Report header */}
        <div className="mt-8 flex items-end justify-between border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-widest text-slate-900">
              Shipments Report
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Comprehensive logistics summary — all shipments as of {today}
            </p>
          </div>
          <p className="text-sm text-slate-400">Generated: {today}</p>
        </div>

        {/* Summary stats */}
        <div className="mt-8 grid grid-cols-5 gap-4">
          {[
            { label: "Total",            value: total,       cls: "bg-slate-900 text-white" },
            { label: "Processing",       value: processing,  cls: "bg-amber-50 text-amber-800 ring-1 ring-amber-200" },
            { label: "In Transit",       value: inTransit,   cls: "bg-blue-50 text-blue-800 ring-1 ring-blue-200" },
            { label: "Out for Delivery", value: outDelivery, cls: "bg-violet-50 text-violet-800 ring-1 ring-violet-200" },
            { label: "Delivered",        value: delivered,   cls: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl p-4 text-center ${s.cls}`}>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wide opacity-70">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Full shipments table */}
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">All Shipments</p>
          {shipments.length === 0 ? (
            <p className="mt-4 text-slate-400 italic">No shipments recorded yet.</p>
          ) : (
            <table className="mt-3 w-full overflow-hidden rounded-xl border border-slate-200 text-sm">
              <thead className="bg-slate-50 print:bg-gray-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Tracking Code</th>
                  <th className="px-4 py-3">Recipient</th>
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Updates</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shipments.map((s, i) => (
                  <tr key={s.id} className="hover:bg-slate-50 print:hover:bg-transparent">
                    <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                    <td className="px-4 py-3 font-mono font-semibold text-slate-900">{s.trackingCode}</td>
                    <td className="px-4 py-3 text-slate-600">{s.recipientName ?? <span className="italic text-slate-300">—</span>}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{s.origin} → {s.destination}</td>
                    <td className="px-4 py-3 text-slate-600">{s.serviceType}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[s.status] ?? "bg-slate-100 text-slate-700"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600">{s.updates.length}</td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(s.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Delivery rate */}
        {total > 0 && (
          <div className="mt-8 rounded-xl bg-slate-50 p-6 print:bg-gray-50">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Performance Summary</p>
            <div className="mt-4 grid grid-cols-3 gap-6 text-center text-sm">
              <div>
                <p className="text-xl font-bold text-emerald-600">
                  {Math.round((delivered / total) * 100)}%
                </p>
                <p className="text-slate-500">Delivery Rate</p>
              </div>
              <div>
                <p className="text-xl font-bold text-blue-600">
                  {Math.round(((inTransit + outDelivery) / total) * 100)}%
                </p>
                <p className="text-slate-500">Active Shipments</p>
              </div>
              <div>
                <p className="text-xl font-bold text-amber-600">
                  {Math.round((processing / total) * 100)}%
                </p>
                <p className="text-slate-500">Pending Processing</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          <p className="font-medium text-slate-600">Vectora Logistics Ltd. — Confidential Report</p>
          <p className="mt-1">This document contains proprietary logistics data. Not for public distribution.</p>
          <p className="mt-3 font-mono text-[10px] tracking-wide text-slate-300">
            Generated {today} · {total} shipment{total !== 1 ? "s" : ""} · Vectora Logistics
          </p>
        </div>
      </div>
    </div>
  );
}
