export default function AdminLoading() {
  return (
    <div className="space-y-6">
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-3 h-3 w-20 rounded bg-slate-200" />
            <div className="h-8 w-12 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="animate-pulse rounded-xl bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="h-4 w-40 rounded bg-slate-200" />
        </div>
        <div className="divide-y divide-slate-50">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4">
              <div className="h-3 w-28 rounded bg-slate-100" />
              <div className="h-3 w-40 rounded bg-slate-100" />
              <div className="ml-auto h-5 w-20 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
