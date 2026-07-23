# 8.0.11 — Profile image sharing and search metadata

- Replaced the former ATJ social lockup preview with a 1200×630 JPEG derived from the approved cover portrait and communication statement.
- Updated Open Graph and Twitter/X metadata so shared links request Adam Thomas Janes’s cover portrait.
- Added secure image URL, MIME type, dimensions, descriptive alternative text, and site-name metadata for broader social-platform compatibility.
- Added `rel="image_src"` and `max-image-preview:large` to strengthen image discovery and large-preview eligibility.
- Added a dedicated Schema.org `ImageObject` and connected it to the Person, WebSite, and ProfilePage structured data.
- Added the profile image to the XML sitemap using the image sitemap namespace.
- Updated cache-busting references and package metadata to 8.0.11.

# 8.0.10 — Copy refinement

- Replaced the line “A visitor should not need an interview to understand how I can help.” with “Good communication anticipates questions before they’re asked.”
- Preserved the approved v8.0.9 tablet and phone reading-flow improvements.
- Updated cache-busting references and package metadata to 8.0.10.

# 8.0.9 — Tablet and phone reading-flow audit

- Preserved the approved v8.0.8 desktop cover and final readable hero artwork.
- Reduced mobile cover repetition by keeping the portrait statement, name, professional label, and primary actions while hiding duplicate deck and metadata text.
- Reordered the cover artwork first on tablet and phone.
- Converted Philosophy, Feature Stories, What I Make, and Career Notes into native, keyboard-accessible horizontal snap rails on phones, preventing six-card and four-card sections from becoming extremely long vertical stacks.
- Restored two-column Feature and Service grids on tablets instead of collapsing them prematurely to one column.
- Removed two redundant decorative interludes from the phone edition while retaining them on tablet and desktop.
- Tightened section spacing, card padding, headings, proof points, production content, archive preview height, and footer spacing for smaller screens.
- Preserved all content and interactions; no articles, projects, downloads, or capabilities were removed.

# v8.0.8 — Readability-Refined Hero Artwork

- Replaced the “Before You Explore” hero with the final readability-refined artwork supplied by Adam Thomas Janes.
- Preserved the established v8.0.7 hero layout and responsive behavior; only the artwork was refreshed.
- Re-exported the source PNG as an optimized 1400×1400 WebP for crisp embedded typography.
- Updated hero preload, structured-data image URL, visible image cache-busting, stylesheet and script versions, and package version to 8.0.8.
- Retained descriptive alternative text identifying Adam and the communication-philosophy introduction.

# v8.0.7 — Before You Explore Hero

- Replaced the former standalone portrait with the new “Before You Explore” cover artwork.
- Converted the supplied PNG to an optimized 1400×1400 WebP asset (about 192 KB).
- Renamed the asset to `hero-adam-thomas-janes-before-you-explore.webp`.
- Updated preload, structured-data image reference, visible hero image, dimensions, and accessible alternative text.
- Expanded the hero image column so the embedded editorial copy remains readable on desktop and collapses cleanly on smaller screens.
- Updated cache-busting and package version to 8.0.7.

# Changelog

## 8.0.6 — Newspaper Template Asset Refresh

- Replaced the downloadable Adobe InDesign template with the corrected July 26 production file.
- Replaced the example PDF with the corrected two-page export.
- Regenerated Page 1 and Page 2 WebP previews from the new PDF.
- Regenerated the animated top crop and two-page spread so all website previews match the current downloadable files.
- Updated displayed download sizes to 8.6 MB for the INDT and 5.3 MB for the PDF.
- Updated CSS and JavaScript cache-busting references.

## 8.0.5 — Production Chapter

- Renamed Chapter 08 from **Tools & Methods** to **Production**.
- Reframed the chapter around Adam’s strongest professional identity: editorial production, typography, advertising, systems, and complete client delivery.
- Added a **Principles Before Platforms** opening statement grounded in Adam’s love of InDesign, newspaper production, and type.
- Reorganized capabilities into Editorial & Publication Production, Advertising & Campaigns, Communication Systems, Digital Publishing, and Project Delivery.
- Positioned websites as one supporting delivery channel rather than Adam’s primary identity.
- Replaced software-list copy with explanations of why each production discipline is used and what clients gain from it.
- Added responsive production-principle and production-note styling.

# v8.0.3 — Editorial Newspaper Template Resource

- Added the Editorial Newspaper Template as Feature Six.
- Added a full project story and two-page WebP preview gallery.
- Added downloadable, branded INDT and PDF files to the Reference Library.
- Replaced the coming-soon newspaper resource with live download and preview actions.
- Updated package version to 8.0.3.

## 8.0.3 — Navigation and Keyword Spine

- Reduced the ATJ header mark from 46px to 40px.
- Removed the remaining divider and special spacing between Departments and Back Issues.
- Replaced compressed nine-column navigation tracks with evenly spaced flex navigation.
- Moved the compact-menu breakpoint to 1320px so the full navigation disappears before it becomes crowded.
- Expanded the Profile keyword spine from 19 to 39 demonstrated disciplines.
- Tightened the keyword boxes, gaps, lettering, and distance from the vertical guide.
- Kept the keyword sequence continuous rather than stretching a small number of labels across the chapter.

## 8.0.0 — Cover Story Refinement

- Returned to the v7.0.7 cover composition and preserved the large stacked name as the dominant masthead.
- Restyled the professional promise as a serif editorial deck beneath the name rather than a competing headline.
- Preserved the portrait, capability chips, publication metadata, and cover actions.
- Added a 1200 × 630 social-sharing image based on the official ATJ signature lockup.
- Restored the supplied ATJ identity hero asset.
- Expanded the Profile keyword spine through the chapter using demonstrated disciplines only.
- Added the InDesign workflow story to the identity case study.
- Conducted a repetition-focused edit of the opening and Perspective copy.
- Introduced the compact menu at 1260px.
- Removed the unused yellow production rule.
- Added visible file sizes to résumé and full-publication PDF links.
- Updated package.json to 8.0.0.
- Removed unused legacy brand variants.
- Consolidated stacked v7 release overrides into one documented v8 block.

## 7.0.7 — Tab Order and Chapter Numbering

- Removed `tabindex="0"` from large ARIA tab panels so keyboard focus no longer jumps to the top or bottom of tall content areas.
- Kept roving keyboard navigation on the actual tab buttons; Tab now proceeds to the next genuine interactive control.
- Added scroll margins so anchored chapter headings clear the sticky navigation.
- Corrected visible chapter numbers to match the navigation: Perspective 01 through Production 08.
- Removed chapter numbering from the Colophon because it is supporting issue metadata rather than the ninth navigation destination.
- Kept Next Issue as navigation item 09 and the final contact chapter.

## 7.0.6 — Profile and Accessibility Pass

- Renamed the navigation chapter **Masthead** to **Profile**.
- Renamed the visible chapter eyebrow from **The Masthead** to **Profile**.
- Relabelled the primary navigation as **Issue contents**.
- Added accurate Open/Close accessible labels and visible text to the mobile navigation toggle.
- Added keyboard instructions to both ARIA tab interfaces.
- Made selected tab panels focusable as the next logical Tab stop.
- Strengthened keyboard focus visibility, forced-colors treatment, and touch-target sizing.
- Updated the accessibility audit with the intended tab order and remaining manual tests.

## 7.0.5 — Corrected brand SVGs

- Replaced the primary mark, signature lockup, and wordmark with the latest corrected SVG exports supplied by Adam.
- Updated duplicate and legacy SVG asset copies so the website uses the same canonical artwork throughout.
- Refreshed SVG cache-version references.

# v7.0.5 — Navigation and identity asset refinement

- Reduced the desktop ATJ header mark and redistributed navigation spacing so all nine destinations fit more comfortably.
- Added an earlier responsive menu breakpoint for narrower laptop and tablet widths.
- Added the official Adam Thomas Janes wordmark SVG to the brand asset library and identity presentation.
- Removed the white background rectangle from every active signature-lockup SVG.
- Replaced the raster lockup hero and the earlier white-block lockup study with transparent final vector assets.
- Regenerated the signature-lockup PNG with transparency.

# v7.0.0 — Editorial Perspective Edition

- Reframed the cover around Adam’s promise: delivering messages as memorable audience experiences.
- Added an Editorial Perspective chapter based on Adam’s communication philosophy.
- Added a hiring brief that answers practical employer questions before an interview.
- Added a separate identity-system strip while preserving the ATJ development case study.
- Documented that the identity was developed in Adobe InDesign and exported as responsive vector artwork.
- Integrated the primary mark and signature lockup as complementary parts of the publishing system.

# v6.1.0 — ATJ Identity System and Case Study

- Replaced the website header mark and favicon source with the new optimized ATJ primary monogram.
- Added a fifth featured story, “Building the ATJ Identity,” documenting vector construction, typography studies, negative-space refinement, discarded concepts, and the responsive logo system.
- Added the new case study to the magazine-style feature overlay and feature-to-feature navigation.
- Added optimized SVG masters, transparent PNG exports, an expanded signature lockup, favicon output, and identity usage notes under `assets/brand/`.
- Added a curated process gallery showing the evolution from the first custom vector direction to the final primary mark and signature lockup.
- Updated the feature introduction from four to five assignments and synchronized the package release to v6.1.0.

## v6.0.0 — ATJ identity release

- Introduced a refined geometric ATJ monogram with a signature magenta crossbar through the A.
- Rebalanced the T and J proportions for a more unified, compact website mark.
- Added a coordinated square favicon for browser tabs and saved shortcuts.
- Updated header sizing and responsive behavior for the new logo.
- Added a restrained logo interaction that respects reduced-motion preferences.
- Renamed the downloadable Newspaper Starter Template to Weekly Newspaper Production Kit and clarified its two-page editorial scope.
- Synchronized the production package version to v6.0.0.

## v5.28.0 — Archive System Preview Pairings

- Replaced the single-image Archive previews for Parade of Homes, Best of the Best, and Portfolio Website with paired stacked images that better communicate each project as a system.
- Paired the Parade of Homes cover with its route map, the Best of the Best seal with a publication spread, and the portfolio homepage with its Archive interface.
- Added WebP to the production-ready brand asset deliverables and clarified that the exported assets support both print and digital use.
- Reused the existing Archive preview-page structure rather than introducing a second rendering method.
- Refreshed script and stylesheet cache versions.

## v5.27.1 — Code Consistency Maintenance

- Added a stylesheet architecture map and major component landmarks without changing the rendered design.
- Centralized clipboard timeout and status-reset timings in one shared JavaScript timing object.
- Replaced repeated zero-delay event timers with one named scheduling helper.
- Added `TECHNICAL_DEBT.md` to separate non-urgent cleanup from feature development and establish a five-to-ten-release review cadence.
- Updated package metadata and refreshed stylesheet and script cache versions.
- Re-ran syntax, reference, and structural checks after the maintenance pass.

## v5.27.0 — Career Notes

- Expanded Section 05 from a résumé-style timeline into an editorial career narrative while preserving the complete professional record.
- Added six career notes covering Adam’s transition to sole designer, the full Beacon redesign, communication philosophy, client discovery, production systems, curiosity, and AI-assisted practice.
- Documented the 2015 negotiation into a salaried sole-designer role without publishing compensation.
- Added A/B testing, call-to-action comparison, content optimization, iterative design, and user-centered refinement to Backstage and Tools & Methods.
- Added a closing statement connecting two decades of changing tools to the consistent goal of helping audiences understand.

# v5.26.0 — Editorial Continuity + Cover Line Edit

- Audited v5.25.1 against the later-night `script(5).js`; the files were byte-for-byte identical, confirming that the expanded feature and archive copy had already been retained.
- Removed the threefold repetition of “clear” from the cover/opening sequence.
- Reframed the cover around communication, craft, systems, complexity, and understanding.
- Varied repeated wording in the Editor’s Letter, Camp Perry summary, advertising, and responsive-email copy.
- Restored broader hiring-language from earlier drafts: brochures, sell sheets, rack cards, sales collateral, postcards, Google Analytics, and professional real-estate photography.
- Added `EDITORIAL_CONTINUITY_REPORT.md` as a permanent record of what was checked and preserved.


## v5.25.1 — CMYK Orbit Visibility

- Increased the CMYK orbit dots slightly and added a restrained keyline for cleaner separation from the paper background.
- Gave the yellow dot a paper halo and black outer ring so it remains clearly visible without changing the established CMYK palette.
- Refreshed the stylesheet cache version.

## v5.25.0 — Publication Architecture Rewrite

- Removed six accumulated explanatory editorial sections so the site no longer repeatedly announces its publication concept.
- Rewrote the Editor’s Letter as the opening essay for Issue No. 01.
- Reframed the four featured projects as concise editorial stories: the story, the editorial decision, and what changed.
- Renamed the site architecture using restrained publication language: Feature Stories, Departments, Back Issues, Backstage, The Masthead, Reference Library, Production Desk, Colophon, and The Next Issue.
- Rewrote section introductions and the closing contact area so the editorial framing comes from sequencing and voice rather than added manifesto copy.
- Preserved existing anchors, interactions, accessibility structure, archive overlays, and responsive layout.


## v5.17.3
- Expanded Website case study with editorial philosophy, design process, communication goals, and client experience.

## v5.16.1 — Ghost CMYK Scroll Wave

- Replaced the fixed proof-frame graphic and long magenta sweep with four translucent CMYK dots.
- Tied the dots to scroll position in a staggered wave so the ambient motion remains subtle and non-obstructive.
- Added a static reduced-motion presentation and a smaller mobile composition.

## v5.16.0 — Front-End and Production-Layer Audit

- Corrected service-card semantics so expandable button behavior exists only at the mobile breakpoint.
- Added a no-backend contact path with a standard email link, copy-email control, live status feedback, and clickable telephone number.
- Added Open Graph and Twitter preview imagery and refreshed sitemap and robots review dates.
- Strengthened Netlify security headers and replaced year-long immutable asset caching with a shorter revalidation policy suitable for same-name portfolio updates.
- Added incremental archive-gallery loading in batches of eight with keyboard focus preservation.
- Replaced three print-weight full-issue PDFs with complete screen-optimized web editions, reducing their combined size from 56.6 MB to 27.3 MB.
- Added a reusable web-PDF production tool and visually verified representative cover, interior, advertisement, and final pages.
- Updated service, freelance-experience, and contact positioning to include custom HTML, CSS, JavaScript, and AI-assisted prompt-engineering work.
- Removed unused font preconnection and repeated CSS declarations.

## v5.12.0 — North Coast Parent Editorial Curation

- Re-curated the North Coast Parent feature around the strongest portfolio work rather than equal representation of every issue.
- Renamed the project consistently to North Coast Parent Magazine across structured data, the feature card, and the project dialog.
- Preserved original landscape center spreads as standalone artwork and kept those pages out of every other category.
- Refined project copy to emphasize cover direction, center-spread concepts, editorial systems, information design, sponsor integration, and production.
- Removed superseded North Coast Parent gallery assets, manifests, and installation notes from earlier iterations.
- Confirmed all remaining gallery assets are actively referenced by the production site.

## v5.11.7 — North Coast Business Journal gallery sync

- Replaced the six placeholder North Coast Business Journal cards with authentic project assets.
- Added nested carousels for Publication Identity, Editorial Design, Featured, Marketing Integration, and Information Systems.
- Added a Published Magazine card that opens the complete PDF in a new tab.
- Added descriptive alt text and captions for the new imagery.
- Extended the gallery renderer to support linked PDF items alongside image carousels.

# v5.11.3 — SEO-Named WebP Feature Covers

- Connected the four new 1600×900 WebP artworks to the visible Feature cards.
- Renamed Feature artwork with descriptive lowercase, hyphenated filenames that identify both project and subject without keyword stuffing.
- Updated Feature image alternative text to describe the visible work and its editorial context.
- Updated the remaining CSS fallback reference to the renamed Business Journal WebP asset.
- Synchronized release, performance, production-status, milestone, and code-audit documentation.

## v5.11.0 — Editorial Prepress, Accessibility & Performance

- Completed a full visitor-facing editorial pass and removed the redundant opening proof-tag row so evidence is presented once through the metric grid.
- Corrected the opening metric label to “Years in Communications.”
- Renamed visitor-facing archive language from “project sample” to “project image” and refined the Awards archive copy.
- Renamed internal archive sample constants and helpers to production-neutral names.
- Improved ARIA tabs with explicit orientation, stable IDs, `aria-controls`, `aria-labelledby`, roving tabindex, and hidden inactive panels.
- Strengthened the shared project dialog and nested image viewer with scoped focus trapping, focus return, background inertness, dialog descriptions, and single-image navigation handling.
- Removed the nested second `<main>` landmark from the overlay.
- Improved the mobile navigation with Escape-to-close, click-away dismissal, and desktop breakpoint reset.
- Added intrinsic dimensions to static images to reduce layout shift.
- Added WebP delivery assets for the two remaining large Camp Perry gallery images while preserving original JPEG masters.
- Added forced-colors focus support and production status/accessibility audit documentation.

## v5.9.0 — Feature Proof & Deployment Cleanup

- Replaced full-page Feature backgrounds with dedicated 16:9 art-directed thumbnails.
- Switched Feature artwork to semantic, lazy-loaded `<img>` elements with descriptive alternative text.
- Present Feature work in color, with restrained saturation and contrast refinement on hover or keyboard focus.
- Corrected the Production Notes decorative selector after the H2-to-H3 accessibility refactor.
- Made initial bookmarked-chapter positioning immediate by temporarily disabling smooth scrolling during placement.
- Shifted desktop margin notes left to create breathing room beside the fixed utility rail.
- Excluded the redundant 7.86 MB Camp Perry brochure PNG and 5.44 MB website PNG from the deployable package; originals remain in Adam's creative archive.
- Removed superseded full-page Feature JPEGs from the deployable package.

## v5.8.2 — Editorial Margin-Note Rhythm

- Kept the two vertical margin notes as a restrained editorial motif.
- Retained the reader-focused note near the early portfolio chapters.
- Moved “Production is where good design proves itself” from the Method/Career transition to the opening of Chapter 07, Production Notes.
- Increased the distance between the notes so they function as intentional editorial bookends.

## v5.8.1 — Authentic Feature Imagery & Pacing

- Replaced all four abstract Feature-card placeholders with authentic project imagery.
- Added optimized North Coast Business Journal, Beacon, and North Coast Parent cover images from Adam's creative archive.
- Reused the existing Camp Perry website proof image on its Feature card.
- Added accessible descriptions to the Feature imagery.
- Widened the maximum desktop composition from 1040px to 1160px.
- Tightened chapter openings and selected vertical spacing by roughly 10–15 percent.
- Widened and reduced the Reference Library introduction heading for better line breaks.
- Reduced Production Notes panel padding.
- Increased desktop navigation type for stronger functional readability.

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
# v5.11.1 — Accessibility and packaging refinement

- Replaced generic counter labels with explicit visually hidden final values.
- Simplified nested viewer state by relying on `inert` without temporarily hiding the focused issue spread from the accessibility tree.
- Removed the global `!important` hidden-state override in favor of targeted, higher-specificity selectors.
- Excluded two superseded Camp Perry JPEG masters from the deployable project archive; their WebP replacements remain live.
# v5.11.2 — Counter layout repair

- Scoped counter-card styling to direct grid children so nested accessibility text remains visually hidden and does not inherit card borders, spacing, or layout rules.
- Preserved the original animated counter presentation and the explicit screen-reader values introduced in v5.11.1.
## v5.11.8 — Feature-gallery milestone

- Committed the completed Camp Perry and North Coast Business Journal gallery milestone before Beacon production begins.
- Curated Camp Perry location photography from nine images to six representative views.
- Corrected the Camp Perry business-card caption and alternative text.
- Corrected the structured-data portrait URL and retired Brand Identity thumbnail reference found during milestone validation.
- Synchronized package and production documentation to v5.11.8.
- Confirmed the complete Business Journal PDF uses Fast Web View, loads only on request, and receives long-lived asset caching.
- Prepared a clean handoff archive without Git history or unreferenced photography files.
## v5.17.0 — Portfolio Website Living Case Study

- Added the portfolio website as an eighth archive project and living case study.
- Documented creative direction, information architecture, content ownership, AI-assisted front-end development, accessibility review, and performance standards without inventing outcomes.
- Added a five-part visual record covering the homepage, feature system, services, archive, and process/contact experience.
- Established the archive entry as an evolving record for future launch findings, validation, and meaningful improvements.
## v5.17.1 — Production polish and delivery audit

- Re-encoded the primary portrait at its rendered 1000 × 1000 dimensions, reducing it from 188 KB to approximately 72 KB without changing the visible layout.
- Added an explicit preload and eager-loading signal for the above-the-fold portrait while retaining high fetch priority and asynchronous decoding.
- Refreshed CSS, JavaScript, and portrait cache-busting tokens so deployed visitors receive the audited files immediately.
- Removed the duplicate robots directive from the custom 404 page and synchronized its stylesheet reference.
- Re-ran JavaScript syntax, runtime asset-reference, WebP inventory, and delivery-ceiling checks against the complete production asset set.
- Synchronized the package release number to v5.17.1.



## v5.18.0
- Expanded website case study with editorial reflections and communication philosophy.


## v5.22.0
- Added Editor's Margin, Recurring Theme, and Next Issue sections.
- Continued transition from portfolio to publication.


## Editorial Direction
This edition continues the evolution from a portfolio into an editorial publication. Features are written to explain not only what was created, but why those communication decisions mattered. Recurring editorial reflections, transitions, and thematic storytelling reinforce the idea that every project is part of a larger conversation about clear communication.

## 8.0.4 — Performance and release hardening

- Reduced the two full-page editorial-template WebP previews from roughly 1.67 MB combined to under 600 KB combined while preserving readable gallery previews.
- Removed three unused portfolio-site gallery images identified by the asset audit.
- Added click, tap, Enter, and Space support to the crop-to-spread newspaper preview, including an accurate pressed state for assistive technology.
- Added a zero-dependency site-health audit for duplicate IDs, missing local references, missing image alternatives, and unlabeled buttons.
- Added the site-health audit to `npm run check` so JavaScript, assets, HTML structure, and local references are validated together.
- Added targeted Netlify caching for HTML and downloadable resource files.
- Updated stale developer notes that still referred to placeholder proof text and a placeholder template archive.
- Updated the package version to 8.0.4.
