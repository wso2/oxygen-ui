---
'@wso2/oxygen-ui': minor
---

Add CSP (Content Security Policy) compatibility (#523)

- `OxygenUIThemeProvider` now accepts a `nonce` prop that applies a CSP nonce to all style tags injected by the styling engine (Emotion), and an `emotionCache` prop as a full escape hatch for supplying a custom Emotion cache (cache key, insertion point, stylis plugins, containers, SSR caches).
- Re-export `createEmotionCache` and the `EmotionCache` type from `@emotion/cache` so consumers can build custom caches without an extra dependency.
- The bundled Inter font styles (injected at import time) now resolve a nonce from the `__webpack_nonce__` global (webpack convention) or a `<meta property="csp-nonce" nonce="...">` tag (Vite convention).
