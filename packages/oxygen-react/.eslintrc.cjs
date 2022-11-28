const path = require('path');

module.exports = {
  extends: ['@wso2/eslint-config/recommended', '@wso2/eslint-config/strict', 'plugin:mdx/recommended'],
  parserOptions: {
    project: [
      path.resolve(__dirname, 'tsconfig.lib.json'),
      path.resolve(__dirname, 'tsconfig.spec.json'),
      path.resolve(__dirname, 'tsconfig.eslint.json'),
    ],
  },
  overrides: [
    {
      files: '*.mdx',
      parser: 'eslint-mdx',
    },
  ],
};
