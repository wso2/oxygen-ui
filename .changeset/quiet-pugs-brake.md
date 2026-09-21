---
"@wso2/oxygen-ui": minor
---

Add `AppSwitcher` component for navigating between WSO2 Cloud platforms

Renders a grid icon button in the header that opens a popover listing the
available platforms, plus a manage section linking to the WSO2 Cloud tabs. It is
a compound component, matching `Header`, `Sidebar` and `UserMenu`: the trigger
renders in place and every other child goes inside the popover.

- `AppSwitcher.Trigger` - the grid icon button, sharing the hover styling of the
  other header icon buttons
- `AppSwitcher.Section` - a labelled grid of cards, owning its own arrow-key
  navigation, with `Home`/`End` and focus that clamps at the ends rather than
  wrapping
- `AppSwitcher.App` - a destination card carrying the WSO2 mark supplied by the
  component, so the grid stays uniform across products; `disabled` marks a
  platform that is not yet available
- `AppSwitcher.Footer` - the `Manage` section, a labelled grid of WSO2 Cloud
  links (organizations, users, billing) using the same card with a neutral mark
- An enabled card given a `url` opens its platform in a new tab by default;
  every enabled card lifts with an accent border on hover, suppressed under
  `prefers-reduced-motion`
- Navigation via `url` (cross-app), a router `Link` through `component` plus
  `componentProps` (in-app), or `onClick` (programmatic)
- Selecting a card leaves the popover open, since an enabled `url` card opens in
  a new tab; the trigger toggles it, and an outside click or `Esc` dismisses it
- `tooltip` per card, for explaining an unavailable platform (e.g. "Coming
  soon"); it describes the card rather than renaming it
- WSO2 orange is used for the mark and hover border whichever theme the product
  runs, since the switcher is cloud chrome; the focus ring uses a darker brand
  token so it clears the 3:1 WCAG 2.1 SC 1.4.11 asks of a focus indicator
