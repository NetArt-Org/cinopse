"use client"

import { Headphones, ShieldCheck } from "lucide-react"
import { useState } from "react"
import PhoneInput, {
  isValidPhoneNumber,
  type Value,
} from "react-phone-number-input"
import flags from "react-phone-number-input/flags"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input, Label } from "@/components/ui/input"
import { eventContent } from "@/lib/event-content"
import { PaymentSection } from "./payment-section"

export function RegistrationForm() {
  const [phone, setPhone] = useState<Value>()
  const [phoneError, setPhoneError] = useState("")

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-blue-50/60">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-800">
          {eventContent.registrationStatus}
        </p>
        <CardTitle>{eventContent.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-5">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            if (!phone || !isValidPhoneNumber(phone)) {
              event.preventDefault()
              setPhoneError("Enter a valid phone number")
            }
          }}
        >
          <Field id="name" label="Name" autoComplete="name" />
          <Field
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            title="Enter a valid email address"
          />
          <PhoneField
            value={phone}
            error={phoneError}
            onChange={(value) => {
              setPhone(value)
              if (value && isValidPhoneNumber(value)) {
                setPhoneError("")
              }
            }}
          />
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
  pattern,
  title,
}: {
  id: string
  label: string
  type?: string
  autoComplete?: string
  pattern?: string
  title?: string
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
        pattern={pattern}
        title={title}
      />
    </div>
  )
}

function PhoneField({
  value,
  error,
  onChange,
}: {
  value?: Value
  error: string
  onChange: (value?: Value) => void
}) {
  return (
    <div className="space-y-2">
      <Label>
        Phone{" "}
        <span className="text-red-600" aria-hidden="true">
          *
        </span>
      </Label>
      <PhoneInput
        required
        international
        countryCallingCodeEditable={false}
        defaultCountry="IN"
        flags={flags}
        name="phone"
        value={value}
        onChange={onChange}
        className="phone-input-control"
        numberInputProps={{
          id: "phone",
          autoComplete: "tel",
          "aria-invalid": error ? "true" : undefined,
          "aria-describedby": error ? "phone-error" : undefined,
        }}
      />
      {error ? (
        <p id="phone-error" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
