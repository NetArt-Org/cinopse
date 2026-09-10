"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

/**
 * First-load promotional popup for the CiNOPSE Association site. Shows a
 * clickable poster (opens cinopseassociation.in), once per browser session.
 * Dismiss via the close icon, clicking the overlay, or Escape.
 *
 * To change the poster, replace `public/images/association-poster.jpg`.
 */
const POSTER_SRC = "/images/association-poster.jpg"
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
    // Let the fade-out finish before unmounting.
    window.setTimeout(() => setOpen(false), 250)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CiNOPSE Association"
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
          className="absolute -top-3 -right-3 z-10 grid size-9 place-items-center rounded-full bg-white text-[color:var(--cinopse-primary)] shadow-[0_6px_18px_rgba(6,26,58,0.35)] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <a
          href={TARGET_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="block overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(6,26,58,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={POSTER_SRC}
            alt="Visit the CiNOPSE Association"
            onError={close}
            className="block h-auto max-h-[85vh] w-full object-contain"
          />
        </a>
      </div>
    </div>
  )
}
