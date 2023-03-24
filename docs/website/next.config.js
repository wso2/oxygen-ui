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

let nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  reactStrictMode: true,
  swcMinify: true,
  // TODO: Added to bypass `Error: @next/font/google failed to run or is incorrectly configured.`
  // Possible fix https://larsmagnus.co/blog/how-to-optimize-custom-fonts-with-next-font.
  optimizeFonts: false,
};

/**
 * If the build mode is static, we need to set the output to export and disable image optimization.
 * @see {@link https://nextjs.org/docs/advanced-features/static-html-export}
 */
if (process.env.BUILD_MODE === 'static') {
  nextConfig = {
    ...nextConfig,
    images: {
      ...nextConfig.images,
      unoptimized: true
    },
    output: 'export'
  }
}

module.exports = nextConfig;
