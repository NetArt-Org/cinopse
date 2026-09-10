"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

/**
 * First-load promotional poster for the Karnataka CINOPSE Association (KCA).
 * The whole poster (their logo, shown large) is a single clickable link to
 * cinopseassociation.in. It appears on first load, then not again for 24 hours.
 * Dismiss via the close icon, overlay click or Escape.
 */
const TARGET_URL = "https://cinopseassociation.in/"
const STORAGE_KEY = "cinopse:association-popup-last-shown"
const SHOW_INTERVAL_MS = 24 * 60 * 60 * 1000 // 1 day

export function AssociationPosterPopup() {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)

  // Show once, then not again until 24h have passed.
  useEffect(() => {
    try {
      const last = Number(localStorage.getItem(STORAGE_KEY))
      if (last && Date.now() - last < SHOW_INTERVAL_MS) return
    } catch {
      // localStorage unavailable — still show once for this page load.
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
      localStorage.setItem(STORAGE_KEY, String(Date.now()))
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
          className="group block overflow-hidden rounded-2xl bg-[image:var(--cinopse-gradient-reference-blue)] shadow-[0_30px_80px_rgba(6,26,58,0.55)] ring-1 ring-white/15"
        >
          {/* Poster: their logo shown large */}
          <div className="flex flex-col items-center px-8 pt-10 pb-9 text-center">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-[color:var(--cinopse-accent)] uppercase">
              In Collaboration With
            </p>

            <span className="mt-6 grid aspect-square w-full max-w-[260px] place-items-center rounded-full bg-white p-6 shadow-[0_18px_44px_rgba(6,26,58,0.5)] transition-transform duration-500 ease-out group-hover:scale-[1.03]">
              <Image
                src="/images/cinopseassociation-logo.png"
                alt="Karnataka CINOPSE Association logo"
                width={479}
                height={451}
                priority
                className="size-full object-contain"
              />
            </span>

            <h2 className="font-display mt-7 text-2xl leading-tight font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              Karnataka CINOPSE Association
            </h2>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/85 transition-transform duration-300 group-hover:translate-x-0.5">
              Tap to visit
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </a>
      </div>
    </div>
  )
}
