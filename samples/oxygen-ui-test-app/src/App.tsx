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

import { Badge, Button, Layout } from '@wso2/oxygen-ui'
import ColorModeToggle from '@wso2/oxygen-ui/ColorModeToggle'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout.Content>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Oxygen UI</h1>
      <div className="card">
        <p>
          <Badge badgeContent={count} color="secondary">
            <Button variant="contained" onClick={() => setCount((count) => count + 1)}>
              Click to increase count 
            </Button>
          </Badge>
          <br /><br />
        </p>
      </div>
      <p className="read-the-docs">
        Click here to change color mode <ColorModeToggle />
      </p>
    </Layout.Content>
  )
}

export default App
