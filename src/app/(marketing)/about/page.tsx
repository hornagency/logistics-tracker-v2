import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Vectora Logistics",
  description:
    "Learn how Vectora Logistics connects businesses to global markets through reliable air freight, ocean shipping, and road cargo solutions.",
};

const VALUES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Reliability",
    desc: "A missed delivery affects your customer, not just your schedule. We know that, and it shapes how seriously we take every booking, every handover, and every update we send.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Honest Communication",
    desc: "If something changes with your shipment, you hear it from us first. We don&apos;t wait until you call. When there&apos;s a delay, we tell you what happened and what we&apos;re doing about it.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Moving Fast Where It Matters",
    desc: "Speed is important, but not at the expense of getting it right. We sort the documentation in advance so there are no surprise hold-ups at customs, and we move quickly everywhere else.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "People with Real Experience",
    desc: "Our team has handled air, ocean, road, and customs across many years and many situations. When something complicated comes up, there&apos;s someone here who&apos;s dealt with it before.",
  },
];

const STATS = [
  { value: "150+", label: "Global Destinations" },
  { value: "12,000+", label: "Shipments Delivered" },
  { value: "98.6%", label: "On-Time Delivery Rate" },
  { value: "24/7", label: "Tracking & Support" },
];

export default function AboutPage() {
  return (
    <div className="min-h-[60vh] bg-white">
      {/* Hero banner — logistics operations image */}
      <section className="relative h-64 overflow-hidden bg-slate-800 md:h-80">
        <Image
          src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&q=80"
          alt="Vectora Logistics team coordinating shipments at an operations centre"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/30" />
        <div className="relative flex h-full flex-col justify-center px-4 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold md:text-5xl">About Vectora Logistics</h1>
            <p className="mt-3 text-lg text-slate-200">
              Freight handled properly, with people you can actually reach.
            </p>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Story</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Why We Started Vectora</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Vectora came out of a frustration most businesses know well. You book a freight company, something goes sideways, and suddenly nobody&apos;s available to explain what happened or when it&apos;ll be sorted. We saw it happen too many times, to too many businesses that didn&apos;t deserve it.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            So we built something different. The team we put together has experience across air freight, sea shipping, road haulage, customs brokerage, and warehousing. Not because we wanted to offer everything under the sun, but because these problems are connected and solving them properly means understanding all of them.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vectora now moves thousands of shipments each month to more than 150 destinations. Every one gets a unique <span className="font-mono text-slate-800">VLA-</span> tracking code, a dedicated contact, and the same attention whether you&apos;re a startup or a multinational.
          </p>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center text-white">
                <p className="text-4xl font-extrabold">{s.value}</p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wide opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">Our Mission</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Good freight handling shouldn&apos;t be something only large companies can afford. Transparent pricing, honest updates, and a contact who actually picks up the phone should be standard for everyone. That&apos;s what we&apos;re trying to deliver with every shipment we take on.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">Our Vision</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                We want shipping internationally to stop feeling complicated. The paperwork, the customs, the tracking gaps — these shouldn&apos;t be things businesses have to manage themselves. We&apos;re building toward a point where you hand it over and it just gets done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">How We Work</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">A Few Things We Take Seriously</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl border border-slate-100 bg-slate-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {v.icon}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image feature strip */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
        <Image
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600&q=70"
          alt="Vectora Logistics warehouse operations"
          fill
          className="object-cover opacity-25"
          sizes="100vw"
          unoptimized
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to Work with Vectora?</h2>
          <p className="mt-4 text-lg text-slate-300">
            Share your shipment details with Vectora Logistics and we&apos;ll return a clear quote and plan — no hard sell, just freight handled properly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/track" className="btn-primary">Track a Shipment</Link>
            <Link href="/#contact" className="btn-secondary border-white text-white hover:bg-white hover:text-slate-900">Get a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
