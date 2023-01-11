#!/usr/bin/env node
/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const fs = require('fs');
const path = require('path');
const StyleDictionary = require('style-dictionary');

const PATHS = {
  source: {
    tokens: path.resolve(path.join(__dirname, '..', 'src', 'tokens')),
  },
};

StyleDictionary.registerTransformGroup({
  name: 'tokens-es',
  transforms: ['name/cti/pascal', 'size/px', 'color/hex'],
});

StyleDictionary.registerTransformGroup({
  name: 'tokens-scss',
  // to see the pre-defined "scss" transformation use: console.log(StyleDictionary.transformGroup['scss']);
  transforms: ['name/cti/kebab', 'time/seconds', 'size/px', 'color/css'],
});

StyleDictionary.registerTransformGroup({
  name: 'tokens-css',
  // to see the pre-defined "scss" transformation use: console.log(StyleDictionary.transformGroup['scss']);
  transforms: ['name/cti/kebab', 'time/seconds', 'size/px', 'color/css'],
});

console.log('Build started...');

const getStyleDictionaryConfig = (brand, source) => ({
  platforms: {
    'web/css': {
      buildPath: `dist/design-tokens/web/${brand}/css/`,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
      prefix: brand,
      transformGroup: 'tokens-css',
    },
    'web/es': {
      buildPath: `dist/design-tokens/web/${brand}/es/`,
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
        {
          destination: 'tokens.js',
          format: 'javascript/module-flat',
        },
        {
          destination: 'tokens.es6.js',
          format: 'javascript/es6',
        },
      ],
      prefix: brand,
      transformGroup: 'tokens-es',
    },
    'web/scss': {
      buildPath: `dist/design-tokens/web/${brand}/scss/`,
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/variables',
        },
      ],
      prefix: brand,
      transformGroup: 'tokens-scss',
    },
  },
  source: [source],
});

fs.readdirSync(PATHS.source.tokens)
  .forEach((file) => {
    const brand = file.split('.')[0];
    const filePath = path.join(PATHS.source.tokens, file);

    console.log('\n==============================================');
    console.log(`\nProcessing: [${brand}]`);

    const StyleDictionaryExtended = StyleDictionary.extend(getStyleDictionaryConfig(brand, filePath));

    StyleDictionaryExtended.buildPlatform('web/es');
    StyleDictionaryExtended.buildPlatform('web/css');
    StyleDictionaryExtended.buildPlatform('web/scss');

    console.log('\nEnd processing');
  });

console.log('\n==============================================');
console.log('\nBuild completed!');
