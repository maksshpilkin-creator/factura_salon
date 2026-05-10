# FAKTURA SALON — Full Technical Audit & Rebuild Plan
**Date:** 2026-05-10  
**Scope:** `faktura-salon/index.html`, `faktura-salon/style.css`, `faktura-salon/script.js`

---

## AUDIT RESULTS

### VIDEO / MEDIA ISSUES

1. **Video src uses `../photos_inside/` relative path** — works only if `faktura-salon/` is served from the exact parent directory. On any other deployment structure the video 404s silently.
2. **`playsinline` is missing from the `<video>` HTML tag** — it is only added via JS (`video.setAttribute('playsinline', '')`). iOS Safari requires `playsinline` to be present in the HTML at parse time; the JS call is too late and mobile autoplay never fires.
3. **Master gallery images use URL-encoded Cyrillic filenames** — `%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0...` encoded paths in `script.js` (`mastersData`). Fragile across OS and servers.
4. **Hero background uses an external `lh3.googleusercontent.com` URL** — no control over caching, availability, or CORS. Will silently break.
5. **Video poster and interior gallery images use `../photos_inside/` relative paths** — same deployment risk as #1.
6. **Gallery carousel slide navigation ignores Tailwind `gap-4` (16 px)** — `updateGalleryPosition()` calculates `currentSlide * slideWidth` without adding the gap. Slides misalign after the first forward navigation.
7. **Master gallery CSS / HTML mismatch** — `style.css` defines `.master-gallery` as `position: fixed; inset: 0` (fullscreen lightbox). The HTML element `#master-gallery` does not have that class and opens as an inline flow block inside the masters section. The intended lightbox effect never works.
8. **Video element has no `width`/`height` attributes** — causes Cumulative Layout Shift (CLS).
9. **All images have no `srcset`** — always load at full resolution regardless of device.

---

### MOBILE / RESPONSIVE ISSUES

10. **Interior gallery fixed pixel heights on 2-column mobile grid** — `h-[450px]` to `h-[650px]` on a 2-column mobile layout makes each card excessively tall. On a 375 px phone, two 600 px cards side by side cause massive vertical scroll and overflow.
11. **`.parallax-bg` CSS has no effect** — the class applies `background-attachment: fixed; background-size: cover; background-position: center` but the hero element uses an `<img>` child, not a CSS background-image. The CSS properties are meaningless; no parallax effect is produced.
12. **`concrete-bg::after` is `position: fixed; z-index: 2`** — the vignette overlay is applied to `<body>` and stays fixed during scrolling. On mobile this triggers additional compositing layers and battery drain. Any element with `z-index < 2` will appear behind it.
13. **Video fixed height `h-[650px]` on mobile** — a 650 px tall video on a 375 px screen is disproportionate. Should use `aspect-ratio` instead.
14. **`mobile-menu__cta` background conflict** — CSS rule `.mobile-menu__cta { background: transparent }` competes with Tailwind's `bg-brand` utility on the same element. Specificity of the CSS class wins and the button appears transparent.
15. **Font sizes below readable threshold** — many elements use `0.48rem`–`0.585rem` (≈ 7–9 px at 16 px base). Fails WCAG 2.1 AA minimum contrast/readability on mobile.
16. **Interior gallery negative `md:-mt-20` / `md:-mt-10` margins** — create a staggered masonry look on desktop but produce collisions during window resize at intermediate breakpoints.
17. **No `@media (prefers-reduced-motion)` anywhere** — all scroll-reveal, fade, and parallax animations play for users who have motion sensitivity enabled in their OS.

---

### CSS STRUCTURE ISSUES

18. **Tailwind play CDN in production** — `https://cdn.tailwindcss.com?plugins=forms,container-queries` generates styles in-browser at runtime. Tailwind explicitly states this is not for production. Adds ~300 KB processing overhead per page load.
19. **Dead CSS — unused BEM components** — the following blocks in `style.css` have no matching HTML elements (the HTML uses raw Tailwind utilities instead):
    - `.master-gallery`, `.gallery-header`, `.gallery-close`, `.gallery-nav`, `.gallery-nav-btn`, `.gallery-track`, `.gallery-slide` (lines 1660–1792)
    - `.reviews-card`, `.reviews-stars`, `.reviews-star`, `.reviews-text`, `.reviews-footer`, `.reviews-avatar`, `.reviews-info`, `.reviews-name`, `.reviews-service` (lines 1417–1491)
    - `.newguests-benefit`, `.newguests-benefit-dot`, `.newguests-benefit-text`, `.newguests-form`, `.newguests-input`, `.newguests-submit` (lines 1562–1654)
    - `.recommend-strip`, `.recommend-chip`, `.recommend-chip__name/.desc/.price/.tag`, `.recommend-strip__label/.list` (lines 911–1012)
20. **`nav-link` hover transform conflict** — generic `.nav-link:hover { transform: translateY(-1px) }` is overridden by `.site-header__nav .nav-link:hover { transform: none }`. The mobile menu inherits the generic rule which pushes links up on hover while skewX also applies.
21. **`concrete-bg::before` SVG noise** — `position: absolute; inset: 0` on `<body>` only covers the viewport height, not the full scrollable content.
22. **`#main-content .max-w-7xl` padding override** at 1024px+ (style.css line 1889–1893) adds `clamp(2rem, 5vw, 4rem)` to every `.max-w-7xl` inside `#main-content`. This unintentionally affects the calculator and interior sections which have their own padding.

---

### JS ISSUES

23. **`calculatePrice()` and `updateCalcUI()` pollute global scope** — called as inline `onchange="..."` HTML attributes. The `<select>` in static HTML (`calc-service`, `calc-master`) uses `onchange` before the function exists; if JS fails to load, no error is shown.
24. **Lenis loaded from unpkg CDN without integrity hash** — single point of failure; if unpkg is slow or down, smooth scrolling breaks and `lenis.scrollTo()` calls in navigation throw exceptions.
25. **Gallery slide width ignores gap** — `galleryTrack.firstElementChild.offsetWidth` does not include the 16 px flex gap. After slide 1, every subsequent slide is 16 px off per step.
26. **`initVideoInteraction` sets `playsinline` too late for iOS** — see media issue #2 above.
27. **Quiz answer visual state not restored on back-navigation** — when the user clicks "Back", step N–1 re-renders but inline styles (`borderColor`, `backgroundColor`) from the previous selection are not restored. The selected answer appears unselected.
28. **No phone format validation** — all forms accept any string in `type="tel"`. Bots or typos submit silently.
29. **`initServiceBookBtns` comment references "cloned search-results items"** — no search feature exists. Stale AI-generated comment creates confusion.
30. **Lenis config uses deprecated options** (`direction`, `gestureDirection`, `smooth`) — no longer valid in Lenis 2.x. If the CDN version is ever updated, the scroll library will break.

---

### PERFORMANCE ISSUES

31. **RESOLVED — Hero LCP preload** — `<head>` includes `<link rel="preload" as="image" href="assets/images/hero-bg.webp" />`; hero `<img>` uses `fetchpriority="high"`, `loading="eager"`, and correct intrinsic `width`/`height` for the current asset.
32. **IMPROVED — Responsive images** — Master cards and master gallery use `srcset`/`sizes` with WebP derivatives (`*-w384.webp`, `*-w768.webp`) plus full PNG. Hero and interior WebPs are currently 512px wide; markup lists `512w` and `npm run build:images` emits wider `-w640`/`-w1280` files automatically when source assets exceed those widths (rerun after swapping in full-resolution art).
33. **IMPROVED — CLS / aspect-ratio** — Philosophy `<video>` retains dimensions + `aspect-[4/5]`; hero and interior images use accurate `width`/`height`, `aspect-square` where helpful, and interior no longer declares incorrect 1024×1280 dimensions for 512px files.
34. **RESOLVED — Lenis RAF when tab hidden** — `requestAnimationFrame` chain stops when `document.hidden`; `visibilitychange` cancels the pending frame and restarts the loop when the tab is visible again.
35. **RESOLVED — Gallery lazy-loading** — Injected slides use `loading="lazy"` (first slide `eager`), `decoding="async"`, and `srcset`/`sizes` matching the master portfolio set.
36. **OK — Google Fonts** — Inter loads via `family=Inter...&display=swap` in the stylesheet URL; comment in `index.html` documents this for future edits.

---

### OTHER ISSUES

37. **Hours inconsistency** — footer says "10:00 до 22:00", header micro-strip says "10:00–21:00".
38. **`<nav>` wraps the entire site header** — phone link, strip, CTA button, and burger button are all inside the `<nav>` element. Semantically incorrect; only navigation links belong in `<nav>`.
39. **Form inputs have no visible `<label>` elements** — only placeholder text. Screen readers and password managers cannot properly identify fields. Fails WCAG 2.1 AA.
40. **`data-purpose="philosophy-text"` on a div** — unused AI artifact attribute.
41. **All `../photos_inside/` and `../workers/` paths** — relative traversal from `faktura-salon/` means deployment at any other path breaks all assets.
42. **No `<meta name="description">`, no Open Graph tags, no canonical URL** — SEO effectively zero.
43. **Lenis script lacks `integrity` (SRI hash)** — supply-chain vulnerability.

---

## ACTION PLAN

---

**[1] ADD `playsinline` TO VIDEO HTML TAG**
File: `faktura-salon/index.html`
Problem: `playsinline` is set via JS after parse, which iOS Safari ignores for autoplay.
Fix: Add `playsinline` attribute directly inside the `<video>` tag at line 240.
Risk: LOW

---

**[2] MOVE ASSETS INTO `faktura-salon/assets/` AND RENAME CYRILLIC FILES**
File: file system + `index.html` + `script.js`
Problem: All media uses `../photos_inside/` and `../workers/` relative paths with URL-encoded Cyrillic names. Breaks on deployment; fragile on non-Windows servers.
Fix:
- Create `faktura-salon/assets/images/` and `faktura-salon/assets/video/`
- Copy (do not move until confirmed working): `photos_inside/*.webp` → `assets/images/`, video `.mp4` → `assets/video/`
- Rename master photos from Cyrillic to `master-1.png`, `master-2.png`, `master-3.png`
- Update all `src` attributes in `index.html` and all image paths in `script.js` `mastersData` object
Risk: MEDIUM

---

**[3] REPLACE EXTERNAL HERO BACKGROUND IMAGE WITH LOCAL FILE**
File: `faktura-salon/index.html`
Problem: Hero `<img>` at line 141 uses `https://lh3.googleusercontent.com/...` — external, uncontrolled.
Fix: Download the image, save as `assets/images/hero-bg.webp`, update `src` attribute on line 141.
Risk: LOW

---

**[4] FIX GALLERY CAROUSEL SLIDE POSITION CALCULATION**
File: `faktura-salon/script.js`
Problem: `updateGalleryPosition()` at line 861 calculates `currentSlide * slideWidth` without the 16 px flex gap. Each step is 16 px off.
Fix: Change to `currentSlide * (slideWidth + 16)`. Or read the gap from `getComputedStyle`.
Risk: LOW

---

**[5] RESOLVE MASTER GALLERY HTML / CSS MISMATCH**
File: `faktura-salon/index.html`, `faktura-salon/style.css`, `faktura-salon/script.js`
Problem: CSS `.master-gallery` defines a `position: fixed` lightbox. The HTML `#master-gallery` div has no such class and opens inline — the lightbox CSS never activates.
Fix (Option A — simpler): Remove the dead lightbox CSS (`.master-gallery`, `.gallery-header`, `.gallery-close`, `.gallery-nav`, `.gallery-nav-btn`, `.gallery-track`, `.gallery-slide`) from `style.css`. Keep the current inline block approach.
Fix (Option B — correct lightbox): Add class `master-gallery` to `#master-gallery` div, update JS `openGallery()` to set `gallery.classList.add('master-gallery')` instead of removing `hidden`, update `closeGallery()` accordingly.
Risk: MEDIUM

---

**[6] FIX INTERIOR GALLERY MOBILE HEIGHTS**
File: `faktura-salon/index.html`
Problem: Fixed `h-[450px]`–`h-[650px]` on a 2-column mobile grid is excessive. Cards overflow and the layout looks broken on phones.
Fix: Add responsive height variants to each masonry-item div:
- `h-[240px] md:h-[450px]` (first card)
- `h-[320px] md:h-[650px]` (second card)
- `h-[260px] md:h-[500px]` (third card)
- `h-[280px] md:h-[600px]` (fourth card)
Risk: LOW

---

**[7] FIX VIDEO HEIGHT — USE ASPECT RATIO INSTEAD OF FIXED HEIGHT**
File: `faktura-salon/index.html`
Problem: `h-[650px]` fixed height on the philosophy video is too tall on mobile.
Fix: Replace `h-[650px]` with `aspect-[4/5] md:h-[650px]` and add `width="1920" height="2400"` attributes to the `<video>` tag.
Risk: LOW

---

**[8] FIX `mobile-menu__cta` BACKGROUND CONFLICT**
File: `faktura-salon/style.css`
Problem: `.mobile-menu__cta { background: transparent }` overrides Tailwind `bg-brand`. The CTA button appears transparent on mobile menu.
Fix: In `style.css`, change `.mobile-menu__cta { background: transparent }` (line 1239) to `background: #fdfcf0` — or remove the property entirely if the Tailwind class is sufficient.
Risk: LOW

---

**[9] REMOVE DEAD CSS BLOCKS**
File: `faktura-salon/style.css`
Problem: ~230 lines of CSS for components that don't exist in the HTML (see audit items #19). Dead weight.
Fix: Delete the following CSS blocks from `style.css`:
- `.master-gallery` through `.gallery-slide` (the fixed-lightbox block)
- `.reviews-card` through `.reviews-service`
- `.newguests-benefit` through `.newguests-submit`
- `.recommend-strip` through `.recommend-chip__tag`
Risk: LOW (verify no HTML elements use these class names before deleting)

---

**[10] FIX DUPLICATE NAV-LINK HOVER TRANSFORM**
File: `faktura-salon/style.css`
Problem: Generic `.nav-link:hover { transform: translateY(-1px) }` (line 453) conflicts with `.site-header__nav .nav-link:hover { transform: none }` (line 261).
Fix: Remove `transform: translateY(-1px)` from the generic `.nav-link:hover` rule at line 453. The mobile menu already has its own transform (`translateX(4px) skewX(-4deg)`).
Risk: LOW

---

**[11] REMOVE INEFFECTIVE `.parallax-bg` CSS**
File: `faktura-salon/style.css`, `faktura-salon/index.html`
Problem: `.parallax-bg` applies `background-attachment: fixed` to an element that has no CSS background-image — only an `<img>` child. The class does nothing.
Fix: Remove `.parallax-bg` class from the hero `<div>` in `index.html` (line 139). Remove or repurpose the `.parallax-bg` CSS rule (lines 11–15) in `style.css`.
Risk: LOW

---

**[12] ADD MISSING FORM LABELS (ACCESSIBILITY)**
File: `faktura-salon/index.html`
Problem: `mini-booking-form`, `quiz-lead-form`, and `calc-contact-form` inputs use placeholder text only — no `<label>`. Fails WCAG 2.1 AA.
Fix: Add `<label class="visually-hidden" for="mini-name">Ваше имя</label>` etc. before each input, using the existing `.visually-hidden` class so they're hidden visually but available to screen readers.
Risk: LOW

---

**[13] ADD `@media (prefers-reduced-motion)` TO CSS**
File: `faktura-salon/style.css`
Problem: All animations run unconditionally — no respect for user's OS motion preference.
Fix: Add at the end of `style.css`:
```css
@media (prefers-reduced-motion: reduce) {
  .reveal-header, .reveal-item { transition: none; }
  .animate-fade-in { animation: none; opacity: 1; }
  .quiz-step.active { animation: none; }
  .gallery-img { transition: none; }
}
```
Risk: LOW

---

**[14] FIX SEO — ADD META DESCRIPTION AND OPEN GRAPH TAGS**
File: `faktura-salon/index.html`
Problem: No `<meta name="description">`, no `og:*` tags. Search engines and social shares show no preview.
Fix: Add inside `<head>`:
- `<meta name="description" content="ФАКТУРА — премиальная студия красоты в Санкт-Петербурге. Стрижки, окрашивание, брови. Топ-стилисты с опытом 7+ лет.">`
- `<meta property="og:title" content="ФАКТУРА | Студия красоты Санкт-Петербург">`
- `<meta property="og:description" content="Персональный образ за 90 минут. Записаться онлайн.">`
- `<meta property="og:image" content="assets/images/hero-bg.webp">` (after task [3] completes)
- `<link rel="canonical" href="https://faktura.ru/">`
Risk: LOW

---

**[15] FIX HOURS INCONSISTENCY**
File: `faktura-salon/index.html`
Problem: Footer says "10:00 до 22:00" (line 1377), header micro-strip says "10:00–21:00" (line 51).
Fix: Align both to the actual closing time. Update one of the two locations to match.
Risk: LOW

---

**[16] MOVE GLOBAL JS FUNCTIONS TO EVENT LISTENERS**
File: `faktura-salon/script.js`, `faktura-salon/index.html`
Problem: `calculatePrice()` and `updateCalcUI()` are global functions called via `onchange` HTML attributes. Pollutes global scope; breaks if script doesn't load.
Fix:
- In `index.html`: Remove `onchange="updateCalcUI()"` from `#calc-service` (line 980) and `onchange="calculatePrice()"` from `#calc-master` (line 988)
- In `script.js` `initCalculator()`: Add `serviceSelect.addEventListener('change', updateCalcUI)` and `masterSelect.addEventListener('change', calculatePrice)`
Risk: MEDIUM

---

**[17] RESTORE QUIZ ANSWER VISUAL STATE ON BACK-NAVIGATION**
File: `faktura-salon/script.js`
Problem: When the user navigates back in the quiz, the previously selected answer shows no visual selection state (inline styles are not restored).
Fix: In `updateUI()`, after activating a step, read `answers[question]` for that step and re-apply the selected border/background styles to the matching `.quiz-answer` button.
Risk: LOW

---

**[18] ADD SRI INTEGRITY HASH TO LENIS SCRIPT**
File: `faktura-salon/index.html`
Problem: `<script src="https://unpkg.com/@studio-freight/lenis@1.0.35/dist/lenis.min.js">` has no `integrity` attribute.
Fix: Compute SHA-384 of the file and add `integrity="sha384-..."` and `crossorigin="anonymous"` attributes.
Risk: LOW

---

**[19] ADD `<link rel="preload">` FOR HERO IMAGE**
File: `faktura-salon/index.html`
Problem: The hero background image is the Largest Contentful Paint (LCP) element and is not preloaded.
Fix: Add inside `<head>` (after task [3] makes it local):
```html
<link rel="preload" as="image" href="assets/images/hero-bg.webp" />
```
Risk: LOW

---

**[20] FIX SEMANTIC HTML — MOVE NON-NAV ELEMENTS OUT OF `<nav>`**
File: `faktura-salon/index.html`
Problem: `<nav class="site-header ...">` wraps the phone link, micro-strip, CTA button, and burger button — not just navigation links.
Fix: Wrap only the desktop nav links in `<nav>`. Replace the outer `<nav>` with `<header>`, and keep the inner `<div class="site-header__nav hidden lg:flex">` wrapped in a `<nav aria-label="...">`.
Risk: MEDIUM

---

**[21] REPLACE TAILWIND PLAY CDN WITH PRODUCTION BUILD**
File: `faktura-salon/index.html`
Problem: `https://cdn.tailwindcss.com?plugins=...` is the development/play CDN that processes CSS in-browser. ~300 KB penalty, not suitable for production.
Fix: Run `npx tailwindcss -i ./style.css -o ./dist/tailwind.css --minify` with a content scan of `index.html`. Replace the CDN `<script>` with `<link rel="stylesheet" href="dist/tailwind.css">`. Keep the custom `style.css` as a separate link.
Risk: HIGH — requires Node.js, Tailwind config, content path setup. Some dynamic Tailwind classes in JS may not be picked up by the scanner. Do this last after all HTML changes are finalized.

---

## EXECUTION ORDER

Phase 1 — Make media load (foundation):
**3 → 2 → 1 → 7**

Phase 2 — Fix mobile layout (quick wins):
**6 → 8 → 11**

Phase 3 — Fix interactive behavior:
**4 → 5 → 17**

Phase 4 — CSS cleanup (no visual risk):
**9 → 10 → 12 → 13**

Phase 5 — Content, SEO, accessibility:
**14 → 15 → 19**

Phase 6 — JS and security hardening:
**16 → 18**

Phase 7 — Architecture / semantic HTML (MEDIUM risk):
**20**

Phase 8 — Infrastructure (HIGH risk, do last):
**21**

---

## DO NOT TOUCH LIST

The following must not be modified under any circumstances:

| Item | Location | Reason |
|---|---|---|
| `const WEBHOOK_URL = 'https://primary-production-f7ad.up.railway.app/...'` | `script.js` line 4 | Live production webhook endpoint |
| All `fetch(WEBHOOK_URL, ...)` blocks | `initMiniBookingForm`, `initCalcContactForm`, `initQuiz`, `initNewGuestForm` | Live form submission logic |
| `data-map-url="https://yandex.ru/map-widget/..."` attribute | `index.html` `#yandex-map-lazy` div | Live Yandex Maps embed URL |
| `initLazyYandexMap()` consent / storage logic | `script.js` lines 896–965 | Cookie consent gate logic |
| `PRICES_DATA` object | `script.js` lines 403–430 | Service catalog and price list |
| All `announceFormStatus()` calls | `script.js` | Accessibility live region — screen reader notifications |