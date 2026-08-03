export type RegistrationCategory = {
  name: string
  amount: number
}

export type RegistrationCoupon = {
  name: string
  code: string
  discount: number
}

export const registrationCategories: RegistrationCategory[] = [
  { name: "Delegates", amount: 1000 },
  { name: "PG and Others", amount: 500 },
  { name: "International Delegates", amount: 2500 },
]

export const registrationCoupons: RegistrationCoupon[] = [
  {
    name: "Sample welcome discount",
    code: "CINOPSE100",
    discount: 100,
  },
  {
    name: "Sample academic discount",
    code: "ACADEMIC250",
    discount: 250,
  },
]

export function getRegistrationAmount(category: string) {
  return registrationCategories.find((item) => item.name === category)?.amount ?? null
}

export function resolveRegistrationCoupon(code: string) {
  const normalizedCode = code.trim().toUpperCase()
  if (!normalizedCode) return null

  return (
    registrationCoupons.find(
      (item) => item.code.toUpperCase() === normalizedCode,
    ) ?? null
  )
}

export function calculateRegistrationTotal(baseAmount: number, coupons: RegistrationCoupon[]) {
  const discount = coupons.reduce((total, coupon) => total + coupon.discount, 0)
  return {
    discount,
    payableAmount: Math.max(baseAmount - discount, 0),
  }
}
