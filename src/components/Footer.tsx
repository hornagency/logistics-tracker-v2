import Link from "next/link";
import { CslLogo } from "@/components/CslLogoMark";

const services = [
  { name: "Air Freight", href: "/#services" },
  { name: "Ocean Freight", href: "/#services" },
  { name: "Road Freight", href: "/#services" },
  { name: "Warehousing", href: "/#services" },
  { name: "Supply Chain", href: "/#services" },
  { name: "Packaging", href: "/#services" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="Crystal Sky Logistics">
              <CslLogo size="md" light />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Air, ocean, road, and warehousing for businesses of all sizes. We&apos;ve been doing this long enough to know how to get it right.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-white">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-white">Services</p>
            <ul className="mt-3 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="hover:text-white transition-colors">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Track & Contact */}
          <div>
            <p className="font-semibold text-white">Track & Support</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/track" className="hover:text-white transition-colors">Track a Shipment</Link></li>
              <li>
                <a href="mailto:contact@crystalskylogistics.com" className="hover:text-white transition-colors">
                  contact@crystalskylogistics.com
                </a>
              </li>
              <li>
                <a href="tel:+15550000000" className="hover:text-white transition-colors">+1 (555) 000-0000</a>
              </li>
            </ul>
            <div className="mt-5 rounded-lg bg-white/5 px-4 py-3 text-sm">
              <p className="font-medium text-white">Support Hours</p>
              <p className="mt-1 text-slate-400">Mon – Fri · 8 am – 6 pm GMT</p>
              <p className="text-slate-400">Shipment tracking: 24/7</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Crystal Sky Logistics Ltd. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Freight you can actually track. People you can actually reach.
          </p>
        </div>
      </div>
    </footer>
  );
}
