"use client"

/**
 * Drives the header / hero / footer registration buttons. Google sign-in was
 * removed, so there is no per-user "already registered" state — the button
 * always reads "Register Now" and opens the modal, where the user chooses the
 * "New Registration" or "Already Registered?" tab to check their ticket.
 */
export function useRegistrationTicketCta() {
  function openRegistrationOrTicket() {
    window.dispatchEvent(new Event("cinopse:open-registration"))
  }

  return {
    label: "Register Now",
    openRegistrationOrTicket,
  }
}
