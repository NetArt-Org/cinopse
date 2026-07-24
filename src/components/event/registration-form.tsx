import { Headphones, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input, Label } from "@/components/ui/input"
import { eventContent } from "@/lib/event-content"
import { PaymentSection } from "./payment-section"

export function RegistrationForm() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-blue-50/60">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-800">
          {eventContent.registrationStatus}
        </p>
        <CardTitle>{eventContent.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-5">
        <form className="space-y-4">
          <Field id="name" label="Name" autoComplete="name" />
          <Field id="email" label="Email" type="email" autoComplete="email" />
          <Field id="phone" label="Phone" type="tel" autoComplete="tel" />
          <PaymentSection />
          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm leading-5 text-slate-700">
            <input
              required
              type="checkbox"
              name="terms"
              aria-label="I agree to terms and conditions"
              className="mt-0.5 size-4 rounded border-slate-300 accent-blue-800"
            />
            <span>
              I agree to terms and conditions{" "}
              <span className="text-red-600" aria-hidden="true">
                *
              </span>
            </span>
          </label>
          <Button
            className="h-11 w-full bg-blue-800 text-white hover:bg-blue-900"
            type="submit"
          >
            Register Now
          </Button>
          <div className="grid gap-2 text-sm font-medium text-blue-900 sm:grid-cols-2">
            <div className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Payment is secure
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2">
              <Headphones className="size-4" aria-hidden="true" />
              Support available
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
}: {
  id: string
  label: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}{" "}
        <span className="text-red-600" aria-hidden="true">
          *
        </span>
      </Label>
      <Input
        required
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
      />
    </div>
  )
}
