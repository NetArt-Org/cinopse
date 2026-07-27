"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

import { Button } from "@/components/ui/button"

const audiences = ["Delegate", "Student / HCP", "International"]

const phases = [
  { name: "Early", window: "Registration window coming soon", status: "Closed", prices: ["₹8,500", "₹5,500", "$180"] },
  { name: "Standard", window: "Registration window coming soon", status: "Open now", prices: ["₹10,500", "₹6,500", "$220"] },
  { name: "Late", window: "Registration window coming soon", status: "Upcoming", prices: ["₹12,500", "₹7,500", "$260"] },
  { name: "On-site", window: "Registration window coming soon", status: "Upcoming", prices: ["₹14,000", "₹8,500", "$300"] },
]

gsap.registerPlugin(useGSAP)

export function RegistrationPriceComparison() {
  const root = useRef<HTMLDivElement>(null)
  const [audience, setAudience] = useState(0)

  useGSAP(
    () => {
      const prices = root.current?.querySelectorAll<HTMLElement>("[data-registration-price]")

      if (!prices?.length) return

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(prices, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, duration: 0.3, stagger: 0.06, y: 0 })
    },
    { dependencies: [audience], revertOnUpdate: true, scope: root }
  )

  return (
    <div ref={root} className="mx-auto mt-14 max-w-4xl">
      <div className="mx-auto grid max-w-md grid-cols-3 rounded-full border border-white/20 bg-white/10 p-1.5">
        {audiences.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setAudience(index)}
            className={`rounded-full px-3 py-3 text-xs font-semibold transition-all duration-300 sm:text-sm ${
              audience === index ? "bg-white text-[color:var(--cinopse-primary)] shadow-[0_3px_12px_rgba(6,26,58,.25)]" : "text-white/70 hover:text-white"
            }`}
            aria-pressed={audience === index}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mt-5 text-center text-sm text-white/70">Demo pricing for {audiences[audience].toLowerCase()} attendees.</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase) => {
          const isOpen = phase.status === "Open now"

          return (
            <article
              key={phase.name}
              className={`relative rounded-2xl border p-5 text-center transition-transform duration-300 ${
                isOpen ? "-translate-y-1 border-white bg-white shadow-[0_16px_32px_rgba(6,26,58,.28)]" : "border-white/15 bg-white/8"
              }`}
            >
              {isOpen && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--cinopse-accent)] px-3 py-1 text-[10px] font-bold text-[color:var(--cinopse-primary)]">Open Now</span>}
              <h3 className={`font-display text-xl font-semibold ${isOpen ? "text-[color:var(--cinopse-primary)]" : "text-white"}`}>{phase.name}</h3>
              <p className={`mt-2 min-h-9 text-[11px] leading-4 ${isOpen ? "text-[color:var(--cinopse-text-secondary)]" : "text-white/55"}`}>{phase.window}</p>
              <div data-registration-price className="mt-5 flex h-9 items-center justify-center overflow-hidden">
                <span className={`font-display text-2xl font-semibold ${isOpen ? "text-[color:var(--cinopse-primary)]" : "text-white"}`}>{phase.prices[audience]}</span>
              </div>
              <p className={`mt-4 text-[10px] font-semibold ${isOpen ? "text-emerald-600" : "text-white/45"}`}>{phase.status === "Closed" ? "CLOSED" : phase.status === "Open now" ? "BEST AVAILABLE RATE" : "UPCOMING"}</p>
            </article>
          )
        })}
      </div>

      <div className="mt-7 flex flex-col gap-5 rounded-2xl border border-white/15 bg-white/8 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="max-w-lg text-sm leading-6 text-white/75">Demo rates are shown for layout preview. Official registration fees will be published with the final programme.</p>
        <Button variant="onBlue" className="shrink-0">Notify Me</Button>
      </div>
    </div>
  )
}
