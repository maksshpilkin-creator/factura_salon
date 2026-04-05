# Minimal Preset

Ideal for Modern Medical, Consulting, Cleaning Services.

## CSS Variables

```css
:root {
  /* Colors */
  --color-bg: #FFFFFF;
  --color-text: #222222;
  --color-text-light: #777777;
  --color-primary: #333333; /* Monochrome or single accent */
  --color-secondary: #F5F5F5;
  
  /* Typography */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* UI Elements */
  --radius: 4px;
  --shadow: 0 1px 3px rgba(0,0,0,0.05);
}

/* Specific Component Overrides */
.section {
  padding: var(--spacing-lg) 0;
}

.card {
  box-shadow: none;
  border: 1px solid #EEEEEE;
}

.btn {
  border-radius: 50px; /* Pill shape */
}
```
