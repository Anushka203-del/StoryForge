"use client"

const BITES = [
  { q: "“We are all fragments of the same universe, stitched by memory.”", by: "A. Reyes" },
  { q: "“The vote crowned the villain—now the hero must adapt.”", by: "K. Morrow" },
  { q: "“Every fork is a promise: another world worth walking.”", by: "J. Adisa" },
]

export default function MiniBites() {
  return (
    <section className="relative bg-[#160e2b] py-14 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">Trending Mini Bites</h2>
          <a
            href="/feed"
            className="rounded-full border-2 border-white/20 px-4 py-1.5 text-sm text-white hover:border-white/40"
          >
            View feed
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {BITES.map((b, i) => (
            <article
              key={i}
              className="rounded-2xl border-2 border-white/10 bg-[#1b0f31]/70 p-5 shadow-[0_8px_32px_rgba(18,10,35,0.5)] ring-2 ring-white/10"
            >
              <p className="text-pretty text-sm leading-relaxed">{b.q}</p>
              <p className="mt-3 text-xs text-white/60">— {b.by}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
