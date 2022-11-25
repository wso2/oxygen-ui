module.exports = {
  extends: [
    '@wso2/eslint-config/recommended',
    "plugin:mdx/recommended"
  ],
  parserOptions: {
    project: './tsconfig.lib.json'
  }
}
