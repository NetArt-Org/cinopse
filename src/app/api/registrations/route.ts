import { NextRequest, NextResponse } from "next/server"

import {
  countErpRegistrationsByCouponCode,
  createErpRegistration,
  findErpRegistrationByGoogleEmail,
  updateErpRegistration,
} from "@/lib/erpnext-client"
import { verifyFirebaseIdToken } from "@/lib/firebase-admin-rest"
import { createRazorpayOrder } from "@/lib/razorpay-client"
import {
  calculateRegistrationTotal,
  getRegistrationAmount,
  normalizeCouponCode,
  resolveRegistrationCoupon,
} from "@/lib/registration-config"
import { sendRegistrationWhatsAppNotificationSafely } from "@/lib/whapi-client"

type RegistrationRequest = {
  fullName?: unknown
  category?: unknown
  mobile?: unknown
  city?: unknown
  hospital?: unknown
  medicalCouncilNumber?: unknown
  couponCode?: unknown
}

const erpCategoryByRegistrationCategory: Record<string, string> = {
  Delegates: "Delegate",
  "PG and Others": "Student",
  "International Delegates": "International",
}

const eventDateLabel = "Sunday, 27 September 2026"
const venue = "Jawaharlal Nehru Planetarium, Sankey Road, Bengaluru"

function getBearerToken(request: NextRequest) {
  const value = request.headers.get("authorization")
  return value?.startsWith("Bearer ") ? value.slice(7) : ""
}

function toErpDate(date = new Date()) {
  return date.toISOString().slice(0, 19).replace("T", " ")
}

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 })
}

export async function GET(request: NextRequest) {
  try {
    const idToken = getBearerToken(request)
    if (!idToken) return NextResponse.json({ message: "Sign in is required." }, { status: 401 })

    const user = await verifyFirebaseIdToken(idToken)
    const registration = await findErpRegistrationByGoogleEmail(user.email)

    return NextResponse.json({ registration })
  } catch (error) {
    console.error("Registration lookup failed", error)
    return NextResponse.json(
      { message: "Unable to check your registration right now." },
      { status: 502 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const idToken = getBearerToken(request)
    if (!idToken) return NextResponse.json({ message: "Sign in is required." }, { status: 401 })

    const user = await verifyFirebaseIdToken(idToken)
    const body = (await request.json()) as RegistrationRequest
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : ""
    const category = typeof body.category === "string" ? body.category : ""
    const mobile = typeof body.mobile === "string" ? body.mobile.trim() : ""
    const city = typeof body.city === "string" ? body.city.trim() : ""
    const hospital = typeof body.hospital === "string" ? body.hospital.trim() : ""
    const medicalCouncilNumber =
      typeof body.medicalCouncilNumber === "string"
        ? body.medicalCouncilNumber.trim()
        : ""
    const amount = getRegistrationAmount(category)
    const erpCategory = erpCategoryByRegistrationCategory[category]
    const couponCode = typeof body.couponCode === "string" ? body.couponCode : ""
    const coupon = resolveRegistrationCoupon(couponCode)
    const normalizedCouponCode = coupon ? normalizeCouponCode(coupon.code) : ""

    if (
      !fullName ||
      !mobile ||
      !city ||
      !hospital ||
      !medicalCouncilNumber ||
      amount === null ||
      !erpCategory
    ) {
      return badRequest("Please complete all required registration details.")
    }

    if (couponCode.trim() && !coupon) {
      return badRequest("This coupon code is not available.")
    }

    const { discount, payableAmount } = calculateRegistrationTotal(
      amount,
      coupon ? [coupon] : [],
    )

    const existingRegistration = await findErpRegistrationByGoogleEmail(user.email)
    if (existingRegistration) {
      return NextResponse.json(
        { message: "A registration already exists for this Google account." },
        { status: 409 },
      )
    }

    if (coupon?.maxUses) {
      const couponUsage = await countErpRegistrationsByCouponCode(
        normalizedCouponCode,
      )

      if (couponUsage >= coupon.maxUses) {
        return badRequest(
          "This coupon code has reached its registration limit.",
        )
      }
    }

    const registration = await createErpRegistration({
      full_name: fullName,
      category: erpCategory,
      mobile,
      email: user.email,
      city,
      hospital,
      registration_date: toErpDate(),
      status: "Pending",
      remarks: [
        "Google-authenticated registration created from the CINOPSE website.",
        `Category: ${category}. Base amount: ₹${amount}.`,
        `Coupon discount: ₹${discount}.`,
        coupon ? `Coupon: ${coupon.name} (${normalizedCouponCode}).` : "Coupon: none.",
      ].join(" "),
      amount: payableAmount,
      payment_date: payableAmount > 0 ? "" : toErpDate(),
      payment_status: payableAmount > 0 ? "Pending" : "Success",
      transaction_id: "",
      uid: user.uid,
      google_name: user.name,
      google_email: user.email,
      custom_coupon_amount: discount,
      custom_coupon_code: normalizedCouponCode,
      custom_medical_council_number: medicalCouncilNumber,
    })

    if (payableAmount <= 0) {
      const confirmedRegistration = await updateErpRegistration(registration.name, {
        status: "Confirmed",
        payment_status: "Success",
        payment_date: toErpDate(),
      })

      await sendRegistrationWhatsAppNotificationSafely({
        kind: "confirmed",
        registration: {
          ...confirmedRegistration,
          name: registration.name,
          mobile,
          amount: payableAmount,
          payment_status: "Success",
        },
        eventDateLabel,
        venue,
      })

      return NextResponse.json(
        {
          registration: {
            ...confirmedRegistration,
            name: registration.name,
          },
          payment: null,
        },
        { status: 201 },
      )
    }

    const order = await createRazorpayOrder({
      amount: payableAmount,
      receipt: registration.name,
      notes: {
        registration: registration.name,
        email: user.email,
        category: erpCategory,
      },
    })

    await updateErpRegistration(registration.name, {
      transaction_id: order.id,
    })

    await sendRegistrationWhatsAppNotificationSafely({
      kind: "payment-pending",
      registration: {
        ...registration,
        transaction_id: order.id,
      },
      eventDateLabel,
      venue,
    })

    return NextResponse.json(
      {
        registration,
        payment: {
          keyId: process.env.RAZORPAY_KEY_ID,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration creation failed", error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to save your registration right now. Please try again.",
      },
      { status: 502 },
    )
  }
}
