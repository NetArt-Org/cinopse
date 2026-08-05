import type { Metadata } from "next"

import { GsapProvider } from "@/components/layout/gsap-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { AgendaPageContent } from "@/components/sections/agenda-page-content"
import type { AgendaDay } from "@/components/sections/agenda-page-content"
import { RegistrationFormModal } from "@/components/forms/registration-form-modal"
import { SiteFooter } from "@/components/sections/site-footer"
import { policyFooterLinks } from "@/lib/policy-pages"

export const metadata: Metadata = {
  title: "Full Agenda — CINOPSE India 2026",
  description:
    "Provisional one-day agenda for CINOPSE India 2026 at Jawaharlal Nehru Planetarium, Bengaluru.",
}

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Highlights", href: "/#highlights" },
  { label: "Agenda", href: "/agenda" },
  { label: "Committee", href: "/#leadership" },
  { label: "Venue", href: "/#venue" },
  { label: "Destination", href: "/#destination" },
  { label: "Partners", href: "/#partners" },
]

const registrationComparison = {
  audiences: ["Delegates", "PG and Others", "International Delegates"],
  eventDateLabel: "Sunday, 27 September 2026",
  eventDate: "2026-09-27T08:00:00+05:30",
  windowStart: "2026-07-24T00:00:00+05:30",
  phases: [
    {
      name: "Early",
      window: "Open now",
      status: "Open now" as const,
      prices: ["₹1,000", "₹500", "₹2,500"],
    },
    {
      name: "Standard",
      window: "To be announced",
      status: "Upcoming" as const,
      prices: ["₹1,000", "₹500", "₹2,500"],
    },
    {
      name: "Late",
      window: "To be announced",
      status: "Upcoming" as const,
      prices: ["₹1,000", "₹500", "₹2,500"],
    },
    {
      name: "On-site",
      window: "27 Sep, at the venue",
      status: "Upcoming" as const,
      prices: ["₹1,000", "₹500", "₹2,500"],
    },
  ],
  note: "Registration cost: ₹1,000 for Delegates, ₹500 for PG and Others, and ₹2,500 for International Delegates.",
  ctaLabel: "Register Now",
}

const footer = {
  columns: [
    {
      title: "CINOPSE",
      brandEmphasis: "India 2026",
      logo: {
        src: "/logo.jpg",
        alt: "CINOPSE logo",
      },
      paragraphs: [
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
    "www.cinopse.com",
  ],
  socialLinks: [],
  copyright: "© 2026 CINOPSE India. All rights reserved.",
}

const agendaDays: AgendaDay[] = [
  {
    day: "DAY 1",
    date: "Sun, 27 Sep",
    blocks: [
      {
        time: "08:00",
        duration: "90 MIN",
        title: "Registration & Networking Breakfast",
        hall: "FOYER · MAIN HALL",
        sessions: [
          {
            title: "Delegate check-in & kit collection",
            time: "08:00 – 09:30",
            description:
              "Badge collection, conference kit, and breakfast with colleagues across specialties.",
          },
        ],
      },
      {
        time: "09:30",
        duration: "45 MIN",
        title: "Inauguration — The Beginning",
        hall: "MAIN HALL",
        sessions: [
          {
            title: "Welcome & lighting of the lamp",
            time: "09:30 – 10:15",
            description:
              "The organising committee opens CINOPSE India 2026 — one place, one agenda, one vision, infinite possibilities.",
            faculty: "Organising committee · chief guest to be announced",
          },
        ],
      },
      {
        time: "10:30",
        duration: "60 MIN",
        title: "Guidelines Keynote",
        hall: "MAIN HALL",
        sessions: [
          {
            number: "01",
            title: "Latest Guideline Updates",
            time: "10:30 – 11:30",
            description:
              "What changed and what it means at the bedside — ADA 2026, EASD, ESC, ACE, AHA, AASM & IOF.",
            faculty: "Chairpersons & speakers to be announced",
          },
        ],
      },
      {
        kind: "break",
        time: "11:30",
        label: "Tea & exhibition break",
        duration: "15 MIN",
      },
      {
        time: "11:45",
        duration: "90 MIN",
        title: "Metabolic Medicine Session",
        hall: "MAIN HALL",
        sessions: [
          {
            number: "02",
            title: "GLP-1, Dual & Triple Agonists",
            time: "11:45 – 12:30",
            description:
              "The future of obesity & diabetes care — who, when, and how to sequence.",
            faculty: "Chairpersons & speakers to be announced",
          },
          {
            number: "03",
            title: "Cardio-Renal-Metabolic Syndrome",
            time: "12:30 – 13:15",
            description:
              "One system, one integrated conversation across cardiology, nephrology, and diabetology.",
            faculty: "Chairpersons & speakers to be announced",
          },
        ],
      },
      {
        kind: "break",
        time: "13:15",
        label: "Lunch & exhibition",
        duration: "60 MIN",
      },
      {
        time: "14:15",
        duration: "120 MIN",
        title: "Integrated Care Afternoon",
        hall: "MAIN HALL",
        sessions: [
          {
            number: "04",
            title: "CGM & Diabetes Technology",
            time: "14:15 – 14:45",
            description:
              "Continuous glucose monitoring in practice — reading, reacting, and titrating.",
            faculty: "Chairpersons & speakers to be announced",
          },
          {
            number: "05",
            title: "Artificial Intelligence in Clinical Practice",
            time: "14:45 – 15:15",
            description:
              "What AI can already do for your clinic — and what it can't yet.",
            faculty: "Chairpersons & speakers to be announced",
          },
          {
            number: "06",
            title: "MASLD / Fatty Liver Disease",
            time: "15:15 – 15:45",
            description:
              "From screening to management — a practical pathway for every clinic.",
            faculty: "Chairpersons & speakers to be announced",
          },
          {
            number: "07",
            title: "Dyslipidemia — Beyond LDL",
            time: "15:45 – 16:15",
            description: "Residual risk, Lp(a), and where the newer agents fit.",
            faculty: "Chairpersons & speakers to be announced",
          },
        ],
      },
      {
        kind: "break",
        time: "16:15",
        label: "Tea & exhibition break",
        duration: "15 MIN",
      },
      {
        time: "16:30",
        duration: "150 MIN",
        title: "Sleep, Bone Health & Interactive Forum",
        hall: "MAIN HALL",
        sessions: [
          {
            number: "08",
            title: "Hypertension — From Guidelines to Real-World Practice",
            time: "16:30 – 17:00",
            description:
              "Thresholds, targets, and combinations that actually work in the clinic.",
            faculty: "Chairpersons & speakers to be announced",
          },
          {
            number: "09",
            title: "Obstructive Sleep Apnea & Cardiometabolic Risk",
            time: "17:00 – 17:30",
            description:
              "The sleep–heart–metabolism connection every specialty should screen for.",
            faculty: "Chairpersons & speakers to be announced",
          },
          {
            number: "10",
            title: "Osteoporosis, Sarcopenia & Healthy Aging",
            time: "17:30 – 18:00",
            description:
              "Bone health across specialties — screening, treating, and preventing the first fracture.",
            faculty: "Chairpersons & speakers to be announced",
          },
          {
            number: "11",
            title: "Interactive Case Discussions & Panel Debate",
            time: "18:00 – 18:30",
            description:
              "Real cases, real decisions — the panel debates, the audience votes.",
            faculty: "Panel to be announced",
          },
          {
            number: "12",
            title: "Young Investigator Awards",
            time: "18:30 – 19:00",
            description:
              "The next generation presents — award session judged by senior faculty.",
            faculty: "Jury to be announced",
          },
        ],
      },
      {
        time: "19:00",
        duration: "45 MIN",
        title: "Valedictory & Networking High Tea",
        hall: "MAIN HALL",
        sessions: [
          {
            title: "Closing remarks & take-home messages",
            time: "19:00 – 19:45",
            description:
              "Key messages from a day of multidisciplinary medicine — and see you at CINOPSE 2027.",
          },
        ],
      },
    ],
  },
]

export default function AgendaPage() {
  return (
    <div className="min-h-dvh bg-[color:var(--cinopse-cream)] text-[color:var(--cinopse-text)]">
      <SiteHeader items={navItems} />
      <RegistrationFormModal {...registrationComparison} />
      <GsapProvider>
        <header className="relative overflow-hidden bg-[image:var(--cinopse-gradient-reference-blue)] pt-[126px] pb-[42px] text-white">
          <div className="absolute -top-[200px] -right-40 size-[480px] rounded-full bg-[rgba(29,90,180,.5)] blur-[90px]" />
          <div className="relative z-10 mx-auto max-w-[1000px] px-7">
            <div className="mb-3 flex items-center gap-[13px]">
              <span className="h-0.5 w-[42px] bg-[color:var(--cinopse-accent)]" />
              <b className="text-[11px] leading-none font-medium tracking-[0.22em] text-[color:var(--cinopse-accent)] uppercase">
                Scientific Programme
              </b>
            </div>
            <h1 className="font-display m-0 mb-3 text-[clamp(30px,4.6vw,44px)] leading-[1.12] font-semibold tracking-[-0.01em]">
              Full Agenda — CINOPSE India 2026
            </h1>
            <p className="m-0 max-w-[640px] text-[13px] leading-[1.7] font-light text-white/70">
              One day, twenty-two scientific sessions, one roof. The complete flow
              of the summit, integrating metabolic medicine across specialties.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {[
                "Sunday, 27 September 2026",
                "Jawaharlal Nehru Planetarium, Bengaluru",
                "Main Hall · Single track",
              ].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-[15px] py-2.5 text-[11px] leading-none font-normal text-white/85"
                >
                  <i className="size-1.5 rounded-full bg-[color:var(--cinopse-accent)]" />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </header>

        <AgendaPageContent days={agendaDays} />
        <SiteFooter {...footer} />
      </GsapProvider>
    </div>
  )
}
