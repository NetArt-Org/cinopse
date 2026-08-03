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
  payment_method?: string
  payment_date?: string | null
  transaction_id?: string
  remarks?: string
  custom_coupon_amount?: number | string
  custom_coupon_code?: string
}

type ErpResponse<T> = {
  data: T
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
    throw new Error(
      response.status === 401 || response.status === 403
        ? "ERPNext rejected the API credentials or DocType permissions."
        : `ERPNext request failed with status ${response.status}.`,
    )
  }

  return (await response.json()) as ErpResponse<T>
}

export async function createErpRegistration(
  registration: Omit<ErpRegistration, "name"> & {
    mobile: string
    email: string
    city: string
    hospital: string
    remarks: string
    payment_method: string
    payment_date: string | null
    transaction_id: string
    uid: string
    google_name: string
    google_email: string
    custom_coupon_amount: number
    custom_coupon_code: string
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
      "payment_method",
      "payment_date",
      "transaction_id",
      "remarks",
      "custom_coupon_amount",
      "custom_coupon_code",
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
