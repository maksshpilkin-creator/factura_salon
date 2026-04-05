# CTA Component (Call to Action)

The final push for conversion. High contrast, clear value proposition.

## HTML Structure

```html
<section class="cta-section">
  <div class="container">
    <div class="cta-card">
      <div class="cta-content">
        <h2 class="cta-title">Ready to Upgrade Your [Problem]?</h2>
        <p class="cta-text">
          Join 500+ happy customers in [City]. 
          Book online today and save 10%.
        </p>
      </div>
      <div class="cta-actions">
        <a href="#contact" class="btn btn--white">Book Appointment</a>
        <a href="tel:5551234567" class="btn btn--outline-white">Call (555) 123-4567</a>
      </div>
    </div>
  </div>
</section>
```

## CSS Styling

```css
.cta-section {
  padding: var(--spacing-lg) 0;
}

.cta-card {
  background-color: var(--color-primary);
  color: #fff;
  border-radius: var(--radius);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-md);
  box-shadow: var(--shadow-lg);
}

@media (min-width: 768px) {
  .cta-card {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
  }
}

.cta-title {
  color: #fff;
  font-size: 2rem;
  margin-bottom: var(--spacing-xs);
}

.cta-text {
  color: rgba(255,255,255,0.9);
  font-size: 1.125rem;
  max-width: 500px;
}

.cta-actions {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  justify-content: center;
}

/* Button Variants for CTA */
.btn--white {
  background: #fff;
  color: var(--color-primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn--white:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.btn--outline-white {
  border: 2px solid rgba(255,255,255,0.5);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  transition: border-color 0.2s;
}

.btn--outline-white:hover {
  border-color: #fff;
}
```
