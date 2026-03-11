import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminShipmentList } from "./AdminShipmentList";

const STATUS_COLORS: Record<string, string> = {
  Processing:        "bg-amber-50 text-amber-700 ring-amber-200",
  "In Transit":      "bg-blue-50 text-blue-700 ring-blue-200",
  "Out for Delivery":"bg-violet-50 text-violet-700 ring-violet-200",
  Delivered:         "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export default async function AdminPage() {
  const [shipments, processing, inTransit, outForDelivery, delivered] = await Promise.all([
    prisma.shipment.findMany({ include: { updates: true }, orderBy: { updatedAt: "desc" } }),
    prisma.shipment.count({ where: { status: "Processing" } }),
    prisma.shipment.count({ where: { status: "In Transit" } }),
    prisma.shipment.count({ where: { status: "Out for Delivery" } }),
    prisma.shipment.count({ where: { status: "Delivered" } }),
  ]);

  const total = shipments.length;

  const stats = [
    { label: "Total Shipments", value: total, color: "bg-slate-900 text-white" },
    { label: "Processing",       value: processing,      color: STATUS_COLORS["Processing"] },
    { label: "In Transit",       value: inTransit,       color: STATUS_COLORS["In Transit"] },
    { label: "Out for Delivery", value: outForDelivery,  color: STATUS_COLORS["Out for Delivery"] },
    { label: "Delivered",        value: delivered,       color: STATUS_COLORS["Delivered"] },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of all Crystal Sky shipments and live status.
          </p>
        </div>
        <Link href="/admin/shipments/new" className="btn-primary">
          + New Shipment
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl p-5 ring-1 ${s.color}`}
          >
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Shipments table */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">All Shipments</h2>
        <AdminShipmentList shipments={shipments} />
      </div>
    </div>
  );
}
