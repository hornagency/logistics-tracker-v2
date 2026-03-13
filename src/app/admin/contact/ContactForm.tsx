"use client";

import { useState } from "react";
import type { ContactSettings } from "@/lib/contact";

type FormState = { email: string; phone: string; officeHoursLine1: string; officeHoursLine2: string };

export function ContactForm({ initial }: { initial: ContactSettings }) {
  const [form, setForm] = useState<FormState>({
    email: initial.email,
    phone: initial.phone,
    officeHoursLine1: initial.officeHoursLine1,
    officeHoursLine2: initial.officeHoursLine2 ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          phone: form.phone.trim(),
          officeHoursLine1: form.officeHoursLine1.trim(),
          officeHoursLine2: form.officeHoursLine2.trim() || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaved(true);
    } catch {
      alert("Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">Email Us</h2>
        <p className="mt-1 text-sm text-slate-500">Shown on homepage and footer.</p>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="input-field mt-3"
          placeholder="contact@crystalskylogistics.com"
          required
        />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">Call Us</h2>
        <p className="mt-1 text-sm text-slate-500">Phone number for the contact section.</p>
        <input
          type="text"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="input-field mt-3"
          placeholder="+1 (555) 000-0000"
          required
        />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">Office Hours</h2>
        <p className="mt-1 text-sm text-slate-500">First line (e.g. Mon – Fri, 8 am to 6 pm GMT).</p>
        <input
          type="text"
          value={form.officeHoursLine1}
          onChange={(e) => setForm((f) => ({ ...f, officeHoursLine1: e.target.value }))}
          className="input-field mt-3"
          placeholder="Mon – Fri, 8 am to 6 pm GMT"
          required
        />
        <p className="mt-3 text-sm text-slate-500">Second line (e.g. Shipment tracking: 24/7). Optional.</p>
        <input
          type="text"
          value={form.officeHoursLine2}
          onChange={(e) => setForm((f) => ({ ...f, officeHoursLine2: e.target.value }))}
          className="input-field mt-1"
          placeholder="Shipment tracking: 24/7"
        />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving…" : "Save contact details"}
        </button>
        {saved && <span className="text-sm text-emerald-600">✓ Saved</span>}
      </div>
    </form>
  );
}
