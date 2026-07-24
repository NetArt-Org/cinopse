import { CreditCard } from "lucide-react"

export function PaymentSection() {
  return (
    <div
      aria-label="Payment gateway integration placeholder"
      className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-3 py-3 text-sm"
    >
      <span className="flex items-center gap-2 font-medium text-blue-800">
        <CreditCard className="size-4" aria-hidden="true" />
        Payment
      </span>
      <span className="text-right text-slate-500">
        Registration Opening Soon
      </span>
    </div>
  )
}
