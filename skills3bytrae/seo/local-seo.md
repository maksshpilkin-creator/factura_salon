# Local SEO Checklist

Follow this checklist for every project to ensure visibility in Google Maps and Local Search.

## On-Page Basics

- [ ] **Title Tag**: `[Service Keyword] in [City], [State] | [Business Name]`
- [ ] **Meta Description**: Include the phone number and a call to action. Max 160 chars.
- [ ] **H1**: Must include the primary keyword + City.
- [ ] **NAP**: Name, Address, Phone Number must match Google Business Profile EXACTLY.
- [ ] **Content**: Mention neighborhood names and local landmarks.

## Technical

- [ ] **Schema Markup**: Add `LocalBusiness` JSON-LD to the homepage.
- [ ] **Mobile Friendliness**: Pass Google's Mobile-Friendly Test.
- [ ] **Speed**: Pass Core Web Vitals (LCP < 2.5s).
- [ ] **SSL**: Ensure HTTPS is active.

## Google Business Profile (Advice for Client)

- [ ] Claim and verify the listing.
- [ ] Upload real photos of the team and exterior.
- [ ] Collect 5 reviews immediately.

## Schema Template (JSON-LD)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Business Name]",
  "image": "[URL to Logo/Image]",
  "@id": "[Website URL]",
  "url": "[Website URL]",
  "telephone": "[Phone Number]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street Address]",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[Zip Code]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": [Latitude],
    "longitude": [Longitude]
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "17:00"
  },
  "priceRange": "$$"
}
</script>
```
