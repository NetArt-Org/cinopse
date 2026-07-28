import { GsapProvider } from "@/components/layout/gsap-provider"
import { SiteHeader } from "@/components/layout/site-header"
import { AboutSection } from "@/components/sections/about-section"
import { AssociatePartnersSection } from "@/components/sections/associate-partners-section"
import { ConferenceHighlightsSection } from "@/components/sections/conference-highlights-section"
import { HeroSection } from "@/components/sections/hero-section"
import type { HeroSectionProps } from "@/components/sections/hero-section"
import { OrganizingCommitteeSection } from "@/components/sections/organizing-committee-section"
import { PopularDestinationSection } from "@/components/sections/popular-destination-section"
import { ProgrammeSection } from "@/components/sections/programme-section"
import { RegistrationSection } from "@/components/sections/registration-section"
import { SiteFooter } from "@/components/sections/site-footer"
import { VenueSection } from "@/components/sections/venue-section"

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Highlights", href: "/#highlights" },
  { label: "Agenda", href: "/agenda" },
  { label: "Committee", href: "/#leadership" },
  { label: "Venue", href: "/#venue" },
  { label: "Destination", href: "/#destination" },
  { label: "Partners", href: "/#partners" },
]

const hero: HeroSectionProps = {
  eyebrow:
    "CME Summit · Cardio · Renal · Obesity · Pulmonary · Sleep Medicine",
  titleWords: ["CINOPSE", "India", "2026"],
  goldWord: "India",
  tagline: [
    "One Place.",
    "One Agenda.",
    "One Vision.",
    "Infinite Possibilities.",
  ],
  description:
    "A comprehensive multidisciplinary medical conference — case-based discussions, guideline updates, innovations, and hands-on workshops, all under one roof in Bengaluru.",
  logo: {
    src: "/logo.jpg",
    alt: "CINOPSE logo",
  },
  ctaLabel: "Register Now",
  secondaryCtaLabel: "Explore the Conference",
  meta: [
    {
      title: "Sunday, 27 September 2026",
      description: "Save the date",
      icon: "calendar",
    },
    {
      title: "Jawaharlal Nehru Planetarium",
      description: "Sankey Road, Bengaluru",
      icon: "location",
    },
    {
      title: "CME Summit",
      description: "Multi-specialty sessions",
      icon: "medical",
    },
  ],
  specialties: [
    "Cardiology",
    "Nephrology",
    "Obesity & Diabetes",
    "Pulmonology",
    "Sleep Medicine",
    "Metabolic Medicine",
  ],
  stripItems: [
    "ONE PLACE",
    "ONE AGENDA",
    "ONE VISION",
    "INFINITE POSSIBILITIES",
    "27 SEPTEMBER 2026",
    "BENGALURU",
  ],
}

const committee = {
  eyebrow: "Leadership",
  title: "Organizing Committee",
  description:
    "The people shaping the agenda, the science, and the experience of CINOPSE India 2026.",
  leaders: [
    {
      initials: "SK",
      name: "Dr. Santosh K M",
      role: "Founder & CEO",
      affiliation: "Organising Chairman · Narayana Health City",
      message:
        "Our patients do not live within the boundaries of a single specialty — their care demands collaboration, shared expertise, and a unified approach. This vision gave birth to CINOPSE: a world-class multidisciplinary platform where knowledge is shared without boundaries, and every discussion serves one goal — better patient care.",
    },
    {
      initials: "VB",
      name: "Dr. Vinod Babu",
      role: "Chief Financial Officer",
      affiliation: "Organising Co-Chairperson · Dr Mohan's Diabetes Centre",
      message:
        "Academic excellence must be matched by financial discipline, transparent governance, and efficient resource allocation. CINOPSE is committed to a sustainable model that supports high-quality education, broad participation, and long-term growth — without compromising accessibility or impact.",
    },
    {
      initials: "KS",
      name: "Dr. Karthik S M",
      role: "Chief Operating Officer",
      affiliation: "Organising Treasurer · Apollo Hospitals",
      message:
        "By combining evidence-based medicine with real-world clinical experience, we bridge the gap between knowledge and practice — and mentor the next generation of healthcare professionals. Together, we can build a future where multidisciplinary collaboration becomes the foundation of clinical excellence.",
    },
  ],
  members: [
    {
      initials: "MM",
      name: "Dr Murali Mohan BV",
      caption: "President · Narayana Health City",
    },
    {
      initials: "SK",
      name: "Dr Sheetal Kamat",
      caption: "Organising Secretary · Apollo Hospitals",
    },
    {
      initials: "UH",
      name: "Dr Usha Humbi",
      caption: "Scientific Committee · Narayana Health City",
    },
    {
      initials: "SM",
      name: "Dr Soumya M S",
      caption: "Scientific Committee · Narayana Health City",
    },
    {
      initials: "PG",
      name: "Dr Praveen Gangadhara",
      caption: "Scientific Committee · Dr Mohan's Diabetes Centre",
    },
    {
      initials: "✣",
      name: "Vishnu · Stephen · Akash · Bhavishya",
      caption: "Hospitality & Logistics",
    },
  ],
}

const venue = {
  eyebrow: "Location",
  title: "About Venue",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Jawaharlal%20Nehru%20Planetarium%2C%20Sankey%20Road%2C%20Bengaluru&z=16&output=embed",
  mapCaption:
    "Jawaharlal Nehru Planetarium · Sankey Road, High Grounds, Bengaluru",
  mapTitle: "Map — Jawaharlal Nehru Planetarium, Bengaluru",
  venueTitle: "Jawaharlal Nehru Planetarium",
  description:
    "Sri T. Chowdaiah Road (Sankey Road), High Grounds, Bengaluru – 560001, Karnataka, India. An iconic city-centre landmark — easy to reach, and a fitting stage for a conference about looking forward.",
  details: [
    {
      icon: "sparkle" as const,
      text: "Sunday, 27 September 2026",
    },
    { icon: "phone" as const, text: "+91 63817 86183 · +91 99023 40225" },
    { icon: "email" as const, text: "cinopseindiamedical@gmail.com" },
  ],
  ctaLabel: "Get Directions",
  ctaHref:
    "https://www.google.com/maps/place/Jawaharlal+Nehru+Planetarium/@12.9848665,77.5896341,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae166bedda581f:0x757d1ae9f63c2835!8m2!3d12.9848665!4d77.5896341!16s%2Fg%2F1jky_rhrc?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D",
}

const registration = {
  eyebrow: "Join Us",
  title: "Registration",
  description:
    "Registration is open — rates rise at every deadline. Pick your category to compare.",
  comparison: {
    audiences: ["Delegate", "Student / HCP", "International"],
    eventDateLabel: "Sunday, 27 September 2026",
    eventDate: "2026-09-27T08:00:00+05:30",
    windowStart: "2026-07-24T00:00:00+05:30",
    phases: [
      {
        name: "Early",
        window: "Open now",
        status: "Open now" as const,
        prices: ["₹8,500", "₹5,500", "$180"],
      },
      {
        name: "Standard",
        window: "To be announced",
        status: "Upcoming" as const,
        prices: ["₹10,500", "₹6,500", "$220"],
      },
      {
        name: "Late",
        window: "To be announced",
        status: "Upcoming" as const,
        prices: ["₹12,500", "₹7,500", "$260"],
      },
      {
        name: "On-site",
        window: "27 Sep, at the venue",
        status: "Upcoming" as const,
        prices: ["₹14,000", "₹8,500", "$300"],
      },
    ],
    note: "Demo rates are shown for layout preview. Official registration fees will be published with the final programme — get notified the moment they go live.",
    ctaLabel: "Register Now",
  },
}

const popularDestination = {
  eyebrow: "Explore",
  title: "Popular Destination",
  heading: "Bengaluru — The Garden City of India's Innovation",
  paragraphs: [
    "CINOPSE India 2026 comes home to Namma Bengaluru — where India's medical institutions, research centres, and technology ecosystem meet leafy boulevards and legendary weather.",
    "From clinical mornings at the Planetarium to cultural evenings across the city, plan a visit that goes beyond the conference hall.",
  ],
  ctaLabel: "Explore Bengaluru",
  ctaHref:
    "https://www.google.com/maps/place/Bengaluru,+Karnataka/@12.987977,77.6219718,11z/data=!3m1!4b1!4m6!3m5!1s0x3bae1670c9b44e6d:0xf8dfc3e8517e4fe0!8m2!3d12.9628957!4d77.57754!16zL20vMDljMTc?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D",
  cards: [
    {
      title: "Vidhana Soudha",
      description: "The granite heart of the city",
      image: "/images/vidhana-soudha.jpg",
      alt: "Vidhana Soudha, Bengaluru",
    },
    {
      title: "Lalbagh Gardens",
      description: "The Glass House of the Garden City",
      image: "/images/lalbagh.jpg",
      alt: "Lalbagh Glass House, Bengaluru",
    },
    {
      title: "Bangalore Palace",
      description: "Tudor towers amid the tech city",
      image: "/images/bangalore-palace.jpg",
      alt: "Bangalore Palace",
    },
  ],
}

const associatePartners = {
  eyebrow: "Trusted By",
  title: "Our Associate Partners",
  description:
    "Partner announcements are underway — logos below are placeholders until confirmed.",
  partners: [
    "Partner Logo",
    "Partner Logo",
    "Partner Logo",
    "Partner Logo",
    "Partner Logo",
    "Partner Logo",
    "Partner Logo",
    "Partner Logo",
  ],
}

const about = {
  eyebrow: "Who We Are",
  title: "About CiNOPSE India 2026",
  eventDate: "2026-09-27T08:00:00+05:30",
  dateLabel: "27 Sep",
  eventLabel: "Sunday · 2026",
  locationLabel: "Bengaluru · India",
  paragraphs: [
    "CiNOPSE is an independent multidisciplinary medical conference created to foster collaboration, clinical excellence, and continuous professional development across diverse healthcare specialties. It is a dynamic platform where physicians, researchers, academicians, and allied healthcare professionals exchange knowledge and discuss solutions to contemporary clinical challenges.",
    "The scientific programme combines evidence-based updates, expert perspectives, real-world case discussions, and practical learning — with exposure to recent advances in diagnostics, therapeutics, digital health, and the technologies shaping the future of clinical practice.",
  ],
  quote: {
    text: "One Place, One Agenda, One Vision —",
    emphasis: "Infinite Possibilities",
    subtext:
      "The philosophy that connects ideas, expertise, and people to advance multidisciplinary medicine.",
  },
  pillars: [
    {
      icon: "sparkles" as const,
      title: "Comprehensive",
      description: "All key areas of healthcare under one roof.",
    },
    {
      icon: "scale" as const,
      title: "Multidisciplinary",
      description: "Experts from diverse fields working together.",
    },
    {
      icon: "case" as const,
      title: "Case-Based",
      description: "Real cases. Real insights. Real impact.",
    },
    {
      icon: "star" as const,
      title: "Innovations",
      description: "Latest advances shaping the future of medicine.",
    },
    {
      icon: "pen" as const,
      title: "Hands-On",
      description: "Workshops to learn, practice, and excel.",
    },
  ],
  stats: [
    { value: "22", label: "Scientific Sessions" },
    { value: "10", label: "Focus Areas" },
    { value: "1", label: "Day, One Roof" },
    { value: "∞", label: "Possibilities", accent: true },
  ],
}

const conferenceHighlights = {
  eyebrow: "Scientific Programme",
  title: "Conference Highlights",
  description:
    "Integrating metabolic medicine across specialties — grounded in the latest international guidelines.",
  highlights: [
    {
      number: "01",
      title: "Latest Guideline Updates",
      description: "ADA 2026, EASD, ESC, ACE, AHA, AASM & IOF",
    },
    {
      number: "02",
      title: "GLP-1, Dual & Triple Agonists",
      description: "The future of obesity & diabetes care",
    },
    {
      number: "03",
      title: "Cardio-Renal-Metabolic Syndrome",
      description: "One system, one integrated conversation",
    },
    {
      number: "04",
      title: "CGM & Diabetes Technology",
      description: "Continuous glucose monitoring in practice",
    },
    {
      number: "05",
      title: "Artificial Intelligence",
      description: "AI in everyday clinical practice",
    },
    {
      number: "06",
      title: "MASLD / Fatty Liver Disease",
      description: "From screening to management",
    },
    {
      number: "07",
      title: "Dyslipidemia",
      description: "Beyond LDL",
    },
    {
      number: "08",
      title: "Hypertension",
      description: "From guidelines to real-world practice",
    },
    {
      number: "09",
      title: "Obstructive Sleep Apnea",
      description: "The cardiometabolic risk connection",
    },
    {
      number: "10",
      title: "Osteoporosis & Sarcopenia",
      description: "Healthy aging across specialties",
    },
    {
      number: "11",
      title: "Case Discussions & Panel Debate",
      description: "Interactive, real-world clinical cases",
    },
    {
      number: "12",
      title: "Workshops & Awards",
      description: "Young Investigator Awards & networking",
    },
  ],
  focusLabel: "Focus Areas",
  focusAreas: [
    "Cardiology",
    "Diabetes",
    "Obesity",
    "Pulmonology",
    "Sleep Medicine",
    "Nephrology",
    "Fatty Liver Disease",
    "Dyslipidemia",
    "Osteoporosis",
    "Hypertension",
  ],
}

const programme = {
  eyebrow: "Programme",
  title: "The Programme — At a Glance",
  description:
    "Sunday, 27 September 2026 · Jawaharlal Nehru Planetarium, Bengaluru. A provisional one-day plan — final timings, halls, and faculty will be published with the official scientific programme.",
  dayLabel: "Day 1",
  dateLabel: "Sun, 27 Sep",
  items: [
    {
      time: "09:00",
      period: "AM",
      title: "Obstructive Sleep Apnea & Cardiometabolic Risk",
      description:
        "The sleep–heart–metabolism connection every specialty should screen for.",
      tags: ["09"],
    },
    {
      time: "10:30",
      period: "AM",
      title: "Osteoporosis, Sarcopenia & Healthy Aging",
      description:
        "Bone health across specialties — screening, treating, preventing the first fracture.",
      tags: ["10"],
    },
    {
      time: "11:30",
      period: "AM",
      title: "Interactive Case Discussions & Panel Debate",
      description: "Real cases, real decisions — the panel debates, the audience votes.",
      tags: ["11"],
    },
    {
      time: "02:00",
      period: "PM",
      title: "Young Investigator Awards",
      description: "The next generation presents — award session and jury felicitation.",
      tags: ["12"],
    },
    {
      time: "04:00",
      period: "PM",
      title: "Valedictory & Networking High Tea",
      description:
        "Closing remarks, take-home messages, and see you at CINOPSE 2027.",
    },
  ],
  ctaLabel: "Explore the Full Agenda",
  ctaHref: "/agenda",
  note: "Provisional programme for preview — subject to change until the official agenda is released.",
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
  links: [
    { label: "About the Conference", href: "#about" },
    { label: "Conference Highlights", href: "#highlights" },
    { label: "Full Agenda", href: "/agenda" },
    { label: "Organising Committee", href: "#leadership" },
    { label: "Venue", href: "#venue" },
    { label: "Registration", href: "#registration" },
  ],
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

export default function Home() {
  return (
    <div className="min-h-dvh bg-white text-[color:var(--cinopse-text)]">
      <SiteHeader items={navItems} />
      <GsapProvider>
        <main>
          <HeroSection {...hero} />
          <AboutSection {...about} />
          <ConferenceHighlightsSection {...conferenceHighlights} />
          <ProgrammeSection {...programme} />
          <OrganizingCommitteeSection {...committee} />
          <VenueSection {...venue} />
          <RegistrationSection {...registration} />
          <PopularDestinationSection {...popularDestination} />
          <AssociatePartnersSection {...associatePartners} />
        </main>
        <SiteFooter {...footer} />
      </GsapProvider>
    </div>
  )
}
