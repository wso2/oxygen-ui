/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require("@rushstack/eslint-patch/modern-module-resolution");

const config = {
  "root": true,
  "ignorePatterns": ["**/*"],
  "plugins": [
    "@nrwl/nx",
    "plugin:@nrwl/nx/react"
  ],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "@nrwl/nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "*",
                "onlyDependOnLibsWithTags": ["*"]
              }
            ]
          }
        ]
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "extends": ["plugin:@nrwl/nx/typescript"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "extends": ["plugin:@nrwl/nx/javascript"],
      "rules": {}
    },
    {
      "files": ["*.spec.ts", "*.spec.tsx", "*.spec.js", "*.spec.jsx"],
      "env": {
        "jest": true
      },
      "rules": {}
    }
  ]
}

module.exports = config;
