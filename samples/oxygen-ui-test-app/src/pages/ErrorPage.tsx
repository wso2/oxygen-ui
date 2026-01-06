/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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

import { Box, Button, Typography, Card, CardContent } from '@wso2/oxygen-ui'
import { Home, RefreshCw, ArrowLeft, AlertCircle } from '@wso2/oxygen-ui-icons-react'
import { useNavigate, useSearchParams } from 'react-router'
import type { JSX } from 'react'

interface ErrorType {
  code: string
  title: string
  message: string
  suggestion: string
}

const errorTypes: Record<string, ErrorType> = {
  '404': {
    code: '404',
    title: 'Page Not Found',
    message: "The page you're looking for doesn't exist or has been moved.",
    suggestion: 'Check the URL or navigate back to the homepage.',
  },
  '403': {
    code: '403',
    title: 'Access Denied',
    message: "You don't have permission to access this resource.",
    suggestion: 'Contact your administrator if you believe this is a mistake.',
  },
  '500': {
    code: '500',
    title: 'Internal Server Error',
    message: 'Something went wrong on our end. Please try again later.',
    suggestion: 'If the problem persists, contact support.',
  },
  'network': {
    code: 'Network Error',
    title: 'Connection Problem',
    message: 'Unable to connect to the server. Please check your internet connection.',
    suggestion: 'Try refreshing the page or check your network settings.',
  },
  'timeout': {
    code: 'Timeout',
    title: 'Request Timeout',
    message: 'The request took too long to complete.',
    suggestion: 'Please try again or check your connection.',
  },
  'unauthorized': {
    code: '401',
    title: 'Unauthorized',
    message: 'You need to be logged in to access this page.',
    suggestion: 'Please sign in to continue.',
  },
  'maintenance': {
    code: 'Maintenance',
    title: 'Under Maintenance',
    message: "We're currently performing scheduled maintenance.",
    suggestion: "We'll be back shortly. Please check back later.",
  },
}

export default function ErrorPage(): JSX.Element {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const errorType = searchParams.get('type') || '404'
  const error = errorTypes[errorType] || errorTypes['404']

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: 600, width: '100%', textAlign: 'center' }}>
        {/* Error Icon */}
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            bgcolor: 'error.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
            opacity: 0.2,
          }}
        >
          <AlertCircle size={60} style={{ color: 'currentColor' }} />
        </Box>

        {/* Error Code */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '4rem', sm: '6rem' },
            fontWeight: 700,
            color: 'text.secondary',
            mb: 2,
            opacity: 0.5,
          }}
        >
          {error.code}
        </Typography>

        {/* Error Title */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          {error.title}
        </Typography>

        {/* Error Message */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          {error.message}
        </Typography>

        {/* Suggestion */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {error.suggestion}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}>
          <Button variant="contained" size="large" startIcon={<Home size={20} />} onClick={handleGoHome}>
            Go to Homepage
          </Button>
          <Button variant="outlined" size="large" startIcon={<ArrowLeft size={20} />} onClick={handleGoBack}>
            Go Back
          </Button>
          {(errorType === 'network' || errorType === 'timeout' || errorType === '500') && (
            <Button variant="outlined" size="large" startIcon={<RefreshCw size={20} />} onClick={handleRefresh}>
              Retry
            </Button>
          )}
        </Box>

        {/* Help Card */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              Need Help?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              If you continue to experience issues, please contact our support team.
            </Typography>
            <Button variant="text" size="small">
              Contact Support
            </Button>
          </CardContent>
        </Card>

        {/* Error Details (for development) */}
        {import.meta.env.DEV && (
          <Card variant="outlined" sx={{ mt: 2, textAlign: 'left' }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Debug Information (Development Only)
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                }}
              >
                <div>Error Type: {errorType}</div>
                <div>URL: {window.location.href}</div>
                <div>Timestamp: {new Date().toISOString()}</div>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  )
}
