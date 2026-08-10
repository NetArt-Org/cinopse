import { NextRequest, NextResponse } from "next/server"

import {
  getErpRegistration,
  updateErpRegistration,
} from "@/lib/erpnext-client"
import { verifyFirebaseIdToken } from "@/lib/firebase-admin-rest"
import { createRazorpayOrder } from "@/lib/razorpay-client"

type RetryPaymentRequest = {
  registrationName?: unknown
}

function getBearerToken(request: NextRequest) {
  const value = request.headers.get("authorization")
  return value?.startsWith("Bearer ") ? value.slice(7) : ""
}

function registrationBelongsToUser(
  registration: Awaited<ReturnType<typeof getErpRegistration>>,
  user: Awaited<ReturnType<typeof verifyFirebaseIdToken>>,
) {
  if (registration.uid) return registration.uid === user.uid

  return !registration.google_email || registration.google_email === user.email
}

export async function POST(request: NextRequest) {
  try {
    const idToken = getBearerToken(request)
    if (!idToken) return NextResponse.json({ message: "Sign in is required." }, { status: 401 })

    const user = await verifyFirebaseIdToken(idToken)
    const body = (await request.json()) as RetryPaymentRequest
    const registrationName =
      typeof body.registrationName === "string" ? body.registrationName.trim() : ""

    if (!registrationName) {
      return NextResponse.json({ message: "Registration ID is required." }, { status: 400 })
    }

    const registration = await getErpRegistration(registrationName)
    if (!registrationBelongsToUser(registration, user)) {
      return NextResponse.json({ message: "Registration does not belong to this account." }, { status: 403 })
    }

    if (registration.status !== "Pending" || registration.payment_status !== "Pending") {
      return NextResponse.json(
        { message: "Payment can be retried only for pending registrations." },
        { status: 409 },
      )
    }

    const amount = Number(registration.amount)
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { message: "This registration does not have a payable amount." },
        { status: 400 },
      )
    }

    const order = await createRazorpayOrder({
      amount,
      receipt: registration.name,
      notes: {
        registration: registration.name,
        email: registration.email || "",
        category: registration.category,
      },
    })

    const updatedRegistration = await updateErpRegistration(registration.name, {
      status: "Pending",
      payment_status: "Pending",
      transaction_id: order.id,
    })

    return NextResponse.json({
      registration: updatedRegistration,
      payment: {
        keyId: process.env.RAZORPAY_KEY_ID,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    })
  } catch (error) {
    console.error("Razorpay retry order creation failed", error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to create a payment order right now.",
      },
      { status: 502 },
    )
  }
}
