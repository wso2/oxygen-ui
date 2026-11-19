# @wso2/oxygen-ui-codemod

Codemods for apps that use `@wso2/oxygen-ui`. Nothing to install: run it with `npx`.

## `path-imports`

Rewrites barrel imports of `@wso2/oxygen-ui` into path imports.

```sh
npx @wso2/oxygen-ui-codemod path-imports [paths...]
```

```diff
-import { TextField, textFieldClasses, Button } from '@wso2/oxygen-ui';
+import TextField, { textFieldClasses } from '@wso2/oxygen-ui/TextField';
+import Button from '@wso2/oxygen-ui/Button';
```

The command reads the name-to-path map from the `@wso2/oxygen-ui` installed in your app, so it never writes a path your version does not have. Run it from your app's folder. It prints how many files it changed and every barrel import it left alone, with its file and line.

A file is left untouched when it imports a name the map does not have. Imports that are already path imports, and everything else in a file, are left alone.

### Check mode

```sh
npx @wso2/oxygen-ui-codemod path-imports --check
```

Writes nothing, lists each remaining barrel import with its file and line, and exits non-zero if there is any. Use it in CI to stop new barrel imports.
