"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function ScrollReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const targets = root.current?.querySelectorAll<HTMLElement>(
        "main h1, main h2, main p, main a, main button"
      )

      if (!targets?.length) {
        return
      }

      const media = gsap.matchMedia()

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(targets, { autoAlpha: 0, y: 20 })

        ScrollTrigger.batch(targets, {
          start: "top 88%",
          end: "bottom 12%",
          onEnter: (elements) =>
            gsap.to(elements, {
              autoAlpha: 1,
              duration: 0.55,
              ease: "power2.out",
              overwrite: "auto",
              stagger: 0.06,
              y: 0,
            }),
          onEnterBack: (elements) =>
            gsap.to(elements, {
              autoAlpha: 1,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
              stagger: 0.04,
              y: 0,
            }),
          onLeaveBack: (elements) =>
            gsap.to(elements, {
              autoAlpha: 0,
              duration: 0.3,
              ease: "power2.in",
              overwrite: "auto",
              y: 20,
            }),
        })
      })

      return () => media.revert()
    },
    { scope: root }
  )

  return <div ref={root}>{children}</div>
}
