import type { Metadata } from "next"

import { RegistrationFormModal } from "@/components/forms/registration-form-modal"
import { GsapProvider } from "@/components/layout/gsap-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { AgendaPageContent } from "@/components/sections/agenda-page-content"
import { SiteFooter } from "@/components/sections/site-footer"
import {
  policyFooter,
  policyNavItems,
  policyRegistrationComparison,
} from "@/lib/policy-pages"

export const metadata: Metadata = {
  title: "Full Agenda — CINOPSE India 2026",
  description:
    "Official agenda PDF for CINOPSE India 2026 at Jawaharlal Nehru Planetarium, Bengaluru.",
}

export default function AgendaPage() {
  return (
    <div className="min-h-dvh bg-white text-[color:var(--cinopse-text)]">
      <SiteHeader items={policyNavItems} />
      <GsapProvider>
        <AgendaPageContent />
        <SiteFooter {...policyFooter} />
        <RegistrationFormModal {...policyRegistrationComparison} />
      </GsapProvider>
    </div>
  )
}
