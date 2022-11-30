#!/usr/bin/env node

const StyleDictionary = require('style-dictionary');
const babelParser = require('@babel/parser');
const Config = require('../sd.config');

StyleDictionary.registerParser({
  parse: ({ contents, filePath }) => {
    const js = babelParser.parse(contents, {
      // parse in strict mode and allow module declarations
      plugins: [
        // enable jsx and flow syntax
        'jsx',
        'flow',
      ],
      sourceType: 'module',
    });

    return js;
  },
  pattern: /.ts$/,
});

const capitalize = (string) => string[0].toUpperCase() + string.slice(1);
const pathToPascalCase = (token) => token.path.map((tokenPathItems) => capitalize(tokenPathItems)).join('');

StyleDictionary.registerTransform({
  name: 'name/js/es6',
  type: 'name',
  transformer: pathToPascalCase,
});

const styleDictionary = StyleDictionary.extend(Config);
styleDictionary.buildAllPlatforms();
