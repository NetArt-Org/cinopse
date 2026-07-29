"use client"

import { useEffect, useState } from "react"

import type { GoogleProfile } from "@/lib/firebase-client"

export function useGoogleAuthUser() {
  const [user, setUser] = useState<GoogleProfile | null>(null)

  useEffect(() => {
    let mounted = true
    let unsubscribe: (() => void) | null = null

    void import("@/lib/firebase-client").then(({ observeGoogleUser }) => {
      if (!mounted) return
      unsubscribe = observeGoogleUser((profile) => {
        if (mounted) setUser(profile)
      })
    })

    return () => {
      mounted = false
      unsubscribe?.()
    }
  }, [])

  return user
}
