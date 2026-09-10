"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

/**
 * First-load promotional poster for the Karnataka CINOPSE Association (KCA).
 * The whole poster is a single clickable link to cinopseassociation.in, shown
 * once per browser session. Dismiss via the close icon, overlay click or Escape.
 */
const TARGET_URL = "https://cinopseassociation.in/"
const SESSION_KEY = "cinopse:association-popup-seen"

export function AssociationPosterPopup() {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)

  // Show shortly after first load of the session only (lets the page paint).
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
    } catch {
      // sessionStorage unavailable — still show once for this page load.
    }
    const timer = window.setTimeout(() => {
      setOpen(true)
      requestAnimationFrame(() => setShown(true))
    }, 500)
    return () => window.clearTimeout(timer)
  }, [])

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  function close() {
    setShown(false)
    try {
      sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      // Ignore storage failures.
    }
    window.setTimeout(() => setOpen(false), 250)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Karnataka CINOPSE Association"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}
      className={`fixed inset-0 z-[9990] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm transition-opacity duration-300 ease-out ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`relative w-full max-w-md transition-[transform,opacity] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] ${
          shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute -top-3 -right-3 z-10 grid size-9 place-items-center rounded-full bg-white text-[color:var(--cinopse-primary)] shadow-[0_6px_18px_rgba(6,26,58,0.4)] transition-[transform,background] duration-200 hover:rotate-90 hover:bg-[color:var(--cinopse-accent)] hover:text-[color:var(--cinopse-primary-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <a
          href={TARGET_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          aria-label="Visit the Karnataka CINOPSE Association website"
          className="group block overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(6,26,58,0.55)] ring-1 ring-white/15"
        >
          {/* Poster: their banner as backdrop with their logo + name */}
          <div className="relative aspect-[4/5] w-full sm:aspect-[3/4]">
            <Image
              src="/images/kca-hero.jpg"
              alt="Karnataka CINOPSE Association"
              fill
              priority
              sizes="(max-width: 640px) 90vw, 448px"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            {/* Legibility wash */}
            <div className="absolute inset-0 bg-[image:linear-gradient(180deg,rgba(6,26,58,0.55)_0%,rgba(6,26,58,0.35)_42%,rgba(6,26,58,0.9)_100%)]" />

            <div className="absolute inset-0 flex flex-col items-center justify-between px-6 py-9 text-center">
              <span className="grid size-28 place-items-center rounded-full bg-white p-2.5 shadow-[0_12px_30px_rgba(6,26,58,0.45)]">
                <Image
                  src="/images/cinopseassociation-logo.png"
                  alt="Karnataka CINOPSE Association logo"
                  width={479}
                  height={451}
                  className="size-full object-contain"
                />
              </span>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[color:var(--cinopse-accent)] uppercase">
                  In Collaboration With
                </p>
                <h2 className="font-display mt-2 text-2xl leading-tight font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  Karnataka CINOPSE
                  <br />
                  Association
                </h2>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/90 transition-transform duration-300 group-hover:translate-x-0.5">
                  Tap to visit
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
