import { NextRequest, NextResponse } from "next/server"

import {
  countErpRegistrationsByCouponCodes,
  createErpRegistration,
  findErpRegistrationByEmail,
  getNextCustomRegistrationId,
  updateErpRegistration,
} from "@/lib/erpnext-client"
import { verifyFirebaseIdToken } from "@/lib/firebase-admin-rest"
import { toIndiaErpDateTime } from "@/lib/india-datetime"
import { createRazorpayOrder } from "@/lib/razorpay-client"
import {
  calculateRegistrationTotal,
  getCouponUsageCodes,
  getRegistrationAmount,
  normalizeCouponCode,
  resolveRegistrationCoupon,
} from "@/lib/registration-config"
import { sendRegistrationWhatsAppNotificationSafely } from "@/lib/whapi-client"

type RegistrationRequest = {
  fullName?: unknown
  category?: unknown
  email?: unknown
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
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function getBearerToken(request: NextRequest) {
  const value = request.headers.get("authorization")
  return value?.startsWith("Bearer ") ? value.slice(7) : ""
}

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 })
}

export async function GET(request: NextRequest) {
  try {
    const idToken = getBearerToken(request)
    if (!idToken) return NextResponse.json({ message: "Sign in is required." }, { status: 401 })

    await verifyFirebaseIdToken(idToken)
    const lookupEmail = request.nextUrl.searchParams.get("email")?.trim().toLowerCase() ?? ""

    if (!lookupEmail) {
      return NextResponse.json({ registration: null })
    }

    if (!emailPattern.test(lookupEmail)) {
      return badRequest("Please enter a valid email address.")
    }

    const registration = await findErpRegistrationByEmail(lookupEmail)

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
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
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
      !emailPattern.test(email) ||
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

    const existingRegistration = await findErpRegistrationByEmail(email)
    if (existingRegistration) {
      return NextResponse.json(
        { message: "A registration already exists for this email address." },
        { status: 409 },
      )
    }

    if (coupon?.maxUses) {
      const couponUsage = await countErpRegistrationsByCouponCodes(
        getCouponUsageCodes(coupon),
      )

      if (couponUsage >= coupon.maxUses) {
        return badRequest(
          "This coupon code has reached its registration limit.",
        )
      }
    }

    const customRegistrationId = await getNextCustomRegistrationId()
    const registration = await createErpRegistration({
      full_name: fullName,
      category: erpCategory,
      mobile,
      email,
      city,
      hospital,
      registration_date: toIndiaErpDateTime(),
      status: "Pending",
      remarks: [
        "Google-authenticated registration created from the CINOPSE website.",
        `Registration ID: ${customRegistrationId}.`,
        `Category: ${category}. Base amount: ₹${amount}.`,
        `Coupon discount: ₹${discount}.`,
        coupon ? `Coupon: ${coupon.name} (${normalizedCouponCode}).` : "Coupon: none.",
      ].join(" "),
      amount: payableAmount,
      payment_date: payableAmount > 0 ? "" : toIndiaErpDateTime(),
      payment_status: payableAmount > 0 ? "Pending" : "Success",
      transaction_id: "",
      uid: user.uid,
      google_name: user.name,
      google_email: email,
      custom_coupon_amount: discount,
      custom_coupon_code: normalizedCouponCode,
      custom_medical_council_number: medicalCouncilNumber,
      custom_registration_id: customRegistrationId,
    })

    if (payableAmount <= 0) {
      const confirmedRegistration = await updateErpRegistration(registration.name, {
        status: "Confirmed",
        payment_status: "Success",
        payment_date: toIndiaErpDateTime(),
      })

      await sendRegistrationWhatsAppNotificationSafely({
        kind: "confirmed",
        registration: {
          ...confirmedRegistration,
          name: registration.name,
          mobile,
          email,
          city,
          hospital,
          amount: payableAmount,
          payment_status: "Success",
          custom_medical_council_number: medicalCouncilNumber,
          custom_registration_id: customRegistrationId,
        },
        eventDateLabel,
        venue,
      })

      return NextResponse.json(
        {
          registration: {
            ...confirmedRegistration,
            name: registration.name,
            custom_registration_id: customRegistrationId,
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
        email,
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
        custom_registration_id: customRegistrationId,
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
