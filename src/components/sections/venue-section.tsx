import { ArrowRight, Mail, Phone, Sparkle } from "lucide-react"

const venueIconMap = {
  sparkle: Sparkle,
  phone: Phone,
  email: Mail,
} as const

export type VenueInfoItem = {
  icon: keyof typeof venueIconMap
  text: string
}

export type VenueSectionProps = {
  eyebrow: string
  title: string
  mapEmbedUrl: string
  mapCaption: string
  mapTitle: string
  venueTitle: string
  description: string
  details: VenueInfoItem[]
  ctaLabel: string
  ctaHref: string
}

export function VenueSection({
  eyebrow,
  title,
  mapEmbedUrl,
  mapCaption,
  mapTitle,
  venueTitle,
  description,
  details,
  ctaLabel,
  ctaHref,
}: VenueSectionProps) {
  return (
    <section
      id="venue"
      className="bg-[color:var(--cinopse-cream)] py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-7 md:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[60px]">
        <div
          data-reveal="left"
          className="relative min-h-[360px] overflow-hidden rounded-[20px] bg-[image:var(--cinopse-gradient-reference-blue)] shadow-[0_24px_60px_rgba(12,40,84,0.25)] md:min-h-[400px]"
        >
          <iframe
            className="absolute inset-x-0 top-0 h-[calc(100%-44px)] w-full border-0"
            src={mapEmbedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title={mapTitle}
          />
          <p className="absolute inset-x-0 bottom-0 m-0 flex h-11 items-center justify-center bg-[color:var(--cinopse-primary-deep)] px-4 text-center text-[11.5px] leading-5 font-normal tracking-[0.05em] text-white/85">
            {mapCaption}
          </p>
        </div>

        <div data-reveal="right">
          <div className="inline-flex items-center gap-5">
            <span className="h-0.5 w-16 rounded-full bg-[color:var(--cinopse-accent)]" />
            <span className="text-[11px] leading-none font-semibold tracking-[0.35em] text-[color:var(--cinopse-accent-deep)] uppercase">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-display mt-6 text-[clamp(32px,4.6vw,46px)] leading-tight font-semibold tracking-[-0.02em] text-[color:var(--cinopse-ink)]">
            {title}
          </h2>

          <div className="mt-8">
            <h3 className="font-display text-[clamp(20px,1.8vw,26px)] leading-tight font-semibold text-[color:var(--cinopse-primary)] lg:whitespace-nowrap">
              {venueTitle}
            </h3>
            <p className="mt-4 text-[13.5px] leading-[1.85] font-light text-[color:var(--cinopse-text-secondary)]">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {details.map((item) => {
                const Icon = venueIconMap[item.icon]

                return (
                  <div
                    key={`${item.icon}-${item.text}`}
                    className="flex items-center gap-4 rounded-xl bg-white px-[18px] py-[15px] shadow-[0_4px_16px_rgba(12,40,84,0.06)] transition-transform duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:translate-x-1.5"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[rgba(27,75,150,0.09)] text-[color:var(--cinopse-primary)]">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="text-[13px] leading-5 font-normal text-[color:var(--cinopse-text-secondary)]">
                      {item.text}
                    </span>
                  </div>
                )
              })}
            </div>

            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--cinopse-primary)] px-7 py-4 text-[12.5px] leading-none font-medium text-white transition-[transform,box-shadow,background] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:bg-[color:var(--cinopse-primary-dark)] hover:shadow-[0_12px_26px_rgba(27,75,150,0.35)]"
            >
              {ctaLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
