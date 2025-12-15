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

import { Box, Button, Typography } from '@wso2/oxygen-ui'
import { useNavigate } from 'react-router'
import type { JSX } from 'react'

export default function ListingPage(): JSX.Element {
  const navigate = useNavigate()

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Listing Page
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        This is a placeholder for the listing page.
      </Typography>
      <Button variant="outlined" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Box>
  )
}
