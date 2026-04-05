# Feature Development Flow

Use this flow when adding a specific feature (e.g., Booking Calendar, Photo Gallery, Pricing Table) to an existing landing page.

## Phase 1: Requirement Analysis

1.  **Define the Goal**: What user problem does this feature solve?
    -   *Example*: "Users need to see prices before calling."
2.  **Check Existing Skills**:
    -   Does a component already exist in `skills/components/`?
    -   Is there a pattern in `skills/patterns/` that fits?

## Phase 2: Implementation

### Step 1: HTML Structure
-   Create a semantic container (e.g., `<section>`, `<article>`, `<aside>`).
-   Use BEM naming convention for classes (e.g., `.pricing-card__price`).
-   Ensure accessibility (ARIA labels where necessary).

### Step 2: CSS Styling
-   Use CSS variables from `skills/design/design-system.md`.
-   **Mobile First**: Write styles for mobile (base), then add `@media (min-width: 768px)` for tablet/desktop.
-   Maintain spacing consistency using `var(--spacing-md)`, `var(--spacing-lg)`.

### Step 3: JavaScript Logic (If needed)
-   Keep it vanilla JS. No frameworks.
-   Select elements using `document.querySelector` or `getElementById`.
-   Add event listeners (`click`, `submit`, `scroll`).
-   **Performance**: Use `requestAnimationFrame` for scroll/resize events.

## Phase 3: Integration

1.  **Place in Flow**: Insert the HTML into the `index.html` at the logical position.
2.  **Link Assets**: Ensure new CSS/JS is linked or included.
3.  **Test Conflicts**: Check if new styles break existing layout.

## Phase 4: Verification

1.  **Cross-Device Check**:
    -   Does it work on iPhone SE (small screen)?
    -   Does it work on 4k monitor?
2.  **Functionality Check**:
    -   Do buttons work?
    -   Do forms submit?
    -   Are errors handled gracefully?

## Example: Adding a "Before/After" Slider

1.  **HTML**: Two images in a container with a range input slider.
2.  **CSS**: Absolute positioning for the top image, clipped by the slider value.
3.  **JS**: Update the `clip-path` or width based on input change.
