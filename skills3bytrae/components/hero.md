# Hero Component

The first impression section. Must clearly state "What you do" and "Where you do it".

## HTML Structure (Split Layout)

```html
<section class="hero">
  <div class="container hero__grid">
    <div class="hero__content">
      <h1 class="hero__title">
        The Best <span class="text-primary">[Service]</span> in [City]
      </h1>
      <p class="hero__lead">
        Professional, affordable, and trusted by over 500 locals. 
        Book your appointment today and get 10% off.
      </p>
      <div class="hero__actions">
        <a href="#contact" class="btn btn--primary">Book Now</a>
        <a href="#services" class="btn btn--outline">View Services</a>
      </div>
      <div class="hero__trust">
        <span>⭐⭐⭐⭐⭐ 4.9/5 on Google</span>
      </div>
    </div>
    <div class="hero__image-wrapper">
      <img 
        src="assets/hero-image.webp" 
        alt="Happy customer enjoying [Service]" 
        width="600" 
        height="500"
        class="hero__img"
      >
    </div>
  </div>
</section>
```

## CSS Styling

```css
.hero {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-bg);
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  align-items: center;
}

@media (min-width: 992px) {
  .hero__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.hero__title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  line-height: 1.1;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

.text-primary {
  color: var(--color-primary);
}

.hero__lead {
  font-size: 1.125rem;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-md);
  max-width: 50ch;
}

.hero__actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.hero__img {
  width: 100%;
  height: auto;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
}
```
