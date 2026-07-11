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
