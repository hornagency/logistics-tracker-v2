"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ShipmentUpdate = {
  id: string;
  status: string;
  location: string | null;
  description: string | null;
  createdAt: Date;
};

type Shipment = {
  id: string;
  trackingCode: string;
  origin: string;
  destination: string;
  status: string;
  serviceType: string;
  // Sender
  senderName: string | null;
  senderAddress: string | null;
  senderEmail: string | null;
  senderPhone: string | null;
  // Receiver
  recipientName: string | null;
  recipientAddress: string | null;
  recipientEmail: string | null;
  recipientPhone: string | null;
  // Package
  pieces: string | null;
  weight: string | null;
  dimensions: string | null;
  packageType: string | null;
  packageDesc: string | null;
  declaredValue: string | null;
  specialHandling: string | null;
  // Delivery
  estimatedDelivery: Date | null;
  signatureRequired: boolean;
  // Misc
  notes: string | null;
  updates: ShipmentUpdate[];
};

/** Format a Date as YYYY-MM-DD for <input type="date"> */
function toDateInput(d: Date | null): string {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}

export function ShipmentEdit({ shipment }: { shipment: Shipment }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    origin:            shipment.origin,
    destination:       shipment.destination,
    status:            shipment.status,
    serviceType:       shipment.serviceType,
    // Sender
    senderName:        shipment.senderName    ?? "",
    senderAddress:     shipment.senderAddress ?? "",
    senderEmail:       shipment.senderEmail   ?? "",
    senderPhone:       shipment.senderPhone   ?? "",
    // Receiver
    recipientName:     shipment.recipientName    ?? "",
    recipientAddress:  shipment.recipientAddress ?? "",
    recipientEmail:    shipment.recipientEmail   ?? "",
    recipientPhone:    shipment.recipientPhone   ?? "",
    // Package
    pieces:            shipment.pieces          ?? "",
    weight:            shipment.weight          ?? "",
    dimensions:        shipment.dimensions      ?? "",
    packageType:       shipment.packageType     ?? "",
    packageDesc:       shipment.packageDesc     ?? "",
    declaredValue:     shipment.declaredValue   ?? "",
    specialHandling:   shipment.specialHandling ?? "",
    // Delivery
    estimatedDelivery: toDateInput(shipment.estimatedDelivery),
    signatureRequired: shipment.signatureRequired,
    // Misc
    notes: shipment.notes ?? "",
  });
  const [newUpdate, setNewUpdate] = useState({ status: "", location: "", description: "" });

  const set = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  async function saveDetails(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/shipments/${shipment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          // Send null for empty optional strings so DB stores NULL
          senderName:    form.senderName    || null,
          senderAddress: form.senderAddress || null,
          senderEmail:   form.senderEmail   || null,
          senderPhone:   form.senderPhone   || null,
          recipientName:    form.recipientName    || null,
          recipientAddress: form.recipientAddress || null,
          recipientEmail:   form.recipientEmail   || null,
          recipientPhone:   form.recipientPhone   || null,
          pieces:          form.pieces          || null,
          weight:          form.weight          || null,
          dimensions:      form.dimensions      || null,
          packageType:     form.packageType     || null,
          packageDesc:     form.packageDesc     || null,
          declaredValue:   form.declaredValue   || null,
          specialHandling: form.specialHandling || null,
          estimatedDelivery: form.estimatedDelivery || null,
          notes: form.notes || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setSaved(true);
    } catch {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  async function addUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!newUpdate.status.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/shipments/${shipment.id}/updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status:      newUpdate.status.trim(),
          location:    newUpdate.location.trim()    || undefined,
          description: newUpdate.description.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to add update");
      setNewUpdate({ status: "", location: "", description: "" });
      router.refresh();
    } catch {
      alert("Failed to add update");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-slate-400 hover:text-primary">← Shipments</Link>
          <h1 className="text-2xl font-bold text-slate-900">
            <span className="font-mono text-primary">{shipment.trackingCode}</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/admin/shipments/${shipment.id}/invoice`}
            target="_blank"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-primary hover:text-primary transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Invoice
          </Link>
          <Link
            href={`/admin/shipments/${shipment.id}/receipt`}
            target="_blank"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-primary hover:text-primary transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            Receipt
          </Link>
        </div>
      </div>

      {/* ── Shipment Details form ── */}
      <form onSubmit={saveDetails} className="space-y-6">

        {/* 1. Shipment Info */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Shipment Info</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className="input-field mt-1">
                <option>Processing</option>
                <option>In Transit</option>
                <option>Out for Delivery</option>
                <option>On Hold</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Service Type</label>
              <select value={form.serviceType} onChange={(e) => set("serviceType", e.target.value)} className="input-field mt-1">
                <option>General</option>
                <option>Air Freight</option>
                <option>Ocean Freight</option>
                <option>Road Freight</option>
                <option>Express</option>
                <option>Warehousing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Estimated Delivery Date</label>
              <input
                type="date"
                value={form.estimatedDelivery}
                onChange={(e) => set("estimatedDelivery", e.target.value)}
                className="input-field mt-1"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex cursor-pointer items-center gap-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={form.signatureRequired}
                    onChange={(e) => set("signatureRequired", e.target.checked)}
                  />
                  <div className="h-5 w-9 rounded-full bg-slate-200 transition peer-checked:bg-primary" />
                  <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">Signature Required on Delivery</span>
              </label>
            </div>
          </div>
        </section>

        {/* 2. Route */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Route</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Origin (Departure)</label>
              <input value={form.origin} onChange={(e) => set("origin", e.target.value)} className="input-field mt-1" required placeholder="e.g. New York, USA" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Destination (Arrival)</label>
              <input value={form.destination} onChange={(e) => set("destination", e.target.value)} className="input-field mt-1" required placeholder="e.g. London, UK" />
            </div>
          </div>
        </section>

        {/* 3. Sender */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Sender <span className="text-sm font-normal text-slate-400">/ Shipper</span>
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name / Company</label>
              <input value={form.senderName} onChange={(e) => set("senderName", e.target.value)} className="input-field mt-1" placeholder="Acme Corp Ltd." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Address</label>
              <input value={form.senderAddress} onChange={(e) => set("senderAddress", e.target.value)} className="input-field mt-1" placeholder="123 Export Ave, City" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" value={form.senderEmail} onChange={(e) => set("senderEmail", e.target.value)} className="input-field mt-1" placeholder="sender@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <input value={form.senderPhone} onChange={(e) => set("senderPhone", e.target.value)} className="input-field mt-1" placeholder="+1 555 000 0000" />
            </div>
          </div>
        </section>

        {/* 4. Receiver */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Receiver <span className="text-sm font-normal text-slate-400">/ Consignee</span>
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name / Company</label>
              <input value={form.recipientName} onChange={(e) => set("recipientName", e.target.value)} className="input-field mt-1" placeholder="John Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Address</label>
              <input value={form.recipientAddress} onChange={(e) => set("recipientAddress", e.target.value)} className="input-field mt-1" placeholder="14 Canary Wharf, London, UK" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" value={form.recipientEmail} onChange={(e) => set("recipientEmail", e.target.value)} className="input-field mt-1" placeholder="receiver@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <input value={form.recipientPhone} onChange={(e) => set("recipientPhone", e.target.value)} className="input-field mt-1" placeholder="+44 20 0000 0000" />
            </div>
          </div>
        </section>

        {/* 5. Package Details */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Package Details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Package Type</label>
              <select value={form.packageType} onChange={(e) => set("packageType", e.target.value)} className="input-field mt-1">
                <option value="">Select…</option>
                <option>Box</option>
                <option>Envelope</option>
                <option>Pallet</option>
                <option>Crate</option>
                <option>Drum</option>
                <option>Roll</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Number of Pieces</label>
              <input value={form.pieces} onChange={(e) => set("pieces", e.target.value)} className="input-field mt-1" placeholder="e.g. 3 boxes, 2 pallets" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Weight</label>
              <input value={form.weight} onChange={(e) => set("weight", e.target.value)} className="input-field mt-1" placeholder="e.g. 18 kg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Dimensions (L × W × H)</label>
              <input value={form.dimensions} onChange={(e) => set("dimensions", e.target.value)} className="input-field mt-1" placeholder="e.g. 40 × 30 × 20 cm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Contents / Description</label>
              <input value={form.packageDesc} onChange={(e) => set("packageDesc", e.target.value)} className="input-field mt-1" placeholder="e.g. Electronic components, handle with care" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Declared Value <span className="text-slate-400 font-normal">(for insurance)</span>
              </label>
              <input value={form.declaredValue} onChange={(e) => set("declaredValue", e.target.value)} className="input-field mt-1" placeholder="e.g. USD 2,500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Special Handling</label>
              <select value={form.specialHandling} onChange={(e) => set("specialHandling", e.target.value)} className="input-field mt-1">
                <option value="">None</option>
                <option>Fragile</option>
                <option>Keep Refrigerated</option>
                <option>Keep Frozen</option>
                <option>Keep Upright</option>
                <option>Keep Dry</option>
                <option>Hazardous Material</option>
                <option>Perishable</option>
                <option>High Value</option>
              </select>
            </div>
          </div>
        </section>

        {/* 6. Notes */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block text-lg font-semibold text-slate-900">Internal Notes</label>
          <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} className="input-field mt-2" rows={3} placeholder="Delivery window, special instructions, internal references, etc." />
        </section>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {saved && <span className="flex items-center gap-1 text-sm text-emerald-600">✓ Saved</span>}
        </div>
      </form>

      {/* ── Add Status Update ── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Add Status Update</h2>
        <p className="mt-1 text-sm text-slate-500">Visible on the public Track &amp; Trace page and printed documents.</p>
        <form onSubmit={addUpdate} className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Status <span className="text-red-500">*</span></label>
            <input required value={newUpdate.status} onChange={(e) => setNewUpdate((u) => ({ ...u, status: e.target.value }))} className="input-field mt-1" placeholder="e.g. Arrived at hub" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Location</label>
            <input value={newUpdate.location} onChange={(e) => setNewUpdate((u) => ({ ...u, location: e.target.value }))} className="input-field mt-1" placeholder="e.g. London Hub" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Remarks</label>
            <input value={newUpdate.description} onChange={(e) => setNewUpdate((u) => ({ ...u, description: e.target.value }))} className="input-field mt-1" placeholder="e.g. Cleared customs" />
          </div>
          <div className="sm:col-span-3">
            <button type="submit" disabled={saving} className="btn-primary">Add Update</button>
          </div>
        </form>
      </section>

      {/* ── Timeline ── */}
      {shipment.updates.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Timeline ({shipment.updates.length})</h2>
          <div className="mt-4 space-y-3">
            {shipment.updates.map((u) => (
              <div key={u.id} className="flex gap-3 border-l-2 border-primary/30 pl-4">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{u.status}</p>
                  {u.location    && <p className="text-sm text-slate-600">{u.location}</p>}
                  {u.description && <p className="text-sm text-slate-500">{u.description}</p>}
                  <p className="text-xs text-slate-400">
                    {new Date(u.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
