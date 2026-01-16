import { Box, Button, Card, CardContent, Link, Stack, Typography } from '@wso2/oxygen-ui'
import { Link as NavigateLink } from 'react-router'
import { ArrowLeft, Package, Palette, Zap } from '@wso2/oxygen-ui-icons-react'
import type { JSX } from 'react'

const features = [
  {
    icon: <Package size={24} />,
    title: 'Component Library',
    description:
      'Pre-built React components based on Material UI, customized for WSO2 design language.',
  },
  {
    icon: <Palette size={24} />,
    title: 'Theming',
    description:
      'Multiple built-in themes with light/dark mode support. Easy to customize and extend.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Developer Experience',
    description:
      'TypeScript support, ESLint rules, and fast development with Vite HMR.',
  },
]

export default function AboutPage(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Box sx={{ maxWidth: 800, width: '100%' }}>
        <Button
          component={NavigateLink}
          to="/"
          startIcon={<ArrowLeft size={18} />}
          sx={{ mb: 4 }}
        >
          Back to Home
        </Button>

        <Typography variant="h3" gutterBottom fontWeight={700}>
          About Oxygen UI
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Oxygen UI is WSO2's design system, providing a consistent and
          accessible user experience across all WSO2 products. It's built on top
          of Material UI and includes custom components, themes, and icons.
        </Typography>

        <Stack spacing={3} sx={{ mb: 4 }}>
          {features.map((feature) => (
            <Card key={feature.title} variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      color: 'primary.main',
                      mt: 0.5,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Learn more at{' '}
          <Link href="https://github.com/wso2/oxygen-ui" target="_blank">
            github.com/wso2/oxygen-ui
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
