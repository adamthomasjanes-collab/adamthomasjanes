# Known Issues — v5.11.8

## Open before launch

- Complete final feature and archive imagery.
- Complete and rights-check downloadable resources before enabling links.
- Run NVDA, VoiceOver, keyboard-only, forced-colors, and 200%/400% zoom tests.
- Re-run performance tests after final images are installed.
- Verify all quantitative proof points against source records before public launch.

No known blocking JavaScript, anchor-navigation, duplicate-ID, or local-reference errors were found in the static audit.

---

## v5.9.0 Status

Bookmarked chapters now receive immediate positioning plus one post-layout confirmation. The unfinished Reference Library is intentionally visible as a pre-launch preview with roadmap states; downloads remain inactive until each package is verified. The visible heading outline is semantic, the chapter order leads with evidence, and all Feature cards use color, art-directed project thumbnails. Outstanding work is primarily adding verified metrics where available and completing downloadable resources.

## v5.6.3 review

No new known issues were introduced by the utility-tab timing, color, or label-orientation changes. Confirm hover and keyboard-focus behavior on desktop during final browser testing.

## Utility controls

No known functional issues. Confirm inward label orientation and hover expansion on at least one Windows browser and one macOS browser before public launch.

# Known Issues

This file tracks items to verify before launch.

---

## Needs Manual Review

### Accessibility

- Confirm keyboard behavior in all dialogs.
- Confirm focus order through all sections.
- Confirm process tabs announce correctly.
- Confirm archive accordions announce expanded/collapsed states on mobile.
- Confirm reduced-motion behavior is complete.
- Confirm color contrast over paper/CMYK effects.

### Mobile

- Review v5.0 folios and margin-inspired elements on small screens.
- Confirm no horizontal scrolling.
- Confirm archive and process sections remain comfortable to use.
- Confirm header logo sizing.

### Content

- Add quantitative proof only where a reliable, supportable metric is available; no public placeholder proof text remains.
- Add real project screenshots.
- Confirm all résumé download links point to the correct final PDF.
- Confirm phone/email/contact details are current.
- Confirm every claim is supportable.

### SEO

- Validate JSON-LD structured data.
- Confirm canonical URL before launch.
- Confirm sitemap domain before launch.
- Create or update Open Graph preview image.
- Submit sitemap in Google Search Console after launch.

### Performance

- Run Lighthouse.
- Check image sizes.
- Consider minified CSS/JS for production.
- Confirm no unused experimental assets are being loaded.

### Documentation

- Add milestone screenshots when available.
- Expand case study with before/after visuals.
- Keep changelog updated on every ZIP release.

## Verify v5.1.6 menu scrolling

Manually test Practice, Features, Archive, Method, Career Record / History, Production Notes / Notes, Colophon, the logo home link, and the skip link.

## Verify v5.1.7 CSS-only navigation

Manually test every menu item on desktop and mobile. If a section lands too high or low, adjust only `--anchor-scroll-offset` in CSS.

## Verify v5.1.8 no-JavaScript navigation

- Test each menu anchor in desktop and mobile widths.
- Confirm the nav remains usable when wrapped on small screens.
- If section landing feels too high or low, adjust only `--anchor-scroll-offset`.

## Verify v5.1.9 dedicated anchor targets

Test every menu item. If landing is slightly high or low, adjust only `--anchor-target-offset` in `styles.css`.

## Verify v5.2.0 heading anchors

Test every menu item and confirm each one lands with the visible section heading near the top of the viewport. If needed, adjust only `--heading-anchor-offset`.

---

## Maintainer Notes

This document is part of the Adam Thomas Janes portfolio repository and is intentionally written as a handoff artifact, not just a short project note. Keep notes plain, explicit, and useful for future editing. When the portfolio changes, update this file if the change affects launch readiness, content strategy, design decisions, technical setup, or recruiter-facing presentation.

Repository workflow reminder: edit locally, commit to GitHub, and let Netlify deploy from the repository root. Keep `index.html`, `styles.css`, and `script.js` heavily commented so the project can be reviewed as a professional web/content artifact as well as a live portfolio.


- Navigation destination/slider mismatch: resolved by section-based navigation controller.

## Resolved: moving navigation slider
The former animated slider could disagree with anchor destinations and backtrack after smooth scrolling. It has been removed in favor of native anchor navigation and a stable per-link underline.

## Recently resolved

- Native chapter links no longer depend on deferred off-screen layout estimates.
- The retired feature-reader system has been removed.

## Verification requested for v5.3.1
- Scroll through every chapter on desktop and mobile and confirm the underline changes once the next chapter enters the upper reading area.
- Confirm clicking any chapter still lands correctly because the observer does not control movement.

## Utility rail testing
- Manually verify the right-edge rail does not overlap browser scrollbars or OS accessibility overlays at unusual zoom levels.
- Confirm the compact résumé button remains clear of mobile browser controls on representative iOS and Android devices.


## Utility rail testing
- Verify vertical tab labels and animated borders in current Chrome, Edge, Firefox, and Safari.
- Confirm the compact Resume utility does not cover important content on narrow phones.
