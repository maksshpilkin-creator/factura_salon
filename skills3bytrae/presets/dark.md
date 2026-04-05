# Dark Preset

Ideal for Nightlife, Gyms, or High-End Tech services.

## CSS Variables

```css
:root {
  /* Colors */
  --color-bg: #121212;
  --color-text: #E0E0E0;
  --color-text-light: #A0A0A0;
  --color-primary: #BB86FC; /* Or Niche specific accent */
  --color-secondary: #2C2C2C;
  
  /* UI Elements */
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.7);
  
  /* Borders */
  --border-color: #333333;
}

/* Specific Component Overrides */
.card, .review-card, .service-card {
  background-color: #1E1E1E;
  border: 1px solid var(--border-color);
}

.site-header {
  background-color: rgba(18, 18, 18, 0.95);
  border-bottom: 1px solid var(--border-color);
}

.input, .textarea {
  background-color: #2C2C2C;
  color: #fff;
  border: 1px solid #444;
}
```
