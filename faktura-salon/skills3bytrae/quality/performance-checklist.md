# Performance Checklist

Target: 90+ Lighthouse Score.

## Assets
- [ ] **Images**: Converted to WebP? Compressed?
- [ ] **Dimensions**: `width` and `height` attributes set on `<img>`?
- [ ] **Lazy Load**: `loading="lazy"` on off-screen images?

## Code
- [ ] **CSS**: Minified? Unused CSS removed?
- [ ] **JS**: `defer` attribute on script tags?
- [ ] **Fonts**: `font-display: swap` used? Only necessary weights loaded?

## Server/Hosting (If applicable)
- [ ] **Compression**: Gzip/Brotli enabled?
- [ ] **Caching**: Browser caching headers set?
- [ ] **CDN**: Assets served via CDN?
