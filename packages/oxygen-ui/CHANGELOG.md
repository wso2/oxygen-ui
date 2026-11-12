# @wso2/oxygen-ui

## 0.23.1

### Patch Changes

- [#693](https://github.com/wso2/oxygen-ui/pull/693) [`0abda89`](https://github.com/wso2/oxygen-ui/commit/0abda89e6e1f469df939baa7e6669f7edd296a0f) Thanks [@aruniw](https://github.com/aruniw)! - PR: #TBD

  Give `AcrylicOrangeTheme` and `AcrylicPurpleTheme` a dark `secondary.contrastText` (`#40404B`) in light mode. Their light grey `secondary.main` inherited the base theme's white, which is 1.2:1, so text set in `secondary.contrastText` on `secondary.main` was unreadable. The light, dark and channel tokens are now derived from the light grey too, so hovered or focused secondary chips and FABs (`secondary.dark`, now `#d0d0d0`) and secondary chip delete icons stay readable. The Avatar `Colors` story now pairs each background with its `contrastText`, so the secondary avatar letter shows in every theme, including `ChoreoLabsTheme`, where the theme's Avatar text colour matches `secondary.main`.

- [#693](https://github.com/wso2/oxygen-ui/pull/693) [`3bb6863`](https://github.com/wso2/oxygen-ui/commit/3bb686363951ed0e9c2d11ce146911d3ff87f17f) Thanks [@aruniw](https://github.com/aruniw)! - In `ChoreoLabsTheme`, buttons used as toggles no longer lift on hover or press in when clicked. This covers buttons in a `ButtonGroup` and buttons with `aria-pressed`. The lift pulled one segment out of line with its neighbours. Other filled and outlined buttons still lift.

- [#693](https://github.com/wso2/oxygen-ui/pull/693) [`5e96900`](https://github.com/wso2/oxygen-ui/commit/5e96900c00ee0306ee4f513b6b6cf1769dbf649a) Thanks [@aruniw](https://github.com/aruniw)! - PR: #TBD

  Fit `ComplexSelect` with the label inside the field (`labelAnchor="inside"`, the default) in a 64px `Header`. The field drops the theme's single-line padding and the value text's margins and is 48px tall in every theme, with its content centred and 12px of left padding, which leaves 8px above and below it in the header. Content taller than 48px, such as a large avatar, still grows the field. It was 63px in `ChoreoLabsTheme`, where it touched the top and bottom of the header. `ContextSwitcher.Level` gets the same fix. Fields without a label, or with the label `outside` or on the `border`, are unchanged. The inside label now names the combobox through a visually hidden `span` instead of a `<label>` that pointed at no form control, so Chrome no longer reports "No label associated with a form field". The accessible name is unchanged, and a `labelId` you pass still names the combobox. `ComplexSelect` now defaults to `size="small"` on its own, instead of following the theme's default for `Select`, so a theme that makes `Select` medium no longer makes the Header switchers taller. A theme can change it with `components.MuiComplexSelect.defaultProps.size`, and the `size` prop still wins. In `ChoreoLabsTheme`, a focused `ComplexSelect` with the label inside now gets the same 3px Cobalt focus ring as a fixed-label `Select` (red on error), as one with the label outside already did. A field with the label on the border, or with no label, keeps the text-colour border without a ring. The docs, the `oxygen-select` and `oxygen-layout` skills, and `AGENTS.md` now tell developers to keep the default `labelAnchor` (`inside`) and not to use `outside` or `border` in new code, and the `ComplexSelect` section of the component reference describes the real API.

- [#693](https://github.com/wso2/oxygen-ui/pull/693) [`3bb6863`](https://github.com/wso2/oxygen-ui/commit/3bb686363951ed0e9c2d11ce146911d3ff87f17f) Thanks [@aruniw](https://github.com/aruniw)! - `Form.ElementWrapper` keeps its label at the default colour when the field inside it is focused, like the Oxygen `Select` fixed label. It used to turn the theme's primary colour (orange in `ChoreoLabsTheme` and the Acrylic themes). The field's border still shows focus.

- [#695](https://github.com/wso2/oxygen-ui/pull/695) [`60e8e06`](https://github.com/wso2/oxygen-ui/commit/60e8e06a62ab5b2a4660d507b3eeabaa9a807b04) Thanks [@NipuniBhagya](https://github.com/NipuniBhagya)! - Derive a theme's `font` CSS variables from its own typography in `createOxygenTheme`.

- [#693](https://github.com/wso2/oxygen-ui/pull/693) [`3bb6863`](https://github.com/wso2/oxygen-ui/commit/3bb686363951ed0e9c2d11ce146911d3ff87f17f) Thanks [@aruniw](https://github.com/aruniw)! - `SearchBar` drops the input's left padding, so the gap between the search icon and the text is the icon's 8px margin instead of 22px. `SearchBarWithAdvancedFilter` gets the same fix. Themes can now style the search bar through `components.MuiSearchBar.styleOverrides`. In `ChoreoLabsTheme`, a focused search bar without a floating label gets the same 3px light Cobalt ring as a fixed-label text input (red on error).

- Updated dependencies []:
  - @wso2/oxygen-ui-icons-react@0.23.1

## 0.23.0

### Minor Changes

- [#687](https://github.com/wso2/oxygen-ui/pull/687) [`1ff809a`](https://github.com/wso2/oxygen-ui/commit/1ff809ac9660e45e35fcf5688d76be589d2140ec) Thanks [@aruniw](https://github.com/aruniw)! - Add an Oxygen `Select` with `labelPlacement="top"`, which draws a fixed label above the field; the floating label is unchanged. Add a `placeholder` prop to `Select` and to `TextField` selects. In `ChoreoLabsTheme`, select labels keep their default colour on focus and in error, fixed-label selects take the text field focus style, and menu items drop the clipped focus outline and use a neutral fill for the selected option. Add the `oxygen-select` skill.

### Patch Changes

- [#690](https://github.com/wso2/oxygen-ui/pull/690) [`5aec07e`](https://github.com/wso2/oxygen-ui/commit/5aec07e655356fea986de5155cf241c97923da69) Thanks [@aruniw](https://github.com/aruniw)! - Align `ChoreoLabsTheme` breadcrumbs, links, page titles and `ComplexSelect` with the Choreo Labs component sheet. Breadcrumbs use a slash separator, 14px caption text and the sheet's link, hover and separator colours, for both `AppBreadcrumbs` and plain `Breadcrumbs`. Links without a `color` take the default text colour and turn orange on hover, links with a palette `color` use the brand colour, and the underline follows the `underline` prop, defaulting to `hover`. `PageTitle.Avatar` uses the light avatar style. `ComplexSelect` options, outside label and focus border match `Select`. `AppBreadcrumbs` now reads its default props from the theme, so a theme can set its separator.

- [#689](https://github.com/wso2/oxygen-ui/pull/689) [`2331bb7`](https://github.com/wso2/oxygen-ui/commit/2331bb7c822a82f9f3ca11cae61af60d1fa2d7aa) Thanks [@aruniw](https://github.com/aruniw)! - Match `ChoreoLabsTheme` button states to the Choreo Labs component sheet: default, hover, focus, active and disabled colours for contained, outlined and text buttons in light and dark mode, a 3px focus ring, a 2px lift on hover and a press scale on active (both off when reduced motion is preferred), full pill shapes at every size, and no elevation by default.

- [#686](https://github.com/wso2/oxygen-ui/pull/686) [`0715af2`](https://github.com/wso2/oxygen-ui/commit/0715af27bbecc019642ff574836e54453533bab8) Thanks [@aruniw](https://github.com/aruniw)! - Update the `ChoreoLabsTheme` text field focus style: a 1.5px text-colour border, with a Cobalt ring on fixed-label fields. Floating-label and native selects keep the Cobalt border. Add the `oxygen-textfield` skill, which the CLI already lists.

- Updated dependencies []:
  - @wso2/oxygen-ui-icons-react@0.23.0

## 0.22.0

### Minor Changes

- [#685](https://github.com/wso2/oxygen-ui/pull/685) [`e7d6fcb`](https://github.com/wso2/oxygen-ui/commit/e7d6fcb7b0141e875ef4ee6612b392c8a5cda5fd) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Let `AppSwitcher.Footer` sit below its divider without a heading, so the switcher can end with WSO2 Cloud links such as Cloud home and Settings. The footer no longer shows "Manage" unless a `label` is passed; it keeps "Manage" as its accessible name, which the new `aria-label` prop on `AppSwitcher.Footer` and `AppSwitcher.Section` can change.

### Patch Changes

- [#685](https://github.com/wso2/oxygen-ui/pull/685) [`e7d6fcb`](https://github.com/wso2/oxygen-ui/commit/e7d6fcb7b0141e875ef4ee6612b392c8a5cda5fd) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Update `ChoreoLabsTheme` buttons, fields, chips and avatars: dark blue secondary colour for outlined and filled buttons, a Burn `accent` colour, a `subtle` button variant with a Burn fill and white label, button heights of 32, 40 and 48px for small, medium and large, a 500 button font weight, 40 and 48px outlined fields with 14px text to line up with medium and large buttons, the light avatar style for the app shell user avatars, and a `tag` Chip variant.

- [#685](https://github.com/wso2/oxygen-ui/pull/685) [`e7d6fcb`](https://github.com/wso2/oxygen-ui/commit/e7d6fcb7b0141e875ef4ee6612b392c8a5cda5fd) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Make the filter buttons and the search field of the `LogViewer` toolbar 32px high, as the search field was written to be. `SearchBarBase` spread an `sx` array into numbered keys and dropped every style in it, so the field stayed at 40px; it now merges an array like any other `sx`.

- [#685](https://github.com/wso2/oxygen-ui/pull/685) [`e7d6fcb`](https://github.com/wso2/oxygen-ui/commit/e7d6fcb7b0141e875ef4ee6612b392c8a5cda5fd) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Animate the closing of a `LogViewer` entry the way its opening is animated. The details used to leave the page the moment an entry was closed, so they opened with a slide and closed with none.

- Updated dependencies []:
  - @wso2/oxygen-ui-icons-react@0.22.0

## 0.21.0

### Minor Changes

- [#679](https://github.com/wso2/oxygen-ui/pull/679) [`28e6115`](https://github.com/wso2/oxygen-ui/commit/28e6115cf353fef0a76f79635aff97b92b4f7dc7) Thanks [@ShalkiWenushika](https://github.com/ShalkiWenushika)! - Let a `TrialBadge` usage section nest a run of rows under a sub-heading, via a new
  `TrialBadgeUsageGroup` on `TrialBadgeUsageSection.groups`. A section can now hold loose
  `items`, groups, or both, so related rows ("Gateways") can be named without promoting them
  to a section of their own. A group with no `title` renders its rows plainly, which is how a
  plain row is placed below a titled group — a section's own `items` always render first.
  `TrialBadgeUsageSection.items` is now optional, and a section's total counts every row it
  draws, grouped and loose alike.

### Patch Changes

- [#676](https://github.com/wso2/oxygen-ui/pull/676) [`30f1448`](https://github.com/wso2/oxygen-ui/commit/30f1448f50514b2653c403c78a6832b5e69b6721) Thanks [@savindi7](https://github.com/savindi7)! - Apply the Choreo Labs colour guidelines to `ChoreoLabsTheme`: brand success, warning and error colours and alerts, a neutral navy info colour, Cobalt keyboard focus, Flare hover and Ember pressed states on primary buttons, a White header, sidebar and cards on the Paper content background with Fog hairlines in light mode, cool-grey secondary colours, and Deep Navy raised surfaces in dark mode.

- Updated dependencies []:
  - @wso2/oxygen-ui-icons-react@0.21.0

## 0.20.0

### Minor Changes

- [#672](https://github.com/wso2/oxygen-ui/pull/672) [`86bb2f6`](https://github.com/wso2/oxygen-ui/commit/86bb2f6e8bb92a2620b78972acf87c7e854c2782) Thanks [@savindi7](https://github.com/savindi7)! - Add `ChoreoLabsTheme`, a copy of `AcrylicOrangeTheme` with the Choreo Labs brand colours and the Sora typeface. The brand uses no gradients, so the page background, primary buttons and dark-mode surfaces are flat. Sora is bundled from `@fontsource-variable/sora` alongside Inter.

  Existing themes and the default theme are unchanged. To use the new theme, pass it to the provider: `<OxygenUIThemeProvider theme={ChoreoLabsTheme}>`.

- [#626](https://github.com/wso2/oxygen-ui/pull/626) [`fd6cf78`](https://github.com/wso2/oxygen-ui/commit/fd6cf786ce7841f9bd44da806bad9e7314511870) Thanks [@ajirthan](https://github.com/ajirthan)! - Add `ContextSwitcher` as ComplexSelect levels in an AppBreadcrumbs chain. With Back, earlier levels stay visible and Back is joined to the current level. A loading level keeps its label. AppBreadcrumbs accepts a field node per item and a custom separator.

- [#673](https://github.com/wso2/oxygen-ui/pull/673) [`cfa8a0c`](https://github.com/wso2/oxygen-ui/commit/cfa8a0c4ba5c711846fda3fcd37f4f26ee5de845) Thanks [@aruniw](https://github.com/aruniw)! - Add a `width` prop to `SearchBar`. `width="standard"` sizes search to 400px, shrinking in narrower containers, so list and grid page search is the same size across the product. `fullWidth` takes precedence when both are set.

### Patch Changes

- [#673](https://github.com/wso2/oxygen-ui/pull/673) [`cfa8a0c`](https://github.com/wso2/oxygen-ui/commit/cfa8a0c4ba5c711846fda3fcd37f4f26ee5de845) Thanks [@aruniw](https://github.com/aruniw)! - Update the AI guidance so the primary action, such as "Add user", goes in `PageTitle.Actions` at the top right of the page header, vertically centered with the title block (header and subheader), instead of in the table toolbar.

- Updated dependencies []:
  - @wso2/oxygen-ui-icons-react@0.20.0

## 0.19.0

### Minor Changes

- [#660](https://github.com/wso2/oxygen-ui/pull/660) [`030e131`](https://github.com/wso2/oxygen-ui/commit/030e131c2051cc8f15daf8945be6567db0bba009) Thanks [@savindi7](https://github.com/savindi7)! - Add `FullScreenWizard`, a full-screen layout for create and onboarding flows with a progress bar, a header with a close button, a scrolling content column with an actions footer, an optional live preview and an optional `modal` mode, plus a `useWizardSteps` hook for step state.

- [#658](https://github.com/wso2/oxygen-ui/pull/658) [`7b1b159`](https://github.com/wso2/oxygen-ui/commit/7b1b159a4acfe27041c619355b85ca7343fb5227) Thanks [@Kalika-Jay](https://github.com/Kalika-Jay)! - Add `LogViewer`, a compound component for time-ordered log entries shown as rows of columns under a heading row. Compose it from `LogViewer.Toolbar` (with `Search`, `TimeZone`, `Sort`, `Download`, `Refresh` and `Count` as children) and `LogViewer.Stream`. Columns can sort and filter from their heading, entries expand in place, older entries load on demand, and timestamps show in UTC or the reader's time zone. Filters (`select`, `timeRange`) are described with `filters` and reported through `onFilterChange`; the viewer never filters or sorts the data itself. Every part passes `className`, `sx`, `data-*` and other props to its element, and forwards its `ref` to it.

- [#664](https://github.com/wso2/oxygen-ui/pull/664) [`db8beb9`](https://github.com/wso2/oxygen-ui/commit/db8beb91b6178bcaca2702a0f2618a3d347dd0ec) Thanks [@Induwara04](https://github.com/Induwara04)! - Add `ListingCard`, a card for items in a listing, such as projects, with an icon badge, title, description and a relative last updated time (`updatedTime`, with an optional `updatedTooltip`). The whole card can be made clickable with `onClick` or `href`, an optional delete button (`onDelete` / `actions`) appears on hover, long text is truncated with a tooltip, and `selected` highlights the card.

- [#670](https://github.com/wso2/oxygen-ui/pull/670) [`228b814`](https://github.com/wso2/oxygen-ui/commit/228b814aa96ac26fc73240efba6949133a78ad8f) Thanks [@SandaminiM](https://github.com/SandaminiM)! - Add an optional `labelPlacement="top"` prop to `TextField`. Without it, `TextField` is MUI's TextField with its floating label, so existing fields are unchanged. `labelPlacement="top"` draws a static label above the field, colours it on focus, names select fields through it, and keeps an empty helper line on fields that set `error` so the form does not shift when an error appears. A new `optional` prop appends "(Optional)" to the label in either placement. `TextField` and `TextFieldProps` are now exported by Oxygen UI itself instead of being re-exported from MUI.

### Patch Changes

- Updated dependencies [[`db8beb9`](https://github.com/wso2/oxygen-ui/commit/db8beb91b6178bcaca2702a0f2618a3d347dd0ec), [`228b814`](https://github.com/wso2/oxygen-ui/commit/228b814aa96ac26fc73240efba6949133a78ad8f)]:
  - @wso2/oxygen-ui-icons-react@0.19.0

## 0.18.0

### Minor Changes

- [#632](https://github.com/wso2/oxygen-ui/pull/632) [`4e3991d`](https://github.com/wso2/oxygen-ui/commit/4e3991debde6015533455ae4c280df76910a4666) Thanks [@Induwara04](https://github.com/Induwara04)! - Add `TrialBadge`, a pill showing the days left in a free trial with a progress ring. It changes color as the trial runs out (`active`, `ending-soon`, `critical`, `expired`) and turns its second line into an "Upgrade now" link (`onUpgrade` / `upgradeHref`) in the last days and after expiry. Pass `usage` to show an optional hover panel with titled sections of resources (`count/limit`), progress bars colored by the share of the limit used, and an upgrade button.

- [#652](https://github.com/wso2/oxygen-ui/pull/652) [`116951a`](https://github.com/wso2/oxygen-ui/commit/116951aaef71e7a30ee0420588fbbff696215118) Thanks [@aruniw](https://github.com/aruniw)! - Update `WSO2Theme` to the new WSO2 brand color foundations: Orange 600 primary, Blue 800 secondary, neutral grey ramp, new error/warning/success colors, navy dark mode, and Aurora mesh backgrounds

### Patch Changes

- Updated dependencies [[`4e3991d`](https://github.com/wso2/oxygen-ui/commit/4e3991debde6015533455ae4c280df76910a4666)]:
  - @wso2/oxygen-ui-icons-react@0.18.0

## 0.17.0

### Minor Changes

- [#648](https://github.com/wso2/oxygen-ui/pull/648) [`e489fab`](https://github.com/wso2/oxygen-ui/commit/e489fab128f8e8e6e9d000d62bff3459b43f3b95) Thanks [@Kalika-Jay](https://github.com/Kalika-Jay)! - Add `TimeRangeFilter` for picking a time range: a button that opens a list of quick ranges and, beside it, the fields of a custom range (a date and a time for the start and for the end, read as UTC). The component holds the range as one value and reports it through `onChange`. A custom range is applied only when the end is after the start, and, with `maxRangeMs`, within that length.

- [#651](https://github.com/wso2/oxygen-ui/pull/651) [`e9b104c`](https://github.com/wso2/oxygen-ui/commit/e9b104c574b706b35ef5beb030823513df8b4c1d) Thanks [@Kalika-Jay](https://github.com/Kalika-Jay)! - Add `ListingTable.Filter`, the filter counterpart of `ListingTable.SortLabel`: a funnel button for a column heading that opens the column's choices as a menu, optionally with a search field. It appears when the heading is pointed at or focused and stays visible while a value is applied; `alwaysShowIcon` keeps it visible at all times. It passes `className`, `data-*` and other button props to the funnel button, and forwards its `ref` to it. It works with props (`value`, `onChange`) or, with a `field`, through the `filters` and `onFilterChange` of `ListingTable.Provider`. A column without it has no filter.

### Patch Changes

- [#656](https://github.com/wso2/oxygen-ui/pull/656) [`3b026ee`](https://github.com/wso2/oxygen-ui/commit/3b026eef6eeba3938d2e179497ec966096d3f1e5) Thanks [@aruniw](https://github.com/aruniw)! - Fix `Sidebar.Item` list markup: an expanded group's nested items are now rendered in an `<li>`, so the parent list contains only list items (axe `list` rule, WCAG 1.3.1).

  Add side panel navigation rules to the `oxygen-layout` AI skill: when to use section titles and collapsible groups, how collapsible groups behave, and pinning footer items in `Sidebar.Footer`. Fix the skill's nested sidebar example, which used `hasChildren` and `nested` props that `Sidebar.Item` does not have.

- Updated dependencies []:
  - @wso2/oxygen-ui-icons-react@0.17.0

## 0.16.0

### Minor Changes

- [#640](https://github.com/wso2/oxygen-ui/pull/640) [`f1bc7ad`](https://github.com/wso2/oxygen-ui/commit/f1bc7ade89e74a6771eb02db54ae05b3e9aa5267) Thanks [@aruniw](https://github.com/aruniw)! - Add `RelativeTime` component to display a clock icon with an optional action and a consumer-provided relative time (e.g. "Updated 3 weeks ago")

- [#645](https://github.com/wso2/oxygen-ui/pull/645) [`5210aaf`](https://github.com/wso2/oxygen-ui/commit/5210aafa15a1be873e46dc2322aaea2987037b43) Thanks [@SandaminiM](https://github.com/SandaminiM)! - Show a "No results found" message with an icon in `ListingTable.Body` when a search matches no rows. Customize it with the new `noSearchResultsText`, `noSearchResultsDescription`, `noSearchResultsIcon`, `emptyStateColSpan`, `searchValue` and `loading` props

### Patch Changes

- [#631](https://github.com/wso2/oxygen-ui/pull/631) [`e119dae`](https://github.com/wso2/oxygen-ui/commit/e119dae2096038cafff079b49f404c68f7267662) Thanks [@SandaminiM](https://github.com/SandaminiM)! - Use the `Menu` (hamburger) icon for `HeaderToggle` in both collapsed and expanded sidebar states

- Updated dependencies []:
  - @wso2/oxygen-ui-icons-react@0.16.0

## 0.15.0

### Minor Changes

- [#627](https://github.com/wso2/oxygen-ui/pull/627) [`dc04d64`](https://github.com/wso2/oxygen-ui/commit/dc04d64dd3679b2edbccc353297d51209c7fb634) Thanks [@aruniw](https://github.com/aruniw)! - Let product consoles drive `AppSwitcher` from shared data: `currentAppId` marks the app the user is in (same-tab navigation, `aria-current`, closes the popover), `AppSwitcher.Section` takes `apps` and both `Section` and `Footer` take `loading`, apps with no URL render disabled with a "Coming soon" tooltip (localisable via `unavailableLabel`), cards take `busy`, and only `http:`, `https:` and relative URLs are used as card links.

### Patch Changes

- Updated dependencies [[`dc04d64`](https://github.com/wso2/oxygen-ui/commit/dc04d64dd3679b2edbccc353297d51209c7fb634)]:
  - @wso2/oxygen-ui-icons-react@0.15.0

## 0.14.0

### Minor Changes

- [#623](https://github.com/wso2/oxygen-ui/pull/623) [`1350b42`](https://github.com/wso2/oxygen-ui/commit/1350b42eba709dfef73f93f4d3f0153bbafd31af) Thanks [@aruniw](https://github.com/aruniw)! - Add appswitcher component

- [#577](https://github.com/wso2/oxygen-ui/pull/577) [`744a211`](https://github.com/wso2/oxygen-ui/commit/744a2111c4877e197dbbebcc568545b4ff97f2e2) Thanks [@aruniw](https://github.com/aruniw)! - Add `AppSwitcher` component for navigating between WSO2 Cloud platforms

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
    destinations (organizations, users, billing); its cards take the neutral
    `manage` mark automatically, and it also accepts `links` as data
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

### Patch Changes

- Updated dependencies [[`1350b42`](https://github.com/wso2/oxygen-ui/commit/1350b42eba709dfef73f93f4d3f0153bbafd31af)]:
  - @wso2/oxygen-ui-icons-react@0.14.0

## 0.13.2

### Patch Changes

- [#594](https://github.com/wso2/oxygen-ui/pull/594) [`cb9d92e`](https://github.com/wso2/oxygen-ui/commit/cb9d92e5425d8785f2d45f85ec4fb7980a073145) Thanks [@ajirthan](https://github.com/ajirthan)! - Stop treating `UserMenu.Logout` as a destructive action — match `UserMenu.Item` colour and hover

- Updated dependencies []:
  - @wso2/oxygen-ui-icons-react@0.13.2

## 0.13.1

### Patch Changes

- [#570](https://github.com/wso2/oxygen-ui/pull/570) [`47e1c43`](https://github.com/wso2/oxygen-ui/commit/47e1c438ce4f7b1a81417d7f69eac7e7f147349f) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Improve AppBreadcrumbs and Header components

- Updated dependencies [[`47e1c43`](https://github.com/wso2/oxygen-ui/commit/47e1c438ce4f7b1a81417d7f69eac7e7f147349f)]:
  - @wso2/oxygen-ui-icons-react@0.13.1

## 0.13.0

### Minor Changes

- [#546](https://github.com/wso2/oxygen-ui/pull/546) [`96c344e`](https://github.com/wso2/oxygen-ui/commit/96c344ee75041c6d68331ec6554ae0d9970998f1) Thanks [@ajirthan](https://github.com/ajirthan)! - Add CSP (Content Security Policy) compatibility (#523)
  - `OxygenUIThemeProvider` now accepts a `nonce` prop that applies a CSP nonce to all style tags injected by the styling engine (Emotion), and an `emotionCache` prop as a full escape hatch for supplying a custom Emotion cache (cache key, insertion point, stylis plugins, containers, SSR caches).
  - Re-export `createEmotionCache` and the `EmotionCache` type from `@emotion/cache` so consumers can build custom caches without an extra dependency.
  - The bundled CSS injected at import time (Inter font styles and theme CSS) now resolves a nonce from the `__webpack_nonce__` global (webpack), a `<meta property="csp-nonce">` tag (Vite), or a `<meta name="csp-nonce" content="...">` tag (MUI/Next). The nonce source must be present before the app bundle executes. Since fonts are embedded as base64 data URIs, CSPs must also allow `font-src 'self' data:`.

### Patch Changes

- Updated dependencies []:
  - @wso2/oxygen-ui-icons-react@0.13.0

## 0.12.1

### Patch Changes

- [#543](https://github.com/wso2/oxygen-ui/pull/543) [`c003132`](https://github.com/wso2/oxygen-ui/commit/c003132ee07d498a2355eb8450ff142ec9cfb009) Thanks [@ajirthan](https://github.com/ajirthan)! - Use distinct default icons in `HeaderToggle` for sidebar expand/collapse (`Menu` when collapsed, `PanelLeftClose` when expanded)

- Updated dependencies []:
  - @wso2/oxygen-ui-icons-react@0.12.1

## 0.12.0

### Minor Changes

- [#532](https://github.com/wso2/oxygen-ui/pull/532) [`4f6b5c1`](https://github.com/wso2/oxygen-ui/commit/4f6b5c18c7c3e283b24d3bfba3a2e0c003c9e816) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Add AppBreadcrumbs component + Improve ColorSchemeSVG component

### Patch Changes

- [#538](https://github.com/wso2/oxygen-ui/pull/538) [`f519fbe`](https://github.com/wso2/oxygen-ui/commit/f519fbe431b65bb395c33d43113b41dbe6ee02fc) Thanks [@ajirthan](https://github.com/ajirthan)! - Fix `showName` prop leaking to the DOM in `UserMenu.Trigger` by filtering it with `shouldForwardProp`

- Updated dependencies [[`4f6b5c1`](https://github.com/wso2/oxygen-ui/commit/4f6b5c18c7c3e283b24d3bfba3a2e0c003c9e816)]:
  - @wso2/oxygen-ui-icons-react@0.12.0

## 0.11.0

### Minor Changes

- [#530](https://github.com/wso2/oxygen-ui/pull/530) [`8eca27e`](https://github.com/wso2/oxygen-ui/commit/8eca27e1a46518183ed1d5332f63ffa89d1954f8) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Add AppBreadcrumbs component + Improve ColorSchemeSVG component

### Patch Changes

- Updated dependencies [[`8eca27e`](https://github.com/wso2/oxygen-ui/commit/8eca27e1a46518183ed1d5332f63ffa89d1954f8)]:
  - @wso2/oxygen-ui-icons-react@0.11.0

## 0.10.1

### Patch Changes

- [#527](https://github.com/wso2/oxygen-ui/pull/527) [`c26bdd3`](https://github.com/wso2/oxygen-ui/commit/c26bdd3b9bd66599532bd34cdb91c64e7670b438) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Expose `useSidebar` hook

- Updated dependencies [[`c26bdd3`](https://github.com/wso2/oxygen-ui/commit/c26bdd3b9bd66599532bd34cdb91c64e7670b438)]:
  - @wso2/oxygen-ui-icons-react@0.10.1

## 0.10.0

### Minor Changes

- [#524](https://github.com/wso2/oxygen-ui/pull/524) [`9c3f869`](https://github.com/wso2/oxygen-ui/commit/9c3f869210781da6642635d6aa25b36bc2923d7a) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Add new ColorSchemeSVG component + Runtime Theme Support and Improve stability

### Patch Changes

- Updated dependencies [[`9c3f869`](https://github.com/wso2/oxygen-ui/commit/9c3f869210781da6642635d6aa25b36bc2923d7a)]:
  - @wso2/oxygen-ui-icons-react@0.10.0

## 0.9.1

### Patch Changes

- [#519](https://github.com/wso2/oxygen-ui/pull/519) [`c9657e6`](https://github.com/wso2/oxygen-ui/commit/c9657e644fb393780095d7faf658b8c1d213a4dc) Thanks [@sm1990](https://github.com/sm1990)! - Update GitLab, Bitbucket, and MCP icons, improve custom icon rendering, and update the Icons story showcase

- Updated dependencies [[`c9657e6`](https://github.com/wso2/oxygen-ui/commit/c9657e644fb393780095d7faf658b8c1d213a4dc)]:
  - @wso2/oxygen-ui-icons-react@0.9.1

## 0.9.0

### Minor Changes

- [#517](https://github.com/wso2/oxygen-ui/pull/517) [`bc942c3`](https://github.com/wso2/oxygen-ui/commit/bc942c316e3d64020a1cab47145ee410961b8367) Thanks [@sm1990](https://github.com/sm1990)! - Add GitLab, Bitbucket, MCP, and DevPortal icons and showcase them in the Icons story

### Patch Changes

- Updated dependencies [[`bc942c3`](https://github.com/wso2/oxygen-ui/commit/bc942c316e3d64020a1cab47145ee410961b8367)]:
  - @wso2/oxygen-ui-icons-react@0.9.0

## 0.8.3

### Patch Changes

- [#508](https://github.com/wso2/oxygen-ui/pull/508) [`3e66854`](https://github.com/wso2/oxygen-ui/commit/3e668545e59f693b4d9309f47981c4d6ba2741fc) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Fix dropdown menu background issue and WSO2 logo icon

- [#511](https://github.com/wso2/oxygen-ui/pull/511) [`b5dde05`](https://github.com/wso2/oxygen-ui/commit/b5dde05753e24416224ba552bd1b4b7ea2243dd6) Thanks [@brionmario](https://github.com/brionmario)! - Allow `ReactNode` in `ListingTableCellIcon` + Add `Lambda` Icon

- Updated dependencies [[`3e66854`](https://github.com/wso2/oxygen-ui/commit/3e668545e59f693b4d9309f47981c4d6ba2741fc), [`b5dde05`](https://github.com/wso2/oxygen-ui/commit/b5dde05753e24416224ba552bd1b4b7ea2243dd6)]:
  - @wso2/oxygen-ui-icons-react@0.8.3

## 0.8.2

### Patch Changes

- [#505](https://github.com/wso2/oxygen-ui/pull/505) [`fe53cc2`](https://github.com/wso2/oxygen-ui/commit/fe53cc27dbef8229d50cc13a4c0a1b72bd4a4260) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Fix some issue in ListingTable and AppShell sidebar

- Updated dependencies [[`fe53cc2`](https://github.com/wso2/oxygen-ui/commit/fe53cc27dbef8229d50cc13a4c0a1b72bd4a4260)]:
  - @wso2/oxygen-ui-icons-react@0.8.2

## 0.8.1

### Patch Changes

- [#503](https://github.com/wso2/oxygen-ui/pull/503) [`bf30d76`](https://github.com/wso2/oxygen-ui/commit/bf30d76c71c3863fd639564f3cdfde3bcda4e3ec) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Fix content area not scrollable in AppShell + Update new logo

- Updated dependencies [[`bf30d76`](https://github.com/wso2/oxygen-ui/commit/bf30d76c71c3863fd639564f3cdfde3bcda4e3ec)]:
  - @wso2/oxygen-ui-icons-react@0.8.1

## 0.8.0

### Minor Changes

- [#498](https://github.com/wso2/oxygen-ui/pull/498) [`ec00d58`](https://github.com/wso2/oxygen-ui/commit/ec00d585b6bf25a647c9132fc70585ef510b4779) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Add DataGrid support to the ListingTable composite component

### Patch Changes

- Updated dependencies [[`ec00d58`](https://github.com/wso2/oxygen-ui/commit/ec00d585b6bf25a647c9132fc70585ef510b4779)]:
  - @wso2/oxygen-ui-icons-react@0.8.0

## 0.7.0

### Minor Changes

- [#496](https://github.com/wso2/oxygen-ui/pull/496) [`cc45d6f`](https://github.com/wso2/oxygen-ui/commit/cc45d6fb0231e36d22a5323b7c7602534995df92) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Improve AppShell along with some stability fixes

### Patch Changes

- Updated dependencies [[`cc45d6f`](https://github.com/wso2/oxygen-ui/commit/cc45d6fb0231e36d22a5323b7c7602534995df92)]:
  - @wso2/oxygen-ui-icons-react@0.7.0

## 0.6.0

### Minor Changes

- [#493](https://github.com/wso2/oxygen-ui/pull/493) [`6f64455`](https://github.com/wso2/oxygen-ui/commit/6f64455e66a6d20dd0b1251eb3c853703ef292c2) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Changed default header font sizes

### Patch Changes

- Updated dependencies [[`6f64455`](https://github.com/wso2/oxygen-ui/commit/6f64455e66a6d20dd0b1251eb3c853703ef292c2)]:
  - @wso2/oxygen-ui-icons-react@0.6.0

## 0.5.0

### Minor Changes

- [#488](https://github.com/wso2/oxygen-ui/pull/488) [`3de0d68`](https://github.com/wso2/oxygen-ui/commit/3de0d68dfec0966ead144e340ca1d8750929eb52) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Update Footer and UserMenu components to be composable

### Patch Changes

- Updated dependencies [[`3de0d68`](https://github.com/wso2/oxygen-ui/commit/3de0d68dfec0966ead144e340ca1d8750929eb52)]:
  - @wso2/oxygen-ui-icons-react@0.5.0

## 0.4.0

### Minor Changes

- [#480](https://github.com/wso2/oxygen-ui/pull/480) [`aa1f153`](https://github.com/wso2/oxygen-ui/commit/aa1f153969def9330967ba0822f829c11dd45baa) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Bump package versioning

### Patch Changes

- Updated dependencies [[`aa1f153`](https://github.com/wso2/oxygen-ui/commit/aa1f153969def9330967ba0822f829c11dd45baa)]:
  - @wso2/oxygen-ui-icons-react@0.4.0

## 0.3.0

### Minor Changes

- [#465](https://github.com/wso2/oxygen-ui/pull/465) [`56a3aaa`](https://github.com/wso2/oxygen-ui/commit/56a3aaa7f41c70bffa35a75a6c8a505bf169a298) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Stabilization fixes along with updates to sample app

### Patch Changes

- Updated dependencies [[`56a3aaa`](https://github.com/wso2/oxygen-ui/commit/56a3aaa7f41c70bffa35a75a6c8a505bf169a298)]:
  - @wso2/oxygen-ui-icons-react@0.3.0

## 0.2.1

### Patch Changes

- [#463](https://github.com/wso2/oxygen-ui/pull/463) [`9d7537e`](https://github.com/wso2/oxygen-ui/commit/9d7537eb7c1813646cc9c4f95aeda0c538ec9b6c) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Made some fixes to charting package and bundle direct dependency packages

- Updated dependencies [[`9d7537e`](https://github.com/wso2/oxygen-ui/commit/9d7537eb7c1813646cc9c4f95aeda0c538ec9b6c)]:
  - @wso2/oxygen-ui-icons-react@0.2.1

## 0.2.0

### Minor Changes

- [#438](https://github.com/wso2/oxygen-ui/pull/438) [`1a35f32`](https://github.com/wso2/oxygen-ui/commit/1a35f32d52092a7e230ed101b592dc2931be6076) Thanks [@dileepapeiris](https://github.com/dileepapeiris)! - Add initial release of oxygen-ui-charts-react, a reusable chart library built on top of Recharts.

### Patch Changes

- Updated dependencies [[`1a35f32`](https://github.com/wso2/oxygen-ui/commit/1a35f32d52092a7e230ed101b592dc2931be6076)]:
  - @wso2/oxygen-ui-icons-react@0.2.0

## 0.1.0

### Minor Changes

- [#447](https://github.com/wso2/oxygen-ui/pull/447) [`9d18257`](https://github.com/wso2/oxygen-ui/commit/9d1825741bc2e733181d45b1ecd7a87f3d4d3138) Thanks [@brionmario](https://github.com/brionmario)! - 🎉 Initial stable release v0.1.0

### Patch Changes

- Updated dependencies [[`9d18257`](https://github.com/wso2/oxygen-ui/commit/9d1825741bc2e733181d45b1ecd7a87f3d4d3138)]:
  - @wso2/oxygen-ui-icons-react@0.1.0

## 0.0.1-alpha.12

### Patch Changes

- [#410](https://github.com/wso2/oxygen-ui/pull/410) [`466468a`](https://github.com/wso2/oxygen-ui/commit/466468ab3149602355faaffb85a519e79a388b08) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Add new components/themes/animations and stories along with some refactoring and improvements + fixes

- Updated dependencies [[`466468a`](https://github.com/wso2/oxygen-ui/commit/466468ab3149602355faaffb85a519e79a388b08)]:
  - @wso2/oxygen-ui-icons-react@0.0.1-alpha.12

## 0.0.1-alpha.11

### Patch Changes

- [#408](https://github.com/wso2/oxygen-ui/pull/408) [`e9700be`](https://github.com/wso2/oxygen-ui/commit/e9700bef06e7aef36094034f8a723fae9eb9a882) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Add ThemeSwitcher and ComplexSelect components

## 0.0.1-alpha.10

### Patch Changes

- [#406](https://github.com/wso2/oxygen-ui/pull/406) [`bfdfe7b`](https://github.com/wso2/oxygen-ui/commit/bfdfe7b7f4cae00730ac2b0308d492f8e5db67ea) Thanks [@DonOmalVindula](https://github.com/DonOmalVindula)! - Bump react versions

- Updated dependencies [[`bfdfe7b`](https://github.com/wso2/oxygen-ui/commit/bfdfe7b7f4cae00730ac2b0308d492f8e5db67ea)]:
  - @wso2/oxygen-ui-icons-react@0.0.1-alpha.10

## 0.0.1-alpha.9

### Patch Changes

- Updated dependencies [[`5410eb5`](https://github.com/wso2/oxygen-ui/commit/5410eb57b84c4d38985e2e641dbfa6b3d4d5d0a2)]:
  - @wso2/oxygen-ui-icons-react@0.0.1-alpha.9

## 0.0.1-alpha.8

### Patch Changes

- Updated dependencies [[`ccc48f9`](https://github.com/wso2/oxygen-ui/commit/ccc48f9dedd3661e5fe559d0359258c33e971a55)]:
  - @wso2/oxygen-ui-icons-react@0.0.1-alpha.8

## 0.0.1-alpha.7

### Patch Changes

- Updated dependencies [[`88627d6`](https://github.com/wso2/oxygen-ui/commit/88627d6d3c4525562ae2f57509b22fe2ba8e13d7)]:
  - @wso2/oxygen-ui-icons-react@0.0.1-alpha.7

## 0.0.1-alpha.6

### Patch Changes

- [#398](https://github.com/wso2/oxygen-ui/pull/398) [`2f62ef3`](https://github.com/wso2/oxygen-ui/commit/2f62ef3a5cf13916f85a3173c4dc5a5f1ddb426e) Thanks [@brionmario](https://github.com/brionmario)! - Bump versions

## 0.0.1-alpha.5

### Patch Changes

- [#396](https://github.com/wso2/oxygen-ui/pull/396) [`48e28c0`](https://github.com/wso2/oxygen-ui/commit/48e28c0f1909941e61671337816081826c934d15) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Change all the dependencies to october releases

- Updated dependencies [[`48e28c0`](https://github.com/wso2/oxygen-ui/commit/48e28c0f1909941e61671337816081826c934d15)]:
  - @wso2/oxygen-ui-icons-react@0.0.1-alpha.5

## 0.0.1-alpha.4

### Patch Changes

- [#394](https://github.com/wso2/oxygen-ui/pull/394) [`1b3b937`](https://github.com/wso2/oxygen-ui/commit/1b3b937f49295d33e4a6c6bc50113ccda9cd53ee) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Fix some default theme styling issues

- Updated dependencies [[`1b3b937`](https://github.com/wso2/oxygen-ui/commit/1b3b937f49295d33e4a6c6bc50113ccda9cd53ee)]:
  - @wso2/oxygen-ui-icons-react@0.0.1-alpha.4

## 0.0.1-alpha.3

### Patch Changes

- [#392](https://github.com/wso2/oxygen-ui/pull/392) [`a9de0c2`](https://github.com/wso2/oxygen-ui/commit/a9de0c25dd49be86b78cce7253f16fb556e49a60) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Add gradient backgound style

## 0.0.1-alpha.2

### Patch Changes

- [#389](https://github.com/wso2/oxygen-ui/pull/389) [`9d7ec7c`](https://github.com/wso2/oxygen-ui/commit/9d7ec7c291b9b01ace9c25434f95f07c733c79bc) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Add some fixes to support mui date component

## 0.0.1-alpha.1

### Patch Changes

- [#387](https://github.com/wso2/oxygen-ui/pull/387) [`e4653fc`](https://github.com/wso2/oxygen-ui/commit/e4653fc16654724aa2f053ad823a6500e8d04d9c) Thanks [@jeradrutnam](https://github.com/jeradrutnam)! - Fix broken library due to font load issue

- Updated dependencies [[`e4653fc`](https://github.com/wso2/oxygen-ui/commit/e4653fc16654724aa2f053ad823a6500e8d04d9c)]:
  - @wso2/oxygen-ui-icons-react@0.0.1-alpha.1

## 0.0.1-alpha.0

### Patch Changes

- [#369](https://github.com/wso2/oxygen-ui/pull/369) [`58ac42d`](https://github.com/wso2/oxygen-ui/commit/58ac42d87f35f9cc7b6b8638c0a38a4b4a60f2ff) Thanks [@brionmario](https://github.com/brionmario)! - 🎉 Initial pre-release

- Updated dependencies [[`58ac42d`](https://github.com/wso2/oxygen-ui/commit/58ac42d87f35f9cc7b6b8638c0a38a4b4a60f2ff)]:
  - @wso2/oxygen-ui-icons-react@0.0.1-alpha.0
