"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

import { MobileNavigation } from "@/components/layout/mobile-navigation"

export type NavItem = {
  label: string
  hasDropdown: boolean
}

export function SiteHeader({ items }: { items: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main navigation"
        className={`transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          scrolled
            ? "bg-[color:var(--cinopse-primary)]/95 shadow-[0_10px_30px_-16px_rgba(15,44,88,0.6)] backdrop-blur-md"
            : "bg-gradient-to-b from-black/45 to-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center px-6 transition-all duration-500 lg:px-10 ${
            scrolled ? "min-h-[64px]" : "min-h-[84px]"
          }`}
        >
          <Link
            href="#home"
            className="group flex items-center gap-3 text-white"
            aria-label="CiNOPSE India 2026 home"
          >
            <span className="relative inline-flex">
              <span className="absolute -inset-0.5 rounded-full bg-[image:var(--cinopse-gradient-gold)] opacity-70 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />
              <Image
                src="/logo.jpg"
                alt="CiNOPSE"
                width={64}
                height={64}
                priority
                className={`relative rounded-full border-2 border-white/85 object-cover transition-all duration-500 ${
                  scrolled ? "size-12" : "size-14"
                }`}
              />
            </span>
          </Link>

          <div className="ml-auto hidden items-center gap-0.5 xl:flex">
            {items.map(({ label, hasDropdown }) =>
              hasDropdown ? (
                <div key={label} className="group relative">
                  <span className="relative flex cursor-default items-center gap-1 px-3.5 py-6 text-[11px] font-semibold tracking-[0.06em] text-white/90 uppercase transition-colors group-hover:text-white">
                    {label}
                    <ChevronDown className="size-3 transition-transform duration-300 group-hover:rotate-180" />
                    <span className="absolute inset-x-3.5 bottom-4 h-0.5 origin-left scale-x-0 rounded-full bg-[image:var(--cinopse-gradient-gold)] transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <div className="invisible absolute right-0 top-full min-w-56 translate-y-2 overflow-hidden rounded-xl border-t-2 border-[color:var(--cinopse-accent)] bg-white/98 py-2 opacity-0 shadow-[0_24px_50px_-20px_rgba(15,44,88,0.45)] backdrop-blur transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {["Lorem ipsum", "Lorem ipsum"].map((entry, i) => (
                      <Link
                        key={i}
                        href="#"
                        className="block px-4 py-2.5 text-sm text-[color:var(--cinopse-text)] transition-colors hover:bg-[color:var(--cinopse-surface)] hover:text-[color:var(--cinopse-primary)]"
                      >
                        {entry}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={label}
                  href="#"
                  className="group relative px-3.5 py-6 text-[11px] font-semibold tracking-[0.06em] text-white/90 uppercase transition-colors hover:text-white"
                >
                  {label}
                  <span className="absolute inset-x-3.5 bottom-4 h-0.5 origin-left scale-x-0 rounded-full bg-[image:var(--cinopse-gradient-gold)] transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              )
            )}
          </div>

          <div className="ml-auto xl:hidden">
            <MobileNavigation items={items} />
          </div>
        </div>
      </nav>
    </header>
  )
}
