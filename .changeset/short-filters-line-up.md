---
'@wso2/oxygen-ui': patch
---

Make the filter buttons and the search field of the `LogViewer` toolbar 32px high, as the search field was written to be. `SearchBarBase` spread an `sx` array into numbered keys and dropped every style in it, so the field stayed at 40px; it now merges an array like any other `sx`.
