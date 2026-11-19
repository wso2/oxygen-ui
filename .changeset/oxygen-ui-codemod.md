---
'@wso2/oxygen-ui-codemod': minor
---

First release. `npx @wso2/oxygen-ui-codemod path-imports` rewrites barrel imports of `@wso2/oxygen-ui` into path imports, using the name-to-path map of the Oxygen package installed in the app, and `--check` lists the barrel imports that remain and exits non-zero without writing any file. The README and the AI docs of `@wso2/oxygen-ui` describe it.
