import { Outlet } from 'react-router'
import { Box, ColorSchemeToggle, Layout, Stack, ThemeSwitcher } from '@wso2/oxygen-ui'
import type { JSX } from 'react'

export default function DefaultLayout(): JSX.Element {
  return (
    <Layout.Content>
      <Box sx={{ height: '100%' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 2
          }}
        >
          <ThemeSwitcher />
          <ColorSchemeToggle />
        </Stack>
        <Outlet />
      </Box>
    </Layout.Content>
  );
}
