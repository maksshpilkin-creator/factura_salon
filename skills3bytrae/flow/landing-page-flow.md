# Landing Page Creation Flow

This workflow guides you through creating a high-converting landing page for a local business from scratch using the `skills/` system.

## Phase 1: Setup & Context Loading

1.  **Identify the Niche**: Determine the business type (e.g., `beauty-salon`, `dentist`, `restaurant`).
2.  **Load Context**:
    -   Read `skills/niches/[niche-name].md` to understand specific requirements.
    -   Read `skills/design/design-system.md` and `skills/design/color-system.md`.
    -   Read `skills/components/hero.md` and `skills/components/cta.md` (essential components).

## Phase 2: Scaffolding

1.  **Create File Structure**:
    -   `index.html` (Copy from `skills/templates/landing-template.html`)
    -   `styles.css` (Create empty or copy base styles)
    -   `script.js` (Create empty)
    -   `assets/` (images, icons)
2.  **Initialize Variables**:
    -   Open `styles.css`.
    -   Copy the CSS variables from `skills/design/design-system.md`.
    -   Update `--color-primary`, `--color-bg`, `--font-heading` based on the Niche requirements.

## Phase 3: Component Assembly

Assemble the page using standard blocks. Do not reinvent the wheel.

1.  **Hero Section**:
    -   Implement `skills/components/hero.md`.
    -   Update copy using `skills/generators/hero-generator.md` rules.
    -   Ensure H1 includes the primary local SEO keyword (e.g., "Best Dentist in [City]").
2.  **Features/Services**:
    -   Implement `skills/components/features.md`.
    -   Focus on benefits, not just features.
3.  **Social Proof**:
    -   Implement `skills/components/testimonials.md`.
    -   Use real reviews if available, or realistic placeholders.
4.  **Call to Action (CTA)**:
    -   Implement `skills/components/cta.md`.
    -   Ensure the button stands out (contrast color).
5.  **Footer**:
    -   Implement `skills/components/footer.md`.
    -   Include NAP (Name, Address, Phone) for SEO.

## Phase 4: Content & Customization

1.  **Copywriting**:
    -   Use the "StoryBrand" framework: Problem -> Solution -> Success.
    -   Avoid generic fluff. Be specific to the local area.
2.  **Imagery**:
    -   Use high-quality local images if possible.
    -   If stock, use Unsplash/Pexels but avoid "corporate" looks.
    -   Optimize images (WebP format).

## Phase 5: Functionality & Forms

1.  **Forms**:
    -   Implement the contact form.
    -   Ensure `action` points to the n8n webhook URL.
    -   Test submission.
2.  **Interactivity**:
    -   Add mobile menu toggle (JavaScript).
    -   Add smooth scrolling for anchor links.

## Phase 6: Quality Assurance (QA)

1.  **Responsiveness**:
    -   Check at 375px (Mobile).
    -   Check at 768px (Tablet).
    -   Check at 1200px (Desktop).
2.  **Performance**:
    -   Run Lighthouse audit. Aim for 90+ score.
3.  **SEO Check**:
    -   Verify `<title>` and `<meta description>`.
    -   Check OG tags for social sharing.

## Final Deliverable

-   A single `index.html` file (or clean folder structure).
-   Optimized assets.
-   90+ Lighthouse score.
