# Mobile and Tablet Experience Audit — v8.0.9

## Scope
Reviewed the approved v8.0.8 baseline for phone and tablet behavior, with special attention to excessive vertical scrolling, repeated cover messaging, card-stack length, navigation, touch targets, and responsive reading order.

## Main findings
- The phone cover repeated several messages already embedded in the final hero artwork, making the opening longer than necessary.
- At 980 px, six Feature cards and six Service cards changed from two columns to one, unnecessarily doubling tablet scroll depth.
- On phones, Philosophy, Features, Services, and Career Notes created long vertical card stacks.
- The standalone pull quote and print-language interlude repeated ideas already communicated by the hero and surrounding chapters.
- Major cards retained desktop padding and type density on narrow screens.

## Implemented corrections
- Tablet Features and Services remain two-column through 701–980 px.
- The hero artwork appears first on tablet and phone.
- Duplicate hero deck, metadata, rule, and issue eyebrow are hidden only on phones.
- Long mobile card collections use native horizontal scroll-snap rails. This lowers page height while preserving all content and keyboard focus order.
- The duplicate pull-quote and decorative print-language interlude are omitted only below 700 px.
- Section spacing, card padding, typography, proof points, archive preview, production panel, and footer were compacted.
- Buttons retain at least 44–46 px touch height.

## Result
The desktop design remains unchanged. Tablet keeps more content visible per screen, and phone users encounter fewer repeated messages and substantially fewer stacked cards while retaining access to every project and capability.
