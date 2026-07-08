# Design Decisions

This file records major decisions behind the Adam Thomas Janes portfolio.

---

## Decision: Treat the portfolio as a publication

### Decision

Frame the site as **Issue No. 01 · Summer 2026** rather than a standard portfolio.

### Why

Adam’s background includes publication design, newspapers, magazines, long documents, editorial layout, prepress, and production. A publication-inspired structure is authentic to his experience.

### Result

The site now uses running heads, folios, a colophon, feature-style projects, margin notes, and editorial pacing.

---

## Decision: Use “I make complex information clear” as the core promise

### Decision

Use a short, plainspoken sentence as the central brand statement.

### Why

It connects publication design, web communications, marketing communications, WordPress, SEO, accessibility, and production under one idea.

### Result

The site sounds more human and less like a software list.

---

## Decision: Keep communications as the umbrella brand

### Decision

Position Adam as a Communications & Marketing Professional rather than only a publication designer, graphic designer, or web designer.

### Why

Publication design is a specialty, but the larger value is helping organizations communicate clearly across print, web, digital, and long-form materials.

### Result

The site can support publication design roles, web communications roles, marketing communications roles, and proposal/document design opportunities.

---

## Decision: Retire the magenta-circle logo

### Decision

Replace the old magenta circle initials mark with a cleaner custom ATJ wordmark.

### Why

The circle felt more decorative and less refined than the editorial identity. The newer ATJ mark is quieter, more professional, and easier to use in a header.

### Result

Magenta remains as a restrained rule under the A rather than a large badge.

---

## Decision: Keep the Process section as “what clients can expect”

### Decision

Use the Process section to explain working principles instead of a generic agency process.

### Why

Clients and hiring managers want to know what it is like to work with Adam. The section now explains communication-first thinking, accessibility, search-friendly structure, production readiness, and maintainability.

### Result

The section feels more distinctive and more aligned with Adam’s actual approach.

---

## Decision: Use one single process rule animation

### Decision

Replace the extra per-box animation with one magenta rule that glides under the active process step.

### Why

The quieter motion better supports the idea of flow without competing with the existing design.

### Result

The interaction feels more premium and intentional.

---

## Decision: Add a true Colophon

### Decision

Add a Colophon section to document typography, build approach, optimization, design language, and edition details.

### Why

A colophon is familiar to publication people and reinforces the editorial identity.

### Result

The site communicates craft, production awareness, and attention to detail.

---

## Decision: Keep the site static

### Decision

Use semantic HTML, CSS, and vanilla JavaScript rather than a framework-heavy build.

### Why

The site should be lightweight, portable, easy to host, and easy to inspect.

### Result

The project remains accessible, maintainable, and simple to deploy.

---

## Decision: Do not fully minify yet

### Decision

Keep source files readable during active development.

### Why

The project is still being edited and used as a case study. Readable files support review, documentation, and future refinement.

### Result

Final minification can happen closer to launch.

---

## Decision: Document the process

### Decision

Treat documentation as part of the portfolio rather than a developer afterthought.

### Why

The documentation shows design thinking, critique, iteration, accessibility awareness, SEO thinking, and communication strategy.

### Result

The project becomes both a website and a case study.

## Decision: Use one menu scroll controller

### Decision
Move menu scrolling behavior into `script.js` and remove older inline scroll-correction scripts from `index.html`.

### Why
The menu became jumpy because several scroll fixes were layered over time. One source of truth is easier to reason about and less likely to fight browser behavior.

### Result
All menu items now use the same scrolling logic, target validation, header offset, and keyboard-focus behavior.

## Decision: Prefer native anchor scrolling

### Decision
Remove custom JavaScript menu scrolling and use browser-native anchor navigation with CSS scroll padding.

### Why
The custom scroll behavior became jumpy and inaccurate. A reliable user experience is more important than scroll animation flair.

### Result
Navigation is simpler, easier to maintain, and less likely to break as the layout changes.

## Decision: Remove JavaScript from primary navigation

### Decision
Use plain HTML anchor links for the main navigation and remove JavaScript from the menu.

### Why
Previous menu JavaScript created an unreliable experience. Navigation is too important to risk with custom behavior that may conflict with layout, browser scrolling, or sticky headers.

### Result
The menu becomes simpler, more resilient, easier to maintain, and more accessible by default.

## Decision: Use dedicated anchor targets

### Decision
Use invisible anchor targets before major sections for primary navigation.

### Why
Sticky headers and editorial spacing made direct section anchors visually inaccurate.

### Result
Navigation remains native, resilient, and tunable through one CSS variable.

## Decision: Anchor navigation to visible headings

### Decision
Point primary navigation links to visible section headings instead of section containers or invisible anchor spans.

### Why
The reader expects a menu click to reveal the section title.

### Result
The HTML hierarchy is cleaner and the anchor target matches the visual destination.

## Decision: Archive cards open editorial issues

### Decision
Use editorial issue overlays for archive collections instead of simple image lightboxes.

### Why
Archive collections need context, production notes, and curated groupings.

### Result
The Archive becomes a browsable publication system rather than a standard portfolio gallery.

---

## Maintainer Notes

This document is part of the Adam Thomas Janes portfolio repository and is intentionally written as a handoff artifact, not just a short project note. Keep notes plain, explicit, and useful for future editing. When the portfolio changes, update this file if the change affects launch readiness, content strategy, design decisions, technical setup, or recruiter-facing presentation.

Repository workflow reminder: edit locally, commit to GitHub, and let Netlify deploy from the repository root. Keep `index.html`, `styles.css`, and `script.js` heavily commented so the project can be reviewed as a professional web/content artifact as well as a live portfolio.

