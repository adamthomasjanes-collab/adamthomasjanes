## Portfolio Image Delivery

- Thumbnails remain square, lightweight previews.
- Large gallery artwork may use WebP for live delivery when PNG size is excessive.
- Source-quality PNG files may remain alongside optimized delivery files.
- Artwork must use meaningful alt text and preserve full compositions without forced cropping.

### Utility-tab refinement — v5.6.3

- Animated perimeter: magenta accent against black only.
- Resting border orbit: 10 seconds; hover/focus orbit: 6.5 seconds.
- Expansion and label transitions are intentionally slower and staged.
- Collapsed Resume and LinkedIn labels use `rotate(90deg)` to face inward from the right edge.

## Editorial utility stack

- Desktop Resume and LinkedIn controls use black edge tabs with inward-facing collapsed labels.
- Their animated conic perimeter is always gently active and accelerates on hover/focus before the panel expands.
- Expanded labels include restrained identifying marks.
- Email uses an envelope icon and a simpler expansion treatment.
- Tablet/mobile show only the compact animated Resume utility.

# Adam Thomas Janes Editorial Identity Guide

## Version 0.2 — v5.1 Documentation Release

This guide defines the early identity system behind the Adam Thomas Janes editorial portfolio.

---

## Core Promise

> **I make complex information clear.**

This is the guiding statement for the website, résumé, case studies, and future portfolio materials.

---

## Positioning

Adam Thomas Janes is positioned as a **Communications & Marketing Professional** specializing in:

- Publication Design
- Web Communications
- Marketing Communications
- Adobe InDesign Production
- WordPress
- SEO
- Visual Communication Systems
- Accessibility-minded communication structure
- Production-ready execution

---

## Principles

### Communication before decoration

Visual design should clarify the message, not distract from it.

### Readers first

The reader’s experience shapes hierarchy, pacing, navigation, and structure.

### Typography carries meaning

Type is not surface styling. It controls tone, rhythm, credibility, and readability.

### Production matters

Good design must survive handoff, publication, printing, updating, and real-world use.

### Accessibility is clarity

Accessible structure improves communication for everyone.

### Search structure is communication

SEO, metadata, semantic HTML, and page hierarchy help people and search engines understand the content.

### Systems beat one-off design

Consistent rules make communication easier to maintain and expand.

---

## Typography

### Avenir / Avenir Next

Used for:

- Navigation
- Interface elements
- Section labels
- Captions
- Folios
- Modern editorial structure

Why:

Avenir provides clarity, geometry, and a modern professional voice.

### Georgia

Used for:

- Warmth
- Long-form readability
- Editorial rhythm
- Human texture

Why:

Georgia brings publication warmth and readability while remaining broadly available.

---

## Color Language

### Magenta

Use for:

- Signature accent
- Active states
- Logo rule
- Editorial emphasis
- Navigation indicators

Meaning:

Energy, attention, signature identity.

### Cyan

Use for:

- Publication/information structure accents
- Secondary CMYK language

### Yellow

Use for:

- Web/digital communication accents

### Black

Use for:

- Authority
- Clarity
- Core typography
- Final production language

### Paper Background

Use warm off-white rather than stark white to support the publication feel.

---

## Motion Principles

Motion should:

- Explain structure.
- Reinforce flow.
- Stay understated.
- Respect reduced-motion preferences.
- Avoid decorative clutter.

The Process section’s single moving rule is the preferred motion model: one object, clear purpose, calm timing.

---

## Editorial Components

Current system elements include:

- Issue framing
- Running heads
- Page folios
- Section folios
- Editor’s Letter
- Pull quote
- Feature cards
- Archive section
- Production notes
- Career record
- Colophon
- Margin notes
- Crop-mark-inspired details

---

## Voice

Write like an experienced communicator:

- Clear
- Direct
- Human
- Specific
- Practical
- Reader-first

Avoid vague phrases when concrete language will do more work.

### Preferred language

- Make complex information clear.
- Reader-first.
- Production-ready.
- Easy to maintain.
- Built to publish.
- Clear hierarchy.
- Communication before decoration.

### Avoid

- Empty corporate filler.
- Overused buzzwords.
- Claims that cannot be supported.
- Software lists without explaining value.

---

## Accessibility Standards

The system should support:

- Keyboard navigation.
- Visible focus states.
- Semantic HTML.
- Accessible dialogs.
- Readable contrast.
- Reduced-motion preferences.
- Clear heading order.
- No hover-only essential interactions.

---

## Documentation Standards

Every major release should update:

- `CHANGELOG.md`
- `CASE_STUDY.md`
- `README.md`
- `DESIGN_SYSTEM.md` when design-related
- `DECISIONS.md` when a major decision is made
- `KNOWN_ISSUES.md` when a risk or pending item is discovered
- `ROADMAP.md` when priorities change

---

## Maintainer Notes

This document is part of the Adam Thomas Janes portfolio repository and is intentionally written as a handoff artifact, not just a short project note. Keep notes plain, explicit, and useful for future editing. When the portfolio changes, update this file if the change affects launch readiness, content strategy, design decisions, technical setup, or recruiter-facing presentation.

Repository workflow reminder: edit locally, commit to GitHub, and let Netlify deploy from the repository root. Keep `index.html`, `styles.css`, and `script.js` heavily commented so the project can be reviewed as a professional web/content artifact as well as a live portfolio.

## Primary navigation interaction
Navigation links use a restrained magenta underline on hover, keyboard focus, and the most recently clicked chapter. There is no animated slider or automatic scroll-spy state. This preserves the publication character while prioritizing predictable navigation.

## Active chapter underline
The table of contents uses a local magenta underline on each link. Hover and keyboard focus remain immediate CSS states; the `is-active` state is assigned by a single IntersectionObserver as chapters enter the upper reading zone. There is no traveling indicator.

## Chapter Opening Rhythm
Numbered chapters use expanded top spacing and a larger pause after the title row to create a clear editorial department opening. Ghost folios fade in once per page view and never participate in navigation or layout calculations.

## Process Diagram
The process overview is a six-stage linear sequence: Discover, Strategy, Structure, Design, Produce, Launch. It summarizes workflow; the interactive panels below explain broader working principles.

## Education spread layout
- Desktop: two equal columns for degree credentials and Education Highlights.
- Awards & Publications spans both columns beneath them.
- Tablet and mobile: all parts stack in reading order.

## Method Chapter

Chapter 05 uses six aligned stages: Discover, Strategy, Structure, Design, Produce, and Launch. The process diagram and tabs must use the same labels and order. The large background word is **METHOD**, not PROCESS, to reinforce the editorial distinction from Communications Practice.

## Editorial utility rail
- Desktop utilities attach to the right viewport edge and expand left on hover or keyboard focus.
- Résumé receives the strongest magenta treatment; secondary utilities remain paper-white until interaction.
- Motion is restrained and uses the editorial easing token.
- At widths of 980px and below, only a compact fixed Résumé button remains.
- Utility controls never appear in printed output.


## Editorial utility tabs
- Desktop Resume and LinkedIn tabs are black, edge-bound, vertically labeled, and use a rotating CMYK border.
- Hover and keyboard focus expand the tabs inward and reveal horizontal labels.
- Email uses a compact envelope icon and a quieter expanding treatment.
- Tablet/mobile retain only the animated Resume utility.

### Edge utility labels
Collapsed Resume and LinkedIn tabs use the same absolute centered label box, a 90-degree inward rotation, and a small identifying icon.
