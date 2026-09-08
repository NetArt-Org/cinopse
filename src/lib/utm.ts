/**
 * UTM / paid-traffic attribution capture.
 *
 * When a visitor arrives from a tagged/paid link (utm_* params or a Facebook
 * `fbclid`), we persist those values so they're still available whenever the
 * visitor later submits the registration form — even after navigating between
 * pages, bouncing through the payment gateway, or reopening the link in a
 * different browser.
 *
 * Persistence is redundant on purpose (ad traffic is lossy, especially inside
 * Meta's in-app browsers): values are written to BOTH localStorage and a
 * first-party cookie. An early inline script in the document head captures on
 * first paint (before hydration); this module re-captures on mount and reads
 * from whichever store still has the values. The cookie is also sent with the
 * same-origin registration request, so the server can recover the values even
 * if client JS attaches nothing.
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
export const UTM_COOKIE_NAME = "cinopse_utm"
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90 // 90 days

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

function sanitize(parsed: Partial<Record<keyof UtmParams, unknown>>): UtmParams {
  const result: UtmParams = {}
  for (const field of UTM_FIELD_NAMES) {
    const value = parsed[field]
    if (typeof value === "string" && value.trim()) {
      result[field] = value.trim()
    }
  }
  return result
}

function writeCookie(json: string) {
  try {
    const secure = window.location.protocol === "https:" ? ";secure" : ""
    document.cookie = `${UTM_COOKIE_NAME}=${encodeURIComponent(json)};path=/;max-age=${COOKIE_MAX_AGE_SECONDS};samesite=lax${secure}`
  } catch {
    // Ignore cookie write failures.
  }
}

function readCookie(): UtmParams {
  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${UTM_COOKIE_NAME}=([^;]+)`),
    )
    if (!match) return {}
    return sanitize(JSON.parse(decodeURIComponent(match[1])))
  } catch {
    return {}
  }
}

/**
 * Read tracking params from the current URL and persist them (localStorage +
 * cookie), but only if the URL actually contains at least one — so organic
 * visits never overwrite a previously captured campaign.
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
      const json = JSON.stringify(captured)
      try {
        window.localStorage.setItem(STORAGE_KEY, json)
      } catch {
        // Ignore storage failures (private mode, disabled storage, etc.).
      }
      writeCookie(json)
    }
  } catch {
    // Ignore parsing errors.
  }
}

/**
 * Return the stored tracking params, preferring localStorage and falling back
 * to the cookie. Empty object when the visitor did not arrive through a
 * tagged/paid link.
 */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {}

  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    raw = null
  }

  if (raw) {
    try {
      const fromStorage = sanitize(JSON.parse(raw))
      if (Object.keys(fromStorage).length) return fromStorage
    } catch {
      // Fall through to the cookie.
    }
  }

  return readCookie()
}
