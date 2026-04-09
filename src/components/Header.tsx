"use client";

import Link from "next/link";
import { VectoraLogo } from "@/components/VectoraLogoMark";

const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Track & Trace", href: "/track" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label="Vectora Logistics home">
          <VectoraLogo size="md" />
        </Link>
        <nav className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/track" className="btn-primary text-sm">
          Vectora Track
        </Link>
      </div>
    </header>
  );
}
