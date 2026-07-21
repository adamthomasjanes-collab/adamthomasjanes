# Performance Audit — v5.11.8

## Current strengths

- Static HTML, CSS, and vanilla JavaScript with no runtime framework or build dependency.
- Deferred JavaScript.
- Lazy-loaded below-the-fold feature and gallery images.
- Intrinsic image dimensions on static images to reduce cumulative layout shift.
- Async image decoding.
- Optimized WebP delivery for the largest Camp Perry gallery images; redundant JPEG masters are excluded from the deployable project archive.
- Motion is disabled for users who prefer reduced motion.

## Asset changes in this release

- The complete North Coast Business Journal PDF is confirmed as linearized for Fast Web View, opens only on request, and is covered by long-lived asset caching. Its 32-page print-quality source remains approximately 31.9 MB; a smaller lossy derivative can replace it later if download testing shows that is necessary.
- Camp Perry location photography is curated from nine images to six representative views, reducing the deployable gallery payload without weakening the project story.

- `camp-perry-photography.jpg` (about 1.18 MB) now has a WebP delivery file of about 244 KB.
- `camp-perry-collateral.jpg` (about 770 KB) now has a WebP delivery file of about 385 KB.

## Feature cover delivery in v5.11.3

The four 1600×900 Feature cards now use WebP assets directly:

- `feature-camp-perry-lodging-website.webp`
- `feature-north-coast-business-journal-cover.webp`
- `feature-beacon-newspaper-front-page.webp`
- `feature-ncpn-parent-magazine-cover.webp`

The files use descriptive names and avoid duplicated JPEG delivery assets.

## Recheck after final images are added

- Keep feature thumbnails near 1600×900 or smaller and generally below 300 KB.
- Keep gallery thumbnails near 600×600 and generally below 150 KB.
- Use WebP or AVIF for browser delivery when photographic detail allows it.
- Avoid loading full-resolution gallery images until the viewer opens.
- Run Lighthouse and PageSpeed Insights after all portfolio imagery is final.
- Confirm the cover portrait remains the only high-priority image.
