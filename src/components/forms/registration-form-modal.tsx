"use client"

import { RegistrationPriceComparison } from "@/components/sections/registration-price-comparison"

export type RegistrationFormModalProps = {
  audiences: string[]
  eventDateLabel: string
  eventDate: string
  windowStart: string
  note: string
  ctaLabel: string
}

export function RegistrationFormModal(props: RegistrationFormModalProps) {
  return <RegistrationPriceComparison {...props} dialogOnly />
}
