## v5.8.0 — Evidence-First Positioning

- Reframed the core professional narrative around editorial judgment, web fluency, and production discipline.
- Moved Features ahead of Communications Practice so visitors encounter evidence before a service inventory.
- Moved Education directly after Career Timeline and reframed it as the foundation for a hybrid print/web practice.
- Moved the Reference Library after Career and Education as a later authority-building preview.
- Tightened the opening positioning copy and reduced repeated philosophy language.
- Rewrote feature results to distinguish deliverables from communication, audience, and operational outcomes.
- Connected teaching experience directly to Adam's ability to explain technical and visual ideas clearly.
- Renumbered navigation and chapters to match the new reading order.

## v5.7.2 — Semantic Hierarchy & Resource Roadmap

- Replaced the contradictory featured-resource “Available” badge with “Coming First.”
- Assigned Coming First, In Development, and Planned states across the Reference Library.
- Rebuilt visible chapter and card headings with a native H1 → H2 → H3 hierarchy.
- Raised the desktop hero actions into a typical laptop viewport.
- Moved mobile résumé access into the navigation menu and removed the content-covering fixed control on phones.
- Increased navigation-number and image-caption text sizes.

## v5.7.1 — Reference Library Preview

- Restored the Reference Library and its navigation entry for the pre-launch portfolio.
- Clarified that the resource cards are a preview of materials currently in production.
- Restored the eight-chapter numbering system.

## v5.7.0 — Focus, Navigation & Accessibility

- Added a compact, accessible mobile navigation toggle.
- Added direct hero actions for selected work and contact.
- Removed editorial interludes and unavailable resources from the public reading order while retaining them in source.
- Corrected duplicated archive copy and archive numbering.
- Added Open Graph metadata and resilient bookmarked-chapter positioning.
- Upgraded tabs and dialogs for stronger keyboard and assistive-technology behavior.
- Made counters resolve immediately when reduced motion is requested.
- Reduced the mobile résumé utility footprint.

## v5.6.5 — Milestone Audit Cleanup

- Replaced visitor-facing archive development language with polished portfolio copy.
- Added optimized WebP versions of the two largest Camp Perry gallery images and updated the gallery to use them.
- Replaced the outdated newspaper-template editing note with the current inactive-resource policy.
- Confirmed the opening proof label reads “18+ Years in Communications.”
- Revalidated JavaScript syntax, internal anchors, duplicate IDs, local references, and CSS balance.

## 5.6.3 — Slower Magenta Utility Tabs

- Slowed the desktop Resume, LinkedIn, and Email tab expansion and label transitions.
- Simplified the animated perimeter to magenta and black only.
- Rotated the collapsed Resume and LinkedIn labels 180 degrees from the previous orientation so they read inward from the right edge.
- Preserved the compact mobile Resume control and reduced-motion fallback.

## 5.6.2 — Inward-Facing Animated Utility Tabs

- Flipped the collapsed Resume and LinkedIn labels so their letterforms face inward toward the publication.
- Rebuilt the animated perimeter treatment to echo the original cover resume button more clearly.
- Added a staged hover/focus sequence: border energy first, tab expansion second, label reveal last.
- Added document and LinkedIn marks to the expanded labels and retained the envelope icon for Email.
- Increased spacing between utility tabs and preserved the compact mobile Resume control.

# Changelog

## v5.5.0 — Practice / Method Editorial Separation

**Goal:** Remove the only significant copy overlap between what Adam offers and how he works.

- Renamed Chapter 05 from **Process** to **Method** in navigation, structured data, and visible chapter copy.
- Reframed Practice as the service/capability chapter and Method as the operational project lifecycle.
- Replaced seven value-oriented tabs with six practical stages: Discover, Strategy, Structure, Design, Produce, and Launch.
- Rewrote every Method panel to describe what happens after engagement rather than repeat capabilities.
- Updated the process diagram, responsive grid, editorial comments, and supporting documentation.

## 2026-07-11 — Navigation and source-code prepress

- Removed the retired feature-reader HTML and JavaScript, plus its dedicated CSS.
- Kept the current **Read Feature → issue overlay → gallery viewer** as the only featured-project experience.
- Removed `content-visibility: auto` from navigable chapters after tracing it as the cause of unstable long-distance anchor destinations.
- Kept primary navigation browser-native: ordinary anchors, CSS smooth scrolling, sticky-header clearance, and a simple clicked-link underline.
- Corrected backstage chapter-note numbering to match the visible editorial structure.
- Audited duplicate IDs, local asset references, JavaScript syntax, HTML structure, and CSS balance.
- Packaged all website files at the root of the ZIP.

## v5.3.1 — Visitor-Facing Phrase Audit

- Replaced the Colophon running thought with “The production details behind Issue No. 01.” so the formal authorship credit appears only once in that visual spread.
- Removed the repeated “selected work” phrasing from the Features chapter header.
- Reworded the Education Highlights introduction so it describes the coursework grouping rather than restating the education-foundation paragraph above it.
- Reviewed repeated project titles, interface labels, the core promise, and issue metadata; retained repetitions that serve navigation, overlay identification, branding, or publication folio functions.


## Legacy archive lightbox removal

- Removed the obsolete preview-image lightbox markup, JavaScript, keyboard handling, and component styles.
- Archive preview artwork is now decorative; the **Open** button is the single route into the current archive issue overlay and gallery viewer.

## Editorial copy audit

- Removed the repeated “The Reference Library” kicker beneath the 04 chapter heading.
- Reworded two eyebrows so they introduce rather than repeat their chapter titles.
- Removed the duplicate ghost 08 from the contact footer; 08 now belongs only to the Colophon.
- Removed the web-app manifest reference and file so the portfolio is not presented as an installable app.
- Added `EDITORIAL_COPY_AUDIT.md` as the copy hierarchy source of truth.

# Changelog

All notable changes to the Adam Thomas Janes editorial portfolio project.

---

## v5.1 — Documentation Release

**Goal:** Bring the project documentation up to the same professional standard as the website.

### Added
- `DECISIONS.md`
- `ROADMAP.md`
- `KNOWN_ISSUES.md`

### Updated
- Rebuilt `CHANGELOG.md` into a more complete professional release history.
- Expanded `CASE_STUDY.md` with the v5.0 editorial publication milestone and v5.1 documentation release.
- Expanded `DESIGN_SYSTEM.md` from a starter draft into a more formal identity guide.
- Updated `README.md` with a clearer project overview and file guide.
- Confirmed the project is packaged as a documented release, not just a website ZIP.

### Why
The portfolio process has become part of the portfolio itself. The documentation now supports the case study by explaining not only what changed, but why the decisions were made.

---

## v5.0 — Editorial Publication System

**Goal:** Move the website from a portfolio with editorial styling into a true publication-inspired professional identity.

### Added
- Issue framing: `Issue No. 01 · Summer 2026`
- Publication running heads
- Editorial folios
- Section folios
- Margin notes
- Crop-mark-inspired details
- Cover metadata strip
- Full `Colophon` section
- Starter `DESIGN_SYSTEM.md`

### Changed
- Section labels became more editorial:
  - Practice became a department-style section.
  - Archive became `From the Archive`.
  - History became `Career Record`.
  - Notes became `Production Notes`.
- Footer language shifted toward clarity, accessibility, and long-term usefulness.

### Why
The strongest direction was not to make the site look like a magazine. It was to make the site behave like a publication: cover, editor’s letter, features, archive, production notes, career record, colophon, and next issue.

---

## v4.9b — Single Process Flow Rule

**Goal:** Preserve the original Process section feel while making the active indicator move more elegantly.

### Changed
- Removed the extra per-box animation from v4.9.
- Rebuilt the Process section motion as a single understated magenta rule beneath the active process box.
- The rule glides from the previous active step to the next active step.
- Added reduced-motion support.

### Why
One moving rule communicates workflow better than multiple competing animations.

---

## v4.9 — Process Flow Band Animation

**Goal:** Explore a more animated Process section.

### Added
- A flowing accent animation for the Process section.

### Changed Later
- Replaced in v4.9b because it felt like a second animation rather than a refinement of the original.

### Why
The exploration clarified that the quieter, single-rule solution was stronger.

---

## v4.8c — Logo Fix + Process Preserved

**Goal:** Keep the stronger client-expectation Process section while finalizing the new ATJ header identity.

### Changed
- Preserved the “What clients can expect” Process section.
- Kept the custom ATJ header wordmark.
- Removed the hero logo lockup.
- Retired the old magenta-circle logo styling.

### Why
Good iteration means preserving successful improvements instead of accidentally rolling them back during another fix.

---

## v4.8b — Header Logo CSS Fix

**Goal:** Remove leftover styling from the retired magenta-circle logo.

### Fixed
- Removed old `.logo` circular badge styling that was still wrapping the new SVG mark.
- Confirmed the header logo appears as a standalone ATJ wordmark.

### Why
Replacing markup is not enough when older component styles still target the same class.

---

## v4.8 — Custom ATJ Header Wordmark

**Goal:** Retire the old magenta-circle logo and move forward with a cleaner editorial mark.

### Added
- Custom-drawn geometric ATJ SVG mark.
- Matching SVG favicon.

### Changed
- Replaced the old circle logo.
- Removed the large hero logo lockup.
- Kept magenta only as a restrained rule under the A.

### Why
The identity became stronger when it became simpler.

---

## v4.7 — ATJ Logo Exploration

**Goal:** Test a stronger ATJ logo direction.

### Added
- ATJ logo assets.
- Header logo replacement.
- Hero lockup exploration.

### Changed Later
- Hero lockup was removed.
- Header-only ATJ mark became the preferred direction.

### Why
The best placement for the logo was a small, confident signature in the navigation.

---

## v4.6 — Cleanup + Lightness Pass

**Goal:** Keep the project maintainable without changing the established design direction.

### Changed
- Removed older duplicate anchor-scroll correction code.
- Preserved current sticky-header navigation and keyboard-focus behavior.
- Checked duplicate ARIA label risks.
- Cleaned trailing whitespace and excessive blank lines.
- Added `CLEANUP_NOTES.md`.

### Why
Cleanup is part of production. A project that documents its own evolution should still avoid carrying unnecessary code forward.

---

## v4.5 — Case Study Documentation

**Goal:** Turn the design process into a portfolio asset.

### Added
- `CASE_STUDY.md`
- `CHANGELOG.md`

### Changed
- Expanded documentation into a development journal covering goals, design principles, discoveries, accessibility, SEO, and AI collaboration.

### Why
The process itself demonstrates communication strategy, art direction, editorial judgment, and thoughtful iteration.

---

## v4.4 — Voice + Copy Refinement

**Goal:** Make the writing more human and less résumé-like.

### Changed
- Recentered the site around: “I make complex information clear.”
- Rewrote hero copy, Editor’s Letter, service copy, process copy, experience copy, skills copy, and SEO footer.
- Reduced corporate phrasing.
- Emphasized production speed, reader-first communication, and real deliverables.

### Why
The design had become stronger than the copy. Voice became the next design problem.

---

## v4.3 — Editorial Publication System

**Goal:** Make the site feel more like an editorial publication.

### Added
- Editor’s Letter.
- Editorial pull quote.
- Magazine-style feature captions.
- Keyboard-focus support for anchor targets.
- Page-section structured data.
- `robots.txt`, `sitemap.xml`, `humans.txt`, `site.webmanifest`, and optional `.htaccess`.

### Why
The site began to feel less like a standard portfolio and more like a publication about a career.

---

## v4.2 — Navigation Scroll Correction

**Goal:** Fix sticky-header anchor scrolling.

### Fixed
- First-click navigation overshoot.
- Sticky header offset behavior.
- Anchor target correction.
- Focus correction during navigation.

### Why
Small usability bugs can disrupt an otherwise polished experience.

---

## v4.1 — Print + Web Communications Rebalance

**Goal:** Keep web communications clearly represented while emphasizing publication design.

### Changed
- Added stronger WordPress, Divi, SEO, HTML/CSS, deployment, and maintenance language.
- Rebalanced the brand so it did not feel print-only.

### Why
Adam’s work spans publications, websites, campaigns, and visual systems.

---

## v4.0 — Publication-Focused Direction

**Goal:** Lean into Adam’s strongest specialty: publication design and InDesign-driven production.

### Changed
- Added stronger publication design, Adobe InDesign, editorial layout, typography, prepress, long-document, and print production language.

### Why
Publication design is a differentiator, but it belongs under the broader communications brand.

---

## v3.3 — Resume Included + Resume Cohesion

**Goal:** Align the website with the résumé.

### Added
- Résumé PDF to the site package.

### Changed
- Updated résumé links.
- Aligned site copy and structured data with résumé positioning.

### Why
The website and résumé needed to feel like the same professional brand.

---

## v3.2 — Brand Copy Alignment

**Goal:** Remove confusing “remote communications” phrasing.

### Changed
- Updated metadata, structured data, hero copy, headings, and keyword language.
- Recentered the site around Communications & Marketing Professional.

### Why
Optimizing for remote jobs should not make “remote” sound like the profession.

---

## v3.1 — Mobile Archive Accordions

**Goal:** Improve mobile archive usability.

### Added
- Mobile archive accordions.
- Plus/minus indicators.

### Why
The archive needed to feel intentional on small screens, not compressed.

---

## v3.0 — Sticky Header Restore

**Goal:** Restore expected navigation behavior after mobile refinements.

### Fixed
- Sticky header behavior.

---

## v2.9 — Mobile No Side Scroll

**Goal:** Remove unwanted horizontal scrolling.

### Fixed
- How I Work / Process section side-scroll issue on narrow screens.

---

## v2.8 — Mobile + Tablet Refinement

**Goal:** Make mobile feel designed, not merely resized.

### Changed
- Reduced mobile density.
- Added mobile service accordions.
- Simplified featured project previews.
- Improved mobile dialog spacing.

---

## v2.7 — Navigation Slider Contact Fix

**Goal:** Fix active navigation underline behavior.

### Fixed
- Active nav underline reaching the Contact / final section.

---

## v2.6 — Navigation + Headshot Polish

**Goal:** Refine brand details.

### Changed
- Portrait shadow treatment.
- CMYK personality around the headshot.
- Active navigation behavior.

---

## v2.5 — Production Architecture

**Goal:** Move toward a production-ready static website.

### Added
- Favicon.
- Manifest.
- Robots file.
- Sitemap.
- Humans file.
- Dialog focus trapping.
- Section rendering optimization.
- Production checklist.

---

## v2.0 — Architecture Milestone

**Goal:** Reorganize the site for maintainability.

### Changed
- CSS tokens.
- Reusable components.
- Modular JavaScript.
- More consistent motion and shadow systems.

---

## v1.x — Visual Exploration

**Goal:** Explore the visual language.

### Explored
- CMYK shadows.
- Featured cards.
- Lightboxes.
- Archive cycling.
- Hover effects.
- Scroll animations.
- Counters.
- Editorial ghost numbers.
- Paper/CMYK visual language.

## v5.1.6 — Menu Scroll System Fix

**Date:** 2026-07-02

### Fixed
- Rebuilt the site menu scrolling behavior after previous incremental fixes became jumpy and inaccurate.
- Removed old inline anchor-scroll correction scripts from `index.html`.
- Moved menu scrolling into `script.js` as the single source of truth.
- Corrected the Colophon menu link to target `#colophon`.
- Confirmed every menu item points to an existing section.
- Added consistent scroll-margin behavior for all menu targets.
- Preserved keyboard focus behavior after menu navigation.

### Why
The earlier approach layered multiple scroll-correction scripts on top of one another. This release starts over with one simpler scroll system that uses `scrollIntoView()` and CSS `scroll-margin-top`.

## v5.1.7 — CSS-Only Anchor Navigation

**Date:** 2026-07-02

### Fixed
- Removed custom JavaScript-controlled menu scrolling.
- Let the browser handle same-page anchor navigation.
- Added one CSS-only scroll positioning system using `scroll-padding-top` and `scroll-margin-top`.
- Kept only a tiny JavaScript helper to close the mobile menu after a link click.
- Preserved the Colophon nav target as `#colophon`.

### Why
The custom menu scroll scripts became over-engineered and unstable. This release prioritizes function and user experience over scroll flair.

## v5.1.8 — No-JavaScript Navigation

**Date:** 2026-07-02

### Changed
- Removed JavaScript from the primary navigation menu.
- Removed the mobile nav toggle button to avoid a broken no-JS control.
- Kept navigation as plain HTML anchor links.
- Kept section positioning in CSS using `scroll-padding-top` and `scroll-margin-top`.
- Preserved smooth scrolling through CSS only.

### Why
The menu experience needs to be reliable first. This release removes navigation JavaScript entirely so the browser handles anchor navigation natively.

## v5.1.9 — Dedicated Anchor Targets

**Date:** 2026-07-02

### Fixed
- Added dedicated invisible anchor targets before each major section.
- Updated menu links to target those anchors instead of the section containers.
- Kept navigation free of JavaScript.
- Centralized section landing adjustment in `--anchor-target-offset`.

### Why
Direct section anchors were visually inaccurate because the sticky header and editorial spacing changed where the visible section title appears. Dedicated anchor targets give precise control without JavaScript.

## v5.2.0 — Heading-Based Navigation Anchors

**Date:** 2026-07-02

### Fixed
- Removed hidden anchor spans.
- Rebuilt navigation so menu links target visible section headings directly.
- Added stable heading IDs such as `services-title`, `featured-title`, `process-title`, and `colophon-title`.
- Kept primary navigation free of JavaScript.
- Centralized landing adjustment in `--heading-anchor-offset`.

### Why
The menu should land where the reader visually expects: on the section title.

## v5.2.2 — Archive Editorial Issue Overlay

- Added a working editorial overlay for Advertising Design Series.
- Added Issue 01 — Camp Perry with Editor’s Note, six placeholder ad frames, Production Notes, and issue navigation.
- Established the Archive card → issue overlay → individual work sample pattern.

## v5.2.4 — Archive Open Overlay Wiring
- Changed the **03 · From the Archive** “Open” button so it opens the newer Archive Issue Overlay instead of the older image lightbox.
- Added two more Archive tabs: **The Beacon Newspaper** and **NCPN Parent Magazine**, bringing the archive list to six pieces.
- Added editing comments in `index.html` and `script.js` explaining where to add/remove archive tabs and how `data-archive-issue` connects to overlay copy.
- Added six archive-specific overlay stories in `script.js` so each Archive tab can open with appropriate copy.

## v5.2.5 — Archive Archive Sample Image + Overlay Polish Pass

- Added the six temporary archive sample ad images to `/assets`.
- Expanded “03 · From the Archive” from six items to nine portfolio archive issues.
- Wired the Archive `Open` button to the reusable archive issue overlay for all nine issues.
- Added real image thumbnails inside archive issue overlays for lightbox testing.
- Added a nested full-size image viewer for archive issue thumbnails.
- Replaced abstract preview placeholders with temporary archive sample ad imagery where practical.
- Added heavier comments and editing notes in HTML, CSS, and JavaScript.
- Added `README-DEVELOPER.md` with guidance for future edits.

## v5.2.6 — Archive gallery square-card refinement

- Changed archive gallery thumbnails into consistent contact-sheet style cards.
- Added a square artwork area for every gallery item.
- Updated gallery images to use `object-fit: contain` so full artwork remains visible instead of being cropped.
- Set leftover image space to black for a cleaner gallery/matte effect.
- Separated artwork from captions so titles align consistently below each square image area.
- Added additional HTML/CSS/JS comments explaining where to edit archive gallery behavior later.


## v5.2.7 — Resources Section
- Added a new Resources section after the Archive.
- Added a Newspaper Production Template download card.
- Included a placeholder ZIP at `assets/templates/newspaper-indesign-template.zip` so the download link works until the real InDesign package is swapped in.
- Added HTML/CSS notes explaining how to replace the placeholder with the final cleaned template.

---

## Maintainer Notes

This document is part of the Adam Thomas Janes portfolio repository and is intentionally written as a handoff artifact, not just a short project note. Keep notes plain, explicit, and useful for future editing. When the portfolio changes, update this file if the change affects launch readiness, content strategy, design decisions, technical setup, or recruiter-facing presentation.

Repository workflow reminder: edit locally, commit to GitHub, and let Netlify deploy from the repository root. Keep `index.html`, `styles.css`, and `script.js` heavily commented so the project can be reviewed as a professional web/content artifact as well as a live portfolio.

## GitHub / Netlify Launch Prep

- Added expanded comments and maintainer notes across HTML, CSS, JavaScript, Markdown, plain-text, XML, JSON, SVG, and hosting configuration files.
- Added `netlify.toml` so deployment from the repository root is explicit.
- Added a lightweight `404.html` fallback page for broken or outdated links.
- Confirmed the project remains a static website suitable for GitHub source control and Netlify hosting.
## Editorial numbering cohesion
- Removed the repeated “07” prefix from Education & Recognition.
- Kept Education & Recognition and Awards & Publications together under ghost chapter 08.
- Changed the Colophon ghost number from 10 to 09.
- Updated internal chapter comments and EDITORIAL_STRUCTURE.md to match the final sequence.



## Editorial numbering refinement — Colophon 08
- Removed the ghost 08 from the Education & Recognition / Awards & Publications spread.
- Kept that supporting spread intentionally unnumbered.
- Changed the Colophon navigation label and on-page ghost number to 08.
- Removed the previous Colophon 09 references and updated EDITORIAL_STRUCTURE.md.


## Reference Library and Navigation Cohesion
- Expanded Resources into a six-item Reference Library.
- Added planned downloads for magazine, newspaper, brand, preflight, PDF settings, and SEO planning.
- Clarified Communications Practice and Career Timeline headings.
- Added a subtle navigation divider after Archive.
- Updated feature overlay controls to say Previous/Next Feature while archive controls retain Previous/Next Issue.
- Confirmed Colophon as visible chapter 08.

## Education transcript verification
- Removed the unsupported implication that responsive web development was a named college course.
- Added Cum Laude / Magna Cum Laude honors and transcript GPAs.
- Added concise coursework highlights covering typography, page layout, interface design, markup languages, server-side scripting, open-source systems, website operations and security, interactive mobile applications, database management, internship, and graphic-design project management.
- Strengthened Web & WordPress and Project Management production notes with transcript-supported language.

## Education highlights refinement
- Corrected the institution name to International Academy of Design & Technology, matching the name in use when Adam attended.
- Added a dedicated Education Highlights panel with concise, transcript-grounded coursework categories.
- Kept both degrees, honors, and GPAs prominent while removing defensive internal wording from the public-facing copy.

## Chapter eyebrow system
- Added a consistent magenta editorial eyebrow to chapters 01–08.
- Added a distinct running thought to each chapter heading.
- Preserved the numbered heading and ghost-folio system while strengthening hierarchy.
- Added responsive behavior so the supporting thought stacks cleanly on smaller screens.

## Editorial redundancy audit

- Removed the repeated “The Reference Library” kicker beneath the Resources chapter heading.
- Replaced public-facing placeholder copy in the shared archive overlay with neutral fallback language.
- Refined empty-gallery messaging so implementation notes are not shown to visitors.
- Preserved useful contextual eyebrows, labels, and production terminology where they add information rather than repeat it.

## Editorial proof pass — archive visitor copy

- Replaced generic archive fallback wording with finished, visitor-facing editorial copy.
- Removed visible instructions about swapping, adding, testing, or replacing archive assets.
- Reframed archive sidebars around Focus, Presentation, Relevance, Approach, and Selection.
- Reworded the no-image gallery message so it reads as an intentional project presentation rather than an editing instruction.
- Corrected the shared overlay fallback title from “Marketing Campaigns Campaigns” to “Selected Archive Project.”


## Navigation slider ownership fix
- Removed the last legacy active-link update from the general scroll-state routine.
- The unified navigation controller is now the sole owner of active chapter classes and slider position.
- During smooth anchor scrolling, the slider remains fixed beneath the clicked menu item until arrival.

- Matched navigation anchor offsets to the sticky header and changed slider lock release from a timer to target-arrival detection.

## Navigation destination repair
- Changed chapter links to target full section containers instead of nested headings.
- Replaced mixed browser-anchor offsets with one JavaScript-calculated sticky-header offset.
- Unified scroll destination and active-section detection around the same section coordinates.
- Prevented the slider from falling back to the previous chapter after smooth scrolling stops.

## Simplified primary navigation
- Removed the animated moving slider and all scroll-position tracking.
- Restored native anchor navigation with CSS smooth scrolling.
- Added a simple magenta underline for hover, keyboard focus, and the last clicked chapter.
- Added consistent sticky-header clearance with `scroll-margin-top`.

## v5.3.1 — Lightweight chapter tracking
- Added one `IntersectionObserver` to update the active navigation underline as chapters enter the upper reading area.
- Kept native browser anchors and CSS smooth scrolling as the only navigation mechanism.
- Added `aria-current="location"` to the active chapter link for assistive technology.
- Did not restore the retired moving slider, timers, custom scrolling, or manual destination calculations.

## 2026-07-11 — Editorial rendition: chapter rhythm, process map, education integration, ghost folios
- Increased breathing room at numbered chapter openings.
- Added a compact six-stage process diagram before the interactive process principles.
- Integrated Education Highlights into the education column beneath the degree cards.
- Added one-time, reduced-motion-safe ghost-number fade-ins using a presentation-only IntersectionObserver.

## 2026-07-11 — Education spread rebalanced
- Moved Education Highlights beside the degree credentials as an equal top-row column.
- Moved Awards & Publications beneath both education columns as a full-width closing section.
- Added responsive stacking so the layout remains readable on tablets and phones.

## 5.6.0 — Cover utility rail
- Removed the Download Résumé button from the cover so the opening spread remains focused on the publication narrative.
- Added a persistent right-edge editorial utility rail on desktop with Résumé, LinkedIn, Email, and Print Issue actions.
- Added restrained slide-out hover and keyboard-focus behavior.
- Converted the utility to a compact fixed Résumé button on tablet and mobile.
- Added print handling with `window.print()` and hid the utility rail from printed output.


## 5.6.1 — Refined editorial utility tabs
- Removed the Print Issue utility.
- Restyled Resume and LinkedIn as black animated-border edge tabs inspired by the original cover résumé button.
- Added vertical collapsed labels that expand horizontally on hover or keyboard focus.
- Replaced the Email text symbol with a proper envelope icon.
- Preserved a compact animated Resume button on tablet and mobile.

## v5.6.4 — Utility tab alignment and icon pass
- Centered the collapsed Resume and LinkedIn labels inside identical fixed tab boxes.
- Added visible Resume and LinkedIn icons to the collapsed desktop tabs.
- Preserved the slower magenta-only animated border treatment.
