---
'@wso2/oxygen-ui': minor
---

Let a `TrialBadge` usage section nest a run of rows under a sub-heading, via a new
`TrialBadgeUsageGroup` on `TrialBadgeUsageSection.groups`. A section can now hold loose
`items`, groups, or both, so related rows ("Gateways") can be named without promoting them
to a section of their own. A group with no `title` renders its rows plainly, which is how a
plain row is placed below a titled group — a section's own `items` always render first.
`TrialBadgeUsageSection.items` is now optional, and a section's total counts every row it
draws, grouped and loose alike.
