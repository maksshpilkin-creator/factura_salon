# FAQ Component

Accordion style Frequently Asked Questions.

## HTML Structure

```html
<section class="section faq">
  <div class="container">
    <h2 class="section-title text-center">Frequently Asked Questions</h2>
    
    <div class="faq-grid">
      
      <details class="faq-item">
        <summary class="faq-question">
          How much does it cost?
          <span class="icon">+</span>
        </summary>
        <div class="faq-answer">
          <p>Our pricing starts at $99 for basic service. We offer free quotes for custom projects.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">
          Do you offer a guarantee?
          <span class="icon">+</span>
        </summary>
        <div class="faq-answer">
          <p>Yes! We offer a 100% satisfaction guarantee on all our work. If you're not happy, we'll make it right.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">
          How quickly can you start?
          <span class="icon">+</span>
        </summary>
        <div class="faq-answer">
          <p>We usually have availability within 24-48 hours. Call us for emergency or same-day service.</p>
        </div>
      </details>

    </div>
  </div>
</section>
```

## CSS Styling

```css
.faq-grid {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.faq-item {
  background: var(--color-bg);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--radius);
}

.faq-item[open] {
  border-color: var(--color-primary);
}

.faq-question {
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: 600;
  cursor: pointer;
  list-style: none; /* Hide default triangle */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.125rem;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-question .icon {
  font-weight: 300;
  font-size: 1.5rem;
  color: var(--color-primary);
}

.faq-item[open] .icon {
  transform: rotate(45deg); /* Turn + into x */
}

.faq-answer {
  padding: 0 var(--spacing-md) var(--spacing-md);
  color: var(--color-text-light);
  line-height: 1.6;
}
```
