---
'@wso2/oxygen-ui': minor
---

Add `LogViewer`, a compound component for time-ordered log entries shown as rows of columns under a heading row. Compose it from `LogViewer.Toolbar` (with `Search`, `TimeZone`, `Sort`, `Download`, `Refresh` and `Count` as children) and `LogViewer.Stream`. Columns can sort and filter from their heading, entries expand in place, older entries load on demand, and timestamps show in UTC or the reader's time zone. Filters (`select`, `timeRange`) are described with `filters` and reported through `onFilterChange`; the viewer never filters or sorts the data itself. Every part passes `className`, `sx`, `data-*` and other props to its element, and forwards its `ref` to it.
