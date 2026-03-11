"use client";

import { useState } from "react";
import Link from "next/link";

type ShipmentResult = {
  trackingCode: string;
  origin: string;
  destination: string;
  status: string;
  updates: { status: string; location: string | null; description: string | null; createdAt: string }[];
};

type TrackTraceWidgetProps = {
  variant?: "strip" | "card";
  showResultsInline?: boolean;
};

export function TrackTraceWidget({ variant = "strip", showResultsInline = true }: TrackTraceWidgetProps) {
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

  const isStrip = variant === "strip";

  return (
    <div
      className={
        isStrip
          ? "rounded-xl border border-slate-200 bg-white/95 p-6 shadow-lg backdrop-blur sm:p-8"
          : "rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      }
    >
      <h2 className="text-xl font-bold text-slate-900">Track & Trace</h2>
      <p className="mt-1 text-slate-600">
        Real-time, detailed progress as your shipment speeds through the network. Enter up to 15 tracking characters.
      </p>
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
      {error && (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      {showResultsInline && result && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <p className="font-mono font-semibold text-slate-900">{result.trackingCode}</p>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary">
              {result.status}
            </span>
          </div>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <p><span className="text-slate-500">Origin:</span> {result.origin}</p>
            <p><span className="text-slate-500">Destination:</span> {result.destination}</p>
          </div>
          {result.updates.length > 0 && (
            <div className="mt-3 border-t border-slate-200 pt-3">
              <p className="text-xs font-medium uppercase text-slate-500">Progress</p>
              <ul className="mt-1 space-y-1 text-sm">
                {result.updates.slice(0, 3).map((u, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{u.status}{u.location ? ` — ${u.location}` : ""}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link href="/track" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            View full details →
          </Link>
        </div>
      )}
    </div>
  );
}
