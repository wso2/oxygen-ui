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

import {
  OxygenUIThemeProvider,
  AcrylicOrangeTheme,
  AcrylicPurpleTheme,
  ChoreoTheme,
  ClassicTheme,
  HighContrastTheme,
  PaleGrayTheme,
  PaleIndigoTheme
} from '@wso2/oxygen-ui'
import { HashRouter, BrowserRouter } from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use HashRouter for production builds (for static hosting in Storybook)
// Use BrowserRouter for development
const Router = import.meta.env.PROD ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OxygenUIThemeProvider 
      themes={[
        { key: 'acrylicOrange', label: 'Acrylic Orange Theme', theme: AcrylicOrangeTheme },
        { key: 'acrylicPurple', label: 'Acrylic Purple Theme', theme: AcrylicPurpleTheme },
        { key: 'choreo', label: 'Choreo Theme', theme: ChoreoTheme },
        { key: 'highContrast', label: 'High Contrast Theme', theme: HighContrastTheme },
        { key: 'classic', label: 'Classic Theme', theme: ClassicTheme },
        { key: 'paleGray', label: 'Pale Gray Theme', theme: PaleGrayTheme },
        { key: 'paleIndigo', label: 'Pale Indigo Theme', theme: PaleIndigoTheme },
      ]}
      initialTheme="acrylicOrange"
    >
      <Router>
        <App />
      </Router>
    </OxygenUIThemeProvider>
  </StrictMode>,
)
