# Design Requirements — НИКЕ Hair Salon Website

## Color System (Warm & Bright)

```css
:root {
  --color-primary: #F26A1B;        /* Main orange — salon chairs accent */
  --color-primary-soft: #FFA365;   /* Soft orange for hover/glow states */
  --color-primary-light: #FFF0E6;  /* Very light orange tint for backgrounds */
  --color-bg-main: #FFF6EE;        /* Warm cream — main background */
  --color-bg-white: #FFFFFF;       /* Pure white — card surfaces */
  --color-bg-accent: #FFF8F2;      /* Subtle warm white — alternating sections */
  --color-wood: #6B3E2E;           /* Dark wood — footer, dark sections */
  --color-text-main: #2B2B2B;      /* Near-black — primary text */
  --color-text-muted: #6E6E6E;     /* Gray — secondary text */
  --color-border: #F0E3D8;         /* Warm border */
  --color-success: #34C759;        /* Green — status/success indicators */
}
```

### Forbidden Colors
- ❌ Blue
- ❌ Cold gradients
- ❌ Neon colors
- ❌ Generic startup palette
- ❌ Heavy black backgrounds

## Typography

| Role | Font | Weight | Tracking |
|------|------|--------|----------|
| Headings | Playfair Display | 700 | -0.02em |
| Body | Inter | 400, 500, 600 | normal |
| Accents/Quotes | Cormorant Garamond Italic | 400i | normal |
| Data/Mono | IBM Plex Mono | 400 | 0.02em |

**Scale:** 14px (body) → 18px (lead) → 24px (h4) → 32px (h3) → 48px (h2) → 72px+ (hero)

## Spacing & Layout
- **Container:** max-width 1200px, centered
- **Section padding:** 80px–120px vertical, 20px–40px horizontal
- **Card gap:** 24px–32px
- **Section alternation:** cream → white → cream → accent orange

## Component Styles

### Rounded Corners
- Buttons: `border-radius: 999px` (pill shape)
- Cards: `border-radius: 20px`
- Containers: `border-radius: 24px–32px`
- Images: `border-radius: 16px`

### Shadows
```css
/* Card shadow — warm, like mirror lighting */
box-shadow: 0 10px 40px rgba(242, 106, 27, 0.08);

/* Card hover shadow — lifted */
box-shadow: 0 20px 60px rgba(242, 106, 27, 0.15);

/* Button glow */
box-shadow: 0 8px 30px rgba(242, 106, 27, 0.25);
```

### Buttons
- Pill-shaped, orange background, white text
- `padding: 16px 40px`
- Hover: `translateY(-3px)` + glow shadow
- Active: `scale(0.97)`
- Transition: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

### Cards
- White background on cream sections
- Warm border (`1px solid var(--color-border)`)
- Soft shadow
- Hover lift: `translateY(-6px)`

## Animation Style
- **Entrance:** Fade-in from below (`opacity: 0 → 1`, `translateY: 30px → 0`)
- **Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (smooth deceleration)
- **Duration:** 600ms–800ms
- **Stagger:** 100ms between elements
- **Trigger:** Intersection Observer at 20% visibility threshold

## Noise Texture
SVG `<feTurbulence>` overlay at **0.03 opacity** — adds subtle grain to eliminate flat digital look.

## Mobile Breakpoints
- `320px` — small mobile
- `480px` — large mobile
- `768px` — tablet
- `1024px` — desktop
- `1440px` — large desktop
