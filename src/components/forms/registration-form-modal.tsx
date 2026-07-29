"use client"

import {
  RegistrationPriceComparison,
  type RegistrationPhase,
} from "@/components/sections/registration-price-comparison"

export type RegistrationFormModalProps = {
  audiences: string[]
  eventDateLabel: string
  eventDate: string
  windowStart: string
  phases: RegistrationPhase[]
  note: string
  ctaLabel: string
}

export function RegistrationFormModal(props: RegistrationFormModalProps) {
  return <RegistrationPriceComparison {...props} dialogOnly />
}
