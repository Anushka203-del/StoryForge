import type React from "react"
import { Montserrat, Inter } from "next/font/google"

const heading = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
})

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-body",
})

export default function FontProvider({ children }: { children: React.ReactNode }) {
  return <div className={`${heading.variable} ${body.variable} antialiased font-sans`}>{children}</div>
}
