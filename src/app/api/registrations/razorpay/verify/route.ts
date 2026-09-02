import { NextRequest, NextResponse } from "next/server"

import {
  getErpRegistration,
  updateErpRegistration,
} from "@/lib/erpnext-client"
import { toIndiaErpDateTime } from "@/lib/india-datetime"
import { verifyRazorpayPaymentSignature } from "@/lib/razorpay-client"
import { sendRegistrationWhatsAppNotificationSafely } from "@/lib/whapi-client"

type VerifyPaymentRequest = {
  registrationName?: unknown
  razorpay_order_id?: unknown
  razorpay_payment_id?: unknown
  razorpay_signature?: unknown
}

const eventDateLabel = "Sunday, 27 September 2026"
const venue = "Jawaharlal Nehru Planetarium, Sankey Road, Bengaluru"

export async function POST(request: NextRequest) {
  try {
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

    // Idempotent: the Razorpay `payment.captured` webhook can confirm this
    // registration before the browser's verify call arrives. If it's already
    // marked paid, return success instead of a false "order mismatch" error.
    if (registration.payment_status === "Success") {
      return NextResponse.json({ registration })
    }

    // The signature is the authoritative proof that this order + payment are
    // genuine and issued by Razorpay for our account.
    const isValidPayment = verifyRazorpayPaymentSignature({
      orderId,
      paymentId,
      signature,
    })

    if (!isValidPayment) {
      return NextResponse.json({ message: "Payment signature verification failed." }, { status: 400 })
    }

    // Ensure the payment's order belongs to this registration. `transaction_id`
    // holds the order id before confirmation, but a webhook that raced ahead may
    // have already swapped it for the payment id — accept either.
    if (
      registration.transaction_id &&
      registration.transaction_id !== orderId &&
      registration.transaction_id !== paymentId
    ) {
      return NextResponse.json({ message: "Payment order does not match this registration." }, { status: 400 })
    }

    const updatedRegistration = await updateErpRegistration(registrationName, {
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
