# Performance Rules

All landing pages must aim for a 90+ Lighthouse score. Performance is critical for local SEO and mobile conversion.

## Image Optimization

1.  **Format**: Use WebP for all images.
2.  **Sizing**: Never serve a 4000px image in a 300px slot. Use `srcset` or resize beforehand.
3.  **Lazy Loading**: Add `loading="lazy"` to all images below the fold.
4.  **Dimensions**: Always specify `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).

## CSS & Styles

1.  **Critical CSS**: Inline critical styles if possible (advanced), otherwise keep `styles.css` lightweight.
2.  **Unused CSS**: Remove any CSS not used on the page.
3.  **Selectors**: Avoid deep nesting (e.g., `.nav .list .item .link`). Use flat classes (e.g., `.nav-link`).

## JavaScript

1.  **Defer**: Use `<script src="script.js" defer></script>` in the `<head>` or place at the end of `<body>`.
2.  **Minimize**: Only write JS that is absolutely necessary.
3.  **Third-Party Scripts**: Defer or delay loading of non-essential scripts (like chat widgets) until user interaction.

## Fonts

1.  **Display**: Use `font-display: swap;` in `@font-face` blocks.
2.  **Weights**: Only load the weights you need (usually 400 and 700). Don't load the entire family.
3.  **Hosting**: Self-host fonts or use Google Fonts with `preconnect`.

## Mobile Performance

-   Test on a 3G network simulation.
-   Ensure touch targets are at least 44x44px.
