# Theme Management Guide

## Overview

This application uses a centralized theme configuration system to maintain consistent styling across all components. All colors, backgrounds, and common styles are defined in a single location.

## Architecture

### 1. **Theme Configuration** (`src/theme/colors.ts`)
- Central source of truth for all colors and theme values
- Defines color palettes (primary, accent, gray, semantic)
- Contains pre-configured theme objects for common use cases
- Fully typed with TypeScript for autocomplete support

### 2. **Theme Hook** (`src/hooks/useTheme.ts`)
- `useTheme()` - Access theme configuration in components
- `getThemeClass()` - Helper for light/dark mode class selection
- `cn()` - Utility to combine class names

## Usage Examples

### Basic Component with Theme

```tsx
import { theme } from '@/theme/colors';
import { cn } from '@/hooks/useTheme';

function MyComponent({ isDark }: { isDark: boolean }) {
  return (
    <div className={cn(
      theme.backgrounds.page,
      isDark ? theme.text.primary.dark : theme.text.primary.light
    )}>
      <h1 className={theme.text.heading}>Title</h1>
      <button className={theme.buttons.primary}>Click me</button>
    </div>
  );
}
```

### Using Theme Colors

```tsx
// Access color values
import { colors } from '@/theme/colors';

// In Tailwind classes
className="bg-slate-600" // Use theme.backgrounds.header instead

// Better approach:
className={theme.backgrounds.header}
```

### Common Patterns

#### Headers
```tsx
<header className={theme.backgrounds.header}>
  <h1 className={theme.text.onDark}>App Name</h1>
</header>
```

#### Cards
```tsx
<div className={cn(
  'rounded-xl p-6',
  isDark ? theme.backgrounds.card.dark : theme.backgrounds.card.light,
  isDark ? theme.borders.dark : theme.borders.light
)}>
  Content
</div>
```

#### Buttons
```tsx
<button className={theme.buttons.primary}>Primary Action</button>
<button className={theme.buttons.secondary}>Secondary Action</button>
<button className={theme.buttons.outline}>Outline Button</button>
```

#### Sections
```tsx
<section className={theme.spacing.section}>
  <div className={theme.spacing.container}>
    Content
  </div>
</section>
```

## Benefits

1. **Single Source of Truth** - Change colors in one place, update entire app
2. **Type Safety** - TypeScript autocomplete for all theme values
3. **Consistency** - Ensures all components use the same color palette
4. **Easy Theming** - Simple to add dark mode or multiple themes
5. **Maintainability** - No more searching through files to update colors
6. **Scalability** - Easy to extend with new theme variants

## Migration Guide

### Before (Hardcoded)
```tsx
<div className="bg-gradient-to-r from-slate-600 to-slate-700">
  <h1 className="text-white">Title</h1>
  <button className="bg-blue-600 hover:bg-blue-700 text-white">
    Click
  </button>
</div>
```

### After (Theme-based)
```tsx
<div className={theme.backgrounds.header}>
  <h1 className={theme.text.onDark}>Title</h1>
  <button className={theme.buttons.primary}>
    Click
  </button>
</div>
```

## Extending the Theme

To add new theme values, edit `src/theme/colors.ts`:

```typescript
export const theme = {
  // ... existing config
  
  // Add new category
  cards: {
    hover: 'hover:shadow-lg transition-shadow',
    featured: 'border-2 border-blue-600',
  },
} as const;
```

## Best Practices

1. **Always use theme values** instead of hardcoding Tailwind classes
2. **Use the `cn()` helper** to combine multiple class names
3. **Keep theme.colors.ts updated** when adding new color needs
4. **Document new theme additions** in this guide
5. **Use semantic naming** (e.g., `primary`, `accent`) over specific colors

## Future Enhancements

- [ ] Add theme provider for runtime theme switching
- [ ] Support multiple theme variants (light, dark, high-contrast)
- [ ] Add CSS variables for dynamic theming
- [ ] Create theme generator tool
- [ ] Add theme preview component
