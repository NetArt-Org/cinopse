"use client"

import { useState } from "react"

type CommitteeCard = {
  initials: string
  name: string
  role: string
  affiliation: string
  message: string
}

export type AssociatePartnersSectionProps = {
  eyebrow: string
  title: string
  description: string
  committee: CommitteeCard[]
}

export function AssociatePartnersSection({
  eyebrow,
  title,
  description,
  committee,
}: AssociatePartnersSectionProps) {
  const [expandedCard, setExpandedCard] = useState("")

  return (
    <section
      id="partners"
      className="bg-white py-16 md:py-20 lg:py-24"
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

        <div
          data-reveal-group
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {committee.map((member) => {
            const messageParagraphs =
              member.message.split(/\n{2,}/).filter(Boolean)
            const isExpanded = expandedCard === member.name

            return (
              <article
                key={member.name}
                tabIndex={0}
                data-reveal="scale"
                className="group/associate relative outline-none [perspective:1400px]"
                onMouseLeave={() =>
                  setExpandedCard((current) =>
                    current === member.name ? "" : current,
                  )
                }
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setExpandedCard((current) =>
                      current === member.name ? "" : current,
                    )
                  }
                }}
              >
                <div className="relative h-[430px] transition-transform duration-[850ms] ease-[cubic-bezier(.22,.9,.18,1)] [transform-style:preserve-3d] group-hover/associate:[transform:rotateY(180deg)] group-focus-within/associate:[transform:rotateY(180deg)] sm:h-[450px] lg:h-[460px]">
                  <div className="absolute inset-0 flex flex-col items-center overflow-hidden rounded-[18px] bg-[color:var(--cinopse-cream)] px-6 pt-9 pb-[22px] text-center shadow-[0_8px_24px_rgba(12,40,84,0.08)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[image:linear-gradient(90deg,var(--cinopse-accent),var(--cinopse-accent-hi))]">
                    <div className="relative mt-0 grid size-[104px] place-items-center rounded-full bg-[image:var(--cinopse-gradient-reference-blue)] font-display text-[32px] leading-none font-semibold text-[color:var(--cinopse-accent)] shadow-[0_10px_26px_rgba(12,40,84,0.28)] transition-transform duration-500 ease-[cubic-bezier(.22,.9,.18,1)] after:absolute after:-inset-1.5 after:rounded-full after:border-[1.5px] after:border-dashed after:border-[rgba(27,75,150,0.3)] after:animate-[spinSlow_24s_linear_infinite] group-hover/associate:scale-[1.06] group-hover/associate:rotate-3">
                      {member.initials}
                    </div>
                    <h3 className="font-display mt-6 text-lg leading-tight font-semibold text-[color:var(--cinopse-primary)]">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-5 font-medium tracking-[0.1em] text-[color:var(--cinopse-accent-deep)] uppercase">
                      {member.role}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-5 text-[color:var(--cinopse-muted)]">
                      {member.affiliation}
                    </p>
                    <p className="mt-auto pt-4 text-[9.5px] leading-none tracking-[0.14em] text-[color:var(--cinopse-faint)] uppercase">
                      Hover to read their message
                    </p>
                  </div>

                  <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[18px] bg-[image:var(--cinopse-gradient-reference-blue)] px-6 py-6 text-left text-white shadow-[0_20px_44px_rgba(12,40,84,0.30)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="font-display text-[34px] font-bold leading-[0.45] text-[color:var(--cinopse-accent)]">
                      “
                    </span>
                    <div
                      className={`mt-0.5 text-[10.8px] leading-[1.55] font-light text-white/90 ${
                        isExpanded
                          ? "max-h-[286px] overflow-auto pr-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25 [&::-webkit-scrollbar-track]:bg-transparent"
                          : "max-h-[255px] overflow-hidden"
                      }`}
                    >
                      {messageParagraphs.map((paragraph) => (
                        <p key={paragraph} className="m-0 mb-2.5 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        setExpandedCard((current) =>
                          current === member.name ? "" : member.name,
                        )
                      }}
                      className="mt-3 mb-2 self-start rounded-full border border-white/20 px-3 py-1.5 text-[10px] leading-none font-medium text-[color:var(--cinopse-accent)] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cinopse-accent)]"
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </button>
                    <div className="mt-auto border-t border-white/15 pt-3">
                      <b className="font-display block text-sm leading-5 font-semibold text-[color:var(--cinopse-accent)]">
                        {member.name}
                      </b>
                      <i className="mt-1 block text-[8.5px] leading-4 font-light tracking-[0.05em] text-white/55 not-italic">
                        One Place. One Agenda. One Vision. Infinite Possibilities.
                      </i>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
