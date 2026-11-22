# Status illustrations, orbit style

Source SVGs for `StatusIllustration`: 23 illustrations, 400 x 300.

- HTTP: 200, 201, 204, 301, 302, 304, 400, 401, 403, 404, 405, 408, 409, 422, 429, 500, 502, 503, 504.
- States: state-no-records, state-failed, state-unsuccessful, state-mail-sent.

These files are not bundled. The React components in `../illustrations` are generated from them:

```sh
node scripts/generate-status-illustrations.mjs
```

Run it from the repository root after adding or changing an SVG here. A new file needs to follow the
same conventions (`http-<code>.svg` or `state-<name>.svg`, `ho-` class names, the `--illustration-*`
CSS variables) to be picked up.

## Colours

Every colour is a CSS variable with the light-mode value as its fallback, so each file also works on
its own. In the component, `StatusIllustration` sets the variables from the theme palette, so there are
no separate dark-mode files: the theme supplies the dark-mode colours.

Design defaults: `--illustration-primary: #2450F0; --illustration-accent: #F4511E;
--illustration-surface: #FFFFFF; --illustration-ink: #33415C; --illustration-success: #1FA85B;
--illustration-neutral: #6B768E; --illustration-warning: #F5B400; --illustration-on-primary: #FFFFFF;
--illustration-glow: .14;`

Status colour of the centre circle: 200 green (success), 201, 204 and 3xx blue (primary), 4xx grey
(neutral), 5xx and failure red-orange (danger, falling back to accent).
