/*
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Stack, colors, CodeBlock } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * Colors from Material-UI are re-exported through Oxygen UI for easy access.
 * These colors follow Material Design guidelines and provide a consistent color palette.
 */
const meta: Meta = {
  title: 'Theming/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Material-UI colors are available through the \`colors\` namespace in Oxygen UI.
This provides access to all Material Design color palettes with their various shades.

### Usage

\`\`\`tsx
import { colors } from '@wso2/oxygen-ui';

// Access colors with their shade values
colors.red[500]        // Main red
colors.blue[700]       // Darker blue
colors.green[300]      // Lighter green
\`\`\`

### Available Colors

All Material Design colors are available:
- **Red, Pink, Purple, Deep Purple**
- **Indigo, Blue, Light Blue, Cyan**
- **Teal, Green, Light Green, Lime**
- **Yellow, Amber, Orange, Deep Orange**
- **Brown, Grey, Blue Grey**

### Shade Values

Each color comes with 10 shades (except black and white):
- **50**: Lightest
- **100-400**: Light variations
- **500**: Main color (default)
- **600-900**: Dark variations
- **A100, A200, A400, A700**: Accent colors

### Common Use Cases

1. **Background Colors**: Use lighter shades (50-200) for backgrounds
2. **Text Colors**: Use darker shades (700-900) for text on light backgrounds
3. **Primary Actions**: Use the main shade (500) or accent colors
4. **Hover States**: Use slightly darker shades than the base color
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Display all primary Material Design colors with their main shade (500).
 */
export const PrimaryColors: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Primary Color Palette
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {[
          { name: 'Red', color: colors.red[500] },
          { name: 'Pink', color: colors.pink[500] },
          { name: 'Purple', color: colors.purple[500] },
          { name: 'Deep Purple', color: colors.deepPurple[500] },
          { name: 'Indigo', color: colors.indigo[500] },
          { name: 'Blue', color: colors.blue[500] },
          { name: 'Light Blue', color: colors.lightBlue[500] },
          { name: 'Cyan', color: colors.cyan[500] },
          { name: 'Teal', color: colors.teal[500] },
          { name: 'Green', color: colors.green[500] },
          { name: 'Light Green', color: colors.lightGreen[500] },
          { name: 'Lime', color: colors.lime[500] },
          { name: 'Yellow', color: colors.yellow[500] },
          { name: 'Amber', color: colors.amber[500] },
          { name: 'Orange', color: colors.orange[500] },
          { name: 'Deep Orange', color: colors.deepOrange[500] },
          { name: 'Brown', color: colors.brown[500] },
          { name: 'Grey', color: colors.grey[500] },
          { name: 'Blue Grey', color: colors.blueGrey[500] },
        ].map(({ name, color }) => (
          <Paper
            key={name}
            sx={{
              width: 120,
              height: 120,
              bgcolor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              textAlign: 'center',
              padding: 1,
            }}
          >
            {name}
          </Paper>
        ))}
      </Stack>
    </Stack>
  ),
};

/**
 * Display different shades of a single color (Blue) from lightest to darkest.
 */
export const ColorShades: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Blue Color Shades
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {[
          { shade: '50', color: colors.blue[50] },
          { shade: '100', color: colors.blue[100] },
          { shade: '200', color: colors.blue[200] },
          { shade: '300', color: colors.blue[300] },
          { shade: '400', color: colors.blue[400] },
          { shade: '500', color: colors.blue[500] },
          { shade: '600', color: colors.blue[600] },
          { shade: '700', color: colors.blue[700] },
          { shade: '800', color: colors.blue[800] },
          { shade: '900', color: colors.blue[900] },
        ].map(({ shade, color }) => (
          <Paper
            key={shade}
            sx={{
              width: 100,
              height: 100,
              bgcolor: color,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: parseInt(shade) >= 500 ? 'white' : 'black',
              fontWeight: 600,
            }}
          >
            <Typography variant="body2" fontWeight="inherit" color="inherit">
              {shade}
            </Typography>
            <Typography variant="caption" color="inherit" sx={{ opacity: 0.8 }}>
              {color}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Stack>
  ),
};

/**
 * Display accent colors (A100, A200, A400, A700) for a color palette.
 */
export const AccentColors: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Accent Colors
      </Typography>
      {[
        { name: 'Red', palette: colors.red },
        { name: 'Pink', palette: colors.pink },
        { name: 'Purple', palette: colors.purple },
        { name: 'Deep Purple', palette: colors.deepPurple },
        { name: 'Indigo', palette: colors.indigo },
        { name: 'Blue', palette: colors.blue },
        { name: 'Light Blue', palette: colors.lightBlue },
        { name: 'Cyan', palette: colors.cyan },
        { name: 'Teal', palette: colors.teal },
        { name: 'Green', palette: colors.green },
        { name: 'Light Green', palette: colors.lightGreen },
        { name: 'Lime', palette: colors.lime },
        { name: 'Yellow', palette: colors.yellow },
        { name: 'Amber', palette: colors.amber },
        { name: 'Orange', palette: colors.orange },
        { name: 'Deep Orange', palette: colors.deepOrange },
      ].map(({ name, palette }) => (
        <Box key={name}>
          <Typography variant="body2" gutterBottom fontWeight={600}>
            {name}
          </Typography>
          <Stack direction="row" spacing={1}>
            {['A100', 'A200', 'A400', 'A700'].map((shade) => (
              <Paper
                key={shade}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: palette[shade as keyof typeof palette],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: shade === 'A100' ? 'black' : 'white',
                  fontWeight: 600,
                }}
              >
                {shade}
              </Paper>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};

/**
 * Practical examples of using colors in components.
 */
export const PracticalExamples: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Practical Color Usage
      </Typography>

      {/* Background Colors */}
      <Box>
        <Typography variant="body2" gutterBottom fontWeight={600}>
          Background Colors (Light Shades)
        </Typography>
        <Stack direction="row" spacing={2}>
          <Paper sx={{ p: 2, bgcolor: colors.blue[50] }}>
            <Typography>Blue 50</Typography>
          </Paper>
          <Paper sx={{ p: 2, bgcolor: colors.green[100] }}>
            <Typography>Green 100</Typography>
          </Paper>
          <Paper sx={{ p: 2, bgcolor: colors.orange[50] }}>
            <Typography>Orange 50</Typography>
          </Paper>
        </Stack>
      </Box>

      {/* Text Colors */}
      <Box>
        <Typography variant="body2" gutterBottom fontWeight={600}>
          Text Colors (Dark Shades)
        </Typography>
        <Stack spacing={1}>
          <Typography sx={{ color: colors.blue[700] }}>Blue 700 Text</Typography>
          <Typography sx={{ color: colors.green[800] }}>Green 800 Text</Typography>
          <Typography sx={{ color: colors.orange[900] }}>Orange 900 Text</Typography>
        </Stack>
      </Box>

      {/* Button-like Elements */}
      <Box>
        <Typography variant="body2" gutterBottom fontWeight={600}>
          Button Colors
        </Typography>
        <Stack direction="row" spacing={2}>
          <Paper
            sx={{
              p: 2,
              bgcolor: colors.blue[500],
              color: 'white',
              cursor: 'pointer',
              '&:hover': { bgcolor: colors.blue[700] },
            }}
          >
            Primary Action
          </Paper>
          <Paper
            sx={{
              p: 2,
              bgcolor: colors.green[500],
              color: 'white',
              cursor: 'pointer',
              '&:hover': { bgcolor: colors.green[700] },
            }}
          >
            Success Action
          </Paper>
          <Paper
            sx={{
              p: 2,
              bgcolor: colors.red[500],
              color: 'white',
              cursor: 'pointer',
              '&:hover': { bgcolor: colors.red[700] },
            }}
          >
            Danger Action
          </Paper>
        </Stack>
      </Box>

      {/* Borders */}
      <Box>
        <Typography variant="body2" gutterBottom fontWeight={600}>
          Border Colors
        </Typography>
        <Stack direction="row" spacing={2}>
          <Paper sx={{ p: 2, border: 2, borderColor: colors.blue[500] }}>
            <Typography>Blue Border</Typography>
          </Paper>
          <Paper sx={{ p: 2, border: 2, borderColor: colors.purple[500] }}>
            <Typography>Purple Border</Typography>
          </Paper>
          <Paper sx={{ p: 2, border: 2, borderColor: colors.teal[500] }}>
            <Typography>Teal Border</Typography>
          </Paper>
        </Stack>
      </Box>
    </Stack>
  ),
};

/**
 * Code examples showing how to use colors in your application.
 */
export const CodeExamples: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Code Examples
      </Typography>
      <CodeBlock
        language="tsx"
        code={`// Import colors from oxygen-ui
import { colors, Box, Typography } from '@wso2/oxygen-ui';

// Use in sx prop
<Box sx={{ bgcolor: colors.blue[500], color: 'white' }}>
  Content
</Box>

// Use with hover states
<Box 
  sx={{ 
    bgcolor: colors.green[500],
    '&:hover': { 
      bgcolor: colors.green[700] 
    }
  }}
>
  Hover me
</Box>

// Use for text colors
<Typography sx={{ color: colors.red[700] }}>
  Error message
</Typography>

// Use for borders
<Box sx={{ border: 2, borderColor: colors.purple[500] }}>
  Bordered box
</Box>

// Combine with theme
<Box 
  sx={{ 
    bgcolor: colors.blue[50],
    color: colors.blue[900],
    border: 1,
    borderColor: colors.blue[200]
  }}
>
  Cohesive color scheme
</Box>`}
      />
    </Stack>
  ),
};
