# Portfolio Developer Notes

This version adds a more complete **03 · From the Archive** system.

## What changed

- The Archive section now has nine tabs:
  1. Advertising Campaigns
  2. Restaurant & Hospitality
  3. Publication Design
  4. Brand Identity
  5. Web & Digital
  6. Photography
  7. Marketing Collateral
  8. Editorial Features
  9. Awards
- The Archive **Open** button launches the reusable archive issue overlay.
- Archive sample ads are used as thumbnails so the lightbox can be tested with real images while final project assets are selected.
- The archive issue overlay now includes a nested image viewer for individual ad thumbnails.
- Extra comments were added in `index.html`, `styles.css`, and `script.js` to make on-the-fly edits easier.

## Where to edit archive tabs

Edit the visible tab buttons in `index.html` inside:

```html
<aside class="archive-list">
```

The `data-archive-index` numbers must match the order of the `archiveProjects` array in `script.js`.

## Where to edit archive preview content

Edit `archiveProjects` near the top of `script.js`.

Each object controls the preview panel before the overlay opens:

```js
{
  title: "Advertising Campaigns",
  type: "Advertising / Print Campaigns",
  desc: "Preview description...",
  points: ["Point one", "Point two", "Point three"],
  thumb: "thumb-campaigns",
  issueKey: "archive-campaigns"
}
```

## Where to edit overlay content

Edit `ARCHIVE_ISSUES` near the bottom of `script.js`.

The `issueKey` from `archiveProjects` must match one of the keys in `ARCHIVE_ISSUES`.

## Where to replace archive sample images

The temporary ads are listed in `ARCHIVE_SAMPLE_ADS` near the bottom of `script.js`.

To replace an archive sample image:

1. Put the optimized image in `/assets`.
2. Change the `src` value.
3. Update the `label` and `alt` text.

## Image sizing note

The overlay thumbnails use `object-fit: cover` so every tile looks consistent. The full-size lightbox uses the original image ratio.

## Safe editing rule

For quick copy edits, start in `script.js`. For structure changes, use `index.html`. For spacing, crops, colors, and responsive behavior, use `styles.css`.

### v5.2.6 Archive Gallery Cards

Archive overlay gallery cards are generated in `script.js` inside `setIssueContent()`.
Each item uses this structure:

- `.archive-media-card` — clickable card
- `.archive-media-art` — square image area
- `.archive-media-caption` — number and title below the image

The square image area uses `object-fit: contain`, so the full ad/design stays visible. Any unused space is black on purpose. This makes mixed-size work feel more like a gallery contact sheet.


## Resources / Template Downloads
The Resources section starts with a Newspaper Production Template card. The button points to:

`assets/templates/newspaper-indesign-template.zip`

The downloadable resource now uses the final branded `.indt` template and reference PDF. Future revisions should preserve the public filenames, remove employer-owned or proprietary material, and avoid redistributing restricted fonts.

---

## Maintainer Notes

This document is part of the Adam Thomas Janes portfolio repository and is intentionally written as a handoff artifact, not just a short project note. Keep notes plain, explicit, and useful for future editing. When the portfolio changes, update this file if the change affects launch readiness, content strategy, design decisions, technical setup, or recruiter-facing presentation.

Repository workflow reminder: edit locally, commit to GitHub, and let Netlify deploy from the repository root. Keep `index.html`, `styles.css`, and `script.js` heavily commented so the project can be reviewed as a professional web/content artifact as well as a live portfolio.


## Navigation architecture

Primary chapter links are ordinary same-page anchors. CSS supplies smooth scrolling and sticky-header clearance. JavaScript only applies the visual `.is-active` underline to the most recently clicked link; it does not calculate section positions or control page movement. Do not reintroduce deferred rendering or JavaScript scroll controllers on navigable chapters.
