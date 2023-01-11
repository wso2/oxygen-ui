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

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const tokens = require('../figma/tokens.json');

const GLOBAL_TOKEN_SET_MATCHERS = ['global'];
const INPUT = path.join(__dirname, '..', 'figma', 'tokens.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'tokens');

const transformTokensToStyleDictionary = () => {
  const tokenSets = tokens.$metadata.tokenSetOrder;
  const getGlobalTokenSets = () => tokenSets
    .filter((tokenSet) => GLOBAL_TOKEN_SET_MATCHERS
      .some((matcher) => tokenSet.startsWith(matcher)));

  tokenSets.forEach((key) => {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    const outputPath = `${path.join(OUTPUT_DIR, key.replace('-', '.'))}.tokens.json`;
    let exclude = getGlobalTokenSets().filter((set) => set !== key);

    // If the current token set is one of the global token sets,
    // the `token-transformer` should be like below.
    //   -> pnpm token-transformer input.json output.json global --flags
    if (GLOBAL_TOKEN_SET_MATCHERS.includes(key)) {
      exclude = [];
    }

    const getTokenSetsToInclude = () => [key, ...getGlobalTokenSets()];

    execSync(
      `pnpm token-transformer ${INPUT} ${outputPath} ${getTokenSetsToInclude()} ${exclude} --resolveReferences false`,
    );

    const transformerRawOutput = fs.readJsonSync(outputPath);

    fs.writeFileSync(outputPath, JSON.stringify(transformerRawOutput, null, 2));
  });
};

transformTokensToStyleDictionary();
