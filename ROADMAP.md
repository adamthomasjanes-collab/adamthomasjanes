# Roadmap

## Current Status

The site has reached the v5 editorial publication direction. The next work should focus on proof, validation, résumé alignment, and case-study expansion.

---

## Priority 1 — Content Proof

- Add real project images.
- Replace placeholder proof text.
- Expand Camp Perry into a full case study.
- Add measurable outcomes where available.
- Add before/after visuals where possible.

---

## Priority 2 — Resume Alignment

- Rework the résumé to match the strongest web copy.
- Use the same core promise and editorial positioning.
- Keep InDesign and publication production highly visible.
- Preserve web communications, WordPress, SEO, and marketing communications.

---

## Priority 3 — Accessibility Audit

- Keyboard-only walkthrough.
- Focus order review.
- Dialog behavior review.
- Heading hierarchy review.
- Color contrast check.
- Reduced-motion check.
- Screen reader spot-check.

---

## Priority 4 — Performance + Launch Prep

- Lighthouse audit.
- Validate HTML.
- Validate structured data.
- Confirm sitemap and robots.
- Confirm asset sizes.
- Consider final CSS/JS minification.
- Test on mobile, tablet, desktop, and large screens.

---

## Priority 5 — Case Study Expansion

- Capture milestone screenshots.
- Add before/after visuals.
- Add annotated decisions.
- Create a polished PDF version of the case study.
- Consider a “Behind the Pages” page on the live site.

---

## Priority 6 — Identity Refinement

- Continue refining the ATJ wordmark.
- Consider a small logo usage section in `DESIGN_SYSTEM.md`.
- Create social preview image.
- Create business card or cover-letter companion styling.

## Navigation QA after v5.1.6

- Test menu scrolling across desktop, tablet, and mobile.
- Confirm sticky header offset behaves correctly.
- Confirm the Colophon target lands accurately.
- Confirm no duplicate scroll scripts are reintroduced.

## Navigation QA after v5.1.7

- Test native anchor scrolling in Chrome, Safari, Firefox, and mobile Safari.
- Tune `--anchor-scroll-offset` only if needed.
- Avoid reintroducing JavaScript-controlled anchor scrolling unless absolutely necessary.

## No-JavaScript navigation QA

- Confirm the menu remains readable on narrow screens.
- Consider a future CSS-only responsive nav pattern if the wrapped links take too much space.

## Anchor-target QA after v5.1.9

- Test desktop, tablet, and mobile menu jumps.
- Tune `--anchor-target-offset` only if necessary.
- Avoid adding JavaScript back to menu navigation.

## Heading-anchor QA after v5.2.0

- Test heading-based menu jumps on desktop and mobile.
- Tune `--heading-anchor-offset` if necessary.
- Keep the menu JavaScript-free.

---

## Maintainer Notes

This document is part of the Adam Thomas Janes portfolio repository and is intentionally written as a handoff artifact, not just a short project note. Keep notes plain, explicit, and useful for future editing. When the portfolio changes, update this file if the change affects launch readiness, content strategy, design decisions, technical setup, or recruiter-facing presentation.

Repository workflow reminder: edit locally, commit to GitHub, and let Netlify deploy from the repository root. Keep `index.html`, `styles.css`, and `script.js` heavily commented so the project can be reviewed as a professional web/content artifact as well as a live portfolio.

