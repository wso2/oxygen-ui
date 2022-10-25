module.exports = {
  "extends": ["@oxygen/eslint-config"],
  "ignorePatterns": ["!**/*"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "parserOptions": {
        "project": ["packages/oxygen-primitives/tsconfig.*?.json"]
      },
      "rules": {}
    },
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "rules": {}
    }
  ]
}
