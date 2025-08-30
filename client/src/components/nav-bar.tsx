"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLocalAuth } from "@/hooks/use-local-auth"

export function NavBar() {
  const { user, logout } = useLocalAuth()

  return (
    <header className="border-b bg-[#120a23] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          StoryForge
        </Link>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/stories">Stories</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/feed">Mini Bites</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/studio">Creator Studio</Link>
          </Button>
          {user ? (
            <>
              <Button asChild variant="outline">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
