import { NextRequest, NextResponse } from "next/server"

import {
  findErpRegistrationByTransactionId,
  updateErpRegistration,
} from "@/lib/erpnext-client"
import { toIndiaErpDateTime } from "@/lib/india-datetime"
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay-client"
import { sendRegistrationWhatsAppNotificationSafely } from "@/lib/whapi-client"

type RazorpayWebhookPayload = {
  event?: string
  payload?: {
    payment?: {
      entity?: {
        id?: string
        order_id?: string
        status?: string
      }
    }
  }
}

const eventDateLabel = "Sunday, 27 September 2026"
const venue = "Jawaharlal Nehru Planetarium, Sankey Road, Bengaluru"

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get("x-razorpay-signature") ?? ""

    if (!signature || !verifyRazorpayWebhookSignature({ body: rawBody, signature })) {
      return NextResponse.json({ message: "Invalid webhook signature." }, { status: 400 })
    }

    const payload = JSON.parse(rawBody) as RazorpayWebhookPayload
    const payment = payload.payload?.payment?.entity
    const paymentId = payment?.id ?? ""
    const orderId = payment?.order_id ?? ""

    if (payload.event !== "payment.captured" || payment?.status !== "captured") {
      return NextResponse.json({ received: true, ignored: true })
    }

    if (!paymentId || !orderId) {
      return NextResponse.json({ message: "Payment payload is incomplete." }, { status: 400 })
    }

    const registration = await findErpRegistrationByTransactionId(orderId)
    if (!registration) {
      console.error("Razorpay webhook registration not found", { orderId, paymentId })
      return NextResponse.json({ received: true, missingRegistration: true })
    }

    if (registration.payment_status === "Success") {
      return NextResponse.json({ received: true, alreadyUpdated: true })
    }

    const updatedRegistration = await updateErpRegistration(registration.name, {
      status: "Confirmed",
      payment_status: "Success",
      payment_date: toIndiaErpDateTime(),
      transaction_id: paymentId,
    })

    await sendRegistrationWhatsAppNotificationSafely({
      kind: "payment-confirmed",
      registration: {
        ...updatedRegistration,
        email: updatedRegistration.email || registration.email,
        mobile: updatedRegistration.mobile || registration.mobile,
        city: updatedRegistration.city || registration.city,
        hospital: updatedRegistration.hospital || registration.hospital,
        amount: updatedRegistration.amount || registration.amount,
        custom_medical_council_number:
          updatedRegistration.custom_medical_council_number ||
          registration.custom_medical_council_number,
        custom_registration_id:
          updatedRegistration.custom_registration_id ||
          registration.custom_registration_id,
        transaction_id: paymentId,
      },
      eventDateLabel,
      venue,
    })

    return NextResponse.json({ received: true, registration: registration.name })
  } catch (error) {
    console.error("Razorpay webhook handling failed", error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to process Razorpay webhook.",
      },
      { status: 502 },
    )
  }
}
