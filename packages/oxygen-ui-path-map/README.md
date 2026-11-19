# @wso2/oxygen-ui-path-map

Reads the path map that `@wso2/oxygen-ui` publishes as `@wso2/oxygen-ui/path-map.json`. The map records, for each exported name, the path import it lives on, whether it is that path's default or a named export, and whether it is type-only.

The `@wso2/oxygen-ui` build uses it to check the map it writes, and `@wso2/eslint-plugin-oxygen-ui` uses it to read the map installed in a project.

```ts
import { readInstalledPathMap } from '@wso2/oxygen-ui-path-map';

const reading = readInstalledPathMap(process.cwd());
// { status: 'found', map, version } | { status: 'not-installed' } | { status: 'unusable', reason }
```
