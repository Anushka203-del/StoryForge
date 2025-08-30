"use client"

const FEATURES = [
  { title: "Democratic Voting", desc: "Readers vote on author chapters to steer canon.", icon: "🗳️" },
  { title: "Multi‑Universe", desc: "Alternate chapters branch into parallel timelines.", icon: "🪐" },
  { title: "Mini Bites", desc: "Share short highlights and favorite quotes.", icon: "✨" },
  { title: "Creator Studio", desc: "Assemble modular blocks; optional AI assists.", icon: "🧩" },
]

export default function Features() {
  return (
    <section className="relative bg-[#160e2b] py-14 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-balance text-center text-2xl font-semibold">Tools that make stories magical</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-white/70">
          Outlined, tangible actions that invite participation and creativity.
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <li
              key={f.title}
              className="group rounded-2xl border-2 border-white/10 bg-[#1b0f31]/60 p-5 shadow-[0_10px_40px_rgba(18,10,35,0.5)] ring-2 ring-fuchsia-400/10 transition-transform hover:-translate-y-0.5"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-white/20 bg-[#120a23] ring-4 ring-fuchsia-400/10">
                <span aria-hidden className="text-xl">
                  {f.icon}
                </span>
                <span className="sr-only">{f.title} icon</span>
              </div>
              <h3 className="mt-4 text-center text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-center text-sm text-white/70">{f.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
