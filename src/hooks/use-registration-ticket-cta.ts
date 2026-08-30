"use client"

import { useEffect, useState } from "react"

const registrationEmailStorageKey = "cinopse:registration-email"

/**
 * Drives the header / footer registration button. Google sign-in has been
 * removed, so "already registered" is inferred from a locally-saved email
 * (set once someone completes or looks up a registration on this device).
 * The ticket view re-verifies against the public API when opened.
 */
export function useRegistrationTicketCta() {
  const [hasRegistration, setHasRegistration] = useState(false)

  useEffect(() => {
    const syncRegistration = () => {
      try {
        const savedEmail = window.localStorage
          .getItem(registrationEmailStorageKey)
          ?.trim()
        setHasRegistration(Boolean(savedEmail))
      } catch {
        setHasRegistration(false)
      }
    }

    syncRegistration()
    window.addEventListener("cinopse:registration-updated", syncRegistration)
    window.addEventListener("storage", syncRegistration)

    return () => {
      window.removeEventListener("cinopse:registration-updated", syncRegistration)
      window.removeEventListener("storage", syncRegistration)
    }
  }, [])

  function openRegistrationOrTicket() {
    window.dispatchEvent(
      new Event(hasRegistration ? "cinopse:view-ticket" : "cinopse:open-registration"),
    )
  }

  return {
    hasRegistration,
    label: hasRegistration ? "View Ticket" : "Register Now",
    openRegistrationOrTicket,
  }
}
