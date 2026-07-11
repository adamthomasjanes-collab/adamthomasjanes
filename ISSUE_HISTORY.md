# Issue History

A publication-style production log for **Issue No. 01 · Summer 2026**. This complements the detailed technical `CHANGELOG.md`.

## Issue 01 — Major Milestones

### Foundation
- Established the central promise: **I make complex information clear.**
- Built the portfolio as a static HTML, CSS, and JavaScript site.
- Connected GitHub, Netlify, and `adamthomasjanes.com`.

### Editorial Identity
- Shifted from a conventional portfolio to **Portfolio as Publication**.
- Added issue framing, running heads, folios, ghost chapter numbers, margin notes, chapter eyebrows, and a true colophon.
- Formalized the chapter sequence from Communications Practice through Colophon.

### Featured Stories + Archive
- Reframed featured projects as editorial case studies.
- Built a reusable feature cycle for Camp Perry, North Coast Business Journal, The Beacon, and NCPN Parent Magazine.
- Replaced the legacy preview lightbox with the current **Open → issue overlay → gallery viewer** system.
- Added full-size images plus separate square thumbnails.

### Reference Library
- Expanded Resources into a Reference Library for practical downloadable tools.
- Planned newspaper and magazine starter templates, a brand style guide template, production/preflight checklist, PDF settings, and SEO planning worksheet.

### Education + Credibility
- Verified degree names, honors, GPAs, and coursework against the official transcript.
- Identified the school as the International Academy of Design & Technology, the name used while Adam attended.
- Added a full-width Education Highlights section.

### Editorial Proof
- Audited nearby visitor-facing phrases and removed repetitions that did not add hierarchy or meaning.
- Removed public-facing placeholder, demo, and editing language.
- Removed redundant headings and legacy interaction artifacts.
- Standardized magenta usage, chapter eyebrows, visible numbers, and ghost numbers.

### Navigation Refinement
- Consolidated competing navigation routines into one controller.
- Locked the animated underline to clicked navigation items during smooth scrolling.
- Aligned the sticky-header anchor offset with active-section detection.

### Documentation Governance
- Established living-document standards for the changelog, roadmap, known issues, decisions, design system, editorial structure, humans file, and issue history.

## Release Practice

For each future ZIP/release:
1. Update the website files required by the request.
2. Update affected living documentation.
3. Review stable peripheral files and change them only when necessary.
4. Validate JavaScript syntax, HTML structure, and core links before packaging.

### Navigation coordinate unification
Chapter links were moved from nested heading anchors to complete section anchors. Smooth scrolling and active slider detection now share the same live coordinates and sticky-header offset.

## Navigation simplification
The animated chapter slider was retired. Issue No. 01 now uses native anchor navigation with a stable magenta underline, reducing interaction complexity and improving reliability.

## Navigation and source-code prepress

The navigation was reduced to native anchors, and deferred chapter rendering was removed after it proved incompatible with reliable long-distance jumps. The retired feature reader was removed so one current overlay system owns featured and archive galleries.

## v5.3.1 — Chapter-location cue
A lightweight active underline was restored using one IntersectionObserver. The browser still owns all anchor movement; the script only identifies the chapter currently occupying the upper reading area.
