import { Box, Button, Link, Stack, Typography } from '@wso2/oxygen-ui'
import { Link as NavigateLink } from 'react-router'
import { Rocket, ArrowRight, Github } from '@wso2/oxygen-ui-icons-react'
import type { JSX } from 'react'

export default function HomePage(): JSX.Element {
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
      <Box sx={{ maxWidth: 600 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
            color: 'primary.contrastText',
          }}
        >
          <Rocket size={40} />
        </Box>

        <Typography variant="h2" gutterBottom fontWeight={700}>
          Welcome to {{PROJECT_NAME}}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}
        >
          Your new project is ready! Built with WSO2 Oxygen UI design system,
          React, TypeScript, and Vite.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mb: 6 }}
        >
          <Button
            variant="contained"
            endIcon={<ArrowRight size={18} />}
            component={NavigateLink}
            to="/about"
          >
            Learn More
          </Button>
          <Button
            variant="outlined"
            startIcon={<Github size={18} />}
            component="a"
            href="https://github.com/wso2/oxygen-ui"
            target="_blank"
          >
            Documentation
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Edit <code>src/pages/HomePage.tsx</code> to get started
        </Typography>

        <Box sx={{ mt: 8 }}>
          <Typography variant="caption" color="text.secondary">
            Powered by{' '}
            <Link href="https://github.com/wso2/oxygen-ui" target="_blank">
              WSO2 Oxygen UI
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
