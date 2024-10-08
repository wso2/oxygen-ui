# <img src="https://cdn.worldvectorlogo.com/logos/figma-5.svg" alt="Figma" height="80">

## Generating the icons manifest

To generate the icons manifest, run the following command:

```bash
cd packages/primitives
node scripts/export-icons-for-figma.mjs
```

This will generate a `.export` with the following structure:

```tree
.export
├── icons
│   ├── manifest
│   │   ├── icon-manifest.txt
│   ├── AppIcon.svg
│   ├── ...
```

These icons can exported to the `Assets` board in the [Asgardeo Design Library](https://www.figma.com/design/9QxyluUvzXAMbTdixve9Dh/Assets?node-id=1703-702&node-type=canvas&t=ygvfoKX6u2tQxgXY-0) in Figma.

The `icon-manifest.txt` file contains the list of icons that were exported and this list can be used to update the Figma board's icon manifest.

## `tokens.json`

> [!NOTE]
> AUTO GENERATED FILE. DO NOT MODIFY MANUALLY.

Please do not modify the `tokens.json` manually since it'll be auto generated to be used in figma.
