import { ArrowRight } from "lucide-react"

import { DestinationCoverflow } from "@/components/sections/destination-coverflow"
import type { DestinationCard } from "@/components/sections/destination-coverflow"

export type PopularDestinationSectionProps = {
  eyebrow: string
  title: string
  heading: string
  paragraphs: string[]
  ctaLabel: string
  ctaHref: string
  cards: DestinationCard[]
}

export function PopularDestinationSection({
  eyebrow,
  title,
  heading,
  paragraphs,
  ctaLabel,
  ctaHref,
  cards,
}: PopularDestinationSectionProps) {
  return (
    <section
      id="destination"
      className="relative overflow-hidden bg-[color:var(--cinopse-cream)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1160px] px-7">
        <div data-reveal className="flex items-center gap-4">
          <span className="h-0.5 w-12 rounded-full bg-[color:var(--cinopse-accent)]" />
          <p className="text-[11px] font-medium tracking-[0.22em] text-[color:var(--cinopse-accent-deep)] uppercase">
            {eyebrow}
          </p>
        </div>
        <h2
          data-reveal
          className="font-display mt-5 text-[clamp(36px,5vw,58px)] leading-[1.05] font-semibold tracking-[-0.025em] text-[color:var(--cinopse-ink)]"
        >
          {title}
        </h2>

        <div
          data-reveal
          className="mt-14 grid min-h-[400px] overflow-hidden rounded-[22px] bg-[image:var(--cinopse-gradient-blue)] shadow-[0_28px_70px_rgba(12,40,84,.28)] min-[860px]:grid-cols-2"
        >
          <div className="relative min-h-[400px]">
            <DestinationCoverflow cards={cards} />
          </div>
          <div className="flex flex-col justify-center px-7 py-10 text-white sm:px-10 lg:px-11 lg:py-12">
            <h3 className="font-display text-[28px] leading-[1.2] font-semibold tracking-[-0.01em]">
              {heading}
            </h3>
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-[12.5px] leading-[1.8] font-light text-white/70 ${
                  index === 0 ? "mt-4" : "mt-3.5"
                }`}
              >
                {paragraph}
              </p>
            ))}
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[image:var(--cinopse-gradient-gold)] px-6 text-xs font-bold text-[color:var(--cinopse-primary-deep)] shadow-[var(--cinopse-shadow-gold)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(217,164,65,.36)] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              {ctaLabel}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
