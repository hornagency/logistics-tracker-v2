"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    title: "Air freight",
    subtitle:
      "Export and import air cargo with booking, documentation, and handovers coordinated for each leg. Status updates appear on your shipment as we log them.",
    ctaPrimary: "Track a shipment",
    ctaPrimaryHref: "/track",
    ctaSecondary: "Services",
    ctaSecondaryHref: "/#services",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80",
    alt: "Cargo plane on airport tarmac at dusk",
  },
  {
    title: "Ocean freight",
    subtitle:
      "Full containers or shared space, port to port, with customs paperwork and milestones tracked through the voyage.",
    ctaPrimary: "Get a quote",
    ctaPrimaryHref: "/#contact",
    ctaSecondary: "Services",
    ctaSecondaryHref: "/#services",
    image: "https://images.unsplash.com/photo-1760165385839-a87ebb370ab5?w=1600&q=80",
    alt: "Large container ship being loaded at a busy port",
  },
  {
    title: "Track your shipment",
    subtitle:
      "Each booking gets a VLA code. Enter it on Track and Trace to see current status without signing in.",
    ctaPrimary: "Track your shipment",
    ctaPrimaryHref: "/track",
    ctaSecondary: "About us",
    ctaSecondaryHref: "/about",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80",
    alt: "Busy logistics warehouse with forklifts and shelving",
  },
];

const ROTATE_MS = 6000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[index];

  return (
    <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: i === index ? 1 : 0,
            zIndex: i === index ? 2 : 0,
            pointerEvents: i === index ? "auto" : "none",
          }}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent" />
        </div>
      ))}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 text-white">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {slide.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-slate-200">
          {slide.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href={slide.ctaPrimaryHref} className="btn-primary">
            {slide.ctaPrimary}
          </Link>
          <Link
            href={slide.ctaSecondaryHref}
            className="btn-secondary border-white text-white hover:bg-white hover:text-slate-900"
          >
            {slide.ctaSecondary}
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
