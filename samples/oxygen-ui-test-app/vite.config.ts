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

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: process.env.BUILD_FOR_STORYBOOK 
      ? path.resolve(__dirname, '../../packages/oxygen-ui-docs/.storybook/public/sample')
      : 'dist',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    visualizer({
      open: false, // Set to false to prevent auto-opening, manually open dist/stats.html
      filename: process.env.BUILD_FOR_STORYBOOK 
        ? path.resolve(__dirname, 'dist/stats.html')
        : 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})
