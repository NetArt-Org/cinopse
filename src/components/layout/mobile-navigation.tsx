"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

type NavigationItem = {
  label: string
  hasDropdown: boolean
}

export function MobileNavigation({ items }: { items: NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Staggered entrance for the drawer links.
  useEffect(() => {
    if (!isOpen || !linksRef.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.from(".m-nav-link", {
        y: 24,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.1,
      })
    }, linksRef)
    return () => ctx.revert()
  }, [isOpen])

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex size-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Open navigation"
        aria-expanded={isOpen}
      >
        <Menu className="size-5" />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={panelRef}
        className={`fixed inset-y-0 right-0 z-[60] flex w-[88%] max-w-sm flex-col overflow-y-auto bg-[image:var(--cinopse-gradient-deep)] px-6 py-6 text-white shadow-2xl transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="CiNOPSE"
              width={40}
              height={40}
              className="size-10 rounded-full border border-white/40 object-cover"
            />
            <span className="text-xs font-bold tracking-[0.08em] uppercase">
              CiNOPSE India 2026
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex size-10 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav
          ref={linksRef}
          className="my-auto flex flex-col py-8"
          aria-label="Mobile navigation"
        >
          {items.map(({ label }) => (
            <Link
              key={label}
              href={label === "Home" ? "#home" : "#"}
              onClick={() => setIsOpen(false)}
              className="m-nav-link group flex items-center justify-between border-b border-white/12 py-4 text-lg font-semibold tracking-tight transition-colors hover:text-[color:var(--cinopse-accent)]"
            >
              {label}
              <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        <p className="text-[11px] tracking-[0.14em] text-white/55 uppercase">
          Independent multidisciplinary medical conference
        </p>
      </div>
    </div>
  )
}
