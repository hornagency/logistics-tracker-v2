"use client";

import Link from "next/link";

type Shipment = {
  id: string;
  trackingCode: string;
  origin: string;
  destination: string;
  status: string;
  updatedAt: Date;
  updates: unknown[];
};

const STATUS_BADGE: Record<string, string> = {
  Processing:         "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  "In Transit":       "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  "Out for Delivery": "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  Delivered:          "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
};

export function AdminShipmentList({ shipments }: { shipments: Shipment[] }) {
  if (shipments.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <svg className="mx-auto h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7" />
        </svg>
        <p className="mt-3 text-slate-500">No shipments yet.</p>
        <Link href="/admin/shipments/new" className="btn-primary mt-4 inline-flex">
          Create first shipment
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-100">
        <thead>
          <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-3">Tracking Code</th>
            <th className="px-5 py-3 hidden md:table-cell">Route</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 hidden sm:table-cell">Updates</th>
            <th className="px-5 py-3 hidden lg:table-cell">Last Updated</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {shipments.map((s) => (
            <tr key={s.id} className="transition-colors hover:bg-slate-50">
              <td className="px-5 py-4 font-mono text-sm font-semibold text-slate-900">
                {s.trackingCode}
              </td>
              <td className="hidden px-5 py-4 text-sm text-slate-600 md:table-cell">
                {s.origin} → {s.destination}
              </td>
              <td className="px-5 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    STATUS_BADGE[s.status] ?? "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  {s.status}
                </span>
              </td>
              <td className="hidden px-5 py-4 text-sm text-slate-600 sm:table-cell">
                {(s.updates as unknown[]).length}
              </td>
              <td className="hidden px-5 py-4 text-xs text-slate-400 lg:table-cell">
                {new Date(s.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-5 py-4 text-right">
                <Link
                  href={`/admin/shipments/${s.id}`}
                  className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  Manage
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
