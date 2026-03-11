"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

/** Generates a tracking code using the browser's CSPRNG, not Math.random(). */
function generateTrackingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const randomValues = new Uint8Array(6);
  crypto.getRandomValues(randomValues);
  const suffix = Array.from(randomValues)
    .map((b) => chars[b % chars.length])
    .join("");
  return `CSL-${suffix}`;
}

const INITIAL_FORM = {
  trackingCode:     "",
  status:           "Processing",
  serviceType:      "General",
  origin:           "",
  destination:      "",
  // Sender
  senderName:       "",
  senderAddress:    "",
  senderEmail:      "",
  senderPhone:      "",
  // Receiver
  recipientName:    "",
  recipientAddress: "",
  recipientEmail:   "",
  recipientPhone:   "",
  // Package
  packageType:      "",
  pieces:           "",
  weight:           "",
  dimensions:       "",
  packageDesc:      "",
  declaredValue:    "",
  specialHandling:  "",
  // Delivery
  estimatedDelivery: "",
  signatureRequired:  false,
  // Misc
  notes: "",
};

export default function NewShipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const set = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleGenerateCode = useCallback(() => {
    set("trackingCode", generateTrackingCode());
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          trackingCode: form.trackingCode.trim().toUpperCase(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      router.push(`/admin/shipments/${data.id}`);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create shipment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">New Shipment</h1>
      <p className="mt-1 text-sm text-slate-500">
        Fill in the shipment details below. The tracking code is shared with the customer for self-service Track &amp; Trace.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">

        {/* ── 1. Shipment Info ───────────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Shipment Info</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {/* Tracking code */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Tracking Code <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  required maxLength={15}
                  value={form.trackingCode}
                  onChange={(e) => set("trackingCode", e.target.value.toUpperCase())}
                  className="input-field flex-1 font-mono"
                  placeholder="CSL-XXXXXX"
                />
                <button type="button" onClick={handleGenerateCode} className="btn-secondary whitespace-nowrap">
                  Generate
                </button>
              </div>
            </div>
            {/* Status */}
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
            {/* Service type */}
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
            {/* Estimated delivery */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Estimated Delivery Date</label>
              <input
                type="date"
                value={form.estimatedDelivery}
                onChange={(e) => set("estimatedDelivery", e.target.value)}
                className="input-field mt-1"
              />
            </div>
            {/* Signature required */}
            <div className="flex items-end pb-1">
              <label className="flex cursor-pointer items-center gap-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={form.signatureRequired}
                    onChange={(e) => set("signatureRequired", e.target.checked)}
                  />
                  <div className="h-5 w-9 rounded-full bg-slate-200 transition peer-checked:bg-sky-600" />
                  <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">Signature Required on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* ── 2. Route ───────────────────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Route</h2>
          <p className="mt-0.5 text-xs text-slate-400">City and country only — for tracking display and documents.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Origin (Departure) <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.origin}
                onChange={(e) => set("origin", e.target.value)}
                className="input-field mt-1"
                placeholder="e.g. New York, USA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Destination (Arrival) <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.destination}
                onChange={(e) => set("destination", e.target.value)}
                className="input-field mt-1"
                placeholder="e.g. London, UK"
              />
            </div>
          </div>
        </div>

        {/* ── 3. Sender / Shipper ────────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Sender <span className="text-sm font-normal text-slate-400">/ Shipper</span>
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">Person or company dispatching the package.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name / Company</label>
              <input value={form.senderName} onChange={(e) => set("senderName", e.target.value)} className="input-field mt-1" placeholder="Acme Corp Ltd." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Address</label>
              <input value={form.senderAddress} onChange={(e) => set("senderAddress", e.target.value)} className="input-field mt-1" placeholder="123 Export Ave, New York" />
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
        </div>

        {/* ── 4. Receiver / Consignee ───────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Receiver <span className="text-sm font-normal text-slate-400">/ Consignee</span>
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">Person or company receiving the package. Appears on invoice and receipt.</p>
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
        </div>

        {/* ── 5. Package Details ────────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">Package Details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Package Type</label>
              <select value={form.packageType} onChange={(e) => set("packageType", e.target.value)} className="input-field mt-1">
                <option value="">— Select —</option>
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
                <option value="">— None —</option>
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
        </div>

        {/* ── 6. Notes ──────────────────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block font-semibold text-slate-900">Internal Notes</label>
          <p className="mt-0.5 text-xs text-slate-400">Visible on documents but not on the public tracking page.</p>
          <textarea
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            className="input-field mt-2"
            rows={3}
            placeholder="Delivery window, special instructions, internal references, etc."
          />
        </div>

        <div className="flex gap-3 pb-8">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Creating…" : "Create Shipment"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
