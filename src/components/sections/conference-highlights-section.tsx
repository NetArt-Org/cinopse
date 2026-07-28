export type ConferenceHighlight = {
  number: string
  title: string
  description: string
}

export type ConferenceHighlightsSectionProps = {
  eyebrow: string
  title: string
  description: string
  highlights: ConferenceHighlight[]
  focusLabel: string
  focusAreas: string[]
}

export function ConferenceHighlightsSection({
  eyebrow,
  title,
  description,
  highlights,
  focusLabel,
  focusAreas,
}: ConferenceHighlightsSectionProps) {
  return (
    <section
      id="highlights"
      className="relative overflow-hidden bg-[image:var(--cinopse-gradient-blue)] py-24 text-white lg:py-28"
    >
      <div className="absolute -bottom-64 -left-52 size-[560px] rounded-full bg-[color:var(--cinopse-accent)]/12 blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-[1160px] px-7">
        <div className="mx-auto max-w-2xl text-center">
          <div
            data-reveal
            className="flex items-center justify-center gap-4"
          >
            <span className="h-0.5 w-12 rounded-full bg-[color:var(--cinopse-accent)]" />
            <p className="text-[11px] font-medium tracking-[0.22em] text-[color:var(--cinopse-accent)] uppercase">
              {eyebrow}
            </p>
            <span className="h-0.5 w-12 rounded-full bg-[color:var(--cinopse-accent)]" />
          </div>
          <h2
            data-reveal
            className="font-display mt-5 text-[clamp(32px,4.6vw,46px)] leading-[1.12] font-semibold tracking-[-0.01em]"
          >
            {title}
          </h2>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-xl text-[15px] leading-8 text-white/65"
          >
            {description}
          </p>
        </div>

        <div className="relative z-10 mt-14 grid gap-3.5 min-[560px]:grid-cols-2 min-[900px]:grid-cols-3">
          {highlights.map((highlight, index) => (
            <article
              key={highlight.number}
              data-reveal
              className={`flex items-center gap-4 rounded-[14px] border border-white/12 bg-white/[0.07] px-5 py-[18px] backdrop-blur-md transition-[transform,background,border-color] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-1.5 hover:border-[color:var(--cinopse-accent)]/50 hover:bg-white/[0.13] ${
                index % 2 === 0 ? "delay-75" : "delay-150"
              }`}
            >
              <span className="grid size-[34px] shrink-0 place-items-center rounded-full border border-[color:var(--cinopse-accent)]/45 bg-[color:var(--cinopse-accent)]/14 font-mono text-[11px] font-semibold text-[color:var(--cinopse-accent)]">
                {highlight.number}
              </span>
              <div>
                <h3 className="text-[14px] leading-snug font-medium text-white">
                  {highlight.title}
                </h3>
                <p className="mt-1 text-[11.5px] leading-normal font-light text-white/60">
                  {highlight.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          data-reveal
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <p className="shrink-0 text-[10.5px] font-medium tracking-[0.22em] text-[color:var(--cinopse-accent)] uppercase">
            {focusLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/20 px-4 py-2 text-[11px] leading-none text-white/80 transition-[transform,background,color] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:bg-[color:var(--cinopse-accent)] hover:text-[color:var(--cinopse-primary-deep)]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
