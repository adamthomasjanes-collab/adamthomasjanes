# Accessibility Audit — v7.0.7

This release uses semantic HTML first and WAI-ARIA only where native HTML does not provide the required widget behavior. It is a strong accessibility baseline, not a formal WCAG certification.

## Implemented and verified in code

- Skip link is the first keyboard-focusable control and moves focus to the main landmark.
- One page-level `<main>` landmark and one page-level `<h1>`.
- Primary navigation is labelled **Issue contents**.
- The mobile menu exposes accurate `aria-expanded` and accessible Open/Close labels.
- Escape closes the mobile menu and returns focus to its toggle.
- Current chapter links receive `aria-current="location"`.
- The former **Masthead** chapter is now labelled **Profile**.
- Process and Production interfaces follow the ARIA tabs pattern:
  - `role="tablist"`, `role="tab"`, and `role="tabpanel"`
  - unique IDs, `aria-controls`, and `aria-labelledby`
  - roving `tabindex`
  - Arrow, Home, and End keyboard navigation
  - inactive panels are removed from the tab order with `hidden`
  - tab panels remain readable but are not added as artificial Tab stops
  - visually hidden keyboard instructions are associated with each tablist
- Feature and archive stories use a modal dialog pattern with:
  - accessible title and description
  - focus placement and focus containment
  - Escape closing
  - background inertness
  - focus return to the opening control
- The nested image viewer has its own modal focus containment and returns focus to the selected thumbnail.
- Decorative rules, crop marks, and production marks are hidden from assistive technology.
- Visible `:focus-visible` indicators are provided for links, buttons, tabs, tab panels, and custom controls.
- Forced-colors focus treatment is included.
- Important compact controls have a minimum 44 × 44 CSS-pixel target.
- Reduced-motion behavior is supported.
- Animated counters expose stable screen-reader text rather than announcing transient values.
- Copy-email feedback uses a live status message.

## Keyboard traversal expectation

The intended sequence begins with:

1. Skip to main content
2. Publisher utility links
3. ATJ home mark
4. Menu toggle when displayed
5. Issue-contents links
6. Page calls to action and interactive features in reading order

Within each tab interface, only the selected tab is in the ordinary Tab sequence. Arrow keys move between tabs; the next Tab moves to the next genuine interactive control. Modal dialogs temporarily contain focus until closed.

## Manual testing still required before claiming WCAG conformance

- NVDA with Firefox and Chrome on Windows
- VoiceOver with Safari on iPhone and macOS
- Full keyboard-only traversal, including both dialog levels
- 200% and 400% browser zoom and 320 CSS-pixel reflow
- Windows High Contrast / forced-colors mode
- Measured contrast for magenta and muted copy across all paper and image surfaces
- Touch-target checks on physical phones and tablets
- Reading order after responsive Education, Archive, and utility-rail rearrangements

## Acceptance criteria

- No keyboard traps except intentional focus containment in an open modal.
- Every actionable control has a visible focus indicator.
- Dialogs return focus to the control that opened them.
- No content or functionality is lost at 200% zoom or 320 CSS pixels wide.
- Meaning is not conveyed by color alone.
- Informative images have contextual alternative text; decorative images have empty alternative text.
