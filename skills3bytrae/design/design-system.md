# Design System

This file defines the global design variables. Copy these into your `styles.css` `:root` element.

## CSS Variables

```css
:root {
  /* Colors - Override these per Niche */
  --color-primary: #000000; /* Main brand color */
  --color-secondary: #333333; /* Accents */
  --color-bg: #ffffff; /* Page background */
  --color-text: #1a1a1a; /* Body text */
  --color-text-light: #666666; /* Secondary text */
  
  /* Typography */
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  
  /* Spacing */
  --spacing-xs: 0.5rem;  /* 8px */
  --spacing-sm: 1rem;    /* 16px */
  --spacing-md: 2rem;    /* 32px */
  --spacing-lg: 4rem;    /* 64px */
  --spacing-xl: 8rem;    /* 128px */
  
  /* UI Elements */
  --radius: 8px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  /* Layout */
  --container-width: 1200px;
  --header-height: 80px;
}
```

## Usage Rules

1.  **Never hardcode hex values** in components. Always use `var(--color-primary)`.
2.  **Use `rem` for spacing**, not `px`. (Assume 1rem = 16px).
3.  **Mobile First**: Default styles are for mobile. Use media queries for larger screens.

## Typography Scale

-   **H1**: 2.5rem (Mobile) / 3.5rem (Desktop)
-   **H2**: 2rem (Mobile) / 2.5rem (Desktop)
-   **H3**: 1.5rem (Mobile) / 1.75rem (Desktop)
-   **Body**: 1rem (16px)
-   **Small**: 0.875rem (14px)
