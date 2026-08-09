"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import { createPortal } from "react-dom"
import { ArrowRight, Check, X } from "lucide-react"
import { toast } from "sonner"
import { GoogleIcon } from "@/components/icons/google-icon"
import { useRegistrationTicketCta } from "@/hooks/use-registration-ticket-cta"
import {
  calculateRegistrationTotal,
  getActiveRegistrationOption,
  getRegistrationAmount,
  getRegistrationPricing,
  resolveRegistrationCoupon,
  type RegistrationCoupon,
} from "@/lib/registration-config"
import PhoneInput, {
  isValidPhoneNumber,
  type Value,
} from "react-phone-number-input"
import flags from "react-phone-number-input/flags"

export type RegistrationPriceComparisonProps = {
  audiences: string[]
  eventDateLabel: string
  eventDate: string
  windowStart: string
  note: string
  ctaLabel: string
  dialogOnly?: boolean
}

type WizardForm = {
  name: string
  email: string
  phone?: Value
  city: string
  institution: string
  medicalCouncilNumber: string
  terms: boolean
}

type GoogleProfile = {
  name: string
  email: string
}

type RegistrationLookupDetails = {
  id: string
  name: string
  email: string
  mobile: string
  city: string
  institution: string
  medicalCouncilNumber: string
  category: string
  amount: string
  amountValue: number
  registrationStatus: string
  payment: string
  paymentStatus: string
  coupon: string
  transactionId: string
  registrationDate: string
}

const initialForm: WizardForm = {
  name: "",
  email: "",
  city: "",
  institution: "",
  medicalCouncilNumber: "",
  terms: false,
}

type RazorpayPaymentResponse = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

type RazorpayCheckoutOptions = {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill: {
    name: string
    email: string
    contact?: string
  }
  notes: Record<string, string>
  theme: {
    color: string
  }
  handler: (response: RazorpayPaymentResponse) => void
  modal: {
    ondismiss: () => void
  }
}

type RazorpayInstance = {
  open: () => void
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function RegistrationPriceComparison({
  audiences,
  eventDateLabel,
  eventDate,
  windowStart,
  note,
  ctaLabel,
  dialogOnly = false,
}: RegistrationPriceComparisonProps) {
  const [audience, setAudience] = useState(0)
  const initialNow = useMemo(() => new Date(windowStart).getTime(), [windowStart])
  const [now, setNow] = useState(initialNow)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeView, setActiveView] = useState<"wizard" | "login">("wizard")
  const [statusOnlyView, setStatusOnlyView] = useState(false)
  const [statusOnlyLoading, setStatusOnlyLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(-1)
  const [form, setForm] = useState<WizardForm>(initialForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [registrationId, setRegistrationId] = useState("CIN-2026-0000")
  const [couponInput, setCouponInput] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<RegistrationCoupon | null>(null)
  const [couponError, setCouponError] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(false)
  const [isRetryingPayment, setIsRetryingPayment] = useState(false)
  const [retryPaymentError, setRetryPaymentError] = useState("")
  const [lookupEmail, setLookupEmail] = useState("")
  const [lookupResult, setLookupResult] = useState<
    | ({ state: "found" } & RegistrationLookupDetails)
    | { state: "missing"; message: string }
    | null
  >(null)
  const [googleProfile, setGoogleProfile] = useState<GoogleProfile | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [authError, setAuthError] = useState("")
  const autoCheckRequested = useRef(false)
  const firebaseUnsubscribe = useRef<(() => void) | null>(null)

  const deadline = useMemo(() => new Date(eventDate).getTime(), [eventDate])
  const start = initialNow
  const countdown = useCountdown(deadline, now)
  const progress = Math.min(Math.max(((now - start) / (deadline - start)) * 100, 0), 100)
  const {
    label: registerCtaLabel,
    openRegistrationOrTicket,
  } = useRegistrationTicketCta()

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!dialogOnly) return

    const openRegistration = () => {
      setActiveView("wizard")
      setStatusOnlyView(false)
      setStatusOnlyLoading(false)
      setModalOpen(true)
    }
    const openTicketStatus = () => {
      setActiveView("login")
      setLookupResult(null)
      setStatusOnlyView(true)
      setStatusOnlyLoading(true)
      autoCheckRequested.current = true
      setModalOpen(true)
    }
    const openRegistrationFromUrl = () => {
      const params = new URLSearchParams(window.location.search)
      const shouldOpen = params.get("register") === "1"

      if (shouldOpen) openRegistration()
    }

    window.addEventListener("cinopse:open-registration", openRegistration)
    window.addEventListener("cinopse:view-ticket", openTicketStatus)
    window.addEventListener("popstate", openRegistrationFromUrl)
    openRegistrationFromUrl()

    return () => {
      window.removeEventListener("cinopse:open-registration", openRegistration)
      window.removeEventListener("cinopse:view-ticket", openTicketStatus)
      window.removeEventListener("popstate", openRegistrationFromUrl)
    }
  }, [dialogOnly])

  useEffect(() => {
    if (!dialogOnly) return

    document.body.classList.toggle("overflow-hidden", modalOpen)

    return () => document.body.classList.remove("overflow-hidden")
  }, [dialogOnly, modalOpen])

  useEffect(() => {
    if (!dialogOnly || !modalOpen) return

    let mounted = true

    void import("@/lib/firebase-client").then(({ observeGoogleUser }) => {
      if (!mounted) return

      firebaseUnsubscribe.current?.()
      firebaseUnsubscribe.current = observeGoogleUser((profile) => {
        if (!mounted) return

        setGoogleProfile(profile)
        if (profile) {
          setForm((current) => ({
            ...current,
            name: current.name || profile.name,
            email: profile.email,
          }))
          setLookupEmail(profile.email)
          setAuthError("")
        }
      })
    })

    return () => {
      mounted = false
      firebaseUnsubscribe.current?.()
      firebaseUnsubscribe.current = null
    }
  }, [dialogOnly, modalOpen])

  const pricingCategories = useMemo(
    () => getRegistrationPricing(new Date(now)),
    [now],
  )
  const selectedLabel = selectedCategory >= 0 ? audiences[selectedCategory] : ""
  const selectedAmount = getRegistrationAmount(selectedLabel, new Date(now)) ?? 0
  const selectedActiveOption = getActiveRegistrationOption(
    selectedLabel,
    new Date(now),
  )
  const couponTotal = calculateRegistrationTotal(
    selectedAmount,
    appliedCoupon ? [appliedCoupon] : [],
  )
  const couponApplyDisabled =
    Boolean(appliedCoupon) ||
    isApplyingCoupon ||
    Boolean(couponError) ||
    !couponInput.trim()
  const confirmButtonLabel =
    couponTotal.payableAmount > 0 ? "Proceed to Pay →" : "Confirm Registration ✓"

  function resetWizard() {
    setStep(1)
    setSelectedCategory(-1)
    setForm(initialForm)
    setErrors({})
    setLookupResult(null)
    setStatusOnlyView(false)
    setStatusOnlyLoading(false)
    setRetryPaymentError("")
    setCouponInput("")
    setAppliedCoupon(null)
    setCouponError("")
  }

  function closeModal() {
    setModalOpen(false)
    window.setTimeout(() => resetWizard(), 300)
  }

  async function handleGoogleSignIn() {
    setIsSigningIn(true)
    setAuthError("")

    try {
      const { signInWithGoogle } = await import("@/lib/firebase-client")
      const profile = await signInWithGoogle()
      setGoogleProfile(profile)
      setForm((current) => ({
        ...current,
        name: current.name || profile.name,
        email: profile.email,
      }))
      setLookupEmail(profile.email)
    } catch (error) {
      const code = typeof error === "object" && error && "code" in error ? String(error.code) : ""
      setAuthError(
        code === "auth/popup-closed-by-user"
          ? "Google sign-in was cancelled. Please try again to continue."
          : error instanceof Error
            ? error.message
            : "Unable to sign in with Google. Please try again.",
      )
    } finally {
      setIsSigningIn(false)
    }
  }

  async function applyCoupon() {
    const coupon = resolveRegistrationCoupon(couponInput)

    if (!coupon) {
      const message = "This coupon code is not available."
      setCouponError(message)
      toast.error(message)
      return
    }
    if (appliedCoupon) {
      const message = "Only one coupon can be applied to a registration."
      setCouponError(message)
      toast.error(message)
      return
    }

    setIsApplyingCoupon(true)
    try {
      const response = await fetch("/api/registrations/coupons/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couponCode: couponInput }),
      })
      const payload = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(payload.message || "Unable to apply coupon.")
      }

      setAppliedCoupon(coupon)
      setCouponInput("")
      setCouponError("")
      toast.success("Coupon applied.")
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to apply coupon."
      setCouponError(message)
      toast.error(message)
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null)
    setCouponError("")
    toast.info("Coupon removed.")
  }

  async function nextStep() {
    if (step === 1) {
      if (selectedCategory < 0) {
        const message = "Please choose a category to continue."
        setErrors({ category: message })
        toast.error(message)
        return
      }
      setErrors({})
      setStep(2)
      return
    }

    if (step === 2) {
      const nextErrors = validateDetails(form)
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length) {
        toast.error(Object.values(nextErrors)[0])
        return
      }
      setStep(3)
      return
    }

    if (step === 3) {
      if (!form.terms) {
        const message = "Please agree to terms and conditions."
        setErrors({ terms: message })
        toast.error(message)
        return
      }

      setIsSubmitting(true)
      try {
        const { getFirebaseIdToken } = await import("@/lib/firebase-client")
        const idToken = await getFirebaseIdToken()
        const response = await fetch("/api/registrations", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: form.name,
            category: selectedLabel,
            mobile: form.phone,
            city: form.city,
            hospital: form.institution,
            medicalCouncilNumber: form.medicalCouncilNumber,
            couponCode: appliedCoupon?.code ?? "",
          }),
        })
        const payload = (await response.json()) as {
          message?: string
          registration?: { name: string }
          payment?: {
            keyId: string
            orderId: string
            amount: number
            currency: string
          } | null
        }
        if (!response.ok || !payload.registration) {
          throw new Error(payload.message || "Unable to save your registration.")
        }

        if (payload.payment) {
          toast.info("Registration saved. Complete payment to confirm.")
          await openRazorpayCheckout({
            idToken,
            registrationName: payload.registration.name,
            payment: payload.payment,
            form,
          })
          toast.success("Payment successful. Registration confirmed.")
        } else {
          toast.success("Registration confirmed.")
        }

        setRegistrationId(payload.registration.name)
        window.dispatchEvent(new Event("cinopse:registration-updated"))
        setErrors({})
        setStep(4)
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to save your registration. Please try again."
        setErrors({
          submit: message,
        })
        toast.error(message)
      } finally {
        setIsSubmitting(false)
      }
      return
    }

    closeModal()
  }

  const checkRegistration = useCallback(async function checkRegistration() {
    setIsCheckingRegistration(true)
    setLookupResult(null)

    try {
      const { getFirebaseIdToken } = await import("@/lib/firebase-client")
      const idToken = await getFirebaseIdToken()
      const response = await fetch("/api/registrations", {
        headers: { Authorization: `Bearer ${idToken}` },
      })
      const payload = (await response.json()) as {
        message?: string
        registration?: {
          name: string
          full_name: string
          email?: string
          google_email?: string
          mobile?: string
          city?: string
          hospital?: string
          custom_medical_council_number?: string
          category: string
          amount: number | string
          status?: string
          payment_status?: string
          transaction_id?: string
          registration_date?: string
          remarks?: string
          custom_coupon_amount?: number | string
          custom_coupon_code?: string
        } | null
      }
      if (!response.ok) throw new Error(payload.message || "Unable to check your registration.")

      if (payload.registration) {
        setLookupResult({
          state: "found",
          id: payload.registration.name,
          name: payload.registration.full_name,
          email: payload.registration.email || payload.registration.google_email || googleProfile?.email || "",
          mobile: payload.registration.mobile || "",
          city: payload.registration.city || "",
          institution: payload.registration.hospital || "",
          medicalCouncilNumber: payload.registration.custom_medical_council_number || "",
          category: payload.registration.category,
          amount: formatPrice(payload.registration.amount),
          amountValue: Number(payload.registration.amount) || 0,
          registrationStatus: payload.registration.status || "Not available",
          payment: "Razorpay",
          paymentStatus: payload.registration.payment_status || "Not updated",
          coupon: formatCouponDetails(
            payload.registration.custom_coupon_code,
            payload.registration.custom_coupon_amount,
            payload.registration.remarks,
          ),
          transactionId: getOnlineTransactionId(
            payload.registration.transaction_id,
            payload.registration.payment_status,
            payload.registration.amount,
          ),
          registrationDate: formatDisplayDate(payload.registration.registration_date),
        })
        toast.success("Registration found.")
      } else {
        const message = "No registration was found for your Google account."
        setLookupResult({
          state: "missing",
          message,
        })
        toast.error(message)
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to check your registration right now."
      setLookupResult({
        state: "missing",
        message,
      })
      toast.error(message)
    } finally {
      setIsCheckingRegistration(false)
    }
  }, [googleProfile])

  useEffect(() => {
    if (!dialogOnly || !modalOpen || activeView !== "login") return
    if (!autoCheckRequested.current || !googleProfile || isCheckingRegistration) return

    autoCheckRequested.current = false
    void checkRegistration().finally(() => setStatusOnlyLoading(false))
  }, [
    activeView,
    checkRegistration,
    dialogOnly,
    googleProfile,
    isCheckingRegistration,
    modalOpen,
  ])

  const foundLookup = lookupResult?.state === "found" ? lookupResult : null

  async function handleRetryPayment(details: RegistrationLookupDetails) {
    setIsRetryingPayment(true)
    setRetryPaymentError("")

    try {
      const { getFirebaseIdToken } = await import("@/lib/firebase-client")
      const idToken = await getFirebaseIdToken()
      const response = await fetch("/api/registrations/razorpay/order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationName: details.id }),
      })
      const payload = (await response.json()) as {
        message?: string
        payment?: {
          keyId: string
          orderId: string
          amount: number
          currency: string
        }
      }

      if (!response.ok || !payload.payment) {
        throw new Error(payload.message || "Unable to start payment.")
      }

      await openRazorpayCheckout({
        idToken,
        registrationName: details.id,
        payment: payload.payment,
        form: {
          name: details.name,
          email: details.email,
          phone: details.mobile as Value,
          city: details.city,
          institution: details.institution,
          medicalCouncilNumber: details.medicalCouncilNumber,
          terms: true,
        },
      })

      window.dispatchEvent(new Event("cinopse:registration-updated"))
      await checkRegistration()
      toast.success("Payment successful. Registration confirmed.")
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to complete payment. Please try again."
      setRetryPaymentError(message)
      toast.error(message)
    } finally {
      setIsRetryingPayment(false)
    }
  }

  return (
    <>
      {!dialogOnly ? (
      <div className="mx-auto max-w-none">
        <div
          data-reveal
          className="relative z-10 mx-auto mb-7 grid max-w-[430px] grid-cols-3 rounded-full border border-white/15 bg-white/10 p-[5px] sm:max-w-[540px]"
        >
          <span
            className={`absolute top-[5px] bottom-[5px] left-[5px] w-[calc(33.333%-3.33px)] rounded-full bg-white shadow-[0_3px_12px_rgba(6,26,58,0.25)] transition-transform duration-500 ease-[cubic-bezier(.22,.9,.18,1)] ${
              audience === 1
                ? "translate-x-[calc(100%+5px)]"
                : audience === 2
                  ? "translate-x-[calc(200%+10px)]"
                  : "translate-x-0"
            }`}
          />
          {audiences.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setAudience(index)}
              className={`relative min-w-0 rounded-full px-1 py-3 text-[10px] leading-none font-medium whitespace-nowrap transition-colors duration-300 min-[380px]:text-[10.5px] sm:text-[12px] ${
                audience === index
                  ? "text-[color:var(--cinopse-primary)]"
                  : "text-white/70 hover:text-white"
              }`}
              aria-pressed={audience === index}
            >
              {item}
            </button>
          ))}
        </div>

        <div
          data-reveal
          className="relative z-10 flex flex-wrap justify-center gap-3"
        >
          {pricingCategories[audience]?.options.map((phase) => {
            const isOpen = phase.status === "Open now"

            return (
              <article
                key={phase.id}
                className={`relative w-full max-w-[430px] rounded-[14px] border px-4 py-[22px] text-center transition-[background,transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.22,.9,.18,1)] sm:w-[calc(50%-6px)] lg:w-[300px] ${
                  isOpen
                    ? "-translate-y-1 border-white bg-white shadow-[0_16px_32px_rgba(6,26,58,0.28)]"
                    : "border-white/15 bg-white/[0.07]"
                }`}
              >
                <span
                  data-soft-pulse
                  className={`absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--cinopse-accent)] px-3 py-1 text-[9px] leading-none font-semibold tracking-[0.1em] whitespace-nowrap text-[color:var(--cinopse-primary-deep)] uppercase animate-[softPulse_2.4s_ease-out_infinite] ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Open Now
                </span>
                <p
                  className={`m-0 text-[12px] leading-4 font-medium ${
                    isOpen ? "text-[color:var(--cinopse-primary)]" : "text-white/90"
                  }`}
                >
                  {phase.name}
                </p>
                <p
                  className={`mt-1 mb-[13px] text-[10px] leading-4 font-light ${
                    isOpen
                      ? "text-[color:var(--cinopse-muted)]"
                      : "text-white/50"
                  }`}
                >
                  {phase.window}
                </p>
                <div className="h-8 overflow-hidden">
                  <p
                    key={`${phase.id}-${audience}`}
                    className={`font-display m-0 animate-[swapIn_0.38s_cubic-bezier(.2,.85,.2,1)] text-2xl leading-8 font-semibold tabular-nums ${
                      isOpen ? "text-[color:var(--cinopse-primary)]" : "text-white"
                    }`}
                  >
                    {formatPrice(phase.amount)}
                  </p>
                </div>
                <p
                  className={`mt-2.5 text-[9.5px] leading-4 font-normal tracking-[0.06em] ${
                    isOpen ? "text-[#3f9150]" : "text-white/45"
                  }`}
                >
                  {phase.status}
                </p>
              </article>
            )
          })}
        </div>

        <div
          data-reveal
          className="relative z-10 mt-6 flex flex-col gap-5 rounded-[14px] border border-white/15 bg-white/[0.08] px-5 py-[18px] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-60 flex-1">
            <p className="m-0 mb-2.5 text-[11.5px] leading-5 font-normal text-white/80">
              Conference day — {eventDateLabel} —{" "}
              <b className="font-medium text-[color:var(--cinopse-accent)] tabular-nums">
                {countdown}
              </b>{" "}
              to go
            </p>
            <progress
              className="registration-progress"
              value={progress}
              max={100}
              aria-label="Time elapsed until conference day"
            />
          </div>
          <button
            type="button"
            onClick={openRegistrationOrTicket}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-[12.5px] leading-none font-medium text-[color:var(--cinopse-primary)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(0,0,0,0.28)]"
          >
            {registerCtaLabel || ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <p
          data-reveal
          className="relative z-10 mx-auto mt-5 max-w-xl text-center text-[11px] leading-5 font-light text-white/45"
        >
          {note}
        </p>
      </div>
      ) : null}

      {dialogOnly && modalOpen && typeof document !== "undefined"
        ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(9,26,54,0.62)] px-6 py-4 backdrop-blur-[7px] sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Registration"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal()
          }}
        >
          <div
            data-modal-panel
            className="relative max-h-[92vh] w-full max-w-[600px] overflow-auto rounded-[20px] bg-white px-5 pt-5 pb-4 shadow-[0_30px_80px_rgba(6,26,58,0.5)] animate-[swapIn_0.45s_cubic-bezier(.22,.9,.18,1)] sm:px-7 sm:pt-6 sm:pb-[18px]"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 z-10 grid size-8 place-items-center rounded-full bg-[color:var(--cinopse-cream)] text-lg leading-none text-[color:var(--cinopse-text-secondary)] transition-[transform,background,color] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:rotate-90 hover:bg-[color:var(--cinopse-accent)] hover:text-[color:var(--cinopse-primary-deep)]"
            >
              <X className="size-4" aria-hidden="true" />
            </button>

            {!googleProfile ? (
              <section className="py-12 text-center" aria-labelledby="google-sign-in-title">
                <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-[color:var(--cinopse-cream)] shadow-[0_8px_18px_rgba(6,26,58,0.08)]">
                  <GoogleIcon className="size-6" />
                </div>
                <h2
                  id="google-sign-in-title"
                  className="font-display m-0 text-2xl leading-tight font-semibold text-[color:var(--cinopse-primary)]"
                >
                  Continue with Google
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 font-light text-[color:var(--cinopse-muted)]">
                  Sign in to start your registration or check an existing registration.
                </p>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                  className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[color:var(--cinopse-border)] bg-white px-6 text-[13px] font-medium text-[color:var(--cinopse-ink)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[color:var(--cinopse-primary)] hover:shadow-[0_10px_22px_rgba(27,75,150,0.16)] disabled:cursor-wait disabled:opacity-70"
                >
                  <GoogleIcon className="size-5" />
                  {isSigningIn ? "Connecting to Google…" : "Sign in with Google"}
                </button>
                {authError ? (
                  <p role="alert" className="mt-4 text-sm leading-5 text-[#c0392b]">
                    {authError}
                  </p>
                ) : null}
              </section>
            ) : foundLookup ? (
              <RegistrationStatusDetails
                details={foundLookup}
                onBack={() => {
                  if (statusOnlyView) {
                    closeModal()
                  } else {
                    setLookupResult(null)
                  }
                }}
                onClose={closeModal}
                showBack={!statusOnlyView}
                isRetryingPayment={isRetryingPayment}
                retryPaymentError={retryPaymentError}
                onPayNow={() => handleRetryPayment(foundLookup)}
              />
            ) : statusOnlyView ? (
              <section
                data-wizard-step
                aria-labelledby="ticket-status-title"
                className="py-12 text-center animate-[swapIn_0.4s_cubic-bezier(.22,.9,.18,1)]"
              >
                <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-[color:var(--cinopse-cream)] text-[color:var(--cinopse-primary)]">
                  {isCheckingRegistration || statusOnlyLoading ? (
                    <span className="size-5 animate-spin rounded-full border-2 border-[color:var(--cinopse-border)] border-t-[color:var(--cinopse-primary)]" />
                  ) : (
                    <Check className="size-6" aria-hidden="true" />
                  )}
                </div>
                <h3
                  id="ticket-status-title"
                  className="font-display m-0 text-xl leading-tight font-semibold text-[color:var(--cinopse-primary)]"
                >
                  {isCheckingRegistration || statusOnlyLoading
                    ? "Loading your ticket"
                    : "Registration status"}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-xs leading-5 font-light text-[color:var(--cinopse-muted)]">
                  {lookupResult?.state === "missing"
                    ? lookupResult.message
                    : "Checking the registration linked to your current login."}
                </p>
                {lookupResult?.state === "missing" ? (
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStatusOnlyView(false)
                        setActiveView("wizard")
                        setLookupResult(null)
                      }}
                      className="inline-flex items-center justify-center rounded-full bg-[color:var(--cinopse-primary)] px-5 py-2.5 text-[13px] leading-none font-medium text-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(27,75,150,0.35)]"
                    >
                      Register Now
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex items-center justify-center rounded-full bg-[color:var(--cinopse-cream)] px-5 py-2.5 text-[13px] leading-none font-medium text-[color:var(--cinopse-text-secondary)] transition-colors hover:bg-[#e2dfd8]"
                    >
                      Close
                    </button>
                  </div>
                ) : null}
              </section>
            ) : (
              <>
            <div className="mr-9 mb-5 grid grid-cols-2 rounded-full bg-[color:var(--cinopse-cream)] p-1">
              {[
                ["wizard", "New Registration"],
                ["login", "Already Registered?"],
              ].map(([view, label]) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => setActiveView(view as "wizard" | "login")}
                  className={`rounded-full px-2 py-3 text-xs leading-none font-medium transition-[background,color,box-shadow] duration-300 ${
                    activeView === view
                      ? "bg-[color:var(--cinopse-primary)] text-white shadow-[0_4px_12px_rgba(27,75,150,0.30)]"
                      : "text-[color:var(--cinopse-muted)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {activeView === "wizard" ? (
              <div>
                {step < 4 ? (
                  <div className="mb-5 flex">
                    {["Category", "Details", "Review"].map((label, index) => {
                      const stepNumber = index + 1
                      const isCurrent = step === stepNumber
                      const isDone = step > stepNumber

                      return (
                        <div
                          key={label}
                          className={`relative flex flex-1 flex-col items-center gap-2 text-[8.5px] leading-none font-medium tracking-[0.12em] uppercase ${
                            isCurrent
                              ? "text-[color:var(--cinopse-primary)]"
                              : isDone
                                ? "text-[color:var(--cinopse-accent-deep)]"
                                : "text-[color:var(--cinopse-faint)]"
                          } after:absolute after:top-[13px] after:left-[calc(50%+20px)] after:h-0.5 after:w-[calc(100%-40px)] after:bg-[color:var(--cinopse-border)] last:after:hidden ${
                            isDone ? "after:bg-[color:var(--cinopse-accent)]" : ""
                          }`}
                        >
                          <span
                            className={`relative z-10 grid size-[27px] place-items-center rounded-full text-[11px] leading-none font-semibold ${
                              isDone
                                ? "bg-[color:var(--cinopse-accent)] text-[color:var(--cinopse-primary-deep)]"
                                : isCurrent
                                  ? "bg-[color:var(--cinopse-primary)] text-white shadow-[0_4px_12px_rgba(27,75,150,0.30)]"
                                  : "bg-[color:var(--cinopse-cream)] text-[color:var(--cinopse-muted)]"
                            }`}
                          >
                            {isDone ? <Check className="size-3" /> : stepNumber}
                          </span>
                          {label}
                        </div>
                      )
                    })}
                  </div>
                ) : null}

                {step === 1 ? (
                  <div data-wizard-step className="animate-[swapIn_0.4s_cubic-bezier(.22,.9,.18,1)]">
                    <h3 className="font-display m-0 mb-3.5 text-xl leading-tight font-semibold text-[color:var(--cinopse-primary)]">
                      Choose your category
                    </h3>
                    <div className="grid gap-2.5">
                      {pricingCategories.map((category, index) => {
                        const activeOption =
                          category.options.find(
                            (option) => option.status === "Open now",
                          ) ?? category.options[0]

                        return (
                        <button
                          key={category.name}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(index)
                            setErrors({})
                          }}
                          className={`flex items-center justify-between gap-3.5 rounded-[14px] border-[1.5px] px-[18px] py-[15px] text-left transition-[border-color,background,transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 ${
                            selectedCategory === index
                              ? "border-[color:var(--cinopse-primary)] bg-[rgba(27,75,150,0.05)] shadow-[0_8px_20px_rgba(27,75,150,0.14)]"
                              : "border-[color:var(--cinopse-border)]"
                          }`}
                        >
                          <span className="min-w-0">
                            <b className="block text-[13.5px] leading-5 font-medium whitespace-nowrap text-[color:var(--cinopse-ink)]">
                              {category.name}
                            </b>
                            <i className="mt-0.5 block text-[10.5px] leading-4 font-light text-[color:var(--cinopse-muted)] not-italic">
                              {category.description}
                            </i>
                          </span>
                          <span className="font-display shrink-0 text-[17px] leading-none font-semibold text-[color:var(--cinopse-primary)]">
                            {formatPrice(activeOption.amount)}
                          </span>
                        </button>
                        )
                      })}
                    </div>
                    {errors.category ? <ErrorText>{errors.category}</ErrorText> : null}
                    <p className="mt-3.5 text-[10px] leading-4 font-light text-[color:var(--cinopse-faint)]">
                      Your registration cost is confirmed in the review step. Eligible coupons can be applied before confirmation.
                    </p>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div data-wizard-step className="animate-[swapIn_0.4s_cubic-bezier(.22,.9,.18,1)]">
                    <h3 className="font-display m-0 mb-3.5 text-xl leading-tight font-semibold text-[color:var(--cinopse-primary)]">
                      Your details
                    </h3>
                    <Field
                      id="fName"
                      label="Full name"
                      value={form.name}
                      placeholder="Dr. Full Name"
                      autoComplete="name"
                      error={errors.name}
                      onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                    />
                    <Field
                      id="fEmail"
                      label="Email"
                      type="email"
                      value={form.email}
                      placeholder="you@example.com"
                      autoComplete="email"
                      error={errors.email}
                      readOnly={Boolean(googleProfile)}
                      hint={
                        googleProfile
                          ? "Verified through Google and cannot be changed."
                          : undefined
                      }
                      onChange={(value) => setForm((current) => ({ ...current, email: value }))}
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <PhoneField
                        value={form.phone}
                        error={errors.phone}
                        onChange={(phone) => setForm((current) => ({ ...current, phone }))}
                      />
                      <Field
                        id="fCity"
                        label="City"
                        value={form.city}
                        placeholder="Bengaluru"
                        error={errors.city}
                        onChange={(value) => setForm((current) => ({ ...current, city: value }))}
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field
                        id="fInst"
                        label="Institution / Hospital"
                        value={form.institution}
                        placeholder="Hospital or institute"
                        error={errors.institution}
                        onChange={(value) =>
                          setForm((current) => ({ ...current, institution: value }))
                        }
                      />
                      <Field
                        id="fMcn"
                        label="Medical Council Number (MCN)"
                        value={form.medicalCouncilNumber}
                        placeholder="Enter Medical Council Number"
                        error={errors.medicalCouncilNumber}
                        onChange={(value) =>
                          setForm((current) => ({ ...current, medicalCouncilNumber: value }))
                        }
                      />
                    </div>
                    </div>
                  ) : null}

                {step === 3 ? (
                  <div data-wizard-step className="animate-[swapIn_0.4s_cubic-bezier(.22,.9,.18,1)]">
                    <h3 className="font-display m-0 mb-3.5 text-xl leading-tight font-semibold text-[color:var(--cinopse-primary)]">
                      Review & confirm
                    </h3>
                    <div className="grid gap-x-6 rounded-[14px] bg-[color:var(--cinopse-cream)] px-[18px] py-2 sm:grid-cols-2">
                      {[
                        ["Name", form.name],
                        ["Email", form.email],
                        ["Mobile", form.phone ?? ""],
                        ["City", form.city],
                        ["Institution", form.institution],
                        ["MCN", form.medicalCouncilNumber],
                          ["Category", selectedLabel],
                          ["Fee window", selectedActiveOption?.name ?? ""],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex min-w-0 items-start justify-between gap-4 border-b border-black/5 py-2.5 last:border-b-0 sm:flex-col sm:justify-start sm:gap-1"
                        >
                          <span className="shrink-0 text-[10px] leading-5 font-medium text-[color:var(--cinopse-muted)] uppercase">
                            {label}
                          </span>
                          <b
                            className="min-w-0 truncate text-right text-[13px] leading-5 font-medium text-[color:var(--cinopse-ink)] sm:text-left"
                          >
                            {value}
                          </b>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3.5 rounded-[14px] border border-[color:var(--cinopse-border)] bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="m-0 text-[12.5px] font-medium text-[color:var(--cinopse-ink)]">
                            Coupon code
                          </h4>
                          <p className="mt-0.5 text-[10px] leading-4 text-[color:var(--cinopse-muted)]">
                            Apply one eligible coupon to reduce your payable amount.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <input
                          value={couponInput}
                          onChange={(event) => {
                            setCouponInput(event.target.value)
                            setCouponError("")
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault()
                              if (!couponApplyDisabled) void applyCoupon()
                            }
                          }}
                          disabled={Boolean(appliedCoupon) || isApplyingCoupon}
                          placeholder="Enter coupon code"
                          aria-describedby={couponError ? "coupon-error" : undefined}
                          className="min-w-0 flex-1 rounded-full border border-[color:var(--cinopse-border)] px-4 py-2.5 text-xs uppercase outline-none transition-[border-color,box-shadow] placeholder:normal-case focus:border-[color:var(--cinopse-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,150,0.1)] disabled:cursor-not-allowed disabled:bg-[color:var(--cinopse-cream)]"
                        />
                        <button
                          type="button"
                          onClick={() => void applyCoupon()}
                          disabled={couponApplyDisabled}
                          className="rounded-full bg-[color:var(--cinopse-primary)] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[color:var(--cinopse-secondary)] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isApplyingCoupon ? "Checking…" : "Apply"}
                        </button>
                      </div>
                      {couponError ? <ErrorText id="coupon-error">{couponError}</ErrorText> : null}
                      {appliedCoupon ? (
                        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-[color:var(--cinopse-cream)] px-3 py-2 text-[10.5px]">
                          <span>
                            <b className="font-medium text-[color:var(--cinopse-ink)]">
                              {appliedCoupon.name}
                            </b>{" "}
                            <span className="text-[color:var(--cinopse-muted)]">
                              ({appliedCoupon.code}) · −
                              {formatPrice(
                                appliedCoupon.type === "full"
                                  ? selectedAmount
                                  : appliedCoupon.discount,
                              )}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={removeCoupon}
                            className="text-[color:var(--cinopse-primary)] underline underline-offset-2"
                            aria-label={`Remove ${appliedCoupon.name} coupon`}
                          >
                            Remove
                          </button>
                        </div>
                      ) : null}
                      <div className="mt-3 grid gap-2 border-t border-[color:var(--cinopse-border)] pt-3">
                        {[
                          ["Subtotal", formatPrice(selectedAmount)],
                          ["Coupon Discount", `−${formatPrice(couponTotal.discount)}`],
                          ["Total", formatPrice(couponTotal.payableAmount)],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className={`flex items-center justify-between gap-3 ${
                              label === "Total"
                                ? "border-t border-[color:var(--cinopse-border)] pt-2"
                                : ""
                            }`}
                          >
                            <span
                              className={`text-[11px] ${
                                label === "Total"
                                  ? "text-[15px] font-bold text-[color:var(--cinopse-ink)] sm:text-base"
                                  : "font-medium text-[color:var(--cinopse-text-secondary)]"
                              }`}
                            >
                              {label}
                            </span>
                            <span
                              className={`font-display ${
                                label === "Total"
                                  ? "text-lg font-bold text-[color:var(--cinopse-primary)] sm:text-xl"
                                  : "text-sm font-normal text-[color:var(--cinopse-ink)]"
                              }`}
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <label className="mt-3 flex items-start gap-3 rounded-xl border border-[color:var(--cinopse-border)] bg-white px-4 py-3 text-[11px] leading-5 text-[color:var(--cinopse-text-secondary)]">
                      <input
                        type="checkbox"
                        checked={form.terms}
                        onChange={(event) => {
                          setForm((current) => ({ ...current, terms: event.target.checked }))
                          setErrors((current) => ({ ...current, terms: "" }))
                        }}
                        className="mt-1 size-4 rounded border-[color:var(--cinopse-border)] accent-[color:var(--cinopse-primary)]"
                      />
                      <span>
                        I agree to{" "}
                        <Link
                          href="/terms-and-conditions"
                          target="_blank"
                          className="font-medium text-[color:var(--cinopse-primary)] underline underline-offset-2"
                        >
                          terms and conditions
                        </Link>{" "}
                        <span className="text-red-600" aria-hidden="true">
                          *
                        </span>
                      </span>
                    </label>
                    {errors.terms ? <ErrorText>{errors.terms}</ErrorText> : null}
                    {errors.submit ? <ErrorText>{errors.submit}</ErrorText> : null}
                  </div>
                ) : null}

                {step === 4 ? (
                  <div data-wizard-step className="py-2 text-center animate-[swapIn_0.4s_cubic-bezier(.22,.9,.18,1)]">
                    <span
                      data-soft-pulse
                      className="mx-auto mb-3.5 grid size-16 place-items-center rounded-full bg-[#eaf3e9] text-3xl text-[#3f9150] animate-[softPulse_2.4s_ease-out_infinite]"
                    >
                      <Check className="size-7" aria-hidden="true" />
                    </span>
                    <h3 className="font-display m-0 text-center text-xl leading-tight font-semibold text-[color:var(--cinopse-primary)]">
                      You&apos;re registered!
                    </h3>
                    <p className="mt-2.5 text-[9.5px] leading-none font-normal tracking-[0.18em] text-[color:var(--cinopse-muted)] uppercase">
                      Your registration ID
                    </p>
                    <p className="font-display mt-1 text-2xl leading-tight font-semibold text-[color:var(--cinopse-primary)]">
                      {registrationId}
                    </p>
                    <p className="mt-3.5 text-center text-[10px] leading-4 font-light text-[color:var(--cinopse-faint)]">
                      We&apos;ve saved your seat for Sunday, 27 September 2026 at the Jawaharlal Nehru Planetarium, Bengaluru. A confirmation will follow on your email.
                    </p>
                  </div>
                ) : null}

                <div className="mt-5 flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep((current) => Math.max(1, current - 1))}
                    className={`inline-flex items-center justify-center rounded-full bg-[color:var(--cinopse-cream)] px-6 py-3 text-[12.5px] leading-none font-medium text-[color:var(--cinopse-text-secondary)] transition-colors hover:bg-[#e2dfd8] ${
                      step === 1 || step === 4 ? "invisible" : ""
                    }`}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-full bg-[color:var(--cinopse-primary)] px-6 py-3 text-[12.5px] leading-none font-medium text-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(27,75,150,0.35)] disabled:cursor-wait disabled:opacity-70"
                  >
	                    {isSubmitting
	                      ? "Saving…"
	                      : step === 3
	                      ? confirmButtonLabel
	                      : step === 4
	                        ? "Done"
                        : "Continue →"}
                  </button>
                </div>
              </div>
            ) : (
              <div data-wizard-step className="animate-[swapIn_0.4s_cubic-bezier(.22,.9,.18,1)]">
                <h3 className="font-display m-0 mb-1.5 text-xl leading-tight font-semibold text-[color:var(--cinopse-primary)]">
                  Check your registration
                </h3>
                <p className="mt-0 mb-4 text-xs leading-5 font-light text-[color:var(--cinopse-muted)]">
                  We&apos;ll check the registration linked to your Google account.
                </p>
                <Field
                  id="lEmail"
                  label="Email"
                  type="email"
                  value={googleProfile?.email ?? lookupEmail}
                  placeholder="you@example.com"
                  autoComplete="email"
                  readOnly
                  hint="Verified through Google and cannot be changed."
                  onChange={() => undefined}
                />
                <button
                  type="button"
                  onClick={checkRegistration}
                  disabled={isCheckingRegistration}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--cinopse-primary)] px-6 py-3 text-[12.5px] leading-none font-medium text-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(27,75,150,0.35)] disabled:cursor-wait disabled:opacity-70"
                >
                  {isCheckingRegistration ? "Checking…" : "Check Status"}
                </button>
                {lookupResult?.state === "missing" ? (
                  <div
                    className="mt-4 rounded-[14px] border-[1.5px] border-[rgba(217,164,65,0.5)] bg-[#fdf8ee] px-[18px] py-4 animate-[swapIn_0.4s_cubic-bezier(.22,.9,.18,1)]"
                  >
                    <h4 className="m-0 mb-2 flex items-center gap-2 font-display text-sm leading-5 font-semibold text-[color:var(--cinopse-ink)]">
                      <span className="grid size-[22px] place-items-center rounded-full bg-[#fdf4e4] text-[11px] text-[color:var(--cinopse-accent-deep)]">
                        ?
                      </span>
                      No registration found
                    </h4>
                    <p className="m-0 text-[11.5px] leading-5 font-light text-[color:var(--cinopse-text-secondary)]">
                      {lookupResult.message}
                    </p>
                  </div>
                ) : null}
              </div>
            )}

            <p className="mt-4 border-t border-[color:var(--cinopse-border)] pt-3.5 text-center text-[9.5px] leading-4 font-light text-[color:var(--cinopse-faint)]">
              Your details are securely saved to the CINOPSE registration system. For assistance write to cinopseindiamedical@gmail.com.
            </p>
              </>
            )}
          </div>
        </div>,
        document.body
      )
        : null}
    </>
  )
}

function RegistrationStatusDetails({
  details,
  onBack,
  onClose,
  showBack = true,
  isRetryingPayment = false,
  retryPaymentError = "",
  onPayNow,
}: {
  details: RegistrationLookupDetails
  onBack: () => void
  onClose: () => void
  showBack?: boolean
  isRetryingPayment?: boolean
  retryPaymentError?: string
  onPayNow?: () => void
}) {
  const canPayNow =
    details.registrationStatus === "Pending" &&
    details.paymentStatus === "Pending" &&
    details.amountValue > 0
  const paymentItems = [
    ["Amount", details.amount],
    ["Payment", details.payment],
    ["Payment status", details.paymentStatus],
    ["Coupon", details.coupon],
    ...(details.transactionId ? [["Transaction ID", details.transactionId]] : []),
  ]

  const detailSections = [
    {
      title: "Registration Details",
      items: [
        ["Registration ID", details.id],
        ["Registration date", details.registrationDate],
        ["Registration status", details.registrationStatus],
        ["Category", details.category],
      ],
    },
    {
      title: "Basic Details",
      items: [
        ["Name", details.name],
        ["Email", details.email],
        ["Mobile", details.mobile],
        ["City", details.city],
        ["MCN", details.medicalCouncilNumber],
        ["Institution / Hospital", details.institution],
      ],
    },
    {
      title: "Payment Details",
      items: paymentItems,
    },
  ]

  return (
    <section
      data-wizard-step
      aria-labelledby="registration-status-title"
      className="animate-[swapIn_0.4s_cubic-bezier(.22,.9,.18,1)]"
    >
      <div className="mr-9">
        <span className="mb-2 inline-flex items-center rounded-full bg-[#eaf3e9] px-3 py-1 text-[9px] font-medium text-[#3f9150] uppercase">
          Registration found
        </span>
        <h3
          id="registration-status-title"
          className="font-display m-0 text-lg leading-tight font-semibold text-[color:var(--cinopse-primary)]"
        >
          Registration status
        </h3>
        <p className="mt-1.5 text-[13px] leading-5 font-light text-[color:var(--cinopse-muted)]">
          These are the major details saved against your Google account.
        </p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {detailSections.map((section) => (
          <section
            key={section.title}
            aria-label={section.title}
            className="min-w-0 rounded-[13px] border border-[color:var(--cinopse-border)] bg-[color:var(--cinopse-cream)] px-3.5 py-3"
          >
            <h4 className="m-0 border-b border-[color:var(--cinopse-border)] pb-2 text-[11px] leading-none font-semibold text-[color:var(--cinopse-primary)] uppercase">
              {section.title}
            </h4>
            <div className="mt-2.5 grid gap-2.5">
              {section.items.map(([label, value]) => (
                <div key={label} className="flex min-w-0 items-start justify-between gap-3">
                  <span className="shrink-0 text-[10px] leading-5 font-medium text-[color:var(--cinopse-muted)] uppercase">
                    {label}
                  </span>
                  <b
                    className={`block min-w-0 truncate text-right text-[13px] leading-5 font-medium text-[color:var(--cinopse-ink)] ${
                      label === "Amount" || label === "Registration ID"
                        ? "font-display text-sm text-[color:var(--cinopse-primary)]"
                        : ""
                    }`}
                    title={value || undefined}
                  >
                    {value || "Not available"}
                  </b>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {canPayNow ? (
        <div className="mt-4 rounded-[14px] border border-[rgba(217,164,65,0.45)] bg-[#fdf8ee] px-4 py-3">
          <p className="m-0 text-[12px] leading-5 font-light text-[color:var(--cinopse-text-secondary)]">
            Payment is pending. Complete payment now to confirm your registration.
          </p>
          {retryPaymentError ? (
            <p role="alert" className="mt-2 text-[11px] leading-4 text-[#c0392b]">
              {retryPaymentError}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 flex flex-col-reverse justify-between gap-3 sm:flex-row">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--cinopse-cream)] px-5 py-2.5 text-[13px] leading-none font-medium text-[color:var(--cinopse-text-secondary)] transition-colors hover:bg-[#e2dfd8]"
          >
            ← Check Status
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          {canPayNow ? (
            <button
              type="button"
              onClick={onPayNow}
              disabled={isRetryingPayment}
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--cinopse-accent)] px-5 py-2.5 text-[13px] leading-none font-semibold text-[color:var(--cinopse-primary-deep)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(217,164,65,0.35)] disabled:cursor-wait disabled:opacity-70"
            >
              {isRetryingPayment ? "Opening Payment…" : "Pay Now"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--cinopse-primary)] px-5 py-2.5 text-[13px] leading-none font-medium text-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,.9,.18,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(27,75,150,0.35)]"
          >
            Close
          </button>
        </div>
      </div>
    </section>
  )
}

async function loadRazorpayCheckout() {
  if (window.Razorpay) return

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    )

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true })
      existingScript.addEventListener("error", () => reject(new Error("Unable to load Razorpay Checkout.")), { once: true })
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Unable to load Razorpay Checkout."))
    document.body.appendChild(script)
  })

  if (!window.Razorpay) {
    throw new Error("Razorpay Checkout is unavailable.")
  }
}

async function openRazorpayCheckout({
  idToken,
  registrationName,
  payment,
  form,
}: {
  idToken: string
  registrationName: string
  payment: {
    keyId: string
    orderId: string
    amount: number
    currency: string
  }
  form: WizardForm
}) {
  await loadRazorpayCheckout()

  await new Promise<void>((resolve, reject) => {
    const Razorpay = window.Razorpay
    if (!Razorpay) {
      reject(new Error("Razorpay Checkout is unavailable."))
      return
    }

    const checkout = new Razorpay({
      key: payment.keyId,
      amount: payment.amount,
      currency: payment.currency,
      name: "CiNOPSE India 2026",
      description: "Conference registration",
      order_id: payment.orderId,
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        registration: registrationName,
        mcn: form.medicalCouncilNumber,
      },
      theme: {
        color: "#1E4F9C",
      },
      handler: (razorpayResponse) => {
        void fetch("/api/registrations/razorpay/verify", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registrationName,
            razorpay_order_id: razorpayResponse.razorpay_order_id,
            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
            razorpay_signature: razorpayResponse.razorpay_signature,
          }),
        })
          .then(async (response) => {
            const payload = (await response.json()) as { message?: string }
            if (!response.ok) {
              throw new Error(payload.message || "Unable to verify payment.")
            }
            resolve()
          })
          .catch(reject)
      },
      modal: {
        ondismiss: () => reject(new Error("Payment was not completed.")),
      },
    })

    checkout.open()
  })
}

function Field({
  id,
  label,
  type = "text",
  value,
  placeholder,
  autoComplete,
  error,
  readOnly = false,
  hint,
  onChange,
}: {
  id: string
  label: string
  type?: string
  value: string
  placeholder?: string
  autoComplete?: string
  error?: string
  readOnly?: boolean
  hint?: string
  onChange: (value: string) => void
}) {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="mb-1.5 block text-[9.5px] leading-none font-medium tracking-[0.1em] text-[color:var(--cinopse-muted)] uppercase"
      >
        {label}{" "}
        <span className="text-red-600" aria-hidden="true">
          *
        </span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        readOnly={readOnly}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`w-full rounded-[10px] border-[1.5px] border-[color:var(--cinopse-border)] bg-white px-3.5 py-3 text-[13px] leading-5 text-[color:var(--cinopse-ink)] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[color:var(--cinopse-faint)] focus:border-[color:var(--cinopse-primary)] focus:shadow-[0_0_0_3px_rgba(27,75,150,0.1)] ${
          readOnly ? "cursor-not-allowed bg-[color:var(--cinopse-cream)] text-[color:var(--cinopse-muted)]" : ""
        }`}
      />
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[10.5px] leading-4 text-[color:var(--cinopse-muted)]">
          {hint}
        </p>
      ) : null}
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : null}
    </div>
  )
}

function PhoneField({
  value,
  error,
  onChange,
}: {
  value?: Value
  error?: string
  onChange: (value?: Value) => void
}) {
  return (
    <div className="mb-3">
      <label className="mb-1.5 block text-[9.5px] leading-none font-medium tracking-[0.1em] text-[color:var(--cinopse-muted)] uppercase">
        Mobile{" "}
        <span className="text-red-600" aria-hidden="true">
          *
        </span>
      </label>
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="IN"
        flags={flags}
        value={value}
        onChange={onChange}
        className="phone-input-control"
        numberInputProps={{
          id: "fPhone",
          autoComplete: "tel",
          "aria-invalid": error ? "true" : undefined,
          "aria-describedby": error ? "fPhone-error" : undefined,
        }}
      />
      {error ? <ErrorText id="fPhone-error">{error}</ErrorText> : null}
    </div>
  )
}

function ErrorText({
  id,
  children,
}: {
  id?: string
  children: ReactNode
}) {
  return (
    <p id={id} className="mt-1.5 text-[10.5px] leading-4 font-light text-[#c0392b]">
      {children}
    </p>
  )
}

function validateDetails(form: WizardForm) {
  const nextErrors: Record<string, string> = {}

  if (!form.name.trim()) nextErrors.name = "Please enter your full name."
  if (!emailPattern.test(form.email.trim())) {
    nextErrors.email = "Please enter a valid email address."
  }
  if (!form.phone || !isValidPhoneNumber(form.phone)) {
    nextErrors.phone = "Please enter a valid mobile number."
  }
  if (!form.city.trim()) nextErrors.city = "Please enter your city."
  if (!form.institution.trim()) {
    nextErrors.institution = "Please enter your institution or hospital."
  }
  if (!form.medicalCouncilNumber.trim()) {
    nextErrors.medicalCouncilNumber = "Please enter your Medical Council Number."
  }

  return nextErrors
}

function useCountdown(deadline: number, now: number) {
  const milliseconds = deadline - now

  if (milliseconds <= 0) return "Closed"

  let remaining = milliseconds
  const days = Math.floor(remaining / 864e5)
  remaining -= days * 864e5
  const hours = Math.floor(remaining / 36e5)
  remaining -= hours * 36e5
  const minutes = Math.floor(remaining / 6e4)
  remaining -= minutes * 6e4
  const seconds = Math.floor(remaining / 1000)

  return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
}

function formatPrice(amount: number | string) {
  const numericAmount = typeof amount === "number" ? amount : Number(amount)
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numericAmount)
}

function formatDisplayDate(value?: string) {
  if (!value) return "Not available"

  const normalizedValue = value.includes("T") ? value : value.replace(" ", "T")
  const date = new Date(normalizedValue)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

function getCouponFromRemarks(remarks?: string) {
  if (!remarks) return "Not applied"

  const couponMatch = remarks.match(/Coupon:\s*([^.]*)\./i)
  const coupon = couponMatch?.[1]?.trim()

  if (!coupon || coupon.toLowerCase() === "none") return "Not applied"

  return coupon
}

function formatCouponDetails(
  couponCode?: string,
  couponAmount?: number | string,
  remarks?: string,
) {
  const code = couponCode?.trim()
  const numericAmount =
    typeof couponAmount === "number" ? couponAmount : Number(couponAmount || 0)

  if (code) {
    return numericAmount > 0 ? `${code} · −${formatPrice(numericAmount)}` : code
  }

  return getCouponFromRemarks(remarks)
}

function getOnlineTransactionId(
  transactionId?: string,
  paymentStatus?: string,
  amount?: number | string,
) {
  const numericAmount = typeof amount === "number" ? amount : Number(amount || 0)

  if (
    transactionId?.trim() &&
    paymentStatus === "Success" &&
    numericAmount > 0
  ) {
    return transactionId.trim()
  }

  return ""
}
