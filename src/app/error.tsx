"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production you would forward this to Sentry / Datadog etc.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-md">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Something went wrong</h1>
        <p className="mb-6 text-slate-500">
          Something went wrong on the Vectora Logistics site. You can try again or head back to the homepage. If this keeps happening, please contact us via the details in the footer.
        </p>
        {error.digest && (
          <p className="mb-6 rounded bg-slate-100 px-3 py-2 font-mono text-xs text-slate-500">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
