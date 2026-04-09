import Image from "next/image";
import Link from "next/link";
import { getContactSettings } from "@/lib/contact";
import { HeroSlider } from "@/components/HeroSlider";
import { TrackTraceWidget } from "@/components/TrackTraceWidget";

const SERVICES = [
  {
    title: "Air Freight",
    desc: "Air export and import: bookings, documentation, and milestones updated on your shipment record as they happen.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    alt: "Cargo aircraft on airport tarmac at sunset",
  },
  {
    title: "Ocean Freight",
    desc: "Container and consolidated sea freight with updates at the main steps so you are not left without status for long stretches.",
    image: "https://images.unsplash.com/photo-1760165385839-a87ebb370ab5?w=600&q=80",
    alt: "Large container ship being loaded at a busy international port",
  },
  {
    title: "Road Freight",
    desc: "Domestic and cross-border road moves from part loads to full trucks, with agreed collection and delivery windows.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80",
    alt: "Freight truck driving on an open highway at sunrise",
  },
  {
    title: "Warehousing",
    desc: "Storage before or after main carriage, including controlled environments where needed, on the same tracking flow as the rest of the move.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
    alt: "Modern warehouse interior with organised shelving and forklifts",
  },
  {
    title: "Supply Chain",
    desc: "End to end coordination from collection to delivery when you want one party arranging the chain instead of several handoffs.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80",
    alt: "Supply chain logistics and planning overview",
  },
  {
    title: "Packaging",
    desc: "Crating and packing suited to the mode you are using so goods are less likely to arrive damaged.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    alt: "Professional packaging and crating for industrial cargo",
  },
];

const PROJECTS = [
  {
    title: "Route consolidation",
    tag: "Road",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    alt: "Logistics analytics dashboard with route maps",
    desc: "A retail client had several light loads on similar corridors. We merged where it made sense and cut empty running without changing their cut-off times.",
  },
  {
    title: "Warehouse records",
    tag: "Warehouse",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&q=80",
    alt: "Warehouse worker scanning barcode on inventory shelf",
    desc: "Moved a small warehouse from paper lists to barcode checks and a simple stock view so dispatch could see what was on hand the same day.",
  },
  {
    title: "Delivery rounds",
    tag: "Last mile",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    alt: "Route planning map on a laptop screen",
    desc: "Adjusted a local delivery plan so the same areas were not visited twice in one week unless volume required it.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We get a straight answer when we call. Delays still happen in freight, but we are not left guessing.",
    attribution: "Operations lead, UK retail",
  },
  {
    quote:
      "Customers use the tracking link instead of emailing us for every update. That was the main win for our team.",
    attribution: "Owner, online goods seller",
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
          <h2 className="mt-2 text-center text-3xl font-bold text-slate-900">Services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Air, sea, road, storage, and related work. Tell us origin, destination, and goods, and we will propose a mode and keep status on your file.
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
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Who we are</h2>
              <p className="mt-6 text-slate-600">
                Vectora is a freight forwarder with air, ocean, road, and warehouse coverage. We started from seeing too many silent partners when schedules slipped.
              </p>
              <p className="mt-4 text-slate-600">
                Tracking is online for every active file, and there is a human contact when something needs a decision or a call to a carrier.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-primary">Our Mission</h3>
                  <p className="mt-2 text-slate-600">
                    Clear pricing where we can give it, status you can see, and someone who answers when the lane is stuck.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-primary">Our Vision</h3>
                  <p className="mt-2 text-slate-600">
                    International shipping with less admin on your side: paperwork and handoffs handled as part of the job.
                  </p>
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
          <h2 className="mt-2 text-center text-3xl font-bold text-slate-900">Recent work</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Examples of the sort of changes we make for clients. Details vary by lane and contract.
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
                  <Link href="/#contact" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                    Contact
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Feedback</p>
          <h2 className="mt-2 text-center text-3xl font-bold text-slate-900">What clients said</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
            Short notes from people we already move freight for. Roles are general on purpose.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.attribution}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <p className="flex-1 text-slate-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-500">{t.attribution}</p>
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
            <h2 className="mt-2 text-3xl font-bold">Contact</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Email or call with origin, destination, and what you are shipping. We reply with rates or questions, usually within one business day.
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
