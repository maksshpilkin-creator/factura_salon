# Features Component

Showcase benefits or key selling points in a clean grid.

## HTML Structure

```html
<section class="section features">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Why Locals Choose Us</h2>
      <p class="section-subtitle">We go above and beyond to ensure your satisfaction.</p>
    </div>
    
    <div class="grid grid--3">
      <!-- Feature 1 -->
      <div class="feature-card">
        <div class="feature-icon">
          <!-- SVG Icon here -->
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3 class="feature-title">Licensed & Insured</h3>
        <p class="feature-desc">Fully certified professionals for your peace of mind.</p>
      </div>

      <!-- Feature 2 -->
      <div class="feature-card">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <h3 class="feature-title">On-Time Guarantee</h3>
        <p class="feature-desc">We respect your time. If we're late, it's on us.</p>
      </div>

      <!-- Feature 3 -->
      <div class="feature-card">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
        </div>
        <h3 class="feature-title">5-Star Rated</h3>
        <p class="feature-desc">Consistently rated the best in [City] by our neighbors.</p>
      </div>
    </div>
  </div>
</section>
```

## CSS Styling

```css
.grid {
  display: grid;
  gap: var(--spacing-md);
}

.grid--3 {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid--3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  background: var(--color-bg);
  padding: var(--spacing-md);
  border-radius: var(--radius);
  border: 1px solid rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.feature-icon {
  color: var(--color-primary);
  background: rgba(0,0,0,0.03);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: var(--spacing-sm);
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text);
}

.feature-desc {
  color: var(--color-text-light);
  line-height: 1.5;
}
```
