import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { RegistrationFormModal } from "@/components/forms/registration-form-modal"
import { PolicyPageContent } from "@/components/sections/policy-page-content"
import { SiteFooter } from "@/components/sections/site-footer"
import {
  policyFooter,
  policyNavItems,
  policyRegistrationComparison,
  privacyPolicy,
} from "@/lib/policy-pages"

export const metadata: Metadata = {
  title: "Privacy Policy — CINOPSE India 2026",
  description:
    "Privacy policy for CINOPSE India 2026 registrations, payments, and website use.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-dvh bg-[color:var(--cinopse-cream)] text-[color:var(--cinopse-text)]">
      <SiteHeader items={policyNavItems} />
      <RegistrationFormModal {...policyRegistrationComparison} />
      <PolicyPageContent policy={privacyPolicy} />
      <SiteFooter {...policyFooter} />
    </div>
  )
}
