# Technical Debt Register

## Purpose

This file records maintenance opportunities without interrupting editorial or feature work. Items belong here only when the current implementation is functional and safe but could be simplified, consolidated, or documented more clearly in a later maintenance release.

## Working rules

- Prefer extending an established component or helper over introducing a second method for the same job.
- Record non-urgent cleanup here instead of mixing broad refactors into content releases.
- Review this register every five to ten releases and close items in a dedicated maintenance version.
- Keep visitor-facing behavior unchanged during cleanup unless a separate feature decision approves the change.

## Open items

### CSS cascade consolidation — low priority
The stylesheet retains versioned refinements near the end so historical releases remain traceable. During a future maintenance release, compatible overrides can be moved back into their owning component sections after visual regression testing.

### Archive data-schema validation — low priority
Archive project and issue objects currently follow stable conventions. A future developer utility could validate required keys, optional gallery fields, and issue-key relationships before deployment.

### Manual browser regression matrix — recurring
Continue periodic checks in current Chrome, Firefox, Safari, and Edge, including keyboard-only navigation, reduced motion, mobile archive placement, dialogs, and deep-link chapter arrival.

## Closed in v5.27.1

- Added a stylesheet architecture map and major component landmarks.
- Centralized repeated asynchronous interaction timings.
- Added one shared next-task scheduler instead of repeating zero-delay timers.
- Synchronized package metadata, cache versions, code-audit notes, and changelog.
