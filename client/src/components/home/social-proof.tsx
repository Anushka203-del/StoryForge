"use client"

export default function SocialProof() {
  const items = ["2M+ Votes Cast", "25k+ Chapters", "5k+ Creators"]
  return (
    <section className="bg-[#120a23] py-6 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-6">
        {items.map((t) => (
          <span
            key={t}
            className="rounded-full border-2 border-white/10 bg-[#1b0f31]/60 px-4 py-1.5 text-xs text-white/80 ring-2 ring-fuchsia-400/10"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}
