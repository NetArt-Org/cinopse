import "server-only"

const registrationDocType = "Cinopse Registration"

export type ErpRegistration = {
  name: string
  full_name: string
  category: string
  status: string
  amount: number | string
  payment_status: string
  registration_date: string
  mobile?: string
  email?: string
  city?: string
  hospital?: string
  payment_date?: string
  transaction_id?: string
  remarks?: string
  custom_coupon_amount?: number | string
  custom_coupon_code?: string
  custom_medical_council_number?: string
}

type ErpResponse<T> = {
  data: T
}

type ErpMethodResponse<T> = {
  message: T
}

function getErpConfig() {
  const baseUrl = process.env.ERP_NEXT_BASE_URL?.replace(/\/$/, "")
  const apiKey = process.env.ERP_NEXT_API_KEY
  const apiSecret = process.env.ERP_NEXT_API_SECRET

  if (!baseUrl || !apiKey || !apiSecret) {
    throw new Error("ERPNext is not configured.")
  }

  return { baseUrl, apiKey, apiSecret }
}

async function erpRequest<T>(path: string, init?: RequestInit) {
  const { baseUrl, apiKey, apiSecret } = getErpConfig()
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `token ${apiKey}:${apiSecret}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "")
    const errorMessage = extractErpErrorMessage(errorBody)
    throw new Error(
      response.status === 401 || response.status === 403
        ? "ERPNext rejected the API credentials or DocType permissions."
        : `ERPNext request failed with status ${response.status}${errorMessage ? `: ${errorMessage}` : "."}`,
    )
  }

  return (await response.json()) as ErpResponse<T>
}

async function erpMethodRequest<T>(path: string, init?: RequestInit) {
  const { baseUrl, apiKey, apiSecret } = getErpConfig()
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `token ${apiKey}:${apiSecret}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "")
    const errorMessage = extractErpErrorMessage(errorBody)
    throw new Error(
      response.status === 401 || response.status === 403
        ? "ERPNext rejected the API credentials or method permissions."
        : `ERPNext request failed with status ${response.status}${errorMessage ? `: ${errorMessage}` : "."}`,
    )
  }

  return (await response.json()) as ErpMethodResponse<T>
}


function extractErpErrorMessage(body: string) {
  if (!body) return ""

  try {
    const payload = JSON.parse(body) as {
      exception?: string
      exc_type?: string
      message?: string
      _server_messages?: string
    }
    if (payload._server_messages) {
      const messages = JSON.parse(payload._server_messages) as string[]
      const parsedMessages = messages
        .map((message) => {
          try {
            const parsed = JSON.parse(message) as { message?: string }
            return parsed.message
          } catch {
            return message
          }
        })
        .filter(Boolean)
      if (parsedMessages.length) return parsedMessages.join(" ")
    }

    return payload.message || payload.exception || payload.exc_type || body
  } catch {
    return body
  }
}

export async function createErpRegistration(
  registration: Omit<ErpRegistration, "name"> & {
    mobile: string
    email: string
    city: string
    hospital: string
    remarks: string
    payment_date: string
    transaction_id: string
    uid: string
    google_name: string
    google_email: string
    custom_coupon_amount: number
    custom_coupon_code: string
    custom_medical_council_number: string
  },
) {
  const response = await erpRequest<ErpRegistration>(
    `/api/resource/${encodeURIComponent(registrationDocType)}`,
    {
      method: "POST",
      body: JSON.stringify(registration),
    },
  )

  return response.data
}

export async function getErpRegistration(name: string) {
  const response = await erpRequest<ErpRegistration>(
    `/api/resource/${encodeURIComponent(registrationDocType)}/${encodeURIComponent(name)}`,
  )

  return response.data
}

export async function updateErpRegistration(
  name: string,
  registration: Partial<ErpRegistration>,
) {
  const response = await erpRequest<ErpRegistration>(
    `/api/resource/${encodeURIComponent(registrationDocType)}/${encodeURIComponent(name)}`,
    {
      method: "PUT",
      body: JSON.stringify(registration),
    },
  )

  return response.data
}

export async function findErpRegistrationByGoogleEmail(email: string) {
  const query = new URLSearchParams({
    fields: JSON.stringify([
      "name",
      "full_name",
      "category",
      "status",
      "amount",
      "payment_status",
      "registration_date",
      "mobile",
      "email",
      "city",
      "hospital",
      "payment_date",
      "transaction_id",
      "remarks",
      "custom_coupon_amount",
      "custom_coupon_code",
      "custom_medical_council_number",
    ]),
    filters: JSON.stringify([["google_email", "=", email]]),
    order_by: "creation desc",
    limit_page_length: "1",
  })
  const response = await erpRequest<ErpRegistration[]>(
    `/api/resource/${encodeURIComponent(registrationDocType)}?${query.toString()}`,
  )

  return response.data[0] ?? null
}

export async function countErpRegistrationsByCouponCode(couponCode: string) {
  const query = new URLSearchParams({
    doctype: registrationDocType,
    filters: JSON.stringify({ custom_coupon_code: couponCode }),
  })
  const response = await erpMethodRequest<number>(
    `/api/method/frappe.client.get_count?${query.toString()}`,
  )

  return response.message
}
