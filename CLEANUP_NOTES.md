# Cleanup Notes

## Current Status

The project has gone through multiple cleanup passes, but it remains in active development. Source files are intentionally readable rather than fully minified.

---

## Completed Cleanup

- Removed older duplicate anchor-scroll correction code.
- Preserved current sticky-header navigation behavior.
- Preserved keyboard-focus correction.
- Checked duplicate ARIA label risks.
- Removed old magenta-circle logo styling conflicts.
- Removed the large hero logo lockup.
- Preserved the custom ATJ header mark.
- Preserved the client-expectation Process section.
- Cleaned trailing whitespace and excessive blank lines in prior releases.

---

## Not Yet Done

- Full unused CSS audit.
- Full unused JavaScript audit.
- Asset-size audit.
- Final minification.
- Lighthouse review.
- Manual accessibility audit.

---

## Launch Recommendation

Before publishing:

1. Run accessibility checks.
2. Run Lighthouse.
3. Validate HTML.
4. Validate structured data.
5. Compress assets.
6. Minify production CSS and JavaScript if desired.

## v5.1.6 cleanup

- Removed accumulated inline scroll-correction scripts.
- Consolidated menu scrolling into `script.js`.
- Added CSS support for consistent section scroll margins.

## v5.1.7 cleanup

- Removed custom JavaScript scroll controllers.
- Moved anchor positioning to CSS.
- Kept only mobile menu close behavior in JavaScript.

## v5.1.8 cleanup

- Removed navigation JavaScript.
- Removed the nav toggle button.
- Kept CSS-only anchor positioning.

## v5.1.9 cleanup

- Kept navigation JavaScript removed.
- Replaced section-container anchor jumps with dedicated invisible anchor targets.
- Centralized landing adjustment in `--anchor-target-offset`.

## v5.2.0 cleanup

- Removed hidden anchor spans.
- Removed previous anchor-target CSS.
- Rebuilt navigation around visible heading IDs.
- Kept navigation JavaScript removed.

---

## Maintainer Notes

This document is part of the Adam Thomas Janes portfolio repository and is intentionally written as a handoff artifact, not just a short project note. Keep notes plain, explicit, and useful for future editing. When the portfolio changes, update this file if the change affects launch readiness, content strategy, design decisions, technical setup, or recruiter-facing presentation.

Repository workflow reminder: edit locally, commit to GitHub, and let Netlify deploy from the repository root. Keep `index.html`, `styles.css`, and `script.js` heavily commented so the project can be reviewed as a professional web/content artifact as well as a live portfolio.
# v5.10 production cleanup

- v5.10.4 removes the redundant mobile résumé link from primary navigation and its retired CSS. Résumé access remains available through the persistent utility tab and footer.
- v5.10.3 restores all public-facing HTML and JavaScript from a known-good UTF-8 source before reapplying asset-path cleanup, eliminating character-encoding artifacts while preserving the lighter production structure.
- Removed CSS selectors with no live HTML or JavaScript reference.
- Consolidated repeated breakpoint blocks into one block per breakpoint.
- Removed legacy `!important` overrides and retained the cascade in source order.
- Consolidated repeated selectors within each responsive context.
- Removed production commentary from live CSS and JavaScript; maintenance guidance remains in the project documentation.
- Replaced live PNG image references with optimized JPEG or existing WebP assets.
- The project archive includes the professional audit, design-system, decision, release-history, and handoff documents. Its `assets` folder remains deployment-ready: source masters, retired images, and redundant PNG files are kept outside the archive.
