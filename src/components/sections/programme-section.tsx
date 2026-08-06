export type ProgrammeItem = {
  time: string
  period: string
  title: string
  description: string
  tags?: string[]
}

export type ProgrammeSectionProps = {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  note?: string
}

export function ProgrammeSection({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: ProgrammeSectionProps) {
  return (
    <section
      id="programme"
      className="bg-[color:var(--cinopse-cream)] py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1160px] px-7">
        <div data-reveal>
          <div className="inline-flex items-center gap-5">
            <span className="h-0.5 w-16 rounded-full bg-[color:var(--cinopse-accent)]" />
            <span className="text-[11px] leading-none font-semibold tracking-[0.35em] text-[color:var(--cinopse-accent-deep)] uppercase">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-display mt-6 max-w-4xl text-[clamp(32px,4.6vw,46px)] leading-tight font-semibold tracking-[-0.02em] text-[color:var(--cinopse-ink)]">
            {title}
          </h2>
          <p className="mt-6 max-w-[650px] text-[clamp(16px,1.5vw,20px)] leading-9 font-light text-[color:var(--cinopse-text-secondary)]">
            {description}
          </p>
        </div>

        <div data-reveal className="mt-8 text-left">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--cinopse-primary)] px-7 py-4 text-[12.5px] leading-none font-medium text-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(27,75,150,0.35)]"
          >
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
