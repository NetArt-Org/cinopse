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
  dayLabel: string
  dateLabel: string
  items: ProgrammeItem[]
  ctaLabel: string
  ctaHref: string
  note: string
}

export function ProgrammeSection({
  eyebrow,
  title,
  description,
  dayLabel,
  dateLabel,
  items,
  ctaLabel,
  ctaHref,
  note,
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

        <div data-reveal className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-[14px] border border-transparent bg-[image:var(--cinopse-gradient-reference-blue)] px-8 py-3 text-left shadow-[0_12px_26px_rgba(12,40,84,0.28)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5"
          >
            <b className="font-display block text-[14.5px] leading-5 font-semibold text-[color:var(--cinopse-accent)]">
              {dayLabel}
            </b>
            <i className="mt-1 block text-[10.5px] leading-none font-light text-white/75 not-italic">
              {dateLabel}
            </i>
          </button>
        </div>

        <div
          data-reveal
          className="relative mt-11 mb-9 flex flex-col gap-3.5 before:absolute before:top-3.5 before:bottom-3.5 before:left-[79px] before:w-0.5 before:rounded before:bg-[rgba(27,75,150,0.14)] sm:before:left-[129px]"
        >
          {items.map((item) => (
            <article
              key={`${item.time}-${item.title}`}
              className="group relative grid grid-cols-[64px_34px_1fr] items-start sm:grid-cols-[100px_60px_1fr]"
            >
              <div className="pt-3.5 text-right font-display text-[13px] leading-none font-semibold text-[color:var(--cinopse-primary)] tabular-nums sm:text-[17px]">
                {item.time}
                <span className="ml-1 font-sans text-[9px] leading-none font-medium tracking-[0.1em] text-[color:var(--cinopse-muted)]">
                  {item.period}
                </span>
              </div>
              <div className="relative z-10 mt-5 ml-1 size-3 rounded-full border-[3px] border-[color:var(--cinopse-accent)] bg-white shadow-[0_0_0_4px_rgba(217,164,65,0.15)] transition-transform duration-300 ease-[cubic-bezier(.22,.9,.18,1)] group-hover:scale-125" />
              <div className="rounded-[14px] bg-white px-[22px] py-[18px] shadow-[0_6px_20px_rgba(12,40,84,0.07)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] group-hover:translate-x-2 group-hover:shadow-[0_16px_34px_rgba(12,40,84,0.13)]">
                <h3 className="font-display m-0 mb-1 text-base leading-5 font-semibold text-[color:var(--cinopse-primary)]">
                  {item.title}
                </h3>
                <p className="m-0 text-xs leading-5 font-light text-[color:var(--cinopse-text-secondary)]">
                  {item.description}
                </p>
                {item.tags?.length ? (
                  <div className="mt-2.5 flex gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="grid size-6 place-items-center rounded-full border border-[rgba(217,164,65,0.5)] bg-[rgba(217,164,65,0.14)] font-mono text-[9px] leading-none font-semibold text-[color:var(--cinopse-accent-deep)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div data-reveal className="text-center">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--cinopse-primary)] px-7 py-4 text-[12.5px] leading-none font-medium text-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(27,75,150,0.35)]"
          >
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
          <p className="mt-3.5 text-[10.5px] leading-5 font-light text-[color:var(--cinopse-faint)]">
            {note}
          </p>
        </div>
      </div>
    </section>
  )
}
