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

const { transform } = require('@divriots/style-dictionary-to-figma');
const StyleDictionary = require('style-dictionary');
const babelParser = require('@babel/parser');
const Config = require('../sd.config.cjs');

StyleDictionary.registerParser({
  parse: ({ contents }) => {
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
  transformer: pathToPascalCase,
  type: 'name',
});

StyleDictionary.registerFormat({
  formatter: ({ dictionary }) => {
    const transformedTokens = transform(dictionary.tokens);
    return JSON.stringify(transformedTokens, null, 2);
  },
  name: 'figmaTokensPlugin',
});

const styleDictionary = StyleDictionary.extend(Config);
styleDictionary.buildAllPlatforms();
