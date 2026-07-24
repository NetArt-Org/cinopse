# AGENTS.md

## Project Overview

We are recreating a modern, premium **CiNOPSE India 2026 Event Registration** website using **Next.js**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Lucide React**.

This is **NOT** a marketing website or generic AI-generated landing page. The goal is to create a clean, editorial, healthcare-focused registration experience similar to premium conference/event websites.

The overall feeling should be:

- Clean
- Premium
- Editorial
- Spacious
- Minimal
- Professional
- Trustworthy
- Healthcare focused

Avoid unnecessary decorations or trendy AI-looking gradients.

---

# Extremely Important

## Never invent content.

Every piece of content must come from the event posters/images provided by the user.

That means:

- Do NOT create pricing.
- Do NOT create registration fees.
- Do NOT create speakers.
- Do NOT create sponsors.
- Do NOT create agenda.
- Do NOT create venue information.
- Do NOT create statistics.
- Do NOT create workshop details.
- Do NOT create dates.
- Do NOT create descriptions.

Only use information that exists inside the provided poster images.

If something is missing from the poster, leave the section out.

Never hallucinate content.

---

# Design Language

The design language should feel closer to:

- Healthcare Event Submission Website

NOT:

- Generic AI website
- TemplateForest templates
- Bootstrap conference templates
- Busy medical websites

---

# Theme

Healthcare

Primary color:

Blue

Blue should communicate:

- Trust
- Professionalism
- Medical
- Reliability

Background:

Pure White

Section backgrounds:

Very subtle gray only when needed.

No dark mode.

No heavy gradients.

No background illustrations.

No medical stock imagery.

No DNA graphics.

No hexagon patterns.

No floating healthcare graphics.

Content should create hierarchy—not graphics.

---

# Typography

Use responsive clamp() typography throughout.

Only use:

- h1
- h2
- h3
- p

No random font sizes.

## H1

Desktop:
48px

Mobile:
28px

Example

```css
font-size: clamp(28px, 4vw, 48px);
```

---

## H2

Desktop:
36px

Mobile:
22px

```css
font-size: clamp(22px, 3vw, 36px);
```

---

## H3

Desktop:
28px

Mobile:
20px

```css
font-size: clamp(20px, 2vw, 28px);
```

---

## Paragraph

Desktop

18px

Mobile

16px

```css
font-size: clamp(16px, 1.4vw, 18px);
```

---

Typography should feel editorial.

Use generous line height.

Do not crowd text.

---

# Layout

Desktop:

Two-column layout.

```
-----------------------------------------------------

Content                     Sticky Registration Form

(scrollable)                (sticky)

-----------------------------------------------------
```

Content scrolls.

Registration form remains sticky.

---

Mobile

Registration form should NOT appear inline.

Instead:

Sticky bottom button

```
Register Now
```

When tapped:

Open a Drawer or Dialog using shadcn.

The complete registration form appears.

Close button on top.

---

# Registration Form

Desktop:

Sticky

Mobile:

Drawer / Modal

The form should be broken into sections.

Example

Personal Information

Professional Information

Registration Information

Payment

Confirmation

Avoid one huge form.

---

# Payment

Payment gateway is NOT decided yet.

Only create the UI architecture.

Need:

- Payment summary area
- Payment method placeholder
- Proceed to Payment button

Keep payment logic modular.

Example

```
/lib/payment/

payment-provider.ts

payment-service.ts

payment-types.ts
```

No provider-specific code yet.

Later we should be able to plug in:

- Razorpay
- Cashfree
- PhonePe
- Stripe

without rewriting components.

---

# Component Structure

```
components/

layout/

sections/

forms/

payment/

shared/

ui/
```

---

Example

```
Hero

AboutConference

ConferenceHighlights

ConferenceThemes

Venue

Committee

FAQ

RegistrationForm

PaymentSummary

StickyRegistration

Footer
```

---

# Icons

Only use

Lucide React

Avoid random icon packs.

Icons should be simple.

Examples

Calendar

MapPin

Building2

Hospital

User

Users

HeartPulse

Brain

Activity

BadgeCheck

ShieldCheck

CreditCard

ArrowRight

ChevronRight

Phone

Mail

CircleCheck

---

# Spacing

Spacing is extremely important.

Lots of breathing room.

Never stack sections tightly.

Suggested spacing

Section padding

```
py-24
```

Large sections

```
py-32
```

Cards

```
gap-8
```

Grid

```
gap-10
```

Never create cramped layouts.

---

# Cards

Cards should be subtle.

Rounded

Shadow

Very light border

Example

```
rounded-3xl

border

shadow-sm
```

Avoid:

Heavy shadows

Gradient cards

Glassmorphism

Neumorphism

---

# Buttons

Primary

Blue

Rounded

Simple

Large touch targets

Examples

Register Now

Proceed to Payment

View Venue

Download Brochure

(if available in poster)

Never use flashy gradients.

---

# Forms

Use shadcn components.

Input

Textarea

Select

Checkbox

Radio Group

Button

Form

Separator

Accordion

Drawer

Dialog

ScrollArea

Card

Badge

---

# Responsiveness

Desktop

Tablet

Mobile

Everything must adapt naturally.

No horizontal scrolling.

No fixed widths.

Prefer

```
max-w-7xl

mx-auto

px-6

lg:px-10
```

---

# Accessibility

Every field must have

Label

Placeholder

Required state

Keyboard navigation

Focus styles

aria labels where appropriate

---

# Animations

Very subtle.

Fade

Slide

Opacity

No bouncing.

No floating objects.

No excessive motion.

Keep structure animation-friendly.

---

# Code Style

Reusable components.

No duplicated UI.

Strong typing.

Use TypeScript everywhere.

No inline styles.

Tailwind only.

Extract repeated values into constants.

---

# Content Rules

Again,

DO NOT invent content.

Only display information available inside the provided poster images.

If the poster changes,

the website content changes.

The website should behave like a visual translation of the poster into a modern web experience.

Nothing more.

Nothing less.