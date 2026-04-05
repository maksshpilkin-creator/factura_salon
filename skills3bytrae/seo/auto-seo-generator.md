# Auto SEO Generator Logic

This file describes how to programmatically generate SEO tags based on niche and location.

## Logic Flow

1.  **Input**:
    -   `businessName`: "Elite Dental"
    -   `city`: "Austin"
    -   `service`: "Cosmetic Dentistry"
    -   `phone`: "(555) 123-4567"

2.  **Title Generation**:
    -   *Formula*: `[Service] in [City] | Top Rated [Business Name]`
    -   *Result*: "Cosmetic Dentistry in Austin | Top Rated Elite Dental"

3.  **Description Generation**:
    -   *Formula*: `Looking for [Service] in [City]? [Business Name] offers professional care. Rated 5 stars. Call [Phone] to book now.`
    -   *Result*: "Looking for Cosmetic Dentistry in Austin? Elite Dental offers professional care. Rated 5 stars. Call (555) 123-4567 to book now."

4.  **Image Alt Text**:
    -   *Formula*: `[Service] expert in [City] - [Business Name]`
    -   *Result*: "Cosmetic Dentistry expert in Austin - Elite Dental"

## Implementation (JavaScript Helper)

```javascript
function generateMeta({ businessName, city, service, phone }) {
  const title = `${service} in ${city} | ${businessName}`;
  const description = `Looking for ${service} in ${city}? ${businessName} provides top-quality service. Call ${phone} for a quote.`;
  
  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute('content', description);
  
  // Open Graph
  document.querySelector('meta[property="og:title"]').setAttribute('content', title);
  document.querySelector('meta[property="og:description"]').setAttribute('content', description);
}
```
