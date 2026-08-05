import Image from "next/image"
import Link from "next/link"

export type FooterColumn = {
  title: string
  logo?: {
    src: string
    alt: string
  }
  brandEmphasis?: string
  paragraphs: string[]
}

export type FooterLinkItem = {
  label: string
  href: string
}

export type FooterSocialLink = {
  label: string
  href: string
}

export type SiteFooterProps = {
  columns: FooterColumn[]
  linksTitle: string
  links: FooterLinkItem[]
  contactTitle: string
  contacts: string[]
  socialLinks: FooterSocialLink[]
  copyright: string
}

export function SiteFooter({
  columns,
  linksTitle,
  links,
  contactTitle,
  contacts,
  socialLinks,
  copyright,
}: SiteFooterProps) {
  const [brandColumn] = columns

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[color:var(--cinopse-primary-deep)] pt-20 pb-[34px] text-white"
    >
      <div className="absolute bottom-[-260px] left-[-160px] size-[500px] rounded-full bg-[rgba(29,90,180,0.4)] blur-[90px]" />
      <div className="relative z-10 mx-auto grid max-w-[1160px] gap-9 px-7 md:grid-cols-[1.4fr_1fr_1fr] md:gap-[50px]">
        <div data-reveal>
          <Link href="/#home" className="mb-3.5 inline-flex items-center gap-3">
            {brandColumn.logo ? (
              <Image
                src={brandColumn.logo.src}
                alt={brandColumn.logo.alt}
                width={44}
                height={44}
                className="size-11 rounded-full bg-white object-cover shadow-[0_3px_10px_rgba(6,26,58,0.3)]"
              />
            ) : null}
            <span className="font-display text-[26px] leading-none font-semibold text-white">
              {brandColumn.title}{" "}
              {brandColumn.brandEmphasis ? (
                <em className="text-[color:var(--cinopse-accent)] not-italic">
                  {brandColumn.brandEmphasis}
                </em>
              ) : null}
            </span>
          </Link>
          {brandColumn.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="m-0 max-w-md whitespace-pre-line text-[12.5px] leading-8 font-light text-white/65"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div data-reveal>
          <h3 className="m-0 mb-[18px] text-[13px] leading-none font-semibold tracking-[0.16em] text-[color:var(--cinopse-accent)] uppercase">
            {linksTitle}
          </h3>
          <nav className="grid gap-1" aria-label="Footer navigation">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-[12.5px] leading-8 font-light text-white/65 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div data-reveal>
          <h3 className="m-0 mb-[18px] text-[13px] leading-none font-semibold tracking-[0.16em] text-[color:var(--cinopse-accent)] uppercase">
            {contactTitle}
          </h3>
          <div className="grid gap-1">
            {contacts.map((contact) => (
              contact.includes("@") ? (
                <a
                  key={contact}
                  href={`mailto:${contact}`}
                  className="block text-[12.5px] leading-8 font-light text-white/65 transition-colors hover:text-white"
                >
                  {contact}
                </a>
              ) : contact.startsWith("www.") ? (
                <a
                  key={contact}
                  href={`https://${contact}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[12.5px] leading-8 font-light text-white/65 transition-colors hover:text-white"
                >
                  {contact}
                </a>
              ) : (
                <p
                  key={contact}
                  className="m-0 text-[12.5px] leading-8 font-light text-white/65"
                >
                  {contact}
                </p>
              )
            ))}
          </div>
          {socialLinks.length ? (
            <div className="mt-5 flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[12.5px] leading-8 font-light text-white/65 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-14 flex max-w-[1160px] flex-wrap justify-between gap-4 border-t border-white/10 px-7 pt-6 text-[11px] leading-5 font-light text-white/40">
        <p className="m-0">{copyright}</p>
        <p className="m-0">One Place. One Agenda. One Vision.</p>
      </div>
    </footer>
  )
}
