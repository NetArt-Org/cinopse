"use client"

import { useEffect, useRef, useState } from "react"
import { BookOpenCheck, PenTool, Scale, Sparkles, Star } from "lucide-react"
import { gsap } from "gsap"

const pillarIconMap = {
  sparkles: Sparkles,
  scale: Scale,
  case: BookOpenCheck,
  star: Star,
  pen: PenTool,
} as const

export type AboutPillar = {
  icon: keyof typeof pillarIconMap
  title: string
  description: string
}

export type AboutStat = {
  value: string
  label: string
  accent?: boolean
}

export type AboutSectionProps = {
  eyebrow: string
  title: string
  eventDate: string
  dateLabel: string
  eventLabel: string
  locationLabel: string
  paragraphs: string[]
  quote: {
    text: string
    emphasis: string
    subtext: string
  }
  pillars: AboutPillar[]
  stats: AboutStat[]
}

export function AboutSection({
  eyebrow,
  title,
  eventDate,
  dateLabel,
  eventLabel,
  locationLabel,
  paragraphs,
  quote,
  pillars,
  stats,
}: AboutSectionProps) {
  const visualRef = useRef<HTMLDivElement>(null)
  const [daysToGo, setDaysToGo] = useState("—")

  useEffect(() => {
    const updateDays = () => {
      const target = new Date(eventDate).getTime()
      const days = Math.max(0, Math.ceil((target - Date.now()) / 864e5))
      setDaysToGo(String(days))
    }

    updateDays()
    const timer = window.setInterval(updateDays, 60 * 60 * 1000)

    return () => window.clearInterval(timer)
  }, [eventDate])

  useEffect(() => {
    const visual = visualRef.current
    if (!visual) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onPointerMove = (event: PointerEvent) => {
      const rect = visual.getBoundingClientRect()
      const dx = event.clientX / rect.width - rect.left / rect.width - 0.5
      const dy = event.clientY / rect.height - rect.top / rect.height - 0.5

      gsap.to(visual, {
        rotateY: dx * 8,
        rotateX: -dy * 8,
        transformPerspective: 900,
        duration: 0.14,
        ease: "power1.out",
        overwrite: "auto",
      })
    }

    const onPointerLeave = () => {
      gsap.to(visual, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      })
    }

    visual.addEventListener("pointermove", onPointerMove)
    visual.addEventListener("pointerleave", onPointerLeave)

    return () => {
      visual.removeEventListener("pointermove", onPointerMove)
      visual.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return (
    <section id="about" className="bg-[color:var(--cinopse-cream)] py-16 md:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1160px] items-stretch gap-10 px-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[52px]">
        <div data-reveal="left">
          <div className="mb-3.5 flex items-center gap-3.5">
            <span className="h-[1.5px] w-[46px] bg-[color:var(--cinopse-accent)]" />
            <span className="text-[11px] leading-none font-medium tracking-[0.22em] text-[color:var(--cinopse-accent-deep)] uppercase">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-display m-0 mb-[18px] text-[clamp(32px,4.6vw,46px)] leading-[1.12] font-semibold tracking-[-0.01em] text-[color:var(--cinopse-ink)]">
            {title}
          </h2>
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`max-w-[640px] text-[15px] leading-[1.9] font-light text-[color:var(--cinopse-text-secondary)] ${
                index === 0 ? "m-0" : "mt-3.5 mb-0"
              }`}
            >
              {paragraph}
            </p>
          ))}

          <div className="relative mt-[22px] overflow-hidden rounded-[14px] bg-[image:var(--cinopse-gradient-reference-blue)] py-[18px] pr-6 pl-14 font-display text-[15px] leading-[1.55] font-medium text-white shadow-[0_14px_32px_rgba(12,40,84,0.22)]">
            <span className="absolute top-2.5 left-[18px] font-display text-[42px] leading-none font-bold text-[color:var(--cinopse-accent)]">
              “
            </span>
            <span
              data-about-quote-shine
              className="absolute top-0 bottom-0 -left-20 w-[60px] animate-[quoteShine_3.8s_ease-in-out_infinite] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.14),transparent)]"
            />
            {quote.text}{" "}
            <b className="text-[color:var(--cinopse-accent)]">{quote.emphasis}</b>
            <span className="mt-2 block font-sans text-[11px] leading-[1.6] font-light text-white/65">
              {quote.subtext}
            </span>
          </div>
        </div>

        <div
          ref={visualRef}
          data-reveal="right"
          className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[20px] bg-[image:var(--cinopse-gradient-reference-blue)] shadow-[0_24px_60px_rgba(12,40,84,0.25)] will-change-transform"
        >
          <span
            data-about-ring
            className="absolute size-[300px] rounded-full border border-white/15 animate-[spinSlow_40s_linear_infinite]"
          />
          <span
            data-about-ring
            className="absolute size-[420px] rounded-full border border-dashed border-white/15 animate-[spinSlow_60s_linear_infinite_reverse]"
          />
          <div className="relative z-10 px-8 py-10 text-center text-white">
            <div className="font-display text-[60px] leading-none font-semibold text-[color:var(--cinopse-accent)]">
              {dateLabel}
            </div>
            <p className="mt-2.5 mb-0 text-[12.5px] leading-[1.6] font-light tracking-[0.08em] text-white/75 uppercase">
              {eventLabel}
              <br />
              {locationLabel}
            </p>
            <div className="mt-4 inline-flex items-baseline gap-2 rounded-full border border-[rgba(217,164,65,0.5)] bg-[rgba(217,164,65,0.16)] px-4 py-2.5 text-[9.5px] leading-none font-normal tracking-[0.18em] text-white/80">
              <b className="font-display text-[17px] leading-none font-semibold tracking-normal text-[color:var(--cinopse-accent)] tabular-nums">
                {daysToGo}
              </b>
              DAYS TO GO
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1160px] px-7">
        <div data-reveal-group className="mt-11 grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-5">
          {pillars.map((pillar) => {
            const Icon = pillarIconMap[pillar.icon]

            return (
              <article
                key={pillar.title}
                data-reveal
                className="group relative overflow-hidden rounded-[14px] bg-white px-5 py-[22px] shadow-[0_6px_20px_rgba(12,40,84,0.07)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] after:absolute after:inset-x-0 after:top-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-[image:linear-gradient(90deg,var(--cinopse-accent),var(--cinopse-accent-hi))] after:transition-transform after:duration-500 after:ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(12,40,84,0.14)] hover:after:scale-x-100"
              >
                <span className="mb-3.5 grid size-[38px] place-items-center rounded-[10px] bg-[rgba(27,75,150,0.09)] text-[color:var(--cinopse-primary)] transition-[transform,background,color] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] group-hover:animate-[wiggle_0.5s_cubic-bezier(.22,.9,.18,1)] group-hover:bg-[color:var(--cinopse-accent)] group-hover:text-white">
                  <Icon className="size-[17px]" aria-hidden="true" />
                </span>
                <h3 className="font-display m-0 mb-1.5 text-[15px] leading-5 font-semibold text-[color:var(--cinopse-primary)]">
                  {pillar.title}
                </h3>
                <p className="m-0 text-[11.5px] leading-[1.65] font-light text-[color:var(--cinopse-muted)]">
                  {pillar.description}
                </p>
              </article>
            )
          })}
        </div>

        <div data-reveal-group className="mt-3.5 grid grid-cols-2 gap-3.5 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              data-reveal
              className="rounded-2xl bg-white px-3.5 py-[26px] shadow-[0_6px_20px_rgba(12,40,84,0.07)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(12,40,84,0.14)]"
            >
              <b
                className={`font-display block text-[40px] leading-none font-semibold tabular-nums ${
                  stat.accent
                    ? "text-[color:var(--cinopse-accent)]"
                    : "text-[color:var(--cinopse-primary)]"
                }`}
              >
                {stat.value}
              </b>
              <span className="mt-2 block text-[10.5px] leading-4 font-normal tracking-[0.14em] text-[color:var(--cinopse-muted)] uppercase">
                {stat.label}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
