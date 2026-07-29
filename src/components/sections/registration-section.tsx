import { RegistrationPriceComparison } from "@/components/sections/registration-price-comparison"
import type { RegistrationPriceComparisonProps } from "@/components/sections/registration-price-comparison"
import { RegistrationFormModal } from "@/components/forms/registration-form-modal"

export type RegistrationSectionProps = {
  eyebrow: string
  title: string
  description: string
  comparison: RegistrationPriceComparisonProps
}

export function RegistrationSection({
  eyebrow,
  title,
  description,
  comparison,
}: RegistrationSectionProps) {
  return (
    <section
      id="registration"
      className="relative overflow-hidden bg-[image:var(--cinopse-gradient-reference-blue)] py-16 md:py-20 lg:py-24"
    >
      <div
        data-registration-orb
        className="absolute -top-52 -right-52 size-[600px] rounded-full bg-[rgba(29,90,180,0.5)] blur-[90px] animate-[floatB_18s_ease-in-out_infinite]"
      />
      <div className="relative z-10 mx-auto max-w-[1160px] px-7">
        <div data-reveal className="mb-[26px] text-center">
          <div className="inline-flex items-center justify-center gap-5">
            <span className="h-0.5 w-16 rounded-full bg-[color:var(--cinopse-accent)]" />
            <span className="text-[11px] leading-none font-semibold tracking-[0.35em] text-[color:var(--cinopse-accent)] uppercase">
              {eyebrow}
            </span>
            <span className="h-0.5 w-16 rounded-full bg-[color:var(--cinopse-accent)]" />
          </div>
          <h2 className="font-display mt-5 mb-2 text-[clamp(32px,4.6vw,46px)] leading-tight font-semibold tracking-[-0.02em] text-white">
            {title}
          </h2>
          <p className="m-0 text-[12.5px] leading-5 font-light text-white/60">
            {description}
          </p>
        </div>
        <RegistrationPriceComparison {...comparison} />
        <RegistrationFormModal {...comparison} />
      </div>
    </section>
  )
}
