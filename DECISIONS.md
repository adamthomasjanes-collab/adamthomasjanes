## 2026-07-11 — Optimize delivery assets without discarding source exports

The live gallery now references optimized WebP versions of the two largest Camp Perry images. Original PNG exports remain in the repository as source-quality assets for future editing.

## Utility rail motion and color — v5.6.3

The desktop utility tabs use slower expansion and a single magenta animated border. The vertical labels are rotated to read inward from the right edge. This keeps the interaction aligned with the publication palette and makes the edge controls feel deliberate rather than hurried.

## Utility tabs face inward

Right-edge utility labels rotate toward the page rather than away from it. Resume and LinkedIn share the animated perimeter language of the former cover resume button, while Email remains the quieter supporting action.

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


## Section-based chapter navigation
Navigation links target major section containers (`#services`, `#featured`, etc.) rather than title elements. One controller calculates both scroll destinations and active states using the sticky header's live height, preventing anchor offsets and slider tracking from disagreeing.

## Navigation favors reliability over choreography
The moving table-of-contents slider was retired after repeated timing and section-detection conflicts. Primary navigation now uses native anchors and a simple per-link underline. The browser controls scrolling; JavaScript only records the last selected link.

## Keep chapter destinations in normal document layout

Primary navigation uses native anchors. Major chapters remain in normal browser layout; `content-visibility: auto` is not used on navigable sections because estimated off-screen heights can cause long-distance anchor jumps to land inaccurately until the destination renders. Reliability takes priority over this micro-optimization.

## Navigation tracking without navigation control
Issue No. 01 uses native anchor links for movement and one IntersectionObserver only for the active underline. The observer may change `is-active` and `aria-current`, but it must never call `scrollIntoView`, prevent anchor navigation, calculate destinations, or animate one shared slider between links.

## 2026-07-11 — Add editorial motion without navigation coupling
Ghost-number motion is handled by a dedicated IntersectionObserver that only toggles a CSS class. It does not share state with navigation, anchors, or section tracking. This preserves reliable navigation while adding atmosphere.

## 2026-07-11 — Integrate coursework with credentials
Education Highlights now sits inside the education column so formal coursework reads as supporting evidence for the degrees rather than as a detached third feature.

## Education spread hierarchy
Education credentials and Education Highlights share equal visual weight in the top row. Awards & Publications follows below as the recognition chapter closing the spread. This prevents the coursework summary from feeling isolated and gives the section a clearer reading order.

## Decision: Separate Practice from Method

Practice answers **what Adam offers**. Method answers **how a project moves from discovery through launch**. The Method chapter uses six operational stages and avoids repeating service descriptions or broad communication principles already established earlier in the issue.

## Persistent utilities belong outside the cover
The résumé is an important hiring utility, but it should not compete with the cover's editorial introduction. Desktop utilities therefore live in a fixed right-edge rail, while smaller screens retain only a compact résumé button. The rail may hold Résumé, LinkedIn, Email, and Print Issue because these are site-wide actions rather than chapter content.


## Utility rail refinement
Résumé and LinkedIn use the original animated-border visual language so persistent utilities feel integrated with the portfolio rather than added on. Print Issue was removed to keep the rail focused on professional contact actions.

### Utility-tab alignment
Use one shared centered label structure for Resume and LinkedIn rather than positioning each word independently. This prevents different word lengths from shifting vertically.
