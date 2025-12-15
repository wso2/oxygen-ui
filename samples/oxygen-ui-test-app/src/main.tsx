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

import { OxygenUIThemeProvider, OxygenTheme, OxygenThemeWithRadialBackground } from '@wso2/oxygen-ui'
import { BrowserRouter } from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ChoreoTheme from './themes/choreo.ts'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OxygenUIThemeProvider 
      themes={[
        { key: 'radial', label: 'Radial Background', theme: OxygenThemeWithRadialBackground },
        { key: 'choreo', label: 'Choreo Theme', theme: ChoreoTheme },
        { key: 'default', label: 'Default Theme', theme: OxygenTheme },
      ]}
      initialTheme="radial"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OxygenUIThemeProvider>
  </StrictMode>,
)
