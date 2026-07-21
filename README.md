

# Editorial Manifesto

This publication is built on a simple belief: communication is an act of service.

Every feature in this issue explores the same question: how can complex information become clear, approachable, and memorable? The projects collected here are not trophies. They are documented conversations between audience, content, and design.

Readers will notice recurring themes—research before aesthetics, structure before style, clarity before decoration. These are not constraints but editorial values that shape every decision.

Welcome to Issue No. 01.

# Adam Thomas Janes Portfolio

## Editorial Portfolio Website

This project is a static, editorial-style portfolio for Adam Thomas Janes, a Communications & Marketing Professional specializing in publication design, web communications, marketing communications, Adobe InDesign production, WordPress, SEO, and visual communication systems.

The current direction frames the portfolio as:

> **Issue No. 01 · Summer 2026 · Portfolio as Publication**

The central brand promise is:

> **I make complex information clear.**

---

## Current Version

**v5.9.0 — Feature Proof & Deployment Cleanup Release**

This release introduces art-directed color Feature thumbnails, semantic lazy-loaded images, faster bookmarked-chapter positioning, corrected Production Notes styling, more margin-note breathing room, and a leaner deployable package without redundant Camp Perry PNG masters.

---

## Project Goals

- Present Adam’s professional work through an editorial publication identity.
- Connect publication design, web communications, marketing communications, and production under one clear brand.
- Keep the website lightweight, static, accessible, SEO-aware, and maintainable.
- Demonstrate not only finished work, but the thinking and iteration behind the work.
- Document the design process as a portfolio asset.

---

## Main Files

### Website

- `index.html` — main website content, structure, metadata, and semantic sections.
- `styles.css` — visual system, editorial layout, responsive design, motion, and component styling.
- `script.js` — interactions, dialogs, archive behavior, counters, navigation, and process tabs.
- `assets/` — headshot, résumé, favicon, logo SVGs, and supporting assets.

### SEO + Production

- `robots.txt` — search crawler guidance.
- `sitemap.xml` — site map for indexing.
- `humans.txt` — human-readable credits and project philosophy.
- `.htaccess` — optional Apache production hints.

### Documentation

- `README.md` — project overview and file guide.
- `CHANGELOG.md` — version-by-version release notes.
- `CASE_STUDY.md` — narrative design and development journal.
- `DESIGN_SYSTEM.md` — editorial identity guide.
- `DECISIONS.md` — rationale behind major design and content decisions.
- `ROADMAP.md` — future work and priorities.
- `KNOWN_ISSUES.md` — known items to verify before launch.
- `CLEANUP_NOTES.md` — cleanup history and production-readiness notes.

---

## Design Direction

The website is designed to feel like a professional editorial publication rather than a generic portfolio template.

Key elements include:

- Issue framing.
- Running heads.
- Editorial folios.
- Section folios.
- Margin notes.
- Colophon.
- CMYK-inspired accents.
- Reader-first hierarchy.
- Avenir + Georgia typography direction.
- Lightweight HTML/CSS/JavaScript architecture.

---

## Accessibility Direction

Accessibility is treated as part of communication clarity.

The project includes:

- Skip link.
- Semantic sections.
- Keyboard-focusable anchor targets.
- Visible focus states.
- Dialog focus support.
- Reduced-motion support for key animations.
- ARIA labels where semantic HTML alone is not enough.
- Responsive layouts designed to avoid horizontal scrolling.

This still needs a final manual accessibility audit before launch.

---

## SEO Direction

The site includes:

- Meta description.
- Open Graph metadata.
- Twitter metadata.
- Canonical URL.
- Structured data.
- Semantic HTML.
- Sitemap.
- Robots file.
- Human-readable keyword integration.

---

## Production Notes

This is intentionally a static site. That keeps hosting simple, improves portability, and makes the code easier to inspect and maintain.

The source files are not fully minified yet because the project is still being actively edited and documented as a case study. Final production minification can happen closer to launch.

---

## Next Recommended Steps

1. Manual accessibility audit.
2. Mobile/tablet review after v5.0 editorial additions.
3. Add real project images and case-study proof.
4. Update résumé to match the finalized website language.
5. Capture milestone screenshots for the case study.
6. Consider a polished PDF version of the case study.

## v5.1.6 Menu Scroll System Fix

This release rebuilds menu scrolling so all primary navigation links use one stable JavaScript controller in `script.js`. Older inline scroll-correction scripts were removed from `index.html`.

## v5.1.7 CSS-Only Anchor Navigation

This release removes custom JavaScript menu scrolling and returns same-page navigation to native browser anchors supported by CSS `scroll-padding-top` and `scroll-margin-top`.

## v5.1.8 No-JavaScript Navigation

The primary navigation menu is now plain HTML/CSS with no JavaScript behavior. Browser-native anchor navigation handles menu jumps, supported by CSS scroll padding.

## v5.1.9 Dedicated Anchor Targets

Navigation remains JavaScript-free. Menu links now target invisible anchor spans placed before each major section, giving more accurate landing control through CSS.

## v5.2.0 Heading-Based Navigation

Navigation now targets visible section headings directly, with no JavaScript navigation behavior.

## v5.2.2 Archive Editorial Issue Overlay

The Archive now includes a working editorial issue overlay for Advertising Design Series. This establishes the future pattern: Archive card → issue overlay → individual work sample.

---

## Maintainer Notes

This document is part of the Adam Thomas Janes portfolio repository and is intentionally written as a handoff artifact, not just a short project note. Keep notes plain, explicit, and useful for future editing. When the portfolio changes, update this file if the change affects launch readiness, content strategy, design decisions, technical setup, or recruiter-facing presentation.

Repository workflow reminder: edit locally, commit to GitHub, and let Netlify deploy from the repository root. Keep `index.html`, `styles.css`, and `script.js` heavily commented so the project can be reviewed as a professional web/content artifact as well as a live portfolio.



## Backstage documentation

See `BACKSTAGE_NOTES.md` for a plain-English tour of the project structure, the portfolio-as-publication concept, and the commenting philosophy used across the HTML, CSS, and JavaScript.

## Source-code chapter notes

This version includes editorial-style chapter notes throughout the source. They are written for anyone who opens the repository for the first time and wants to understand the intent behind the portfolio, not just the mechanics of the code.

See [`CHAPTER_NOTES.md`](CHAPTER_NOTES.md) for the full map.


This project emphasizes communication strategy, editorial thinking, accessibility, documentation, and maintainable design systems.


> **Communication first. Design second.** Every project begins with understanding people, organizing information, and creating experiences that help audiences succeed.


## Editorial Direction
This edition continues the evolution from a portfolio into an editorial publication. Features are written to explain not only what was created, but why those communication decisions mattered. Recurring editorial reflections, transitions, and thematic storytelling reinforce the idea that every project is part of a larger conversation about clear communication.
