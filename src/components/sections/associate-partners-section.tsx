export type AssociatePartnersSectionProps = {
  eyebrow: string
  title: string
  description: string
  partners: string[]
}

export function AssociatePartnersSection({
  eyebrow,
  title,
  description,
  partners,
}: AssociatePartnersSectionProps) {
  const marqueeItems = [...partners, ...partners]

  return (
    <section
      id="partners"
      className="overflow-hidden bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1160px] px-7">
        <div data-reveal className="text-center">
          <div className="inline-flex items-center justify-center gap-5">
            <span className="h-0.5 w-16 rounded-full bg-[color:var(--cinopse-accent)]" />
            <span className="text-[11px] leading-none font-semibold tracking-[0.35em] text-[color:var(--cinopse-accent-deep)] uppercase">
              {eyebrow}
            </span>
            <span className="h-0.5 w-16 rounded-full bg-[color:var(--cinopse-accent)]" />
          </div>
          <h2 className="font-display mt-5 text-[clamp(32px,4.6vw,46px)] leading-tight font-semibold tracking-[-0.02em] text-[color:var(--cinopse-ink)]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[clamp(16px,1.5vw,20px)] leading-8 font-light text-[color:var(--cinopse-text-secondary)]">
            {description}
          </p>
        </div>
      </div>

      <div
        data-reveal
        className="relative mt-14 overflow-hidden before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-24 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-24 after:bg-gradient-to-l after:from-white after:to-transparent md:before:w-32 md:after:w-32"
      >
        <div
          data-logo-track
          className="flex w-max gap-[22px] animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="grid h-[88px] w-[200px] shrink-0 place-items-center rounded-[14px] border border-[color:var(--cinopse-border)] bg-[color:var(--cinopse-cream)] px-5 text-center text-[11px] leading-none font-medium tracking-[0.16em] text-[color:var(--cinopse-faint)] uppercase transition-[transform,box-shadow,color] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-1 hover:text-[color:var(--cinopse-primary)] hover:shadow-[0_14px_28px_rgba(12,40,84,0.12)]"
              aria-hidden={index >= partners.length ? "true" : undefined}
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
