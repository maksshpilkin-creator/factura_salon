# Color System

This guide explains how to apply color palettes to the design system.

## Strategy: 60-30-10 Rule

-   **60% Background**: Usually `var(--color-bg)` (White/Light Gray or Dark for dark mode).
-   **30% Text/Secondary**: `var(--color-text)` and `var(--color-secondary)`.
-   **10% Accent**: `var(--color-primary)` for buttons, links, and highlights.

## Color Roles

| Variable | Usage |
| :--- | :--- |
| `--color-primary` | Primary buttons, active states, key highlights. |
| `--color-bg` | Main page background. |
| `--color-text` | Primary body text (high contrast). |
| `--color-text-light` | Subtitles, helper text (medium contrast). |

## Niche Examples

### Luxury Beauty Salon
```css
--color-primary: #D4AF37; /* Gold */
--color-bg: #FAFAFA; /* Off-white */
--color-text: #2C2C2C; /* Soft Black */
```

### Medical / Dentist
```css
--color-primary: #0077B6; /* Trustworthy Blue */
--color-bg: #FFFFFF; /* White */
--color-text: #111827; /* Dark Gray */
```

### High-End Restaurant
```css
--color-primary: #C0392B; /* Deep Red */
--color-bg: #121212; /* Dark Mode */
--color-text: #E0E0E0; /* Light Gray */
```

## Accessibility

-   Always check contrast ratios.
-   Text on `--color-primary` buttons must be readable (usually white or black).
