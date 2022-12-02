const path = require('path');

module.exports = {
  extends: ['@wso2/eslint-config/recommended'],
  parserOptions: {
    project: [path.resolve(__dirname, 'tsconfig.json')],
  },
};
