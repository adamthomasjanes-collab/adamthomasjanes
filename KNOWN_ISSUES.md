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

- Replace placeholder proof text such as `[Add metric/proof]`.
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

Manually test Practice, Features, Archive, Process, Career Record / History, Production Notes / Notes, Colophon, the logo home link, and the skip link.

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

