"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export type AgendaSession = {
  number?: string
  title: string
  time: string
  description: string
  faculty?: string
}

export type AgendaBlock = {
  time: string
  duration: string
  title: string
  hall: string
  sessions: AgendaSession[]
}

export type AgendaBreak = {
  kind: "break"
  time: string
  label: string
  duration: string
}

export type AgendaDay = {
  day: string
  date: string
  blocks: Array<AgendaBlock | AgendaBreak>
}

export type AgendaPageContentProps = {
  days: AgendaDay[]
}

function openRegistration() {
  window.dispatchEvent(new Event("cinopse:open-registration"))
}

function isBreak(item: AgendaBlock | AgendaBreak): item is AgendaBreak {
  return "kind" in item
}

export function AgendaPageContent({ days }: AgendaPageContentProps) {
  const [activeDay, setActiveDay] = useState(0)

  return (
    <>
      <div className="sticky top-[58px] z-50 border-b border-[color:var(--cinopse-border)] bg-white">
        <div className="mx-auto flex max-w-[1000px] items-center gap-1.5 px-7">
          {days.map((day, index) => (
            <button
              key={day.day}
              type="button"
              onClick={() => setActiveDay(index)}
              className={`inline-flex cursor-pointer items-baseline gap-2 border-b-[2.5px] px-4 pt-4 pb-3.5 font-sans transition-colors duration-300 max-sm:px-2.5 ${
                activeDay === index
                  ? "border-[color:var(--cinopse-accent)]"
                  : "border-transparent"
              }`}
            >
              <b
                className={`text-[13px] leading-none font-semibold transition-colors ${
                  activeDay === index
                    ? "text-[color:var(--cinopse-primary)]"
                    : "text-[color:var(--cinopse-muted)]"
                }`}
              >
                {day.day}
              </b>
              <i className="text-[11px] leading-none font-light text-[color:var(--cinopse-faint)] not-italic">
                {day.date}
              </i>
            </button>
          ))}
          <span className="ml-auto text-right text-[10.5px] leading-snug font-light text-[color:var(--cinopse-faint)] max-sm:hidden">
            All sessions in the Main Hall
          </span>
        </div>
      </div>

      <main className="bg-[color:var(--cinopse-cream)] py-[52px] pb-20">
        <div className="mx-auto max-w-[1000px] px-7">
          <div className="mb-[34px] rounded-xl border-l-4 border-[color:var(--cinopse-accent)] bg-white px-5 py-3.5 text-[12px] leading-[1.7] font-light text-[color:var(--cinopse-text-secondary)] shadow-[0_5px_18px_rgba(12,40,84,.06)]">
            <b className="font-medium text-[color:var(--cinopse-primary)]">
              Provisional agenda.
            </b>{" "}
            Dates, timings, halls, chairpersons, and faculty are indicative and
            will be confirmed with the official scientific programme.{" "}
            <a
              href="mailto:cinopseindiamedical@gmail.com?subject=CINOPSE%20India%202026%20Agenda%20updates"
              className="text-[color:var(--cinopse-primary)]"
            >
              Get notified
            </a>{" "}
            when the final agenda is released.
          </div>

          {days.map((day, dayIndex) => (
            <div
              key={day.day}
              className={
                activeDay === dayIndex
                  ? "block animate-[swapIn_.5s_cubic-bezier(.22,.9,.18,1)]"
                  : "hidden"
              }
            >
              {day.blocks.map((item) =>
                isBreak(item) ? (
                  <div
                    key={`${item.time}-${item.label}`}
                    className="mb-[42px] flex items-center gap-3.5 rounded-full border border-dashed border-[rgba(217,164,65,.55)] bg-[rgba(217,164,65,.12)] px-5 py-[13px]"
                  >
                    <b className="font-display text-[12.5px] leading-none font-semibold text-[#9a6f1c] tabular-nums">
                      {item.time}
                    </b>
                    <span className="text-[11.5px] leading-none font-normal text-[#9a6f1c]">
                      {item.label}
                    </span>
                    <i className="ml-auto text-[10px] leading-none font-light tracking-[0.08em] text-[color:var(--cinopse-accent-deep)] not-italic">
                      {item.duration}
                    </i>
                  </div>
                ) : (
                  <section key={`${item.time}-${item.title}`} className="mb-[42px]">
                    <div className="mb-[18px] flex items-center gap-4 max-sm:flex-wrap">
                      <div className="min-w-[104px] shrink-0 rounded-xl bg-[image:var(--cinopse-gradient-reference-blue)] px-4 py-2.5 text-center text-white">
                        <b className="font-display block text-[15px] leading-tight font-semibold tabular-nums">
                          {item.time}
                        </b>
                        <i className="block text-[8.5px] leading-snug font-light tracking-[0.1em] text-white/65 not-italic">
                          {item.duration}
                        </i>
                      </div>
                      <h2 className="font-display m-0 text-[21px] leading-tight font-semibold text-[color:var(--cinopse-ink)]">
                        {item.title}
                      </h2>
                      <span className="ml-auto shrink-0 rounded-full border border-[rgba(217,164,65,.4)] bg-[rgba(217,164,65,.12)] px-3 py-2 text-[10px] leading-none font-normal tracking-[0.1em] whitespace-nowrap text-[color:var(--cinopse-accent-deep)] max-sm:ml-0">
                        {item.hall}
                      </span>
                    </div>

                    <div className="ml-3.5 flex flex-col gap-2.5 border-l-2 border-[rgba(27,75,150,.14)] pl-[26px]">
                      {item.sessions.map((session) => (
                        <article
                          key={`${session.time}-${session.title}`}
                          className="relative rounded-[14px] bg-white px-5 py-4 shadow-[0_5px_18px_rgba(12,40,84,.06)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] before:absolute before:top-[22px] before:left-[-33px] before:size-[11px] before:rounded-full before:border-[3px] before:border-[color:var(--cinopse-accent)] before:bg-white hover:translate-x-1.5 hover:shadow-[0_14px_30px_rgba(12,40,84,.12)]"
                        >
                          <div className="flex flex-wrap items-baseline gap-3">
                            {session.number ? (
                              <span className="grid size-[26px] shrink-0 place-items-center self-center rounded-full bg-[rgba(27,75,150,.08)] font-mono text-[10px] leading-none font-semibold text-[color:var(--cinopse-primary)]">
                                {session.number}
                              </span>
                            ) : null}
                            <h3 className="font-display m-0 text-[15.5px] leading-snug font-semibold text-[color:var(--cinopse-primary)]">
                              {session.title}
                            </h3>
                            <span className="ml-auto text-[11px] leading-none font-medium whitespace-nowrap text-[color:var(--cinopse-muted)] tabular-nums max-sm:ml-0 max-sm:w-full">
                              {session.time}
                            </span>
                          </div>
                          <p className="mt-2 mb-0 text-[12px] leading-[1.65] font-light text-[color:var(--cinopse-text-secondary)]">
                            {session.description}
                          </p>
                          {session.faculty ? (
                            <div className="mt-2.5 flex items-center gap-2.5 border-t border-dashed border-[color:var(--cinopse-border)] pt-2.5 text-[10.5px] leading-snug font-light text-[color:var(--cinopse-faint)]">
                              <span className="size-[22px] shrink-0 rounded-full bg-[linear-gradient(100deg,#e8ecf3_8%,#f6f8fc_38%,#e8ecf3_62%)] bg-[length:360px_100%] animate-[shimmer_1.5s_linear_infinite]" />
                              {session.faculty}
                            </div>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  </section>
                )
              )}
            </div>
          ))}

          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-5 rounded-[20px] bg-[image:var(--cinopse-gradient-reference-blue)] px-9 py-[34px] text-white shadow-[0_22px_50px_rgba(12,40,84,.25)]">
            <div>
              <h2 className="font-display m-0 mb-1.5 text-[22px] leading-tight font-semibold">
                Registration is open.
              </h2>
              <p className="m-0 text-[12px] leading-relaxed font-light text-white/70">
                Sunday, 27 September 2026 · Jawaharlal Nehru Planetarium,
                Bengaluru. Early rates end soon.
              </p>
            </div>
            <button
              type="button"
              onClick={openRegistration}
              className="inline-flex items-center gap-2.5 rounded-full bg-[color:var(--cinopse-accent)] px-7 py-[15px] text-[13px] leading-none font-medium text-[color:var(--cinopse-primary-deep)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(217,164,65,.4)]"
            >
              Register Now
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
