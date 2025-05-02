"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { authClient } from "@/lib/auth-client"

export function AdminNavEntry() {
  const {
    data: session,
    isPending,
  } = authClient.useSession()

  if (isPending) return null

  const user = session?.user as { role?: string }

  if (user?.role !== "admin") return null

  return (
    <Link href="/admin">
      <Button variant="ghost">Admin</Button>
    </Link>
  )
}
