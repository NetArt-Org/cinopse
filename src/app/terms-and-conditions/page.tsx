import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { RegistrationFormModal } from "@/components/forms/registration-form-modal"
import { PolicyPageContent } from "@/components/sections/policy-page-content"
import { SiteFooter } from "@/components/sections/site-footer"
import {
  policyFooter,
  policyNavItems,
  policyRegistrationComparison,
  termsAndConditions,
} from "@/lib/policy-pages"

export const metadata: Metadata = {
  title: "Terms & Conditions — CINOPSE India 2026",
  description:
    "Terms and conditions for CINOPSE India 2026 website use, registration, payments, and participation.",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-dvh bg-[color:var(--cinopse-cream)] text-[color:var(--cinopse-text)]">
      <SiteHeader items={policyNavItems} />
      <RegistrationFormModal {...policyRegistrationComparison} />
      <PolicyPageContent policy={termsAndConditions} />
      <SiteFooter {...policyFooter} />
    </div>
  )
}
