/**
 * UTM / paid-traffic attribution capture.
 *
 * When a visitor arrives from a tagged/paid link (utm_* params or a Facebook
 * `fbclid`), we persist those values so they're still available whenever the
 * visitor later submits the registration form — even after navigating between
 * pages. If the URL carries no tracking params (organic traffic), nothing is
 * stored and the registration's UTM fields stay empty.
 */

export type UtmParams = {
  custom_utm_source?: string
  custom_utm_medium?: string
  custom_utm_campaign?: string
  custom_utm_term?: string
  custom_utm_content?: string
  custom_fbc_lid?: string
}

const STORAGE_KEY = "cinopse:utm"

// URL query parameter -> ERPNext custom field name.
const URL_PARAM_TO_FIELD: Record<string, keyof UtmParams> = {
  utm_source: "custom_utm_source",
  utm_medium: "custom_utm_medium",
  utm_campaign: "custom_utm_campaign",
  utm_term: "custom_utm_term",
  utm_content: "custom_utm_content",
  fbclid: "custom_fbc_lid",
}

export const UTM_FIELD_NAMES = Object.values(URL_PARAM_TO_FIELD)

/**
 * Read tracking params from the current URL and persist them, but only if the
 * URL actually contains at least one — so organic visits never overwrite a
 * previously captured campaign, and never populate the fields.
 */
export function captureUtmParams() {
  if (typeof window === "undefined") return

  try {
    const params = new URLSearchParams(window.location.search)
    const captured: UtmParams = {}
    let hasAny = false

    for (const [param, field] of Object.entries(URL_PARAM_TO_FIELD)) {
      const value = params.get(param)?.trim()
      if (value) {
        captured[field] = value
        hasAny = true
      }
    }

    if (hasAny) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(captured))
    }
  } catch {
    // Ignore storage/parsing errors (private mode, disabled storage, etc.).
  }
}

/**
 * Return the stored tracking params (only non-empty, known fields). Empty
 * object when the visitor did not arrive through a tagged/paid link.
 */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {}

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}

    const parsed = JSON.parse(raw) as Partial<Record<keyof UtmParams, unknown>>
    const result: UtmParams = {}

    for (const field of UTM_FIELD_NAMES) {
      const value = parsed[field]
      if (typeof value === "string" && value.trim()) {
        result[field] = value.trim()
      }
    }

    return result
  } catch {
    return {}
  }
}
