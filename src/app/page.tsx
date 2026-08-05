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

const founderMessage = `Medicine is evolving at an unprecedented pace. Every year, new evidence, updated clinical guidelines, and innovative therapies reshape the way we diagnose and treat disease. Yet one challenge remains—our patients do not live within the boundaries of a single specialty. Their care demands collaboration, shared expertise, and a unified approach.

This vision gave birth to CiNOPSE.

CiNOPSE was founded with a simple yet ambitious purpose: to create a world-class multidisciplinary platform where knowledge is shared without boundaries and where every discussion ultimately serves one goal—better patient care. We believe that when cardiologists, neurologists, nephrologists, pulmonologists, endocrinologists, obesity specialists, sleep physicians, and other healthcare professionals learn together, they deliver better outcomes together.

At CiNOPSE, our scientific programme is built upon the latest international clinical guidelines, landmark research, and evidence-based recommendations from leading medical societies across the world. However, medicine is more than published evidence. It is also the wisdom gained through years of clinical practice. CiNOPSE therefore provides a platform where distinguished experts share not only what the guidelines recommend, but also how they apply those recommendations in real-world patient care. It is this integration of scientific evidence and clinical experience that transforms knowledge into better decision-making.

Our commitment extends beyond today’s clinicians. We aspire to inspire the next generation of physicians by creating an environment where young doctors, postgraduate trainees, researchers, and academicians can learn directly from experienced leaders, exchange ideas, ask questions, and build the confidence to lead the future of healthcare.

CiNOPSE is more than a medical conference—it is a growing academic community driven by curiosity, collaboration, innovation, and excellence. Every session, every discussion, and every interaction is designed to strengthen multidisciplinary thinking and advance the standards of patient care.

As we continue this journey, I warmly invite you to become a part of CiNOPSE. Together, let us challenge conventional boundaries, embrace lifelong learning, and shape a future where collaboration is the foundation of exceptional healthcare.

One Place. One Agenda. One Vision. Infinite Possibilities.`

const cfoMessage = `Medicine is advancing rapidly, and every new guideline, therapy, and technology reinforces the need for multidisciplinary collaboration. CiNOPSE was created to bring specialists together on one platform where knowledge, experience, and innovation converge to improve patient outcomes. Our scientific programmes are grounded in global evidence and strengthened by real-world clinical insight, ensuring learning translates into practical bedside decision-making. As CFO, I believe academic excellence must be matched by financial discipline, transparent governance, and efficient resource allocation so every initiative delivers measurable value. CiNOPSE is committed to a sustainable model that supports high-quality education, broad participation, and long-term growth without compromising accessibility or impact. We also have a responsibility to nurture young clinicians and researchers, as investing in future leaders is essential to strengthening healthcare systems. I warmly invite you to join CiNOPSE as we combine collaboration, stewardship, and innovation to shape a future where better care is both clinically excellent and sustainably delivered. Together, we can build a stronger and more connected healthcare community.

One Place. One Agenda. One Vision. Infinite Possibilities.`

const cooMessage = `Medicine is evolving rapidly, driven by scientific discovery, technological innovation, and continuously updated clinical evidence. CiNOPSE was established to create a multidisciplinary platform where these advances are translated into meaningful improvements in patient care through collaboration across specialties. Our scientific programmes are developed around internationally recognized clinical guidelines, landmark research, and the collective expertise of distinguished clinicians. By combining evidence-based medicine with real-world clinical experience, we aim to bridge the gap between knowledge and practice. CiNOPSE also serves as a platform to mentor and inspire the next generation of healthcare professionals by facilitating learning from experienced experts and academic leaders. We are committed to fostering innovation, lifelong learning, and partnerships that strengthen healthcare delivery. Together, we can build a future where multidisciplinary collaboration becomes the foundation of clinical excellence. I warmly invite you to be a part of CiNOPSE and join us in shaping the future of medicine.

One Place. One Agenda. One Vision. Infinite Possibilities.`

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
      message: founderMessage,
    },
    {
      initials: "VB",
      name: "Dr. Vinod Babu",
      role: "Chief Financial Officer",
      affiliation: "Organising Co-Chairperson · Dr Mohan's Diabetes Centre",
      message: cfoMessage,
    },
    {
      initials: "KS",
      name: "Dr. Karthik S M",
      role: "Chief Operating Officer",
      affiliation: "Organising Treasurer · Apollo Hospitals",
      message: cooMessage,
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
    "CiNOPSE is an independent multidisciplinary medical conference created to foster collaboration, clinical excellence, and continuous professional development across diverse healthcare specialties. It provides a dynamic platform where physicians, researchers, academicians, and allied healthcare professionals come together to exchange knowledge, share experiences, and discuss solutions to contemporary clinical challenges.",
    "By encouraging interactions between specialties, CiNOPSE promotes an integrated approach to patient care that reflects the realities of modern medicine. The scientific program combines evidence-based updates, expert perspectives, real-world case discussions, and practical learning opportunities across diagnostics, therapeutics, digital health, and emerging technologies.",
    "Beyond scientific sessions, CiNOPSE aims to cultivate meaningful professional networks, encourage collaborative research, and inspire innovation across disciplines. Every edition reflects a shared commitment to lifelong learning, ethical medical practice, and the pursuit of excellence in healthcare.",
    "Built on the philosophy of “One Place, One Agenda, One Vision – Infinite Possibilities,” CiNOPSE strives to connect ideas, expertise, and people to advance multidisciplinary medicine and welcomes healthcare professionals from across the country and beyond.",
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
