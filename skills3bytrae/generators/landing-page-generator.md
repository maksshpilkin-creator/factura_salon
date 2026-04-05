# Landing Page Generator

Use this prompt to scaffold a full landing page.

## Prompt

```markdown
Act as a Senior Frontend Architect. Create a single-page landing page for a [Niche] in [City].

**Context:**
- Business Name: [Name]
- Primary Color: [Color]
- Target Audience: [Audience]

**Step-by-Step Instructions:**
1. **Structure**: Use the pattern defined in `skills/patterns/landing-page.md`.
2. **Design**: Use the CSS variables from `skills/design/design-system.md`.
3. **Components**:
   - Navbar (Sticky)
   - Hero (Split layout)
   - Features (Grid)
   - Services (Cards)
   - Testimonials (Grid)
   - FAQ (Accordion)
   - CTA (Full width)
   - Footer (4 columns)
4. **Content**: Generate realistic placeholder copy using the "StoryBrand" framework.
5. **Images**: Use `https://placehold.co/600x400` with descriptive alt text.

**Output:**
- A single `index.html` file containing HTML, CSS (in <style>), and JS (in <script>).
- Ensure it scores 90+ on Lighthouse (accessible, responsive, fast).
```
