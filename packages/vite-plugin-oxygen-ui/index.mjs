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

import fs from 'fs';
import path from 'path';

// Only alias MUI components; custom components are handled by the oxygen-ui package itself
const materialPath = path.join(process.cwd(), 'node_modules', '@mui', 'material');
const muiComponents = fs.readdirSync(materialPath).filter((name) => {
  return fs.statSync(path.join(materialPath, name)).isDirectory();
});

export default function oxygenUIPlugin() {
  const alias = {};
  
  // Alias individual component imports: @wso2/oxygen-ui/Button → @mui/material/Button
  muiComponents.forEach((component) => {
    alias[`@wso2/oxygen-ui/${component}`] = `@mui/material/${component}`;
  });

  return {
    name: 'vite-plugin-oxygen-ui',
    config: () => ({
      resolve: { alias }
    })
  };
}
