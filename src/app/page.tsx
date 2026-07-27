import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import {
  CalendarDays,
  Camera,
  ChevronDown,
  AtSign,
  Mail,
  MapPin,
  Phone,
  Send,
  Share2,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileNavigation } from "@/components/layout/mobile-navigation"

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

const registrationTiers = ["Early Registration", "Standard Registration", "Late Registration", "On-site Registration"]

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
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <OrganizingCommittee />
        <Venue />
        <Registration />
        <PopularDestination />
        <AssociatePartners />
      </main>
      <Footer />
    </div>
  )
}

function SiteHeader() {
  return <header className="sticky top-0 z-50 shadow-sm">
    <nav className="bg-[color:var(--cinopse-primary)]" aria-label="Main navigation">
      <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center px-6 lg:px-10">
        <Link href="#home" className="flex items-center gap-3 text-white" aria-label="CiNOPSE India 2026 home">
          <Image src="/logo.jpg" alt="CiNOPSE" width={58} height={58} className="size-13 rounded-full border-2 border-white/80 object-cover" priority />
          <span className="hidden text-sm font-bold tracking-[0.08em] uppercase sm:block">CiNOPSE India 2026</span>
        </Link>
        <div className="ml-auto hidden items-center gap-1 xl:flex">
          {navItems.map(({ label, hasDropdown }) => hasDropdown ? <div key={label} className="group relative"><span className="flex cursor-default items-center gap-1 px-3 py-7 text-[11px] font-semibold tracking-[0.03em] text-white uppercase transition-colors group-hover:bg-white/10 group-focus-within:bg-white/10">{label}<ChevronDown className="size-3" /></span><div className="invisible absolute right-0 top-full min-w-52 translate-y-2 border-t-2 border-[color:var(--cinopse-accent)] bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"><Link href="#" className="block px-4 py-2.5 text-sm text-[color:var(--cinopse-text)] hover:bg-[color:var(--cinopse-surface)]">Lorem ipsum</Link><Link href="#" className="block px-4 py-2.5 text-sm text-[color:var(--cinopse-text)] hover:bg-[color:var(--cinopse-surface)]">Lorem ipsum</Link></div></div> : <Link key={label} href="#" className="px-3 py-7 text-[11px] font-semibold tracking-[0.03em] text-white uppercase hover:bg-white/10">{label}</Link>)}
        </div>
        <div className="ml-auto"><MobileNavigation items={navItems} /></div>
      </div>
    </nav>
  </header>
}

function Hero() {
  return <section id="home" className="relative flex min-h-[460px] items-end overflow-hidden bg-[color:var(--cinopse-primary)] md:min-h-[620px]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(217,164,65,.42),transparent_26%),linear-gradient(112deg,rgba(9,37,77,.88),rgba(30,79,156,.48))]" />
    <div className="relative mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-10 lg:py-22"><div className="max-w-3xl border-l-4 border-[color:var(--cinopse-accent)] pl-6 text-white"><p className="text-xs font-bold tracking-[0.18em] text-[color:var(--cinopse-accent)] uppercase">CiNOPSE India 2026</p><h1 className="mt-4 text-[clamp(28px,4vw,48px)] leading-[1.1] font-bold">One Place. One Agenda. One Vision.</h1><p className="mt-6 max-w-2xl text-[clamp(16px,1.4vw,18px)] leading-8 text-white/90">India&apos;s Independent Multidisciplinary Medical Conference Bringing Together Healthcare Professionals Across Specialties.</p><Button className="mt-8 h-11 rounded-md bg-[color:var(--cinopse-accent)] px-6 text-xs font-bold tracking-[0.08em] text-[color:var(--cinopse-primary)] uppercase hover:bg-white">Register Now</Button></div><div className="mt-14 flex items-center gap-2 text-xs text-white/65"><CalendarDays className="size-4 text-[color:var(--cinopse-accent)]" /> Official conference visual coming soon</div></div>
  </section>
}

function About() {
  return <section className="relative overflow-hidden bg-white py-16 lg:py-24"><SectionTitle title="About CiNOPSE India 2026" /><div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-8 lg:grid-cols-2 lg:px-10"><div className="flex min-h-70 items-center justify-center border border-[color:var(--cinopse-border)] bg-[color:var(--cinopse-surface)] p-8"><Image src="/logo.jpg" alt="CiNOPSE placeholder" width={220} height={220} className="size-48 rounded-full object-cover opacity-75" /></div><div className="rounded-xl bg-white/80 p-1 text-[color:var(--cinopse-text-secondary)]"><p className="leading-7">CiNOPSE is an independent multidisciplinary medical conference created to foster collaboration, clinical excellence, and continuous professional development across diverse healthcare specialties.</p><p className="mt-4 leading-7">The conference provides a focused environment for healthcare professionals to share ideas, examine evidence, and engage in meaningful clinical conversations.</p><p className="mt-4 leading-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod, mauris a congue consequat, metus nisl ultrices eros, at aliquet nisl sem ut ligula.</p></div></div></section>
}

function OrganizingCommittee() {
  return <section className="bg-[color:var(--cinopse-primary)] py-16 lg:py-24"><SectionTitle title="Organizing Committee" dark /><div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-5 gap-y-8 px-6 py-8 sm:grid-cols-3 lg:grid-cols-4 lg:px-10">{committee.map(([role, name], index) => <article key={`${role}-${index}`} className="text-center text-white"><div className="mx-auto flex size-28 items-center justify-center rounded-full border-4 border-white/70 bg-white/10"><Image src="/logo.jpg" alt="Committee profile placeholder" width={84} height={84} className="size-20 rounded-full object-cover opacity-85" /></div><h2 className="mt-4 text-sm font-semibold">{name}</h2><p className="mt-1 text-xs leading-5 text-white/75">{role}<br />CiNOPSE India 2026</p></article>)}</div></section>
}

function Venue() {
  return <section className="bg-white py-16 lg:py-24"><SectionTitle title="About Venue" /><div className="mx-auto grid max-w-6xl gap-0 overflow-hidden rounded-xl border border-[color:var(--cinopse-border)] px-6 py-8 md:grid-cols-2 lg:px-10"><div className="flex min-h-80 flex-col items-center justify-center bg-[color:var(--cinopse-surface)] p-8 text-center"><MapPin className="size-10 text-[color:var(--cinopse-secondary)]" /><p className="mt-4 text-sm font-semibold text-[color:var(--cinopse-primary)]">Venue map coming soon</p><p className="mt-2 max-w-xs text-sm leading-6 text-[color:var(--cinopse-text-secondary)]">Official venue details will be announced shortly.</p></div><div className="flex flex-col justify-between p-7 text-center"><div><h2 className="text-[clamp(20px,2vw,28px)] font-bold text-[color:var(--cinopse-primary)]">Conference Venue</h2><div className="mt-7 grid gap-4 text-sm text-[color:var(--cinopse-text-secondary)]"><InfoBox icon={MapPin} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." /><InfoBox icon={Phone} text="+91 00000 00000" /><InfoBox icon={Mail} text="contact@cinopse.org" /></div></div><Button className="mx-auto mt-8 h-10 rounded-md bg-[color:var(--cinopse-primary)] px-6 text-xs font-bold tracking-[0.08em] text-white uppercase hover:bg-[color:var(--cinopse-secondary)]">Know More</Button></div></div></section>
}

function Registration() {
  return <section className="bg-[color:var(--cinopse-primary)] py-16 lg:py-24"><SectionTitle title="Registration" dark /><div className="mx-auto grid max-w-6xl gap-5 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">{registrationTiers.map((tier) => <article key={tier} className="rounded-xl bg-white p-6 shadow-sm"><h2 className="text-center text-lg font-bold text-[color:var(--cinopse-primary)]">{tier}</h2><div className="mt-5 divide-y divide-[color:var(--cinopse-border)] text-sm"><PriceItem label="Delegate" value="TBA" /><PriceItem label="Student / Other HCPs" value="TBA" /><PriceItem label="International Delegate" value="TBA" /></div></article>)}</div><div className="mt-2 text-center"><Button className="h-11 rounded-md bg-white px-7 text-xs font-bold tracking-[0.08em] text-[color:var(--cinopse-primary)] uppercase hover:bg-[color:var(--cinopse-accent)]">Register Now</Button></div></section>
}

function PopularDestination() {
  return <section className="bg-white py-16 lg:py-24"><SectionTitle title="Popular Destination" /><div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-8 md:grid-cols-2 lg:px-10"><div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center bg-[color:var(--cinopse-surface)] p-10"><div className="absolute inset-8 border border-[color:var(--cinopse-secondary)]/30" /><div className="relative text-center"><MapPin className="mx-auto size-12 text-[color:var(--cinopse-secondary)]" /><p className="mt-4 text-sm font-semibold text-[color:var(--cinopse-primary)]">Host city visual coming soon</p></div></div><div><h2 className="text-[clamp(20px,2vw,28px)] font-bold text-[color:var(--cinopse-primary)]">Discover our host city</h2><p className="mt-5 leading-7 text-[color:var(--cinopse-text-secondary)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod, mauris a congue consequat, metus nisl ultrices eros, at aliquet nisl sem ut ligula.</p><p className="mt-4 leading-7 text-[color:var(--cinopse-text-secondary)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae lacus non augue semper tincidunt.</p><div className="mt-7 text-center"><Button className="h-10 rounded-md bg-[color:var(--cinopse-primary)] px-6 text-xs font-bold tracking-[0.08em] text-white uppercase hover:bg-[color:var(--cinopse-secondary)]">Read More</Button></div></div></div></section>
}

function AssociatePartners() {
  return <section className="bg-white pb-16 lg:pb-20"><SectionTitle title="Our Associate Partners" /><div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-8 sm:grid-cols-3 lg:px-10">{["Partner Logo", "Partner Logo", "Partner Logo", "Partner Logo", "Partner Logo", "Partner Logo"].map((partner, index) => <div key={`${partner}-${index}`} className="flex h-28 items-center justify-center border border-[color:var(--cinopse-border)] bg-[color:var(--cinopse-surface)] px-4 text-center text-xs font-bold tracking-[0.08em] text-slate-400 uppercase grayscale">{partner}</div>)}</div></section>
}

function Footer() {
  return <footer className="bg-[color:var(--cinopse-text)] text-white"><div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-3 lg:px-10"><FooterBlock title="Conference Secretariat"><Image src="/logo.jpg" alt="CiNOPSE" width={76} height={76} className="mt-3 size-16 rounded-full object-cover" /><p className="mt-4 text-sm leading-6 text-white/70">Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.</p><p className="mt-4 text-sm leading-6 text-white/70">Phone: +91 00000 00000<br />Email: contact@cinopse.org</p></FooterBlock><FooterBlock title="Professional Conference Organizer"><div className="mt-3 flex size-16 items-center justify-center rounded-full bg-white/10"><Send className="size-7 text-[color:var(--cinopse-accent)]" /></div><p className="mt-4 text-sm leading-6 text-white/70">Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.</p><p className="mt-4 text-sm leading-6 text-white/70">Phone: +91 00000 00000<br />Email: info@example.com</p></FooterBlock><FooterBlock title="Useful Links"><div className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/70"><Link href="#home">Home</Link><Link href="#">Privacy Policy</Link><Link href="#">Faculty</Link><Link href="#">Terms & Conditions</Link><Link href="#">Organizing Committee</Link><Link href="#">Registration</Link></div></FooterBlock></div><div className="border-t border-white/20 py-5 text-center"><div className="flex justify-center gap-4"><Camera className="size-4" /><Share2 className="size-4" /><X className="size-4" /><AtSign className="size-4" /></div><p className="mt-4 text-xs text-white/60">© Copyright CiNOPSE India 2026. All Rights Reserved.</p></div></footer>
}

function SectionTitle({ title, dark = false }: { title: string; dark?: boolean }) {
  return <div className="mx-auto max-w-6xl px-6 lg:px-10"><h1 className={`mx-auto w-fit border-b-2 pb-3 text-center text-[clamp(22px,3vw,36px)] font-bold ${dark ? "border-[color:var(--cinopse-accent)] text-white" : "border-[color:var(--cinopse-accent)] text-[color:var(--cinopse-primary)]"}`}>{title}</h1></div>
}

function InfoBox({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return <div className="flex flex-col items-center gap-2 rounded-lg bg-[color:var(--cinopse-surface)] p-4"><Icon className="size-5 text-[color:var(--cinopse-secondary)]" /><p>{text}</p></div>
}

function PriceItem({ label, value }: { label: string; value: string }) {
  return <p className="flex justify-between gap-2 py-3 text-[color:var(--cinopse-text-secondary)]"><span>{label}</span><strong className="text-[color:var(--cinopse-primary)]">{value}</strong></p>
}

function FooterBlock({ title, children }: { title: string; children: ReactNode }) {
  return <div><h2 className="text-lg font-semibold text-[color:var(--cinopse-accent)]">{title}</h2>{children}</div>
}
