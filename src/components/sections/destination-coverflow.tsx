"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

const cards = [
  { city: "Mumbai", image: "/images/destination-mumbai.png" },
  { city: "Bengaluru", image: "/images/cinopse-hero-cover.png" },
  { city: "Delhi", image: "/images/destination-delhi.png" },
  { city: "Mumbai", image: "/images/destination-mumbai.png" },
  { city: "Bengaluru", image: "/images/cinopse-hero-cover.png" },
]

const transforms = [
  "[transform:translate(-50%,-50%)_rotateY(0deg)_translateZ(12rem)]",
  "[transform:translate(-50%,-50%)_rotateY(72deg)_translateZ(12rem)]",
  "[transform:translate(-50%,-50%)_rotateY(144deg)_translateZ(12rem)]",
  "[transform:translate(-50%,-50%)_rotateY(216deg)_translateZ(12rem)]",
  "[transform:translate(-50%,-50%)_rotateY(288deg)_translateZ(12rem)]",
]

gsap.registerPlugin(useGSAP)

export function DestinationCoverflow() {
  const root = useRef<HTMLDivElement>(null)
  const [activeCity, setActiveCity] = useState(cards[0].city)

  useGSAP(
    () => {
      const viewport = root.current?.querySelector<HTMLElement>("[data-cylinder-viewport]")
      const ring = root.current?.querySelector<HTMLElement>("[data-cylinder-ring]")
      if (!viewport || !ring) return

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      let rotation = 0
      let activeIndex = 0
      let pointerStart = 0
      let pointerCurrent = 0
      let dragging = false
      let autoRotate: gsap.core.Timeline | undefined
      let resumeDelay: gsap.core.Tween | undefined

      const rotateTo = (nextIndex: number, duration = 1) => {
        activeIndex = (nextIndex + cards.length) % cards.length
        rotation = -activeIndex * 72
        if (prefersReducedMotion) gsap.set(ring, { rotationY: rotation })
        else gsap.to(ring, { duration, ease: "power3.inOut", overwrite: "auto", rotationY: rotation })
        setActiveCity(cards[activeIndex].city)
      }

      const startAutoRotation = () => {
        if (prefersReducedMotion) return
        autoRotate?.kill()
        autoRotate = gsap.timeline({ repeat: -1 })
        autoRotate.to({}, { duration: 2.8 })

        cards.forEach(() => {
          autoRotate
            .to(ring, {
              duration: 1.25,
              ease: "power2.inOut",
              rotationY: "-=72",
              onComplete: () => {
                activeIndex = (activeIndex + 1) % cards.length
                rotation = -activeIndex * 72
                setActiveCity(cards[activeIndex].city)
              },
            })
            .to({}, { duration: 2.8 })
        })
      }

      const onPointerDown = (event: PointerEvent) => {
        dragging = true
        pointerStart = event.clientX
        pointerCurrent = event.clientX
        rotation = Number(gsap.getProperty(ring, "rotationY"))
        viewport.setPointerCapture(event.pointerId)
        resumeDelay?.kill()
        autoRotate?.kill()
      }

      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) return
        pointerCurrent = event.clientX
        gsap.set(ring, { rotationY: rotation + (pointerCurrent - pointerStart) * 0.18 })
      }

      const onPointerUp = (event: PointerEvent) => {
        if (!dragging) return
        dragging = false
        viewport.releasePointerCapture(event.pointerId)
        const distance = pointerCurrent - pointerStart
        if (Math.abs(distance) > 24) rotateTo(activeIndex + (distance > 0 ? -1 : 1), 0.9)
        else rotateTo(activeIndex, 0.55)
        resumeDelay = gsap.delayedCall(Math.abs(distance) > 24 ? 1.2 : 0.85, startAutoRotation)
      }

      viewport.addEventListener("pointerdown", onPointerDown)
      viewport.addEventListener("pointermove", onPointerMove)
      viewport.addEventListener("pointerup", onPointerUp)
      viewport.addEventListener("pointercancel", onPointerUp)
      gsap.set(ring, { rotationY: 0 })
      startAutoRotation()

      return () => {
        autoRotate?.kill()
        resumeDelay?.kill()
        viewport.removeEventListener("pointerdown", onPointerDown)
        viewport.removeEventListener("pointermove", onPointerMove)
        viewport.removeEventListener("pointerup", onPointerUp)
        viewport.removeEventListener("pointercancel", onPointerUp)
      }
    },
    { scope: root }
  )

  return (
    <div ref={root} className="relative flex aspect-square w-full items-end overflow-visible">
      <div data-cylinder-viewport className="absolute inset-0 cursor-grab touch-none [perspective:1000px] active:cursor-grabbing" aria-label="3D carousel featuring Mumbai, Bengaluru, and Delhi">
        <div data-cylinder-ring className="absolute inset-0 [transform-style:preserve-3d]">
          {cards.map((card, index) => (
            <article key={`${card.city}-${index}`} className={`absolute top-1/2 left-1/2 h-[13rem] w-[9rem] overflow-hidden rounded-xl border border-white/60 bg-white shadow-[0_20px_36px_rgba(15,44,88,.24)] sm:h-[15rem] sm:w-[10.5rem] ${transforms[index]}`}>
              <Image src={card.image} alt={`${card.city} destination sample`} fill sizes="(max-width: 640px) 172px, 200px" className="object-cover" draggable={false} />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[color:var(--cinopse-primary-deep)]/95 to-transparent" />
              <p className="absolute right-4 bottom-3 left-4 text-sm font-semibold text-white">{card.city}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="relative z-10 flex w-full items-center justify-between px-2 pb-1 text-xs text-[color:var(--cinopse-primary)]">
        <span className="font-semibold">{activeCity}</span>
        <span className="text-[11px] text-[color:var(--cinopse-text-secondary)]">Drag to explore</span>
      </div>
    </div>
  )
}
