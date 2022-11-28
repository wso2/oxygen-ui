/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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

const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const STATIC_DIRECTORY_NAME = "static";

module.exports = {
    core: {
        builder: "webpack5"
    },
    stories: [
        "./content/**/*.stories.mdx",
        "./content/**/*.stories.@(js|jsx|ts|tsx)",
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-a11y",
        "@storybook/addon-essentials",
        "@storybook/addon-links",
        "storybook-addon-designs",
        "storybook-dark-mode",
        '@storybook/preset-scss'
    ],
    "previewHead": (head) => (`
        ${head}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    `),
    staticDirs: [ path.resolve(__dirname, STATIC_DIRECTORY_NAME) ],
    webpackFinal: async (config) => {
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new TsconfigPathsPlugin({
              configFile: path.resolve(__dirname, "tsconfig.json"),
              extensions: config.resolve.extensions,
             })
        ];

        return config;
    },
};
