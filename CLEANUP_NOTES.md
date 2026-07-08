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
