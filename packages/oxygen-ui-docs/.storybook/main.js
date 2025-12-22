/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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

export default {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  staticDirs: ['public'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/mdx2-csf',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
  webpackFinal: async (config) => {
    // Handle workspace packages - allow transpiling @wso2 packages
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules\/(?!@wso2)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
      },
    });
    
    return config;
  }
}
