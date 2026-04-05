# Footer Component

Standard footer with NAP (Name, Address, Phone) for Local SEO.

## HTML Structure

```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      
      <!-- Brand & About -->
      <div class="footer-col">
        <h3 class="footer-title">[Business Name]</h3>
        <p class="footer-text">
          Providing premium [Service] to [City] since 2010. 
          We are dedicated to quality and customer satisfaction.
        </p>
      </div>

      <!-- Contact Info (Crucial for SEO) -->
      <div class="footer-col">
        <h3 class="footer-title">Contact Us</h3>
        <address class="footer-address">
          <p>📍 123 Main Street, [City], [State] 12345</p>
          <p>📞 <a href="tel:5551234567">(555) 123-4567</a></p>
          <p>✉️ <a href="mailto:hello@business.com">hello@business.com</a></p>
        </address>
      </div>

      <!-- Quick Links -->
      <div class="footer-col">
        <h3 class="footer-title">Links</h3>
        <ul class="footer-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Book Now</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; <span id="year">2024</span> [Business Name]. All rights reserved.</p>
    </div>
  </div>
</footer>
```

## CSS Styling

```css
.site-footer {
  background-color: var(--color-secondary); /* Often dark */
  color: #fff; /* Invert text for dark footer */
  padding: var(--spacing-xl) 0 var(--spacing-md);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer-title {
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: var(--spacing-sm);
}

.footer-text, .footer-address p {
  color: rgba(255,255,255,0.7);
  margin-bottom: var(--spacing-xs);
  font-style: normal;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links a {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  display: block;
  margin-bottom: var(--spacing-xs);
}

.footer-links a:hover {
  color: #fff;
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: var(--spacing-md);
  text-align: center;
  color: rgba(255,255,255,0.5);
  font-size: 0.875rem;
}
```

## JavaScript (Year Update)

```javascript
document.getElementById('year').textContent = new Date().getFullYear();
```
