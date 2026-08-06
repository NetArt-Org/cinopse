"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

import type { NavItem } from "@/components/layout/site-header"

export function MobileNavigation({
  items,
  onRegister,
  registerLabel = "Register Now",
}: {
  items: NavItem[]
  onRegister: () => void
  registerLabel?: string
}) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !linksRef.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.from(".m-nav-link", {
        y: 20,
        autoAlpha: 0,
        duration: 0.42,
        ease: "power3.out",
        stagger: 0.05,
      })
    }, linksRef)

    return () => ctx.revert()
  }, [isOpen])

  function handleRegister() {
    setIsOpen(false)
    onRegister()
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="grid size-11 place-items-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Open navigation"
        aria-expanded={isOpen}
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Close navigation backdrop"
        tabIndex={isOpen ? 0 : -1}
      />

      <div
        className={`fixed inset-y-0 right-0 z-[60] flex w-[88%] max-w-sm flex-col overflow-y-auto bg-[image:var(--cinopse-gradient-reference-blue)] px-6 py-6 text-white shadow-2xl transition-transform duration-400 ease-[cubic-bezier(.22,.9,.18,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="CINOPSE logo"
              width={40}
              height={40}
              className="size-10 rounded-full bg-white object-cover shadow-[0_3px_10px_rgba(6,26,58,0.3)]"
            />
            <span className="grid gap-1">
              <span className="font-display text-base font-semibold">
                CINOPSE{" "}
                <em className="block font-sans text-[10px] tracking-[0.18em] text-[color:var(--cinopse-accent)] not-italic">
                  INDIA 2026
                </em>
              </span>
              <span className="max-w-[220px] font-sans text-[8px] leading-[1.35] tracking-[0.08em] text-white/60 uppercase">
                Combined Initiative for Nurturing Outcomes through Precision
                Medicine with Scientific Evidence
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="grid size-10 place-items-center rounded-full border border-white/35 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close navigation"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav
          ref={linksRef}
          className="flex flex-1 flex-col py-8"
          aria-label="Mobile navigation"
        >
          {items.map((item) => {
            const isActive = item.href === pathname

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className={`m-nav-link group flex items-center justify-between border-b border-white/12 py-4 text-lg font-medium transition-colors hover:text-[color:var(--cinopse-accent)] ${
                  isActive ? "text-[color:var(--cinopse-accent)]" : ""
                }`}
              >
                {item.label}
                <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            )
          })}
          <button
            type="button"
            onClick={handleRegister}
            className="m-nav-link mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--cinopse-accent)] px-6 py-3 text-sm font-medium text-[color:var(--cinopse-primary-deep)]"
          >
            {registerLabel}
            <span aria-hidden="true">→</span>
          </button>
        </nav>

        <p className="text-[11px] leading-5 tracking-[0.14em] text-white/55 uppercase">
          Combined Initiative for Nurturing Outcomes through Precision Medicine
          with Scientific Evidence
        </p>
      </div>
    </div>
  )
}
