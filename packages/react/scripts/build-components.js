/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

const path = require('path');
const fs = require('fs-extra');
const {execSync} = require('child_process');
const packageJson = require('../package.json');
const fixFiles = require('./fix-files');
const {logger} = require('@oxygen-ui/logger');

const outputDir = path.resolve(__dirname, '..', 'dist', 'transpiled');

logger.log('💅 Transpiling components...');
execSync(
  `npx tsc --project ${path.resolve(path.join(__dirname, '..', 'tsconfig.lib.json'))} --declarationDir ${outputDir} --emitDeclarationOnly false --outDir ${outputDir}`,
);
logger.log('💅 Components transpiled! 🎉🎉🎉');

logger.log('💅 Copying components...');
fs.rmSync(path.resolve(__dirname, '..', 'dist','transpiled','src','components','index.js'));
fs.rmSync(path.resolve(__dirname, '..', 'dist', 'transpiled', 'src', 'components', 'index.d.ts'));
fs.copySync(path.resolve(__dirname, '..', 'dist', 'transpiled', 'src', 'components', ''), path.resolve(__dirname, '..', 'dist'));
fs.rmdirSync(path.resolve(__dirname, '..', 'dist', 'transpiled', 'src', 'components'), {recursive: true});
fs.rmSync(path.resolve(__dirname, '..', 'dist', 'transpiled', 'src', 'index.js'));
fs.rmSync(path.resolve(__dirname, '..', 'dist', 'transpiled', 'src', 'index.d.ts'));
fs.copySync(path.resolve(__dirname, '..', 'dist', 'transpiled', 'src'), path.resolve(__dirname, '..', 'dist', ''));
fs.rmdirSync(path.resolve(__dirname, '..', 'dist', 'transpiled'), {recursive: true});
logger.log('💅 Components copied! 🎉🎉🎉');

const packageJsonContent = {
  exports: './index.js',
  types: './index.d.ts',
};

const componentsDir = path.resolve(__dirname, '..', 'src', 'components');
const componentFiles = fs.readdirSync(componentsDir);
const srcDir = path.resolve(__dirname, '..', 'src');
const srcFiles = fs.readdirSync(srcDir);

logger.log('💅 Creating package.json files...');
componentFiles.forEach(file => {
  const componentDir = path.resolve(componentsDir, file);
  if (fs.lstatSync(componentDir).isDirectory()) {
    fs.writeFileSync(path.resolve(__dirname, '..', 'dist', file, 'package.json'), JSON.stringify(packageJsonContent));
  }
});

srcFiles.forEach(file => {
  const dir = path.resolve(srcDir, file);
  if (fs.lstatSync(dir).isDirectory() && file !== 'components') {
    fs.writeFileSync(path.resolve(__dirname, '..', 'dist', file, 'package.json'), JSON.stringify(packageJsonContent));
  }
});
logger.log('💅 package.json files created! 🎉🎉🎉');

logger.log('💅 Creating root package.json file...');
packageJson.main = './cjs/index.js';
packageJson.module = './esm/index.js';
packageJson.types = './index.d.ts';
fs.writeFileSync(path.resolve(__dirname, '..', 'dist', 'package.json'), JSON.stringify(packageJson));
logger.log('💅 Root package.json file created! 🎉🎉🎉');

logger.log('💅 Fixing the imports in the components and injecting CSS...');
fixFiles();
logger.log('💅 Imports fixed and CSS injected into components! 🎉🎉🎉');
