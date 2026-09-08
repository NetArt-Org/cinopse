import { NextResponse, type NextRequest } from "next/server"

// URL query parameter -> ERPNext custom field name.
const UTM_PARAM_TO_FIELD: Record<string, string> = {
  utm_source: "custom_utm_source",
  utm_medium: "custom_utm_medium",
  utm_campaign: "custom_utm_campaign",
  utm_term: "custom_utm_term",
  utm_content: "custom_utm_content",
  fbclid: "custom_fbc_lid",
}

const UTM_COOKIE_NAME = "cinopse_utm"
const UTM_COOKIE_MAX_AGE = 60 * 60 * 24 * 90 // 90 days

/**
 * Server-side UTM capture: on the very first request from a tagged/paid link
 * (before any client JS runs — immune to in-app browsers, blocked scripts,
 * cleared localStorage), persist the tracking params to a first-party cookie.
 * The cookie is then sent with the registration request so ERP + Razorpay get
 * the attribution even if client-side capture never fires.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const params = request.nextUrl.searchParams

  const captured: Record<string, string> = {}
  let hasAny = false

  for (const [param, field] of Object.entries(UTM_PARAM_TO_FIELD)) {
    const value = params.get(param)?.trim()
    if (value) {
      captured[field] = value.slice(0, 500)
      hasAny = true
    }
  }

  // Only set when the URL actually carries params — organic navigations must
  // not overwrite a previously captured campaign.
  if (hasAny) {
    response.cookies.set(UTM_COOKIE_NAME, JSON.stringify(captured), {
      path: "/",
      maxAge: UTM_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      httpOnly: false,
    })
  }

  return response
}

// Run on page navigations only — skip Next internals, the API, and static files.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/|.*\\.).*)"],
}
