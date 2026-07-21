# Accessibility Audit — v5.11.8

This audit aligns the site with semantic HTML and WAI-ARIA Authoring Practices where custom widgets are used. It is a strong implementation baseline, not a certification of WCAG conformance. Manual testing with assistive technologies is still required.

## Implemented

- Skip link to the main content landmark.
- One page-level `<main>` landmark and one `<h1>`.
- Native anchor navigation with visible keyboard focus.
- Mobile navigation supports Escape, click-away closing, and accurate `aria-expanded` state.
- Process and Production Notes use ARIA tab patterns with keyboard arrow/Home/End navigation, roving tabindex, `aria-controls`, `aria-labelledby`, and hidden inactive panels.
- Feature/archive overlay uses `role="dialog"`, `aria-modal`, accessible title/description, focus placement, focus trapping, background inertness, Escape closing, and focus return.
- Nested image viewer traps focus within the active viewer, returns focus to the selected thumbnail, exposes the caption as its accessible name, and hides irrelevant previous/next controls for a single image.
- Decorative marks are hidden from assistive technology.
- Reduced-motion styles and counter behavior are present.
- Forced-colors focus indicators are included.
- Animated proof counters expose explicit visually hidden final values instead of transient animated numbers.

## Manual tests still required

- NVDA + Firefox or Chrome on Windows.
- VoiceOver + Safari on iPhone and macOS.
- Keyboard-only traversal through the full page and both dialog levels.
- Browser zoom at 200% and 400% reflow.
- Windows High Contrast / forced-colors mode.
- Contrast measurements for magenta text and muted text over every paper/gradient surface.
- Touch-target sizing on compact mobile controls.
- Reading order after responsive Education and Archive rearrangements.

## Recommended acceptance criteria

- No keyboard traps except intentional modal focus containment.
- All interactive controls have a visible focus indicator.
- Every dialog returns focus to the control that opened it.
- No content or functionality is lost at 200% zoom or 320 CSS pixels wide.
- Meaning is not conveyed by color alone.
- Final project images have concise, contextual alternative text; decorative mockup surroundings use empty alt text where appropriate.
