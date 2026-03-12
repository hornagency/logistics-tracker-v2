import type { Metadata } from "next";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = {
  title: "Admin | Crystal Sky Logistics",
  robots: { index: false, follow: false },
};

/** Admin pages use the database — must not be prerendered at build time. */
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 print:max-w-none print:p-0 print:m-0">
        {children}
      </main>
    </div>
  );
}
