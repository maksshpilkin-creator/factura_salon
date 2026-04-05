# Spacing System

Consistent spacing is key to a "premium" feel. Avoid random pixel values.

## Spacing Scale

We use a T-shirt sizing scale based on 1rem (16px).

| Variable | Value | Pixels | Usage |
| :--- | :--- | :--- | :--- |
| `--spacing-xs` | 0.5rem | 8px | Gap between icon and text, small padding. |
| `--spacing-sm` | 1rem | 16px | Card padding, button padding, gap between list items. |
| `--spacing-md` | 2rem | 32px | Section separation (internal), large card padding. |
| `--spacing-lg` | 4rem | 64px | Section padding (vertical). |
| `--spacing-xl` | 8rem | 128px | Hero section padding, major visual breaks. |

## Layout Grid

-   **Container**: `max-width: var(--container-width)` (1200px).
-   **Gutters**: Use `padding: 0 var(--spacing-sm)` on the container to prevent content touching edges on mobile.
-   **Grid Gap**: Use `--spacing-md` for grid gaps.

## Vertical Rhythm

-   Heading bottom margin: `--spacing-sm`.
-   Paragraph bottom margin: `--spacing-sm`.
-   Button top margin: `--spacing-md`.

## Example Usage

```css
.section {
  padding: var(--spacing-lg) 0;
}

.card {
  padding: var(--spacing-md);
  gap: var(--spacing-sm);
}
```
