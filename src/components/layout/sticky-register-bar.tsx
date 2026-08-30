"use client"

import { useRegistrationTicketCta } from "@/hooks/use-registration-ticket-cta"

/**
 * Mobile-only fixed CTA pinned to the bottom of the viewport. Always visible
 * while scrolling for quick access; opens the same registration / ticket modal
 * as the header button. Sits below the nav drawer (z-60) and modal (z-9999).
 */
export function StickyRegisterBar() {
  const { label, openRegistrationOrTicket } = useRegistrationTicketCta()

  return (
    <div className="fixed inset-x-0 bottom-0 z-[50] md:hidden">
      <div className="bg-transparent px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={openRegistrationOrTicket}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--cinopse-accent)] px-6 py-3.5 text-[13.5px] leading-none font-semibold text-[color:var(--cinopse-primary-deep)] shadow-[0_8px_22px_rgba(217,164,65,0.4)] transition-[transform,background] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] active:translate-y-px"
        >
          {label}
          <span
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </button>
      </div>
    </div>
  )
}
