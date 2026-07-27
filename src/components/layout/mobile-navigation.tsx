"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

type NavigationItem = {
  label: string
  hasDropdown: boolean
}

export function MobileNavigation({ items }: { items: NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex size-10 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Open navigation"
        aria-expanded={isOpen}
      >
        <Menu className="size-5" />
      </button>
      <div
        className={`fixed inset-0 z-[60] flex min-h-dvh flex-col bg-[color:var(--cinopse-primary)] px-6 py-6 text-white transition-all duration-300 ease-out ${
          isOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-white/20 pb-5">
          <span className="text-sm font-bold tracking-[0.08em] uppercase">CiNOPSE India 2026</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex size-10 items-center justify-center border border-white/40 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="my-auto flex flex-col" aria-label="Mobile navigation">
          {items.map(({ label }) => (
            <Link
              key={label}
              href={label === "Home" ? "#home" : "#"}
              onClick={() => setIsOpen(false)}
              className="border-b border-white/20 py-5 text-xl font-semibold transition-colors hover:text-[color:var(--cinopse-accent)]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-xs tracking-[0.12em] text-white/60 uppercase">Independent multidisciplinary medical conference</p>
      </div>
    </div>
  )
}
