---
'@wso2/oxygen-ui': minor
---

Add `TimeRangeFilter` for picking a time range: a button that opens a list of quick ranges and, beside it, the fields of a custom range (a date and a time for the start and for the end, read as UTC). The component holds the range as one value and reports it through `onChange`. A custom range is applied only when the end is after the start, and, with `maxRangeMs`, within that length
