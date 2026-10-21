---
'@wso2/oxygen-ui': minor
---

Add `ListingTable.Filter`, the filter counterpart of `ListingTable.SortLabel`: a funnel button for a column heading that opens the column's choices as a menu, optionally with a search field. It appears when the heading is pointed at or focused and stays visible while a value is applied; `alwaysShowIcon` keeps it visible at all times. It passes `className`, `data-*` and other button props to the funnel button, and forwards its `ref` to it. It works with props (`value`, `onChange`) or, with a `field`, through the `filters` and `onFilterChange` of `ListingTable.Provider`. A column without it has no filter.
