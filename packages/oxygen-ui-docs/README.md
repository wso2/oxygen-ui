# @wso2/oxygen-ui-docs

Documentation site for WSO2 Oxygen UI using Storybook.

## Getting Started

### Installation

From the workspace root:

```bash
pnpm install
```

### Development

Start the Storybook development server:

```bash
# From workspace root
pnpm storybook

# Or from this package
pnpm dev
```

This will start Storybook at http://localhost:6006

### Build

Build the static Storybook site:

```bash
# From workspace root
pnpm build:storybook

# Or from this package
pnpm build
```

The built site will be in the `storybook-static` directory.

## Structure

```
oxygen-ui-docs/
├── .storybook/          # Storybook configuration
│   ├── main.js         # Main Storybook config
│   ├── preview.js      # Preview configuration
│   └── manager.js      # Manager configuration
├── stories/            # Component stories
│   ├── Inputs/
│   ├── DataDisplay/
│   ├── Feedback/
│   ├── Surfaces/
│   ├── Navigation/
│   ├── Layout/
│   ├── Utils/
│   └── MUI X/
└── package.json
```

## Adding Stories

Stories are organized by component category. To add a new story:

1. Create a new `.stories.tsx` file in the appropriate category folder
2. Import the component from `@wso2/oxygen-ui`
3. Define the story using Storybook's CSF3 format

Example:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@wso2/oxygen-ui';

const meta: Meta<typeof Button> = {
  title: 'Inputs/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
  },
};
```

## License

Apache-2.0
