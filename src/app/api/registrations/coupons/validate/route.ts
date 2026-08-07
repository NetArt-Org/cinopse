import { NextRequest, NextResponse } from "next/server"

import { countErpRegistrationsByCouponCodes } from "@/lib/erpnext-client"
import {
  getCouponUsageCodes,
  normalizeCouponCode,
  resolveRegistrationCoupon,
} from "@/lib/registration-config"

type CouponValidationRequest = {
  couponCode?: unknown
}

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 })
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CouponValidationRequest
    const couponCode =
      typeof body.couponCode === "string" ? body.couponCode.trim() : ""
    const coupon = resolveRegistrationCoupon(couponCode)

    if (!coupon) {
      return badRequest("This coupon code is not available.")
    }

    if (coupon.maxUses) {
      const couponUsage = await countErpRegistrationsByCouponCodes(
        getCouponUsageCodes(coupon).map(normalizeCouponCode),
      )

      if (couponUsage >= coupon.maxUses) {
        return NextResponse.json(
          { message: "This coupon code has reached its registration limit." },
          { status: 409 },
        )
      }
    }

    return NextResponse.json({
      coupon: {
        code: coupon.code,
        name: coupon.name,
      },
    })
  } catch (error) {
    console.error("Coupon validation failed", error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to validate coupon right now.",
      },
      { status: 502 },
    )
  }
}
