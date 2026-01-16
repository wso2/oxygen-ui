import { Box, Button, Typography } from '@wso2/oxygen-ui'
import { Home, ArrowLeft, AlertCircle } from '@wso2/oxygen-ui-icons-react'
import { useNavigate } from 'react-router'
import type { JSX } from 'react'

export default function ErrorPage(): JSX.Element {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Box sx={{ maxWidth: 500 }}>
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: 'error.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
            opacity: 0.3,
          }}
        >
          <AlertCircle size={50} />
        </Box>

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
          404
        </Typography>

        <Typography variant="h4" gutterBottom fontWeight={600}>
          Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<Home size={20} />}
            onClick={handleGoHome}
          >
            Go to Homepage
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowLeft size={20} />}
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
