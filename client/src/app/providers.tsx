"use client"

import type React from "react"
import { LocalAuthProvider } from "@/hooks/use-local-auth"

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return <LocalAuthProvider>{children}</LocalAuthProvider>
}
