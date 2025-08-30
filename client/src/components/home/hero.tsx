"use client"

import Link from "next/link"
import { Wand2, Star } from "lucide-react"

function OrbStack() {
  return (
    <div className="relative mx-auto h-64 w-full max-w-md md:h-[420px]" aria-hidden>
      {/* base glass panel */}
      <div className="absolute inset-0 rounded-3xl ring-2 ring-white/10 bg-[#1b0f31]/50" />
      {/* concentric outlined circles */}
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/15 ring-4 ring-fuchsia-400/10 md:h-64 md:w-64" />
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2563eb]/40" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20 bg-[#120a23]/70 shadow-[0_10px_60px_rgba(37,99,235,0.25)]" />
      {/* floating sparkles */}
      <Wand2 className="absolute left-6 top-6 h-5 w-5 text-[#2563eb]" />
      <Star className="absolute right-8 top-10 h-4 w-4 text-[#f59e0b]" />
      <Star className="absolute left-10 bottom-8 h-3.5 w-3.5 text-[#2563eb]/80" />
      <Star className="absolute right-12 bottom-12 h-3.5 w-3.5 text-white/70" />
      {/* tiny glow dots */}
      <span className="absolute left-1/4 top-1/3 h-2 w-2 rounded-full bg-[#2563eb]/70 blur-[1px]" />
      <span className="absolute right-1/4 top-1/4 h-2 w-2 rounded-full bg-[#f59e0b]/80 blur-[1px]" />
      <span className="absolute right-1/3 bottom-1/4 h-[6px] w-[6px] rounded-full bg-white/80 blur-[1px]" />
      {/* monogram center for brand without images */}
      <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/20 bg-[#0b1220] text-white shadow-[0_8px_24px_rgba(255,255,255,0.08)]">
        <span className="text-lg font-semibold tracking-wider">SF</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section aria-label="StoryForge Hero" className="relative overflow-hidden bg-[#120a23] text-white">
      {/* Decorative solid waves (no gradients) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#2a1746] opacity-60 blur-2xl" />
        <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-[#1b0f31] opacity-70 blur-2xl" />
      </div>

      <div className="mx-auto text-center flex max-w-6xl flex-col items-center gap-8 px-6 pb-16 pt-20 md:flex-row md:items-center md:justify-center md:gap-12 md:pb-24 md:pt-28">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-[#1b0f31]/60 px-3 py-1 text-xs text-fuchsia-200/90 ring-1 ring-fuchsia-400/20">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
            Creative AI Storytelling
          </div>

          <h1 className="text-pretty text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Forge worlds with AI, <span className="text-[#ffb224]">shape destiny</span> together
          </h1>
          <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
            StoryForge blends generative creativity with human imagination. Vote on chapters, explore branching
            universes, and make reading truly interactive.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row  justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#ffb224] bg-[#ffb224] px-5 py-2.5 text-sm font-semibold text-[#120a23] shadow-[0_0_0_3px_rgba(255,178,36,0.2)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb224]"
            >
              Start your saga
            </Link>
            <Link
              href="/feed"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Browse Mini Bites
            </Link>
          </div>

          <dl className=" mx-auto mt-8 grid grid-cols-3 gap-4 text-center md:max-w-md">
            {[
              { k: "Universes", v: "∞" },
              { k: "Chapters", v: "25k+" },
              { k: "Votes", v: "2.1M" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-white/10 bg-[#1b0f31]/50 p-3 ring-1 ring-white/10">
                <dt className="text-[11px] uppercase tracking-wide text-white/60">{s.k}</dt>
                <dd className="mt-1 text-lg font-semibold text-white">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>


      </div>
    </section>
  )
}
