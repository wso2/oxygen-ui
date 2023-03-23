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

const fs = require('fs');
const path = require('path');

module.exports = {
  git: {
    tagName: 'v${version}',
    commitMessage: 'release: cut the v${version} release [skip ci]',
    tagAnnotation: 'Release ${tagName}',
    requireCleanWorkingDir: false
  },
  github: {
    release: true,
    releaseName: 'Oxygen UI ${version}',
    releaseNotes(context) {
      // Remove the first, redundant line with version and date.
      return context.changelog.split('\n').slice(1).join('\n');
    }
  },
  hooks: {
    'after:bump': 'pnpm install --lockfile-only'
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      header: '# Changelog',
      infile: 'CHANGELOG.md',
      writerOpts: {
        headerPartial: fs.readFileSync(path.join(__dirname, 'release', 'templates', 'header.hbs'), 'utf-8'),
        groupBy: 'scope',
        mainTemplate: fs.readFileSync(path.join(__dirname, 'release', 'templates', 'template.hbs'), 'utf-8'),
        commitGroupsSort: (a, b) => {
          // push `other` commit group to the bottom.
          if (a.title === false && b.title !== false) {
            return 1;
          }
          if (a.title !== false && b.title === false) {
            return -1;
          }
          return 0;
        },
        commitsSort: ['type', 'shortDesc'],
      },
    },
    '@release-it-plugins/workspaces': true
  },
  npm: {
    pnpm: true,
    versionArgs: ['--workspaces-update=false'],
    publishArgs: ['--access', 'public'],
    allowSameVersion: true,
    skipChecks: true,
    publish: true
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org'
  }
}
