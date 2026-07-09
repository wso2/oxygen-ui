---
'@wso2/oxygen-ui': minor
---

Add CSP (Content Security Policy) compatibility (#523)

- `OxygenUIThemeProvider` now accepts a `nonce` prop that applies a CSP nonce to all style tags injected by the styling engine (Emotion), and an `emotionCache` prop as a full escape hatch for supplying a custom Emotion cache (cache key, insertion point, stylis plugins, containers, SSR caches).
- Re-export `createEmotionCache` and the `EmotionCache` type from `@emotion/cache` so consumers can build custom caches without an extra dependency.
- The bundled CSS injected at import time (Inter font styles and theme CSS) now resolves a nonce from the `__webpack_nonce__` global (webpack), a `<meta property="csp-nonce">` tag (Vite), or a `<meta name="csp-nonce" content="...">` tag (MUI/Next). The nonce source must be present before the app bundle executes. Since fonts are embedded as base64 data URIs, CSPs must also allow `font-src 'self' data:`.
