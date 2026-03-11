import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-md">
        <p className="mb-2 text-7xl font-extrabold text-sky-600">404</p>
        <h1 className="mb-3 text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mb-8 text-slate-500">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Back to homepage
          </Link>
          <Link
            href="/track"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Track a shipment
          </Link>
        </div>
      </div>
    </div>
  );
}
