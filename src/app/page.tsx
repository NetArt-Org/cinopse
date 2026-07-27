import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import {
  ArrowRight,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { GsapProvider } from "@/components/layout/gsap-provider"
import { RegistrationPriceComparison } from "@/components/sections/registration-price-comparison"
import { DestinationCoverflow } from "@/components/sections/destination-coverflow"

const committee = [
  ["Founder & CEO", "Dr. Santosh K M"],
  ["Chief Financial Officer", "Dr. Vinod Babu"],
  ["Chief Operating Officer", "Dr. Karthik S M"],
  ["Scientific Committee", "Lorem Ipsum"],
  ["Organizing Committee", "Lorem Ipsum"],
  ["Conference Secretariat", "Lorem Ipsum"],
  ["Scientific Committee", "Lorem Ipsum"],
  ["Organizing Committee", "Lorem Ipsum"],
  ["Conference Secretariat", "Lorem Ipsum"],
  ["Scientific Committee", "Lorem Ipsum"],
  ["Organizing Committee", "Lorem Ipsum"],
  ["Conference Secretariat", "Lorem Ipsum"],
]

const navItems = [
  { label: "Congress Information", hasDropdown: true },
  { label: "Venue & Nearby", hasDropdown: true },
  { label: "Program", hasDropdown: true },
  { label: "Organizers", hasDropdown: true },
  { label: "Registration", hasDropdown: false },
  { label: "Abstract", hasDropdown: false },
  { label: "Faculty", hasDropdown: true },
  { label: "Contact Us", hasDropdown: false },
]

export default function Home() {
  return (
    <div className="min-h-dvh bg-white text-[color:var(--cinopse-text)]">
      <SiteHeader items={navItems} />
      <GsapProvider>
        <main>
          <Hero />
          <OrganizingCommittee />
          <Venue />
          <Registration />
          <PopularDestination />
          <AssociatePartners />
          <About />
        </main>
        <Footer />
      </GsapProvider>
    </div>
  )
}

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[color:var(--cinopse-primary-deep)]"
    >
      <div className="absolute inset-0" data-parallax="0.25">
        <Image
          src="/images/cinopse-hero-cover.png"
          alt="Bengaluru city skyline at night"
          fill
          priority
          className="scale-110 object-cover object-center"
        />
      </div>
      {/* Layered overlays for depth + legibility */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,44,88,0.94)_0%,rgba(15,44,88,0.78)_42%,rgba(15,44,88,0.28)_72%,rgba(15,44,88,0.1)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,44,88,0.65)_0%,transparent_45%)]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
        <div data-reveal-group className="max-w-3xl">
          <div className="relative border-l-2 border-[color:var(--cinopse-accent)] pl-6 text-white">
            <p data-reveal className="eyebrow text-[color:var(--cinopse-accent-soft)]">
              <Sparkles className="size-3.5" /> CiNOPSE India 2026
            </p>
            <h1
              data-reveal
              className="font-display mt-5 text-[clamp(34px,5.4vw,60px)] font-semibold leading-[1.05] tracking-[-0.01em]"
            >
              One Place. One Agenda.{" "}
              <span className="italic text-[color:var(--cinopse-accent-soft)]">
                One Vision.
              </span>
            </h1>
            <p
              data-reveal
              className="mt-6 max-w-2xl text-[clamp(16px,1.4vw,18px)] leading-8 text-white/85"
            >
              India&apos;s Independent Multidisciplinary Medical Conference Bringing Together Healthcare Professionals Across Specialties.
            </p>
            <div data-reveal className="mt-9 flex flex-wrap items-center gap-4">
              <Button className="h-12 px-8 text-[13px]">
                Register Now <ArrowRight className="size-4" />
              </Button>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2.5 text-xs text-white/75 backdrop-blur-sm">
                <CalendarDays className="size-4 text-[color:var(--cinopse-accent)]" /> Official conference visual coming soon
              </span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="pointer-events-none mt-16 hidden items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/50 lg:flex">
          <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1">
            <span className="h-2 w-0.5 animate-bounce rounded-full bg-[color:var(--cinopse-accent)]" />
          </span>
          Scroll to explore
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="bg-grid-faint absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading eyebrow="Who We Are" title="About CiNOPSE India 2026" />
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.85fr_1fr]">
          <div data-reveal="left" className="relative mx-auto w-full max-w-md">
            {/* Layered gold frame behind the image */}
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[image:var(--cinopse-gradient-gold)] opacity-15" />
            <div className="absolute -right-5 -top-5 -z-10 size-24 rounded-full bg-[color:var(--cinopse-secondary)]/10" />
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[1.75rem] border border-[color:var(--cinopse-border)] bg-[color:var(--cinopse-surface)] shadow-[var(--cinopse-shadow-lg)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,164,65,0.12),transparent_60%)]" />
              <Image
                src="/logo.jpg"
                alt="CiNOPSE placeholder"
                width={240}
                height={240}
                className="size-52 rounded-full border-4 border-white object-cover shadow-md"
              />
            </div>
          </div>
          <div data-reveal="right" className="text-[color:var(--cinopse-text-secondary)]">
            <p className="text-lg leading-8 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-[color:var(--cinopse-primary)]">
              CiNOPSE is an independent multidisciplinary medical conference created to foster collaboration, clinical excellence, and continuous professional development across diverse healthcare specialties.
            </p>
            <p className="mt-5 leading-8">
              The conference provides a focused environment for healthcare professionals to share ideas, examine evidence, and engage in meaningful clinical conversations.
            </p>
            <p className="mt-5 leading-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod, mauris a congue consequat, metus nisl ultrices eros, at aliquet nisl sem ut ligula.
            </p>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-[color:var(--cinopse-accent)]/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

function OrganizingCommittee() {
  return (
    <section className="relative overflow-hidden bg-[image:var(--cinopse-gradient-blue)] py-20 lg:py-28">
      <div className="bg-grid-faint absolute inset-0 opacity-[0.08]" />
      <div className="absolute -left-24 top-10 size-72 rounded-full bg-[color:var(--cinopse-accent)]/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 size-80 rounded-full bg-[color:var(--cinopse-secondary)]/25 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading eyebrow="Leadership" title="Organizing Committee" dark />
        <div
          data-reveal-group
          className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
        >
          {committee.map(([role, name], index) => (
            <article
              key={`${role}-${index}`}
              data-reveal="scale"
              data-card
              className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/12 bg-white/[0.07] py-6 text-center text-white shadow-[0_12px_34px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm"
            >
              <span
                data-card-fill
                className="absolute inset-0 rounded-[inherit] bg-[image:var(--cinopse-gradient-deep)]"
              />
              <div className="relative z-10 flex flex-col items-center">
                <div
                  data-icon-tile
                  className="flex size-24 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm"
                >
                  <Image
                    src="/logo.jpg"
                    alt="Committee profile placeholder"
                    width={84}
                    height={84}
                    className="size-[72px] rounded-full object-cover opacity-95"
                  />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold">{name}</h3>
                <p className="mt-1.5 text-xs leading-5 text-white/70">
                  {role}
                  <br />
                  CiNOPSE India 2026
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Venue() {
  return (
    <section className="bg-[color:var(--cinopse-surface)] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading eyebrow="Location" title="About Venue" />
        <div
          data-reveal="scale"
          className="mt-14 grid overflow-hidden rounded-[1.75rem] border border-[color:var(--cinopse-border)] bg-white shadow-[var(--cinopse-shadow-md)] md:grid-cols-2"
        >
          <div className="relative flex min-h-80 flex-col items-center justify-center bg-[image:var(--cinopse-gradient-deep)] p-10 text-center">
            <div className="bg-grid-faint absolute inset-0 opacity-10" />
            <div className="relative flex size-20 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <MapPin className="size-9 text-[color:var(--cinopse-accent)]" />
            </div>
            <p className="relative mt-6 text-sm font-semibold text-white">Venue map coming soon</p>
            <p className="relative mt-2 max-w-xs text-sm leading-6 text-white/70">
              Official venue details will be announced shortly.
            </p>
          </div>
          <div className="flex flex-col justify-between p-8 text-left lg:p-12">
            <div>
              <h3 className="font-display text-[clamp(22px,2.4vw,30px)] font-semibold text-[color:var(--cinopse-primary)]">
                Conference Venue
              </h3>
              <div className="mt-4 gold-rule" />
              <div className="mt-8 grid gap-3 text-left text-sm text-[color:var(--cinopse-text-secondary)]">
                <InfoChip icon={MapPin} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                <InfoChip icon={Phone} text="+91 00000 00000" />
                <InfoChip icon={Mail} text="contact@cinopse.org" />
              </div>
            </div>
            <div className="mt-10 flex justify-start">
              <Button>
                Know More <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Registration() {
  return (
    <section className="relative overflow-hidden bg-[image:var(--cinopse-gradient-blue)] py-20 lg:py-28">
      <div className="absolute -right-20 -top-16 size-80 roundfed-full bg-[color:var(--cinopse-accent)]/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading eyebrow="Join Us" title="Registration" dark />
        <RegistrationPriceComparison />
      </div>
    </section>
  )
}

function PopularDestination() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading eyebrow="Explore" title="Popular Destination" />
        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          <div data-reveal="left"><DestinationCoverflow /></div>
          <div data-reveal="right">
            <h3 className="font-display text-[clamp(22px,2.4vw,30px)] font-semibold text-[color:var(--cinopse-primary)]">
              Discover our host city
            </h3>
            <div className="mt-4 gold-rule" />
            <p className="mt-6 leading-8 text-[color:var(--cinopse-text-secondary)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod, mauris a congue consequat, metus nisl ultrices eros, at aliquet nisl sem ut ligula.
            </p>
            <p className="mt-4 leading-8 text-[color:var(--cinopse-text-secondary)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae lacus non augue semper tincidunt.
            </p>
            <div className="mt-8">
              <Button>
                Read More <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AssociatePartners() {
  return (
    <section className="bg-[color:var(--cinopse-surface)] py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionHeading eyebrow="Trusted By" title="Our Associate Partners" />
        <div
          data-reveal-group
          className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3"
        >
          {["Partner Logo", "Partner Logo", "Partner Logo", "Partner Logo", "Partner Logo", "Partner Logo"].map(
            (partner, index) => (
              <div
                key={`${partner}-${index}`}
                data-reveal="scale"
                data-card
                className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl border border-[color:var(--cinopse-border)] bg-white px-4 text-center shadow-[var(--cinopse-shadow-sm)]"
              >
                <span
                  data-card-fill
                  className="absolute inset-0 rounded-[inherit] bg-[image:var(--cinopse-gradient-deep)]"
                />
                <span className="relative z-10 text-xs font-bold uppercase tracking-[0.08em] text-slate-400">
                  {partner}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[image:var(--cinopse-gradient-deep)] text-white">
      <div className="h-1 w-full bg-[image:var(--cinopse-gradient-gold)]" />
      <div
        data-reveal-group
        className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-3 lg:px-10"
      >
        <FooterBlock title="Conference Secretariat">
          <Image
            src="/logo.jpg"
            alt="CiNOPSE"
            width={76}
            height={76}
            className="mt-4 size-16 rounded-full border border-white/20 object-cover"
          />
          <p className="mt-4 text-sm leading-6 text-white/65">
            Lorem ipsum dolor sit amet,
            <br />
            consectetur adipiscing elit.
          </p>
          <p className="mt-4 text-sm leading-6 text-white/65">
            Phone: +91 00000 00000
            <br />
            Email: contact@cinopse.org
          </p>
        </FooterBlock>
        <FooterBlock title="Professional Conference Organizer">
          <p className="mt-4 text-sm leading-6 text-white/65">
            Lorem ipsum dolor sit amet,
            <br />
            consectetur adipiscing elit.
          </p>
          <p className="mt-4 text-sm leading-6 text-white/65">
            Phone: +91 00000 00000
            <br />
            Email: info@example.com
          </p>
        </FooterBlock>
        <FooterBlock title="Useful Links">
          <div className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm text-white/65">
            {[
              ["Home", "#home"],
              ["Privacy Policy", "#"],
              ["Faculty", "#"],
              ["Terms & Conditions", "#"],
              ["Organizing Committee", "#"],
              ["Registration", "#"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="group inline-flex w-fit items-center gap-1.5 transition-colors hover:text-[color:var(--cinopse-accent)]"
              >
                <span className="h-px w-0 bg-[color:var(--cinopse-accent)] transition-all duration-300 group-hover:w-3" />
                {label}
              </Link>
            ))}
          </div>
        </FooterBlock>
      </div>
      <div data-reveal className="border-t border-white/12 py-6 text-center">
        <div className="flex justify-center gap-3">
          {[
            { icon: FaFacebookF, label: "Facebook" },
            { icon: FaInstagram, label: "Instagram" },
            { icon: FaTwitter, label: "Twitter" },
            { icon: FaLinkedinIn, label: "LinkedIn" },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--cinopse-accent)] hover:bg-white/5 hover:text-[color:var(--cinopse-accent)]"
            >
              <Icon className="size-3.5" />
            </a>
          ))}
        </div>
        <p className="mt-5 text-xs text-white/55">
          © Copyright CiNOPSE India 2026. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

function SectionHeading({
  eyebrow,
  title,
  dark = false,
}: {
  eyebrow: string
  title: string
  dark?: boolean
}) {
  return (
    <div data-reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <span
        className={`eyebrow ${
          dark ? "text-[color:var(--cinopse-accent-soft)]" : "text-[color:var(--cinopse-secondary)]"
        }`}
      >
        <span className="gold-rule" />
        {eyebrow}
      </span>
      <h2
        className={`font-display mt-4 text-[clamp(24px,3.4vw,40px)] font-semibold tracking-[-0.01em] ${
          dark ? "text-white" : "text-[color:var(--cinopse-primary)]"
        }`}
      >
        {title}
      </h2>
    </div>
  )
}

function InfoChip({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[color:var(--cinopse-border)] bg-[color:var(--cinopse-surface)] p-3.5 transition-colors hover:border-[color:var(--cinopse-accent)]/40">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[color:var(--cinopse-secondary)] shadow-sm">
        <Icon className="size-4" />
      </span>
      <p>{text}</p>
    </div>
  )
}

function FooterBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div data-reveal>
      <h3 className="font-display text-lg font-semibold text-[color:var(--cinopse-accent)]">
        {title}
      </h3>
      {children}
    </div>
  )
}
