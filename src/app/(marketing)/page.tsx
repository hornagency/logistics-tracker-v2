import Image from "next/image";
import Link from "next/link";
import { getContactSettings } from "@/lib/contact";
import { HeroSlider } from "@/components/HeroSlider";
import { TrackTraceWidget } from "@/components/TrackTraceWidget";

const SERVICES = [
  {
    title: "Air Freight",
    desc: "Got something that needs to be somewhere fast? Vectora moves air cargo to 150+ airports, with same-day booking available and full customs handling at both ends. No hand-holding needed from your side.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    alt: "Cargo aircraft on airport tarmac at sunset",
  },
  {
    title: "Ocean Freight",
    desc: "Whether you're filling a whole container or sharing one, Vectora coordinates your sea shipment from first port to last. You'll get updates at each stage so you're not left guessing for days at a time.",
    image: "https://images.unsplash.com/photo-1760165385839-a87ebb370ab5?w=600&q=80",
    alt: "Large container ship being loaded at a busy international port",
  },
  {
    title: "Road Freight",
    desc: "Vectora covers domestic and cross-border road freight for all sizes, from a single pallet to multi-truck loads. GPS-tracked vehicles, straightforward pricing, and delivery windows that are actually kept.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80",
    alt: "Freight truck driving on an open highway at sunrise",
  },
  {
    title: "Warehousing",
    desc: "If your goods need to sit somewhere before moving on, Vectora's warehouse network sits near major hubs. Temperature-controlled, secure, and on the same Track & Trace system as every other leg of the journey.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
    alt: "Modern warehouse interior with organised shelving and forklifts",
  },
  {
    title: "Supply Chain",
    desc: "Most logistics partners handle one piece. Vectora can manage the whole chain — from pickup at source to final delivery — and help you spot where time and money leak out along the way.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80",
    alt: "Supply chain logistics and planning overview",
  },
  {
    title: "Packaging",
    desc: "Breakage usually happens because things weren't packed right in the first place. Vectora's packing team prepares cargo for the specific mode it's travelling on — proper materials and methods, not whatever happens to be lying around.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    alt: "Professional packaging and crating for industrial cargo",
  },
];

const PROJECTS = [
  {
    title: "Freight Lane Consolidation",
    tag: "Cost Reduction",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    alt: "Logistics analytics dashboard with route maps",
    desc: "A retailer we work with was running a lot of near-empty trucks on overlapping routes. We consolidated the lanes, cut their freight mileage by 34%, and saved them over $200,000 in the first year.",
  },
  {
    title: "Live Inventory Dashboard",
    tag: "Warehouse Tech",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&q=80",
    alt: "Warehouse worker scanning barcode on inventory shelf",
    desc: "A client's warehouse was running entirely on paper records. After setting them up with barcode scanning and a live dashboard, their stockout incidents dropped by 67% in the first three months.",
  },
  {
    title: "Last-Mile Route Cleanup",
    tag: "Delivery Efficiency",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    alt: "Route planning map on a laptop screen",
    desc: "One client was sending different vehicles to the same postcodes on different days. We cleaned up the route plan, removed 12 overlapping delivery legs, and brought the average delivery time down by two full days.",
  },
];

const TESTIMONIALS = [
  {
    quote: "We tried three other freight companies before Vectora. With every one of them, I'd find out about a problem because I went looking. Vectora actually picks up the phone and tells me first. Sounds like a small thing, but it changes everything about how you plan your day.",
    name: "John Peter",
    role: "Logistics Director, Hallmark Retail Group",
    initials: "JP",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&w=150&q=80",
    stars: 5,
  },
  {
    quote: "Wasn't sure about giving them our Frankfurt deliveries. Tight windows, a client who notices every slip. But every single shipment arrived on time, and they had status updates ready before I thought to check. Passed their number on to a few contacts since and they've all come back happy.",
    name: "Martin Hope",
    role: "Managing Director, ProMov Freight",
    initials: "MH",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    stars: 5,
  },
  {
    quote: "A year ago I was spending part of every week responding to customers asking where their orders were. Since moving to Vectora, those messages have almost completely stopped. Customers get a tracking link and check it themselves. That alone has freed up a lot of my time.",
    name: "Sarah Owen",
    role: "Founder, Crestline E-Commerce",
    initials: "SO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    stars: 5,
  },
  {
    quote: "Customs used to cost us two or three days every time, and nobody could ever explain why. Vectora sorts the paperwork before the shipment arrives, so it clears straight through. We've been working with them for about 18 months now and haven't had a single hold-up at the port.",
    name: "David Kwan",
    role: "Import Operations Manager, TechBridge Asia",
    initials: "DK",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    stars: 5,
  },
];

export default async function HomePage() {
  const contact = await getContactSettings();
  return (
    <>
      <HeroSlider />

      {/* Track & Trace widget */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-100 py-16">
        <Image
          src="https://images.unsplash.com/photo-1615680022647-99c397cbcaea?w=1600&q=60"
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
          unoptimized
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <TrackTraceWidget variant="strip" showResultsInline />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">What We Do</p>
          <h2 className="mt-2 text-center text-3xl font-bold text-slate-900">What Vectora Can Move for You</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            From a single parcel to a full supply chain, Vectora handles freight by air, sea, and road. Tell us what you&apos;re shipping and we&apos;ll match the right mode and keep you updated end to end.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="relative aspect-[16/10] w-full">
                  <Image src={s.image} alt={s.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-slate-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1570521462033-3015e76e7432?w=800&q=80"
                alt="Vectora Logistics team coordinating shipments at a logistics hub"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Who We Are</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">A Logistics Company That Actually Picks Up the Phone</h2>
              <p className="mt-6 text-slate-600">
                Vectora was started because too many businesses were being let down by freight partners who went quiet the moment something went wrong. We wanted to build something different: a company where clients get honest updates, not excuses.
              </p>
              <p className="mt-4 text-slate-600">
                We use good tracking technology, yes. But we also have experienced people behind every shipment who know what to do when things don&apos;t go to plan. Because sometimes they don&apos;t, and that&apos;s when it matters who you&apos;re working with.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-primary">Our Mission</h3>
                  <p className="mt-2 text-slate-600">Give businesses of every size access to reliable, transparent freight handling. You shouldn&apos;t need to be a large corporation to get a logistics partner that actually communicates.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-primary">Our Vision</h3>
                  <p className="mt-2 text-slate-600">Shipping internationally should be straightforward. We&apos;re working toward a point where any business can move goods across borders without it being a full-time job to manage.</p>
                </div>
              </div>
              <p className="mt-8">
                <Link href="/about" className="btn-secondary">Our Full Story</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Client Work</p>
          <h2 className="mt-2 text-center text-3xl font-bold text-slate-900">A Few Problems We&apos;ve Solved</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Numbers don&apos;t tell the whole story, but they help. Here are three real situations where we came in and fixed something that was costing a client time or money.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <div key={p.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="relative aspect-video w-full">
                  <Image src={p.image} alt={p.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">{p.tag}</span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-slate-600">{p.desc}</p>
                  <Link href="/#contact" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">Talk to us about this →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Client Stories</p>
          <h2 className="mt-2 text-center text-3xl font-bold text-slate-900">What Our Clients Actually Say</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
            We asked a few of the businesses we work with to share their experience. Here&apos;s what they told us.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="flex-1 text-slate-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="flex items-center gap-3 border-t border-slate-200 pt-4">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="44px" unoptimized />
                  </div>
                  <div>
                    <cite className="block font-semibold text-slate-900 not-italic">{t.name}</cite>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden border-t border-slate-200 bg-slate-900 py-20 text-white">
        <Image
          src="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=1600&q=50"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          unoptimized
        />
        <div className="relative z-10 mx-auto max-w-5xl px-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary/80">Get in Touch</p>
            <h2 className="mt-2 text-3xl font-bold">Have Something to Move?</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Email or call Vectora Logistics. Share what you&apos;re shipping, origin, and destination — we&apos;ll reply with a clear quote and a realistic timeline.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <a
              href={`mailto:${contact.email}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-white">Email Us</p>
                <p className="mt-1 text-sm text-slate-400">{contact.email}</p>
              </div>
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-white">Call Us</p>
                <p className="mt-1 text-sm text-slate-400">{contact.phone}</p>
              </div>
            </a>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-white">Office Hours</p>
                <p className="mt-1 text-sm text-slate-400">{contact.officeHoursLine1}</p>
                {contact.officeHoursLine2 && <p className="mt-0.5 text-sm text-slate-400">{contact.officeHoursLine2}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
