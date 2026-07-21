# Code Audit — v5.27.1

This maintenance pass focused on consistency rather than new visitor-facing behavior.

## Changes completed

- Documented the stylesheet architecture and marked major component regions.
- Centralized repeated interaction timings in `TIMING`.
- Added `scheduleAfterEvent()` for the few interactions that intentionally wait until the current event completes.
- Added a technical-debt register so deferred cleanup is tracked rather than forgotten or mixed into feature releases.
- Synchronized package and cache metadata.

## Maintenance standard

Use existing helpers, component classes, archive schemas, and dialog systems before introducing another implementation pattern. Broad consolidation belongs in a dedicated maintenance release with visual regression testing.

---

# Code Audit — v5.11.8

The v5.11.8 audit confirmed all four Feature-card image paths resolve to WebP assets, one main landmark, one H1, no duplicate IDs, valid internal anchors, JavaScript syntax, balanced CSS braces, explicit accessible counter values, restored counter-card layout, and simplified nested-viewer state. Camp Perry and North Coast Business Journal use curated authentic galleries. Remaining work is Beacon and NCPN population plus manual browser and assistive-technology testing.

Previous summary: The v5.11.3 audit confirmed one main landmark, one H1, no duplicate IDs, valid internal anchors, JavaScript syntax, balanced CSS braces, explicit accessible counter values, restored counter-card layout, and simplified nested-viewer state. Static image dimensions and WebP delivery are present. Remaining work is manual browser and assistive-technology testing.

---

## v5.9.0 Audit Result

- JavaScript syntax: passed.
- Duplicate HTML IDs: none found.
- Internal navigation targets: passed.
- Local file references: passed.
- CSS brace balance: passed.
- Large-image delivery: Camp Perry website and brochure now use optimized WebP files.

## v5.6.3 utility-motion review

- Confirmed Resume and LinkedIn share one restrained magenta perimeter animation.
- Slowed width, transform, label, and shadow transitions to avoid abrupt edge movement.
- Flipped collapsed label orientation without changing link targets or mobile behavior.
- Retained the reduced-motion rule that disables perimeter rotation.

## v5.6.2 utility review

The utility stack uses CSS-only motion and semantic links. No JavaScript controls its expansion. Reduced-motion preferences stop the rotating perimeter while preserving access and layout.

# Code Audit — Issue No. 01

## Scope

This pass traced navigation, anchor destinations, scroll-related CSS, deferred layout behavior, retired dialogs, duplicate IDs, local file references, and release documentation.

## Primary finding

The navigable chapters used `content-visibility: auto` with an estimated intrinsic height. On a long jump—especially to Colophon—the browser could calculate the anchor using estimates. When skipped chapters rendered, their true heights changed the document and the destination appeared to move. Repeated clicks or a tiny manual scroll then seemed to correct it.

## Changes

- Removed deferred rendering from navigable chapters.
- Retained browser-native anchors and CSS `scroll-margin-top`.
- Removed the retired feature reader and its supporting code.
- Kept one current issue-overlay/gallery system.
- Corrected backstage chapter numbering.
- Preserved the visual design and current content.

## Maintenance rule

Navigation should remain browser-native. Avoid JavaScript scroll controllers, arrival timers, moving indicators, and layout-skipping optimizations on chapter sections.

## v5.3.1 navigation follow-up
- Added one IntersectionObserver for active chapter state.
- Confirmed native anchors remain untouched.
- Confirmed no `preventDefault`, `scrollIntoView`, timer lock, shared moving indicator, or scroll-event navigation controller was reintroduced.

## Presentation-only observer
The ghost-folio IntersectionObserver is intentionally isolated from navigation. It observes `.editorial-number-section`, adds `.is-ghost-visible` once, and immediately unobserves each revealed chapter.

## 5.6.0 utility-rail review
- Removed the retired cover résumé component and its animation styles.
- Added one semantic utility `<aside>` with accessible labels.
- Added one small print listener; no navigation or scrolling behavior was changed.
- Confirmed no duplicate IDs and verified JavaScript syntax.


## v5.6.1 utility cleanup
Removed the obsolete print-button markup and JavaScript handler. The remaining rail is link-only, reducing interaction code and preserving native browser behavior.
