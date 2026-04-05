# Development Instructions — НИКЕ Hair Salon Website

## Stack
- **HTML5** — semantic elements, no frameworks
- **CSS3** — vanilla CSS, custom properties, no utility frameworks
- **JavaScript** — vanilla ES6+, no build tools needed

## File Structure
```
project/
├── index.html          # Single-page landing
├── style.css           # Full design system + responsive styles
├── script.js           # Interactions + animations
├── assets/
│   └── images/         # Local images (if any)
└── docs/
    ├── marketing/      # ICP, PRD, GTM
    └── project/        # Roadmap, design, instructions
```

## Development Conventions
1. **Mobile-first CSS** — write base styles for mobile, use `min-width` media queries
2. **CSS Custom Properties** — all colors, fonts, spacing from `:root` variables
3. **BEM-inspired naming** — `.section__card`, `.hero__title`, `.nav__link`
4. **Semantic HTML** — `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`
5. **Accessibility** — `alt` on images, `aria-label` on interactive elements, keyboard focus
6. **Performance** — lazy load images below fold, minimize reflows

## How to Run
1. Open `index.html` in any browser — no server required
2. For live reload during development: use VS Code Live Server extension

## Image Sources
- Use real Unsplash URLs for all images
- Search terms: "hair salon warm interior", "barber premium", "salon chair orange"
- Never use placeholder services (`placehold.co`, `via.placeholder.com`)

## Animation Rules
- All animations use Intersection Observer (no scroll event listeners)
- Default easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Default duration: 600ms–800ms
- Respect `prefers-reduced-motion` media query
