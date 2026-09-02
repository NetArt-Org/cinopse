"use client"

import { useEffect } from "react"

import { captureUtmParams } from "@/lib/utm"

/**
 * Captures UTM / fbclid params from the landing URL on first load and persists
 * them so they can be attached to the registration when the form is submitted.
 * Renders nothing.
 */
export function UtmCapture() {
  useEffect(() => {
    captureUtmParams()
  }, [])

  return null
}
