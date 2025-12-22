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

import {Description, Primary, Subtitle, Title} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Typography, CodeBlock, Box, Divider } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * Practical guides for common tasks in Oxygen UI.
 * Learn how to create custom components, extend themes, and add stories to Storybook.
 */
const meta: Meta = {
  title: 'How To Contribute',
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Learn how to create a custom component using the Box component as a base.
 */
export const CreateNewComponent: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 700 }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Creating a Custom Component
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Use the Box component as a foundation to create custom styled components with full theme support.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>
          Step 1: Create Sub components
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create separate files for each subcomponent using <code>styled()</code> from MUI.
        </Typography>
        
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          CustomCardTitle.tsx
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// src/components/CustomCard/CustomCardTitle.tsx
import { FC, ReactNode } from 'react';
import { styled, TypographyProps } from '@wso2/oxygen-ui';
import Typography from '@mui/material/Typography';

export interface CustomCardTitleProps extends TypographyProps {
  children?: ReactNode;
}

const CustomCardTitle: FC<CustomCardTitleProps> = styled(Typography, {
  name: 'CustomCard',
  slot: 'Title',
  shouldForwardProp: (prop) => prop !== 'highlighted',
})<CustomCardTitleProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

CustomCardTitle.displayName = 'CustomCard.Title';
CustomCardTitle.defaultProps = {
  variant: 'h6',
};

export default CustomCardTitle;`}
        />

        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          CustomCardDescription.tsx
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// src/components/CustomCard/CustomCardDescription.tsx
import { FC, ReactNode } from 'react';
import { styled, TypographyProps } from '@wso2/oxygen-ui';
import Typography from '@mui/material/Typography';

export interface CustomCardDescriptionProps extends TypographyProps {
  children?: ReactNode;
}

const CustomCardDescription: FC<CustomCardDescriptionProps> = styled(Typography, {
  name: 'CustomCard',
  slot: 'Description',
})<CustomCardDescriptionProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

CustomCardDescription.displayName = 'CustomCard.Description';
CustomCardDescription.defaultProps = {
  variant: 'body2',
  paragraph: true,
};

export default CustomCardDescription;`}
        />

        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
          CustomCardActions.tsx
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// src/components/CustomCard/CustomCardActions.tsx
import { FC, ReactNode } from 'react';
import { styled, BoxProps } from '@wso2/oxygen-ui';
import Box from '@mui/material/Box';

export interface CustomCardActionsProps extends BoxProps {
  children?: ReactNode;
}

const CustomCardActions: FC<CustomCardActionsProps> = styled(Box, {
  name: 'CustomCard',
  slot: 'Actions',
})<CustomCardActionsProps>(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

CustomCardActions.displayName = 'CustomCard.Actions';

export default CustomCardActions;`}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Step 2: Create the Main Component
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Import sub components and attach them as static properties using <code>Object.assign()</code>.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// src/components/CustomCard/CustomCard.tsx
import { FC, ReactNode } from 'react';
import { styled, BoxProps } from '@wso2/oxygen-ui';
import Box from '@mui/material/Box';
import CustomCardTitle from './CustomCardTitle';
import CustomCardDescription from './CustomCardDescription';
import CustomCardActions from './CustomCardActions';

export interface CustomCardProps extends BoxProps {
  children?: ReactNode;
  highlighted?: boolean;
}

const CustomCardRoot: FC<CustomCardProps> = styled(Box, {
  name: 'CustomCard',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'highlighted',
})<CustomCardProps>(({ theme, highlighted }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  border: \`1px solid \${highlighted ? theme.palette.primary.main : theme.palette.divider}\`,
  backgroundColor: highlighted ? theme.palette.action.hover : theme.palette.background.paper,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[2],
    transform: 'translateY(-2px)',
  },
}));

CustomCardRoot.displayName = 'CustomCard';

// Attach sub components as static properties
const CustomCard = Object.assign(CustomCardRoot, {
  Title: CustomCardTitle,
  Description: CustomCardDescription,
  Actions: CustomCardActions,
});

export default CustomCard;`}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Step 3: Export Everything
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create an index file to export the component and all its types.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// src/components/CustomCard/index.ts
export { default as CustomCard } from './CustomCard';
export type { CustomCardProps } from './CustomCard';
export type { CustomCardTitleProps } from './CustomCardTitle';
export type { CustomCardDescriptionProps } from './CustomCardDescription';
export type { CustomCardActionsProps } from './CustomCardActions';`}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Step 4: Use the Component
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Compose the card using the compound component pattern for flexible layouts.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`import { CustomCard } from './components/CustomCard';
import { Button } from '@wso2/oxygen-ui';

function App() {
  return (
    <div>
      <CustomCard>
        <CustomCard.Title>Custom Order</CustomCard.Title>
        <CustomCard.Actions>
          <Button variant="text" size="small">
            Edit
          </Button>
        </CustomCard.Actions>
        <CustomCard.Description>
          You can arrange sub components in any order
        </CustomCard.Description>
      </CustomCard>
    </div>
  );
}`}
        />
      </Box>
    </Stack>
  ),
};

/**
 * Learn how to add your component to Storybook with interactive examples.
 */
export const CreateStory: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 700 }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Adding a Storybook Story
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create interactive documentation for your component with Storybook stories.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>
          Step 1: Create the Story File
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create a .stories.tsx file alongside your component.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// src/components/CustomCard/CustomCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CustomCard } from './CustomCard';
import { Button, Stack } from '@wso2/oxygen-ui';
import React from 'react';

/**
 * CustomCard is a flexible card component built with Box.
 * It supports highlighting, hover effects, and custom content.
 */
const meta: Meta<typeof CustomCard> = {
  title: 'Components/Custom Card',
  component: CustomCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: \`
A customizable card component with built-in hover effects and theme support.

### Features
- **Highlight Mode**: Eye-catching highlighted state
- **Hover Effects**: Smooth elevation and transform on hover
- **Theme Integration**: Automatically adapts to theme colors
- **Flexible Content**: Accepts any children components

### Usage
\\\`\\\`\\\`tsx
<CustomCard title="Card Title" description="Description text">
  <Button>Action</Button>
</CustomCard>
\\\`\\\`\\\`
        \`,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The card title',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    highlighted: {
      control: 'boolean',
      description: 'Enable highlighted state',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomCard>;`}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Step 2: Add Story Examples
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create different story variations to showcase your component's features.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`/**
 * Basic card with header and description.
 */
export const Default: Story = {
  render: () => (
    <CustomCard>
      <CustomCard.Header>Default Card</CustomCard.Header>
      <CustomCard.Description>
        A simple card with basic styling
      </CustomCard.Description>
    </CustomCard>
  ),
};

/**
 * Highlighted card with primary theme colors.
 */
export const Highlighted: Story = {
  render: () => (
    <CustomCard highlighted>
      <CustomCard.Header>Highlighted Card</CustomCard.Header>
      <CustomCard.Description>
        This card stands out with highlighted styling
      </CustomCard.Description>
    </CustomCard>
  ),
};

/**
 * Card with custom content and actions.
 */
export const WithActions: Story = {
  render: () => (
    <CustomCard>
      <CustomCard.Header>Card with Actions</CustomCard.Header>
      <CustomCard.Description>
        Cards can contain any content and actions
      </CustomCard.Description>
      <CustomCard.Actions>
        <Button variant="contained" size="small">
          Primary Action
        </Button>
        <Button variant="outlined" size="small">
          Secondary
        </Button>
      </CustomCard.Actions>
    </CustomCard>
  ),
};

/**
 * Flexible composition - arrange subcomponents in any order.
 */
export const FlexibleComposition: Story = {
  render: () => (
    <Stack spacing={2}>
      <CustomCard>
        <CustomCard.Header>Header First</CustomCard.Header>
        <CustomCard.Description>Description second</CustomCard.Description>
        <CustomCard.Actions>
          <Button size="small">Action last</Button>
        </CustomCard.Actions>
      </CustomCard>
      
      <CustomCard>
        <CustomCard.Actions>
          <Button size="small">Action first</Button>
        </CustomCard.Actions>
        <CustomCard.Header>Header second</CustomCard.Header>
        <CustomCard.Description>Description last</CustomCard.Description>
      </CustomCard>
    </Stack>
  ),
};

/**
 * Multiple cards in a grid layout.
 */
export const MultipleCards: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <CustomCard>
        <CustomCard.Header>Card 1</CustomCard.Header>
        <CustomCard.Description>First card</CustomCard.Description>
      </CustomCard>
      
      <CustomCard highlighted>
        <CustomCard.Header>Card 2</CustomCard.Header>
        <CustomCard.Description>Highlighted card</CustomCard.Description>
      </CustomCard>
      
      <CustomCard>
        <CustomCard.Header>Card 3</CustomCard.Header>
        <CustomCard.Description>Third card</CustomCard.Description>
      </CustomCard>
    </Stack>
  ),
};`}
        />
      </Box>
    </Stack>
  ),
};

/**
 * Learn how to create a completely custom theme with component overrides.
 */
export const CreateCustomTheme: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 700 }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Creating a Custom Theme
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Build a fully customized theme with component style overrides and custom properties.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>
          Complete Custom Theme Example
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This example includes custom colors, typography, component overrides, and custom theme properties.
        </Typography>
        <CodeBlock
          language="tsx"
          code={`// src/theme/brandTheme.ts
import { extendTheme } from '@wso2/oxygen-ui';

export const brandTheme = extendTheme({
  cssVarPrefix: 'brand',
  colorSchemeSelector: 'data-color-scheme',
  
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#2563eb',
          light: '#3b82f6',
          dark: '#1d4ed8',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#10b981',
          light: '#34d399',
          dark: '#059669',
          contrastText: '#ffffff',
        },
        divider: '#e5e7eb',
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
          contrastText: '#ffffff',
        },
        divider: '#374151',
      },
    },
  },
  
  typography: {
    fontFamily: '"Inter Variable", "Inter", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
  },
  
  shape: {
    borderRadius: 8,
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600,
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
  },
});`}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Using the Custom Theme
        </Typography>
        <CodeBlock
          language="tsx"
          code={`import { OxygenUIThemeProvider } from '@wso2/oxygen-ui';
import { brandTheme } from './theme/brandTheme';

function App() {
  return (
    <OxygenUIThemeProvider theme={brandTheme}>
      <YourApp />
    </OxygenUIThemeProvider>
  );
}`}
        />
      </Box>
    </Stack>
  ),
};
