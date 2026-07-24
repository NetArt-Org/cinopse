import Image from "next/image"
import type React from "react"
import {
  Activity,
  Bone,
  BookOpenCheck,
  CalendarDays,
  Hand,
  HeartPulse,
  Mail,
  MapPin,
  Moon,
  Network,
  Phone,
  ShieldCheck,
  Stethoscope,
  TabletSmartphone,
  Users,
} from "lucide-react"

import { MobileRegistrationDrawer } from "@/components/event/mobile-registration-drawer"
import { RegistrationForm } from "@/components/event/registration-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { eventContent } from "@/lib/event-content"

const focusIcons = [
  HeartPulse,
  Activity,
  Users,
  Stethoscope,
  Moon,
  Activity,
  Stethoscope,
  Activity,
  Bone,
]

const highlightIcons = [
  Users,
  BookOpenCheck,
  ShieldCheck,
  Hand,
  TabletSmartphone,
  Network,
]

const pillarIcons = [Users, Network, BookOpenCheck, Activity, Hand]

const conferenceHighlightIcons = [
  BookOpenCheck,
  Activity,
  Moon,
  Stethoscope,
  Activity,
  Bone,
  HeartPulse,
  Activity,
  Users,
  TabletSmartphone,
  ShieldCheck,
  Network,
]

export default function Home() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-blue-50/80 via-white to-white text-slate-950">
      <Header />
      <main className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-8 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8 lg:pb-16 lg:pt-14">
        <div className="space-y-12">
          <HeroSection />
          <OverviewSection />
          <FocusAreasSection />
          <ConferenceHighlightsSection />
          <CommitteeSection />
          <ContactSection />
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <RegistrationForm />
          </div>
        </aside>
      </main>
      <Footer />
      <MobileRegistrationDrawer />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Image
          src="/logo.jpg"
          alt="CINOPSE"
          width={168}
          height={68}
          priority
          className="h-14 w-auto object-contain"
        />
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="space-y-7 py-4 lg:py-8">
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-[0.14em] text-blue-800 uppercase">
            {eventContent.cmeSummit}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {eventContent.name}
          </h1>
          <p className="text-xl font-medium text-blue-800">
            {eventContent.theme}
          </p>
        </div>
        <p className="max-w-3xl text-lg font-semibold leading-snug text-slate-800">
          {eventContent.tagline}
        </p>
        <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <InfoPill icon={CalendarDays} text={eventContent.date} />
          <InfoPill icon={MapPin} text={eventContent.city} />
          <InfoPill icon={MapPin} text={eventContent.venue} />
        </div>
      </div>
    </section>
  )
}

function OverviewSection() {
  return (
    <section className="space-y-5">
      <SectionHeading
        title={eventContent.conferenceType}
        body={eventContent.description}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {eventContent.pillars.map((pillar, index) => {
          const Icon = pillarIcons[index] ?? Activity

          return (
            <Card key={pillar.title} className="shadow-none">
              <CardHeader className="space-y-4">
                <Icon className="size-7 text-blue-800" aria-hidden="true" />
                <CardTitle className="text-base text-blue-900">
                  {pillar.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-600">
                  {pillar.body}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Card className="bg-slate-50 shadow-none">
        <CardContent className="p-5">
          <p className="text-base leading-7 text-slate-700">
            {eventContent.mission}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}

function FocusAreasSection() {
  return (
    <section className="space-y-5">
      <SectionHeading title="Focus Areas" body={eventContent.cityLine} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {eventContent.focusAreas.map((area, index) => {
          const Icon = focusIcons[index] ?? Activity

          return (
            <Card key={area} className="shadow-none">
              <CardContent className="flex min-h-32 flex-col justify-center gap-5 p-5">
                <Icon className="size-6 text-blue-800" aria-hidden="true" />
                <p className="text-sm font-semibold text-slate-800">{area}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

function ConferenceHighlightsSection() {
  return (
    <section className="space-y-5">
      <SectionHeading
        title="Conference Highlights"
        body="One Conference. Multiple Specialties. Limitless Collaboration."
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {eventContent.highlights.map((highlight, index) => {
          const Icon = conferenceHighlightIcons[index] ?? ShieldCheck

          return (
            <div
              key={highlight}
              className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700"
            >
              <Icon
                className="mt-0.5 size-5 shrink-0 text-blue-800"
                aria-hidden="true"
              />
              <span>{highlight}</span>
            </div>
          )
        })}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {eventContent.whyAttend.map((item, index) => {
          const Icon = highlightIcons[index] ?? ShieldCheck

          return (
            <Card key={item} className="shadow-none">
              <CardContent className="flex items-center gap-3 p-4">
                <Icon className="size-5 text-blue-800" aria-hidden="true" />
                <p className="text-sm font-medium text-slate-800">{item}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

function CommitteeSection() {
  return (
    <section className="space-y-5">
      <SectionHeading title="Organising Committee" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {eventContent.committee.map((member) => (
          <Card key={`${member.role}-${member.name}`} className="shadow-none">
            <CardHeader>
              <p className="text-xs font-semibold tracking-[0.12em] text-blue-800 uppercase">
                {member.role}
              </p>
              <CardTitle className="text-base">{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{member.affiliation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Hospitality & Logistics</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {eventContent.logistics.map((person) => (
            <span
              key={person}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900"
            >
              {person}
            </span>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="space-y-5">
      <SectionHeading title="For Enquiries, Contact" />
      <div className="grid gap-4 md:grid-cols-2">
        <ContactCard icon={Phone} text={eventContent.enquiryPhone} />
        <ContactCard icon={Phone} text={eventContent.alternatePhone} />
        <ContactCard icon={Mail} text={eventContent.email} />
        <ContactCard icon={Network} text={eventContent.website} />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white pb-24 lg:pb-0">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <Image
          src="/logo.jpg"
          alt="CINOPSE"
          width={132}
          height={54}
          className="h-11 w-auto object-contain"
        />
        <p className="text-sm text-slate-500">© CINOPSE 2026</p>
      </div>
    </footer>
  )
}

function SectionHeading({ title, body }: { title: string; body?: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>
      {body ? <p className="max-w-3xl leading-7 text-slate-600">{body}</p> : null}
    </div>
  )
}

function InfoPill({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  text: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-white/85 px-4 py-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-blue-800" aria-hidden={true} />
      <span className="leading-6">{text}</span>
    </div>
  )
}

function ContactCard({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  text: string
}) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex items-center gap-3 p-4">
        <Icon className="size-5 text-blue-800" aria-hidden={true} />
        <p className="text-sm font-medium text-slate-800">{text}</p>
      </CardContent>
    </Card>
  )
}
