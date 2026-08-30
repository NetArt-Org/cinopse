"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { useRegistrationTicketCta } from "@/hooks/use-registration-ticket-cta"

export type NavItem = {
  label: string
  href: string
}

export function SiteHeader({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const { label: registerCtaLabel, openRegistrationOrTicket } =
    useRegistrationTicketCta()
  const solidHeader = scrolled || pathname !== "/"

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight

      setScrolled(scrollTop > 40)
      setProgress(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <progress
        className="fixed top-0 left-0 z-[101] h-[2.5px] w-full appearance-none border-0 bg-transparent [&::-moz-progress-bar]:bg-[image:linear-gradient(90deg,var(--cinopse-accent),var(--cinopse-accent-hi))] [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-[image:linear-gradient(90deg,var(--cinopse-accent),var(--cinopse-accent-hi))]"
        value={progress}
        max={100}
        aria-label="Page scroll progress"
      />
      <header className="fixed inset-x-0 top-0 z-[100]">
        <nav
          aria-label="Main navigation"
          className={`transition-[background,box-shadow,padding] duration-500 ease-[cubic-bezier(.22,.9,.18,1)] ${
            solidHeader
              ? "bg-[rgba(13,49,105,0.86)] py-3 shadow-[0_8px_30px_rgba(6,26,58,0.25)] backdrop-blur-[14px]"
              : "py-5"
          }`}
        >
          <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-6 px-7">
            <Link
              href="/#home"
              className="flex items-center gap-2.5 text-white"
              aria-label="CINOPSE India 2026 home"
            >
              <Image
                src="/logo.jpg"
                alt="CINOPSE logo"
                width={36}
                height={36}
                priority
                className="size-9 shrink-0 rounded-full bg-white object-cover shadow-[0_3px_10px_rgba(6,26,58,0.3)]"
              />
              <span className="grid max-w-[285px] gap-1">
                <span className="font-display text-xl leading-none font-semibold tracking-[0.01em]">
                  CINOPSE{" "}
                  <em className="align-baseline font-sans text-[11px] leading-none font-medium tracking-[0.18em] text-[color:var(--cinopse-accent)] not-italic">
                    INDIA 2026
                  </em>
                </span>
                <span className="block max-w-[185px] font-sans text-[6.5px] leading-[1.25] font-medium tracking-[0.07em] text-white/62 uppercase sm:max-w-[250px] sm:text-[7.5px] min-[1120px]:max-w-none min-[1120px]:text-[8.5px]">
                  Combined Initiative for Nurturing Outcomes through Precision
                  Medicine with Scientific Evidence
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-7 xl:flex">
              {items.map((item) => {
                const isActive =
                  item.href === pathname ||
                  (pathname === "/" && item.href === "/#home")

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative py-1.5 text-[12.5px] leading-none font-normal transition-colors hover:text-white ${
                      isActive ? "text-white" : "text-white/80"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[color:var(--cinopse-accent)] transition-[right] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] group-hover:right-0 ${
                        isActive ? "right-0" : "right-full"
                      }`}
                    />
                  </Link>
                )
              })}
              <button
                type="button"
                onClick={openRegistrationOrTicket}
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--cinopse-accent)] px-[22px] py-3 text-xs leading-none font-medium whitespace-nowrap text-[color:var(--cinopse-primary-deep)] shadow-[0_4px_14px_rgba(6,26,58,0.25)] transition-[transform,box-shadow,background] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:bg-[color:var(--cinopse-accent-hi)] hover:shadow-[0_10px_22px_rgba(217,164,65,0.4)]"
              >
                {registerCtaLabel}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            <div className="xl:hidden">
              <MobileNavigation
                items={items}
                onRegister={openRegistrationOrTicket}
                registerLabel={registerCtaLabel}
              />
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
