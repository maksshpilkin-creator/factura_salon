# Website Expansion Flow

Use this flow when expanding a single landing page into a multi-page local business website (e.g., adding "About Us", "Services", "Contact" pages).

## Phase 1: Site Architecture

1.  **Sitemap Definition**:
    -   `index.html` (Home)
    -   `about.html` (Story, Team)
    -   `services.html` (Detailed list, Pricing)
    -   `contact.html` (Map, Form, Info)
    -   `404.html` (Custom error page)

2.  **Shared Resources**:
    -   Ensure `styles.css` and `script.js` are linked on all pages.
    -   Move common assets to `assets/common/`.

## Phase 2: Component Abstraction

1.  **Header/Navbar**:
    -   Ensure the navigation links are correct relative paths.
    -   Highlight the "Active" page state in the menu.
2.  **Footer**:
    -   Keep consistent across all pages.
    -   Update copyright year dynamically via JS.

## Phase 3: Page Creation

### About Page
-   **Goal**: Build trust.
-   **Components**: Team grid, History timeline, Values.
-   **Content**: Real photos of the business owner/team (Crucial for local trust).

### Services Page
-   **Goal**: Educate and convert.
-   **Components**: Detailed service cards, Pricing tables, FAQ.
-   **SEO**: Use specific keywords for each service (e.g., "Teeth Whitening" vs "Dental Implants").

### Contact Page
-   **Goal**: Drive foot traffic or calls.
-   **Components**: Embedded Google Map, Business Hours, Contact Form.
-   **Schema**: Ensure `LocalBusiness` schema is present.

## Phase 4: Navigation & Linking

1.  **Internal Linking**:
    -   Link "Services" from the Home page hero or features section.
    -   Link "Contact" from every CTA.
2.  **Breadcrumbs**:
    -   Add breadcrumb navigation for deeper pages (optional for small sites, good for SEO).

## Phase 5: Technical SEO for Multi-Page

1.  **Title Tags**: Unique for each page (e.g., "Services - [Business Name]").
2.  **Meta Descriptions**: Unique summary for each page.
3.  **Sitemap.xml**: Generate a sitemap listing all pages.
4.  **Robots.txt**: Allow crawling of all public pages.
