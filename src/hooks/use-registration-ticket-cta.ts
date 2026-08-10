"use client"

import { useEffect, useState } from "react"

import { useGoogleAuthUser } from "@/hooks/use-google-auth-user"

const registrationEmailStorageKey = "cinopse:registration-email"

export function useRegistrationTicketCta() {
  const googleUser = useGoogleAuthUser()
  const [hasRegistration, setHasRegistration] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function checkExistingRegistration() {
      if (!googleUser) {
        setHasRegistration(false)
        return
      }

      try {
        const registrationEmail = window.localStorage
          .getItem(registrationEmailStorageKey)
          ?.trim()

        if (!registrationEmail) {
          setHasRegistration(false)
          return
        }

        const { getFirebaseIdToken } = await import("@/lib/firebase-client")
        const idToken = await getFirebaseIdToken()
        const response = await fetch(
          `/api/registrations?email=${encodeURIComponent(registrationEmail)}`,
          {
            headers: { Authorization: `Bearer ${idToken}` },
          },
        )
        const payload = (await response.json()) as {
          registration?: { name?: string } | null
        }

        if (!cancelled) {
          setHasRegistration(response.ok && Boolean(payload.registration?.name))
        }
      } catch {
        if (!cancelled) setHasRegistration(false)
      }
    }

    void checkExistingRegistration()
    window.addEventListener("cinopse:registration-updated", checkExistingRegistration)

    return () => {
      cancelled = true
      window.removeEventListener("cinopse:registration-updated", checkExistingRegistration)
    }
  }, [googleUser])

  function openRegistrationOrTicket() {
    window.dispatchEvent(
      new Event(hasRegistration ? "cinopse:view-ticket" : "cinopse:open-registration"),
    )
  }

  return {
    googleUser,
    hasRegistration,
    label: googleUser && hasRegistration ? "View Ticket" : "Register Now",
    openRegistrationOrTicket,
  }
}
