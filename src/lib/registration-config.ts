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
  type?: "fixed" | "full" | "payable"
  maxUses?: number
}

const earlyBirdEndsAt = "2026-09-10T23:59:59+05:30"
const eventStartsAt = "2026-09-27T00:00:00+05:30"
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
        endsAt: "2026-09-26T23:59:59+05:30",
      },
      {
        id: "delegate-on-site",
        name: "On-site",
        amount: 1250,
        window: "Available only during the event",
        status: "Upcoming",
        startsAt: eventStartsAt,
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
        endsAt: "2026-09-26T23:59:59+05:30",
      },
      {
        id: "pg-on-site",
        name: "On-site",
        amount: 750,
        window: "During the event",
        status: "Upcoming",
        startsAt: eventStartsAt,
        endsAt: eventEndsAt,
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
    "CINOPSE-001",
    "CINOPSE-003",
    "CINOPSE-005",
    "CINOPSE-007",
    "CINOPSE-009",
    "CINOPSE-011",
    "CINOPSE-013",
    "CINOPSE-015",
    "CINOPSE-017",
    "CINOPSE-019",
  ].map((code) => ({
    name: `${code} full waiver`,
    code,
    discount: 0,
    type: "full" as const,
    maxUses: 30,
  })),
  {
    name: "CINOPSE-400 full waiver",
    code: "CINOPSE-400",
    discount: 0,
    type: "full",
    maxUses: 400,
  },
  {
    name: "CINOPSE-TEST-FREE full waiver",
    code: "CINOPSE-TEST-AX7F9",
    discount: 0,
    type: "full",
    maxUses: 1,
  },
  {
    name: "CINOPSE-TEST-ONE pay ₹1",
    code: "CINOPSE-ONE-AX7F9",
    discount: 1,
    type: "payable",
    maxUses: 1,
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
      (item) => normalizeCouponCode(item.code) === normalizedCode,
    ) ?? null
  )
}

export function normalizeCouponCode(code: string) {
  return code.trim().toUpperCase().replace(/\s*-\s*/g, "-")
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
