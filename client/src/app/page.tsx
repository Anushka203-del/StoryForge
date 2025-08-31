import Hero from "@/components/home/hero"
import Features from "@/components/home/features"
import MiniBites from "@/components/home/minibites"
import HowItWorks from "@/components/home/how-it-works"
import CTA from "@/components/home/cta"



export default function HomePage() {
  return (
    <main className="font-sans">
      <Hero />
      <Features />
      <MiniBites />
      <HowItWorks />
      <CTA />
    </main>
  )
}
