"use client"

const STEPS = [
  { n: 1, t: "Spark", d: "Prompt StoryForge or start with your idea." },
  { n: 2, t: "Compose", d: "Build modular blocks in Creator Studio." },
  { n: 3, t: "Vote", d: "Publish chapters; the community decides." },
  { n: 4, t: "Branch", d: "Fork alternates into parallel universes." },
]

export default function HowItWorks() {
  return (
    <section className="relative bg-[#120a23] py-14 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-balance text-center text-2xl font-semibold">How StoryForge works</h2>

        <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className="relative rounded-2xl border-2 border-white/10 bg-[#1b0f31]/60 p-5 ring-2 ring-[#ff4d9a]/10"
            >
              {/* connecting outline for large screens */}
              {i < STEPS.length - 1 && (
                <div className="pointer-events-none absolute right-[-14px] top-1/2 hidden h-0.5 w-7 -translate-y-1/2 bg-white/15 md:block" />
              )}
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#ffb224] bg-[#120a23] text-sm font-bold text-[#ffb224]">
                  {s.n}
                </div>
                <h3 className="text-base font-semibold">{s.t}</h3>
              </div>
              <p className="mt-2 text-sm text-white/70">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
