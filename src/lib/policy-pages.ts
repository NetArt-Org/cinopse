import type { FooterLinkItem } from "@/components/sections/site-footer"

export const policyNavItems = [
  { label: "About", href: "/#about" },
  { label: "Highlights", href: "/#highlights" },
  { label: "Agenda", href: "/agenda" },
  { label: "Committee", href: "/#leadership" },
  { label: "Venue", href: "/#venue" },
  { label: "Destination", href: "/#destination" },
  { label: "Organizers", href: "/#partners" },
]

export const policyFooterLinks: FooterLinkItem[] = [
  { label: "About the Conference", href: "/#about" },
  { label: "Conference Highlights", href: "/#highlights" },
  { label: "Full Agenda", href: "/agenda" },
  { label: "Organising Committee", href: "/#leadership" },
  { label: "Venue", href: "/#venue" },
  { label: "Registration", href: "/#registration" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
]

export const policyFooter = {
  columns: [
    {
      title: "CINOPSE",
      brandEmphasis: "India 2026",
      logo: {
        src: "/logo.jpg",
        alt: "CINOPSE logo",
      },
      paragraphs: [
        "Combined Initiative for Nurturing Outcomes through Precision Medicine with Scientific Evidence",
        "CME Summit for Cardio, Renal, Obesity, Pulmonary & Sleep Medicine — Sunday, 27 September 2026, Jawaharlal Nehru Planetarium, Bengaluru.",
      ],
    },
  ],
  linksTitle: "Navigate",
  links: policyFooterLinks,
  contactTitle: "Contact",
  contacts: [
    "+91 63817 86183",
    "+91 99023 40225",
    "cinopseindiamedical@gmail.com",
    "www.cinopse.in",
  ],
  socialLinks: [],
  copyright: "© 2026 CINOPSE India. All rights reserved.",
}

export const policyRegistrationComparison = {
  audiences: ["Delegates", "PG and Others", "International Delegates"],
  eventDateLabel: "Sunday, 27 September 2026",
  eventDate: "2026-09-27T08:00:00+05:30",
  windowStart: "2026-07-24T00:00:00+05:30",
  note: "Fees are selected automatically by category and date: Delegate ₹750/₹1,000/₹1,250, PG ₹500/₹750, International ₹2,500.",
  ctaLabel: "Register Now",
}

export type PolicySection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export type PolicyPage = {
  eyebrow: string
  title: string
  summary: string
  updated: string
  sections: PolicySection[]
}

const organiserContact =
  "For support, contact CINOPSE India at cinopseindiamedical@gmail.com, +91 63817 86183, or +91 99023 40225."

export const privacyPolicy: PolicyPage = {
  eyebrow: "Compliance",
  title: "Privacy Policy",
  summary:
    "This policy explains how CINOPSE India 2026 collects and uses registration, communication, and payment-related information for the conference.",
  updated: "05 August 2026",
  sections: [
    {
      title: "Conference Details",
      paragraphs: [
        "CINOPSE India 2026 is a multidisciplinary medical conference scheduled for Sunday, 27 September 2026 at Jawaharlal Nehru Planetarium, Sankey Road, Bengaluru.",
        "The conference covers cardio, renal, obesity, pulmonary, sleep medicine, metabolic medicine, guideline updates, case-based discussions, innovation, and hands-on learning.",
      ],
    },
    {
      title: "Information We Collect",
      bullets: [
        "Registration details such as name, email address, mobile number, city, institution or hospital, registration category, and medical council number where applicable.",
        "Payment details such as payable amount, coupon code, coupon discount, payment status, payment date, and Razorpay payment reference after successful online payment.",
        "Authentication details needed to let users sign in and validate registration flow during payment gateway verification.",
      ],
    },
    {
      title: "How We Use Information",
      bullets: [
        "To process registrations for Delegates, PG and Others, and International Delegates.",
        "To process payments through Razorpay and apply eligible coupon discounts.",
        "To send registration confirmations, payment updates, support replies, and conference-related communication.",
        "To maintain accurate conference records and support operational, compliance, and audit requirements.",
      ],
    },
    {
      title: "Payment Data",
      paragraphs: [
        "Online payments are processed through Razorpay. CINOPSE India does not store full card, UPI, net banking, wallet, or other sensitive payment instrument details on the website.",
        "Razorpay may process payment information under its own applicable policies and security standards.",
      ],
    },
    {
      title: "Data Sharing",
      paragraphs: [
        "Information may be shared with trusted service providers used for registration, authentication, payment processing, event operations, and necessary compliance.",
        "CINOPSE India does not sell registration information.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [organiserContact],
    },
  ],
}

export const refundPolicy: PolicyPage = {
  eyebrow: "Payments",
  title: "Refund Policy",
  summary:
    "This policy explains the general refund handling for CINOPSE India 2026 registrations and Razorpay payments.",
  updated: "05 August 2026",
  sections: [
    {
      title: "Registration Fees",
      paragraphs: [
        "Registration fees currently shown on the website are ₹1,000 for Delegates, ₹500 for PG and Others, and ₹2,500 for International Delegates.",
        "Eligible coupon codes may reduce the payable amount. A full waiver coupon may reduce the payable total to ₹0.",
      ],
    },
    {
      title: "Refund Requests",
      paragraphs: [
        "Refund requests are reviewed by the CINOPSE India team on a case-by-case basis. To request a refund, contact the team with your registered email address, mobile number, registration category, and payment reference if available.",
        "Approved refunds for online payments will be initiated to the original payment method through Razorpay or the relevant banking channel.",
      ],
    },
    {
      title: "Coupon and Waiver Registrations",
      paragraphs: [
        "If a coupon covers the full registration amount and the payable total is ₹0, no online payment is collected and no cash refund is applicable.",
        "Coupon discounts have no independent cash value and cannot be transferred or exchanged for cash.",
      ],
    },
    {
      title: "Gateway and Bank Timelines",
      paragraphs: [
        "Refund settlement timelines depend on Razorpay, the issuing bank, card network, UPI provider, wallet provider, or other payment partner involved in the transaction.",
        "Payment gateway charges, taxes, or bank charges may be non-refundable where applicable.",
      ],
    },
    {
      title: "Programme Changes",
      paragraphs: [
        "The scientific programme, speakers, timings, venue logistics, and sessions may be updated when required. Such updates do not automatically create a refund entitlement unless specifically communicated by CINOPSE India.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [organiserContact],
    },
  ],
}

export const termsAndConditions: PolicyPage = {
  eyebrow: "Legal",
  title: "Terms & Conditions",
  summary:
    "These terms apply to use of the CINOPSE India 2026 website and registration for the conference.",
  updated: "05 August 2026",
  sections: [
    {
      title: "Conference Participation",
      paragraphs: [
        "CINOPSE India 2026 is a multidisciplinary medical conference for physicians, researchers, academicians, allied healthcare professionals, postgraduate trainees, and related healthcare participants.",
        "By registering, participants agree to provide accurate information and follow event instructions shared by CINOPSE India.",
      ],
    },
    {
      title: "Registration Information",
      bullets: [
        "Participants must select the appropriate registration category: Delegates, PG and Others, or International Delegates.",
        "Mandatory fields, including medical council number where requested, must be completed accurately.",
        "Registrations may be reviewed before final confirmation.",
      ],
    },
    {
      title: "Payments and Coupons",
      bullets: [
        "Payable registrations are processed through Razorpay.",
        "The button may show Proceed to Pay when an amount is payable and Confirm Registration when a full discount coupon applies.",
        "Coupon codes are subject to eligibility, validation, availability, and organiser approval.",
        "A successful Razorpay payment or approved full-waiver registration is required for final registration completion.",
      ],
    },
    {
      title: "Programme and Venue",
      paragraphs: [
        "The conference is scheduled for Sunday, 27 September 2026 at Jawaharlal Nehru Planetarium, Sankey Road, Bengaluru.",
        "The agenda, speakers, timings, sessions, and event logistics are subject to change when required for academic, operational, or compliance reasons.",
      ],
    },
    {
      title: "Conduct and Access",
      paragraphs: [
        "Participants are expected to maintain professional conduct and comply with venue, registration, safety, and event guidelines.",
        "CINOPSE India may restrict access or take appropriate action if registration information is inaccurate or conduct disrupts the event experience.",
      ],
    },
    {
      title: "Content and Intellectual Property",
      paragraphs: [
        "Website content, conference materials, branding, session content, and related assets are intended for conference information and educational use unless otherwise stated.",
        "Unauthorised commercial reuse, reproduction, or distribution of conference materials is not permitted.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [organiserContact],
    },
  ],
}
