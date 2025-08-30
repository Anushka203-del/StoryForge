import Hero from "@/components/home/hero"
import Features from "@/components/home/features"
import MiniBites from "@/components/home/minibites"
import HowItWorks from "@/components/home/how-it-works"
import CTA from "@/components/home/cta"

function CircleFeature({
  icon: Icon,
  label,
  color = "text-foreground",
}: {
  icon: any
  label: string
  color?: string
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="sf-circle h-20 w-20 flex items-center justify-center">
        <Icon className={`h-7 w-7 ${color}`} aria-hidden />
      </div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  )
}

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
