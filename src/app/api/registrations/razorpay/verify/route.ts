import { NextRequest, NextResponse } from "next/server"

import {
  getErpRegistration,
  updateErpRegistration,
} from "@/lib/erpnext-client"
import { verifyFirebaseIdToken } from "@/lib/firebase-admin-rest"
import { verifyRazorpayPaymentSignature } from "@/lib/razorpay-client"
import { sendRegistrationWhatsAppNotificationSafely } from "@/lib/whapi-client"

type VerifyPaymentRequest = {
  registrationName?: unknown
  razorpay_order_id?: unknown
  razorpay_payment_id?: unknown
  razorpay_signature?: unknown
}

function getBearerToken(request: NextRequest) {
  const value = request.headers.get("authorization")
  return value?.startsWith("Bearer ") ? value.slice(7) : ""
}

function toErpDate(date = new Date()) {
  return date.toISOString().slice(0, 19).replace("T", " ")
}

const eventDateLabel = "Sunday, 27 September 2026"
const venue = "Jawaharlal Nehru Planetarium, Sankey Road, Bengaluru"

export async function POST(request: NextRequest) {
  try {
    const idToken = getBearerToken(request)
    if (!idToken) return NextResponse.json({ message: "Sign in is required." }, { status: 401 })

    const user = await verifyFirebaseIdToken(idToken)
    const body = (await request.json()) as VerifyPaymentRequest
    const registrationName =
      typeof body.registrationName === "string" ? body.registrationName.trim() : ""
    const orderId =
      typeof body.razorpay_order_id === "string" ? body.razorpay_order_id.trim() : ""
    const paymentId =
      typeof body.razorpay_payment_id === "string" ? body.razorpay_payment_id.trim() : ""
    const signature =
      typeof body.razorpay_signature === "string" ? body.razorpay_signature.trim() : ""

    if (!registrationName || !orderId || !paymentId || !signature) {
      return NextResponse.json({ message: "Payment verification details are missing." }, { status: 400 })
    }

    const registration = await getErpRegistration(registrationName)
    if (registration.email !== user.email) {
      return NextResponse.json({ message: "Registration does not belong to this account." }, { status: 403 })
    }

    if (registration.transaction_id !== orderId) {
      return NextResponse.json({ message: "Payment order does not match this registration." }, { status: 400 })
    }

    const isValidPayment = verifyRazorpayPaymentSignature({
      orderId,
      paymentId,
      signature,
    })

    if (!isValidPayment) {
      return NextResponse.json({ message: "Payment signature verification failed." }, { status: 400 })
    }

    const updatedRegistration = await updateErpRegistration(registrationName, {
      status: "Confirmed",
      payment_status: "Success",
      payment_date: toErpDate(),
      transaction_id: paymentId,
    })

    await sendRegistrationWhatsAppNotificationSafely({
      kind: "payment-confirmed",
      registration: {
        ...updatedRegistration,
        transaction_id: paymentId,
      },
      eventDateLabel,
      venue,
    })

    return NextResponse.json({ registration: updatedRegistration })
  } catch (error) {
    console.error("Razorpay payment verification failed", error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to verify payment right now.",
      },
      { status: 502 },
    )
  }
}
