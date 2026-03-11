export default function ShipmentLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 w-56 rounded bg-slate-200" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 rounded-xl bg-white p-6 shadow-sm">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-10 rounded bg-slate-100" />
          ))}
        </div>
        <div className="space-y-3 rounded-xl bg-white p-6 shadow-sm">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 rounded bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
