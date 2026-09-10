import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { RegistrationFormModal } from "@/components/forms/registration-form-modal"
import { PolicyPageContent } from "@/components/sections/policy-page-content"
import { SiteFooter } from "@/components/sections/site-footer"
import {
  policyFooter,
  policyNavItems,
  policyRegistrationComparison,
  refundPolicy,
} from "@/lib/policy-pages"

export const metadata: Metadata = {
  title: "Refund Policy — Cinopse India Medical Summit Pvt Ltd",
  description:
    "Refund policy for Cinopse India Medical Summit Pvt Ltd registration payments and coupon-based registrations.",
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-dvh bg-[color:var(--cinopse-cream)] text-[color:var(--cinopse-text)]">
      <SiteHeader items={policyNavItems} />
      <RegistrationFormModal {...policyRegistrationComparison} />
      <PolicyPageContent policy={refundPolicy} />
      <SiteFooter {...policyFooter} />
    </div>
  )
}
