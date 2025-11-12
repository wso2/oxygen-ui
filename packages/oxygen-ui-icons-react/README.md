# @wso2/oxygen-ui-icons-react

WSO2 Oxygen UI Icons library - Powered by [Lucide Icons](https://lucide.dev/).

This package provides a comprehensive set of icons for use in WSO2 Oxygen UI applications, including all Lucide icons plus custom WSO2-specific icons.

## Installation

```bash
pnpm add @wso2/oxygen-ui-icons-react
```

## Usage

Import icons directly from the package:

```jsx
import { Bell, Search, User, WSO2 } from '@wso2/oxygen-ui-icons-react';

function MyComponent() {
  return (
    <div>
      <Bell size={24} />
      <Search color="blue" />
      <User strokeWidth={1.5} />
      <WSO2 />
    </div>
  );
}
```

## Icon Properties

All icons support the standard Lucide React props:

- `size` - Icon size in pixels (default: 24)
- `color` - Icon color (default: currentColor)
- `strokeWidth` - Stroke width (default: 2)
- `absoluteStrokeWidth` - Use absolute stroke width
- `className` - CSS class name
- `style` - Inline styles

## Available Icons

This package includes:

### Lucide Icons (2000+)
Browse the complete collection at [lucide.dev/icons](https://lucide.dev/icons)

### Custom WSO2 Icons
- `WSO2` - WSO2 logo icon
- And other WSO2-specific branding icons

## Example with Material-UI

```jsx
import { IconButton } from '@wso2/oxygen-ui';
import { Settings, LogOut } from '@wso2/oxygen-ui-icons-react';

function Toolbar() {
  return (
    <div>
      <IconButton>
        <Settings size={20} />
      </IconButton>
      <IconButton>
        <LogOut size={20} />
      </IconButton>
    </div>
  );
}
```

## TypeScript Support

This package includes TypeScript definitions for all icons.

```tsx
import { LucideIcon } from '@wso2/oxygen-ui-icons-react';

interface MyIconProps {
  Icon: LucideIcon;
  label: string;
}

function MyIcon({ Icon, label }: MyIconProps) {
  return (
    <div>
      <Icon size={24} />
      <span>{label}</span>
    </div>
  );
}
```

## Tree Shaking

This package is optimized for tree shaking. Import only the icons you need to keep your bundle size small:

```jsx
// ✅ Good - only imports what you need
import { Bell, Search } from '@wso2/oxygen-ui-icons-react';

// ❌ Bad - imports everything
import * as Icons from '@wso2/oxygen-ui-icons-react';
```

## License

See the main [Oxygen UI repository](https://github.com/wso2/oxygen-ui) for license information.

## Contributing

See the main [Oxygen UI repository](https://github.com/wso2/oxygen-ui) for contribution guidelines.
