"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Declarative, data-attribute driven scroll animation controller.
 *
 * Usage (in server-rendered markup):
 *  - [data-reveal]                    fade + rise into view
 *  - [data-reveal="left" | "right"]   slide in from the side
 *  - [data-reveal="scale"]            fade + subtle scale up
 *  - [data-reveal-group]              stagger direct [data-reveal] descendants
 *  - [data-parallax="0.2"]            scrubbed vertical parallax (0–1 strength)
 *
 * Reveals are gated behind a measurable viewport. If the viewport height can't
 * be read (some headless/preview environments report 0, which breaks both
 * IntersectionObserver and ScrollTrigger), everything is revealed immediately
 * so content is never left invisible. Reduced-motion users skip animation too.
 */
export function GsapProvider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      const fromVars = (el: HTMLElement) => {
        switch (el.dataset.reveal) {
          case "left":
            return { autoAlpha: 0, x: -48 }
          case "right":
            return { autoAlpha: 0, x: 48 }
          case "scale":
            return { autoAlpha: 0, scale: 0.94, y: 24 }
          default:
            return { autoAlpha: 0, y: 34 }
        }
      }

      const revealNow = (el: HTMLElement, delay = 0) =>
        gsap.to(el, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
          overwrite: "auto",
        })

      const groups = gsap.utils.toArray<HTMLElement>(
        scope.querySelectorAll("[data-reveal-group]")
      )
      const singles = gsap.utils
        .toArray<HTMLElement>(scope.querySelectorAll("[data-reveal]"))
        .filter((el) => !el.closest("[data-reveal-group]"))
      const allReveals = gsap.utils.toArray<HTMLElement>(
        scope.querySelectorAll("[data-reveal]")
      )

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
      const viewport =
        window.innerHeight || document.documentElement.clientHeight || 0

      // No animation path: reveal instantly (reduced motion, or an
      // environment whose viewport height can't be measured).
      if (prefersReduced || viewport === 0) {
        gsap.set(allReveals, { autoAlpha: 1, clearProps: "transform,opacity" })
        return
      }

      const media = gsap.matchMedia()

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Pre-hide, then reveal on scroll via batch — batch fires onEnter for
        // elements already in view on load and as they enter the viewport.
        groups.forEach((g) =>
          g
            .querySelectorAll<HTMLElement>("[data-reveal]")
            .forEach((el) => gsap.set(el, fromVars(el)))
        )
        singles.forEach((el) => gsap.set(el, fromVars(el)))

        groups.forEach((group) => {
          const items = gsap.utils.toArray<HTMLElement>(
            group.querySelectorAll("[data-reveal]")
          )
          if (!items.length) return
          ScrollTrigger.batch(items, {
            start: "top 86%",
            onEnter: (batch) =>
              (batch as HTMLElement[]).forEach((el, i) =>
                revealNow(el, i * 0.08)
              ),
          })
        })

        if (singles.length) {
          ScrollTrigger.batch(singles, {
            start: "top 90%",
            onEnter: (batch) =>
              (batch as HTMLElement[]).forEach((el, i) =>
                revealNow(el, i * 0.06)
              ),
          })
        }

        // Scrubbed parallax.
        gsap.utils
          .toArray<HTMLElement>(scope.querySelectorAll("[data-parallax]"))
          .forEach((el) => {
            const strength = parseFloat(el.dataset.parallax || "0.2")
            gsap.fromTo(
              el,
              { yPercent: -strength * 12 },
              {
                yPercent: strength * 12,
                ease: "none",
                overwrite: "auto",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            )
          })

        // Safety net: force-reveal anything still hidden shortly after load so
        // content can never remain stuck (e.g. if a trigger fails to fire).
        const safety = window.setTimeout(() => {
          allReveals.forEach((el) => {
            if (parseFloat(getComputedStyle(el).opacity) < 1) revealNow(el)
          })
        }, 1600)

        return () => window.clearTimeout(safety)
      })

      return () => media.revert()
    },
    { scope: root }
  )

  return <div ref={root}>{children}</div>
}
