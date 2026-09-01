"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, CalendarDays, MapPin, Stethoscope } from "lucide-react"
import { useRegistrationTicketCta } from "@/hooks/use-registration-ticket-cta"

export type HeroMeta = {
  title: string
  description: string
  icon: "calendar" | "location" | "medical"
}

export type HeroSectionProps = {
  eyebrow: string
  titleWords: string[]
  goldWord: string
  tagline: string[]
  description: string
  logo: {
    src: string
    alt: string
  }
  ctaLabel: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  meta: HeroMeta[]
  specialties: string[]
  stripItems: string[]
}

const iconMap = {
  calendar: CalendarDays,
  location: MapPin,
  medical: Stethoscope,
} satisfies Record<HeroMeta["icon"], typeof CalendarDays>

const taglineDelays = [
  "[animation-delay:.85s]",
  "[animation-delay:1.05s]",
  "[animation-delay:1.25s]",
  "[animation-delay:1.45s]",
]
const ringDots = {
  a: ["[transform:rotate(0deg)]", "[transform:rotate(150deg)]"],
  b: ["[transform:rotate(40deg)]", "[transform:rotate(200deg)]", "[transform:rotate(300deg)]"],
  c: ["[transform:rotate(80deg)]", "[transform:rotate(230deg)]"],
}
const specialtyPositions = [
  "top-[7%] left-[12%] [animation-delay:0s]",
  "top-[20%] right-[2%] [animation-delay:.9s]",
  "top-[47%] -left-[4%] [animation-delay:1.7s]",
  "right-0 bottom-[24%] [animation-delay:.5s]",
  "bottom-[6%] left-[18%] [animation-delay:1.2s]",
  "-bottom-[2%] right-[26%] [animation-delay:2s]",
]

function StripContent({ items }: { items: string[] }) {
  return (
    <span className="inline-flex items-center gap-[26px] pr-[26px] text-[13px] leading-none font-semibold tracking-[0.14em] whitespace-nowrap text-[color:var(--cinopse-primary-deep)]">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-[26px]">
          {item}
          <i
            className="block size-1.5 rounded-full bg-[color:var(--cinopse-primary-deep)]"
            aria-hidden="true"
          />
        </span>
      ))}
    </span>
  )
}

export function HeroSection({
  eyebrow,
  titleWords,
  goldWord,
  tagline,
  description,
  logo,
  ctaLabel,
  secondaryCtaLabel,
  secondaryCtaHref,
  meta,
  specialties,
  stripItems,
}: HeroSectionProps) {
  const { label: registerCtaLabel, openRegistrationOrTicket } =
    useRegistrationTicketCta()

  return (
    <>
      <section
        id="home"
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[image:var(--cinopse-gradient-reference-blue)] bg-[length:180%_180%] px-0 pt-[140px] pb-[90px] text-white animate-[gradShift_18s_ease_infinite]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.07)_1px,transparent_1px)] bg-[length:34px_34px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_40%,#000_30%,transparent_75%)]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -top-[140px] -left-[140px] size-[520px] rounded-full bg-[#1d5ab4]/55 blur-[70px] animate-[floatA_14s_ease-in-out_infinite]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -right-20 -bottom-[120px] size-[420px] rounded-full bg-[color:var(--cinopse-accent)]/16 blur-[70px] animate-[floatB_17s_ease-in-out_infinite]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute top-[22%] right-[14%] size-[280px] rounded-full bg-[#7fb2e5]/20 blur-[70px] animate-[floatA_20s_ease-in-out_infinite_reverse]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute top-[-20%] h-[140%] w-[34vw] -skew-x-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.05),transparent)] animate-[beamMove_11s_ease-in-out_infinite]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute top-[-20%] h-[140%] w-[22vw] -skew-x-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.05),transparent)] animate-[beamMove_14s_ease-in-out_4s_infinite]"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-[-6px] z-[1] opacity-40">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            className="block h-[60px] w-full"
            aria-hidden="true"
          >
            <path
              d="M0,45 H360 L392,45 400,20 412,72 424,10 438,60 448,45 H1000 L1032,45 1040,20 1052,72 1064,10 1078,60 1088,45 H1440"
              className="fill-none stroke-[color:var(--cinopse-accent)] stroke-2 [filter:drop-shadow(0_0_6px_rgba(217,164,65,.8))] [stroke-dasharray:1200] [stroke-dashoffset:1200] animate-[ecg_7s_linear_infinite]"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="relative z-[2] mx-auto grid w-full max-w-[1160px] grid-cols-1 items-center gap-0 px-7 min-[921px]:grid-cols-[1.08fr_.92fr] min-[921px]:gap-[46px]">
          <div className="text-left">
            <span className="inline-flex max-w-[88vw] items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] px-[18px] py-2.5 text-[11px] leading-normal tracking-[0.14em] text-white/85 backdrop-blur-md">
              <span
                className="size-[7px] shrink-0 rounded-full bg-[color:var(--cinopse-accent)] animate-[softPulse_2.4s_ease-out_infinite]"
                aria-hidden="true"
              />
              {eyebrow}
            </span>

            <h1 className="font-display mt-7 text-[clamp(34px,5.2vw,68px)] leading-[1.04] font-semibold tracking-[-0.02em] min-[921px]:whitespace-nowrap">
              {titleWords.map((word, index) => {
                const isGold = word === goldWord
                return (
                  <span
                    key={word}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <span
                      className={`inline-block ${
                        isGold
                          ? "bg-[linear-gradient(100deg,#d9a441_25%,#ffeec2_42%,#d9a441_58%)] bg-[length:220%_100%] bg-clip-text text-transparent animate-[goldShine_4.5s_ease-in-out_1.6s_infinite]"
                          : ""
                      }`}
                    >
                      {word}
                    </span>
                    {index < titleWords.length - 1 ? <>&nbsp;</> : null}
                  </span>
                )
              })}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-[clamp(14px,1.6vw,18px)] leading-none font-normal text-white/90">
              {tagline.map((item, index) => (
                <span key={item} className="contents">
                  <span
                    className={`[transform:translateY(14px)] opacity-0 animate-[fadeRise_.8s_cubic-bezier(.22,.9,.18,1)_forwards] ${
                      taglineDelays[index] ?? ""
                    } ${
                      index === tagline.length - 1
                        ? "text-[color:var(--cinopse-accent)]"
                        : ""
                    }`}
                  >
                    {item}
                  </span>
                  {index < tagline.length - 1 ? (
                    <span
                      className={`size-[5px] shrink-0 rounded-full bg-[color:var(--cinopse-accent)] [transform:translateY(14px)] opacity-0 animate-[fadeRise_.8s_cubic-bezier(.22,.9,.18,1)_forwards] ${
                        taglineDelays[index] ?? ""
                      }`}
                      aria-hidden="true"
                    />
                  ) : null}
                </span>
              ))}
            </div>

            <p className="mt-5 max-w-[540px] [transform:translateY(14px)] text-[clamp(13px,1.4vw,15px)] leading-[1.8] font-light text-white/65 opacity-0 animate-[fadeRise_.9s_cubic-bezier(.22,.9,.18,1)_1.5s_forwards]">
              {description}
            </p>

            <div className="mt-[34px] flex [transform:translateY(14px)] flex-wrap justify-start gap-4 opacity-0 animate-[fadeRise_.9s_cubic-bezier(.22,.9,.18,1)_1.8s_forwards]">
              <button
                type="button"
                onClick={openRegistrationOrTicket}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[color:var(--cinopse-accent)] px-[30px] py-4 text-[13.5px] leading-none font-medium text-[color:var(--cinopse-primary-deep)] transition-[transform,box-shadow,background] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:bg-[color:var(--cinopse-accent-hi)] hover:shadow-[0_14px_30px_rgba(217,164,65,.4)]"
              >
                {registerCtaLabel || ctaLabel}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <Link
                href={secondaryCtaHref}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.09] px-[30px] py-4 text-[13.5px] leading-none font-medium text-white backdrop-blur-md transition-[transform,background] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:bg-white/15"
              >
                {secondaryCtaLabel}
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
              </Link>
            </div>

            <div className="mt-8 flex [transform:translateY(14px)] flex-wrap justify-start gap-3 opacity-0 animate-[fadeRise_.9s_cubic-bezier(.22,.9,.18,1)_2.1s_forwards]">
              {meta.map((item) => {
                const Icon = iconMap[item.icon]
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-[14px] border border-white/15 bg-white/[0.07] px-[17px] py-3 backdrop-blur-md transition-[transform,background] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-[color:var(--cinopse-accent)]/15 text-[color:var(--cinopse-accent)]">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <b className="block text-[11.5px] leading-tight font-medium text-white">
                        {item.title}
                      </b>
                      <i className="mt-1 block text-[10px] leading-tight font-light text-white/55 not-italic">
                        {item.description}
                      </i>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative hidden aspect-square w-full max-w-[430px] justify-self-center opacity-0 animate-[fadeRise_1.1s_cubic-bezier(.22,.9,.18,1)_.9s_forwards] min-[921px]:block">
            <div className="absolute top-1/2 left-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 animate-[spinSlow_22s_linear_infinite] rounded-full border border-dashed border-white/15">
              {ringDots.a.map((rotation, index) => (
                <span key={rotation} className={`absolute -inset-px ${rotation}`}>
                  <span
                    className={`absolute top-[-4.5px] left-1/2 -ml-[4.5px] rounded-full ${
                      index === 1
                        ? "size-1.5 bg-[#7fb2e5] shadow-[0_0_10px_rgba(127,178,229,.9)]"
                        : "size-[9px] bg-[color:var(--cinopse-accent)] shadow-[0_0_14px_rgba(217,164,65,.95)]"
                    }`}
                  />
                </span>
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 animate-[spinSlow_38s_linear_infinite_reverse] rounded-full border border-dashed border-white/15">
              {ringDots.b.map((rotation, index) => (
                <span key={rotation} className={`absolute -inset-px ${rotation}`}>
                  <span
                    className={`absolute top-[-4.5px] left-1/2 -ml-[4.5px] rounded-full ${
                      index === 1
                        ? "size-1.5 bg-[#7fb2e5] shadow-[0_0_10px_rgba(127,178,229,.9)]"
                        : "size-[9px] bg-[color:var(--cinopse-accent)] shadow-[0_0_14px_rgba(217,164,65,.95)]"
                    }`}
                  />
                </span>
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-[spinSlow_56s_linear_infinite] rounded-full border border-dashed border-white/15">
              {ringDots.c.map((rotation, index) => (
                <span key={rotation} className={`absolute -inset-px ${rotation}`}>
                  <span
                    className={`absolute top-[-4.5px] left-1/2 -ml-[4.5px] rounded-full ${
                      index === 0
                        ? "size-1.5 bg-[#7fb2e5] shadow-[0_0_10px_rgba(127,178,229,.9)]"
                        : "size-[9px] bg-[color:var(--cinopse-accent)] shadow-[0_0_14px_rgba(217,164,65,.95)]"
                    }`}
                  />
                </span>
              ))}
            </div>

            <div className="absolute top-1/2 left-1/2 z-[2] grid size-[126px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,#f4e8cf_70%,#d9a441)] p-[7px] animate-[corePulse_3.2s_ease-in-out_infinite]">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={112}
                height={112}
                className="size-full rounded-full bg-white object-cover"
                priority
              />
            </div>

            {specialties.map((specialty, index) => (
              <span
                key={specialty}
                className={`absolute z-[3] rounded-full border border-white/20 bg-white/10 px-[15px] py-2.5 text-[10.5px] leading-none font-medium tracking-[0.05em] whitespace-nowrap text-white shadow-[0_10px_24px_rgba(6,26,58,.35)] backdrop-blur-md animate-[bob_5.5s_ease-in-out_infinite] ${
                  specialtyPositions[index] ?? ""
                }`}
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-[42px] left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-2.5 text-[10px] leading-none tracking-[0.28em] text-white/55 lg:flex">
          <span className="flex h-9 w-[22px] justify-center rounded-full border border-white/40 pt-[7px]">
            <i
              className="block h-[7px] w-[3px] rounded-full bg-[color:var(--cinopse-accent)] animate-[bob_1.6s_ease-in-out_infinite]"
              aria-hidden="true"
            />
          </span>
          SCROLL TO EXPLORE
        </div>
      </section>

      <div
        className="relative z-[3] overflow-hidden bg-[color:var(--cinopse-accent)] py-4"
        aria-hidden="true"
      >
        <div className="flex w-max gap-0 animate-[marquee_26s_linear_infinite]">
          <StripContent items={stripItems} />
          <StripContent items={stripItems} />
          <StripContent items={stripItems} />
          <StripContent items={stripItems} />
        </div>
      </div>
    </>
  )
}
