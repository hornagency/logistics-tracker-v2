"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ShipmentResult = {
  trackingCode: string;
  origin: string;
  destination: string;
  status: string;
  serviceType: string;
  createdAt: string;
  senderName: string | null;
  senderAddress: string | null;
  recipientName: string | null;
  recipientAddress: string | null;
  signatureRequired: boolean;
  declaredValue: string | null;
  estimatedDelivery: string | null;
  updates: { status: string; location: string | null; description: string | null; createdAt: string }[];
};

export default function TrackPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShipmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/track/${encodeURIComponent(code.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Shipment not found");
        return;
      }
      setResult(data);
    } catch {
      setError("Failed to fetch. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] bg-slate-50">
      {/* Banner */}
      <section className="relative h-56 overflow-hidden bg-slate-200 md:h-72">
        <Image
          src="https://images.unsplash.com/photo-1768796372882-8b67936af681?w=1600&q=80"
          alt="Warehouse worker scanning inventory for shipment tracking"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent" />
        <div className="relative flex h-full flex-col justify-center px-4 text-white">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl">Where Is Your Shipment?</h1>
            <p className="mt-3 text-slate-200">
              Type in your Crystal Sky tracking code and we&apos;ll show you exactly where your parcel is and every stop it has made along the way.
            </p>
          </div>
        </div>
      </section>

      {/* Widget-style form + full result */}
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Track Your Shipment</h2>
          <p className="mt-1 text-slate-600">Your tracking code was sent with your shipment confirmation. Paste it in below and hit the button.</p>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap items-center gap-2">
            <input
              type="text"
              maxLength={15}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. CSL-A1B2C3"
              className="input-field max-w-xs flex-1 font-mono"
            />
            <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap">
              {loading ? "Searching…" : "Track Now!"}
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-sm text-slate-500">Tracking code</p>
                <p className="text-xl font-bold text-slate-900">{result.trackingCode}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {result.status}
              </span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Origin</p>
                <p className="font-medium text-slate-900">{result.origin}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Destination</p>
                <p className="font-medium text-slate-900">{result.destination}</p>
              </div>
            </div>

            {/* Sender / Receiver & insurance info */}
            <div className="mt-6 grid gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sender / Shipper</p>
                {result.senderName || result.senderAddress ? (
                  <div className="mt-2 text-sm text-slate-700">
                    {result.senderName && <p className="font-medium text-slate-900">{result.senderName}</p>}
                    {result.senderAddress && <p className="mt-0.5">{result.senderAddress}</p>}
                  </div>
                ) : (
                  <p className="mt-2 text-sm italic text-slate-400">Not provided</p>
                )}
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Receiver / Consignee</p>
                {result.recipientName || result.recipientAddress ? (
                  <div className="mt-2 text-sm text-slate-700">
                    {result.recipientName && <p className="font-medium text-slate-900">{result.recipientName}</p>}
                    {result.recipientAddress && <p className="mt-0.5">{result.recipientAddress}</p>}
                  </div>
                ) : (
                  <p className="mt-2 text-sm italic text-slate-400">Not provided</p>
                )}
              </div>
            </div>
            <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Signature required</p>
                <p className="mt-2 font-medium text-slate-900">{result.signatureRequired ? "Yes" : "No"}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Declared value</p>
                {result.declaredValue ? (
                  <p className="mt-2 font-medium text-sky-700">{result.declaredValue}</p>
                ) : (
                  <p className="mt-2 text-sm italic text-slate-400">Not provided</p>
                )}
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Estimated delivery</p>
                {result.estimatedDelivery ? (
                  <p className="mt-2 font-medium text-slate-900">
                    {new Date(result.estimatedDelivery).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                ) : (
                  <p className="mt-2 text-sm italic text-slate-400">Not provided</p>
                )}
              </div>
            </div>
            {result.updates.length > 0 && (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <h3 className="font-semibold text-slate-900">Shipment Journey</h3>
                <ul className="mt-3 space-y-3">
                  {result.updates
                    .slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((u, i) => (
                      <li key={i} className="flex gap-3 border-l-2 border-primary/30 pl-4">
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{u.status}</p>
                          {u.location && <p className="text-sm text-slate-600">{u.location}</p>}
                          {u.description && <p className="text-sm text-slate-500">{u.description}</p>}
                          <p className="mt-1 text-xs text-slate-400">
                            {new Date(u.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-slate-500">
          Can&apos;t find your tracking code?{" "}
          <Link href="/#contact" className="text-primary hover:underline">Get in touch</Link> and we&apos;ll look it up for you.
        </p>
        <p className="mt-2 text-center text-sm">
          <Link href="/" className="text-slate-400 hover:text-primary">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
