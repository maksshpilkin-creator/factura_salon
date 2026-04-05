# Testimonials Component

Social proof is critical for local businesses.

## HTML Structure

```html
<section class="section testimonials">
  <div class="container">
    <h2 class="section-title text-center">What Our Clients Say</h2>
    
    <div class="grid grid--3">
      <!-- Review 1 -->
      <div class="review-card">
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">
          "I was blown away by the service. The team was punctual, polite, and did an amazing job. Highly recommended!"
        </p>
        <div class="review-author">
          <img src="assets/avatar1.jpg" alt="Jane Doe" class="avatar" loading="lazy">
          <div>
            <span class="author-name">Jane Doe</span>
            <span class="author-location">Local Resident</span>
          </div>
        </div>
      </div>

      <!-- Review 2 -->
      <div class="review-card">
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">
          "Best experience I've had in [City]. Pricing was transparent and the results exceeded my expectations."
        </p>
        <div class="review-author">
          <img src="assets/avatar2.jpg" alt="John Smith" class="avatar" loading="lazy">
          <div>
            <span class="author-name">John Smith</span>
            <span class="author-location">Business Owner</span>
          </div>
        </div>
      </div>
      
      <!-- Review 3 -->
      <div class="review-card">
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">
          "Finally a reliable service provider! I will definitely be using them again for all my future needs."
        </p>
        <div class="review-author">
          <img src="assets/avatar3.jpg" alt="Mike R." class="avatar" loading="lazy">
          <div>
            <span class="author-name">Mike R.</span>
            <span class="author-location">[Neighborhood]</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS Styling

```css
.review-card {
  background: var(--color-bg);
  padding: var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.stars {
  font-size: 1.25rem;
}

.review-text {
  font-style: italic;
  color: var(--color-text);
  flex-grow: 1;
}

.review-author {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xs);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #eee;
}

.author-name {
  display: block;
  font-weight: 600;
  color: var(--color-text);
}

.author-location {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.text-center {
  text-align: center;
}
```
