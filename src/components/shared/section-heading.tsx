export type SectionHeadingProps = {
  eyebrow: string
  title: string
  dark?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className="mx-auto flex max-w-2xl flex-col items-center text-center"
    >
      <span
        className={`eyebrow ${
          dark
            ? "text-[color:var(--cinopse-accent-soft)]"
            : "text-[color:var(--cinopse-secondary)]"
        }`}
      >
        <span className="gold-rule" />
        {eyebrow}
      </span>
      <h2
        className={`font-display mt-4 text-[clamp(24px,3.4vw,40px)] font-semibold tracking-[-0.01em] ${
          dark ? "text-white" : "text-[color:var(--cinopse-primary)]"
        }`}
      >
        {title}
      </h2>
    </div>
  )
}
