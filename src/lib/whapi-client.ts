import "server-only"

import type { ErpRegistration } from "@/lib/erpnext-client"

const whapiBaseUrl = process.env.WHAPI_API_URL || "https://gate.whapi.cloud"
const defaultNotificationCopyNumber = "919980251182"

type WhatsAppRegistrationMessageKind =
  | "confirmed"
  | "payment-confirmed"
  | "payment-pending"

type WhatsAppRegistrationMessage = {
  kind: WhatsAppRegistrationMessageKind
  registration: Pick<
    ErpRegistration,
    | "name"
    | "full_name"
    | "category"
    | "amount"
    | "payment_status"
    | "mobile"
    | "email"
    | "city"
    | "hospital"
    | "transaction_id"
    | "custom_medical_council_number"
    | "custom_registration_id"
  >
  eventDateLabel: string
  venue: string
}

export async function sendRegistrationWhatsAppNotification(
  message: WhatsAppRegistrationMessage,
) {
  const token = process.env.WHAPI_TOKEN
  if (!token) return

  const recipients = getWhatsAppRecipients(message.registration.mobile)
  if (!recipients.length) return

  const body = buildRegistrationMessageBody(message)

  await Promise.all(
    recipients.map(async (to) => {
      const response = await fetch(`${whapiBaseUrl}/messages/text`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          body,
          typing_time: 0,
          no_link_preview: true,
        }),
      })

      if (!response.ok) {
        const errorBody = await response.text().catch(() => "")
        throw new Error(
          `Whapi notification failed for ${to} with status ${response.status}${errorBody ? `: ${errorBody}` : "."}`,
        )
      }
    }),
  )
}

export async function sendRegistrationWhatsAppNotificationSafely(
  message: WhatsAppRegistrationMessage,
) {
  try {
    await sendRegistrationWhatsAppNotification(message)
  } catch (error) {
    console.error("WhatsApp notification failed", error)
  }
}

function buildRegistrationMessageBody({
  kind,
  registration,
  eventDateLabel,
  venue,
}: WhatsAppRegistrationMessage) {
  const amount = formatAmount(registration.amount)
  const paymentStatus =
    kind === "payment-pending" ? "Pending" : registration.payment_status || "Success"
  const heading =
    kind === "payment-pending"
      ? "Your CINOPSE India 2026 registration has been received."
      : "Your CINOPSE India 2026 registration is confirmed."
  const nextStep =
    kind === "payment-pending"
      ? "Please complete your payment to confirm your registration."
      : "Thank you for completing your registration. Please keep this message for reference."

  return [
    `Dear ${registration.full_name},`,
    "",
    heading,
    "",
    `Registration ID: ${registration.custom_registration_id || registration.name}`,
    `Name: ${registration.full_name}`,
    registration.email ? `Email: ${registration.email}` : "",
    registration.mobile ? `Mobile: ${registration.mobile}` : "",
    `Category: ${registration.category}`,
    registration.city ? `City: ${registration.city}` : "",
    registration.hospital ? `Hospital / Institution: ${registration.hospital}` : "",
    registration.custom_medical_council_number
      ? `Medical Council Number (MCN): ${registration.custom_medical_council_number}`
      : "",
    `Amount: ${amount}`,
    `Payment Status: ${paymentStatus}`,
    registration.transaction_id
      ? `Payment Reference: ${registration.transaction_id}`
      : "",
    "",
    `Event Date: ${eventDateLabel}`,
    `Venue: ${venue}`,
    "",
    nextStep,
    "",
    "For support, contact CINOPSE India at cinopseindiamedical@gmail.com, +91 63817 86183, or +91 99023 40225.",
  ]
    .filter(Boolean)
    .join("\n")
}

function normalizeWhatsAppNumber(value?: string) {
  const digits = value?.replace(/\D/g, "") ?? ""
  if (!digits) return ""

  if (digits.length === 10) return `91${digits}`

  return digits
}

function getWhatsAppRecipients(mobile?: string) {
  return Array.from(
    new Set(
      [normalizeWhatsAppNumber(mobile), defaultNotificationCopyNumber].filter(Boolean),
    ),
  )
}

function formatAmount(amount: number | string) {
  const numericAmount = typeof amount === "number" ? amount : Number(amount)
  if (!Number.isFinite(numericAmount)) return `₹${amount}`

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numericAmount)
}
