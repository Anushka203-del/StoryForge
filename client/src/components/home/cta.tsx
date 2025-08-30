"use client"

import Link from "next/link"

export default function CTA() {
  return (
    <section className="relative bg-[#160e2b] py-16 text-white">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-pretty text-2xl font-semibold">Ready to co-author the next universe?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-white/75">
          Join readers and creators shaping living stories through votes, branches, and Mini Bites.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#ffb224] bg-[#ffb224] px-6 py-2.5 text-sm font-semibold text-[#120a23] shadow-[0_0_0_4px_rgba(255,178,36,0.18)]"
          >
            Create your account
          </Link>
          <Link
            href="/stories"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/20 px-6 py-2.5 text-sm text-white hover:border-white/40"
          >
            Explore stories
          </Link>
        </div>
      </div>
    </section>
  )
}
