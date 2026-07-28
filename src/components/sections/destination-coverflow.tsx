"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"

export type DestinationCard = {
  title: string
  description: string
  image: string
  alt: string
}

const faceTransforms = [
  "[transform:rotateY(0deg)_translateZ(250px)] max-[420px]:[transform:rotateY(0deg)_translateZ(205px)]",
  "[transform:rotateY(120deg)_translateZ(250px)] max-[420px]:[transform:rotateY(120deg)_translateZ(205px)]",
  "[transform:rotateY(240deg)_translateZ(250px)] max-[420px]:[transform:rotateY(240deg)_translateZ(205px)]",
]

gsap.registerPlugin(useGSAP)

export function DestinationCoverflow({ cards }: { cards: DestinationCard[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useGSAP(
    () => {
      const ring = ringRef.current
      if (!ring) return

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const rotation = active * -120

      if (reduceMotion) {
        gsap.set(ring, { rotationY: rotation })
        return
      }

      gsap.to(ring, {
        duration: 0.95,
        ease: "back.out(1.45)",
        overwrite: "auto",
        rotationY: rotation,
      })
    },
    { scope: rootRef, dependencies: [active] }
  )

  useEffect(() => {
    if (paused || cards.length < 2) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % cards.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [cards.length, paused])

  function goTo(index: number) {
    setActive((index + cards.length) % cards.length)
  }

  return (
    <div
      ref={rootRef}
      className="relative z-10 grid min-h-[400px] place-items-center overflow-hidden px-6 py-11 pb-14"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,#0d3169_0%,#1d4f9c_70%,#2a63b5_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_25%_20%,rgba(255,255,255,.22),transparent_24%),radial-gradient(circle_at_80%_76%,rgba(217,164,65,.28),transparent_26%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 h-[220px] w-[320px] [perspective:1100px] max-[420px]:h-[180px] max-[420px]:w-[250px]">
        <div
          ref={ringRef}
          className="absolute inset-0 [transform-style:preserve-3d]"
        >
          {cards.map((card, index) => (
            <figure
              key={card.title}
              className={`absolute inset-0 overflow-hidden rounded-2xl shadow-[0_18px_44px_rgba(6,26,58,.45)] ${faceTransforms[index]}`}
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 420px) 250px, 320px"
                className="object-cover object-top"
                draggable={false}
              />
              <span
                className={`absolute inset-0 bg-[color:var(--cinopse-primary-deep)] transition-opacity duration-700 ${
                  active === index ? "opacity-0" : "opacity-45"
                }`}
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-[linear-gradient(transparent,rgba(6,26,58,.92))] px-4 pt-10 pb-3.5 text-white">
                <b className="font-display text-[15px] leading-tight font-semibold">
                  {card.title}
                </b>
                <span className="text-[10.5px] leading-normal font-light text-white/65">
                  {card.description}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active - 1)}
          className="absolute top-1/2 -left-14 z-20 grid size-[38px] -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/12 text-white backdrop-blur-md transition-[transform,background] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-x-0.5 hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-[color:var(--cinopse-accent)] focus-visible:outline-none max-[420px]:-left-11"
          aria-label="Previous destination"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          className="absolute top-1/2 -right-14 z-20 grid size-[38px] -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/12 text-white backdrop-blur-md transition-[transform,background] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:translate-x-0.5 hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-[color:var(--cinopse-accent)] focus-visible:outline-none max-[420px]:-right-11"
          aria-label="Next destination"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-2">
        {cards.map((card, index) => (
          <button
            key={card.title}
            type="button"
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-[width,background] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] ${
              active === index
                ? "w-[22px] bg-[color:var(--cinopse-accent)]"
                : "w-2 bg-white/35"
            }`}
            aria-label={`Show ${card.title}`}
          />
        ))}
      </div>
    </div>
  )
}
