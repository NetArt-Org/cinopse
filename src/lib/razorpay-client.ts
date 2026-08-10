import "server-only"

import { createHmac, timingSafeEqual } from "crypto"

type RazorpayOrder = {
  id: string
  amount: number
  currency: string
  receipt: string
  status: string
}

function getRazorpayConfig() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error("Razorpay is not configured.")
  }

  return { keyId, keySecret }
}

export async function createRazorpayOrder({
  amount,
  receipt,
  notes,
}: {
  amount: number
  receipt: string
  notes: Record<string, string>
}) {
  const { keyId, keySecret } = getRazorpayConfig()
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: receipt.slice(0, 40),
      notes,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Razorpay order creation failed with status ${response.status}.`)
  }

  return (await response.json()) as RazorpayOrder
}

export function verifyRazorpayPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string
  paymentId: string
  signature: string
}) {
  const { keySecret } = getRazorpayConfig()
  const expectedSignature = createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex")

  const expected = Buffer.from(expectedSignature)
  const received = Buffer.from(signature)

  return expected.length === received.length && timingSafeEqual(expected, received)
}

export function verifyRazorpayWebhookSignature({
  body,
  signature,
}: {
  body: string
  signature: string
}) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error("Razorpay webhook secret is not configured.")
  }

  const expectedSignature = createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex")
  const expected = Buffer.from(expectedSignature)
  const received = Buffer.from(signature)

  return expected.length === received.length && timingSafeEqual(expected, received)
}
