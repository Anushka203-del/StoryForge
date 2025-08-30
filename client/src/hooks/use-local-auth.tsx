"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type LocalUser = {
  id: string
  email: string
  username?: string
}

type AuthContextType = {
  user: LocalUser | null
  signup: (params: { email: string; password: string; username?: string }) => Promise<void>
  login: (params: { email: string; password: string }) => Promise<void>
  logout: () => void
}

const KEY = "sf_user_v1"
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function LocalAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalUser | null>(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {}
  }, [])

  const signup: AuthContextType["signup"] = async ({ email, password, username }) => {
    if (!email || !password) throw new Error("Email and password are required")
    const newUser: LocalUser = { id: crypto.randomUUID(), email, username }
    window.localStorage.setItem(KEY, JSON.stringify(newUser))
    setUser(newUser)
  }

  const login: AuthContextType["login"] = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email and password are required")
    const existingRaw = window.localStorage.getItem(KEY)
    const existing = existingRaw ? (JSON.parse(existingRaw) as LocalUser) : undefined
    const next = existing ?? { id: crypto.randomUUID(), email }
    window.localStorage.setItem(KEY, JSON.stringify(next))
    setUser(next)
  }

  const logout = () => {
    window.localStorage.removeItem(KEY)
    setUser(null)
  }

  const value = useMemo(() => ({ user, signup, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useLocalAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useLocalAuth must be used within LocalAuthProvider")
  return ctx
}
