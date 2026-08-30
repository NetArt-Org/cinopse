export type ProgrammeItem = {
  time: string
  period: string
  title: string
  description: string
  tags?: string[]
}

export type ProgrammeSegment = {
  segment: string
  focus: string
}

export type ProgrammeSectionProps = {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  note?: string
  segments?: ProgrammeSegment[]
}

export function ProgrammeSection({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  segments,
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

        {segments?.length ? (
          <div
            data-reveal
            className="mt-12 overflow-x-auto rounded-2xl border border-[color:var(--cinopse-border)] bg-white shadow-[0_16px_40px_rgba(6,26,58,0.1)]"
          >
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Programme at a glance — segments and their focus areas
              </caption>
              <thead>
                <tr className="bg-[color:var(--cinopse-primary)] text-white">
                  <th
                    scope="col"
                    className="w-[36%] border-r border-white/20 px-6 py-4 text-[11px] leading-none font-semibold tracking-[0.14em] uppercase"
                  >
                    Segment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-[11px] leading-none font-semibold tracking-[0.14em] uppercase"
                  >
                    Focus
                  </th>
                </tr>
              </thead>
              <tbody>
                {segments.map((row, index) => (
                  <tr
                    key={row.segment}
                    className={
                      index % 2 === 1
                        ? "bg-[color:var(--cinopse-cream)]"
                        : "bg-white"
                    }
                  >
                    <th
                      scope="row"
                      className="border-t border-r border-[color:var(--cinopse-border)] px-6 py-4 text-left align-top font-display text-[14px] leading-6 font-semibold text-[color:var(--cinopse-primary)]"
                    >
                      {row.segment}
                    </th>
                    <td className="border-t border-[color:var(--cinopse-border)] px-6 py-4 align-top text-[13px] leading-6 font-light text-[color:var(--cinopse-text-secondary)]">
                      {row.focus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div data-reveal className="mt-10 text-left">
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
