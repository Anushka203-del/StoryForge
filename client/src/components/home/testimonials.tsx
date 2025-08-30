const quotes = [
  {
    q: "The branching system is exactly what my serial needed.",
    a: "Indie Fantasy Author",
  },
  { q: "Readers actually feel ownership over the story.", a: "Lit Mag Editor" },
  { q: "Mini Bites doubled our weekly engagement.", a: "Community Lead" },
]

export function TestimonialsSection() {
  return (
    <section className="bg-[#0b1220]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">Loved by writers and readers</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {quotes.map((t, i) => (
            <figure key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <blockquote className="text-slate-200">“{t.q}”</blockquote>
              <figcaption className="mt-3 text-sm text-slate-400">— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
