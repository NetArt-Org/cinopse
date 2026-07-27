# AGENTS.md

# Project Overview

Build the official **CiNOPSE India 2026** website using:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

The website should closely replicate the **layout, visual hierarchy, spacing, navigation, and overall user experience** of the reference website:

https://2026.diabetesindia.org.in/

This project is **not** about redesigning the website. Recreate the same design language and component patterns while replacing the branding, colors, and content with CiNOPSE assets.

---

# Reference Guidelines

- Follow the same section ordering and page layouts as the reference website.
- Match the spacing, proportions, component sizing, navigation behavior, and UI patterns.
- Use **Lorem Ipsum** and placeholder content where actual content is not yet available.
- Do **not** invent conference information. Placeholder text will be replaced later.
- Page-wise structure will be provided separately during implementation. Do not define page structures yourself.

---

# Design Language

The website should feel:

- Professional
- Editorial
- Healthcare-focused
- Clean
- Spacious
- Trustworthy

Avoid:

- AI startup aesthetics
- SaaS landing pages
- Heavy gradients
- Glassmorphism
- Neumorphism
- Decorative background graphics
- Unnecessary animations

---
# Colors

Follow the same color hierarchy as the reference website.

These colors are based on the reference UI and should be treated as temporary design tokens until the final CiNOPSE brand colors are provided.

```ts
export const colors = {
  primary: "#1E4F9C",      // Primary Blue
  secondary: "#2F6FCB",    // Secondary Blue
  accent: "#D9A441",       // Gold Accent

  background: "#FFFFFF",
  surface: "#F7F9FC",

  text: "#1B2430",
  textSecondary: "#5E6B7A",

  border: "#E5EAF2",
};
```

Use these colors consistently across the project.

- **Primary Blue** → Navigation, buttons, links, active states.
- **Secondary Blue** → Secondary actions, highlights, badges.
- **Gold Accent** → Important CTAs, emphasis, and decorative accents (use sparingly).
- **White** → Primary page background.
- **Surface** → Alternate section backgrounds and cards.
- **Text** → Headings and primary content.
- **Text Secondary** → Body copy and supporting text.
- **Border** → Dividers, cards, inputs, and subtle separators.

Keep all colors centralized in the Tailwind theme (or design tokens) so the entire website can be rebranded by changing values in a single place.

Avoid hardcoding hex values inside components.
---

# Typography

Use the predefined responsive typography consistently across the entire project.

Do not introduce arbitrary font sizes.

Only use:

### H1

Desktop: **48px**

Mobile: **28px**

```css
font-size: clamp(28px, 4vw, 48px);
```

---

### H2

Desktop: **36px**

Mobile: **22px**

```css
font-size: clamp(22px, 3vw, 36px);
```

---

### H3

Desktop: **28px**

Mobile: **20px**

```css
font-size: clamp(20px, 2vw, 28px);
```

---

### Paragraph

Desktop: **18px**

Mobile: **16px**

```css
font-size: clamp(16px, 1.4vw, 18px);
```

---

Use generous line heights and spacing to maintain an editorial reading experience.

Prefer Tailwind utility classes for typography. If these sizes are reused frequently, extend the Tailwind theme instead of creating custom CSS classes.

Avoid inline styles and component-specific CSS for typography.

---

# Layout

Maintain the same layout principles as the reference website.

- Large whitespace
- Consistent vertical rhythm
- Balanced content width
- Responsive grids
- Editorial alignment

Prefer:

- `max-w-7xl`
- `mx-auto`
- `px-6`
- `lg:px-10`

---

# Components

Keep components simple, reusable, and modular.

Suggested structure:

```
components/
  layout/
  shared/
  sections/
  ui/
  forms/
```

Avoid unnecessary component abstraction.

Extract only reusable UI or repeated logic.

---

# Styling

Prefer **Tailwind CSS** for all styling.

- Use utility classes wherever possible.
- Avoid writing custom CSS.
- Use `globals.css` only for:
  - Tailwind imports
  - CSS variables
  - Font declarations
  - Global resets

Do not place component-specific styling in `globals.css`.

---

# Icons

Use **Lucide React** exclusively.

Keep icons minimal, consistent, and functional.

---

# Animations

Animations should be subtle.

Allowed:

- Fade
- Opacity
- Small translate
- Hover transitions

Avoid:

- Bounce
- Floating elements
- Continuous animations
- Large parallax
- Distracting effects

Performance should always take priority over visual effects. 

---

# Performance

Optimize for speed and maintainability.

- Server Components where appropriate
- Lazy load non-critical sections
- Optimize images
- Minimize client components
- Avoid unnecessary re-renders
- Keep bundle size small
- Reuse components instead of duplicating code

Always prefer simple implementations over complex abstractions.

---

# Accessibility

Every component should include:

- Semantic HTML
- Proper heading hierarchy
- Keyboard accessibility
- Focus states
- Labels for form fields
- Appropriate ARIA attributes when required

---

# Code Standards

- TypeScript everywhere
- Strong typing
- No inline styles
- Reusable components
- Clean folder structure
- Meaningful naming
- Consistent formatting

Write code that is easy to extend and maintain.

---

# Content

During development, use **Lorem Ipsum** or placeholder content wherever actual content is unavailable.

Do not fabricate conference information.

All placeholder content will be replaced with official CiNOPSE content later.