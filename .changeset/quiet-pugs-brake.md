---
"@wso2/oxygen-ui": minor
---

Add `AppSwitcher` component for navigating between WSO2 Cloud platforms

Renders a grid icon button in the header that opens a popover listing the
available platforms, plus a manage section linking to the WSO2 Cloud tabs. The
layout is fixed by design so the switcher stays consistent across every product:
consumers describe the destinations with the `apps` and `footer` props rather
than composing markup.

- `apps` - `name` and `url` per platform, with `disabled` for platforms that are
  not yet available; every card carries the WSO2 mark supplied by the
  component, so the grid stays uniform across products
- An enabled card given a `url` opens its platform in a new tab by default;
  every enabled card lifts with an accent border on hover, suppressed under
  `prefers-reduced-motion`
- `footer` - the `Manage` section, a labelled grid of WSO2 Cloud links
  (organizations, users, billing) using the same card with a neutral mark
- Navigation via `url` (cross-app), a router `Link` through `component` plus
  `componentProps` (in-app), or `onClick` (programmatic)
- Selecting a card leaves the popover open, since an enabled `url` card opens in
  a new tab; the trigger toggles it, and an outside click or `Esc` dismisses it
- `tooltip` per card, for explaining an unavailable platform (e.g. "Coming
  soon"); it describes the card rather than renaming it
- Arrow-key navigation within each grid, with `Home`/`End` and focus that clamps
  at the ends rather than wrapping
- WSO2 orange is used for the mark, hover border and focus ring whichever theme
  the product runs, since the switcher is cloud chrome
