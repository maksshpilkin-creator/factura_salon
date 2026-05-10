# Luxury Preset

Ideal for High-End Salons, Law Firms, Real Estate.

## CSS Variables

```css
:root {
  /* Colors */
  --color-bg: #FAFAFA; /* Off-white, not stark white */
  --color-text: #1A1A1A;
  --color-text-light: #555555;
  --color-primary: #D4AF37; /* Gold */
  --color-secondary: #000000;
  
  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Lato', sans-serif;
  
  /* Spacing - More breathing room */
  --spacing-md: 3rem; 
  --spacing-lg: 6rem;
  
  /* UI Elements */
  --radius: 0px; /* Sharp corners feel more "serious" */
  --shadow: none; /* Flat design or very subtle */
}

/* Specific Component Overrides */
.btn--primary {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.875rem;
}

.hero__title {
  font-weight: 400; /* Lighter weight headings */
  font-style: italic;
}

.card {
  border: 1px solid #E5E5E5;
  background: #fff;
}
```
