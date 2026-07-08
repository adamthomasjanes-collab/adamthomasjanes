# The Making of an Editorial Portfolio

## Designing a portfolio that communicates like a publication

**Project:** Adam Thomas Janes Portfolio  
**Current Version:** v5.1 — Documentation Release  
**Core idea:** I make complex information clear.  
**Format:** Static editorial portfolio website with responsive design, SEO metadata, structured data, accessibility-minded interaction, and professional documentation.

---

## Executive Summary

This portfolio began as a professional website and evolved into something more specific: an editorial-style publication about Adam Thomas Janes’ career.

The goal was not to build a trendy portfolio template. The goal was to create a site that reflects how Adam works: organizing information, creating hierarchy, designing with typography, producing clean files, and helping organizations communicate clearly across print, web, and digital channels.

The current direction positions Adam as a **Communications & Marketing Professional** with strong specialties in **Publication Design, Web Communications, Marketing Communications, Adobe InDesign, WordPress, SEO, accessibility-minded structure, and visual communication systems**.

The finished concept is built around one sentence:

> **I make complex information clear.**

---

## Project Goals

1. Build a professional portfolio that feels distinctive, not generic.
2. Reflect Adam’s publication design background without making the site feel old-fashioned or print-only.
3. Keep communications and marketing as the umbrella brand.
4. Make publication design and InDesign expertise visible as a major strength.
5. Keep web communications, WordPress, SEO, and HTML/CSS clearly represented.
6. Create a lightweight static site that can be hosted easily.
7. Improve accessibility, keyboard navigation, and semantic structure.
8. Improve SEO through metadata, structured data, sitemap, robots.txt, and natural keyword language.
9. Preserve a human voice instead of sounding like a résumé or keyword list.
10. Use the iteration process itself as evidence of design thinking.

---

## Core Design Principles

### Readers First

The site is designed around the reader’s experience, not decoration.

### Typography Over Decoration

The visual language leans on scale, rhythm, spacing, captions, section numbers, and hierarchy.

### Communication Before Decoration

Typography, hierarchy, content, accessibility, search structure, and production details all serve one purpose: helping the reader understand what matters.

### Editorial Rhythm

The site borrows from magazines without pretending to be a physical magazine. The goal is rhythm, not gimmick.

### Print and Web Belong Together

Publications, WordPress websites, campaigns, reports, and collateral are all communication systems.

### Accessibility Is Part of the Craft

Keyboard focus, skip links, dialog behavior, focus styles, and anchor scrolling are part of the user experience.

### Performance Matters

The site remains static, lightweight, and hostable without a complex build process.

---

## Major Discoveries

### Publication design was not the whole brand.

Publication design is one of Adam’s deepest strengths, but the broader brand is communication.

### Web work belongs in the same story.

WordPress, SEO, HTML/CSS, FTP, Divi Builder, and website maintenance are another way Adam organizes information and helps people understand it.

### “Publication systems” was too inside-baseball.

The phrase was replaced with clearer language: publications, editorial design, communication materials, websites, campaigns, and visual communication systems.

### Magazine design is not about looking like a magazine.

The site did not need page curls or fake print effects. It needed rhythm: headlines, captions, numbers, white space, hierarchy, and pacing.

### The best copy sounded more human.

The sentence “I make complex information clear” became the heartbeat of the site.

### The process is part of the portfolio.

The number of iterations, critiques, terminology changes, accessibility fixes, SEO refinements, and design decisions became evidence of Adam’s design judgment.

---

## v5.0 Milestone: Portfolio as Publication

Version 5.0 introduced the clearest expression of the editorial direction.

### Added

- Issue No. 01 framing.
- Running heads.
- Page-style folios.
- Section folios.
- Margin notes.
- Crop-mark-inspired details.
- A true Colophon section.
- Starter design system documentation.

### Why It Matters

This moved the project from “a portfolio with editorial styling” to “a portfolio that behaves like a publication.”

That distinction matters because it ties directly to Adam’s background in magazines, newspapers, long documents, production systems, and reader-first communication.

---

## v5.1 Milestone: Documentation as a Deliverable

Version 5.1 treats the documentation as part of the portfolio.

### Added

- `DECISIONS.md`
- `ROADMAP.md`
- `KNOWN_ISSUES.md`

### Updated

- `CHANGELOG.md`
- `README.md`
- `CASE_STUDY.md`
- `DESIGN_SYSTEM.md`

### Why It Matters

The documentation shows how the project was directed, questioned, refined, and improved over time. This turns the process itself into evidence of communication strategy, editorial judgment, accessibility awareness, and design thinking.

---

## Accessibility Journey

Accessibility was improved throughout the project rather than left to the end.

Key improvements included:

- Skip link.
- Keyboard-focusable anchor sections.
- Focus-visible states.
- Sticky-header anchor correction.
- Focus management for section jumps.
- Dialog focus trapping.
- Escape-key support.
- Lightbox keyboard controls.
- Semantic sections.
- ARIA labels where useful.
- Reduced reliance on hover-only interactions.
- Mobile accordions with expanded states.

A final manual accessibility audit is still recommended before launch.

---

## SEO Evolution

Technical improvements included:

- Title and meta description.
- Open Graph metadata.
- Twitter metadata.
- Canonical URL.
- Schema.org structured data.
- Person schema.
- WebSite schema.
- ProfilePage schema.
- CreativeWork schema.
- ItemList schema.
- WebPage hasPart structure.
- Sitemap.
- Robots file.
- Semantic HTML.

Editorial SEO improvements included natural use of publication design, WordPress, web communications, InDesign, SEO, and marketing communications language.

---

## AI Collaboration

This project used AI as a collaborative tool, not as a substitute for direction.

The human role included setting goals, critiquing weak language, rejecting awkward phrases, identifying authentic strengths, questioning terminology, testing behavior, refining accessibility expectations, and deciding when the design was done.

The AI role included generating code iterations, restructuring files, drafting copy options, proposing information architecture, creating technical fixes, writing structured data, packaging production files, and documenting the process.

The strongest results came from critique and revision.

---

## Future Enhancements

- Add milestone screenshots.
- Create before/after comparisons.
- Build a PDF version of the case study.
- Add real project images.
- Expand the project feature stories.
- Complete accessibility and Lighthouse audits.
- Update résumé to match the web copy.
- Continue refining the ATJ logo.

### v5.1.6 — Menu Scroll System Fix

**Goal:** Rebuild the menu scrolling behavior from a clean foundation.

**Problem:** The navigation had become jumpy and inaccurate because multiple anchor-scroll fixes accumulated over time.

**Changes:** Removed old inline scroll correction scripts, moved scrolling behavior into `script.js`, corrected the Colophon target, validated menu targets, and used CSS scroll margins with a single `scrollIntoView()` interaction.

**Lesson:** Interaction code should have one source of truth. Small fixes can become fragile when layered instead of consolidated.

### v5.1.7 — CSS-Only Anchor Navigation

**Goal:** Sacrifice scroll flair for a more reliable user experience.

**Changes:** Removed custom scroll controllers and moved anchor behavior back to the browser with CSS scroll-padding and scroll-margin. Kept only a minimal mobile-menu close helper.

**Lesson:** Native browser behavior can be stronger than custom interaction code when the goal is simple section navigation.

### v5.1.8 — No-JavaScript Navigation

**Goal:** Make primary navigation reliable by removing JavaScript from the menu entirely.

**Changes:** Removed navigation scroll controllers, removed the mobile toggle control, and kept navigation as plain HTML anchors with CSS scroll padding.

**Lesson:** Function beats flair. For primary navigation, native browser behavior is often the most trustworthy interaction model.

### v5.1.9 — Dedicated Anchor Targets

**Goal:** Fix menu landing accuracy without reintroducing JavaScript.

**Changes:** Added invisible anchor targets before major sections and updated the primary menu to use those dedicated targets.

**Lesson:** In a complex editorial layout, the best anchor target is often a controlled point before the section, not the section container itself.

### v5.2.0 — Heading-Based Navigation Anchors

**Goal:** Clean up the HTML hierarchy and make navigation land on visible section titles.

**Changes:** Removed hidden anchor spans, added IDs to visible section headings, and updated nav links to target those headings directly.

**Lesson:** The best anchor target should match the reader’s visual expectation.

### v5.2.2 — Archive Editorial Issue Overlay

**Goal:** Turn the Archive into a curated editorial experience.

**Changes:** Added a full-screen issue overlay for Advertising Design Series with six curated ad slots and production notes.

**Lesson:** Archive content should document craft and production thinking, not only display images.

---

## Maintainer Notes

This document is part of the Adam Thomas Janes portfolio repository and is intentionally written as a handoff artifact, not just a short project note. Keep notes plain, explicit, and useful for future editing. When the portfolio changes, update this file if the change affects launch readiness, content strategy, design decisions, technical setup, or recruiter-facing presentation.

Repository workflow reminder: edit locally, commit to GitHub, and let Netlify deploy from the repository root. Keep `index.html`, `styles.css`, and `script.js` heavily commented so the project can be reviewed as a professional web/content artifact as well as a live portfolio.

