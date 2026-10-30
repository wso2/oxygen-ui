---
'@wso2/oxygen-ui': minor
'@wso2/oxygen-ui-charts-react': minor
'@wso2/oxygen-ui-icons-react': minor
---

Add an optional `labelPlacement="top"` prop to `TextField`. Without it, `TextField` is MUI's TextField with its floating label, so existing fields are unchanged. `labelPlacement="top"` draws a static label above the field, colours it on focus, names select fields through it, and keeps an empty helper line on fields that set `error` so the form does not shift when an error appears. `TextField` and `TextFieldProps` are now exported by Oxygen UI itself instead of being re-exported from MUI.
