"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Unified, declarative motion system for the homepage.
 *
 * Scroll reveals (data attributes on server-rendered markup):
 *  - [data-reveal]                    fade + rise into view
 *  - [data-reveal="left" | "right"]   slide in from the side
 *  - [data-reveal="scale"]            fade + subtle scale up
 *  - [data-reveal-group]              stagger direct [data-reveal] descendants
 *  - [data-parallax="0.2"]            scrubbed vertical parallax (0–1 strength)
 *
 * Reveals are bidirectional: they play in as elements enter and reverse out as
 * they leave upward. If the viewport height can't be measured (some headless
 * preview environments report 0), everything is revealed instantly so content
 * is never hidden. Reduced-motion users skip animation entirely.
 *
 * Hover (data attributes):
 *  - [data-card]         GSAP-driven lift + fill on pointer enter/leave
 *  - [data-card-fill]    the fill overlay animated inside a [data-card]
 */
export function GsapProvider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      const cleanups: Array<() => void> = []

      // ---- Unified card hover (GSAP-driven lift + fill) ----------------
      if (!prefersReduced) {
        scope.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
          const fill = card.querySelector<HTMLElement>("[data-card-fill]")
          const enter = () => {
            card.classList.add("is-hovering")
            gsap.to(card, {
              y: -8,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            })
            if (fill)
              gsap.to(fill, {
                autoAlpha: 1,
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto",
              })
          }
          const leave = () => {
            card.classList.remove("is-hovering")
            gsap.to(card, {
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            })
            if (fill)
              gsap.to(fill, {
                autoAlpha: 0,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              })
          }
          card.addEventListener("mouseenter", enter)
          card.addEventListener("mouseleave", leave)
          cleanups.push(() => {
            card.removeEventListener("mouseenter", enter)
            card.removeEventListener("mouseleave", leave)
          })
        })
      }

      // ---- Scroll reveals ---------------------------------------------
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

      const allReveals = gsap.utils.toArray<HTMLElement>(
        scope.querySelectorAll("[data-reveal]")
      )
      const viewport =
        window.innerHeight || document.documentElement.clientHeight || 0

      // No-animation path: reveal instantly (reduced motion, or an environment
      // whose viewport height can't be measured — which breaks scroll math).
      if (prefersReduced || viewport === 0) {
        gsap.set(allReveals, { autoAlpha: 1, clearProps: "transform,opacity" })
        return () => cleanups.forEach((fn) => fn())
      }

      const media = gsap.matchMedia()

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const groups = gsap.utils.toArray<HTMLElement>(
          scope.querySelectorAll("[data-reveal-group]")
        )
        const singles = gsap.utils
          .toArray<HTMLElement>(scope.querySelectorAll("[data-reveal]"))
          .filter((el) => !el.closest("[data-reveal-group]"))

        // Pre-hide everything that animates in.
        allReveals.forEach((el) => gsap.set(el, fromVars(el)))

        const show = (targets: HTMLElement[], stagger: number) =>
          gsap.to(targets, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            stagger,
            overwrite: "auto",
          })

        const hide = (targets: HTMLElement[], stagger: number) =>
          gsap.to(targets, {
            autoAlpha: 0,
            y: 24,
            duration: 0.4,
            ease: "power2.in",
            stagger,
            overwrite: "auto",
          })

        // Grouped, staggered, bidirectional reveals. batch fires onEnter for
        // elements already in view on load and reverses on scroll-up.
        groups.forEach((group) => {
          const items = gsap.utils.toArray<HTMLElement>(
            group.querySelectorAll("[data-reveal]")
          )
          if (!items.length) return
          ScrollTrigger.batch(items, {
            start: "top 86%",
            onEnter: (b) => show(b as HTMLElement[], 0.09),
            onLeaveBack: (b) => hide(b as HTMLElement[], 0.05),
          })
        })

        if (singles.length) {
          ScrollTrigger.batch(singles, {
            start: "top 90%",
            onEnter: (b) => show(b as HTMLElement[], 0.08),
            onLeaveBack: (b) => hide(b as HTMLElement[], 0.04),
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
            const r = el.getBoundingClientRect()
            const inView = r.top < window.innerHeight && r.bottom > 0
            if (inView && parseFloat(getComputedStyle(el).opacity) < 1)
              gsap.to(el, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.5 })
          })
        }, 1800)

        return () => window.clearTimeout(safety)
      })

      return () => {
        media.revert()
        cleanups.forEach((fn) => fn())
      }
    },
    { scope: root }
  )

  return <div ref={root}>{children}</div>
}
