export type RegistrationCategoryName =
  | "Delegates"
  | "PG and Others"
  | "International Delegates"

export type RegistrationPriceOption = {
  id: string
  name: string
  amount: number
  window: string
  status: "Closed" | "Open now" | "Upcoming"
  startsAt?: string
  endsAt?: string
}

export type RegistrationCategory = {
  name: RegistrationCategoryName
  description: string
  options: RegistrationPriceOption[]
}

export type RegistrationCoupon = {
  name: string
  code: string
  discount: number
  type?: "fixed" | "full" | "payable" | "percentage"
  maxUses?: number
  aliases?: string[]
}

const earlyBirdEndsAt = "2026-09-10T23:59:59+05:30"
const eventEndsAt = "2026-09-27T23:59:59+05:30"

export const registrationCategories: RegistrationCategory[] = [
  {
    name: "Delegates",
    description: "Practicing physicians & consultants",
    options: [
      {
        id: "delegate-early-bird",
        name: "Early Bird",
        amount: 750,
        window: "Valid until September 10",
        status: "Upcoming",
        endsAt: earlyBirdEndsAt,
      },
      {
        id: "delegate-standard",
        name: "Standard",
        amount: 1000,
        window: "After September 10 until the event",
        status: "Upcoming",
        startsAt: "2026-09-11T00:00:00+05:30",
        endsAt: eventEndsAt,
      },
    ],
  },
  {
    name: "PG and Others",
    description: "Postgraduates, trainees & allied healthcare professionals",
    options: [
      {
        id: "pg-standard",
        name: "Standard",
        amount: 500,
        window: "Available throughout",
        status: "Upcoming",
      },
    ],
  },
  {
    name: "International Delegates",
    description: "Delegates joining from outside India",
    options: [
      {
        id: "international-standard",
        name: "Standard",
        amount: 2500,
        window: "Available throughout",
        status: "Upcoming",
      },
    ],
  },
]

export const registrationCoupons: RegistrationCoupon[] = [
  ...[
    "CINOPSE001",
    "CINOPSE003",
    "CINOPSE005",
    "CINOPSE007",
    "CINOPSE009",
    "CINOPSE011",
    "CINOPSE013",
    "CINOPSE015",
    "CINOPSE017",
    "CINOPSE019",
  ].map((code) => ({
    name: `${code} full waiver`,
    code,
    discount: 0,
    type: "full" as const,
    maxUses: 30,
  })),
  {
    name: "CINOPSE400 full waiver",
    code: "CINOPSE400",
    discount: 0,
    type: "full",
    maxUses: 400,
  },
  {
    name: "CINOPSE_PG full waiver",
    code: "CINOPSE_PG",
    discount: 0,
    type: "full",
    maxUses: 250,
  },
  {
    name: "CINOPSE_MM full waiver",
    code: "CINOPSE_MM",
    discount: 0,
    type: "full",
    maxUses: 250,
  },
  {
    name: "CINOPSE_IMA 100% discount",
    code: "CINOPSE_IMA",
    discount: 0,
    type: "full",
    maxUses: 100,
  },
  {
    name: "CINOPSE50 50% discount",
    code: "CINOPSE50",
    discount: 50,
    type: "percentage",
    maxUses: 500,
  },
  {
    name: "CINOPSE-TEST-FREE full waiver",
    code: "CINOPSETESTAX7F9",
    discount: 0,
    type: "full",
    maxUses: 2,
    aliases: ["CINOPSE-TEST-AX7F9", "CINOPSE-TEST-FREE", "CINOPSETESTFREE"],
  },
  {
    name: "CINOPSE-TEST-ONE pay ₹1",
    code: "CINOPSEONEAX7F9",
    discount: 1,
    type: "payable",
    maxUses: 2,
    aliases: ["CINOPSE-ONE-AX7F9", "CINOPSE-TEST-ONE", "CINOPSETESTONE"],
  },
]

export function getRegistrationPricing(now = new Date()) {
  return registrationCategories.map((category) => ({
    ...category,
    options: category.options.map((option) => ({
      ...option,
      status: getOptionStatus(option, now),
    })),
  }))
}

export function getActiveRegistrationOption(category: string, now = new Date()) {
  const pricingCategory = getRegistrationPricing(now).find(
    (item) => item.name === category,
  )
  if (!pricingCategory) return null

  return (
    pricingCategory.options.find((option) => option.status === "Open now") ??
    pricingCategory.options[0] ??
    null
  )
}

export function getRegistrationAmount(category: string, now = new Date()) {
  return getActiveRegistrationOption(category, now)?.amount ?? null
}

export function resolveRegistrationCoupon(code: string) {
  const normalizedCode = normalizeCouponCode(code)
  if (!normalizedCode) return null

  return (
    registrationCoupons.find(
      (item) =>
        getCouponUsageCodes(item).some(
          (code) => normalizeCouponCode(code) === normalizedCode,
        ),
    ) ?? null
  )
}

export function getCouponUsageCodes(coupon: RegistrationCoupon) {
  return Array.from(new Set([coupon.code, ...(coupon.aliases ?? [])]))
}

export function normalizeCouponCode(code: string) {
  return code.trim().toUpperCase().replace(/[\s-]+/g, "")
}

export function calculateRegistrationTotal(baseAmount: number, coupons: RegistrationCoupon[]) {
  const targetPayableAmount = coupons.reduce<number | null>(
    (target, coupon) =>
      coupon.type === "payable" ? Math.min(target ?? coupon.discount, coupon.discount) : target,
    null,
  )
  const discount = coupons.reduce((total, coupon) => {
    if (coupon.type === "full") return total + baseAmount
    if (coupon.type === "payable") return total + Math.max(baseAmount - coupon.discount, 0)
    if (coupon.type === "percentage") return total + (baseAmount * coupon.discount) / 100
    return total + coupon.discount
  }, 0)
  const payableAmount =
    targetPayableAmount === null
      ? Math.max(baseAmount - Math.min(discount, baseAmount), 0)
      : Math.max(targetPayableAmount, 0)

  return {
    discount: Math.min(discount, baseAmount),
    payableAmount,
  }
}

function getOptionStatus(option: RegistrationPriceOption, now: Date) {
  const currentTime = now.getTime()
  const startsAt = option.startsAt ? new Date(option.startsAt).getTime() : -Infinity
  const endsAt = option.endsAt ? new Date(option.endsAt).getTime() : Infinity

  if (currentTime < startsAt) return "Upcoming"
  if (currentTime > endsAt) return "Closed"

  return "Open now"
}
