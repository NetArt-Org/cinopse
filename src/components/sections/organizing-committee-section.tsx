export type CommitteeLeader = {
  initials: string
  name: string
  role: string
  affiliation: string
  message?: string
}

export type CommitteeMember = {
  initials: string
  name: string
  caption: string
  variant?: "standard" | "logistics"
  names?: string[]
}

export type OrganizingCommitteeSectionProps = {
  eyebrow: string
  title: string
  description: string
  leaders: CommitteeLeader[]
  members: CommitteeMember[]
}

export function OrganizingCommitteeSection({
  eyebrow,
  title,
  description,
  leaders,
  members,
}: OrganizingCommitteeSectionProps) {
  const committeeItems = [
    ...leaders.map((leader) => ({
      initials: leader.initials,
      name: leader.name,
      caption: `${leader.role} · ${leader.affiliation}`,
      variant: "standard" as const,
    })),
    ...members.filter((member) => member.variant !== "logistics"),
  ]
  const logistics = members.find((member) => member.variant === "logistics")

  return (
    <section
      id="leadership"
      className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24"
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
        </div>
        <p
          data-reveal
          className="mx-auto mt-5 max-w-xl text-center text-[clamp(16px,1.4vw,18px)] leading-8 text-[color:var(--cinopse-text-secondary)]"
        >
          {description}
        </p>

        <div
          data-reveal-group
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {committeeItems.map((member) => (
            <article
              key={member.name}
              data-reveal
              className="flex min-h-[178px] flex-col items-center justify-center rounded-[18px] bg-[color:var(--cinopse-cream)] px-8 py-7 text-center transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(12,40,84,0.12)]"
            >
              <div className="grid size-16 shrink-0 place-items-center rounded-full bg-[image:var(--cinopse-gradient-reference-blue)] font-display text-[22px] leading-none font-semibold text-[color:var(--cinopse-accent)]">
                {member.initials}
              </div>
              <div className="mt-4 min-w-0">
                <h3 className="text-[19px] leading-[1.3] font-medium text-[color:var(--cinopse-ink)]">
                  {member.name}
                </h3>
                <p className="mt-2 text-[11px] leading-[1.55] font-normal tracking-[0.12em] text-[color:var(--cinopse-accent-deep)] uppercase">
                  {member.caption}
                </p>
              </div>
            </article>
          ))}
        </div>

        {logistics ? (
          <div
            data-reveal
            className="mt-8"
          >
            <h3 className="text-center text-[13px] leading-none font-semibold tracking-[0.18em] text-[color:var(--cinopse-accent-deep)] uppercase">
              Hospitality & Logistics
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(logistics.names ?? []).map((name) => (
                <article
                  key={name}
                  className="flex min-h-[104px] flex-col items-center justify-center rounded-[16px] bg-[color:var(--cinopse-cream)] px-5 py-5 text-center transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(12,40,84,0.10)]"
                >
                  <div className="grid size-10 place-items-center rounded-full bg-[image:var(--cinopse-gradient-reference-blue)] text-[color:var(--cinopse-accent)]">
                    ✣
                  </div>
                  <p className="mt-3 text-[16px] leading-tight font-medium text-[color:var(--cinopse-ink)]">
                    {name}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
