import Link from "next/link";
import { VectoraLogo } from "@/components/VectoraLogoMark";
import { getContactSettings } from "@/lib/contact";

const services = [
  { name: "Air Freight", href: "/#services" },
  { name: "Ocean Freight", href: "/#services" },
  { name: "Road Freight", href: "/#services" },
  { name: "Warehousing", href: "/#services" },
  { name: "Supply Chain", href: "/#services" },
  { name: "Packaging", href: "/#services" },
];

export async function Footer() {
  const contact = await getContactSettings();
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="Vectora Logistics">
              <VectoraLogo size="md" light />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Air, ocean, and road freight, plus warehousing when the move needs it. Based in the UK with files you can track online.
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
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={telHref} className="hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </li>
            </ul>
            <div className="mt-5 rounded-lg bg-white/5 px-4 py-3 text-sm">
              <p className="font-medium text-white">Support Hours</p>
              <p className="mt-1 text-slate-400">{contact.officeHoursLine1}</p>
              {contact.officeHoursLine2 && <p className="text-slate-400">{contact.officeHoursLine2}</p>}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Vectora Logistics Ltd. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">Registered in the United Kingdom</p>
        </div>
      </div>
    </footer>
  );
}
