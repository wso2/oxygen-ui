# Oxygen UI Design System

This document outlines the design system architecture, design tool integration, and guidelines for designers working with Oxygen UI.

## Overview

Oxygen UI is WSO2's design system built on top of Material-UI v7. It provides a unified visual language and component library that ensures consistency across all WSO2 products.

## Design Tools Integration

### Figma Integration

> **Coming Soon**: Official Figma library with Oxygen UI components, design tokens, and styles.

For now, designers can reference the [Storybook documentation](https://wso2.github.io/oxygen-ui/) for component specifications and behavior.

### Design Tokens Export/Import

Design tokens are defined in code and can be extracted for use in design tools. The following tokens are available:

#### Color System

**Base Colors:**
- Primary: `#ff7300` (WSO2 Orange)
- Secondary: `#757575` (Gray)

**Status Colors (Light Mode):**
- Success: `#2e7d32` (Green)
- Warning: `#e65100` (Orange)
- Error: `#c62828` (Red)
- Info: `#0277bd` (Blue)

**Status Colors (Dark Mode):**
- Success: `#388e3c` (Green)
- Warning: `#f57c00` (Orange)
- Error: `#d32f2f` (Red)
- Info: `#0288d1` (Blue)

All status colors are designed to meet WCAG AA standards (≥4.5:1 contrast ratio) when used with white text.

#### Typography Scale

**Font Family:**
- Primary: `'Inter Variable', sans-serif` (automatically loaded)
- Fallback: System font stack

**Font Sizes:**
- Base: `14px`
- h1: `28px` (base + 14)
- h2: `24px` (base + 10)
- h3: `22px` (base + 8)
- h4: `20px` (base + 6)
- h5: `16px` (base + 2)
- h6: `14px` (base)
- body1: `14px`
- body2: `13px` (base - 1, for labels)
- caption: `11px` (base - 3)

**Font Weights:**
- Regular: `400`
- Medium: `500`

#### Spacing System

Oxygen UI uses Material-UI's 8px spacing scale:
- 1 unit = `8px`
- Theme: `theme.spacing(1)` = `8px`
- Common values: 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12

#### Border Radius

**WSO2 Theme:**
- Default: `20px` (theme.shape.borderRadius)

**Other Themes:**
- Varies by theme (typically 8-12px)

#### Shadows & Blur

**Blur Effects:**
- None: `none`
- Light: `blur(10px)`
- Medium: `blur(16px)`
- Heavy: `blur(24px)`

**Shadows:**
- All themes use `none` by default for a flat, modern appearance

#### Breakpoints

Following Material-UI's responsive breakpoints:
- xs: `0px`
- sm: `600px`
- md: `900px`
- lg: `1200px`
- xl: `1536px`

## Working with Designers

### Design to Code Workflow

1. **Component Specification**
   - Use Storybook for component specifications
   - Reference component props and behaviors
   - Check interaction states (hover, focus, disabled)

2. **Theme Customization**
   - Designers can specify color overrides
   - Developers implement using `createOxygenTheme` utility
   - Partial overrides supported for granular control

3. **Code Handoff**
   - Share Storybook links for component reference
   - Provide color codes and spacing values
   - Document any custom component requirements

### Accessing Design Tokens

Design tokens can be accessed programmatically:

```typescript
import { OxygenThemeBase } from '@wso2/oxygen-ui';

// Access color tokens
const primaryColor = OxygenThemeBase.palette.primary.main; // #ff7300

// Access typography
const baseFontSize = OxygenThemeBase.typography.fontSize; // 14

// Access spacing (function)
const spacing = OxygenThemeBase.spacing(2); // '16px'

// Access custom properties
const blurMedium = OxygenThemeBase.blur.medium; // 'blur(16px)'
```

### Creating Custom Themes

Designers can collaborate with developers to create custom themes:

```typescript
import { createOxygenTheme, OxygenThemeBase } from '@wso2/oxygen-ui';

const CustomTheme = createOxygenTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#YOUR_BRAND_COLOR',
        },
      },
    },
  },
  shape: {
    borderRadius: 12, // Custom radius
  },
}, OxygenThemeBase);
```

## Component States

All components support these standard states:
- **Default**: Normal state
- **Hover**: Mouse over interaction
- **Focus**: Keyboard or programmatic focus
- **Active**: Being pressed/clicked
- **Disabled**: Non-interactive state
- **Error**: Validation error state

## Accessibility Guidelines

### Color Contrast

All color combinations are tested for WCAG AA compliance:
- Normal text: ≥4.5:1 contrast ratio
- Large text: ≥3:1 contrast ratio
- UI components: ≥3:1 contrast ratio

### Focus Indicators

All interactive elements have visible focus indicators for keyboard navigation.

### Semantic Markup

Components use proper HTML semantics and ARIA attributes.

## Design System Resources

### Documentation
- [Storybook](https://wso2.github.io/oxygen-ui/) - Component library and examples
- [GitHub Repository](https://github.com/wso2/oxygen-ui) - Source code and issues

### Support Channels
- GitHub Issues - For bug reports and feature requests
- Discussions - For questions and community support

## Export Tools

### Generating Design Token Files

For tools that support design token imports (Figma, Sketch, etc.), you can export tokens:

```bash
# Export theme tokens to JSON
pnpm run export:tokens

# This will generate design-tokens.json with:
# - Color palette (light/dark modes)
# - Typography scale
# - Spacing values
# - Border radius
# - Shadows and effects
```

> **Note**: Token export tools are under development. Contact the Oxygen UI team for early access.

## Contributing Design Changes

1. Open an issue describing the design problem or enhancement
2. Share design mockups or prototypes (Figma/Sketch links)
3. Discuss with maintainers before implementation
4. Submit a PR with both design assets and code changes

## Design Principles

### Consistency
- Use existing components whenever possible
- Follow established patterns and conventions
- Maintain visual hierarchy across the application

### Accessibility
- Design for all users and abilities
- Ensure sufficient color contrast
- Support keyboard navigation
- Provide clear focus indicators

### Simplicity
- Minimize cognitive load
- Use clear, concise language
- Avoid unnecessary UI elements
- Progressive disclosure for complex features

### Performance
- Optimize for fast load times
- Use appropriate image formats
- Minimize animation overhead
- Consider mobile and low-bandwidth scenarios

## Version History

- **v0.8.x** - Added ColorSchemeSVG, runtime theme support, improved WSO2Theme
- **v0.7.x** - Material-UI v7 upgrade, enhanced theming system
- **v0.6.x** - Initial public release

---

For questions or feedback about the design system, open an issue on [GitHub](https://github.com/wso2/oxygen-ui/issues).
