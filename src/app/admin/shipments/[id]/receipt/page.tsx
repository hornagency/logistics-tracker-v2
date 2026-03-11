import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CslLetterhead } from "@/components/CslLetterhead";
import { PrintButton } from "@/components/PrintButton";

function receiptNumber(id: string, createdAt: Date) {
  const date = createdAt.toISOString().slice(0, 10).replace(/-/g, "");
  return `CSL-RCP-${date}-${id.slice(-6).toUpperCase()}`;
}

function fmtDate(d: Date | null | undefined) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { updates: { orderBy: { createdAt: "asc" } } },
  });
  if (!shipment) notFound();

  const rcpNo     = receiptNumber(shipment.id, shipment.createdAt);
  const issueDate = fmtDate(shipment.createdAt);
  const today     = fmtDate(new Date());
  const isDelivered = shipment.status === "Delivered";

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      {/* Toolbar */}
      <div className="print:hidden border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href={`/admin/shipments/${id}`} className="text-sm text-slate-500 hover:text-primary">
            ← Back to shipment
          </Link>
          <div className="flex items-center gap-3">
            <Link href={`/admin/shipments/${id}/invoice`} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Switch to Invoice
            </Link>
            <PrintButton label="Download / Print Receipt" />
          </div>
        </div>
      </div>

      {/* Document */}
      <div className="mx-auto max-w-4xl bg-white p-10 shadow-lg print:shadow-none print:p-0 print:max-w-none my-8 print:my-0">
        <CslLetterhead />

        {/* Receipt header */}
        <div className="mt-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-black uppercase tracking-widest text-slate-900">Receipt</h1>
              {isDelivered && (
                <span className="rotate-[-8deg] rounded-lg border-4 border-emerald-500 px-3 py-1 text-lg font-black uppercase tracking-widest text-emerald-600">
                  Delivered
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">Document Type: Shipment Receipt</p>
          </div>
          <div className="text-right text-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Receipt No.</p>
            <p className="mt-0.5 text-base font-bold text-slate-900">{rcpNo}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">Shipment Date</p>
            <p className="mt-0.5 text-slate-700">{issueDate}</p>
            {shipment.estimatedDelivery && (
              <>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">Est. Delivery</p>
                <p className="mt-0.5 font-semibold text-sky-700">{fmtDate(shipment.estimatedDelivery)}</p>
              </>
            )}
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">Printed</p>
            <p className="mt-0.5 text-slate-700">{today}</p>
          </div>
        </div>

        {/* Sender / Receiver */}
        <div className="mt-8 grid grid-cols-2 gap-8 rounded-xl bg-slate-50 p-6 print:bg-gray-50">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Sender / Shipper</p>
            <div className="mt-2 text-sm leading-6 text-slate-700">
              {shipment.senderName ? (
                <>
                  <p className="font-semibold text-slate-900">{shipment.senderName}</p>
                  {shipment.senderAddress && <p>{shipment.senderAddress}</p>}
                  {shipment.senderEmail   && <p>{shipment.senderEmail}</p>}
                  {shipment.senderPhone   && <p>{shipment.senderPhone}</p>}
                </>
              ) : (
                <>
                  <p className="font-semibold text-slate-900">Crystal Sky Logistics Ltd.</p>
                  <p>Global Operations Center</p>
                  <p>contact@crystalskylogistics.com</p>
                </>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Receiver / Consignee</p>
            <div className="mt-2 text-sm leading-6 text-slate-700">
              {shipment.recipientName ? (
                <>
                  <p className="font-semibold text-slate-900">{shipment.recipientName}</p>
                  {shipment.recipientAddress && <p>{shipment.recipientAddress}</p>}
                  {shipment.recipientEmail   && <p>{shipment.recipientEmail}</p>}
                  {shipment.recipientPhone   && <p>{shipment.recipientPhone}</p>}
                </>
              ) : (
                <p className="italic text-slate-400">No consignee on file — edit shipment to add.</p>
              )}
            </div>
          </div>
        </div>

        {/* Shipment summary */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Shipment Summary</p>
          <table className="mt-3 w-full overflow-hidden rounded-xl border border-slate-200 text-sm">
            <tbody className="divide-y divide-slate-100">
              {([
                ["Tracking Code",      shipment.trackingCode],
                ["Service Type",       shipment.serviceType],
                ["Origin",             shipment.origin],
                ["Destination",        shipment.destination],
                ["Final Status",       shipment.status],
                ["Estimated Delivery", fmtDate(shipment.estimatedDelivery)],
                ["Package Type",       shipment.packageType     ?? "—"],
                ["Pieces",             shipment.pieces          ?? "—"],
                ["Weight",             shipment.weight          ?? "—"],
                ["Dimensions",         shipment.dimensions      ?? "—"],
                ["Contents",           shipment.packageDesc     ?? "—"],
                ["Special Handling",   shipment.specialHandling ?? "—"],
                ["Declared Value",     shipment.declaredValue   ?? "—"],
                ["Signature Required", shipment.signatureRequired ? "Yes" : "No"],
                ["Shipment Date",      issueDate],
              ] as [string, string][]).map(([label, value]) => (
                <tr key={label}>
                  <td className="w-2/5 bg-slate-50 px-5 py-3 font-medium text-slate-500 print:bg-gray-50">{label}</td>
                  <td className={`px-5 py-3 font-medium ${label === "Declared Value" && value !== "—" ? "text-sky-700" : "text-slate-900"}`}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delivery history */}
        {shipment.updates.length > 0 && (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Delivery History</p>
            <table className="mt-3 w-full overflow-hidden rounded-xl border border-slate-200 text-sm">
              <thead className="bg-slate-50 print:bg-gray-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Date &amp; Time</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shipment.updates.map((u) => (
                  <tr key={u.id} className={u.status === "Delivered" ? "bg-emerald-50 print:bg-green-50" : ""}>
                    <td className="px-5 py-3 text-slate-500 whitespace-nowrap">
                      {new Date(u.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                    </td>
                    <td className="px-5 py-3 font-medium text-slate-900">{u.status}</td>
                    <td className="px-5 py-3 text-slate-600">{u.location ?? "—"}</td>
                    <td className="px-5 py-3 text-slate-500">{u.description ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Notes */}
        {shipment.notes && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-amber-50 p-5 print:bg-yellow-50">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Notes</p>
            <p className="mt-2 text-sm text-slate-700">{shipment.notes}</p>
          </div>
        )}

        {/* Signature boxes */}
        <div className="mt-10 grid grid-cols-2 gap-8">
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Issued By</p>
            <p className="mt-3 font-medium text-slate-900">Crystal Sky Logistics</p>
            <div className="mt-4 border-t border-dashed border-slate-200 pt-2">
              <p className="text-xs text-slate-400">Authorised Signature</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Received By</p>
            {shipment.signatureRequired && (
              <p className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                Signature Required
              </p>
            )}
            <div className="mt-8 border-t border-dashed border-slate-200 pt-2">
              <p className="text-xs text-slate-400">Consignee Signature &amp; Date</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          <p className="font-medium text-slate-600">Crystal Sky Logistics Ltd.</p>
          <p className="mt-1">This receipt confirms shipment was processed. Keep for your records.</p>
          <p className="mt-1">For queries: contact@crystalskylogistics.com</p>
          <p className="mt-3 font-mono text-[10px] tracking-wide text-slate-300">
            {rcpNo} · Generated {today}
          </p>
        </div>
      </div>
    </div>
  );
}
